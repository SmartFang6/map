<!--
 * @Author: bifang
 * @Date: 2022-09-13 17:01:06
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-02-06 09:24:20
 * @FilePath: /river-lake-cockpit-front/src/views/components/Header.vue
-->
<!--------------------------------------------
 ¦ 大屏头部
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-16 14:56:33
 ¦------------------------------------------->

<template>
  <div class="layout-header">
    <div class="title">{{ currentAdcd }}水域监管一件事</div>
    <div class="entry-btn" @click="onJump">工作人员入口</div>
  </div>
</template>

<script setup>
import store from "@/store";
import { ref } from "vue";
// import { ElMessage } from "element-plus";
import { getDomainName } from "@/utils/config";
import { getPublicSign, getSecretText } from "@/utils/rsa";

let currentAdcd = ref("");
currentAdcd.value = store.state.adcdName || "";

async function onJump() {
  // if (store.state?.userInfo?.roleId === "065e6e9013954b09b013a1846499a720") {
  const domainName = getDomainName();
  const ticket = store?.state?.ticket || "";
  const userId = store?.state?.userInfo?.userId || "";
  const moduleId = "water_one_cockpit";
  let sign = await getPublicSign(moduleId, userId);
  let secretText = getSecretText(sign, moduleId + userId);
  const JUMP_URL = `${domainName}/oneInspection/ssoLogin?moduleId=water_one_inspection&sign=${sign}&ticket=${ticket}&userId=${userId}&secretText=${secretText}`;
  window.open(JUMP_URL);
  // } else {
  //   ElMessage({
  //     message: "本功能暂未开放",
  //     type: "warning",
  //   });
  // }
}
</script>

<style lang="less" scoped>
.layout-header {
  width: 100%;
  height: 70px;
  background: url(@/assets/images/layout-header.png);
  background-size: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 100;
  & > .title {
    color: #fff;
    font-size: 38px;
    text-shadow: 0 4px 1px #071732;
    letter-spacing: 4px;
    font-family: FZZYJW;
    padding-top: 12px;
  }
  & > .entry-btn {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fff;
    font-size: 20px;
    font-family: YouSheBiaoTiHei;
    background: url(@/assets/images/entry-btn.png);
    background-size: contain;
    width: 266px;
    height: 47px;
    padding-top: 18px;
    padding-left: 100px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>
