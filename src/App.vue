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
  font-family: "AgencyFB-Bold";
  src: url(@/assets/font-family/AgencyFB-Bold.ttf);
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
  font-family: "YOUSHEBIAOTIHEI";
  src: url(@/assets/font-family/YOUSHEBIAOTIHEI-2.TTF);
}
.common_dialog {
  background: #051445 !important;
  border: 1px solid #64d2f7;
  position: relative;
  top: 0;
  left: 0;

  &::after,
  &::before {
    position: absolute;
    top: 0;
    display: block;
    content: "";
    width: 8px;
    height: 16px;
    background: #64d2f7;
  }
  &::after {
    left: 0;
  }
  &::before {
    right: 0;
  }
  .title {
    font-family: YouSheBiaoTiHei;
    font-size: 26px;
    color: #0adbe0;
  }
  .el-dialog__close {
    border: 1px solid #64d2f7;
    color: #64d2f7 !important;
    background: rgba(100, 210, 247, 0.38);
  }
}
.dc-empty {
  opacity: 0.25;
}
</style>
