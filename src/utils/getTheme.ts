import { ColorSchemeName } from "react-native";
import mergeOptions from "merge-options";
import {
  DefaultTheme as NavigationLightTheme,
  DarkTheme as NavigationDarkTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import {
  DefaultTheme as PaperLightTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import { Theme as PaperTheme } from "react-native-paper/lib/typescript/types";

export type CombinedTheme = PaperTheme & NavigationTheme;

/**
 * Get the combined theme for the user's choice
 * @param name Whether to retrieve the light or dark theme
 * @return The correct Navigation and Paper theme
 * @see https://callstack.github.io/react-native-paper/theming-with-react-navigation.html
 */
const getTheme = (name: ColorSchemeName): CombinedTheme => {
  const CombinedLightTheme: CombinedTheme = mergeOptions(
    PaperLightTheme,
    NavigationLightTheme,
  );
  const CombinedDarkTheme: CombinedTheme = mergeOptions(
    PaperDarkTheme,
    NavigationDarkTheme,
  );

  return name === "dark" ? CombinedDarkTheme : CombinedLightTheme;
};

export default getTheme;
