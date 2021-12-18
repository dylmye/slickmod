import {
  createSlice,
  createSelector,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { RootState } from "store";
import { Account, RefreshAuthAccount, Subreddit, TempAuthAccount } from "types";
import { attemptRequestThunk } from "api/api";
import { MeResponse, ModSubredditListResponse } from "api/responses";
import { GET_REDDIT_ME_INFO, GET_REDDIT_MOD_SRS } from "api/actionTypes";

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

export const fetchAccountDetails = attemptRequestThunk<MeResponse>(
  GET_REDDIT_ME_INFO,
  { path: "me" },
);

export const fetchAccountSubreddits =
  attemptRequestThunk<ModSubredditListResponse>(
    GET_REDDIT_MOD_SRS,
    { path: "mod/conversations/subreddits" },
    { version: null },
  );

export const accountsSlice = createSlice({
  name: "slickmod:accounts",
  initialState,
  reducers: {
    addAccount: (state, { payload }: PayloadAction<TempAuthAccount>) => {
      state.list.temp = {
        ...payload,
        createdUtc: dayjs().toISOString(),
      };
      state.activeUserId = "temp";
    },
    updateAccountAuth: (state, action: PayloadAction<RefreshAuthAccount>) => {
      const { id, ...updatedAuth } = action.payload;
      state.list[id] = {
        ...state.list[id],
        ...updatedAuth,
      };
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
        state.listLoading = false;
      })
      .addCase(
        fetchAccountSubreddits.rejected,
        (state, { payload, error, meta }) => {
          state.listLoading = false;

          const message: string = (payload as any)?.error ?? error?.message;
          console.error(
            message || `unknown error for request ${meta?.requestId}`,
          );
        },
      );
  },
});

export const { addAccount, removeAccount, updateAccountAuth } =
  accountsSlice.actions;

export const accountSelector = (state: RootState, props?: any) => ({
  list: state.accounts.list as Record<string, Account>,
  props,
});

export const getAccounts = (state: RootState) => state.accounts.list;

export const getAccountsRoot = (state: RootState) => state.accounts;

export const getActiveAccount = createSelector<
  RootState,
  AccountState,
  Account
>(getAccountsRoot, ({ list, activeUserId }) => list[activeUserId as string]);

export const getActiveAccountId = (state: RootState): string | null =>
  state.accounts.activeUserId;

export default accountsSlice.reducer;
