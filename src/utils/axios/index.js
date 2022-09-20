import axios from "axios";
import store from "@/store";
import router from "@/router";

import { ElMessage } from "element-plus";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASEURL || "/api",
  timeout: 50000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // console.log("request config =>", config);
    const token = store.state.token;
    // 请求头用于接口token 认证
    token && (config.headers.token = token);
    if (
      config.method.toLocaleLowerCase() === "post" ||
      config.method.toLocaleLowerCase() === "put"
    ) {
      // 参数统一处理，请求都使用data传参
      config.data = config.data.data;
    } else if (
      config.method.toLocaleLowerCase() === "get" ||
      config.method.toLocaleLowerCase() === "delete"
    ) {
      // 参数统一处理
      config.params = config.data;
    } else {
      alert("不允许的请求方法：" + config.method);
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (
      res.request.responseType === "arraybuffer" ||
      res.request.responseType === "blob"
    ) {
      return res.data;
    }
    const { success, errmsg, status, code } = res.data;
    if (success === true || status === 0 || code === 0) {
      const { message } = res?.data;
      return message || res?.data;
    } else {
      ElMessage({
        message: errmsg || "Error",
        type: "error",
        duration: 2 * 1000,
      });
      return Promise.reject(new Error(errmsg || "Error"));
    }
  },
  (err) => {
    if (axios.isCancel(err)) {
      console.log("重复请求信息：" + err.message);
    }
    if (err.response?.status === 401) {
      store.commit("UPDATE_TOKEN", "");
      store.commit("UPDATE_USER_INFO", {});
      ElMessage.error(err.message);
      router.replace("/401");
    } else if (err.response?.status === 500) {
      // 获取错误提示
      ElMessage.error("服务重启中，请稍候！");
    } else {
      // 获取错误提示
      ElMessage.error(err.message || "Error");
    }
    return Promise.reject(err);
  }
);

export const getHttp = instance.get;
export const postHttp = instance.post;
export const delHttp = instance.delete;
export const putHttp = instance.put;
