const { defineConfig } = require("@vue/cli-service");

const proxyUrl = process.env.VUE_APP_BASEURL || "/api";
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      [proxyUrl]: {
        target: "http://192.168.2.238:8504",
        changeOrigin: true, // 是否改变域名
        ws: true,
      },
    },
  },
});
