import { Platform } from "react-native";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refresh } from "react-native-app-auth";
import {
  ApiRequestConfig,
  RequestObject,
  SlickmodAxiosRequestConfig,
} from "types";
import {
  updateAccountAuth,
  getActiveAccount,
  getActiveAccountId,
} from "features/Accounts/slice";
import { version as appVersion } from "../../package.json";
import oauthConfig from "screens/Accounts/config";
import { RootState, store } from "store";

const HEADERS: Record<string, string> = {
  "User-Agent": `${Platform.OS}:com.slickmod:${appVersion} (by github.com/dylmye)`,
};

export const config = ({
  bearer,
  method = "GET",
  version = "v1",
  extraHeaders = {},
  params = null,
  data = null,
  skipAuthRefresh = false,
}: ApiRequestConfig): SlickmodAxiosRequestConfig => ({
  baseURL: `https://oauth.reddit.com/api/${version ? `${version}/` : ``}`,
  headers: {
    ...HEADERS,
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    ...extraHeaders,
  },
  data,
  params,
  method,
  skipAuthRefresh,
});

/**
 * Update the bearer token after it has expired
 * @see https://github.com/Flyrell/axios-auth-refresh
 */
const refreshAuthLogic = async (): Promise<void> => {
  const { getState, dispatch } = store;

  const activeAccount = getActiveAccount(getState());
  const activeId = getActiveAccountId(getState());
  const refreshState = await refresh(oauthConfig, {
    refreshToken: activeAccount.refreshToken,
  });

  if (refreshState?.accessToken) {
    const { accessToken, refreshToken, accessTokenExpirationDate } =
      refreshState;
    dispatch(
      updateAccountAuth({
        id: activeId as string,
        bearerToken: accessToken,
        refreshToken: refreshToken ?? activeAccount.refreshToken,
        bearerExpiresUtc: accessTokenExpirationDate,
      }),
    );
    return Promise.resolve();
  }

  console.error("Couldn't refresh", refreshState);

  return Promise.reject("Couldn't refresh");
};

createAuthRefreshInterceptor(axios, refreshAuthLogic);

/**
 * Raw Axios wrapper
 * @param rq Request config
 * @returns Axios data
 */
export const makeRequest = async <T>(rq: RequestObject): Promise<T> => {
  const res = await axios.request<T>({
    ...rq.config,
    url: rq.path,
  });

  return res.data;
};

/**
 * Axios request wrapped in a try/catch, with custom error handling
 * @param rq Request config
 * @returns Axios data if request was successful, otherwise handled errors
 */
export const attemptRequest = async <T>(rq: RequestObject): Promise<T> => {
  try {
    return await makeRequest<T>(rq);
  } catch (error) {
    const { message } = error as AxiosError;
    if (rq.onError) {
      return rq.onError({ error: message });
    }
    return Promise.reject(new Error(message));
  }
};

/**
 * Creates a request that can be handled by redux slices
 * @template T The shape of the response expected from the API request
 * @param actionType The Redux action name, unique to this action
 * @param requestConfig Path and any error/config overrides. Can be an object or a function passed the fn params (typed P) and state
 * @param extraConfigParams Any extra axios configs and overrides. Can be an object or a function passed the fn params (typed P) and state
 * @returns The createAsyncThunk for the request specified
 */
export const attemptRequestThunk = <T = any, P = void>(
  actionType: string,
  requestConfig:
    | RequestObject
    | ((params: P, state: RootState) => RequestObject),
  extraConfigParams?:
    | Partial<Record<keyof ApiRequestConfig, any>>
    | ((
        params: P,
        state: RootState,
      ) => Partial<Record<keyof ApiRequestConfig, any>>),
) =>
  createAsyncThunk<T, P>(
    actionType,
    async (params, { getState, rejectWithValue }) => {
      const active = getActiveAccount(getState());
      if (!active) {
        return rejectWithValue({ error: "No active user ID available" });
      }

      const finalRequestObject: RequestObject =
        typeof requestConfig === "function"
          ? requestConfig(params, getState())
          : requestConfig;

      const finalConfig =
        typeof extraConfigParams === "function"
          ? extraConfigParams(params, getState())
          : extraConfigParams;

      return await attemptRequest<T>({
        onError: rejectWithValue,
        config: config({ ...finalConfig, bearer: active.bearerToken }),
        ...finalRequestObject,
      });
    },
  );
