<template>
  <div class="map-pop">
    <el-dialog v-model="dialogVisible" width="30%">
      <template #title>{{ info?.eventSourceName }}</template>
      <el-descriptions :column="2" border>
        <el-descriptions-item
          :label="item.name"
          v-for="(item, idx) in infoConfig"
          :key="idx"
          >{{ info[item.key] }}</el-descriptions-item
        >
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
let dialogVisible = ref(false);
let info = ref({});

const infoConfig = [
  {
    name: "行政区域",
    key: "adnm",
  },
  {
    name: "事件编号",
    key: "eventId",
  },
  {
    name: "事件状态",
    key: "eventNewStatus",
  },
  {
    name: "所属河湖",
    key: "rchnm",
  },
  {
    name: "上报人员",
    key: "reportUser",
  },
  {
    name: "发生时间",
    key: "occurTime",
  },
];

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
    background-color: rgba(50, 130, 223, 0.9);
    color: white;
  }
}
</style>
