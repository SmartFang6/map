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
        <div class="operator-wrapper">
          <div class="operator" @click="onShowMore">
            <span class="marright">更多</span>
          </div>
        </div>
        <div class="title">
          <p>问题清单</p>
          <!-- <i class="icon-zoom" @click="onShowMore"></i> -->
        </div>
        <div class="custom-select-wrapper">
          <!--
          <el-select
            v-if="!collapsed"
            placeholder="全部"
            class="custom-select"
          />
          -->
          <div class="operator" @click="onPanelTrigger">
            <i :class="{ icon: true, 'is-reverse': collapsed }" />
            <span>{{ collapsed ? "展开" : "收起" }}</span>
          </div>
        </div>
        <!-- <div class="title">问题清单</div>
        <div class="operator-wrapper">
          <div class="operator" @click="onShowMore">
            <span>更多</span>
          </div>
        </div> -->
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
      <div class="table-body" v-if="dataList.length > 0">
        <SeamlessScroll :list="dataList" @clicked="handleProble">
          <div>
            <div
              v-for="row in dataList"
              :key="row.index"
              :class="{ 'table-row': true, stripe: row.index % 2 !== 0 }"
              :data-id="row.id"
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
              <el-tooltip
                :content="row.adnm"
                effect="dark"
                placement="top-start"
              >
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
              <div
                :style="
                  'color: ' + (row.eventGrade === '3' ? '#00dcf0' : '#ff8300')
                "
              >
                {{ row.eventGradeName }}
              </div>
              <div>{{ row.occurTime }}</div>
              <el-tooltip
                :content="row.status"
                effect="dark"
                placement="top-start"
              >
                <div
                  class="one-line"
                  :style="
                    'color: ' +
                    (row.eventStatus === '1' ? '#ffc025' : '#00dcf0')
                  "
                >
                  {{ row.status }}
                </div>
              </el-tooltip>
            </div>
          </div>
        </SeamlessScroll>
      </div>
      <el-empty
        v-else
        description="暂无数据"
        :image-size="80"
        class="dc-empty"
      />
    </div>
    <!-- 问题列表更多弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      custom-class="problem-dialog"
      width="70%"
      append-to-body
      top="10vh"
    >
      <template #header>
        <div class="pop-title">
          <span>问题清单</span>
        </div>
      </template>
      <TableMore ref="TableMoreRef" />
    </el-dialog>
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
} from "vue";
import { ElTooltip } from "element-plus";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/tooltip/style/css";
import moment from "moment";
// import { getEventQuestionList } from "@/apis/cockpitEventStats"; // 问题列表接口(旧)
import { getEventStatReportProblemList } from "@/apis/cockpitEventStats"; // 问题列表接口(新)
import TableMore from "./TableMore/index.vue";

const store = useStore();

// 监听父组件传递的查询参数
const props = defineProps({
  search: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["select"]);
const handleProble = (e) => {
  emits("select", e);
};
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
      adcd: store?.state?.userInfo?.adminDivCode || "",
      code: "",
      startTime: "2021-07-24 18:29:29",
      endTime: "2022-08-24 18:29:29",
      searchText: "",
      pageNo: 1,
      pageSize: 20,
    },
    queryParam
  );
  // return await getEventQuestionList(param);
  return await getEventStatReportProblemList(param);
};

// 打开更多弹窗
let dialogVisible = ref(false);
function onShowMore() {
  dialogVisible.value = true;
}

/**
 * 获取问题清单的展示列表
 * @param {undefined}
 * @returns {undefined}
 */
const getEventProblemList = () => {
  const target = toRaw(dataModel);
  dataList.value = target?.map((item, index) => {
    return {
      ...item,
      index: index + 1,
      eventResponsibleUnitName: item.eventResponsibleUnitCodeName,
      eventSourceName: item.eventSourceName,
      adnm: item.adnm,
      rchnm: item.rchnm,
      eventTypeName: item.eventTypeName,
      eventGrade: item.eventGrade,
      eventGradeName: item.eventGradeName,
      occurTime: moment(item.occurTime).format("YYYY-MM-DD"),
      status: item.eventStatusName,
      eventStatus: item.eventStatus,
    };
  });
};

// 获取注入的时间区间
let dateRange = computed(() => store?.state?.dateRange);
// 定时器的查询参数
const searchType = ref(null);

// 监测查询时间
watch(
  () => [dateRange.value, props.search],
  async (searchList) => {
    // 先加载一次数据
    dataModel = await getEventQuestionModel({
      ...searchList[0],
      ...searchList[1],
    });
    getEventProblemList();
    searchType.value = searchList[1] || {};
  },
  {
    deep: true,
  }
  // {
  //   immediate: true,
  // }
);

