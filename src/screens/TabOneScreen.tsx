import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "components/EditScreenInfo";
import { Text, View } from "components/Themed";
import { useAppDispatch } from "hooks/redux";
import { fetchConversations } from "features/ConversationList/slice";

export default function TabOneScreen() {
  // const convos = useAppSelector(selectConversations);
  // const convos = [];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConversations("all"));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One!</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});