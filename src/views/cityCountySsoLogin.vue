<!--
 * @Author: bifang
 * @Date: 2022-11-11 16:16:54
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-01-31 08:39:18
 * @FilePath: /river-lake-cockpit-front/src/views/waterSsoLogin.vue
-->
<!-- 单点登录页面 -->
<template>
  <div v-loading="loading" class="page" element-loading-text="加载中" />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { ticketMap } from "./config.js";
import { getUserDefaultLayout } from "@/apis/dynamicLayout";
import { buildUserLayout } from "@/views/dynamicWidget/commonTools";
import axios from "axios";
onBeforeMount(() => {
  getUserInformation();
});
const loading = ref(false);
const router = useRouter();
const route = useRoute();
const store = useStore();
const getUserInformation = () => {
  loading.value = true;
  const { adName, adcd } = route.query;
  // const { adcd, sxmcTicket, adName } = route.query;
  // 根据 adcd 匹配行政区域ticket
  const currentTicket = ticketMap.filter((item) => item.adcd === adcd);
  store.commit("UPDATE_ADCD_TICKET", currentTicket?.[0]?.ticket || "");
  store.commit("UPDATE_ADCD_NAME", adName || "");
  let params = {
    moduleId: "water_one_cockpit",
    map: { ...route.query },
  };
  console.log(params, "params");
  axios.post(`/userApi/user/systemJumpTicket`, params).then(async (res) => {
    console.log("单点登录", res);
    if (res.data.status === 0) {
      let data = res.data.message;
      store.commit("UPDATE_TOKEN", data.token);
      store.commit("UPDATE_USER_INFO", data);
      const message = await getUserDefaultLayout();
      if (message) {
        const userLayoutInfo = buildUserLayout(message);
        store.commit("UPDATE_LAYOUT_CONFIG", userLayoutInfo);
      }
      router.push("/home");
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
<style lang="less" scoped>
.page {
  width: 100vw;
  height: 100vh;
}
</style>
