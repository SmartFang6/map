<!--****************************************
 * 编辑 side 组件
 *
 * founder: king
 * Date:  28 2022/9/28
 *****************************************-->
<template>
  <div class="edit-warp">
    <el-form :model="formData" label-position="top">
      <el-form-item>
        <template #label>
          <h3>组件布局</h3>
        </template>
        <el-radio-group @change="countChange" v-model="formData.tabCount">
          <el-radio-button
            v-for="btn in tabCountListView"
            :key="btn?.value"
            :label="btn?.value"
          >
            {{ btn?.title }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <template #label>
          <h3>标题名称</h3>
        </template>
        <div class="title-warp">
          <div
            class="title-warp__item"
            v-for="(item, idx) in formData.widgets"
            :key="idx"
          >
            <el-input
              v-model="item.title"
              placeholder="输入标签名称"
              style="margin-right: 20px; width: 400px"
            >
              <template #prepend>{{ `标题${idx + 1}` }}</template>
            </el-input>
            <el-input
              v-model="item.widgetCode"
              disabled
              style="margin-right: 20px; width: 300px"
            >
              <template #prepend>组件IC</template>
              <template #append>
                <el-icon color="#1ddc20" v-if="item.widgetCode">
                  <CircleCheckFilled />
                </el-icon>
                <el-icon color="#dc401d" v-else><CircleClose /></el-icon>
              </template>
            </el-input>
            <el-button type="primary" link @click="bindWidget(item, idx)">
              {{ item.widgetCode ? "更换" : "添加" }}组件
            </el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="$emit('close')">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      v-model="showWidgetList"
      width="85vw"
      top="10vh"
      destroy-on-close
    >
      <template #header>
        <header class="widgets--header">组件库</header>
      </template>
      <WidgetList :filterList="useWidget" @submitSelect="submitSelectCall" />
    </el-dialog>
  </div>
</template>

<script setup>
/**
 编辑 side 组件
 **/
import { computed, onMounted, reactive, ref } from "vue";
import { CircleCheckFilled, CircleClose } from "@element-plus/icons-vue";
import WidgetList from "./WidgetList";

const props = defineProps({
  nowSide: {
    type: Object,
    default: () => ({
      type: "add",
      location: "",
      idx: null,
      widgets: [],
    }),
  },
});
const emits = defineEmits(["submitUpdate", "close"]);

// 布局新增
// 布局新增
const tabCountList = ref([
  {
    title: "一列",
    value: 1,
  },
  {
    title: "两列",
    value: 2,
  },
  {
    title: "三列",
    value: 3,
  },
]);
const tabCountListView = computed(() => {
  return [
    ...tabCountList.value,
    {
      title: "追加",
      value: "add",
    },
  ];
});
const formData = reactive({
  tabCount: 1,
  widgets: [
    {
      title: "",
      poster: "",
      widgetCode: "",
    },
  ],
});

const useWidget = computed(() => {
  return formData?.widgets?.map((item) => item?.widgetCode);
});
const countChange = (val) => {
  console.log(val);
  if (val === "add") {
    const numStr = [
      "零",
      "一",
      "二",
      "三",
      "四",
      "五",
      "六",
      "七",
      "八",
      "九",
      "十",
    ];
    tabCountList.value.push({
      title: numStr[tabCountList.value.length + 1] + "列",
      value: tabCountList.value.length + 1,
    });
    formData.tabCount = Number(tabCountList.value.length);
  }
  const widgetCount = formData.widgets?.length;
  if (widgetCount < formData.tabCount) {
    for (let i = 0; i < formData.tabCount - widgetCount; i++) {
      formData.widgets.push({
        title: "",
        poster: "",
        widgetCode: "",
      });
    }
  } else {
    formData.widgets = formData.widgets.slice(0, formData.tabCount);
  }
};

// 列 绑定组件
const showWidgetList = ref(false);
const activeWidget = ref();
const bindWidget = (tab, index) => {
  showWidgetList.value = true;
  activeWidget.value = index;
};
const submitSelectCall = (payload) => {
  showWidgetList.value = false;
  formData.widgets[activeWidget.value].poster = payload?.poster;
  formData.widgets[activeWidget.value].widgetCode = payload?.widgetCode;
  if (payload?.componentInfoId) {
    formData.widgets[activeWidget.value].componentInfoId =
      payload?.componentInfoId;
  }
};

const submit = () => {
  const payload = {
    ...props?.nowSide,
    widgets: formData.widgets,
  };
  emits("submitUpdate", payload);
};
onMounted(() => {
  const { type, widgets } = props?.nowSide || {};
  if (type === "edit") {
    let _widgets = JSON.stringify(widgets);
    formData.widgets = JSON.parse(_widgets);
    formData.tabCount = JSON.parse(_widgets)?.length;
  }
});
</script>

<style scoped lang="less">
.edit-warp {
  //height: 300px;
  .title-warp {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;

    .title-warp__item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
    }
  }
}
.widgets--header {
  text-align: left;
  font-size: 20px;
  font-weight: 700;
}
</style>
