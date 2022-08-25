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
      <div>名称</div>
      <!-- <div>部门/乡镇名称</div> -->
      <!-- <div>行政区划</div> -->
      <div v-if="type === 1">问题数</div>
      <div v-if="type === 1">销号率</div>
      <div v-if="type === 2">分数</div>
    </div>
    <div class="table-body">
      <vue-seamless-scroll :data="dataList" :class-option="{ step: 0.3 }">
        <div
          v-for="item in dataList"
          :key="item.index"
          :class="{ 'table-row': true, stripe: item.index % 2 !== 0 }"
        >
          <div>{{ item.index }}</div>
          <el-tooltip :content="item.org" effect="dark" placement="top-start">
            <div>{{ item.org }}</div>
          </el-tooltip>
          <!-- <el-tooltip
            :content="item.content"
            effect="dark"
            placement="top-start"
          >
            <div>{{ item.content }}</div>
          </el-tooltip> -->
          <div v-if="type === 1">{{ item.count }}</div>
          <div v-if="type === 1">{{ item.rate }}</div>
          <div v-if="type === 2">{{ item.point }}</div>
        </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script setup>
import "element-plus/es/components/tooltip/style/css";
import { ElTooltip } from "element-plus";
import { ref, watch, nextTick } from "vue";
// import VueSeamlessScroll from "vue-seamless-scroll/src/components/myClass";

const dataList = ref([]);

// 获取父组件传递的列表数据
const props = defineProps({
  dataModel: {
    type: Array,
    default: () => [],
  },
  type: {
    type: Number,
    default: 1,
  },
});

watch(
  () => [props.dataModel, props.type],
  () => {
    nextTick(() => {
      console.log(props.dataModel, props.type);
      if (!props.dataModel || props.dataModel.length <= 0) {
        dataList.value = [];
        return;
      }
      dataList.value = [];
      props.dataModel.forEach((item) => {
        if (props.type === 1) {
          dataList.value.push({
            index: item?.rankNo,
            org: item?.eventResponsibleUnitCodeName,
            content: item?.content || "",
            count: item?.unitEventNum,
            rate: (item?.completedRate ? item?.completedRate * 100 : 0) + "%",
          });
        } else {
          dataList.value.push({
            index: item?.rankNo,
            org: item?.eventResponsibleUnitCodeName,
            content: item?.content || "",
            count: item?.point,
            point: item?.point,
            rate: "100%",
          });
        }
      });
      console.log("perform dataList", dataList);
    });
  },
  {
    immediate: true,
    deep: true,
  }
);

// 示例数据
// for (let i = 1; i < 10; i++) {
//   dataList.push({
//     index: i,
//     org: `${i}具体名称展示具体名称展示`,
//     content: `${i}具体内容`,
//     count: 100,
//     rate: "50%",
//   });
// }
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
    justify-content: space-between;
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
    justify-content: space-between;
    &.stripe {
      background-color: rgba(11, 32, 59, 0.8);
    }
  }
  .table-header > div,
  .table-row > div {
    text-align: center;
    padding-left: 10px;
  }
  .table-header > div:nth-child(1),
  .table-row > div:nth-child(1) {
    width: 80px;
    text-align: center;
    padding-left: 0px;
  }
  .table-header > div:nth-child(2),
  .table-row > div:nth-child(2) {
    width: 180px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
  }
  .table-header > div:nth-child(3),
  .table-row > div:nth-child(3) {
    width: 100px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
  }
  .table-header > div:nth-child(4),
  .table-row > div:nth-child(4) {
    width: 100px;
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
