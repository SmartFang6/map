<!-- 
    处置绩效-更多 的弹窗组件
-->
<template>
  <div class="more_dialog_container">
    <div class="top_title">
      <div class="title_wrap">处置绩效</div>
      <div class="tabs_wrap">
        <div
          :key="item.key"
          v-for="item in tabsList"
          @click="tabClick(item)"
          :class="['tab_item', item.key === activeTab ? 'active' : '']"
        >
          {{ item.name }}
        </div>
      </div>
    </div>

    <div class="content_wrap">
      <div class="echart_left">
        <ProgressBar
          v-for="(item, index) in problemSourceList"
          :no="index + 1"
          :count="item?.point || 0"
          :key="item?.point || index"
          flexType="row"
          :title="item?.eventResponsibleUnitCodeName || ''"
        />
      </div>
      <div class="echart_right" ref="verticalChart"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";
import * as Echarts from "echarts";
import ProgressBar from "@/views/components/ProgressBar";

// 接收父组件传值
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  moreData: {
    type: Object,
    default: () => {},
  },
});

const emits = defineEmits(["update:visible"]);

// 所有数据
const dataAll = ref(null);
watch(
  () => props.moreData,
  (moreData) => {
    nextTick(() => {
      dataAll.value = moreData;
      dealData();
      console.log("传入数据", moreData);
    });
  },
  {
    immediate: true,
    deep: true,
  }
);

// 组件数据
const problemSourceList = ref([]);
// 处理数据
const dealData = () => {
  console.log(
    "dataAll.value[activeTab.value]?.pointRankList",
    dataAll.value[activeTab.value]?.pointRankList
  );
  problemSourceList.value = dataAll.value[activeTab.value]?.pointRankList;
  chartData.value = dataAll.value[activeTab.value]?.completedRankList?.map(
    (item) => {
      return {
        ...item,
        name: item.eventResponsibleUnitCodeName,
        count: item.unitEventNum,
      };
    }
  );
  draw(chartData.value);
  console.log("chartData.value", chartData.value);
};

// tabs
const activeTab = ref("zoneRank");
const tabsList = ref([
  {
    name: "乡镇",
    key: "zoneRank",
  },
  {
    name: "部门",
    key: "departmentRank",
  },
]);

// tab 点击时间
const tabClick = (item) => {
  activeTab.value = item.key;
  dealData();
};

const chartData = ref([]);

// 柱状图 dom
const verticalChart = ref(null);
const draw = (data) => {
  let chart = Echarts.init(verticalChart.value);
  const option = {
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
    tooltip: {
      trigger: "axis",
      confine: true, // 提示浮层限制在容器中
      axisPointer: {
        type: "shadow",
      },
      // formatter: (e) => {
      //   let html = null
      //   if (e.length !== 1) {
      //     const htmlarr = [`<div><div>${e[0].name}</div>`]
      //     e.map((e, i) => {
      //       htmlarr.push(`<div style="display:flex;align-items:center;"><div style="width:10px;height:10px;background: ${this.tooltipColor[i]};margin-right:10px"></div>${e.seriesName}：${e.value}${e.seriesName === '整改率' ? '%' : ''}</div>`)
      //     })
      //     htmlarr.push(`</div>`)
      //     html = htmlarr.join('')
      //   } else {
      //     html = `<div><div>${e[0].name}</div><div style="display:flex;align-items:center;"><div style="width:10px;height:10px;background: rgb(112, 144, 247);margin-right:10px"></div>${e[0].seriesName}${e[0].value}(个)</div></div>`
      //   }
      //   return html
      // },
      extraCssText:
        "box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);padding: 10px;min-width: 200px",
      backgroundColor: "#fff",
      textStyle: {
        color: "#000",
      },
    },
    legend: {
      show: false,
    },
    grid: {
      top: "10%",
      left: "1%",
      right: "1%",
      bottom: "2%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.name),
      axisTick: {
        show: false,
        alignWithLabel: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#fff",
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        interval: 0, // 设置这里强制全部显示
        textStyle: {
          color: "#fff",
        },
      },
    },

    yAxis: [
      {
        name: "考核排名",
        nameTextStyle: {
          color: "#fff",
        },
        type: "value",
        minInterval: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#fff",
          },
        },
        axisLabel: {
          textStyle: {
            color: "#fff",
          },
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        yAxisIndex: 0,
        name: "考核排名",
        type: "bar",
        barWidth: 20,
        data: data.map((item) => item.count),
        itemStyle: {
          barBorderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };
  chart.setOption(option);
};

onMounted(() => {
  draw(chartData.value);
});

// 是否开启弹窗
const dialogVisible = ref(false);

// 监听父组件的开启弹窗参数
watch(
  () => props.visible,
  (visible) => {
    dialogVisible.value = visible;
  },
  {
    immediate: true,
  }
);

// 监听本组件的弹窗展示参数,并同步父组件
watch(
  () => dialogVisible.value,
  (dialogVisible) => {
    if (!dialogVisible) {
      emits("update:visible", false);
    }
  },
  {
    immediate: false,
  }
);
</script>

<style lang="less" scoped>
.more_dialog_container {
  display: block;
  box-sizing: border-box;
  color: #fff;
  margin-top: -40px;

  .top_title {
    display: flex;
    .title_wrap {
      font-size: 24px;
    }

    .tabs_wrap {
      display: flex;
      margin-left: 20px;
      .tab_item {
        width: 67px;
        height: 33px;
        font-size: 18px;
        font-family: YouSheBiaoTiHei;
        line-height: 30px;
        text-align: center;
        border-radius: 16px;
        margin-right: 10px;
        cursor: pointer;
        user-select: none;
      }
      .active {
        border: solid 1px #14a2d2;
      }
    }
  }

  .content_wrap {
    width: 100%;
    height: 500px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    > div {
      width: 450px;
      height: 500px;
      border: 1px solid red;
    }
  }
}
</style>
