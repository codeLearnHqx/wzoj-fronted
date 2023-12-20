const { defineConfig } = require("@vue/cli-service");
// 引入整合 monaco-editor 代码编辑器需要的插件
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false, // 忽略红页面错误
    },
  },
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin({}));
  },
});
