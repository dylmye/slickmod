import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "components/Themed";

const FirstTimeSetupScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You have no accounts, loser</Text>
    </View>
  );
};

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
});

export default FirstTimeSetupScreen;
