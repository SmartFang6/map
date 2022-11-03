<!--****************************************
 * 处理绩效 柱状图表UI组件
 *
 * founder: wangwg
 * Date: 2022/11/01 17:00
 *****************************************-->
<template>
  <div class="performance-chart">
    <div class="performance--header">
      <div>
        <el-tabs v-model="tabActive" type="card">
          <el-tab-pane label="乡镇" name="zoneRank"></el-tab-pane>
          <el-tab-pane label="部门" name="departmentRank"></el-tab-pane>
        </el-tabs>
      </div>
      <div
        class="navi-bar"
        v-if="tabActive === 'zoneRank' || tabActive === 'departmentRank'"
      >
        <div
          v-for="(item, index) in typeList"
          :key="item.value || index"
          :class="{ tab: true, active: typeActive === item.value }"
          @click="typeActive = item.value"
        >
          {{ item.label }}
        </div>
      </div>
    </div>

    <!--#region 列表区-->
    <Chart :dataModel="useRankingList" :type="typeActive" />
    <!--#endregion-->

    <!--#region 处置绩效/更多内容的弹窗区-->
    <el-dialog
      v-model="moreDialogVisible"
      append-to-body
      :destroy-on-close="true"
      custom-class="common_dialog"
      width="75vw"
    >
      <MoreDialog :moreData="moreDataSource" />
    </el-dialog>
    <!--#endregion-->
  </div>
</template>

<script setup>
/**
 处理绩效的柱状图表
 **/
import { reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import MoreDialog from "./MoreDialog.vue";
import Chart from "./Chart.vue";
import { getEventStatPointRankV2 } from "@/apis/cockpitEventStats";

// 数据模型
const dataModel = reactive({
  // 乡镇/部门的标签选择参数
  tabActive: "zoneRank",
  // 销号率/考核的标签选择参数
  typeActive: 1,
  // 部门考核销号率排名
  deptCompletedRank: null,
  // 部门考核分数排名
  deptPointRank: null,
  // 乡镇考核销号率排名
  zoneCompletedRank: null,
  // 乡镇考核分数排名
  zonePointRank: null,
  // 当前使用的列表数据
  useRankingList: null,
  // 处置绩效-更多内容的数据源
  moreDataSource: null,
  // 开启处置绩效-更多内容的弹窗参数
  moreDialogVisible: false,
});

// 表格分类的列表
const typeList = reactive([
  {
    label: "销号率",
    value: 1,
  },
  {
    label: "考核",
    value: 2,
  },
]);

const {
  tabActive,
  typeActive,
  deptCompletedRank,
  deptPointRank,
  zoneCompletedRank,
  zonePointRank,
  useRankingList,
  moreDataSource,
  moreDialogVisible,
} = toRefs(dataModel);

// 获取处置绩效的数据
function getEventRankData(queryParam) {
  const param = {
    adcd: "",
    code: "1",
    startTime: "2022-01-01 00:00:00",
    endTime: "2022-12-31 23:59:59",
    searchText: "",
    pageNo: 1,
    pageSize: 10,
    ...queryParam,
  };
  getEventStatPointRankV2(param).then((res) => {
    if (!res) return;
    if (res?.departmentRank) {
      deptCompletedRank.value = res?.departmentRank?.completedRankList || [];
      deptPointRank.value = res?.departmentRank?.pointRankList || [];
    }
    if (res?.zoneRank) {
      zoneCompletedRank.value = res?.zoneRank?.completedRankList || [];
      zonePointRank.value = res?.zoneRank?.pointRankList || [];
    }
    // 提供更多内容弹窗的数据源
    moreDataSource.value = res;
    // 更新图表的绘制数据
    toggleTownOrDeptList();
  });
}

// 根据标签的选项切换数据列表
function toggleTownOrDeptList() {
  if (tabActive.value === "departmentRank") {
    useRankingList.value =
      typeActive.value === 1 ? deptCompletedRank.value : deptPointRank.value;
  }
  if (tabActive.value === "zoneRank") {
    useRankingList.value =
      typeActive.value === 1 ? zoneCompletedRank.value : zonePointRank.value;
  }
}

// 开启处置绩效-更多内容的弹窗
function openDialog() {
  moreDialogVisible.value = true;
}

defineExpose({ openDialog });

const store = useStore();

// 监测查询时间
watch(
  () => store?.state?.dateRange,
  (newVal, oldVal) => {
    const params = newVal || oldVal;
    getEventRankData(params);
  },
  {
    immediate: true,
    deep: true,
  }
);

// 监听绩效的排名类型切换
watch(
  [() => tabActive.value, typeActive],
  () => {
    toggleTownOrDeptList();
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="less" scoped>
.performance-chart {
  display: flex;
  flex-direction: column;
  height: 100%;
  :deep(.el-tabs) {
    height: auto;
    margin-left: 10px;
  }

  :deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
    font-size: 18px;
    font-family: YOUSHEBIAOTIHEI;
    box-sizing: border-box;
    border: none;
    color: white;
  }

  :deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
    border: none;
  }

  :deep(.el-tabs--card > .el-tabs__header) {
    border: none;
  }
  :deep(.el-tabs__header) {
    margin: 0;
  }
  :deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active) {
    background: url(@/assets/images/checked.png);
    background-size: 100% 100%;
  }

  :deep(.tools) {
    display: flex;
    position: absolute;
    right: 0;
    padding-right: 48px;

    i[class^="icon-"] {
      margin-left: 20px;
      cursor: pointer;
    }

    i[class^="icon-"]:first-child {
      margin-left: 0;
    }

    .icon-square {
      width: 18px;
      height: 18px;
      background: url(@/assets/images/icon-square.png) no-repeat;
      background-size: 100% 100%;
    }

    .icon-zoom {
      width: 16px;
      height: 16px;
      background: url(@/assets/images/icon-zoom.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}

.performance--header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navi-bar {
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px 0 0;
  letter-spacing: 1px;
  // color: #c4f0ff;
  color: #ffffff;
  font-size: 18px;
  font-family: YOUSHEBIAOTIHEI;
  .tab {
    width: auto;
    height: 27px;
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .tab.active {
    width: 135px;
    padding: 0;
    background: url(@/assets/images/performance-tab-selected.png) no-repeat;
    background-size: 100% 100%;
  }
}

.medal-bar {
  display: flex;
  padding-bottom: 12px;
  justify-content: space-between;
  align-items: flex-end;

  .tabs {
    padding: 10px 0 12px 10px;
    display: flex;
    letter-spacing: 1px;
    color: #c4f0ff;
    font-size: 18px;
    font-family: YOUSHEBIAOTIHEI;
    .tab {
      width: 130px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .tab.active {
      background: url(@/assets/images/performance-tab-active.png);
    }
  }

  .first {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 7px;
    .first-info {
      display: flex;
      padding-left: 15px;
      flex-direction: column;
      align-items: flex-end;
    }
    .name {
      color: #fff;
      font-size: 24px;
      font-family: FZZDHJW;
    }
    .value {
      font-family: AGENCYB;
      & > span:first-child {
        font-size: 36px;
        color: #00f5ff;
      }
      & > span:last-child {
        font-size: 18px;
        color: #c4f0ff;
        padding-left: 3px;
        padding-right: 2px;
      }
    }
  }

  .other {
    &-item {
      width: 263px;
      height: 44px;
      background: url(@/assets/images/medal-bar-item.png);
      background-size: 100%;
      padding-left: 32px;
      padding-right: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      &:first-child {
        margin-bottom: 20px;
      }
      &:last-child .score > span:first-child {
        color: #ffcd19;
      }
      .no {
        font-family: YOUSHEBIAOTIHEI;
        text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
        background-image: linear-gradient(#0af0f3, #089ddb);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        padding-right: 8px;
        & > span:first-child {
          font-size: 24px;
        }
        & > span:last-child {
          font-size: 36px;
        }
      }
      .name {
        color: #c4f0ff;
        font-size: 18px;
        font-family: FZZDHJW;
        padding-top: 5px;
        padding-right: 18px;
      }
      .score {
        & > span:first-child {
          font-family: AGENCYB;
          font-size: 30px;
          color: #32da85;
        }
        & > span:last-child {
          font-family: AGENCYB;
          color: #c4f0ff;
          font-size: 18px;
          padding-left: 3px;
        }
      }
    }
  }
}
</style>
