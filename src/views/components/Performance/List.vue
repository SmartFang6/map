<!--------------------------------------------
 ¦ 处置绩效下面的列表
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-17 09:11:23
 ¦ Dependencies: el-tooltip, vue3-seamless-scroll
 ¦------------------------------------------->

<template>
  <div class="performance-table">
    <div class="table-header">
      <div>排名</div>
      <div>部门/乡镇名称</div>
      <div>行政区划</div>
      <div>问题数</div>
      <div>消号率</div>
    </div>
    <div class="table-body">
      <vue-seamless-scroll :list="dataList" :hover="true" :step="1.3">
        <div
          v-for="item in dataList"
          :key="item.index"
          :class="{ 'table-row': true, stripe: item.index % 2 !== 0 }"
        >
          <div>{{ item.index }}</div>
          <el-tooltip :content="item.org" effect="dark" placement="top-start">
            <div>{{ item.org }}</div>
          </el-tooltip>
          <el-tooltip
            :content="item.content"
            effect="dark"
            placement="top-start"
          >
            <div>{{ item.content }}</div>
          </el-tooltip>
          <div>{{ item.count }}</div>
          <div>{{ item.rate }}</div>
        </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script setup>
import "element-plus/es/components/tooltip/style/css";
import { ElTooltip } from "element-plus";
import { reactive } from "vue";
// import { Vue3SeamlessScroll as VueSeamlessScroll } from "vue3-seamless-scroll";

const dataList = reactive([]);
for (let i = 1; i < 100; i++) {
  dataList.push({
    index: i,
    org: `${i}具体名称展示具体名称展示`,
    content: `${i}具体内容`,
    count: 100,
    rate: "50%",
  });
}
</script>

<style lang="less" scoped>
.performance-table {
  width: 488px;
  height: 229px;
  background-image: url("@/assets/images/performance-list.png");
  background-size: 100%;
  box-sizing: border-box;
  color: #fff;
  font-size: 16px;
  padding: 0 10px 9px;
  overflow: hidden;
  .table-header {
    height: 49px;
    display: flex;
    align-items: center;
  }
  .table-body {
    height: 160px;
    width: 100%;
    overflow: hidden;
  }
  .table-row {
    display: flex;
    height: 32px;
    align-items: center;
    &.stripe {
      background-color: rgba(11, 32, 59, 0.8);
    }
  }
  .table-header > div,
  .table-row > div {
    text-align: left;
    padding-left: 10px;
  }
  .table-header > div:nth-child(1),
  .table-row > div:nth-child(1) {
    width: 52px;
    text-align: center;
    padding-left: 0px;
  }
  .table-header > div:nth-child(2),
  .table-row > div:nth-child(2) {
    width: 124px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
  }
  .table-header > div:nth-child(3),
  .table-row > div:nth-child(3) {
    width: 115px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
  }
  .table-header > div:nth-child(4),
  .table-row > div:nth-child(4) {
    width: 105px;
  }
  .table-row > div:nth-child(4) {
    color: #00f5ff;
  }
  .table-header > div:nth-child(5),
  .table-row > div:nth-child(5) {
  }
  .table-row > div:nth-child(5) {
    color: #32da85;
  }
}
</style>
