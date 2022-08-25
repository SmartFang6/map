<!--------------------------------------------
 ¦ 问题清单
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-16 16:51:12
 ¦------------------------------------------->

<template>
  <div class="problem-list">
    <div class="problem-list-header">
      <div class="shake-hands">
        <div class="custom-select-wrapper">
          <!--
          <el-select
            v-if="!collapsed"
            placeholder="全部"
            class="custom-select"
          />
          -->
          <!-- <el-button class="more-problem" @click="dialogVisible = true" link>
            更多
          </el-button> -->
        </div>
        <div class="title">问题清单</div>
        <div class="operator-wrapper">
          <div class="operator" @click="onPanelTrigger">
            <i :class="{ icon: true, 'is-reverse': !collapsed }" />
            <span>{{ collapsed ? "展开" : "收起" }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="problem-list-container">
      <div class="table-header">
        <div>序号</div>
        <div>责任部门</div>
        <div>事件来源</div>
        <div>行政区域</div>
        <!-- <div>所在河湖</div> -->
        <div>事件类型</div>
        <div>事件等级</div>
        <div>发生时间</div>
        <div>状态</div>
      </div>
      <div class="table-body">
        <vue-seamless-scroll :data="dataList" :class-option="{ step: 0.3 }">
          <div
            v-for="row in dataList"
            :key="row.index"
            :class="{ 'table-row': true, stripe: row.index % 2 !== 0 }"
          >
            <div>{{ row.index }}</div>
            <el-tooltip
              :content="row.eventResponsibleUnitName"
              effect="dark"
              placement="top-start"
            >
              <div>{{ row.eventResponsibleUnitName }}</div>
            </el-tooltip>
            <el-tooltip
              :content="row.eventSourceName"
              effect="dark"
              placement="top-start"
            >
              <div>{{ row.eventSourceName }}</div>
            </el-tooltip>
            <el-tooltip :content="row.adnm" effect="dark" placement="top-start">
              <div>{{ row.adnm }}</div>
            </el-tooltip>
            <!-- <el-tooltip
              :content="row.rchnm"
              effect="dark"
              placement="top-start"
            >
              <div class="one-line">{{ row.rchnm }}</div>
            </el-tooltip> -->
            <el-tooltip
              :content="row.eventTypeName"
              effect="dark"
              placement="top-start"
            >
              <div>{{ row.eventTypeName }}</div>
            </el-tooltip>
            <div>{{ row.eventGradeName }}</div>
            <div>{{ row.occurTime }}</div>
            <el-tooltip
              :content="row.status"
              effect="dark"
              placement="top-start"
            >
              <div class="one-line">{{ row.status }}</div>
            </el-tooltip>
          </div>
        </vue-seamless-scroll>
      </div>
    </div>
    <!--#region 搜索区-->
    <el-dialog v-model="dialogVisible" title="问题清单" width="48%">
      <el-table
        :data="dataList"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column property="index" label="序号" width="60" />
        <el-table-column
          property="eventResponsibleUnitName"
          label="责任部门"
          width="80"
        />
        <el-table-column
          property="eventSourceName"
          label="事件来源"
          width="100"
        />
        <el-table-column property="adnm" label="行政区域" width="80" />
        <!-- <el-table-column property="rchnm" label="所在河湖" width="100" /> -->
        <el-table-column property="eventTypeName" label="事件类型" />
        <el-table-column
          property="eventGradeName"
          label="事件等级"
          width="80"
        />
        <el-table-column property="occurTime" label="发生时间" width="100" />
        <el-table-column property="status" label="状态" width="120" />
      </el-table>
    </el-dialog>
    <!--#endregion-->
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import {
  ref,
  toRaw,
  watch,
  computed,
  onBeforeMount,
  onBeforeUnmount,
  inject,
} from "vue";
import { ElTooltip } from "element-plus";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/tooltip/style/css";
import VueSeamlessScroll from "vue-seamless-scroll/src/components/myClass";
import moment from "moment";
import { getEventQuestionList } from "@/apis/cockpitEventStats";

const store = useStore();

// 是否折叠
const collapsed = computed(() => {
  return store.state.layout?.bottom === "close" || false;
});

// 展开/收起事件处理
const onPanelTrigger = () => {
  store.commit("UPDATE_LAYOUT", {
    bottom: store.state.layout?.bottom === "close" ? "open" : "close",
  });
};

// 问题清单"更多"的弹窗
let dialogVisible = ref(false);

// 数据列表
const dataList = ref([]);

// 示例数据
// for (let i = 1; i < 10; i++) {
//   dataList.push({
//     index: i,
//     eventResponsibleUnitName: `${i}农村农业局`,
//     eventSourceName: "公众巡河",
//     adnm: "莲花镇",
//     rchnm: "曹娥江",
//     eventTypeName: "擅自围垦湖泊用于养殖",
//     eventGradeName: "较严重",
//     occurTime: "2022-10-10",
//     status: "逾期已处理",
//   });
// }

// 问题清单数据源
let dataModel = ref(null);

/**
 * 通过接口获取问题清单的列表数据
 * @param {Object} queryParam
 * @returns {any}
 */
const getEventQuestionModel = async (queryParam) => {
  const param = Object.assign(
    {
      adcd: "",
      code: "",
      startTime: "2021-07-24 18:29:29",
      endTime: "2022-08-24 18:29:29",
      searchText: "",
      pageNo: 1,
      pageSize: 20,
    },
    queryParam
  );
  return await getEventQuestionList(param);
};

/**
 * 获取问题清单的展示列表
 * @param {undefined}
 * @returns {undefined}
 */
const getEventProblemList = () => {
  const target = toRaw(dataModel)?.records;
  if (!target) return;
  dataList.value = [];
  target.forEach((feild, pos) => {
    dataList.value.push({
      index: pos + 1,
      eventResponsibleUnitName: feild.eventResponsibleUnitCodeName,
      eventSourceName: feild.eventSourceName,
      adnm: feild.adnm,
      rchnm: feild.rchnm,
      eventTypeName: feild.eventTypeName,
      eventGradeName: feild.eventGradeName,
      occurTime: moment(feild.occurTime).format("YYYY-MM-DD"),
      status: feild.eventStatusName,
    });
  });
};

// 获取注入的时间区间
let dateRange = inject("dateRange");

// 监测查询时间
watch(
  () => dateRange,
  async (dateRange) => {
    console.log("dateRange", dateRange);
    // 先加载一次数据
    dataModel = await getEventQuestionModel({
      ...dateRange.value,
    });
    getEventProblemList();
  },
  {
    immediate: true,
    deep: true,
  }
);

// 问题清单定时器,没3分钟更新一次
let timer = null;

onBeforeMount(async () => {
  //每3分钟刷新数据
  timer = setInterval(async () => {
    dataModel = await getEventQuestionModel({
      ...dateRange.value,
    });
    getEventProblemList();
    console.log(dataModel, dataList);
  }, 3 * 60 * 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
  timer = null;
});
</script>

<style lang="less" scoped>
// 头部信息
.problem-list {
  width: 100%;
  height: 100%;
  &-header {
    height: 61px;
    width: 1039px;
    margin: 0 auto;
    background: url(@/assets/images/problem-list-header-bg.png) no-repeat center
      bottom;

    .shake-hands {
      display: flex;
      align-items: center;
      height: 38px;
      width: 622px;
      padding-top: 6px;
      box-sizing: border-box;
      background: url(@/assets/images/problem-list-title.png) no-repeat center
        top;
      margin: 0 auto;
      .title {
        color: #fff;
        font-size: 24px;
        width: 322px;
        font-family: YOUSHEBIAOTIHEI;
      }
      .custom-select-wrapper,
      .operator-wrapper {
        width: 149px;
      }
      .custom-select-wrapper {
        display: flex;
        justify-content: flex-end;
        padding-right: 25px;
        box-sizing: border-box;
      }
      .operator {
        display: flex;
        align-items: center;
        margin-left: 20px;
        cursor: pointer;
        & > i {
          width: 12px;
          height: 7px;
          background: url(@/assets/images/custom-select-arrow-down.png);
          display: block;
          transition: transform var(--el-transition-duration);
          transform: rotateZ(180deg);
          &.is-reverse {
            transform: rotateZ(0deg);
          }
        }
        & > span {
          color: #c4f0ff;
          font-size: 20px;
          font-family: YOUSHEBIAOTIHEI;
          padding-left: 11px;
        }
      }
    }
  }
}

// 下拉框
.custom-select {
  --el-input-border: transparent;
  --el-select-input-focus-border-color: transparent;
  --el-select-input-border-color: transparent;
  --el-select-border-color-hover: transparent;
  --el-select-border-color: transparent;
  background-image: url(@/assets/images/custom-select-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  height: 24px;
  width: 81px;
  :deep(.el-input__inner) {
    background-color: transparent;
    padding-left: 5px;
    height: 24px;
    font-size: 14px;
    &:focus-visible {
      border: none;
      outline: none;
    }
    &::-webkit-input-placeholder {
      color: #c4f0ff;
    }
    &::-moz-placeholder {
      color: #c4f0ff;
    }
    &::-ms-input-placeholder {
      color: #c4f0ff;
    }
  }
  :deep(.el-input__wrapper) {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
    padding-left: 15px;
    padding-right: 10px;
  }
  :deep(.el-select__caret.el-icon) {
    width: 12px;
    height: 7px !important;
    background: url(@/assets/images/custom-select-arrow-down.png);
    display: block;
    & > svg {
      display: none;
    }
  }
}

// 列表
.problem-list-container {
  width: 785px;
  margin: 0 auto;
  .table-header {
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    height: 30px;
    width: 100%;
  }
  .table-body {
    font-size: 14px;
    color: #8ac0e0;
    height: 150px;
    overflow: hidden;
  }
  .table-row {
    display: flex;
    height: 30px;
    align-items: center;
    width: 100%;
    &.stripe {
      background: rgba(0, 0, 0, 0.2);
    }
  }
  .text-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
  }
  .table-header > div:nth-child(1),
  .table-row > div:nth-child(1) {
    width: 60px;
  }
  .table-header > div:nth-child(2),
  .table-row > div:nth-child(2) {
    width: 120px;
    .text-ellipsis;
  }
  .table-header > div:nth-child(3),
  .table-row > div:nth-child(3) {
    width: 80px;
  }
  .table-header > div:nth-child(4),
  .table-row > div:nth-child(4) {
    width: 90px;
    .text-ellipsis;
  }
  .table-header > div:nth-child(5),
  .table-row > div:nth-child(5) {
    width: 140px;
    .text-ellipsis;
  }
  .table-header > div:nth-child(6),
  .table-row > div:nth-child(6) {
    width: 70px;
    .text-ellipsis;
  }
  .table-header > div:nth-child(7),
  .table-row > div:nth-child(7) {
    width: 100px;
  }
  .table-header > div:nth-child(8),
  .table-row > div:nth-child(8) {
    width: 100px;
  }
  // .table-header > div:nth-child(9),
  // .table-row > div:nth-child(9) {
  //   width: 100px;
  //   .text-ellipsis;
  // }
}

.one-line {
  white-space: nowrap;
  // text-overflow: ellipsis;
  // overflow: hidden;
}

.more-problem.el-button.is-link {
  padding-top: 6px;
  color: #c4f0ff;
  font-size: 20px;
  font-family: YOUSHEBIAOTIHEI;
}
</style>
