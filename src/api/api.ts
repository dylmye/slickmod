import { Platform } from "react-native";
import { version as appVersion } from "../../package.json";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

const HEADERS: Record<string, string> = {
  "User-Agent": `${Platform.OS}:com.slickmod:${appVersion} (by github.com/dylmye)`,
};

export const config = (
  bearer: string,
  method: Method = "GET",
  version: string | null = "v1",
  extraHeaders: Record<string, string> = {},
  params: URLSearchParams | null = null,
  data: any = null,
): AxiosRequestConfig => ({
  baseURL: `https://oauth.reddit.com/api/${version ? `${version}/` : ``}`,
  headers: {
    ...HEADERS,
    Authorization: `Bearer ${bearer}`,
    "Content-Type": "application/json",
    extraHeaders,
  },
  data: data ?? params,
  method,
});

// export const makeRequest = <T = any>(
//   path: string,
//   method = "GET",
// ): Promise<AxiosResponse<T>> => {
//   const axiosConfig = config();
//   return axios.get(path, axiosConfig);
// };
