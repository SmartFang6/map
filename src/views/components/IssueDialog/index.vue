<template>
  <div>
    <!-- 统计 -->
    <ul class="totle_ul">
      <li>
        <span>派发总数</span
        ><span class="item-value" style="color: #fff">{{
          eventGradeInfo?.unitEventNumTotal
        }}</span
        ><span>个</span>
      </li>
      <li>
        <span>已解决</span
        ><span class="item-value" style="color: #e35f5f">{{
          eventGradeInfo?.unitCompletedNumTotal
        }}</span
        ><span>个</span>
      </li>
      <li>
        <span>未解决</span
        ><span class="item-value" style="color: #ffb401">{{
          eventGradeInfo?.unitNoCompletedNumTotal
        }}</span
        ><span>个</span>
      </li>
      <li>
        <span>解决率</span
        ><span class="item-value" style="color: #0adbe0">{{
          eventGradeInfo?.unitCompletedRateTotal
        }}</span
        ><span>个</span>
      </li>
    </ul>
    <div class="center">
      <!-- 进度条 -->
      <div class="center-left">
        <ProgressBar
          v-for="(item, idx) in unitList"
          :no="idx + 1"
          :count="item.unitEventNum"
          :key="idx"
          :rate="(item.unitCompletedRate * 100).toFixed(2)"
          flexType="col"
          :title="item.eventResponsibleUnitCodeName"
        />
      </div>
      <!-- echarts -->
      <div class="center-right">
        <!-- echart -->
        <div class="problemEchart" ref="chart"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, inject } from "vue";
import "echarts-gl";
import * as Echarts from "echarts";
import ProgressBar from "@/views/components/ProgressBar";
import { getEventDistributeInfo } from "@/apis/home.js";
import store from "@/store";

const eventGradeInfo = ref({});
// top 统计数据
function getTotalData() {
  getEventDistributeInfo({
    adcd: store?.state?.userInfo?.adminDivCode || "330182",
    endTime: store?.state?.dateObj?.endTime,
    startTime: store?.state?.dateObj?.startTime,
  }).then((res) => {
    eventGradeInfo.value = res;
  });
}
getTotalData();
// 左侧注入数据
const leftData = inject("leftData");

// 责任单位列表
const unitList = computed(() => {
  if (!leftData || !leftData.value.eventResponsibleUnitList) {
    return [];
  }
  return leftData.value.eventResponsibleUnitList;
});

const chart = ref(null);
let chartTool = null;
const colorList = [
  "#00f5ff",
  "#ffcd19",
  "#e35f5f",
  "#07dda3",
  "#31b9ff",
  "#ff9019",
  "#b675ff",
];
let optionConfig = computed(() => {
  let _res =
    leftData.value?.eventGradeList.map((item, idx) => {
      return {
        name: item?.eventGradeName,
        value: item?.eventGradeNum,
        rate: (item?.eventGradeRate * 100).toFixed(2),
        itemStyle: {
          color: colorList[idx],
        },
      };
    }) || [];
  return _res;
});

