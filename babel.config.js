module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@core": "./src/core",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@features": "./src/features",
            "@forms": "./src/forms",
            "@hooks": "./src/hooks",
            "@navigation": "./src/navigation",
            "@schema": "./src/schema",
            "@screens": "./src/screens",
            "@stores": "./src/stores",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
