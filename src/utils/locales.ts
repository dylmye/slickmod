import locales from "dayjs/locale.json";

export const getAvailableLocales = () => {
  return locales.map(l => l.key);
};
