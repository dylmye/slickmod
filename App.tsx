import React, { useEffect } from "react";
import {
  StatusBar,
  useColorScheme,
  LogBox,
  StatusBarStyle,
  Platform,
  ColorValue,
  NativeModules,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import { store, persistor } from "store";
import Navigation from "navigation";
import getTheme from "utils/getTheme";
import { colourPrimaryDark } from "constants/Colours";
import { getAvailableLocales } from "./src/utils/locales";

const warningsToIgnore: string[] = [];

LogBox.ignoreLogs(warningsToIgnore);

const App = () => {
  const colourScheme = useColorScheme();
  const theme = getTheme(colourScheme);
  const deviceLocale: string =
    Platform.OS === "android"
      ? NativeModules.I18nManager.localeIdentifier
      : NativeModules.SettingsManager.settings.AppleLocale;

  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  const statusBarColour: ColorValue = theme.dark
    ? Colors.darker
    : colourPrimaryDark;
  const statusBarStyle: StatusBarStyle =
    !theme.dark && Platform.OS === "ios" ? "dark-content" : "light-content";

  console.log(NativeModules.SettingsManager.settings.AppleLanguages);

  useEffect(() => {
    console.debug("Current dayjs locale:", dayjs.locale());
    console.debug("Current device locale:", deviceLocale);
    console.debug(getAvailableLocales());
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider style={backgroundStyle}>
          <PaperProvider theme={theme}>
            <Navigation theme={theme} />
            <StatusBar
              backgroundColor={statusBarColour}
              barStyle={statusBarStyle}
              hidden={false}
            />
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
