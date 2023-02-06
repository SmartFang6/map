<!--
 * @Author: bifang
 * @Date: 2022-11-11 16:16:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-02-06 15:07:03
 * @FilePath: /river-lake-cockpit-front/src/views/ssoLogin.vue
-->
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
// import { getMD5_sign } from "@/utils";
import { getUserDefaultLayout } from "@/apis/dynamicLayout";
import { buildUserLayout } from "@/views/dynamicWidget/commonTools";
import { getPublicSign, getSecretText } from "@/utils/rsa";
const loading = ref(false);
onBeforeMount(() => {
  getUserInformation();
});

const store = useStore();
const route = useRoute();
const router = useRouter();
const getUserInformation = async () => {
  loading.value = true;
  const { ticket, moduleId, sign, userId, xxx } = route.query;
  let secretText = getSecretText(sign, moduleId + userId);
  // 根据 ticket 匹配行政区域名称（暂时处理）
  const currentAdcd = ticketMap.filter((item) => item.ticket === ticket);
  console.log(currentAdcd, "currentAdcd");
  console.log("currentAdcd----", currentAdcd);
  store.commit("UPDATE_ADCD_TICKET", ticket || "");
  store.commit("UPDATE_ADCD_NAME", currentAdcd?.[0]?.name || "");
  // 处理sso参数
  const _ENV = process.env.VUE_APP_ENV;
  let _params = { ...route.query, secretText, sign };
  console.log("_ENV", _ENV);
  const devUrl = "https://web.dcyun.com:48467";
  const originUrl = window.location.origin;
  if (_ENV === "dev" || (devUrl === originUrl && xxx === "yyy")) {
    // 开发环境实时生成所需参数 sign ;生成规则 8位日期拼接userId用MD5加密后大写字符串
    // const _sign = getMD5_sign(route.query?.userId);
    let _sign = await getPublicSign(moduleId, userId);
    let secretText = getSecretText(_sign, moduleId + userId);
    _params = {
      ..._params,
      sign: _sign,
      secretText,
    };
  }
  axios
    .get(`/userApi/user/sso`, {
      params: _params,
    })
    .then(async (res) => {
      if (res.data.status === 0) {
        let data = res.data.message;
        store.commit("UPDATE_TOKEN", data.token);
        store.commit("UPDATE_USER_INFO", data);
        const message = await getUserDefaultLayout();
        if (message) {
          const userLayoutInfo = buildUserLayout(message);
          store.commit("UPDATE_LAYOUT_CONFIG", userLayoutInfo);
        }
        await router.push("/home");
      } else {
        ElMessage({
          message: res.data.errmsg || "系统异常",
          type: "error",
          duration: 2 * 1000,
        });
        await router.push("/401");
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<style lang="less" scoped></style>
