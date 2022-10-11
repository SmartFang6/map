<!-- 单点登录页面 -->
<template>
  <div v-loading="loading" class="page" element-loading-text="加载中" />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
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
  axios
    .get(`/userApi/user/waterSso`, {
      params: { moduleId: "water_one_cockpit", ...route.query },
    })
    .then((res) => {
      console.log("单点登录", res);
      if (res.data.status === 0) {
        let data = res.data.message;
        store.commit("UPDATE_TOKEN", data.token);
        store.commit("UPDATE_USER_INFO", data);
        router.push("/");
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
