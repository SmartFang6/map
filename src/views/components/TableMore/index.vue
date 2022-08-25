<template>
  <div class="table-data">
    <div class="pop-body">
      <!-- #region 等级统计数量-->
      <ul>
        <li>
          <span>全部</span
          ><span class="item-value" style="color: #fff">100</span
          ><span>个</span>
        </li>
        <li>
          <span>重大</span
          ><span class="item-value" style="color: #e35f5f">100</span
          ><span>个</span>
        </li>
        <li>
          <span>较严重</span
          ><span class="item-value" style="color: #ffb401">100</span
          ><span>个</span>
        </li>
        <li>
          <span>一般</span
          ><span class="item-value" style="color: #0adbe0">100</span
          ><span>个</span>
        </li>
      </ul>
      <!-- #endregion -->
      <!-- #region 查询 -->
      <el-form :model="searchFormData" inline>
        <el-form-item label="行政区域" prop="adcdSelected">
          <!-- <el-cascader
              v-model="searchFormData.adcdSelected"
              ref="adcdCascaderRef"
              :props="adcdCascaderProps"
              :options="adcdCascaderOptions"
              class="search-input"
            /> -->
        </el-form-item>
      </el-form>
      <!-- #endregion -->
      <!-- #region 列表 -->
      <el-table
        :data="tableData"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        max-height="58vh"
        stripe
      >
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="责任部门" prop="eventResponsibleUnitCodeName" />
        <el-table-column label="事件来源" prop="eventSourceName" />
        <el-table-column label="行政区域" prop="adnm" />
        <el-table-column label="所在河湖" prop="rchnm	" />
        <el-table-column label="事件类型" prop="eventTypeName" />
        <el-table-column label="事件等级" prop="eventGradeName" />
        <el-table-column label="发生时间" prop="occurTime" />
        <el-table-column label="上报人员" prop="reportUser" />
        <el-table-column label="状态" prop="eventStatusName" />
        <el-table-column label="操作" width="110">
          <template #default="{ row }">
            <el-button link type="primary" @click="onCheck(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- #endregion -->
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs } from "vue";
import { getEventQuestionList } from "@/apis/cockpitEventStats";
import store from "@/store";
let data = reactive({
  searchFormData: {
    adcdSelected: "",
  },
  tableData: [],
});
const { searchFormData, tableData } = toRefs(data);
// let tableData = ref([]);

// 获取数据
function getData() {
  const params = {
    adcd: store?.state?.userInfo?.adminDivCode || "",
    code: "",
    startTime: "2022-08-01 00:00:00",
    endTime: "2022-08-31 23:59:59",
    searchText: "",
    pageNo: 1,
    pageSize: 20,
  };
  getEventQuestionList(params)
    .then((res) => {
      console.log(res, "getEventQuestionList");
      // data.tableData = res.records;
    })
    .catch((err) => {
      console.log(err);
    });
}
getData();

data.tableData = [
  {
    eventResponsibleUnitCodeName: "测试1",
    eventSourceName: "ceshi",
  },
  {
    eventResponsibleUnitCodeName: "测试2",
    eventSourceName: "ceshi",
  },
];
// 查看详情
function onCheck(row) {
  console.log(row);
}

defineExpose({});
</script>

<style lang="less" scoped>
.table-data {
  .pop-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #0adbe0;
    font-size: 24px;
  }

  .pop-body {
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;

      li {
        width: 23%;
        line-height: 74px;
        background: url(@/assets/images/count-icon.png);
        background-size: 100% 100%;
        color: white;
        text-align: center;

        span {
          margin-right: 10px;
        }

        .item-value {
          font-size: 48px;
        }
      }
    }
  }
}
</style>
