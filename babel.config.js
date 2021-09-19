module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".js", ".ts", ".tsx"],
        root: ["src"],
      },
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "react-native-dotenv",
        blacklist: ["NODE_PATH"],
      },
    ],
  ],
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
};
