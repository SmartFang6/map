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

    <div class="two_title">
      <ChartTitle :title="'销号率排名'" />
      <ChartTitle :title="'考核排名'" />
    </div>

    <div class="content_wrap">
      <div class="echart_left">
        <ProgressBar
          v-for="(item, index) in problemSourceList"
          :no="index + 1"
          :count="item?.unitEventNum || 0"
          :rate="item?.completed || 0"
          :key="item?.point || index"
          flexType="row"
          :title="item?.eventResponsibleUnitCodeName || ''"
        />
      </div>
      <div
        class="echart_right"
        ref="verticalChart"
        v-if="chartData?.length > 0"
      ></div>
      <el-empty
        v-else
        description="暂无数据"
        :image-size="80"
        class="dc-empty"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
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

// 组件数据
const problemSourceList = ref([]);
// 处理数据
const dealData = () => {
  problemSourceList.value = dataAll.value[
    activeTab.value
  ]?.completedRankList?.map((item) => {
    return {
      ...item,
      completed: item?.completedRate
        ? Number(`${item?.completedRate}e${2}`)
        : 0,
    };
  });
  chartData.value = dataAll.value[activeTab.value]?.pointRankList?.map(
    (item) => {
      return {
        ...item,
        name: item?.eventResponsibleUnitCodeName,
        count: item?.point,
      };
    }
  );
  console.log(chartData.value, "chartData");
  nextTick(() => {
    draw(chartData.value);
  });
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
  if (!verticalChart.value) return;
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
        rotate: 45,
        interval: 0, // 设置这里强制全部显示
        textStyle: {
          color: "#fff",
        },
      },
    },

    yAxis: [
      {
        name: "分数",
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
        name: "分数",
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
watch(
  () => props.moreData,
  (moreData) => {
    dataAll.value = moreData;
    dealData();
  },
  {
    immediate: true,
    deep: true,
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
      font-size: 26px;
      font-family: YouSheBiaoTiHei;
      color: #0adbe0;
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
        // border: solid 1px #14a2d2;
        background: url(@/assets/images/checked.png) no-repeat -10px -10px;
      }
    }
  }

  .two_title {
    width: 100%;
    display: flex;
    margin-top: 20px;
    > div {
      width: 50%;
    }
  }

  .content_wrap {
    width: 100%;
    height: 500px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    > div {
      width: 36vw;
      height: 500px;
    }
    // & > div:nth-child(1) {
    //   flex: 1;
    // }
    // & > div:nth-child(2) {
    //   width: 37%;
    //   height: 500px;
    // }

    .echart_left {
      padding-right: 10px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
      }

      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(206, 205, 205, 0.75);
      }

      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.15);
      }
    }
  }
}
</style>
