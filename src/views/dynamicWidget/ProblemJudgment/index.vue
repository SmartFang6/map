<!--****************************************
 * 问题研判
 *
 * founder: wangwg
 * Date:  17 2022/10/24
 *****************************************-->
<template>
  <div class="problem-judgment">
    <!--#region 图表内容区-->
    <div class="judgment-content" v-if="false">
      <div class="judgment-chart" ref="chartRef"></div>
    </div>
    <!--#endregion-->

    <!--#region 进度条内容区-->
    <div class="progress_view">
      <ProgressBar
        v-for="(item, index) in list"
        :no="index + 1"
        :count="item?.num || 0"
        :key="item?.eventSource || index"
        :rate="item?.rate || 0"
        flexType="row"
        :title="item?.eventName || ''"
      />
      <el-empty
        v-if="!list || !list.length"
        description="暂无数据"
        :image-size="80"
        class="dc-empty"
      />
    </div>
    <!--#endregion-->
  </div>
</template>

<script setup>
import * as Echarts from "echarts";
import ProgressBar from "@/views/components/ProgressBar";
import { useStore } from "vuex";
import {
  ref,
  reactive,
  toRefs,
  nextTick,
  computed,
  watch,
  onMounted,
} from "vue";

const store = useStore();

// 组件的数据模型
const model = reactive({
  config: null,
  list: [
    {
      id: 1001,
      eventName: "侵占河湖空间",
      num: 624,
      rate: 100,
    },
    {
      id: 1002,
      eventName: "占用水域",
      num: 277,
      rate: 84,
    },
    {
      id: 1003,
      eventName: "影响航道",
      num: 154,
      rate: 73,
    },
    {
      id: 1004,
      eventName: "城市河道保洁",
      num: 92,
      rate: 62,
    },
    {
      id: 1005,
      eventName: "水域保洁",
      num: 47,
      rate: 54,
    },
    {
      id: 1006,
      eventName: "非法拦网",
      num: 45,
      rate: 27,
    },
    {
      id: 1007,
      eventName: "非法采砂",
      num: 13,
      rate: 10,
    },
  ],
});

// 图表加载的动态列表数据和配置
const { config, list } = toRefs(model);

// 图表文档对象
const chartRef = ref(null);

// 绘制图表内容
function drawChart(config) {
  if (!chartRef.value) return;
  let chartMap = Echarts.init(chartRef.value);
  const option = {
    dataset: {
      source: [
        ["问题类型", "问题数"],
        ["侵占河湖空间", 624],
        ["占用水域", 277],
        ["影响航道", 154],
        ["城市河道保洁", 92],
        ["水域保洁", 47],
        ["非法拦网", 45],
        ["非法采砂", 13],
      ],
    },
    title: {
      text: "高频发问题类型",
      top: 4,
      left: 20,
      textStyle: {
        fontSize: 16,
        color: "#acd0f5",
      },
    },
    grid: {
      top: 35,
      left: 20,
      bottom: 18,
      right: 50,
      containLabel: true,
    },
    xAxis: {
      name: "",
      type: "value",
      axisLabel: {
        show: true,
        interval: 0,
        fontSize: 14,
        fontFamily: "Microsoft YaHei",
        color: "#95c0ec",
      },
    },
    yAxis: {
      name: "",
      type: "category",
      axisLabel: {
        show: true,
        interval: 0,
        fontSize: 14,
        fontFamily: "Microsoft YaHei",
        color: "#8eb7e4",
      },
    },
    series: [
      {
        type: "bar",
        encode: {
          x: "问题数",
          y: "问题类型",
        },
        itemStyle: {
          normal: {
            // 每根柱子颜色设置
            color: function (params) {
              const colorList = [""];
              return colorList[params.dataIndex];
            },
          },
        },
      },
    ],
  };
  // 加载配置数据
  chartMap.setOption(option);
  console.log(config);
}

// 获取问题研判的后台数据
function getProblemJudgmentList(param) {
  console.log(param);
}

// 处理源数据,生成UI的预览数据
function dealChartData() {
  nextTick(() => {
    drawChart(config);
  });
}

// 获取注入的时间区间
let dateRange = computed(() => store?.state?.dateRange);

let test = ref(null);

// 监测查询时间
watch(
  () => dateRange,
  async (dateRange) => {
    // 先加载一次数据
    test.value = await getProblemJudgmentList({
      ...dateRange.value,
    });
    dealChartData();
  },
  {
    immediate: true,
    deep: true,
  }
);
onMounted(async () => {
  test.value = await getProblemJudgmentList({
    ...dateRange.value,
  });
  dealChartData();
});
</script>

<style lang="less" scoped>
.problem-judgment {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.judgment-content {
  width: 468px;
  height: 100%;
  margin: 0;
  .judgment-chart {
    width: 100%;
    height: 100%;
  }
}

.progress_view {
  padding: 0 16px 0 6px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(206, 205, 205, 0.75);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.15);
  }
}

:deep(.ProgressBar .bar .progress_view p .count) {
  font-size: 24px;
}
</style>
