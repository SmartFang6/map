<!--****************************************
 * 处理绩效 图表显示层
 *
 * founder: wangwg
 * Date: 2022/11/02 10:30
 *****************************************-->
<template>
  <div class="performance-chart">
    <!--#region '销号率'的图表内容区-->
    <div class="completed-rank" v-if="type === 1 && chartData">
      <div
        v-if="chartData?.[0]?.content !== ''"
        class="completed-rank-chart"
        ref="completedRankChart"
      ></div>
      <el-empty
        v-else
        description="暂无数据"
        :image-size="80"
        class="dc-empty"
      />
    </div>
    <!--#endregion-->

    <!--#region '考核'的图表内容区-->
    <div class="point-rank" v-else-if="type === 2 && chartData">
      <div class="point-rank-chart" ref="pointRankChart"></div>
    </div>
    <!--#endregion-->

    <el-empty v-else description="暂无数据" :image-size="80" class="dc-empty" />
  </div>
</template>

<script setup>
/**
 处理绩效的柱状图表
 **/
import * as Echarts from "echarts";
import { ref, watch, nextTick } from "vue";

const chartData = ref(null);

// 获取父组件传递的列表数据
const props = defineProps({
  dataModel: {
    type: Array,
    default: () => [],
  },
  type: {
    type: Number,
    default: () => 1,
  },
});

watch(
  () => [props.dataModel, props.type],
  () => {
    if (!props.dataModel || props.dataModel.length <= 0) return;
    chartData.value = props.dataModel.map((item, rankNum) => {
      return {
        index: rankNum + 1,
        org: item?.eventResponsibleUnitCodeName || item?.unitName || "",
        content: item?.content || "",
        count: item?.unitEventNum || 0,
        completed: item?.unitCompletedNum || 0,
        point: item?.point || item?.score || 0,
        rate: item?.completedRate ? Number(`${item?.completedRate}e${2}`) : 0,
      };
    });
    nextTick(() => {
      props.type === 1
        ? drawCompletedChart(chartData.value)
        : drawPointChart(chartData.value);
    });
  },
  {
    immediate: true,
    deep: true,
  }
);

// 销号率的文档对象
const completedRankChart = ref(null);

// 绘制销号率的图表内容
function drawCompletedChart(params) {
  if (!completedRankChart.value) return;
  // 初始化图表实例
  let completedChartMap = Echarts.init(completedRankChart.value);
  const option = getChartOption(params);
  // 加载配置数据
  completedChartMap.setOption(option);
}

// 考核的文档对象
const pointRankChart = ref(null);

// 绘考核成绩的图表内容
function drawPointChart(params) {
  if (!pointRankChart.value) return;
  // 初始化图表实例
  let pointChartMap = Echarts.init(pointRankChart.value);
  const option = getScoreChartOption(params);
  // 加载配置数据
  pointChartMap.setOption(option);
}

// 获取图表展示的配置项
function getChartOption(data) {
  const result = {
    color: ["#00ffc5", "#ffc843", "#00d8fd"],
    grid: {
      top: "15%",
      left: "12%",
      bottom: "28%",
      right: "12%",
    },
    dataZoom: [
      {
        show: false, // 是否显示滑动条 data.length > 14
        type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        startValue: 0, // 从头开始
        endValue: 14, // 一次性展示12个
      },
    ],
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
        { icon: "circle", name: "已结办" },
        { icon: "circle", name: "问题数" },
        {
          icon: "rect",
          name: "销号率",
          itemStyle: {
            borderWidth: 1,
          },
        },
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
        data: data.map((item) => item.org),
        axisLine: {
          lineStyle: {
            color: "#658598",
          },
        },
        axisLabel: {
          show: true,
          rotate: 45,
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
        name: "已结办",
        type: "bar",
        stack: "num",
        barWidth: 6,
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        data: data.map((item) => item.completed),
      },
      {
        name: "问题数",
        type: "bar",
        stack: "num",
        barWidth: 6,
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        data: data.map((item) => item.count),
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
        data: data.map((item) => item.rate),
      },
    ],
  };
  return result;
}

// 获取考核图表展示的配置项
function getScoreChartOption(data) {
  const result = {
    color: [
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: "rgba(53, 221, 245, .6)" },
          { offset: 1, color: "rgba(42, 98, 212, 1)" },
        ],
        globalCoord: false,
      },
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: "rgba(129, 231, 71, .6)" },
          { offset: 1, color: "rgba(52, 195, 76, 1)" },
        ],
        globalCoord: false,
      },
      {
        type: "linear",
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          { offset: 0, color: "rgba(49, 193, 75, .6)" },
          { offset: 1, color: "rgba(49, 193, 75, 1)" },
        ],
        globalCoord: false,
      },
    ],
    grid: {
      top: "15%",
      left: "12%",
      bottom: "28%",
      right: "6%",
    },
    dataZoom: [
      {
        show: false, // 是否显示滑动条 data.length > 14
        type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        startValue: 0, // 从头开始
        endValue: 14, // 一次性展示12个
      },
    ],
    tooltip: {
      trigger: "axis",
      confine: true, // 提示浮层限制在容器中
      axisPointer: {
        type: "shadow",
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
      show: false,
      data: [{ icon: "circle", name: "分数" }],
      textStyle: {
        fontSize: 14,
        fontFamily: "Microsoft YaHei",
        color: "#fff",
      },
      itemGap: 30,
      itemHeight: 10,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.org),
      axisTick: {
        show: false,
        alignWithLabel: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#658598",
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        rotate: 45,
        interval: 0, // 设置这里强制全部显示
        fontSize: 14,
        fontFamily: "Microsoft YaHei",
        color: "#53a3ca",
      },
      axisPointer: {
        type: "shadow",
      },
    },

    yAxis: [
      {
        type: "value",
        name: "分数",
        nameTextStyle: {
          fontSize: 14,
          fontFamily: "Microsoft YaHei",
          color: "#7ec0e1",
        },
        minInterval: 1,
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
    ],
    series: [
      {
        yAxisIndex: 0,
        name: "分数",
        type: "bar",
        barWidth: 10,
        data: data.map((item) => item.point),
        itemStyle: {
          barBorderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };
  return result;
}
</script>

<style lang="less" scoped>
.performance-chart {
  width: 100%;
  height: 215px;
  box-sizing: border-box;

  .completed-rank,
  .point-rank {
    width: 465px;
    height: 240px;
    margin: 0;
    margin-top: 8px;
  }

  .completed-rank-chart,
  .point-rank-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
