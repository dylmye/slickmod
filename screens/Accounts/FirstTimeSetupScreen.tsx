import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";

import { Text, View } from "components/Themed";
import { Button } from "react-native-paper";
import { DISCOVERY, CLIENT_ID, CALLBACK_URL, SCOPES } from "oauthConfig";

const FirstTimeSetupScreen = () => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri: makeRedirectUri({
        path: "unauth/firstTimeSetup"
      }),
    },
    DISCOVERY
  );

  useEffect(() => {
    response?.type && console.log(response.type);
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(code);
    }
  }, [response]);

  console.log(request?.url);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Connect your Reddit account to use SlickMod
      </Text>
      <Text>
        Click the button below to log in securely. Once you're logged in, you
        can access your modmail.
      </Text>
      <Button
        disabled={!request}
        mode="contained"
        onPress={() => {
          promptAsync();
        }}
      >
        Sign in with Reddit
      </Button>
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
