import { LinkingOptions } from "@react-navigation/native";

const config: LinkingOptions = {
  prefixes: ["slickmod://"],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: "one",
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: "two",
            },
          },
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
