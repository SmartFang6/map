<template>
  <div id="IssueEchart">
    <dc-chart ref="charts" :chartOption="chartOption" width="300px;" />
  </div>
</template>

<script setup>
import { computed, reactive, ref, onMounted, onUnmounted } from "vue";

const data = reactive({
  echartsData: [
    {
      name: "轻微问题",
      value: 567,
      itemStyle: {
        color: "rgb(68,201,100)",
      },
    },
    {
      name: "较严重问题",
      value: 467,
      itemStyle: {
        color: "rgb(255,144,25)",
      },
    },
    {
      name: "严重问题",
      value: 45,
      itemStyle: {
        color: "rgb(211,88,88)",
      },
    },
  ],
});

// 图表数据
const chartOption = computed(() => {
  // item-rich
  let itemRich = {};
  data.echartsData.forEach((item, idx) => {
    itemRich[`value${idx}`] = {
      ...item.itemStyle,
      fontSize: 20,
      fontWeight: "bold",
    };
  });
  // 计算item-value 占比数值
  const total = data.echartsData
    .map((i) => i.value)
    .reduce((pre, nex) => {
      return Number(pre) + Number(nex);
    });
  console.log(total, "total");
  return {
    color: ["#097ceb", "#e26959", "#45e0d3"],
    legend: {
      orient: "vertical",
      right: 30,
      top: "center",
      formatter: function (name) {
        const arr = data.echartsData;
        const ARR = arr.filter((item) => {
          return item.name === name;
        });
        const idx = data.echartsData.findIndex((i) => i.name === name);
        const itemValue = ARR[0].value;
        // const Proportion = ((itemValue / total) * 100).toFixed(2);
        return `${name}  {value${idx}|${itemValue}} 个`;
      },
      textStyle: {
        color: "#fff",
        rich: itemRich,
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "#0a1025",
      textStyle: {
        color: "#fff",
      },
      borderColor: "#0a1025",
      formatter: (params) => {
        return `<div>
                  ${params.data.name}
                  <span>${((params.data.value / total) * 100).toFixed(
                    2
                  )} %</span>
                </div>
               `;
      },
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: data.echartsData,
        center: ["30%", "50%"],
        emphasis: {
          label: {
            show: true,
            fontSize: "16",
            fontWeight: "bold",
            color: "#fff",
            formatter(val) {
              return `{value${val.dataIndex}|${val.name}}\n\n{value${
                val.dataIndex
              }|${val.percent + "%"}}`;
            },
            textStyle: {
              color: "#fff",
              rich: itemRich,
            },
          },
        },
      },
    ],
  };
});

// 定时器id容器
let timer = null;
// dom挂载后
onMounted(() => {
  addEchartsDataTwo();
});
onUnmounted(() => {
  clearInterval(timer);
});

// 图表
const charts = ref(null);
let currentHighlight = ref(0);
const addEchartsDataTwo = () => {
  new Promise((resolve) => {
    resolve();
  }).then(() => {
    charts.value.chartInstance.setOption(chartOption.value);
    echartsInterrupt();
    const echartApi = charts.value.chartInstance._api;
    // 鼠标移入
    echartApi.on("mouseover", (e) => {
      clearInterval(timer);
      // 取消高亮指定的数据图形
      echartApi.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: data.echartsData.map((itm, idx) => idx),
      });
      // 高亮当前指定数据图形
      echartApi.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      });
      currentHighlight.value = e.dataIndex;
    });
    // 鼠标移出清除定时器，在打开定时器，取消高亮最后一次鼠标移入的图形
    echartApi.on("mouseout", (e) => {
      echartsInterrupt(e.dataIndex);
    });
  });
};

// 轮播高亮
function echartsInterrupt(indexs = 0) {
  clearInterval(timer);
  currentHighlight.value = indexs;
  const echartApi = charts.value.chartInstance._api;
  let ii = 0;
  timer = setInterval(() => {
    if (currentHighlight.value > data.echartsData.length - 1) {
      currentHighlight.value = 0;
    }
    echartApi.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
      dataIndex: ii,
    });
    echartApi.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: currentHighlight.value,
    });
    ii = currentHighlight.value;
    currentHighlight.value++;
  }, 1500);
}
</script>

<style lang="less" scoped>
#IssueEchart {
  width: 100%;
  height: 280px;
}
</style>
