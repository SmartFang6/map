<template>
  <Layout>
    <template #header><Header /></template>
    <template #map>
      <div class="map">
        <CenterToolsBar @changeTime="onChangeTime" />
        <MapLayer
          @selectLayers="mapRef?.initLayers"
          @changeLegend="
            ({ layerName, legend }) => mapRef?.changeLegend(layerName, legend)
          "
        />
        <Map ref="mapRef" @showPop="showPop" />
        <!-- 地图弹窗 -->
        <MapPop ref="MapPopRef" />
        <el-dialog
          v-model="dialogShow"
          :width="
            currentDialog === LayerEnum.RESERVOIR_LAYER ||
            currentDialog === LayerEnum.HILLPOND_LAYER
              ? '50%'
              : '30%'
          "
          append-to-body
          destroy-on-close
          custom-class="common_dialog"
        >
          <component
            :is="dialogEmnu[currentDialog]"
            :info="mapInfo"
          ></component>
        </el-dialog>
      </div>
    </template>
    <template #left>
      <div class="left-box">
        <!-- 事件统计 -->
        <EventStatistics />
        <!-- 问题来源 -->
        <ProblemSource />
        <!-- 问题派发 -->
        <IssueDistribution />
      </div>
    </template>
    <template #right>
      <div class="right-box">
        <!-- 风险管控-->
        <!-- <RiskControl /> -->
        <!-- 趋势分析-->
        <TrendAnalysis />
        <!-- 处置绩效 -->
        <Performance />
        <!-- 高发问题排名-->
        <!--<HighProblemTopList />-->
        <PoliciesSystems />
      </div>
    </template>
    <template #bottom>
      <!-- 问题清单 -->
      <ProblemList @select="mapRef?.mapPanToSelectRow" />
    </template>
  </Layout>
</template>

<script setup>
import Header from "./components/Header";
import { inject, provide, ref, shallowRef } from "vue";
import { NoticeEvt } from "@/views/config";
import * as LayerEnum from "@/utils/LayerEnum"; // 图层id
import EventStatistics from "./components/EventStatistics/index.vue";
import ProblemSource from "./components/ProblemSource.vue";
import IssueDistribution from "./components/IssueDistribution.vue";
// import RiskControl from "./components/RiskControl.vue";
import TrendAnalysis from "./components/TrendAnalysis.vue";
import Performance from "./components/Performance/index.vue";
// import HighProblemTopList from "./components/HighProblemTopList.vue";
import ProblemList from "./components/ProblemList.vue";
import MapLayer from "./components/MapLayer/index.vue";
import { getEventStat } from "@/apis/home";
import Map from "@/views/OLMap/MainMap";
import store from "@/store";
import moment from "moment";
import MapPop from "./components/MapPop/index.vue";
import CenterToolsBar from "./components/CenterToolsBar.vue";
import router from "@/router";
import PoliciesSystems from "./components/PoliciesSystems.vue";
// 地图弹窗 -----
// 视频点弹窗
import VideoDialog from "./dialog/VideoDialog.vue";
// 河道弹窗
import RiverDialog from "./dialog/RiverDialog.vue";
const eventBus = inject("EventBus");

// 若未通过单点登录进入，重定向去401页面
const USER_ID = store?.state?.userInfo?.userId;
if (!USER_ID) {
  router.replace("/401");
}

let leftData = ref({});

let dateRange = ref({});

// 获取左侧栏数据
function getLeftData(st = null, et = null) {
  const _startTime =
    st || moment(new Date()).startOf("month").format("YYYY-MM-DD 00:00:00");
  const _endTime =
    et || moment(new Date()).endOf("month").format("YYYY-MM-DD 23:59:59");
  const params = {
    adcd: store?.state?.userInfo?.adminDivCode || "330182",
    endTime: _endTime,
    startTime: _startTime,
  };
  dateRange.value = params;
  getEventStat(params).then((res) => {
    // 事件统计平均耗时（小时）转（天 ）
    if (res.eventStatEvent && res.eventStatEvent.completedAverageCostTime) {
      let day = parseInt(res.eventStatEvent.completedAverageCostTime / 24);
      if (Number.isNaN(day)) {
        day = 0;
      }
      res.eventStatEvent.completedAverageCostTime = day;
    }
    // 事件统计消耗率转百分比
    if (res.eventStatEvent && res.eventStatEvent.completedRate) {
      let val = res.eventStatEvent.completedRate * 100;
      if (Number.isNaN(val)) {
        val = 0;
      } else {
        val = val.toFixed(0);
      }
      res.eventStatEvent.completedRate = val;
    }
    leftData.value = res;
  });
}
// getLeftData();

// 注入左侧栏数据
provide("leftData", leftData);

provide("dateRange", dateRange);

console.log(eventBus, "eventBus", NoticeEvt);
const mapRef = ref(null);
function onChangeTime(val) {
  console.log(val, "on-change-time");
  getLeftData(val.startTime, val.endTime);
  mapRef.value?.changeTime(val);
}

// 地图点位弹窗
const dialogShow = ref(false);
// 当前展示的弹窗
const currentDialog = ref("");
// 弹窗组件
const dialogEmnu = shallowRef({
  [LayerEnum.RIVER_LAYER]: RiverDialog, // 河道弹窗
  [LayerEnum.VIDEO_LAYER]: VideoDialog, // 视频弹窗
});
// 地图弹窗信息
const mapInfo = ref({});
let MapPopRef = ref(null);
function showPop(info) {
  console.log(info);
  currentDialog.value = info.layerid;
  mapInfo.value = info;
  if (info.layerid === "point") {
    MapPopRef.value.open(info);
    return;
  }
  // 因为地图点位和弹窗写的还不全，先把有的弹窗的组件展示，后续写全的时候if判断可以删除。
  if (
    info.layerid === LayerEnum.VIDEO_LAYER ||
    info.layerid === LayerEnum.RIVER_LAYER
  ) {
    dialogShow.value = true;
  }
}
//例: 通知地图
// eventBus.on(NoticeEvt.NOTICE_MAP,  (val) => {
// TODO
// })
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 100%;
}
.left-box,
.right-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 15px;
}
.left-box {
  padding-left: 23px;
}
.right-box {
  padding-right: 23px;
}
</style>
