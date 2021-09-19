import React, { useMemo } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "screens/NotFoundScreen";
import { Account, RootStackParamList } from "types";
import { useAppSelector } from "hooks/redux";
import UnauthNavigator from "./UnauthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { getAccounts } from "features/Accounts/slice";

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

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Unauth" component={UnauthNavigator} />
      ) : (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
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
