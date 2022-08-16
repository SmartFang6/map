<template>
  <Layout>
    <template #header><Header /></template>
    <template #map>
      <div class="map">MAP</div>
    </template>
    <template #left>
      <test />
    </template>
  </Layout>
</template>

<script setup>
import Header from "./components/Header";
import { inject } from "vue";
import { NoticeEvt } from "@/views/config";
const eventBus = inject("eventBus");

// console.log(eventBus, "eventBus", NoticeEvt);
// 通知 home
eventBus.on(NoticeEvt.NOTICE_HOME, (val) => {
  console.log(val);
  // TODO
});

function onTest() {
  eventBus.$emit("testEventBus", "123");
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
  text-align: center;
  line-height: 100vh;
  font-size: 200px;
  font-weight: 900;
}
</style>
