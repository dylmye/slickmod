export enum ACTION_TYPE_IDS {
  HIGHLIGHTED = 0,
  ARCHIVED = 2,
  MUTED_OP = 5,
  UNMUTED_OP = 6,
  APPROVED_OP = 9,
  DISAPPROVED_OP = 10,
}

export const ACTION_TYPE_MESSAGES = {
  [ACTION_TYPE_IDS.HIGHLIGHTED]: "highlighted this conversation",
  [ACTION_TYPE_IDS.ARCHIVED]: "archived this conversation",
  [ACTION_TYPE_IDS.MUTED_OP]: "muted user",
  [ACTION_TYPE_IDS.UNMUTED_OP]: "un-muted user",
  [ACTION_TYPE_IDS.APPROVED_OP]: "approved user",
  [ACTION_TYPE_IDS.DISAPPROVED_OP]: "dis-approved user",
};
