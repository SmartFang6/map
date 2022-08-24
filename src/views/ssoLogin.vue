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
const loading = ref(false);
onBeforeMount(() => {
  getUserInformation();
});
const store = useStore();
const route = useRoute();
const router = useRouter();
const getUserInformation = () => {
  loading.value = true;
  const { ticket, moduleId } = route.query;
  axios
    .get(`/userApi/user/sso`, {
      params: { moduleId, ticket },
    })
    .then((res) => {
      let data = res.data.message;
      store.commit("UPDATE_TOKEN", data.token);
      store.commit("UPDATE_USER_INFO", data);
      router.push("/");
      loading.value = false;
    });
};
</script>
<style lang="less" scoped></style>
