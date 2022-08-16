<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>
<script setup>
import { provide } from "vue";
import EventBus from "@/utils/eventBus";
provide("EventBus", EventBus);
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #fff;
}
// 字体引入
@font-face {
  font-family: "AGENCYB";
  src: url(@/assets/font-family/AGENCYB.TTF);
}
@font-face {
  font-family: "FZZDHJW";
  src: url(@/assets/font-family/FZZDHJW.TTF);
}
@font-face {
  font-family: "FZZYJW";
  src: url(@/assets/font-family/FZZYJW.TTF);
}
@font-face {
  font-family: "YOUSHEBIAOTIHEI-2";
  src: url(@/assets/font-family/YOUSHEBIAOTIHEI-2.TTF);
}
</style>
