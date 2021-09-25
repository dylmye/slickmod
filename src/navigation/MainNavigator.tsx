import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackParamList } from "types";
import Conversations from "screens/Conversations";

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Conversations"
      component={Conversations}
      options={{ headerTitle: "All Subreddits" }}
    />
    {/* Conversation */}
    {/* Settings */}
  </MainStack.Navigator>
);

export default MainNavigator;
