const { defineConfig } = require("@vue/cli-service");

const proxyUrl = process.env.VUE_APP_BASEURL || "/api";
const publicPath = process.env.BASE_URL || "/cockpit/";
console.log(publicPath);
module.exports = defineConfig({
  publicPath,
  outputDir: process.env.VUE_APP_DIST,
  transpileDependencies: true,
  devServer: {
    proxy: {
      [proxyUrl + "/beautiful"]: {
        target: "http://192.168.2.238:8104",
        changeOrigin: true, // 是否改变域名
        ws: true,
        pathRewrite: {
          [proxyUrl + "/beautiful"]: "/api",
        },
      },
      [proxyUrl]: {
        target: "http://192.168.2.238:8504",
        changeOrigin: true, // 是否改变域名
        ws: true,
        pathRewrite: {
          [proxyUrl]: "/api",
        },
      },
      "/onemap-api": {
        target: "http://192.168.2.238:8505",
        changeOrigin: true, // 是否改变域名
        ws: true,
        pathRewrite: {
          "/onemap-api": "/api",
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
    config.plugin("html").tap((args) => {
      args[0].title = "水域监管一件事";
      return args;
    });
    config.output
      .filename("js/[name].[hash].js")
      .chunkFilename("js/[name].[hash].js")
      .end();
  },
});
