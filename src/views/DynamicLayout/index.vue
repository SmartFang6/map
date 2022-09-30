<!--****************************************
 * 大屏配置页面
 *
 * founder: king
 * Date:  28 2022/9/28
 *****************************************-->
<template>
  <el-container style="width: 100vw; height: 100vh">
    <el-header>
      <h1 style="height: 60px; background: #7fc2e2">大屏配置页面</h1>
    </el-header>
    <el-container>
      <el-aside class="aside-list" width="16vw">
        <div class="template-item" v-for="item in templateList" :key="item?.id">
          dd
        </div>
      </el-aside>
      <el-main>
        <OperationPanel />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
/**
 大屏配置页面
 **/
import { ref } from "vue";
import OperationPanel from "./components/OperationPanel";

const templateList = ref([]);
setTimeout(() => {
  templateList.value = Array(6);
  templateList.value.fill({ id: Math.random() });
}, 1000);
</script>

<style scoped lang="less">
.aside-list {
  height: calc(100vh - 60px);
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
</style>
