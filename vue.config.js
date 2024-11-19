const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        // Add compilerOptions to ignore specific custom elements
        options.compilerOptions = {
          ...(options.compilerOptions || {}),
          isCustomElement: (tag) =>
            tag.startsWith("question-") || tag.startsWith("allquestions-"),
        };
        return options;
      });
  },
});
