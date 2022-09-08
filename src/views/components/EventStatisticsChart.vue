<!------------------------------------------------------
 ¦ 事件统计-环形图
 ¦ 
 ¦ Author: 大风
 ¦ Date: 2022-09-08 10:04:01
 ¦ FilePath: src/views/components/EventStatisticsChart.vue
 ¦ Dependencies: d3
 ¦----------------------------------------------------->

<template>
  <div class="event-stat-chart">
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

    <!--#region 图表标注-->
    <div class="chart-legend">
      <div v-for="(item, index) in mockData" :key="index" class="legend-item">
        <span class="dot" :style="{ background: item.color }" />
        <span class="name">{{ item.label }}</span>
        <span class="value" :style="{ color: item.color }">{{
          item.value.toFixed(0)
        }}</span>
        <span class="unit">个</span>
      </div>
    </div>
    <!--#endregion-->
  </div>
</template>

<script setup>
import donut3D from "./donut3D.js";
import * as d3 from "d3";
import { ref, onMounted } from "vue";

// 统计类型
const types = ref([
  {
    label: "事件",
    value: 1,
  },
  {
    label: "区域",
    value: 2,
  },
]);

// 选中的类型
const currentType = ref(types.value[0]);

// 图表容器
const chartContainer = ref(null);

// d3 对象
let svg = null;

// 测试数据
const mockData = [
  { label: "河长巡河", color: "#03ffa9", value: 10 * Math.random() },
  { label: "AI智能发现", color: "#00ecff", value: 10 * Math.random() },
  { label: "无人机发现", color: "#ff4d65", value: 10 * Math.random() },
  { label: "平台上报", color: "#ff9700", value: 10 * Math.random() },
  { label: "监测站点", color: "#17b3ff", value: 10 * Math.random() },
  { label: "监测站点", color: "#ffd633", value: 10 * Math.random() },
];

onMounted(() => {
  //.attr("width", 200)
  //.attr("height", 150)
  svg = d3
    .select(chartContainer.value)
    .append("svg")
    .attr("class", "chart-svg")
    .attr("viewBox", "0 0 200 150");

  svg.append("g").attr("id", "salesDonut");
  donut3D.draw("salesDonut", mockData, 100, 62, 100, 60, 25, 0.57);
});
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
  }
}

.types {
  position: absolute;
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
  color: #d9f0fe;
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

<style>
.chart-svg {
  width: 200px;
  height: 150px;
}
</style>
