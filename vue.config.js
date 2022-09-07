const { defineConfig } = require("@vue/cli-service");

const proxyUrl = process.env.VUE_APP_BASEURL || "/api";
module.exports = defineConfig({
  publicPath: "/cockpit/",
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
      "/oneInspection-api": {
        target: "http://192.168.2.238:8502",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/oneInspection-api": "/api",
        },
      },
    },
  },
});
