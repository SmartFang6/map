<!------------------------------------------------------
 ¦ 事件类型级联选择器
 ¦ 
 ¦ Author: 大风
 ¦ Date: 2022-08-25 19:28:41
 ¦ FilePath: src/components/EventTypeCascader.vue
 ¦----------------------------------------------------->

<template>
  <el-cascader
    v-model="value"
    :props="cascaderProps"
    :options="cascaderOptions"
    :size="size"
    v-bind="$attrs"
    placeholder="请选择"
    @change="onChaneg"
    @focus="emits('focus')"
    ref="cascaderRef"
    clearable
  >
    <template #default="{ data }">
      <el-tooltip
        effect="light"
        :enterable="false"
        :show-after="100"
        placement="top-start"
        :content="data.label"
        popper-class="tool-tip"
      >
        <span class="cascader-item-container">{{ data.label }}</span>
      </el-tooltip>
    </template>
  </el-cascader>
</template>

<script setup>
import { getListEventTypeByAdcd } from "@/apis/common";
import { ref, watch } from "vue";

const emits = defineEmits(["change", "update:value", "reset", "focus"]);
const props = defineProps({
  /**
   * value
   * @type {Object[]}
   */
  modelValue: {
    type: Array,
    default: () => [],
  },
  /**
   * 行政区域
   * @type {string}
   */
  adcd: {
    default: null,
    type: String,
  },
  /**
   * 传所属行政区域街道
   * @type {
   */
  searchText: {
    default: "",
    type: String,
  },
  /**
   * 尺寸
   * @type {string}
   */
  size: {
    default: "default",
    type: String,
  },
});

// 数据绑定
const value = ref(null);
// ref
const cascaderRef = ref(null);
// 数据列表
const cascaderOptions = ref([]);

watch(
  () => [props.modelValue, cascaderOptions.value],
  ([modelValue, cascaderOptions]) => {
    // 如果只有一个的话，说明这里是需要回显
    if (modelValue?.length === 1 && cascaderOptions?.length > 0) {
      const parent = cascaderOptions.find((root) =>
        root.children.find((child) => child.eventTypeId === modelValue[0])
      );
      if (parent && parent.eventTypeId) {
        value.value = [parent.eventTypeId, modelValue[0]];
        const current = parent.children.find(
          (item) => item.eventTypeId === modelValue[0]
        );
        emits("change", current);
      } else {
        // 这里如果找不到事件类型父级，则触发reset事件（提供父级
        // 组件清空关联数据用, 业务需求)
        emits("reset");
        // throw new Error("数据错误，找不到事件类型父级");
      }
    } else if (modelValue?.length === 0) {
      value.value = [];
    }
  },
  { immediate: true }
);

watch(
  () => value.value,
  (value) => {
    emits("update:value", value);
  }
);

watch(
  () => [props.adcd, props.searchText],
  async (params) => {
    const [adcd, searchText] = params;
    if (!adcd || !searchText) {
      cascaderOptions.value = [];
      return;
    }
    const sourceList = await getListEventTypeByAdcd({
      adcd,
      searchText,
    });
    const eventTypeList = [];
    sourceList.forEach((source) => {
      if (
        !eventTypeList.find(
          (e) => e.eventCategoryCode === source.eventCategoryCode
        )
      ) {
        eventTypeList.push({
          ...source,
          label: source.eventCategory,
          value: source.eventTypeId,
        });
      }
    });
    eventTypeList.forEach((e) => {
      e.children = sourceList
        .filter((i) => i.eventCategoryCode === e.eventCategoryCode)
        .map((i) => {
          return {
            ...i,
            label: i.eventSubCategory,
            value: i.eventTypeId,
          };
        });
    });
    cascaderOptions.value = eventTypeList;
  },
  { immediate: true }
);

const onChaneg = () => {
  const node = cascaderRef.value?.getCheckedNodes()?.at(-1)?.data;
  if (node) {
    emits("change", node);
  }
};
</script>

<style lang="less" scoped>
.cascader-item-container {
  width: 170px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
