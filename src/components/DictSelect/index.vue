<template>
  <el-select
    v-if="props.type === 'select'"
    :model-value="props.selectValue"
    v-bind="$attrs"
    @change="modelChange"
  >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item[props.labelKey]"
      :value="item[props.valueKey]"
    >
    </el-option>
  </el-select>
  <el-checkbox-group
    v-if="props.type === 'checkbox'"
    :model-value="props.selectValue"
    v-bind="$attrs"
    @change="modelChange"
  >
    <el-checkbox
      v-for="item in options"
      :key="item.id"
      :label="item[props.valueKey]"
      >{{ item[props.labelKey] }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getListDict } from "@/apis/home.js";
const props = defineProps({
  selectValue: {
    type: [String, Array],
    required: true,
  },
  type: {
    type: String,
    default: "select",
  },
  // 字典规则 tableCode:columnCode
  dictString: {
    type: String,
    default: "",
  },
  labelKey: {
    type: String,
    default: "ntlang",
  },
  valueKey: {
    type: String,
    default: "eucd",
  },
  /**
   * 一些地方需要返回select选中对应的label
   * @type {string}
   */
  selectLabel: {
    type: String,
    default: "",
  },
});
// emits
const emits = defineEmits([
  "update:selectValue",
  "change",
  "update:selectLabel",
]);

const options = ref([]);

onMounted(async () => {
  let res = await getListDict(props.dictString);
  options.value = res[props.dictString];
});

const modelChange = (value) => {
  emits("update:selectValue", value);
  emits("change", value);
  const curr = options.value.find((opt) => opt[props.valueKey] === value);
  if (curr) {
    emits("update:selectLabel", curr[props.labelKey]);
  }
};
</script>

<style scoped lang="less"></style>
