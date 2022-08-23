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
          <el-select v-if="!collapsed" placeholder="全部" class="custom-select">
            <el-option value="1">111</el-option>
          </el-select>
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
        <div>排名</div>
        <div>责任部门</div>
        <div>事件来源</div>
        <div>行政区域</div>
        <div>所在河湖</div>
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
            <div>{{ row.eventResponsibleUnitName }}</div>
            <div>{{ row.eventSourceName }}</div>
            <div>{{ row.adnm }}</div>
            <div>{{ row.rchnm }}</div>
            <el-tooltip
              :content="row.eventTypeName"
              effect="dark"
              placement="top-start"
            >
              <div>{{ row.eventTypeName }}</div>
            </el-tooltip>
            <div>{{ row.eventGradeName }}</div>
            <div>{{ row.occurTime }}</div>
            <div>{{ row.status }}</div>
          </div>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, reactive } from "vue";
import { ElSelect, ElOption, ElTooltip } from "element-plus";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/tooltip/style/css";
// import VueSeamlessScroll from "vue-seamless-scroll/src/components/myClass";

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

// 数据列表
const dataList = reactive([]);
for (let i = 1; i < 10; i++) {
  dataList.push({
    index: i,
    eventResponsibleUnitName: `${i}农村农业局`,
    eventSourceName: "公众巡河",
    adnm: "莲花镇",
    rchnm: "曹娥江",
    eventTypeName: "擅自围垦湖泊用于养殖",
    eventGradeName: "较严重",
    occurTime: "2022-10-10",
    status: "逾期已处理",
  });
}
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
  }
  .table-header > div:nth-child(3),
  .table-row > div:nth-child(3) {
    width: 80px;
  }
  .table-header > div:nth-child(4),
  .table-row > div:nth-child(4) {
    width: 80px;
  }
  .table-header > div:nth-child(5),
  .table-row > div:nth-child(5) {
    width: 80px;
  }
  .table-header > div:nth-child(6),
  .table-row > div:nth-child(6) {
    width: 125px;
    .text-ellipsis;
  }
  .table-header > div:nth-child(7),
  .table-row > div:nth-child(7) {
    width: 80px;
  }
  .table-header > div:nth-child(8),
  .table-row > div:nth-child(8) {
    width: 80px;
  }
  .table-header > div:nth-child(9),
  .table-row > div:nth-child(9) {
    width: 80px;
  }
}
</style>
