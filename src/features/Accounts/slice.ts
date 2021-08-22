import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";
import { Account } from "types";

export const ACTIONS = {
  loadSubredditsForAccount: "accounts/loadSubreddits",
  addAccount: "accounts/addAddcount",
  removeAccount: "accounts/removeAccount",
};

interface AccountState {
  list: Account[];
}

const initialState: AccountState = {
  list: [],
};

export const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<Account>) => {
      state.list.push(action.payload);
    },
    removeAccount: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        ({ username }) => username !== action.payload,
      );
    },
  },
});

export const { addAccount, removeAccount } = accountsSlice.actions;

export const selectAccounts = (state: RootState) => state.accounts.list;

export default accountsSlice.reducer;
