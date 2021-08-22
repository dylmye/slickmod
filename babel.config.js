module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    ["module:react-native-dotenv"],
    [
      "module-resolver",
      {
        extensions: [".js", ".ts", ".tsx"],
        root: ["src"],
      },
    ],
  ],
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
};
