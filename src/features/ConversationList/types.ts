export type ModConversationsFilters = {
  after?: string;
  entity?: string;
  limit?: number;
  sort?: "recent" | "mod" | "user" | "unread";
  state?:
    | "all"
    | "appeals"
    | "notifications"
    | "inbox"
    | "filtered"
    | "inprogress"
    | "mod"
    | "archived"
    | "default"
    | "highlighted"
    | "join_requests"
    | "new";
};
