<template>
  <Layout>
    <template #header><Header /></template>
    <template #map>
      <div class="map">
        <CenterToolsBar @changeTime="onChangeTime" />
        <!-- 图层切换 -->
        <MapLayer
          @selectLayers="selectLayers"
          @showDesc="showPop({ layerid: 'point', detail: true })"
        />
        <Map ref="mapRef" @showPop="showPop" @changeLegend="changeLegend" />
        <!-- 地图弹窗 -->
        <MapPop ref="MapPopRef" />
        <el-dialog
          v-model="dialogShow"
          append-to-body
          width="820px"
          destroy-on-close
          custom-class="map_dialog"
        >
          <WaterAllDialog :info="mapInfo" />
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
        <!-- 图例 -->
        <LegendMap :legendList="legendList" @change="handleCheckLegendChange" />
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
      <ProblemList @select="mapRef?.mapPanToSelectRow" :search="activeFilter" />
    </template>
  </Layout>
</template>

<script setup>
import Header from "./components/Header";
import { inject, provide, ref, watch } from "vue";
import { NoticeEvt } from "@/views/config";
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
import LegendMap from "@/views/components/legendMap";
import store from "@/store";
import moment from "moment";
import MapPop from "./components/MapPop/index.vue";
import CenterToolsBar from "./components/CenterToolsBar.vue";
import router from "@/router";
import PoliciesSystems from "./components/PoliciesSystems.vue";

import useActiveFilter from "./useActiveFilter.js";
import WaterAllDialog from "./dialog/WaterAllDialog.vue";

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
// 地图弹窗信息
const mapInfo = ref({});
let MapPopRef = ref(null);
function showPop(info) {
  mapInfo.value = info;
  //@TODO 演示代码, 其他相关联的也是演示代码，演示完后删除
  if (info.detail) {
    MapPopRef.value.open(false, true);
    return;
  }
  //@TODO END
  if (info.layerid === "point") {
    MapPopRef.value.open(info);
    return;
  }
  dialogShow.value = true;
}

// 全局联动过滤参数改变时调用地图方法
const activeFilter = useActiveFilter();
watch(
  () => activeFilter.value,
  (activeFilter) => {
    console.log("activeFilter changed =>", activeFilter);
    mapRef.value?.changeFilter({
      ...activeFilter,
    });
  }
);

//例: 通知地图
// eventBus.on(NoticeEvt.NOTICE_MAP,  (val) => {
// TODO
// })
// 当前图例legend
const legendList = ref([]);
const layerName = ref("");
let curLegend = [];
// 图例筛选
const handleCheckLegendChange = (legend) => {
  curLegend = legend;
  mapRef.value?.changeLegend(layerName, legend ?? []);
};
// 图层切换 当前图层，已选择图层name列表
const selectLayers = ({ layerInfos, selectLayers }) => {
  legendList.value = layerInfos?.legend ?? [];
  //切换图例的时候 如果当前的图例类型相同的话，就还用之前的图例去渲染地图线，否则用新的图例渲染
  let nowLegend = legendList.value?.filter((i) => i.type);
  let legend = layerInfos?.type == layerName.value ? curLegend : nowLegend;
  layerName.value = layerInfos?.type ?? "";
  // 调用地图事件初始化图例图层。
  mapRef.value?.initLayers(selectLayers);
  // 切换图例
  handleCheckLegendChange(legend);
};
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
