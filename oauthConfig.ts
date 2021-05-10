import type { DiscoveryDocument } from "expo-auth-session";
import Constants from "expo-constants";

/** @see https://docs.expo.io/guides/authentication/#reddit */
export const DISCOVERY: DiscoveryDocument = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

export const CLIENT_ID: string = Constants.manifest.extra?.redditClientId;

// export const CALLBACK_URL: string = Constants.manifest.extra.oauthCallbackUrl;

export const SCOPES = [
  'identity',
  'modmail'
];
