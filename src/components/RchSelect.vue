<template>
  <el-select
    :model-value="props.value"
    :placeholder="placeholder"
    :remote-method="fetchDataList"
    :size="size"
    filterable
    remote
    @change="onChange"
  >
    <el-option
      v-for="item in dataList"
      :key="item.rchcd"
      :value="item.rchcd"
      :label="item.rchnm"
    />
  </el-select>
</template>

<script setup>
import { defineProps, ref, watch, defineEmits } from "vue";
import { getListRlrcReachInfo } from "@/apis/home.js";

const props = defineProps({
  /**
   * 绑定数据
   */
  value: {
    type: String,
    default: "",
  },
  /**
   * 绑定label(列表页面需要)
   * @type {string}
   */
  label: {
    type: String,
    default: "",
  },
  /**
   * 所属行政区域
   * @type {string|number}
   */
  adcd: {
    type: [String, Number],
    default: "",
  },
  /**
   * placeholder
   * @type {string}
   */
  placeholder: {
    type: String,
    default: "请选择",
  },
  /**
   * 搜索字符串
   * @type {string}
   */
  searchText: {
    type: String,
    default: "",
  },
  /**
   * 大小
   * @type {string}
   */
  size: {
    type: String,
    default: "default",
  },
});

let dataList = ref([]);

// 拉取数据
const fetchDataList = async (searchText = props.searchText) => {
  if (!props.adcd) {
    dataList.value = [];
  }
  const result = await getListRlrcReachInfo({
    adcd: props.adcd,
    searchText,
  });
  dataList.value = result;
};
watch(
  () => props.adcd,
  () => {
    emits("change", null);
    emits("update:value", null);
    // emits("update:label", null);
    fetchDataList();
  },
  {
    immediate: true,
  }
);

// 数据绑定
const emits = defineEmits(["change", "update:value", "update:label"]);
const onChange = (value) => {
  const target = dataList.value.find((item) => item.rchcd === value);
  emits("change", value);
  emits("update:value", value);
  emits("update:label", target?.rchnm);
};
</script>

<style lang="less" scoped></style>
