<template>
  <div class="event-statis">
    <div class="region">
      <ChartTitle title="按区域" />
      <div class="chart">
        <div ref="regionChartRef"></div>
      </div>
      <div class="legend-list">
        <div
          class="legend"
          v-for="(item, index) in regionData"
          :key="item"
          :style="{ '--color': colorList[index] }"
        >
          <div class="circle"></div>
          <el-tooltip effect="dark" :content="item.name" placement="top">
            <div class="name">{{ item.name }}</div>
          </el-tooltip>
          <div class="data">
            <div class="num">
              {{ item.value }}
              <span>个</span>
            </div>
            <div class="percent">
              {{ item.proportion }}
              <span>%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="type">
      <ChartTitle title="按类型" />
      <div class="chart">
        <div ref="typeChartRef"></div>
      </div>
      <div class="legend-list">
        <div
          class="legend"
          v-for="(item, index) in typeData"
          :key="item"
          :style="{ '--color': colorList[index] }"
        >
          <div class="circle"></div>
          <el-tooltip effect="dark" :content="item.name" placement="top">
            <div class="name">{{ item.name }}</div>
          </el-tooltip>
          <div class="data">
            <div class="num">
              {{ item.value }}
              <span>个</span>
            </div>
            <div class="percent">
              {{ item.proportion }}
              <span>%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { countEventClassCount } from "@/apis/home";
import * as Echarts from "echarts";
import { useStore } from "vuex";
const store = useStore();
// 按区域的玫瑰图 数据
const regionData = ref([]);
// 按类型的玫瑰图 数据
const typeData = ref([]);
const randomRgbColor = function () {
  var r = Math.floor(Math.random() * 256); //随机生成256以内r值
  var g = Math.floor(Math.random() * 256); //随机生成256以内g值
  var b = Math.floor(Math.random() * 256); //随机生成256以内b值
  return `rgb(${r},${g},${b})`; //返回rgb(r,g,b)格式颜色
};
const colorList = ref([
  "#00ffe4",
  "#00d2ff",
  "#00a8ff",
  "#0f44f0",
  "#5058fa",
  "#9050fa",
  "#f450fa",
  "#ff5e4a",
  "#ffcd36",
  "#eaff36",
  "#36ff49",
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
  randomRgbColor(),
]);
const chartData = (data, show, name) => {
  return {
    legend: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "#0a1025",
      textStyle: {
        color: "#fff",
        fontSize: "14",
      },
      borderColor: "#0a1025",
    },
    color: colorList,
    series: [
      {
        name: "事件统计" + name,
        type: "pie",
        radius: [108, 220],
        center: ["50%", "52%"],
        roseType: "area",
        emphasis: {
          label: {
            show: true,
            fontSize: "36",
            fontFamily: "AgencyFB-Bold",
            fontWeight: "bold",
          },
        },
        startAngle: 135,
        labelLine: {
          show: false,
        },
        avoidLabelOverlap: false,
        label: {
          show,
          focus: "self",
          position: "center",
          fontSize: "36",
          color: "#0adbe0",
          fontFamily: "AgencyFB-Bold",
          formatter: (p) => {
            let { name, proportion, value } = p.data;
            let newName = name.length > 5 ? name.slice(0, 4) + "..." : name;
            return `${value}/${proportion}%\n${newName}`;
          },
        },
        itemStyle: {
          borderRadius: 8,
        },
        data,
      },
    ],
  };
};
let rShow = true;
let tShow = true;
// 按区域的图表数据
const regionOption = ref(chartData(regionData, rShow, "区域"));
// 按类型的图表数据
const typeOption = ref(chartData(typeData, tShow, "类型"));
// 按区域refs
const regionChartRef = ref(null);
// 按类型refs
const typeChartRef = ref(null);
// 两个图表
let regionChart = null;
let typeChart = null;
nextTick(() => {
  regionChart = Echarts.init(regionChartRef.value);
  typeChart = Echarts.init(typeChartRef.value);
  addEchartsData();
  charEvent();
});
// 图表 移入移出事件。处理图表中心的显示bug
const charEvent = () => {
  regionChart.on("mouseover", () => {
    rShow = false;
    regionOption.value = chartData(regionData, rShow, "区域");
    regionChart.setOption(regionOption.value);
  });
  regionChart.on("mouseout", () => {
    rShow = true;
    regionOption.value = chartData(regionData, rShow, "区域");
    regionChart.setOption(regionOption.value);
  });
  typeChart.on("mouseover", () => {
    rShow = false;
    typeOption.value = chartData(typeData, rShow, "类型");
    typeChart.setOption(typeOption.value);
  });
  typeChart.on("mouseout", () => {
    rShow = true;
    typeOption.value = chartData(typeData, rShow, "类型");
    typeChart.setOption(typeOption.value);
  });
};

// 获取数据
const addEchartsData = () => {
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    try {
      const { dateObj, userInfo } = store.state;
      let data = {
        adcd: userInfo.adminDivCode,
        ...dateObj,
      };
      let { eventAdcdCount, eventTypeCount } = await countEventClassCount(data);
      //区域
      regionData.value = eventAdcdCount
        .map((i) => {
          return {
            name: i.obj,
            value: i.amount,
            proportion: (i.proportion * 100).toFixed(0),
          };
        })
        .filter((i) => i.value !== 0);
      regionData.value = regionData.value.sort((a, b) => b.value - a.value);
      // 类型
      typeData.value = eventTypeCount
        .map((i) => {
          return {
            name: i.obj,
            value: i.amount,
            proportion: (i.proportion * 100).toFixed(0),
          };
        })
        .filter((i) => i.value !== 0);
      typeData.value = typeData.value.sort((a, b) => b.value - a.value);
      resolve();
    } catch (error) {
      console.log(error);
    }
  }).then(() => {
    nextTick(() => {
      // 按区域
      regionChart.setOption(regionOption.value);
      // //按类型
      typeChart.setOption(typeOption.value);
    });
  });
};
</script>

<style scoped lang="less">
:deep(.el-dialog) {
  background: rgb(49, 47, 185);
  height: 80vh;
}
.event-statis {
  display: flex;
  justify-content: space-between;
  & > div {
    width: 48%;
  }
}
.chart {
  width: 100%;
  margin: 20px 0;
  div {
    width: 100%;
    height: 460px;
  }
}
.legend-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  // justify-content: space-between;
  .legend {
    --color: "#fff";
    display: flex;
    align-items: center;
    width: 49.5%;
    margin-right: 0.5%;
    &:nth-child(2n) {
      margin-right: 0;
    }
    .circle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--color);
    }
    .name {
      width: 86px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 4px;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #d9f0fe;
    }
    .data {
      display: flex;
      align-items: center;
      margin-left: 28px;
      div {
        margin-right: 17px;
        font-family: AgencyFB-Bold;
        font-size: 20px;
        color: var(--color);
        span {
          margin-left: 6px;
          font-size: 14px;
          color: #d9f0fe;
        }
      }
    }
  }
}
</style>
