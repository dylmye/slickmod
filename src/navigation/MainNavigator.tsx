import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MainStackParamList } from "types";
import Conversations from "screens/Conversations";
import Thread from "screens/Thread";

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="Conversations"
      component={Conversations}
      options={{ headerTitle: "All Subreddits" }}
    />
    <MainStack.Screen
      name="Thread"
      component={Thread}
      options={{ headerTitle: "Conversation" }}
    />
    {/* Settings */}
  </MainStack.Navigator>
);

export default MainNavigator;
