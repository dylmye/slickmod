import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { ColorSchemeName } from "react-native";

import NotFoundScreen from "screens/NotFoundScreen";
import { RootStackParamList } from "types";
import { useAppSelector } from "hooks/redux";
import UnauthNavigator from "./UnauthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { selectAccounts } from "features/Accounts/slice";

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
  const hasAccounts = useAppSelector(selectAccounts)?.length;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasAccounts ? (
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
