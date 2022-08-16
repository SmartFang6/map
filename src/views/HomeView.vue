<template>
  <Layout>
    <template #header><Header /></template>
    <template #map>
      <div class="map">MAP</div>
    </template>
    <template #left>
      <!-- 事件统计 -->
      <EventStatistics />
    </template>
    <template #right>
      <!-- 风险管控-->
      <RiskControl />
      <!-- 处置绩效 -->
      <Performance />
      <!-- 问题待结案排名-->
      <OpenProblemTopList />
    </template>
    <template #bottom>
      <!-- 问题清单 -->
      <ProblemList />
    </template>
  </Layout>
</template>

<script setup>
import Header from "./components/Header";
import { inject } from "vue";
import { NoticeEvt } from "@/views/config";
import EventStatistics from "./components/EventStatistics.vue";
import RiskControl from "./components/RiskControl.vue";
import Performance from "./components/Performance/index.vue";
import OpenProblemTopList from "./components/OpenProblemTopList.vue";
import ProblemList from "./components/ProblemList.vue";
const eventBus = inject("eventBus");

console.log(eventBus, "eventBus", NoticeEvt);

//例: 通知地图
// eventBus.on(NoticeEvt.NOTICE_MAP,  (val) => {
// TODO
// })
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
</style>
