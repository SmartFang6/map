<!------------------------------------------------------
 ¦ 事件统计-环形图
 ¦ 
 ¦ Author: 大风
 ¦ Date: 2022-09-08 10:04:01
 ¦ FilePath: src/views/components/EventStatisticsChart.vue
 ¦ Dependencies: d3
 ¦----------------------------------------------------->

<template>
  <div v-if="data" class="event-stat-chart">
    <!--#region 类型切换-->
    <div class="types">
      <el-dropdown>
        <div class="dropdown-inner">
          <span>{{ currentType.label }}</span>
          <img src="@/assets/images/center-tools-dropdown-arrow.png" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(types, index) in types"
              :key="index"
              @click="currentType = types"
            >
              {{ types.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!--#endregion-->

    <!--#region 图表-->
    <div class="chart-wrapper">
      <img src="@/assets/images/donut-bottom-bg.png" />
      <div class="chart-container" ref="chartContainer" />
    </div>
    <!--#endregion-->
  </div>
</template>

<script setup>
import { ref, watch, inject, computed } from "vue";
import { getEventIncidenceRank } from "@/apis/cockpitEventStats";
import "echarts-gl";
import * as Echarts from "echarts";
import getPie3DOptions, { getParametricEquation } from "./getPie3DOptions";

const props = defineProps({
  data: {
    type: Object,
    default: () => null,
  },
});
console.log(props);

const colors = [
  "#03ffa9",
  "#00ecff",
  "#ff4d65",
  "#ff9700",
  "#17b3ff",
  "#ffd633",
];

// 统计类型
const types = [
  {
    label: "类型",
    value: 1,
  },
  {
    label: "区域",
    value: 2,
  },
];

// 选中的类型
const currentType = ref(types[0]);

// 图表容器
const chartContainer = ref(null);

// 获取注入的时间区间
let dateRange = inject("dateRange");

// 数据源 & 拉取数据
const dataSource = ref([]);
watch(
  () => dateRange.value,
  async (dateRange) => {
    dataSource.value = await getEventIncidenceRank({
      ...dateRange,
    });
  },
  { immediate: true }
);

// 数据列表
const dataList = computed(() => {
  const isType = currentType.value.value === 1;
  const source = isType
    ? props.data?.eventTypeCount
    : props.data?.eventAdcdCount;
  if (!Array.isArray(source) || source.length <= 0) {
    return [];
  }
  const result = source
    .sort((a, b) => b.amount - a.amount)
    .filter((a, index) => index < 6)
    .map((item, index) => {
      return {
        name: item.obj,
        value: item.amount,
        rate: (item.proportion * 100).toFixed(2),
        itemStyle: {
          color: colors[index],
        },
      };
    });
  return result;
  /*
  const total = result
    .map((item) => item.value)
    .reduce((prev, curr) => prev + curr, 0);
  return result.map((item) => {
    return {
      ...item,
      rate: ((item.value / total) * 100).toFixed(2),
    };
  });*/
});

let option = ref({});
let chartTool = null;
let hoveredIndex = "";

function chartMouseover(params) {
  // 准备重新渲染扇形所需的参数
  let isSelected;
  let isHovered;
  let startRatio;
  let endRatio;
  let k;
  let i;

  // 如果触发 mouseover 的扇形当前已高亮，则不做操作
  if (hoveredIndex === params.seriesIndex) {
    return;

    // 否则进行高亮及必要的取消高亮操作
  } else {
    // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
    if (hoveredIndex !== "") {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
      isSelected = option.value.series[hoveredIndex].pieStatus.selected;
      isHovered = false;
      startRatio = option.value.series[hoveredIndex].pieData.startRatio;
      endRatio = option.value.series[hoveredIndex].pieData.endRatio;
      k = option.value.series[hoveredIndex].pieStatus.k;
      i =
        option.value.series[hoveredIndex].pieData.value ===
        option.value.series[0].pieData.value
          ? 35
          : 10;
      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      option.value.series[hoveredIndex].parametricEquation =
        getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          i
        );
      option.value.series[hoveredIndex].pieStatus.hovered = isHovered;

      // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
      hoveredIndex = "";
    }

    // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
    if (params.seriesName !== "mouseoutSeries") {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
      isSelected = option.value.series[params.seriesIndex].pieStatus.selected;
      isHovered = true;
      startRatio = option.value.series[params.seriesIndex].pieData.startRatio;
      endRatio = option.value.series[params.seriesIndex].pieData.endRatio;
      k = option.value.series[params.seriesIndex].pieStatus.k;

      // 对当前点击的扇形，执行高亮操作（对 option 更新）
      option.value.series[params.seriesIndex].parametricEquation =
        getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          option.value.series[params.seriesIndex].pieData.value / 5 + 5 // 控制高亮柱状高度
        );
      option.value.series[params.seriesIndex].pieStatus.hovered = isHovered;

      // 记录上次高亮的扇形对应的系列号 seriesIndex
      hoveredIndex = params.seriesIndex;
    }

    // 使用更新后的 option，渲染图表
    chartTool.setOption(option);
  }
}

