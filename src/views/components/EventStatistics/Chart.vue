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
      <div v-for="(item, index) in dataList" :key="index" class="legend-item">
        <span class="dot" :style="{ background: item.color }" />
        <el-tooltip
          v-if="item.label.length > 5"
          effect="dark"
          :content="item.label"
          placement="top"
        >
          <span class="name">{{ item.label }}</span>
        </el-tooltip>
        <span v-else class="name">{{ item.label }}</span>
        <span class="value" :style="{ color: item.color }">
          {{ item.value.toFixed(0) }}
        </span>
        <span class="unit">个</span>
      </div>
    </div>
    <!--#endregion-->

    <!--#region 图表tooltip-->
    <div class="chart-tooltip">
      <div class="label"></div>
    </div>
    <!--#endregion-->
  </div>
</template>

<script setup>
import donut3D from "./donut3D.js";
import * as d3 from "d3";
import { ref, watch, inject, computed } from "vue";
import { getEventIncidenceRank } from "@/apis/cockpitEventStats";

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
    ? dataSource.value?.eventStatHighIncidenceRankCategoryCodeList
    : dataSource.value?.eventStatHighIncidenceRankRegionList;
  if (!Array.isArray(source) || source.length <= 0) {
    return [];
  }
  return source
    .filter((a, index) => index < 6)
    .map((item, index) => {
      return {
        color: colors[index],
        label: isType ? item.eventCategoryName : item.adnm,
        value: isType ? item.eventCategoryNum : item.adcdNum,
        rate: item.completedRate * 100,
      };
    });
});

// d3 对象
let svg = null;
const initChart = (d) => {
  svg = d3
    .select(chartContainer.value)
    .append("svg")
    .attr("class", "chart-svg")
    .attr("viewBox", "0 0 200 150");
  svg.append("g").attr("id", "donut3D");

  const donut3DElements = donut3D.draw(
    "donut3D",
    d,
    100,
    62,
    100,
    60,
    25,
    0.57
  );

  // 初始化提示工具
  const tooltip = d3.select(".chart-tooltip");
  const mouseover = () => tooltip.style("opacity", 0);
  const mouseleave = () => tooltip.style("opacity", 0);
  const mousemove = (event, { data }) => {
    d3.select(".chart-tooltip .label").text(data?.label);
    const [x, y] = d3.pointer(event);
    tooltip.attr("transform", `translate(${x}, ${y})`);
  };

  donut3DElements.forEach((element) => {
    element
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .on("mouseover", mouseover);
  });
};

watch(
  () => dataList.value,
  (dataList) =>
    dataList.length > 0 &&
    setTimeout(() => {
      const d = [...dataList];
      for (let i = d.length; i < colors.length; i++) {
        d.push({
          value: 0,
          color: colors[i],
        });
      }
      if (!svg) {
        initChart(d);
      } else {
        donut3D.transition("donut3D", d, 100, 60, 25, 0.57);
      }
    }, 1)
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

<style>
.chart-svg {
  width: 200px;
  height: 150px;
}
.chart-tooltip {
  position: absolute;
  background: #000;
  color: #fff;
  .label {
  }
}
</style>
