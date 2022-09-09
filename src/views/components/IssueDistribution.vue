<template>
  <div class="IssueDistribution">
    <Title title="事件派发">
      <template #tabs>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane class="tab-item" label="定性" name="dx"></el-tab-pane>
          <el-tab-pane label="定责" name="dz"></el-tab-pane>
        </el-tabs>
      </template>
      <template #more>
        <div class="tools">
          <!-- <i class="icon-square" @click="DialogVisible = true"></i> -->
          <i class="icon-zoom" @click="moreDialogVisible = true"></i>
        </div>
      </template>
    </Title>

    <div class="out-side">
      <!-- 定性 -->
      <DingXing v-if="activeName === 'dx'" />
      <!-- 定责 -->
      <DingZe v-if="activeName === 'dz'" />
    </div>
    <!-- 魔方弹窗 -->
    <el-dialog
      v-model="moreDialogVisible"
      width="60%"
      append-to-body
      destroy-on-close
      custom-class="common_dialog"
    >
      <IssueDialog />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DingXing from "./DingXing.vue";
import DingZe from "./DingZe.vue";
import IssueDialog from "./IssueDialog/index.vue";

let activeName = ref("dx");
let moreDialogVisible = ref(false);
</script>

<style lang="less" scoped>
.IssueDistribution {
  height: 302px;

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
  :deep(.tools) {
    display: flex;
    position: absolute;
    right: 0;
    padding-right: 48px;

    i[class^="icon-"] {
      margin-left: 20px;
      cursor: pointer;
    }

    i[class^="icon-"]:first-child {
      margin-left: 0;
    }

    .icon-square {
      width: 18px;
      height: 18px;
      background: url(@/assets/images/icon-square.png) no-repeat;
      background-size: 100% 100%;
    }

    .icon-zoom {
      width: 16px;
      height: 16px;
      background: url(@/assets/images/icon-zoom.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .more_dialog {
    :deep(.el-dialog) {
      border: 1px solid #64d2f7;
      color: white;
      background-color: rgba(25, 56, 91, 1);
    }
  }
}
</style>
