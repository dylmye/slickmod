import { createSlice } from "@reduxjs/toolkit";
import { GET_REDDIT_MOD_THREAD } from "api/actionTypes";
import { attemptRequestThunk } from "api/api";
import {
  ModConversationsResponseItem,
  ModConversationsResponseMessage,
  ModThreadResponse,
} from "api/responses";
import { RootState } from "store";

interface ThreadState {
  activeThread: Record<string, ModConversationsResponseMessage>;
  meta: ModConversationsResponseItem | null;
  loading: boolean;
}

const initialState: ThreadState = {
  activeThread: {},
  meta: null,
  loading: false,
};

export const fetchThreadById = attemptRequestThunk<
  ModThreadResponse,
  { id: string }
>(GET_REDDIT_MOD_THREAD, ({ id }) => ({ path: `mod/conversations/${id}` }), {
  version: null,
});

export const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    clearActiveThread: state => {
      state.activeThread = initialState.activeThread;
      state.meta = initialState.meta;
      state.loading = initialState.loading;
    },
  },
  extraReducers: builder => {
    // fetchThreadById
    builder
      .addCase(fetchThreadById.pending, state => {
        state.loading = true;
      })
      .addCase(fetchThreadById.fulfilled, (state, { payload }) => {
        state.activeThread = payload.messages;
        state.meta = payload.conversation;
        state.loading = false;
      })
      .addCase(fetchThreadById.rejected, (state, { payload, error, meta }) => {
        state.loading = false;
        const message: string = (payload as any)?.error ?? error?.message;
        console.error(
          message || `unknown error for request ${meta?.requestId}`,
        );
      });
  },
});

export const { clearActiveThread } = threadSlice.actions;

export const getThreadRoot = (state: RootState) => state.main.thread;

// export const getActiveThread = createSelector<RootState, ThreadState, any>(
// >(getThreadRoot, ({ activeThread }) => activeThread);

export default threadSlice.reducer;
