<!--
    处置绩效-更多 的弹窗组件
-->
<template>
  <div class="more-dialog-container">
    <el-dialog v-model="dialogVisible">
      <!--#region 处置绩效图表数据的类型选择区-->
      <div class="more-title">
        <span>处置绩效</span>
        <el-tabs
          v-model="tabActive"
          type="card"
          @tab-click="onHandleTownOrDeptToggle"
        >
          <el-tab-pane
            class="tab-item"
            label="乡镇"
            name="village"
          ></el-tab-pane>
          <el-tab-pane label="部门" name="department"></el-tab-pane>
        </el-tabs>
      </div>
      <!--#endregion-->

      <!--#region 处置绩效的图标内容区-->
      <div class="more-content">
        <!--#region 销号率排名数据展示区-->
        <div class="completed-rank">
          <div class="sub-title">
            <p>销号率排名</p>
            <i class="bar-bg"></i>
          </div>
          <div class="progress-list">
            <div class="progress-list-container">
              <vue-seamless-scroll :data="dataList">
                <div
                  v-for="item in dataList"
                  :key="item.index"
                  class="progress-item"
                >
                  <div class="index">{{ item.index }}</div>
                  <div class="item-content">
                    <div class="detail">
                      <p class="intro">{{ item.name }}</p>
                      <span>{{ item.value }}/{{ item.rate + "%" }}</span>
                      <!-- <p><strong>90</strong> <i>/</i> 100<span>%</span></p> -->
                    </div>
                    <div class="progress-bar-outer">
                      <div
                        class="progress-bar-inner"
                        :style="{ width: `${item.rate}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
        <!--#endregion-->

        <!--#region 考核排名柱状图展示区-->
        <div class="score-rank">
          <div class="sub-title">
            <p>考核排名</p>
            <i class="bar-bg"></i>
          </div>
          <div class="score-rank-wrap" ref="scoreRankRef"></div>
        </div>
        <!--#endregion-->
      </div>
      <!--#endregion-->
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, inject, toRaw, watch } from "vue";
import { getEventStatPointRankV2 } from "@/apis/cockpitEventStats";

// 接收父组件传值
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:visible"]);

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

// 组件数据源
let dataModel = ref([]);

// 标签栏的选择项
let tabActive = ref("village");

// 销号率排名列表
let dataList = ref(null);

let chartList = ref(null);

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
 * 处置绩效选项切换时，更新数据列表
 * @param {String} local
 * @param {String} stamp
 * @returns {object}
 */
const toggleTownOrDeptList = (local) => {
  const model = toRaw(dataModel);
  if (local === "village") {
    dataList.value = model?.zoneRank?.completedRankList;
    chartList.value = model?.zoneRank?.pointRankList;
  } else {
    dataList.value = model?.departmentRank?.completedRankList;
    chartList.value = model?.departmentRank?.pointRankList;
  }
};

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
    toggleTownOrDeptList(tabActive.value);
    console.log("dataModel", dataModel);
  },
  {
    immediate: true,
    deep: true,
  }
);

/**
 * 绩效中乡镇或部门的标签页点击切换事件
 * @param {pane} context
 * @returns {undefined}
 */
const onHandleTownOrDeptToggle = (context) => {
  toggleTownOrDeptList(context);
  console.log(context);
};
</script>

<style lang="less" scoped>
.more-dialog-container {
  display: block;
  box-sizing: border-box;
  padding: 0 50px;

  :deep(.el-dialog) {
    width: 1370px;
    height: 788px;
    border: 1px solid #64d2f7;
    color: white;
    background-color: rgba(5, 20, 69, 0.8);
    // background-color: rgba(25, 56, 91, 0.8);

    .el-dialog__header {
      height: 15px;
      padding: 0;
      border-left: 7px solid #0adbe0;
      border-right: 7px solid #0adbe0;
      margin: 0;
    }

    .el-dialog__headerbtn {
      width: 21px;
      height: 20px;
      top: 30px;
      right: 30px;
      background: url(@/assets/images/close-icon.png) no-repeat;

      .el-dialog__close {
        display: none;
      }
    }

    .el-dialog__body {
      padding: 7px 30px 0 30px;
    }
  }

  .more-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    :deep(.el-tabs) {
      height: 52px;
      margin-left: 147px;
    }
    :deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
      height: 52px;
      line-height: 52px;
      font-size: 18px;
      font-family: YOUSHEBIAOTIHEI;
      letter-spacing: 1px;
      box-sizing: border-box;
      border: none;
      color: #fff;
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

    & > span {
      font-size: 26px;
      font-family: YOUSHEBIAOTIHEI;
      line-height: 24px;
      color: #0adbe0;
    }
  }

  .more-content {
    display: flex;
  }

  .completed-rank {
    width: 622px;
    height: 576px;
  }

  .score-rank {
    width: 608px;
    height: 570px;
  }

  .progress-list {
    padding-top: 6px;
    padding-left: 5px;
    padding-right: 20px;
    width: 100%;
    box-sizing: border-box;
    color: #c4f0ff;
    font-size: 14px;
    height: 275px;
    &-container {
      width: 100%;
      overflow: hidden;
    }
    &-item {
      display: flex;
      align-items: center;
      height: 44px;
      margin: 10px 0;
      justify-content: space-between;
      & > .index {
        width: 39px;
        height: 100%;
        font-size: 24px;
        font-family: AGENCYB;
        color: #00f5ff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        & > .index {
          padding-bottom: 21px;
          background: url(@/assets/images/rankings-bottom.png) no-repeat center
            bottom;
        }
      }
      &:nth-child(1) > .index {
        color: #ffcd19;
      }
      &:nth-child(2) > .index {
        color: #dadbdb;
      }
      &:nth-child(3) > .index {
        color: #ac502f;
      }
    }

    .item-content {
      flex: 1;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      height: 100%;
      padding-left: 15px;
      .detail {
        display: flex;
        justify-content: space-between;
        padding-bottom: 3px;
      }
    }

    .progress-bar-outer {
      border-radius: 8px;
      height: 16px;
      background: rgba(255, 255, 255, 0.2);
    }

    .progress-bar-inner {
      border-radius: 8px;
      height: 100%;
      background-image: linear-gradient(-18deg, #0adbe0 0%, #14a2d2 100%),
        linear-gradient(90deg, rgba(89, 240, 93, 0.5) 0%, #59f05d 100%);
      background-blend-mode: normal, normal;
    }

    .type-desc {
      max-width: 370px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .sub-title {
    display: flex;
    width: auto;
    padding-top: 14px;
    line-height: 18px;
    flex-direction: column;
    text-align: left;
    & > p {
      font-size: 18px;
      font-family: "Microsoft YaHei Bold";
      font-weight: 600;
      text-indent: 4px;
      white-space: nowrap;
      color: #ffffff;
    }

    & > i.bar-bg {
      width: 97px;
      height: 5px;
      margin-top: 7px;
      background: url(@/assets/images/sub-title-bar.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .icon-rank {
    width: 39px;
    line-height: 36px;
    font-size: 24px;
    font-family: AgencyFB-Bold;
    font-weight: normal;
    font-stretch: normal;
    color: #00f5ff;
  }
}
</style>
