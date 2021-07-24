import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FirstTimeSetupScreen from "screens/Accounts/FirstTimeSetupScreen";
import { UnauthStackParamList } from "types";

const UnauthStack = createStackNavigator<UnauthStackParamList>();

const UnauthNavigator = () => (
  <UnauthStack.Navigator>
    <UnauthStack.Screen
      name="FirstTimeSetupScreen"
      component={FirstTimeSetupScreen}
      options={{ headerTitle: "Welcome to SlickMod" }}
    />
  </UnauthStack.Navigator>
);

export default UnauthNavigator;
