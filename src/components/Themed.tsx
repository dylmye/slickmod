import React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  useColorScheme,
} from "react-native";

import Colours from "constants/Colours";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colours.light & keyof typeof Colours.dark,
) {
  const theme = useColorScheme();
  const colorFromProps: string | undefined = props[theme || "dark"];

  return colorFromProps || Colours[theme as string][colorName];
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
