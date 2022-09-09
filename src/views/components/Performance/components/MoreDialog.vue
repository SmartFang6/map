<!-- 
    处置绩效-更多 的弹窗组件
-->
<template>
  <div class="more_dialog_container">
    <el-dialog v-model="dialogVisible" width="60%">
      <template #title>
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
      </template>

      <div class="content_wrap">
        <div class="echart_left"></div>
        <div class="echart_right" ref="verticalChart"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
// import * as Echarts from "echarts";

// 接收父组件传值
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:visible"]);

// tabs
const activeTab = ref("county");
const tabsList = ref([
  {
    name: "乡镇",
    key: "county",
  },
  {
    name: "部门",
    key: "department",
  },
]);

// tab 点击时间
const tabClick = (item) => {
  activeTab.value = item.key;
};

const chartData = ref([
  {
    name: "杭州市",
    count: 56,
  },
  {
    name: "宁波市",
    count: 78,
  },
  {
    name: "南浔区",
    count: 64,
  },
  {
    name: "龙泉市",
    count: 85,
  },
]);

// 柱状图 dom
const verticalChart = ref(null);

const draw = (data) => {
  console.log("data>>>>>>>>>>>>>>>>", data);
  // let chart = Echarts.init(verticalChart.value);
  // const option = {
  //   color: [
  //     {
  //       type: "linear",
  //       x: 0,
  //       y: 0,
  //       x2: 0,
  //       y2: 1,
  //       colorStops: [
  //         { offset: 0, color: "rgba(53, 221, 245, .6)" },
  //         { offset: 1, color: "rgba(42, 98, 212, 1)" },
  //       ],
  //       globalCoord: false,
  //     },
  //     {
  //       type: "linear",
  //       x: 0,
  //       y: 0,
  //       x2: 0,
  //       y2: 1,
  //       colorStops: [
  //         { offset: 0, color: "rgba(129, 231, 71, .6)" },
  //         { offset: 1, color: "rgba(52, 195, 76, 1)" },
  //       ],
  //       globalCoord: false,
  //     },
  //     {
  //       type: "linear",
  //       x: 0,
  //       y: 0,
  //       x2: 0,
  //       y2: 1,
  //       colorStops: [
  //         { offset: 0, color: "rgba(49, 193, 75, .6)" },
  //         { offset: 1, color: "rgba(49, 193, 75, 1)" },
  //       ],
  //       globalCoord: false,
  //     },
  //   ],
  //   tooltip: {
  //     trigger: "axis",
  //     confine: true, // 提示浮层限制在容器中
  //     axisPointer: {
  //       type: "shadow",
  //     },
  //     // formatter: (e) => {
  //     //   let html = null
  //     //   if (e.length !== 1) {
  //     //     const htmlarr = [`<div><div>${e[0].name}</div>`]
  //     //     e.map((e, i) => {
  //     //       htmlarr.push(`<div style="display:flex;align-items:center;"><div style="width:10px;height:10px;background: ${this.tooltipColor[i]};margin-right:10px"></div>${e.seriesName}：${e.value}${e.seriesName === '整改率' ? '%' : ''}</div>`)
  //     //     })
  //     //     htmlarr.push(`</div>`)
  //     //     html = htmlarr.join('')
  //     //   } else {
  //     //     html = `<div><div>${e[0].name}</div><div style="display:flex;align-items:center;"><div style="width:10px;height:10px;background: rgb(112, 144, 247);margin-right:10px"></div>${e[0].seriesName}${e[0].value}(个)</div></div>`
  //     //   }
  //     //   return html
  //     // },
  //     extraCssText:
  //       "box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);padding: 10px;min-width: 200px",
  //     backgroundColor: "#fff",
  //     textStyle: {
  //       color: "#000",
  //     },
  //   },
  //   legend: {
  //     show: false,
  //   },
  //   grid: {
  //     top: "10%",
  //     left: "1%",
  //     right: "1%",
  //     bottom: "2%",
  //     containLabel: true,
  //   },
  //   xAxis: [
  //     {
  //       type: "category",
  //       data: data.map((item) => item.name),
  //       axisTick: {
  //         show: false,
  //         alignWithLabel: false,
  //       },
  //       axisLine: {
  //         show: true,
  //         lineStyle: {
  //           color: "#eee",
  //         },
  //       },
  //       axisLabel: {
  //         interval: 0, // 设置这里强制全部显示
  //         textStyle: {
  //           color: "#666",
  //         },
  //       },
  //     },
  //   ],
  //   yAxis: [
  //     {
  //       name: "问题总数",
  //       nameTextStyle: {
  //         color: "black",
  //       },
  //       type: "value",
  //       minInterval: 1,
  //       axisLine: {
  //         show: false,
  //         lineStyle: {
  //           color: "#eee",
  //         },
  //       },
  //       axisLabel: {
  //         textStyle: {
  //           color: "#666",
  //         },
  //       },
  //       splitLine: {
  //         lineStyle: {
  //           color: "#eee",
  //         },
  //       },
  //     },
  //   ],
  //   series: [
  //     {
  //       yAxisIndex: 0,
  //       name: "问题总数",
  //       type: "bar",
  //       barWidth: 20,
  //       data: data.map((item) => item.count),
  //       itemStyle: {
  //         barBorderRadius: [4, 4, 0, 0],
  //       },
  //     },
  //   ],
  // };
  // // console.log(option);
  // chart.setOption(option);
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
  padding: 0 50px;

  :deep(.el-dialog) {
    border: 1px solid #64d2f7;
    color: white;
    background-color: rgba(25, 56, 91, 0.8);

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
      display: flex;
      justify-content: space-between;
      > div {
        width: 49%;
        height: 100%;
        border: 1px solid red;
      }
    }
  }
}
</style>
