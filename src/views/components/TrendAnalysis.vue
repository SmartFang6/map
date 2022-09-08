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
  color: ["#ffc600", "#00ecff"],
  grid: {
    top: 32,
    left: 30,
    bottom: 20,
    right: 45,
  },
  tooltip: {
    show: true,
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999",
      },
    },
    textStyle: {
      fontSize: 14,
      fontFamily: "Microsoft YaHei",
      align: "left",
      color: "#fff",
    },
    backgroundColor: "rgba(0, 19, 83, 0.8)",
    borderWidth: 0,
  },
  legend: {
    data: [
      { icon: "circle", name: "销号率" },
      { icon: "circle", name: "问题数" },
    ],
    textStyle: {
      fontSize: 14,
      fontFamily: "Microsoft YaHei",
      color: "#fff",
    },
    itemGap: 30,
    itemHeight: 10,
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
      axisLine: {
        lineStyle: {
          color: "#658598",
        },
      },
      axisLabel: {
        show: true,
        interval: 0,
        fontSize: 14,
        fontFamily: "Microsoft YaHei",
        color: "#809fac",
      },
      axisTick: {
        show: false,
      },
      axisPointer: {
        type: "shadow",
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      name: "问题数量",
      nameTextStyle: {
        fontSize: 14,
        fontFamily: "Microsoft YaHei",
        color: "#fff",
      },
      min: 0,
      max: 10,
      interval: 2,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#658598",
        },
      },
      axisLabel: {
        show: true,
        formatter: "{value}",
        fontSize: 14,
        fontFamily: "Microsoft YaHei",
        color: "#809fac",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#a5cbe1"],
          type: [2, 8],
          dashOffset: 5,
          opacity: 0.5,
        },
      },
    },
    {
      type: "value",
      name: "销号率",
      nameTextStyle: {
        fontSize: 14,
        fontFamily: "Microsoft YaHei",
        color: "#fff",
      },
      min: 0,
      max: 100,
      interval: 20,
      axisLine: {
        show: true,
        lineStyle: {
          color: "#658598",
        },
      },
      axisLabel: {
        show: true,
        formatter: "{value}%",
        fontSize: 14,
        fontFamily: "Microsoft YaHei",
        color: "#809fac",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#a5cbe1"],
          type: [2, 8],
          dashOffset: 5,
          opacity: 0.1,
        },
      },
    },
  ],
  series: [
    {
      name: "问题数",
      type: "bar",
      barWidth: 6,
      tooltip: {
        valueFormatter: function (value) {
          return value;
        },
      },
      data: [7, 5, 6, 3, 3, 8, 5, 9, 2, 4, 7, 3],
    },
    {
      name: "销号率",
      type: "line",
      stack: "Total",
      smooth: true,
      yAxisIndex: 1,
      lineStyle: {
        width: 3,
      },
      showSymbol: false,
      areaStyle: {
        normal: {
          color: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.1,
                color: "#00ecff",
              },
              {
                offset: 0.5,
                color: "rgba(0, 236, 255, 0.54)",
              },
              {
                offset: 0.9,
                color: "rgb(27, 29, 32, 0.1)",
              },
            ],
          },
          opacity: 0.3,
        },
      },
      emphasis: {
        focus: "series",
      },
      tooltip: {
        valueFormatter: function (value) {
          return value + "%";
        },
      },
      data: [60, 54, 72, 80, 61, 32, 41, 18, 55, 58, 60, 71],
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
