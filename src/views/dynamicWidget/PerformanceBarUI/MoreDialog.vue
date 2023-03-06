<!--
    处置绩效-更多 的弹窗组件
-->
<template>
  <div class="more_dialog_container">
    <div class="top_title">
      <div class="title_wrap">处理绩效</div>
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
    <div class="two_title" v-if="!isShowDetail">
      <ChartTitle :title="'销号率排名'" />
      <ChartTitle :title="'考核排名'" />
    </div>

    <div class="container">
      <div class="content_wrap">
        <div class="echart_left">
          <template v-if="problemSourceList.length > 0">
            <ProgressBar
              v-for="(item, index) in problemSourceList"
              :no="index + 1"
              :count="item?.unitEventNum || 0"
              :rate="item?.completed || 0"
              :key="item?.point || index"
              flexType="row"
              :title="item?.eventResponsibleUnitCodeName || ''"
            />
          </template>
          <el-empty
            v-else
            description="暂无数据"
            :image-size="230"
            class="dc-empty"
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
      <!-- 得分详情 -->
      <div class="newContent" :class="isShowDetail ? 'showScoreDetail' : ''">
        <!-- 顶部分数和返回 -->
        <div class="content_title">
          <div class="totalScore">
            {{ nowScore }}
            <span>分</span>
          </div>
          <el-button type="primary" link @click="back">返回</el-button>
        </div>
        <!-- 考核单位 -->
        <div class="tabs">
          <div
            v-for="item in chartData"
            :key="item.eventResponsibleUnitCode || item.unitCode"
            @click="switchTab(item)"
            class="tab"
            :class="
              activeRankTab === item.eventResponsibleUnitCode ||
              activeRankTab === item.unitCode
                ? 'active'
                : ''
            "
          >
            {{ item.eventResponsibleUnitCodeName || item.unitName }}
          </div>
        </div>
        <el-form-item class="assessmentIndex" label="考核指标">
          <el-select
            v-model="indexId"
            placeholder="请选择"
            @change="getSorceDetail"
            clearable
          >
            <el-option
              v-for="cond in conditionList"
              :key="cond.indexId"
              :label="cond.indexName"
              :value="cond.indexId"
            />
          </el-select>
        </el-form-item>
        <el-table
          :data="tableData"
          :headerCellStyle="{
            background: '#05143f',
            textAlign: 'center',
            color: '#0adbe0',
            width: '100%',
          }"
          max-height="40vh"
          style="width: 100%"
          :cellStyle="{ textAlign: 'center' }"
        >
          <el-table-column prop="gradingTime" width="90px" label="日期">
            <template #default="{ row }">
              <div>
                {{ row.gradingTime?.split(" ")?.[0] }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="indexName" label="考核指标" />
          <el-table-column label="触发规则">
            <template #default="{ row }">
              <el-popover
                placement="top-start"
                title="触发规则: "
                :width="160"
                trigger="hover"
                :show-after="100"
                :content="row.ruleName"
              >
                <template #reference>
                  <div class="showEllipsis">
                    {{ row.ruleName }}
                  </div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="eventId" label="事件编号" />
          <el-table-column label="触发事项">
            <template #default="{ row }">
              <el-popover
                placement="top-start"
                title="触发事项: "
                :width="160"
                trigger="hover"
                :show-after="100"
                :content="row.description"
              >
                <template #reference>
                  <div class="showEllipsis">{{ row.description }}</div>
                </template>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column prop="score" width="80px" label="分数变化">
            <template #default="{ row }">
              <div class="showEllipsis">
                {{ row.scoreChange == 0 ? -row.score : "+" + row.score }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import * as Echarts from "echarts";
import ProgressBar from "@/views/components/ProgressBar";
import { listIndex, scoreDetail } from "@/apis/common";

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

const chartData = ref([]);
// 考核
const indexId = ref("");
// 考核指标列表
const conditionList = ref([]);
const getListIndex = async (suitUnitType = "") => {
  conditionList.value = await listIndex({ suitUnitType });
};
getListIndex(1);
// 考核指标
const tableData = ref([]);
const nowScore = ref("");
const activeRankTab = ref(
  chartData.value?.[0]?.eventResponsibleUnitCode ||
    chartData.value?.[0]?.unitCode
);
// 切换考核单位
const switchTab = (item) => {
  activeRankTab.value = item.eventResponsibleUnitCode || item.unitCode;
  nowScore.value = item.count || item.score;
  getSorceDetail();
};
const getSorceDetail = async () => {
  let res = await scoreDetail({
    unitCode: activeRankTab.value,
    indexId: indexId.value,
  });
  tableData.value = res;
};
//#region 显示考核详情
const isShowDetail = ref(false);
const back = () => {
  isShowDetail.value = false;
};
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
        name: item?.eventResponsibleUnitCodeName || item.unitName,
        count: item?.point || item.score,
      };
    }
  );
  // 切换考核单位
  // activeRankTab.value = chartData.value?.[0]?.eventResponsibleUnitCode;
  if (isShowDetail.value) {
    switchTab(chartData.value?.[0]);
  }
  // 绘制图表内容
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
  chart.on("click", (e) => {
    let item = chartData.value.find((i) => {
      if (i.eventResponsibleUnitCodeName === e.name || i.unitName === e.name) {
        return i;
      }
    });
    nowScore.value = item.count || item.score;
    isShowDetail.value = true;
    switchTab(item);
  });
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
  .container {
    position: relative;
    width: 100%;
    height: 500px;
  }
  .content_wrap {
    position: absolute;
    z-index: 1;
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
  .newContent {
    width: 100%;
    height: 500px;
    margin-top: 20px;
    position: absolute;
    // position: relative;
    z-index: -1;
    background: #051446;
    .tabs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      border-bottom: 2px solid #09256e;
      .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 135px;
        padding: 0 16px;
        height: 27px;
        margin-top: 8px;
        font-size: 18px;
        color: #c4f0ff;
        cursor: pointer;
      }
      .active {
        background: url("@/assets/images/water_tab.png") no-repeat;
        background-size: 100% 27px;
        background-position-y: 2px;
      }
    }
    .assessmentIndex {
      margin: 10px 0;
      :deep(.el-form-item__label) {
        color: #fff;
      }
      :deep(.el-input__wrapper) {
        background: rgba(51, 179, 253, 0.2);
        box-shadow: 0 0 0 1px #33b3fd;
        .el-input__inner {
          color: #fff;
        }
      }
    }
    :deep(.el-table) {
      background: transparent;
      color: #fff;
      tr {
        background: transparent;
      }
      // 除去hover效果
      tr:hover > td.el-table__cell {
        background: transparent;
      }
      // 表头
      .el-table__header-wrapper {
        tr {
          background: transparent;
        }
        th {
          background: transparent;
          text-align: center;
          border: none !important;
          color: #fff;
        }
      }
      .el-table__inner-wrapper {
        // 除去底部边框
        &::before,
        &::after {
          display: none;
        }
      }
      // 表体
      .el-table__body {
        border: none;
      }
      .el-table__body-wrapper {
        .el-scrollbar__view {
          width: 100%;
        }
        .el-table__row {
          background-color: rgba(#001349, 0.8);
          td {
            text-align: center;
            border-right: none;
            border-bottom: none;
            border-left: none !important;
            font-family: AgencyFB-Bold;
          }
          &:nth-child(2n) {
            background-color: rgba(#03378a, 0.2);
          }
        }
      }
    }
    :deep(.el-table--border) {
      &::before,
      &::after {
        display: none;
      }
    }
    :deep(.el-table__border-left-patch) {
      display: none;
    }
    .content_title {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .totalScore {
        font-family: AgencyFB-Bold;
        font-size: 26px;
        color: #00dcf0;
        margin-right: 24px;
        span {
          margin-left: 4px;
          font-family: MicrosoftYaHei;
          font-size: 18px;
          color: #00dcf0;
        }
      }
    }
  }
}
.showScoreDetail {
  z-index: 99 !important;
}
.showEllipsis {
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
