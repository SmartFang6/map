<!-- 水域调查弹窗 -->
<template>
  <div class="pop">
    <div class="header_title">{{ props.info?.name }}</div>
    <div class="body">
      <div class="tabs" v-if="isShowTab">
        <div
          class="tab"
          v-for="item in tabs"
          :class="activeTab === item.value ? 'tab_act' : ''"
          :key="item.name"
          @click="switchTab(item.value)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- #region 水域基础信息 -->
    <div class="base" v-if="activeTab === 1">
      <component :is="curDialogCom" :info="props.info"></component>
    </div>
    <!-- #endregion -->
    <!-- #region 水域事件 -->
    <template v-if="activeTab === 2">
      <WaterEvent />
    </template>
    <!-- #endregion -->
    <!-- #region 涉水项目 -->
    <template v-if="activeTab === 3"><WaterProject /></template>
    <template v-if="activeTab === 4">
      <RiverMasterInfo />
    </template>
    <!-- #endregion -->
  </div>
  <EventDetailDialog
    :info="props.info"
    v-model:visible="eventDetailDialogVisible"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import useHomeDialog from "@/views/components/useHomeDialog.js";
import EventDetailDialog from "@/views/dialog/EventDetail/index";
import RiverMasterInfo from "./components/RiverMasterInfo";
import WaterProject from "./components/WaterProject";
import WaterEvent from "./components/WaterEvent";
// import { ElMessage } from "element-plus";
// import store from "@/store";
const { curDialogCom, currentDialog, isShowTab } = useHomeDialog();
const props = defineProps({
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
// 监听水域类型切换
watch(
  () => props.info,
  (e) => {
    console.log(e, "eeee");
    currentDialog.value = e.layerid;
    console.log(curDialogCom);
  },
  {
    immediate: true,
    deep: true,
  }
);
// 切换tab
const tabs = ref([
  {
    name: "水域基础信息",
    value: 1,
  },
  {
    name: "水域事件",
    value: 2,
  },
  {
    name: "涉水项目",
    value: 3,
  },
  {
    name: "河长信息",
    value: 4,
  },
]);
const activeTab = ref(1);
const switchTab = (tab) => {
  activeTab.value = tab;
};

// 跳转后台详情
// function onJupmDetail() {
//   if (store?.state?.userInfo?.roleId === "065e6e9013954b09b013a1846499a720") {
//     eventDetailDialogVisible.value = true;
//   } else {
//     ElMessage({
//       message: "本功能暂未开放",
//       type: "warning",
//     });
//   }
// }
const eventDetailDialogVisible = ref(false);
// 获取全部的水域事件
// 获取全部的涉水项目
</script>

<style lang="less" scoped>
.pop {
  .tabs {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .tab {
      width: 135px;
      height: 27px;
      font-family: YouSheBiaoTiHei;
      font-size: 18px;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
    }
    .tab_act {
      width: 135px;
      height: 27px;
      background: url(@/assets/images/water_tab.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
