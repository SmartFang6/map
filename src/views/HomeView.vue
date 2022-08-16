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
  </Layout>
</template>

<script setup>
import Header from "./components/Header";
import { inject } from "vue";
import { NoticeEvt } from "@/views/config";
import EventStatistics from "./components/EventStatistics.vue";
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
