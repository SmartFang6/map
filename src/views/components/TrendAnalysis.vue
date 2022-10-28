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
import { ref, inject, watch, nextTick } from "vue-demi";
import { getEventStatTrendAnalysisList } from "@/apis/cockpitEventStats";

// 趋势分析的数据源
let dataModel = ref(null);

// 获取趋势分析结果的源数据
const getTrendAnalysisModel = async (queryParam) => {
  const param = Object.assign(
    {
      adcd: "",
      code: "",
      eventCompleteStatus: "",
      eventGradeStatus: "",
      expireStatus: "",
      pageNo: 1,
      pageSize: 10,
      searchText: "",
      startTime: "",
      endTime: "",
      thisMonthNewStatus: "",
      willExpireStatus: "",
    },
    queryParam
  );
  return await getEventStatTrendAnalysisList(param);
};

// 处理源数据,新增图表展示需要的参数坐标
const dealDataModel = () => {
  nextTick(() => {
    drawChart(dataModel.value);
  });
};

// 趋势的图标对象
const chart = ref(null);

// 绘制图表内容
const drawChart = (data) => {
  if (!chart.value) return;
  let chartMap = Echarts.init(chart.value);
  const option = {
    color: ["#ffc600", "#00ecff"],
    grid: {
      top: 32,
      left: 30,
      bottom: 25,
      right: 45,
    },
    tooltip: {
      trigger: "axis",
      confine: true,
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
        data: data.map((item) => item.month + "月"),
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
          color: "#53a3ca",
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
          color: "#7ec0e1",
        },
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
          color: "#7ec0e1",
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
          color: "#6eafd4",
        },
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
          color: "#53a3ca",
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
        data: data.map((item) => item.allNum),
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
          emphasis: {
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
        tooltip: {
          valueFormatter: function (value) {
            return value + "%";
          },
        },
        data: data.map((item) => item.completedRate * 100),
      },
    ],
  };
  // 加载配置数据
  chartMap.setOption(option);
};

// 获取注入的时间区间
let dateRange = inject("dateRange");

// 监测查询时间
watch(
  () => dateRange,
  async (dateRange) => {
    // 先加载一次数据
    dataModel.value = await getTrendAnalysisModel({
      ...dateRange.value,
    });
    dealDataModel();
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="less" scoped>
.trend-analysis {
  width: 100%;
  height: 303px;
  box-sizing: border-box;

  .trend-content {
    width: 484px;
    height: 240px;
    margin: 0;
    margin-top: 9px;
  }

  .trend-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
