<template>
  <div class="map-pop">
    <el-dialog v-model="dialogVisible" width="40%">
      <template #title>
        <div class="pop-title">
          <span>{{ info?.eventSourceName }}</span>
          <el-tag
            :type="getTag(info.eventGrade)"
            size="small"
            class="tag"
            effect="dark"
            >{{ info.eventGradeName }}</el-tag
          >
        </div>
      </template>
      <div class="pop-body">
        <el-row :gutter="40" class="item-row">
          <el-col :span="12">
            <div class="item">
              <span class="item-label">行政区域</span>
              <span class="item-content">{{ info.adnm }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="item-label">事件编号</span>
              <span class="item-content">{{ info.eventId }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40" class="item-row">
          <el-col :span="12">
            <div class="item">
              <span class="item-label">事件状态</span>
              <span class="item-content">{{ info.eventNewStatus }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="item-label">所属河湖</span>
              <span class="item-content">{{ info.rchnm }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40" class="item-row">
          <el-col :span="12">
            <div class="item">
              <span class="item-label">上报人员</span>
              <span class="item-content">{{ info.reportUser }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <span class="item-label">发生时间</span>
              <span class="item-content">{{ info.occurTime }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
let dialogVisible = ref(false);
let info = ref({});

// 事件等级颜色匹配
function getTag(val) {
  const typeMap = {
    1: "danger",
    2: "warning",
    3: "success",
  };
  return typeMap[val];
}

// 打开弹窗
function open(val) {
  info.value = val;
  dialogVisible.value = true;
}
defineExpose({
  open,
});
</script>

<style lang="less" scoped>
.map-pop {
  :deep(.el-dialog) {
    background-color: rgba(#19385b, 0.8);
    color: white;
    border: 1px solid #64d2f7;
  }

  :deep(.el-dialog__headerbtn .el-dialog__close) {
    background-color: #0adbe0;
    border: solid 1px white;
    color: white;
  }

  .pop-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #0adbe0;
    font-size: 24px;

    .tag {
      margin-left: 10px;
    }
  }

  .pop-body {
    padding: 0 15px;

    .item-row {
      margin-bottom: 20px;
      line-height: 40px;
    }
  }

  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;

    &-label {
      width: 120px;
      box-sizing: border-box;
      // background: url(@/assets/images/custom-select-bg.png);
      background: url(@/assets/images/pop-label.png);
      background-size: 100% 100%;
    }

    &-content {
      flex: 1;
      margin-left: 10px;
      text-align: center;
      box-sizing: border-box;
      // padding: 10px;
      border-bottom: 2px solid #0fc1da;
    }
  }
}
</style>
