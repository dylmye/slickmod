/**
 * Each interface is either a Response for a given
 * Reddit API (with only necessary parts included)
 * or the ResponseItem that represents an item from
 * a response that is an array.
 */

import { ACTION_TYPE_IDS } from "constants/ActionTypeIds";

// https://www.reddit.com/dev/api#GET_api_v1_me
export interface MeResponse {
  id: string;
  name: string;
  created_utc: number;
}

// https://www.reddit.com/dev/api#GET_api_mod_conversations_subreddits
export interface ModSubredditListResponse {
  subreddits: Record<string, ModSubredditListResponseItem>;
}

export interface ModSubredditListResponseItem {
  communityIcon: string;
  keyColor: string;
  display_item: string;
  name: string;
  subscribers: number;
  primaryColor: string | null;
  id: string;
  lastUpdated: string | null;
  icon: string | null;
}

// https://www.reddit.com/dev/api#GET_api_mod_conversations
export interface ModConversationsResponse {
  conversations: Record<string, ModConversationsResponseItem>;
  messages: Record<string, ModConversationsResponseMessage>;
  viewerId: string;
  conversationIds: string[];
}

export interface ModConversationsResponseItem {
  isAuto: boolean;
  participant: ModConversationsResponseParticipant;
  objIds: Record<string, string>[];
  isRepliable: boolean;
  lastUserUpdate: string;
  isInternal: boolean;
  lastModUpdate: string | null;
  authors: ModConversationsResponseParticipant[];
  lastUpdated: string | null;
  legacyFirstMessageId: string;
  state: 0 | 1 | 2; // https://gist.github.com/leviroth/dafcf1331737e2b55dd6fb86257dcb8d#conversation-states
  lastUnread: string | null;
  owner: ModConversationsResponseOwner;
  subject: string;
  id: string;
  isHighlighted: boolean;
  numMessages: number;
}

export type ModConversationsResponseParticipant = {
  isMod: boolean;
  isAdmin: boolean;
  name: string;
  isOp: boolean;
  isParticipant: boolean;
  isApproved: boolean;
  isHidden: boolean;
  id: number;
  isDeleted: boolean;
};

export type ModConversationsResponseOwner = {
  displayName: string;
  type: string;
  id: string;
};

export interface ModConversationsResponseMessage {
  body: string;
  author: ModConversationsResponseParticipant;
  isInternal: boolean;
  date: string;
  bodyMarkdown: string;
  id: string;
}

export interface RecentItemBase {
  date: string;
  permalink: string;
}

export interface ModThreadResponseRecentComment extends RecentItemBase {
  comment: string;
  title: string;
}

export interface ModThreadResponseRecentConvo extends RecentItemBase {
  id: string;
  subject: string;
}

export interface ModThreadResponseRecentPost extends RecentItemBase {
  title: string;
}

export interface ModThreadResponseUser {
  approveStatus: {
    isApproved: boolean;
  };
  banStatus: {
    endDate: string | null;
    isBanned: boolean;
    isPermanent: boolean;
    reason: string;
  };
  created: string;
  id: string;
  isShadowBanned: boolean;
  isSuspended: boolean;
  muteStatus: {
    endDate: string | null;
    isMuted: boolean;
    muteCount: number;
    reason: string;
  };
  name: string;
  recentComments: Record<string, ModThreadResponseRecentComment>;
  recentConvos: Record<string, ModThreadResponseRecentConvo>;
  recentPosts: Record<string, ModThreadResponseRecentPost>;
}

export interface ModThreadActionItem {
  actionTypeId: ACTION_TYPE_IDS;
  author: {
    id: number;
    isAdmin: boolean;
    isDeleted: boolean;
    isHidden: boolean;
    isMod: boolean;
    name: string;
  };
  date: string;
  id: string;
}

export interface ModThreadResponse {
  conversation: ModConversationsResponseItem;
  messages: Record<string, ModConversationsResponseMessage>;
  modActions: Record<string, ModThreadActionItem>;
  user: ModThreadResponseUser;
}
