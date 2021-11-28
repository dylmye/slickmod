import React from "react";
import { StatusBar, useColorScheme, LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { store, persistor } from "store";
import Navigation from "navigation";
import getTheme from "utils/getTheme";
import { colourPrimaryDark } from "constants/Colours";

const warningsToIgnore: string[] = [];

LogBox.ignoreLogs(warningsToIgnore);

const App = () => {
  const colourScheme = useColorScheme();
  const theme = getTheme(colourScheme);

  const backgroundStyle = {
    backgroundColor: theme.colors.background,
  };

  const statusBarColour = theme.dark ? Colors.darker : colourPrimaryDark;

  return (
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider style={backgroundStyle}>
          <PaperProvider theme={theme}>
            <Navigation theme={theme} />
            <StatusBar
              backgroundColor={statusBarColour}
              barStyle="light-content"
              hidden={false}
            />
          </PaperProvider>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
