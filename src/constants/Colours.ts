export const tintColourLight = "#2f95dc";
export const tintColourDark = "#fff";
export const colourPrimary = "#ff4500";
export const colourPrimaryDark = "#c30000";
export const colourPrimaryLight = "#ff7b3a";
export const colourSecondary = "#0dd3bb";
export const colourSecondaryDark = "#00a18b";
export const colourSecondaryLight = "#65ffed";

export const colourWarning = colourPrimaryLight;
export const colourError = colourPrimaryDark;
export const colourWhite = "#ffffff";
export const colourBlack = "#141414";
export const colourTrueBlack = "#000000";

const colours: Record<string, any> = {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColourLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColourLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColourDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColourDark,
  },
};

export default colours;
