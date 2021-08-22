import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";
import { ConversationDict } from "types";

export const ACTIONS = {
  loadMessages: "conversations/loadMessages",
};

interface ConvoBySubreddit {
  [key: string]: ConversationDict;
}

interface ConvoState {
  list: ConvoBySubreddit;
}

export const fetchConversations = createAsyncThunk(
  ACTIONS.loadMessages,
  async (key: string): Promise<ConversationDict> => {
    // mock https://www.reddit.com/dev/api/oauth#GET_api_mod_conversations
    return {
      [key]: [
        {
          authors: [],
          id: "blah",
          isAuto: false,
          isHighlighted: false,
          isInternal: false,
          isRepliable: false,
          numMessages: 0,
          objIds: [],
          owner: {
            displayName: "",
            id: "",
            type: "",
          },
          state: 1,
        },
      ],
    };
  },
);

const initialState: ConvoState = {
  list: {
    all: {},
  },
};

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    clearMessagesForKey: (state, action: PayloadAction<string>) => {
      state.list[action.payload] = {};
    },
    clearAllMessages: state => {
      state.list = initialState.list;
    },
  },
  extraReducers: {
    [fetchConversations.fulfilled.toString()]: (state, action) => {
      state.list = {
        ...state.list,
        ...action.payload,
      };
    },
  },
});

// export const { addAccount, removeAccount } = conversationsSlice.actions;

export const selectConversations = (state: RootState) =>
  state.conversations.list;

export default conversationsSlice.reducer;
