<!-- 单点登录页面 -->
<template>
  <div
    style="width: 100vw; height: 100vh"
    v-loading="loading"
    element-loading-text="加载中"
  ></div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import { ticketMap } from "./config.js";
import { ElMessage } from "element-plus";
import { getMD5_sign } from "@/utils";
const loading = ref(false);
onBeforeMount(() => {
  getUserInformation();
});
const store = useStore();
const route = useRoute();
const router = useRouter();
const getUserInformation = () => {
  loading.value = true;
  const { ticket } = route.query;

  // 根据 ticket 匹配行政区域名称（暂时处理）
  const currentAdcd = ticketMap.filter((item) => item.ticket === ticket);
  console.log("currentAdcd----", currentAdcd);
  store.commit("UPDATE_ADCD_TICKET", ticket || "");
  store.commit("UPDATE_ADCD_NAME", currentAdcd?.[0]?.name || "");
  // 处理sso参数
  const _ENV = process.env.VUE_APP_ENV;
  let _params = route.query;
  if (_ENV === "dev") {
    // 开发环境实时生成所需参数 sign ;生成规则 8位日期拼接userId用MD5加密后大写字符串
    const _sign = getMD5_sign(route.query?.userId);
    _params = {
      ..._params,
      sign: _sign,
    };
  }
  axios
    .get(`/userApi/user/sso`, {
      params: _params,
    })
    .then((res) => {
      console.log(res, "res");
      if (res.data.status === 0) {
        let data = res.data.message;
        store.commit("UPDATE_TOKEN", data.token);
        store.commit("UPDATE_USER_INFO", data);
        router.push("/");
        loading.value = false;
      } else {
        ElMessage({
          message: res.data.errmsg || "系统异常",
          type: "error",
          duration: 2 * 1000,
        });
        loading.value = false;

        router.push("/401");
      }
    });
};
</script>
<style lang="less" scoped></style>
