<!------------------------------------------------------
 ¦ 水域概况弹窗
 ¦ 文件描述
 ¦ 
 ¦ Author: 大风
 ¦ Date: 2022-09-12 00:46:02
 ¦ FilePath: src/views/components/MapLayer/WatersDescriptionDialog.vue
 ¦----------------------------------------------------->

<template>
  <el-dialog
    v-model="dialogVisible"
    idth="20px"
    append-to-body
    destroy-on-close
    top="10vh"
    custom-class="common_dialog"
  >
    <div class="content">{{ currentAdcd }}水域概况信息...</div>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import store from "@/store";

const emits = defineEmits(["update:visible"]);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

// 是否显示弹窗
const dialogVisible = ref(false);
const currentAdcd = ref("");
currentAdcd.value = store.state.adcdName || "";

watch(
  () => props.visible,
  (visible) => {
    dialogVisible.value = visible;
  },
  { immediate: true }
);

watch(
  () => dialogVisible.value,
  (dialogVisible) => {
    if (!dialogVisible) {
      emits("update:visible", dialogVisible);
    }
  }
);
</script>

<style lang="less" scoped>
.content {
  color: #fff;
  font-size: 16px;
  min-height: 600px;
}
</style>
