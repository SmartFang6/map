<template>
  <Layout>
    <template #header><Header /></template>
    <template #map>
      <div class="map">
        <Map />
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
import { getEventStat } from "@/apis/home";
import Map from "@/views/OLMap/MainMap";
const eventBus = inject("eventBus");
let leftData = ref(null);
// 获取左侧栏数据
function getLeftData() {
  const params = {
    adcd: "330182",
    endTime: "2022-08-23 09:29:29",
    startTime: "2022-07-23 09:29:29",
  };
  getEventStat(params).then((res) => {
    console.log(res);
  });
}
getLeftData();
// 注入左侧栏数据
provide("leftData", leftData);

console.log(eventBus, "eventBus", NoticeEvt);
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100vh;
  font-size: 200px;
  font-weight: 900;
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
