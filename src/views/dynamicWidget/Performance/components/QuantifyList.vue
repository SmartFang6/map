<!-- 处置绩效-量化列表组件 -->

<template>
  <!--#region 量化列表的内容区-->
  <div class="quantify-list" v-if="dataList && dataList?.length > 0">
    <!-- <SeamlessScroll :data-list="dataList">
      <template #default="{ row }">
        <div class="list-wrap" :key="row.id">
          <el-tooltip :content="row.name" effect="dark" placement="top-start">
            <p class="content">
              {{ row.name }}
            </p>
          </el-tooltip>
          <span class="unit">
            <strong>{{ row.num }}</strong>
            {{ row.unit }}
          </span>
        </div>
      </template>
    </SeamlessScroll> -->
    <div class="list-wrap" v-for="row in dataList" :key="row.id">
      <el-tooltip :content="row.name" effect="dark" placement="top-start">
        <p class="content">
          {{ row.name }}
        </p>
      </el-tooltip>
      <span class="unit">
        <strong>{{ row.num }}</strong>
        {{ row.unit }}
      </span>
    </div>
  </div>
  <!--#endregion-->

  <!--#region 列表的空状态内容-->
  <el-empty v-else description="暂无数据" :image-size="80" class="dc-empty" />
  <!--#endregion-->
</template>

<script setup>
import { reactive } from "vue";
// import SeamlessScroll from "@/components/SeamlessScroll";

// 组件的数据源
const dataList = reactive([
  {
    id: 1001,
    name: "清理非法占用河道岸线",
    num: "12",
    unit: "公里",
  },
  {
    id: 1001,
    name: "清理非法采砂点",
    num: "27",
    unit: "个",
  },
  {
    id: 1001,
    name: "清理非法采砂石量清理非法占用河道岸线清理非法占用河道岸线清理非法占用河道岸线清理非法占用河道岸线",
    num: "234",
    unit: "立方米",
  },
  {
    id: 1001,
    name: "清理非法占用河道岸线",
    num: "31",
    unit: "公里",
  },
  {
    id: 1001,
    name: "清理非法占用河道岸线",
    num: "17",
    unit: "公里",
  },
  {
    id: 1001,
    name: "清理非法占用河道岸线",
    num: "17",
    unit: "公里",
  },
  {
    id: 1001,
    name: "清理非法占用河道岸线",
    num: "17",
    unit: "公里",
  },
  {
    id: 1001,
    name: "清理非法占用河道岸线",
    num: "17",
    unit: "公里",
  },
]);
</script>

<style lang="less" scoped>
.quantify-list {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 250px;
  padding: 8px 10px 0 16px;
  box-sizing: border-box;
  overflow: hidden;

  .list-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: MicrosoftYaHei;
    width: 216px;
    height: 54px;
    background: url(@/assets/images/custom-perform-bg.png) no-repeat;
    background-size: cover;
    margin-bottom: 8px;

    .icon-diamond {
      width: 18px;
      height: 17px;
      margin-left: 10px;
      color: #fff;
      background: url(@/assets/images/icon-diamond.png) no-repeat;
      background-size: cover;
    }

    .content {
      width: 100%;
      padding: 0 10px;
      font-size: 16px;
      text-align: center;
      color: #ffffff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .unit {
      font-size: 14px;
      white-space: nowrap;
      color: #7fc2e2;
      & > strong {
        font-size: 18px;
        font-weight: 600;
        color: #60d0ef;
      }
    }
  }

  .list-wrap:nth-child(2n) {
    margin-left: 24px;
  }
}
</style>
