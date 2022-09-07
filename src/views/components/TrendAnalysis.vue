<!--
    趋势分析组件 
-->
<template>
  <div class="trend-analysis">
    <!--#region 标题区-->
    <Title title="趋势分析" />
    <!--#endregion-->

    <!--#region 主体内容区-->
    <div class="trend-content">
      <div class="trend-chart" ref="chart"></div>
    </div>
    <!--#endregion-->
  </div>
</template>

<script setup>
import Title from "@/components/Title/index.vue";
import * as Echarts from "echarts";
import { ref, inject, watch, onMounted } from "vue-demi";

// 趋势分析的数据源
let dataModel = ref(null);

const getTrendAnalysisModel = async (queryParam) => {
  const param = Object.assign(
    {
      id: null,
    },
    queryParam
  );
  console.log(param);
  return {};
};

// 获取注入的时间区间
let dateRange = inject("dateRange");
// 趋势的图标对象
const chart = ref(null);
const chartOption = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
  },
  legend: {
    data: ["销号率", "问题数"],
  },
  xAxis: [
    {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "问题数",
      min: 0,
      max: 10,
      interval: 2,
      axisLabel: {
        formatter: "{value}",
      },
    },
    {
      type: "value",
      name: "销号率",
      min: 0,
      max: 100,
      interval: 20,
      axisLabel: {
        formatter: "{value} %",
      },
    },
  ],
  series: [
    {
      name: "销号率",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return value + " %";
        },
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3,
      ],
    },
    {
      name: "问题数",
      type: "line",
      yAxisIndex: 1,
      tooltip: {
        valueFormatter: function (value) {
          return value;
        },
      },
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
    },
  ],
});
defineExpose({ chartOption });

// 监测查询时间
watch(
  () => dateRange,
  async (dateRange) => {
    // 先加载一次数据
    dataModel.value = await getTrendAnalysisModel({
      ...dateRange.value,
    });
  },
  {
    immediate: true,
    deep: true,
  }
);

onMounted(() => {
  const chartMap = Echarts.init(chart.value);
  console.log("chartMap", chartMap);
  chartMap.setOption(chartOption.value);
});
</script>

<style lang="less" scoped>
.trend-analysis {
  flex: 1;
  width: 100%;
  box-sizing: border-box;

  .trend-content {
    width: 484px;
    height: 240px;
    margin: 9px 13px 0 9px;
  }

  .trend-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
