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
      <WaterEvent
        :list="allEvent"
        :info="currentEvnet"
        @viewEventflow="viewEventflow"
        @changeEventInfo="changeEventInfo"
      />
    </template>
    <!-- #endregion -->
    <!-- #region 涉水项目 -->
    <template v-if="activeTab === 3">
      <WaterProject
        :list="allSubList"
        :info="currentSub"
        @getSubDetail="getSubDetail"
      />
    </template>
    <template v-if="activeTab === 4">
      <RiverMasterInfo :info="props.info" />
    </template>
    <!-- #endregion -->
  </div>
  <EventDetailDialog
    :info="currentFlow"
    v-model:visible="eventDetailDialogVisible"
  />
</template>

<script setup>
import { ref, watch } from "vue";
import useHomeDialog from "@/views/components/useHomeDialog.js";
import { getSubjectList } from "@/apis/map";
import { subjectDetail, getEventList } from "@/apis/dialog";
import EventDetailDialog from "@/views/dialog/EventDetail/index";
import RiverMasterInfo from "./components/RiverMasterInfo";
import WaterProject from "./components/WaterProject";
import WaterEvent from "./components/WaterEvent";
import store from "@/store";
import moment from "moment";
const { curDialogCom, currentDialog, isShowTab } = useHomeDialog();
const props = defineProps({
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
const allEvent = ref([]);
const currentEvnet = ref({});
// 获取全部的水域事件
const getAllWaterEvent = async () => {
  let date = new Date().getTime();
  const param = {
    adcd: store?.state?.userInfo?.adminDivCode || "",
    startTime: moment(date - 60 * 1000 * 60 * 24 * 365).format(
      "YYYY-MM-DD HH:mm:ss"
    ),
    endTime: moment(date).format("YYYY-MM-DD HH:mm:ss"),
  };
  let res = await getEventList(param);
  currentEvnet.value = res[0];
  allEvent.value = res;
};
// 切换当前显示的事件
const changeEventInfo = (row) => {
  currentEvnet.value = row;
};

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
]);
const activeTab = ref(1);
const switchTab = (tab) => {
  activeTab.value = tab;
};
const allSubList = ref(null);
const currentSub = ref(null);
// 获取全部的涉水项目
const getAllSubjectList = async () => {
  let res = await getSubjectList({
    adcd: store?.state?.userInfo?.adminDivCode || "",
  });
  allSubList.value = res;
  getSubDetail(res?.[0]);
};
const getSubDetail = async (row) => {
  let res = await subjectDetail({ subjectId: row.id });
  currentSub.value = res;
  console.log(currentSub.value, "currentSub.value ");
};
// 查看事件流程
const currentFlow = ref({});
const viewEventflow = (row) => {
  currentFlow.value = row;
  eventDetailDialogVisible.value = true;
};
// 监听水域类型切换
watch(
  () => props.info,
  (e) => {
    currentDialog.value = e.layerid;
    if (
      e.layerid === "riverLayer" &&
      tabs.value[tabs.value.length - 1].value !== 4
    ) {
      tabs.value.push({
        name: "河长信息",
        value: 4,
      });
    }
    if (isShowTab.value) {
      getAllWaterEvent();
      getAllSubjectList();
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
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
