/**
 * Converts two Reddit date-time stamps into unix times and compare them
 * @see https://stackoverflow.com/a/10124236
 * @param a First timestamp
 * @param b Second timestamp
 * @returns 1 if A is higher, -1 where B is higher, 0 if eq
 */
export const sortDateTimeStamps = (a: string, b: string) => {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();
  return dateA === dateB ? 0 : dateA > dateB ? 1 : -1;
};
