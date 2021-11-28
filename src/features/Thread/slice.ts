import { createSlice, createSelector } from "@reduxjs/toolkit";
import { GET_REDDIT_MOD_THREAD } from "api/actionTypes";
import { attemptRequestThunk } from "api/api";
import { ModConversationsResponseItem, ModThreadResponse } from "api/responses";
import { ACTION_TYPE_MESSAGES } from "constants/ActionTypeIds";
import { RootState } from "store";
import { ConversationItem } from "types";
import { sortDateTimeStamps } from "utils/dates";

interface ThreadState {
  activeThread: ConversationItem[];
  meta: ModConversationsResponseItem | null;
  loading: boolean;
}

const initialState: ThreadState = {
  activeThread: [],
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
        if (payload.messages && Object.keys(payload.messages).length) {
          const messages: ConversationItem[] = Object.values(
            payload.messages,
          ).map(x => ({
            id: x.id,
            author: x.author.name,
            isMod: x.author.isMod,
            isAdmin: x.author.isAdmin,
            isOp: x.author.isOp,
            date: x.date,
            type: "Message",
            message: x.body,
          }));
          const actions: ConversationItem[] = Object.values(
            payload.modActions,
          ).map(x => ({
            id: x.id,
            author: x.author.name,
            isMod: x.author.isMod,
            isAdmin: x.author.isAdmin,
            isOp: false,
            date: x.date,
            type: "Action",
            message:
              ACTION_TYPE_MESSAGES[x.actionTypeId] ?? "did something unknown",
          }));

          state.activeThread = [...messages, ...actions].sort((a, b) =>
            sortDateTimeStamps(a.date, b.date),
          );
          state.meta = payload.conversation;
        }
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

export const getActiveThread = createSelector<
  RootState,
  ThreadState,
  ConversationItem[]
>(getThreadRoot, ({ activeThread }) => activeThread);

export default threadSlice.reducer;
