const { defineConfig } = require("@vue/cli-service");

const proxyUrl = process.env.VUE_APP_BASEURL || "/api";
const publicPath = process.env.BASE_URL || "/cockpit/";
module.exports = defineConfig({
  publicPath,
  transpileDependencies: true,
  devServer: {
    proxy: {
      [proxyUrl]: {
        target: "http://192.168.2.238:8504",
        changeOrigin: true, // 是否改变域名
        ws: true,
        pathRewrite: {
          [proxyUrl]: "/api",
        },
      },
      "/userApi": {
        target: "http://192.168.2.238:8501",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/userApi": "/api",
        },
      },
      "/manage-api": {
        target: "http://192.168.2.238:8502",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/manage-api": "/api",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("pdf")
      .test(/\.(pdf)$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 10000,
      })
      .end();
  },
});
