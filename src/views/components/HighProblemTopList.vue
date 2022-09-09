<!--------------------------------------------
 ¦ 事件高发排名
 ¦ 文件描述
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-16 16:49:02
 ¦------------------------------------------->

<template>
  <div class="high-list-wrapper">
    <Title title="事件高发排名">
      <template #tabs>
        <el-tabs
          v-model="tabActive"
          type="card"
          @tab-click="onHandleTypeOrAreaClick"
        >
          <el-tab-pane class="tab-item" label="类型" name="type"></el-tab-pane>
          <el-tab-pane label="地区" name="area"></el-tab-pane>
        </el-tabs>
      </template>
    </Title>
    <div class="high-list">
      <div class="high-list-container">
        <vue-seamless-scroll :data="dataList">
          <div
            v-for="item in dataList"
            :key="item.index"
            class="high-list-item"
          >
            <div class="index">{{ item.index }}</div>
            <div class="item-content">
              <div class="name">
                <span class="type-desc">{{ item.name }}</span>
                <span>{{ item.value }}/{{ item.rate + "%" }}</span>
              </div>
              <div class="progress-outer">
                <div
                  class="progress-inner"
                  :style="{ width: `${item.rate}%` }"
                />
              </div>
            </div>
          </div>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRaw, inject, watch } from "vue";
import { getEventIncidenceRank } from "@/apis/cockpitEventStats";

// 事件高发排名选项卡
let tabActive = ref("type");

// 事件高发排名列表
let dataList = ref(null);

// 示例数据
// for (let i = 1; i <= 5; i++) {
//   dataList.push({
//     index: i,
//     name: "乡镇名称展示/企业名称展示",
//     value: "23/90%",
//     rate: 30,
//   });
// }

// 问题排行数据源
let dataModel = ref(null);

/**
 * 获取事件高发排名 (按地区、类型)
 * @param {any} queryParam
 * @returns {Object}
 */
const getEventRankModel = async (queryParam) => {
  const param = Object.assign(
    {
      adcd: "",
      code: "1",
      startTime: "2021-07-24 18:29:29",
      endTime: "2022-08-24 18:29:29",
      searchText: "",
      pageNo: 1,
      pageSize: 10,
    },
    queryParam
  );
  return await getEventIncidenceRank(param);
};

/**
 * 类型或地区的标签页点击切换事件
 * @param {pane} context
 * @returns {undefined}
 */
const onHandleTypeOrAreaClick = (context) => {
  toggleTypeOrAreaList(context.paneName);
};

/**
 * 切换类型或地区的数据列表
 * @param {String} keyword
 * @returns {undefined}
 */
const toggleTypeOrAreaList = (keyword) => {
  const model = toRaw(dataModel);
  let target =
    keyword === "type"
      ? model?.eventStatHighIncidenceRankCategoryCodeList
      : model?.eventStatHighIncidenceRankRegionList;
  if (!target) return;
  dataList.value = [];
  target?.forEach((field, index) => {
    if (keyword === "type") {
      dataList.value.push({
        index: index + 1,
        name: field.eventCategoryName,
        value: field.eventCategoryNum,
        rate: field.completedRate ? field.completedRate * 100 : 0,
        code: field.fourDisorderType,
      });
    } else {
      dataList.value.push({
        index: index + 1,
        name: field.adnm,
        value: field.adcdNum,
        rate: field.completedRate ? field.completedRate * 100 : 0,
        code: field.adcd,
      });
    }
  });
};

// import VueSeamlessScroll from "vue-seamless-scroll/src/components/myClass";

// 获取注入的时间区间
let dateRange = inject("dateRange");

// 监测查询时间
watch(
  () => dateRange,
  async (dateRange) => {
    console.log("HIGH dateRange", dateRange);
    // 先加载一次数据
    dataModel = await getEventRankModel({
      ...dateRange.value,
    });
    toggleTypeOrAreaList(tabActive.value);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="less" scoped>
.high-list {
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
    .name {
      display: flex;
      justify-content: space-between;
      padding-bottom: 3px;
    }
  }

  .progress-outer {
    border-radius: 8px;
    height: 16px;
    background: rgba(255, 255, 255, 0.2);
  }

  .progress-inner {
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

.high-list-wrapper {
  height: 302px;
  :deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
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
}
</style>
