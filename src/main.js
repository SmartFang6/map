import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 创建一个Vue 应用
const app = createApp(App);
// 全局组件
const requireComponents = require.context("@/components", true, /index\.vue/);
requireComponents.keys().forEach((fileName) => {
  const reqCom = requireComponents(fileName);
  const reqComName =
    reqCom.name || fileName.replace(/\.\/(.*)\/index\.vue/, "$1");
  app.component(reqComName, reqCom.default || reqCom);
});

app.use(store).use(router).mount("#app");
