import { AxiosRequestConfig, Method } from "axios";

// navigation

export type RootStackParamList = {
  Unauth: undefined;
  Main: undefined;
  NotFound: undefined;
};

export type UnauthStackParamList = {
  FirstTimeSetupScreen: undefined;
};

export type MainStackParamList = {
  Conversations: undefined;
  Thread: {
    id: string;
  };
  Settings: undefined;
};

// core objects

export type Subreddit = {
  name: string;
  keyColor: string | null;
  subscribers: number;
  id: string;
  icon: string | null;
};

export interface Account {
  username?: string;
  bearerToken: string;
  refreshToken: string;
  bearerExpiresUtc: string;
  createdUtc: string;
  subreddits?: Subreddit[];
}

export type Conversation = {
  id: string;
  author: string;
  subject: string;
  internal: boolean;
  highlighted: boolean;
  messageSnippet: string | null;
  lastUpdated: string | null;
};

// authentication, api infra

export interface TempAuthAccount {
  bearerToken: string;
  refreshToken: string;
  bearerExpiresUtc: string;
}

export interface RefreshAuthAccount extends TempAuthAccount {
  id: string;
}

export interface ApiRequestConfig {
  bearer: string;
  method?: Method;
  version?: string | null;
  extraHeaders?: Record<string, string>;
  params?: URLSearchParams | null;
  data?: any;
  skipAuthRefresh?: boolean;
}

export interface SlickmodAxiosRequestConfig extends AxiosRequestConfig {
  skipAuthRefresh?: boolean;
}

export interface RequestObject {
  path: string;
  config?: SlickmodAxiosRequestConfig;
  onError?: ({ error: string }: any) => any;
}
