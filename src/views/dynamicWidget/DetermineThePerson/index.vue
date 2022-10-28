<!--****************************************
 * 事件定人
 *
 * founder: wangwg
 * Date:  10 2022/10/24
 *****************************************-->
<template>
  <div class="person-container">
    <div class="summary-wrap">
      <li class="summary-item item-unit" v-if="unitSum" @click="deptTags = 0">
        <span>{{ unitSum?.sum + unitSum?.meter }}</span>
        <span>{{ unitSum?.content }}</span>
      </li>
      <li class="summary-item item-town" v-if="townSum" @click="deptTags = 1">
        <span>{{ townSum?.sum + townSum?.meter }}</span>
        <span>{{ townSum?.content }}</span>
      </li>
    </div>
    <div class="list-content">
      <div class="table-header">
        <div>问题名称</div>
        <div v-if="deptTags === 0">责任单位</div>
        <div v-if="deptTags === 1">责任乡镇</div>
        <div>责任人</div>
        <div>状态</div>
      </div>
      <div class="table-body" v-if="list && list.length > 0">
        <SeamlessScroll :list="list">
          <div>
            <div
              v-for="(item, index) in list"
              :key="index"
              :class="{ 'table-row': true, stripe: index % 2 !== 0 }"
              :data-id="index"
            >
              <el-tooltip
                :content="item.eventDescription"
                effect="dark"
                placement="top-start"
              >
                <div :title="item.eventDescription">
                  {{ item.eventDescription }}
                </div>
              </el-tooltip>
              <el-tooltip
                :content="item.eventResponsibleUnit"
                effect="dark"
                placement="top-start"
              >
                <div :title="item.eventResponsibleUnit">
                  {{ item.eventResponsibleUnit }}
                </div>
              </el-tooltip>
              <!-- <el-tooltip
                :content="item.village"
                effect="dark"
                placement="top-start"
              >
                <div :title="item.village">{{ item.village }}</div>
              </el-tooltip> -->
              <el-tooltip
                :content="item.linkPerson"
                effect="dark"
                placement="top-start"
              >
                <div :title="item.linkPerson">{{ item.linkPerson }}</div>
              </el-tooltip>
              <el-tooltip
                :content="item.eventNewStatus"
                effect="dark"
                placement="top-start"
              >
                <div :title="item.eventNewStatus">
                  {{ item.eventNewStatus }}
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
  </div>
</template>

<script setup>
/**
 事件定人
 **/
import "element-plus/es/components/tooltip/style/css";
import { ElTooltip } from "element-plus";
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { getEventStatDistributePerson } from "@/apis/home";

// 左侧注入数据
const leftData = ref(null);

// 责任部门标签, 0: 责任单位, 1: 责任乡镇
const deptTags = ref(0);

// 获取事件定人的后台数据
function getLeftData(dateRange) {
  if (!dateRange) return;
  const params = {
    ...dateRange,
  };
  // 获取问题派发结果(定人)的数据
  getEventStatDistributePerson(params).then((res) => {
    // 筛选数据内容
    if (!res?.eventStatEventResponsiblePersonVO) return;
    leftData.value = res?.eventStatEventResponsiblePersonVO;
  });
}

// 责任单位的数据
const unitSum = computed(() => {
  const result = {
    sum: 0,
    meter: "个",
    content: "责任单位",
  };
  if (leftData.value?.unitNum) {
    result.sum = leftData.value?.unitNum;
  }
  return result;
});

// 责任乡镇的数据
const townSum = computed(() => {
  const result = {
    sum: 0,
    meter: "个",
    content: "责任乡镇",
  };
  if (leftData.value?.townshipNum) {
    result.sum = leftData.value?.townshipNum;
  }
  return result;
});

// 事件定人的数据列表
const list = computed(() => {
  const result =
    deptTags.value === 0
      ? leftData.value?.unitProblemList
      : leftData.value?.townshipProblemList;
  if (!result) {
    return [];
  }
  return result;
});

const store = useStore();

// 监听驾驶舱的日期间隔
watch(
  () => store?.state?.dateRange,
  (newVal, oldVal) => {
    const val = newVal || oldVal;
    getLeftData(val);
  },
  {
    immediate: true,
    deep: true,
  }
);

// 首次加载获取数据
getLeftData(store?.state?.dateRange);
</script>

<style lang="less" scoped>
.person-container {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding-top: 2px;

  .summary-wrap {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    .summary-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: MicrosoftYaHei;
      width: 212px;
      height: 60px;
      margin-left: 24px;
      background: url(@/assets/images/custom-perform-bg.png) no-repeat;
      background-size: 100% 100%;
      color: #ffffff;
      cursor: pointer;
    }
    .summary-item:first-child {
      margin-left: 0;
    }
  }

  .list-content {
    width: 100%;
    height: 215px;
    background-color: rgba(1, 2, 5, 0.1);
    box-shadow: inset 0 2px 1px 0 #002480;
    box-sizing: border-box;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: #7ed5f1;
    padding: 0 15px;
    margin-left: 8px;
    overflow: hidden;
    .table-header {
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .table-body {
      height: 168px;
      width: 100%;
      overflow: hidden;
    }
    .table-row {
      display: flex;
      height: 32px;
      margin-top: 2px;
      align-items: center;
      justify-content: space-around;
      color: #ffffff;
      &.stripe {
        background-color: rgba(3, 55, 138, 0.2);
      }
    }
    .table-row:first-child {
      margin: 0;
    }
    .table-header > div,
    .table-row > div {
      text-align: left;
      padding-left: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
    }
    .table-header > div:nth-child(1),
    .table-row > div:nth-child(1) {
      width: 148px;
      padding-left: 0;
    }
    .table-header > div:nth-child(2),
    .table-row > div:nth-child(2) {
      width: 136px;
    }
    .table-header > div:nth-child(3),
    .table-row > div:nth-child(3) {
      width: 98px;
    }
    .table-header > div:nth-child(4),
    .table-row > div:nth-child(4) {
      width: 98px;
    }
    .table-header > div:nth-child(5),
    .table-row > div:nth-child(5) {
      width: 98px;
    }
  }
}
</style>