// let selectedIndex = "";
let hoveredIndex = "";
// 生成扇形的曲面参数方程
function getParametricEquation(
  startRatio,
  endRatio,
  isSelected,
  isHovered,
  k,
  h
) {
  // 计算
  const midRatio = (startRatio + endRatio) / 2;

  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    // eslint-disable-next-line no-param-reassign
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  // eslint-disable-next-line no-param-reassign
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },

    x(u, v) {
      if (u < startRadian) {
        return (
          offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y(u, v) {
      if (u < startRadian) {
        return (
          offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z(u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      // 当前图形的高度是Z根据h（每个value的值决定的）
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}
// 生成模拟 3D 饼图的配置项
function getPie3D(pieData, internalDiameterRatio) {
  const series = [];
  // 总和
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData = [];
  const k =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i += 1) {
    sumValue += pieData[i].value;

    const seriesItem = {
      name:
        typeof pieData[i].name === "undefined" ? `series${i}` : pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k,
      },
    };

    if (typeof pieData[i].itemStyle !== "undefined") {
      const { itemStyle } = pieData[i];

      // eslint-disable-next-line no-unused-expressions
      typeof pieData[i].itemStyle.color !== "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      // eslint-disable-next-line no-unused-expressions
      typeof pieData[i].itemStyle.opacity !== "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }
  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i += 1) {
    endValue = startValue + series[i].pieData.value;

    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      // 我这里做了一个处理，使除了第一个之外的值都是10
      series[i].pieData.value === series[0].pieData.value ? 35 : 10
    );

    startValue = endValue;

    legendData.push(series[i].name);
  }

  // 生成图例item-style
  let legendItemRich = {};
  pieData.forEach((item, idx) => {
    legendItemRich[`value${idx}`] = {
      ...item.itemStyle,
      marginLeft: "50px",
      fontSize: "20px",
    };
  });

  // 计算item-value 占比数值
  // const total = pieData
  //   .map((i) => i.value)
  //   .reduce((pre, nex) => {
  //     return Number(pre) + Number(nex);
  //   }, 0);
  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    // animation: false,
    tooltip: {
      formatter: (params) => {
        if (params.seriesName !== "mouseoutSeries") {
          return `${
            params.seriesName
          }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
            params.color
          };"></span>${option.series[params.seriesIndex].pieData.rate} %`;
        }
        return "";
      },
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      left: 100,
      bottom: 10,
      formatter: (name) => {
        const item = pieData.filter((i) => i.name === name)[0];
        const idx = pieData.findIndex((i) => i.name === name);
        return `${name} {value${idx}|${item.value}}个  {value${idx}|${item.rate}}%`;
      },
      textStyle: {
        color: "#fff",
        rich: legendItemRich,
      },
      pageTextStyle: {
        color: "#fff",
      },
      pageIconInactiveColor: "#fff",
      pageIconColor: "#ccc",
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      show: false,
      boxHeight: 5,
      top: -80,
      left: 0,
      viewControl: {
        // 3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 30,
        // beta: 30,
        rotateSensitivity: 1,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: true,
        distance: 180,
      },
      // 后处理特效可以为画面添加高光、景深、环境光遮蔽（SSAO）、调色等效果。可以让整个画面更富有质感。
      postEffect: {
        // 配置这项会出现锯齿，请自己去查看官方配置有办法解决
        enable: false,
        bloom: {
          enable: true,
          bloomIntensity: 0.1,
        },
        SSAO: {
          enable: true,
          quality: "medium",
          radius: 2,
        },
        // temporalSuperSampling: {
        //   enable: true,
        // },
      },
    },
    series,
  };
  return option;
}
//  修正取消高亮失败的 bug
// 监听 mouseover，近似实现高亮（放大）效果

function chartMouseover(params) {
  // 准备重新渲染扇形所需的参数
  let isSelected;
  let isHovered;
  let startRatio;
  let endRatio;
  let k;
  let i;

  // 如果触发 mouseover 的扇形当前已高亮，则不做操作
  if (hoveredIndex === params.seriesIndex) {
    return;

    // 否则进行高亮及必要的取消高亮操作
  } else {
    // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
    if (hoveredIndex !== "") {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
      isSelected = option.value.series[hoveredIndex].pieStatus.selected;
      isHovered = false;
      startRatio = option.value.series[hoveredIndex].pieData.startRatio;
      endRatio = option.value.series[hoveredIndex].pieData.endRatio;
      k = option.value.series[hoveredIndex].pieStatus.k;
      i =
        option.value.series[hoveredIndex].pieData.value ===
        option.value.series[0].pieData.value
          ? 35
          : 10;
      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      option.value.series[hoveredIndex].parametricEquation =
        getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          i
        );
      option.value.series[hoveredIndex].pieStatus.hovered = isHovered;

      // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
      hoveredIndex = "";
    }

    // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
    if (params.seriesName !== "mouseoutSeries") {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
      isSelected = option.value.series[params.seriesIndex].pieStatus.selected;
      isHovered = true;
      startRatio = option.value.series[params.seriesIndex].pieData.startRatio;
      endRatio = option.value.series[params.seriesIndex].pieData.endRatio;
      k = option.value.series[params.seriesIndex].pieStatus.k;

      // 对当前点击的扇形，执行高亮操作（对 option 更新）
      option.value.series[params.seriesIndex].parametricEquation =
        getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          option.value.series[params.seriesIndex].pieData.value / 5 + 5 // 控制高亮柱状高度
        );
      option.value.series[params.seriesIndex].pieStatus.hovered = isHovered;

      // 记录上次高亮的扇形对应的系列号 seriesIndex
      hoveredIndex = params.seriesIndex;
    }

    // 使用更新后的 option，渲染图表
    chartTool.setOption(option);
  }
}

// 修正取消高亮失败的 bug
function globaloutHandler() {
  if (hoveredIndex !== "") {
    // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
    let isSelected = option.value.series[hoveredIndex].pieStatus.selected;
    let isHovered = false;
    let k = option.value.series[hoveredIndex].pieStatus.k;
    let startRatio = option.value.series[hoveredIndex].pieData.startRatio;
    let endRatio = option.value.series[hoveredIndex].pieData.endRatio;
    // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
    let i =
      option.value.series[hoveredIndex].pieData.value ===
      option.value.series[0].pieData.value
        ? 35
        : 10;
    option.value.series[hoveredIndex].parametricEquation =
      getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, i);
    option.value.series[hoveredIndex].pieStatus.hovered = isHovered;

    // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
    hoveredIndex = "";
  }

  // 使用更新后的 option，渲染图表
  chartTool.setOption(option);
}
let option = ref({});
onMounted(() => {
  chartTool = Echarts.init(chart.value);
  option.value = getPie3D(optionConfig.value, 0.59);
  chartTool.setOption(option.value);
  chartTool.on("mouseover", chartMouseover);
  chartTool.on("globalout", globaloutHandler);
});
</script>
<style scoped lang="less">
.totle_ul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  li {
    width: 23%;
    line-height: 74px;
    background: url(@/assets/images/count-icon.png);
    background-size: 100% 100%;
    color: white;
    text-align: center;

    span {
      margin-right: 10px;
    }

    .item-value {
      font-size: 48px;
      font-family: YOUSHEBIAOTIHEI;
    }
  }
}
.center {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  &-left {
    width: 60%;
    height: 400px;
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
  &-right {
    width: 40%;
    height: 400px;
  }
  .problemEchart {
    width: 400px;
    height: 400px;
    max-height: 400px;
    margin: 0 auto;
    background: url(@/assets/images/pie_bg.png) no-repeat;
    background-size: 300px 155px;
    background-position: 50px 110px;
  }
}
</style>
