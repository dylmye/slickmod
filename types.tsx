export type RootStackParamList = {
  Unauth: undefined;
  Root: undefined;
  NotFound: undefined;
};

export type UnauthStackParamList = {
  FirstTimeSetupScreen: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Subreddit = {
  name: string;
  keyColor?: string;
  subscribers: number;
  id: string;
  icon: string;
};

export type Account = {
  username: string;
  jwtToken: string;
  createdUtc: string;
  subreddits: Subreddit[];
};

export type AccountJwtToken = {
  username: string;
  bearerToken: string;
  refreshToken: string;
  bearerExpiresUtc: string;
};

export type ConversationParticipant = {
  isMod: boolean;
  isAdmin: boolean;
  name: string;
  isOp: boolean;
  isParticipant: boolean;
  isApproved: boolean;
  id: number | string;
  isDeleted: boolean;
};

export type ObjectIdItem = {
  id: string;
  key: string;
};

export type ConversationOwner = {
  displayName: string;
  type: string;
  id: string;
};

export type Conversation = {
  isAuto: boolean;
  participant?: ConversationParticipant;
  objIds: ObjectIdItem[];
  isRepliable: boolean;
  lastUserUpdate?: string;
  isInternal: boolean;
  lastModUpdate?: string;
  authors: ConversationParticipant[];
  lastUpdated?: string;
  legacyFirstMessageId?: string;
  state: number;
  lastUnread?: string;
  owner: ConversationOwner;
  subject?: string;
  id: string;
  isHighlighted: boolean;
  numMessages: number;
};

export interface ConversationDict {
  [key: string]: Conversation[]
};
