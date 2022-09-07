<template>
  <Layout>
    <template #header><Header /></template>
    <template #map>
      <div class="map">
        <!-- <MapLayer
          @changeTime="mapRef?.changeTime"
          @changeLayerType="mapRef?.changeLayerType"
        /> -->
        <CenterToolsBar />
        <MapLayer
          @changeTime="onChangeTime"
          @changeLayerType="onChangeLayerType"
        />
        <Map ref="mapRef" @showPop="showPop" />
        <!-- 地图弹窗 -->
        <MapPop ref="MapPopRef" />
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
      <!-- 风险管控-->
      <RiskControl />
      <!-- 处置绩效 -->
      <Performance />
      <!-- 高发问题排名-->
      <HighProblemTopList />
    </template>
    <template #bottom>
      <!-- 问题清单 -->
      <ProblemList />
    </template>
  </Layout>
</template>

<script setup>
import Header from "./components/Header";
import { inject, provide, ref } from "vue";
import { NoticeEvt } from "@/views/config";
import EventStatistics from "./components/EventStatistics.vue";
//import ProblemSource from "./components/ProblemSource.vue";
import IssueDistribution from "./components/IssueDistribution.vue";
import RiskControl from "./components/RiskControl.vue";
import Performance from "./components/Performance/index.vue";
import HighProblemTopList from "./components/HighProblemTopList.vue";
import ProblemList from "./components/ProblemList.vue";
import MapLayer from "./components/MapLayer/index.vue";
import { getEventStat } from "@/apis/home";
import Map from "@/views/OLMap/MainMap";
import store from "@/store";
import moment from "moment";
import MapPop from "./components/MapPop/index.vue";
import CenterToolsBar from "./components/CenterToolsBar.vue";
import router from "@/router";
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
        val = val.toFixed(1);
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
function onChangeLayerType(val) {
  console.log(val, "change-layer-type");
  mapRef.value?.changeLayerType(val);
}

// 地图点位弹窗
let MapPopRef = ref(null);
function showPop(info) {
  console.log(info);
  console.log(MapPopRef, "MapPopRef");
  MapPopRef.value.open(info);
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
.left-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // height: 100%;
  box-sizing: border-box;
  padding: 0 12px;
}
</style>
