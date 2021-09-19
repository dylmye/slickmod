import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "store";
import { Account, Subreddit, TempAuthAccount } from "types";
import { config } from "api/api";
import { MeResponse, ModSubredditListResponse } from "api/responses";
import { GET_REDDIT_ME_INFO, GET_REDDIT_MOD_SRS } from "api/actionTypes";

export const ACTIONS = {
  loadSubredditsForAccount: "accounts/loadSubreddits",
  addAccount: "accounts/addAddcount",
  removeAccount: "accounts/removeAccount",
};

interface AccountState {
  list: Record<string, Account>;
  activeUserId: string | null;
  listLoading: boolean;
}

const initialState: AccountState = {
  list: {},
  activeUserId: null,
  listLoading: false,
};

export const fetchAccountDetails = createAsyncThunk(
  GET_REDDIT_ME_INFO,
  async (_, { getState, rejectWithValue }) => {
    const { accounts } = getState() as { accounts: AccountState };
    if (!accounts.activeUserId) {
      return rejectWithValue({ error: "No active user ID available" });
    }
    const active = accounts.list[accounts.activeUserId];
    try {
      const res = await axios.get<MeResponse>("me", config(active.bearerToken));
      return res.data;
    } catch (error) {
      const { message } = error as AxiosError;
      return rejectWithValue({ error: message });
    }
  },
);

export const fetchAccountSubreddits = createAsyncThunk(
  GET_REDDIT_MOD_SRS,
  async (id: string, { getState, rejectWithValue }) => {
    const { accounts } = getState() as { accounts: AccountState };
    if (!accounts.activeUserId) {
      return rejectWithValue({ error: "No active user ID available" });
    }
    const active = accounts.list[id ?? accounts.activeUserId];
    try {
      const res = await axios.get<ModSubredditListResponse>(
        "mod/conversations/subreddits",
        config(active.bearerToken, "GET", null),
      );
      return res.data;
    } catch (error) {
      const { message } = error as AxiosError;
      return rejectWithValue({ error: message });
    }
  },
);

export const accountsSlice = createSlice({
  name: "slickmod:accounts",
  initialState,
  reducers: {
    addAccount: (state, { payload }: PayloadAction<TempAuthAccount>) => {
      state.list.temp = {
        ...payload,
        createdUtc: new Date().toISOString(),
      };
      state.activeUserId = "temp";
    },
    removeAccount: (state, action: PayloadAction<string>) => {
      delete state.list[action.payload];
    },
    clearAccounts: state => {
      state.list = initialState.list;
      state.activeUserId = initialState.activeUserId;
      state.listLoading = initialState.listLoading;
    },
  },
  extraReducers: builder => {
    // fetchAccountDetails
    builder
      .addCase(fetchAccountDetails.pending, state => {
        state.listLoading = true;
      })
      .addCase(fetchAccountDetails.fulfilled, (state, { payload }) => {
        const temp = current(state.list[state.activeUserId as string]);
        state.list[payload.id] = {
          ...temp,
          username: payload.name,
          subreddits: [],
        };
        delete state.list[state.activeUserId as string];
        state.activeUserId = payload.id;
        state.listLoading = false;
      })
      .addCase(
        fetchAccountDetails.rejected,
        (state, { payload, error, meta }) => {
          state.listLoading = false;

          const message: string = (payload as any)?.error ?? error?.message;
          console.error(
            message || `unknown error for request ${meta?.requestId}`,
          );
        },
      );

    // fetchAccountSubreddits
    builder
      .addCase(fetchAccountSubreddits.pending, state => {
        state.listLoading = true;
      })
      .addCase(fetchAccountSubreddits.fulfilled, (state, { payload }) => {
        const subreddits: Subreddit[] = Object.keys(payload.subreddits).map(
          key => {
            const { communityIcon, icon, name, keyColor, subscribers } =
              payload.subreddits[key];
            return {
              name,
              keyColor,
              subscribers,
              id: key,
              icon: communityIcon || icon,
            };
          },
        );

        const active = state.list[state.activeUserId as string];
        active.subreddits = subreddits;
      });
  },
});

export const { addAccount, removeAccount } = accountsSlice.actions;

export const accountSelector = (state: RootState, props?: any) => ({
  list: state.accounts.list as Record<string, Account>,
  props,
});

export const getAccounts = (state: RootState) => state.accounts.list;

export default accountsSlice.reducer;
