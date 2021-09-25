import React, { useMemo } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "react-native-screens/native-stack";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "screens/NotFoundScreen";
import { Account, RootStackParamList } from "types";
import { useAppSelector } from "hooks/redux";
import UnauthNavigator from "./UnauthNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { getAccounts } from "features/Accounts/slice";
import MainNavigator from "./MainNavigator";

// this project uses react-native-screens,which doesn't
// need setup. see more here:
// https://reactnavigation.org/docs/react-native-screens

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
  <NavigationContainer
    linking={LinkingConfiguration}
    theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <RootNavigator />
  </NavigationContainer>
);

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const accounts = useAppSelector<Account[]>(getAccounts);

  const isLoggedIn = useMemo(() => {
    return !!Object.keys(accounts ?? {}).length;
  }, [accounts]);

  const screenOpts: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator screenOptions={screenOpts}>
      {!isLoggedIn ? (
        <Stack.Screen name="Unauth" component={UnauthNavigator} />
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!!" }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
