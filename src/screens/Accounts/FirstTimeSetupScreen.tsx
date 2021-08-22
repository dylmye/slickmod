import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "components/Themed";
import { Button } from "react-native-paper";
// import { DISCOVERY, CLIENT_ID, SCOPES } from "oauthConfig";
// import { AuthConfiguration, authorize } from "react-native-app-auth";
// import { encode } from "base-64";

const FirstTimeSetupScreen = () => {
  // const config: OAuthProps = {
  //   scopes: SCOPES,
  //   clientId: CLIENT_ID,
  //   serviceConfiguration: {
  //     ...DISCOVERY
  //   },
  //   issuer: 'https://www.reddit.com/api',
  //   redirectUrl: "exp://192.168.1.105:19000"
  // };

  // const config: AuthConfiguration = {
  //   redirectUrl: createURL("unauth/firstTimeSetup"),
  //   clientId: CLIENT_ID,
  //   clientSecret: "", // iOS workaround
  //   scopes: SCOPES,
  //   serviceConfiguration: DISCOVERY,
  //   customHeaders: {
  //     token: {
  //       Authorization: `Basic ${encode(CLIENT_ID)}:`,
  //     },
  //   },
  // };

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
        mode="contained"
        onPress={async () => {
          // const authState = await authorize(config);
          // console.log(authState);
        }}>
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
