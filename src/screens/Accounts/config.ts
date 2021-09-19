import { AuthConfiguration } from "react-native-app-auth";
import { REACT_NATIVE_REDDIT_CLIENT_ID } from "react-native-dotenv";
import { encode } from "base-64";

const config: AuthConfiguration = {
  redirectUrl: "com.slickmod.auth://callback",
  clientId: REACT_NATIVE_REDDIT_CLIENT_ID,
  clientSecret: "", // empty string - needed for iOS
  scopes: ["identity", "modmail"],
  serviceConfiguration: {
    authorizationEndpoint: "https://www.reddit.com/api/v1/authorize.compact",
    tokenEndpoint: "https://www.reddit.com/api/v1/access_token",
  },
  customHeaders: {
    token: {
      Authorization: `Basic ${encode(REACT_NATIVE_REDDIT_CLIENT_ID)}`,
    },
  },
  // see https://github.com/reddit-archive/reddit/wiki/oauth2#authorization
  additionalParameters: {
    duration: "permanent",
  },
};

export default config;
