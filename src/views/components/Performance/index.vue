<!--------------------------------------------
 ¦ 处置绩效
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-16 16:41:12
 ¦------------------------------------------->

<template>
  <div class="performance">
    <Title title="处理绩效">
      <!--#region 标题导航栏-->
      <template #tabs>
        <el-tabs
          v-model="tabActive"
          type="card"
          @tab-click="onHandleTownOrDeptClick"
        >
          <el-tab-pane
            class="tab-item"
            label="乡镇"
            name="village"
          ></el-tab-pane>
          <el-tab-pane label="部门" name="department"></el-tab-pane>
        </el-tabs>
      </template>
      <!--#endregion-->

      <!--#region 标题尾部功能区-->
      <template #more>
        <div class="tools">
          <i class="icon-square" @click="carouselDialogVisible = true"></i>
          <i class="icon-zoom" @click="moreDialogVisible = true"></i>
        </div>
      </template>
      <!--#endregion-->
    </Title>
    <div class="navi-bar">
      <div
        v-for="typeItem in typeList"
        :key="typeItem.value"
        :class="{ tab: true, active: typeActive === typeItem.value }"
        @click="typeActive = typeItem.value"
      >
        {{ typeItem.label }}
      </div>
    </div>

    <!--#region 列表区-->
    <List :dataModel="rankingList" :type="typeActive" />
    <!--#endregion-->

    <!--#region 图片轮播的弹窗区-->
    <CarouselDialog v-model:visible="carouselDialogVisible" />
    <!--#endregion-->

    <!--#region 处置绩效-更多内容的弹窗区-->
    <MoreDialog v-model:visible="moreDialogVisible" />
    <!--#endregion-->
  </div>
</template>

<script setup>
import Title from "@/components/Title/index.vue";
import List from "./List.vue";
import CarouselDialog from "./CarouselDialog.vue";
// import MoreDialog from "./MoreDialog.vue";
import MoreDialog from "./components/MoreDialog.vue";
import { ref, reactive, toRaw, inject, watch } from "vue";
import { getEventStatPointRankV2 } from "@/apis/cockpitEventStats";

// 乡镇/部门的选择标签
let tabActive = ref("village");
// 销号率/考核的选择标签
let typeActive = ref(1);
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

// 处置绩效组件数据源
let dataModel = ref([]);

// 绩效排名列表
let rankingList = ref([]);

// 开启图片轮播弹窗的参数
const carouselDialogVisible = ref(false);

// 开启处置绩效-更多内容的弹窗参数
const moreDialogVisible = ref(false);

// 获取处置绩效的数据
const getEventPointRankModel = async (queryParam) => {
  const param = Object.assign(
    {
      adcd: "",
      code: "1",
      startTime: "2021-07-24 18:00:00",
      endTime: "2022-08-24 18:00:00",
      searchText: "",
      pageNo: 1,
      pageSize: 10,
    },
    queryParam
  );
  return await getEventStatPointRankV2(param);
};

/**
 * 绩效中乡镇或部门的标签页点击切换事件
 * @param {pane} context
 * @returns {undefined}
 */
const onHandleTownOrDeptClick = (context) => {
  rankingList.value = toggleTownOrDeptList(context.paneName, typeActive.value);
};

/**
 * 处置绩效选项切换时，更新数据列表
 * @param {String} local
 * @param {String} stamp
 * @returns {object}
 */
const toggleTownOrDeptList = (local, stamp) => {
  const model = toRaw(dataModel);
  let target = null;
  if (local === "village") {
    target =
      stamp === 1
        ? model?.zoneRank?.completedRankList
        : model?.zoneRank?.pointRankList;
  } else {
    target =
      stamp === 1
        ? model?.departmentRank?.completedRankList
        : model?.departmentRank?.pointRankList;
  }
  // 获取百分比的总数
  return target;
};

// 监听绩效的排名类型切换
watch(
  () => typeActive.value,
  (Actived) => {
    rankingList.value = toggleTownOrDeptList(tabActive.value, Actived);
  },
  {
    immediate: false,
  }
);

// 获取注入的时间区间
let dateRange = inject("dateRange");

// 监测查询时间
watch(
  () => dateRange,
  async (dateRange) => {
    // 先加载一次数据
    dataModel = await getEventPointRankModel({
      ...dateRange.value,
    });
    rankingList.value = toggleTownOrDeptList(tabActive.value, typeActive.value);
    console.log(dataModel);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="less" scoped>
.performance {
  display: flex;
  flex-direction: column;
  height: 305px;
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
      box-sizing: border-box;
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
