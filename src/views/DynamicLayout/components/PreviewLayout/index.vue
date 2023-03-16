<!--****************************************
 * 大屏预览页面
 *
 * founder: king
 * Date:  10 2022/10/10
 *****************************************-->
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
        <Map ref="mapRef" @showPop="showPop" />
        <!-- 地图弹窗 -->
        <MapPop ref="MapPopRef" />
        <el-dialog
          v-model="dialogShow"
          append-to-body
          width="1260px"
          destroy-on-close
          top="10vh"
          custom-class="map_dialog"
        >
          <WaterAllDialog :info="mapInfo" />
        </el-dialog>
        <!-- 图例 -->
        <LegendMap :legendList="legendList" @change="handleCheckLegendChange" />
      </div>
    </template>
    <template #left>
      <div class="left-box">
        <template v-for="side in nowConfig?.left" :key="side?.widgetCode">
          <DynamicSideUI :widgetConfig="side" />
        </template>
      </div>
    </template>
    <template #right>
      <div class="right-box">
        <template v-for="side in nowConfig?.right" :key="side?.widgetCode">
          <DynamicSideUI :widgetConfig="side" />
        </template>
      </div>
    </template>
    <template #bottom>
      <!-- 问题清单 -->
      <ProblemList @select="mapRef?.mapPanToSelectRow" :search="activeFilter" />
    </template>
  </Layout>
</template>

<script setup>
/**
 大屏预览页面
 **/
import DynamicSideUI from "@/components/DynamicSideUI";
import Header from "@/views/components/Header";
import { ref, watch } from "vue";
import ProblemList from "@/views/components/ProblemList.vue";
import MapLayer from "@/views/components/MapLayer/index.vue";
import Map from "@/views/OLMap/MainMap";
import LegendMap from "@/views/components/legendMap";
import store from "@/store";
import moment from "moment";
import MapPop from "@/views/components/MapPop/index.vue";
import CenterToolsBar from "@/views/components/CenterToolsBar.vue";
import router from "@/router";

import useActiveFilter from "@/views/useActiveFilter.js";
import WaterAllDialog from "@/views/dialog/WaterAllDialog";

defineProps({
  nowConfig: {
    type: Object,
    required: true,
  },
});

// 若未通过单点登录进入，重定向去401页面
const USER_ID = store?.state?.userInfo?.userId;
if (!USER_ID) {
  router.replace("/401");
}

let dateRange = ref({});
const dateRangeChange = (st, et) => {
  const startTime =
    st || moment(new Date()).startOf("month").format("YYYY-MM-DD 00:00:00");
  const endTime =
    et || moment(new Date()).endOf("month").format("YYYY-MM-DD 23:59:59");
  dateRange.value = {
    adcd: store?.state?.userInfo?.adminDivCode,
    startTime,
    endTime,
  };
  store.commit("UPDATE_DATE_RANGE", dateRange.value);
};

const mapRef = ref(null);
function onChangeTime(val) {
  console.log("111111111111");
  // console.log(val, "on-change-time");
  dateRangeChange(val.startTime, val.endTime);
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
    // console.log("activeFilter changed =>", activeFilter);
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
  justify-content: flex-start;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 15px;
  & > div {
    position: relative;
  }
  & > .add_warp:nth-child(1) {
    z-index: 1;
  }
  & > .add_warp:nth-child(2) {
    z-index: 2;
  }
  & > .add_warp:nth-child(3) {
    z-index: 3;
  }
}
.left-box {
  padding-left: 23px;
}
.right-box {
  padding-right: 23px;
}
</style>
