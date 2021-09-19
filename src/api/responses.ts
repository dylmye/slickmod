/**
 * Each interface is either a Response for a given
 * Reddit API (with only necessary parts included)
 * or the ResponseItem that represents an item from
 * a response that is an array.
 */

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
