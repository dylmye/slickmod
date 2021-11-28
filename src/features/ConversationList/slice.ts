import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { GET_REDDIT_MOD_CONVERSATIONS } from "api/actionTypes";
import { attemptRequestThunk } from "api/api";
import { ModConversationsResponse } from "api/responses";
import type { RootState } from "store";
import { Conversation } from "types";
import createSnippet from "utils/createSnippet";
import { ModConversationsFilters } from "./types";

interface ConvoState {
  list: Conversation[];
  lastKey: string | null;
  listLoading: boolean;
  listFilters: ModConversationsFilters;
}

const initialState: ConvoState = {
  list: [],
  lastKey: null,
  listLoading: false,
  listFilters: {},
};

export const fetchConversations = attemptRequestThunk<ModConversationsResponse>(
  GET_REDDIT_MOD_CONVERSATIONS,
  { path: "mod/conversations" },
  (_, state) => ({
    version: null,
    params: state.main?.conversations?.listFilters,
  }),
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    clearAllConversations: state => {
      state.list = initialState.list;
      state.lastKey = initialState.lastKey;
      state.listLoading = initialState.listLoading;
      state.listFilters = initialState.listFilters;
    },
    updateFilters: (
      state,
      { payload }: PayloadAction<Partial<ModConversationsFilters>>,
    ) => {
      state.listFilters = {
        ...state.listFilters,
        ...payload,
      };
    },
  },
  extraReducers: builder => {
    // fetchConversations
    builder
      .addCase(fetchConversations.pending, state => {
        state.listLoading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, { payload }) => {
        const mappedResults: Conversation[] = Object.values(
          payload.conversations,
        )
          .filter(c => !state.list.find(x => x.id === c.id))
          .map(c => ({
            id: c.id,
            author: c.authors[0]?.name ?? "unknown",
            subject: c.subject,
            internal: c.isInternal,
            highlighted: c.isHighlighted,
            messageSnippet: createSnippet(
              payload.messages[c.objIds[0].id]?.bodyMarkdown,
            ),
            lastUpdated: c.lastUpdated,
          }));

        state.list = [...state.list, ...mappedResults];
        const lastKey = state.list[state.list.length - 1]?.id ?? state.lastKey;
        state.lastKey = lastKey;
        state.listFilters = {
          ...(state.listFilters ?? {}),
          after: lastKey,
        };
        state.listLoading = false;
      })
      .addCase(
        fetchConversations.rejected,
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

export const { clearAllConversations } = conversationsSlice.actions;

export const getConversationRoot = (state: RootState) =>
  state.main.conversations;

export const getConversations = createSelector<
  RootState,
  ConvoState,
  Conversation[]
>(getConversationRoot, ({ list }) => list);

export const getConversationsLoading = createSelector<
  RootState,
  ConvoState,
  boolean
>(getConversationRoot, ({ listLoading }) => listLoading);

export default conversationsSlice.reducer;
