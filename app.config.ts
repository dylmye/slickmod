import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  "name": "SlickMod",
  "slug": "SlickMod",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/images/icon.png",
  "scheme": "slickmod",
  "userInterfaceStyle": "automatic",
  "splash": {
    "image": "./assets/images/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "supportsTablet": true
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/images/adaptive-icon.png",
      "backgroundColor": "#FFFFFF"
    }
  },
  "platforms": [
    "android",
    "ios"
  ],
  "extra": {
    "redditClientId": process.env.REACT_NATIVE_REDDIT_CLIENT_ID,
    // "oauthCallbackUrl": process.env.REACT_NATIVE_OAUTH_CALLBACK_URL
  },
});