// 修正取消高亮失败的 bug
function globaloutHandler() {
  if (hoveredIndex !== "") {
    // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
    let isSelected = option.value.series[hoveredIndex].pieStatus.selected;
    let isHovered = false;
    let k = option.value.series[hoveredIndex].pieStatus.k;
    let startRatio = option.value.series[hoveredIndex].pieData.startRatio;
    let endRatio = option.value.series[hoveredIndex].pieData.endRatio;
    // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
    let i =
      option.value.series[hoveredIndex].pieData.value ===
      option.value.series[0].pieData.value
        ? 35
        : 10;
    option.value.series[hoveredIndex].parametricEquation =
      getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, i);
    option.value.series[hoveredIndex].pieStatus.hovered = isHovered;

    // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
    hoveredIndex = "";
  }

  // 使用更新后的 option，渲染图表
  chartTool.setOption(option);
}

watch(
  () => dataList.value,
  (dataList) => {
    if (dataList && dataList.length > 0) {
      if (!chartTool) {
        chartTool = Echarts.init(chartContainer.value);
        chartTool.on("mouseover", chartMouseover);
        chartTool.on("globalout", globaloutHandler);
      }
      option.value = getPie3DOptions(dataList, 0.59);
      chartTool.setOption(option.value, true);
    }
  }
);
</script>

<style lang="less" scoped>
.event-stat-chart {
  display: flex;
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
}

.chart-wrapper {
  position: relative;
  z-index: 100;
  width: 244px;
  height: 178px;
  margin-left: 33px;
  margin-top: 30px;
  img,
  .chart-container {
    position: absolute;
  }
  img {
    left: 0;
    bottom: 0;
    width: 238px;
    height: 129px;
  }
  .chart-container {
    left: 18px;
    width: 420px;
    height: 200px;
    max-height: 200px;
    text-align: left;
  }
}

.types {
  position: absolute;
  z-index: 101;
  top: 18px;
  width: 81px;
  height: 24px;
  background: url(@/assets/images/select-bg.png);
  display: flex;
  background-size: 100%;
  cursor: pointer;
  .dropdown-inner {
    display: flex;
    align-items: center;
    width: 81px;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 0 12px;
    color: #c4f0ff;
    font-size: 14px;
  }
}

.chart-legend {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 20px;
}

.legend-item {
  display: flex;
  color: #91cae8;
  font-size: 14px;
  align-items: center;
  padding: 0.5px 0;
  & .dot {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 4px;
  }
  & .name {
    width: 90px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  & .value {
    font-size: 20px;
    text-align: right;
    width: 26px;
    margin-right: 4px;
    font-family: AGENCYB;
    color: #d9f0fe;
  }
  & .unit {
    color: #d9f0fe;
  }
}
</style>

<style lang="less">
.chart-svg {
  width: 200px;
  height: 150px;
  cursor: pointer;
}
.chart-tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 16px;
  text-align: left;
}
</style>
