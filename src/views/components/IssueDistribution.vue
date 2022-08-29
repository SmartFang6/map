<template>
  <div class="IssueDistribution">
    <Title title="问题派发">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane class="tab-item" label="定性" name="dx"></el-tab-pane>
        <el-tab-pane label="定责" name="dz"></el-tab-pane>
      </el-tabs>
    </Title>

    <div class="out-side">
      <!-- 定性 -->
      <DingXing v-if="activeName === 'dx'" />
      <!-- 定责 -->
      <DingZe v-if="activeName === 'dz'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DingXing from "./DingXing.vue";
import DingZe from "./DingZe.vue";

let activeName = ref("dx");
</script>

<style lang="less" scoped>
.IssueDistribution {
  flex: 1;

  :deep(.el-tabs) {
    height: auto;
    margin-left: 10px;
  }

  :deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
    box-sizing: border-box;
    border: none;
    color: white;
  }

  :deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
    border: none;
  }

  :deep(.el-tabs--card > .el-tabs__header) {
    border: none;
  }
  :deep(.el-tabs__header) {
    margin: 0;
  }
  :deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
    background: url(@/assets/images/checked.png);
    background-size: 100% 100%;
  }
  .out-side {
    width: 100%;
    height: calc(100% - 48px);
    display: flex;
    align-items: center;
  }
}
</style>
