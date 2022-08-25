<!--------------------------------------------
 ¦ 大屏头部
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-16 14:56:33
 ¦------------------------------------------->

<template>
  <div class="layout-header">
    <div class="title">水域监管驾驶舱</div>
    <!-- <div class="entry-btn" @click="onJump" /> -->
  </div>
</template>

<script setup>
// import store from "@/store";

// function onJump() {
//   const JUMP_URL =
//     "https://web.dcyun.com:48467/oneInspection/ssoLogin?moduleId=water_one_inspection&ticket=" +
//       store?.state?.userInfo?.userId || "";
//   console.log(JUMP_URL, "JUMP_URL");
//   window.open(JUMP_URL);
// }
</script>

<style lang="less" scoped>
.layout-header {
  width: 100%;
  height: 75px;
  background: url(@/assets/images/layout-header.png);
  background-size: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 100;
  & > .title {
    color: #fff;
    font-size: 38px;
    color: #fff;
    text-shadow: 0px 4px 1px #071732;
    letter-spacing: 4px;
    font-family: FZZYJW;
    padding-top: 12px;
  }
  & > .entry-btn {
    position: absolute;
    right: 0;
    top: 16px;
    color: #fff;
    font-size: 24px;
    font-family: YouSheBiaoTiHei;
    font-size: 24px;
    background: url(@/assets/images/entry-btn.png);
    width: 268px;
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    cursor: pointer;
  }
}
</style>