// 问题清单定时器,没3分钟更新一次
let timer = null;

onBeforeMount(async () => {
  //每3分钟刷新数据
  timer = setInterval(async () => {
    dataModel = await getEventQuestionModel({
      ...dateRange.value,
      ...searchType.value,
    });
    getEventProblemList();
  }, 3 * 60 * 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
  timer = null;
});
</script>

<style lang="less">
body .problem-dialog {
  & {
    background-color: rgba(#19385b, 0.8);
    color: white;
    border: 1px solid #64d2f7;
    z-index: 9999;
  }

  :deep(.el-dialog__headerbtn .el-dialog__close) {
    svg {
      display: none;
    }
    background: url(@/assets/images/close-icon.png);
    background-size: 100% 100%;
  }
}
</style>
<style lang="less" scoped>
// 头部信息
.problem-list {
  width: 100%;
  height: 258px;
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
      background-size: 100% 100%;
      margin: 0 auto;
      .title {
        display: flex;
        align-items: center;
        width: 322px;
        font-size: 24px;
        padding-left: 117px;
        font-family: YOUSHEBIAOTIHEI;
        color: #fff;
      }
      .custom-select-wrapper,
      .operator-wrapper {
        display: flex;
        width: 149px;
        margin-top: 6px;
        justify-content: flex-end;
      }
      .custom-select-wrapper {
        display: flex;
        justify-content: flex-start;
        padding-right: 25px;
        box-sizing: border-box;
      }
      .operator {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: 3px;
        cursor: pointer;
        & > i {
          width: 12px;
          height: 7px;
          background: url(@/assets/images/custom-select-arrow-down.png)
            no-repeat;
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
        & > span.problem-button-text {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #c4f0ff;
        }
      }
      .problem-button-all {
        width: 81px;
        height: 24px;
        margin-right: 8px;
        background: url(@/assets/images/problem-list-btn-all.png) no-repeat;
        background-size: 100% 100%;
      }
      .icon-arrow-down {
        margin: 0 9px 0 11px;
      }
      .icon-zoom {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 47px;
        background: url(@/assets/images/icon-zoom.png) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
      .problem-dropdown {
        display: flex;
        width: 81px;
        height: 24px;
        margin-right: 8px;
        background: url(@/assets/images/problem-list-btn-all.png) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        .dropdown-inner {
          display: flex;
          align-items: center;
          width: 81px;
          box-sizing: border-box;
          justify-content: flex-end;
          padding: 0;
          color: #c4f0ff;
          font-size: 14px;
          & > span {
            margin-right: 10px;
          }
          & > img {
            margin-right: 8px;
          }
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
    display: flex;
    align-items: center;
    width: 100%;
    height: 32px;
    border-bottom: 1px solid #01fffc;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    text-align: left;
    color: #ffffff;
  }
  .table-body {
    height: 150px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
    overflow: hidden;
  }
  .table-row {
    display: flex;
    width: 100%;
    height: 30px;
    align-items: center;
    text-align: left;
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
    width: 45px;
    margin-left: 14px;
  }
  .table-row > div:nth-child(1) {
    text-indent: 2px;
  }
  .table-header > div:nth-child(2),
  .table-row > div:nth-child(2) {
    width: 110px;
    margin-left: 10px;
    .text-ellipsis;
  }
  .table-row > div:nth-child(2) {
    color: #00dcf0;
  }
  .table-header > div:nth-child(3),
  .table-row > div:nth-child(3) {
    width: 76px;
    margin-left: 10px;
    .text-ellipsis;
  }
  .table-header > div:nth-child(4),
  .table-row > div:nth-child(4) {
    width: 75px;
    margin-left: 10px;
    .text-ellipsis;
  }
  .table-row > div:nth-child(4) {
    color: #00dcf0;
  }
  .table-header > div:nth-child(5),
  .table-row > div:nth-child(5) {
    width: 124px;
    margin-left: 10px;
    .text-ellipsis;
  }
  .table-header > div:nth-child(6),
  .table-row > div:nth-child(6) {
    width: 60px;
    margin-left: 10px;
    .text-ellipsis;
  }
  .table-header > div:nth-child(7),
  .table-row > div:nth-child(7) {
    width: 84px;
    margin-left: 10px;
  }
  .table-header > div:nth-child(8),
  .table-row > div:nth-child(8) {
    width: 120px;
    margin-left: 12px;
    .text-ellipsis;
  }
}

.one-line {
  white-space: nowrap;
  // text-overflow: ellipsis;
  // overflow: hidden;
}

.pop-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #0adbe0;
  font-size: 24px;
}

.marright {
  margin-right: 3px;
}
</style>
