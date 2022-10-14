<!--****************************************
 * 大屏配置页面
 *
 * founder: king
 * Date:  28 2022/9/28
 *****************************************-->
<template>
  <el-container class="dynamicConfig--warp">
    <el-header class="dynamicConfig--warp__header">
      <div class="header--title">水域监管驾驶舱大屏配置</div>
      <div class="tools--box">
        <el-button type="danger" link :icon="Failed" @click="clearCall">
          清空
        </el-button>
        <el-button type="primary" link :icon="View" @click="previewShow = true">
          预览
        </el-button>
        <el-button type="primary" link :icon="Promotion" @click="publishLayout">
          发布
        </el-button>
        <el-button type="primary" :icon="HomeFilled" @click="$router.go(-1)">
          返回
        </el-button>
      </div>
    </el-header>
    <el-container>
      <!--      <el-aside class="aside-list" width="16vw">-->
      <!--        <div class="template-item" v-for="item in templateList" :key="item?.id">-->
      <!--          dd-->
      <!--        </div>-->
      <!--      </el-aside>-->
      <el-main class="dynamicConfig--warp__main">
        <OperationPanel ref="operationPanel" @updateConfig="updateConfigCall" />
        <el-dialog
          v-model="previewShow"
          top="0"
          width="100vw"
          destroy-on-close
          custom-class="preview--dialog"
        >
          <PreviewLayout :nowConfig="nowConfig" />
        </el-dialog>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
/**
 大屏配置页面
 **/
// import { ref } from "vue";
import { View, Promotion, Failed, HomeFilled } from "@element-plus/icons-vue";
import OperationPanel from "./components/OperationPanel";
import PreviewLayout from "./components/PreviewLayout";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useStore();
const nowConfig = ref(null);
function updateConfigCall(payload) {
  nowConfig.value = {
    ...payload,
  };
}
const previewShow = ref(false);

const operationPanel = ref(null);
function clearCall() {
  operationPanel?.value?.clearConfig && operationPanel?.value?.clearConfig();
}
function publishLayout() {
  // store.commit("UPDATE_LAYOUT_CONFIG", JSON.stringify(nowConfig.value));
  store.commit("UPDATE_LAYOUT_CONFIG", nowConfig.value);
  router?.replace("/");
}
</script>

<style scoped lang="less">
@headerH: 60px;
.dynamicConfig--warp {
  width: 100vw;
  height: 100vh;
  background: url(@/assets/images/layout-bg-1.png) no-repeat;
  background-size: 100%;
}
.dynamicConfig--warp__header {
  box-sizing: border-box;
  height: @headerH;
  text-align: left;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  background: url(~@/assets/images/config/header.png) no-repeat;
  background-size: 100% 90px;

  .header--title {
    font-family: YOUSHEBIAOTIHEI;
    font-size: 24px;
  }
  .tools--box {
    margin-left: auto;
  }
}
.aside-list {
  height: calc(100vh - @headerH);
  overflow-x: hidden;
  overflow-y: scroll;
  background: #7fc2e2;

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(206, 205, 205, 0.75);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.15);
  }

  .template-item {
    width: 260px;
    margin: 0 auto 10px;
    height: 60px;
    border-radius: 8px;
    background: #2d7d96;
  }
}
.dynamicConfig--warp__main {
  padding: 0 !important;
  overflow: hidden;
}
</style>
<style lang="less">
.preview--dialog {
  height: 100vh;
  box-sizing: border-box;
  margin: 0;
  position: relative;
  top: 0;
  left: 0;
  .el-dialog__header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
    .el-dialog__headerbtn {
      color: #fff;
      font-size: 24px;
      font-weight: 900;
    }
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>
