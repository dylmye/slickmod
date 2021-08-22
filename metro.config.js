/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  projectRoot: path.resolve("./"),
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
