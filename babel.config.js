module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            assets: "./assets",
            components: "./components",
            constants: "./constants",
            hooks: "./hooks",
            navigation: "./navigation",
            screens: "./screens",
          },
          extensions: [".js", ".ts"],
          stripExtensions: [".js", ".ts", ".json"],
        },
      ],
    ],
  };
};
