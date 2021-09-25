import { LinkingOptions } from "@react-navigation/native";

const config: LinkingOptions = {
  prefixes: ["slickmod://"],
  config: {
    screens: {
      Main: {
        screens: {
          Conversations: "home",
          Conversation: "conversation/:id",
          Settings: "settings",
        },
      },
      Unauth: {
        screens: {
          FirstTimeSetupScreen: "firstTimeSetup",
        },
      },
      NotFound: "*",
    },
  },
};

export default config;
