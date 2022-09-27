<!--------------------------------------------
 ¦ 处置绩效下面的列表
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-17 09:11:23
 ¦ Dependencies: el-tooltip, vue3-seamless-scroll
 ¦------------------------------------------->

<template>
  <div class="performance-table">
    <!--#region '销号率'的表格内容-->
    <template v-if="type === 1">
      <div class="table-header">
        <div>排名</div>
        <div>名称</div>
        <!-- <div>部门/乡镇名称</div> -->
        <!-- <div>行政区划</div> -->
        <div>问题数</div>
        <div>已办结</div>
        <div>销号率</div>
      </div>
      <div class="table-body" v-if="dataList.length > 0">
        <SeamlessScroll :list="dataList">
          <div>
            <div
              v-for="row in dataList"
              :key="row.index"
              :class="{ 'table-row': true, stripe: row.index % 2 !== 0 }"
              :data-id="row.index"
            >
              <div>{{ row.index }}</div>
              <el-tooltip
                :content="row.org"
                effect="dark"
                placement="top-start"
              >
                <div>{{ row.org }}</div>
              </el-tooltip>
              <div>{{ row.count }}</div>
              <div>{{ row.completed }}</div>
              <div>{{ row.rate }}</div>
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
    </template>
    <!--#endregion-->

    <!--#region '考核'的表格内容-->
    <template v-if="type === 2">
      <div class="table-header">
        <div>排名</div>
        <div>名称</div>
        <!-- <div>部门/乡镇名称</div> -->
        <!-- <div>行政区划</div> -->
        <div>分数</div>
      </div>
      <div class="table-body">
        <SeamlessScroll :list="dataList">
          <div>
            <div
              v-for="row in dataList"
              :key="row.index"
              :class="{ 'table-row': true, stripe: row.index % 2 !== 0 }"
            >
              <div>{{ row.index }}</div>
              <el-tooltip
                :content="row.org"
                effect="dark"
                placement="top-start"
              >
                <div>{{ row.org }}</div>
              </el-tooltip>
              <div>{{ row.point }}</div>
            </div>
          </div>
        </SeamlessScroll>
      </div>
    </template>
    <!--#endregion-->
  </div>
</template>

<script setup>
import "element-plus/es/components/tooltip/style/css";
import { ElTooltip } from "element-plus";
import { ref, watch } from "vue";

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
    if (!props.dataModel || props.dataModel.length <= 0) {
      dataList.value = [];
      return;
    }
    dataList.value = [];
    props.dataModel.forEach((item, rankNum) => {
      if (props.type === 1) {
        dataList.value.push({
          index: rankNum + 1,
          org: item?.eventResponsibleUnitCodeName,
          content: item?.content || "",
          count: item?.unitEventNum || 0,
          completed: item?.unitCompletedNum || 0,
          rate:
            (item?.completedRate ? Number(`${item?.completedRate}e${2}`) : 0) +
            "%",
        });
      } else {
        dataList.value.push({
          index: rankNum + 1,
          org: item?.eventResponsibleUnitCodeName,
          content: item?.content || "",
          point: item?.point,
        });
      }
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
  height: 215px;
  background-color: rgba(1, 2, 5, 0.1);
  box-shadow: inset 0 2px 1px 0 #002480;
  box-sizing: border-box;
  font-size: 16px;
  font-family: MicrosoftYaHei;
  color: #7ed5f1;
  padding: 0 20px;
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
  }
  .table-header > div:nth-child(1),
  .table-row > div:nth-child(1) {
    width: 56px;
    text-align: center;
    padding-left: 0;
  }
  .table-header > div:nth-child(2),
  .table-row > div:nth-child(2) {
    width: 148px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
  }
  .table-row > div:nth-child(2) {
    color: #ffffff;
  }
  .table-header > div:nth-child(3),
  .table-row > div:nth-child(3) {
    width: 86px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
  }
  .table-row > div:nth-child(3) {
    color: #00dcf0;
  }
  .table-header > div:nth-child(4),
  .table-row > div:nth-child(4) {
    width: 86px;
  }
  .table-row > div:nth-child(4) {
    color: #00dcf0;
  }
  .table-header > div:nth-child(5),
  .table-row > div:nth-child(5) {
    width: 86px;
  }
  .table-row > div:nth-child(5) {
    color: #00dcf0;
  }
}
</style>
