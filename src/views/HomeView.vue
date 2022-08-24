<template>
  <Layout>
    <template #header><Header /></template>
    <template #map>
      <div class="map">
        <!-- <MapLayer
          @changeTime="mapRef?.changeTime"
          @changeLayerType="mapRef?.changeLayerType"
        /> -->
        <MapLayer
          @changeTime="onChangeTime"
          @changeLayerType="onChangeLayerType"
        />
        <Map ref="mapRef" @showPop="showPop" />
      </div>
    </template>
    <template #left>
      <!-- 事件统计 -->
      <EventStatistics />
      <!-- 问题来源 -->
      <ProblemSource />
      <!-- 问题派发 -->
      <IssueDistribution />
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
import ProblemSource from "./components/ProblemSource.vue";
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
const eventBus = inject("EventBus");

let leftData = ref({});
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
  getEventStat(params).then((res) => {
    leftData.value = res;
  });
}
// getLeftData();

// 注入左侧栏数据
provide("leftData", leftData);

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
  height: 100%;
  box-sizing: border-box;
  padding: 0 12px;
}
</style>
