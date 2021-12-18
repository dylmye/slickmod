import dayjs from "dayjs";

/**
 * Converts two Reddit date-time stamps into unix times and compare them
 * @see https://stackoverflow.com/a/10124236
 * @param a First timestamp
 * @param b Second timestamp
 * @returns 1 if A is higher, -1 where B is higher, 0 if eq
 */
export const sortDateTimeStamps = (a: string, b: string) => {
  const dayA = dayjs(a);
  const dayB = dayjs(b);
  return dayA.isAfter(dayB) ? 1 : dayA.isSame(dayB) ? 0 : -1;
};
