import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { Text, View } from "components/Themed";
import { Button } from "react-native-paper";
import { authorize } from "react-native-app-auth";
import config from "./config";
import {
  addAccount,
  fetchAccountDetails,
  fetchAccountSubreddits,
} from "features/Accounts/slice";
import { useDispatch } from "react-redux";

interface Styles {
  container: ViewStyle;
  title: TextStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
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

const FirstTimeSetupScreen = () => {
  const dispatch = useDispatch();

  const onSignIn = async () => {
    const authState = await authorize(config);
    if (authState?.accessToken) {
      const { accessToken, refreshToken, accessTokenExpirationDate } =
        authState;
      dispatch(
        addAccount({
          bearerToken: accessToken,
          refreshToken,
          bearerExpiresUtc: accessTokenExpirationDate,
        }),
      );
      dispatch(fetchAccountDetails());
      dispatch(fetchAccountSubreddits());
      return;
    }
    console.error("Malformed Auth State", authState);
    return;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Connect your Reddit account to use SlickMod
      </Text>
      <Text>
        Click the button below to log in securely. Once you're logged in, you
        can access your modmail.
      </Text>
      <Button mode="contained" onPress={onSignIn}>
        Sign in with Reddit
      </Button>
    </View>
  );
};

export default FirstTimeSetupScreen;
