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
      <el-form
        :model="searchFormData"
        ref="searchFormRef"
        inline
        class="search-form"
        size="small"
      >
        <el-form-item label="事件来源" prop="eventSource">
          <DictSelec
            v-model:selectValue="searchFormData.eventSource"
            dict-string="water_one_inspection:event_source"
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="行政区域" prop="adcdSelected">
          <el-cascader
            v-model="searchFormData.adcdSelected"
            ref="adcdCascaderRef"
            :props="adcdCascaderProps"
            :options="adcdCascaderOptions"
            class="search-input"
          />
        </el-form-item>
        <el-form-item label="事件等级" prop="eventGrade">
          <el-select v-model="searchFormData.eventGrade" placeholder="请选择">
            <el-option
              v-for="item in eventGradeOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="eventAcceptStatus">
          <el-select
            v-model="searchFormData.eventAcceptStatus"
            placeholder="请选择"
          >
            <el-option
              v-for="item in acceptStatusList"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="河湖名称" prop="searchText">
          <RchSelect
            v-model="searchFormData.searchTextValue"
            v-model:label="searchFormData.searchText"
            :adcd="ADMIN_DIV_CODE"
            size="small"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">查 询</el-button>
          <el-button type="warning" @click="onRest">重 置</el-button>
        </el-form-item>
      </el-form>
      <!-- #endregion -->
      <!-- #region 列表 -->
      <el-table
        :data="tableData"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        max-height="50vh"
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
import { reactive, toRefs, ref } from "vue";
import { getEventQuestionList } from "@/apis/cockpitEventStats";
import store from "@/store";
import DictSelec from "@/components/DictSelect/index.vue";
import { getListDistrict } from "@/apis/home.js";
import RchSelect from "@/components/RchSelect";

// 查询数据 ---start
const ADMIN_DIV_CODE = store?.state?.userInfo?.adminDivCode || ""; // 用户所处行政编码
// 行政区域
let adcdCascaderOptions = ref([]);
let rootAdcd = ADMIN_DIV_CODE;
let adcdCascaderProps = {
  label: "adnm",
  value: "adcd",
  lazy: true,
  checkStrictly: true,
  lazyLoad: async (node, resolve) => {
    let childs = [];
    if (rootAdcd.toString() !== "33") {
      const result = await getListDistrict({
        parentAdcd: rootAdcd
          .toString()
          .slice(0, rootAdcd.toString().length - 2),
      });
      childs = result.filter((item) => item.adcd === rootAdcd.toString());
      rootAdcd = "33";
    } else {
      childs = await getListDistrict({
        parentAdcd: node.value || rootAdcd,
      });
    }
    resolve(childs);
  },
};

// 事件等级
const eventGradeOptions = [
  {
    label: "全部",
    value: "",
  },
  {
    label: "重大",
    value: "1",
  },
  {
    label: "较严重",
    value: "2",
  },
  {
    label: "一般",
    value: "3",
  },
];

// 事件状态列表
const acceptStatusList = [
  {
    label: "全部",
    value: "",
  },
  {
    label: "待受理",
    value: "1",
  },
  {
    label: "已受理",
    value: "2",
  },
];
// 查询数据 ---end

let data = reactive({
  searchFormData: {
    eventSource: "",
    adcdSelected: [ADMIN_DIV_CODE],
    eventGrade: "",
    eventAcceptStatus: "",
  },
  tableData: [],
});
const { searchFormData, tableData } = toRefs(data);

// 获取table数据
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
      data.tableData = res.records;
    })
    .catch((err) => {
      console.log(err);
    });
}
getData();

// data.tableData = [
//   {
//     eventResponsibleUnitCodeName: "测试1",
//     eventSourceName: "ceshi",
//   },
//   {
//     eventResponsibleUnitCodeName: "测试2",
//     eventSourceName: "ceshi",
//   },
// ];

// 重置
let searchFormRef = ref(null);
function onRest() {
  searchFormRef.value.resetFields();
  getData();
}
// 查看详情
function onCheck(row) {
  console.log(row);
}

defineExpose({});
</script>

<style lang="less" scoped>
.table-data {
  .pop-body {
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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

    .search-form {
      margin: 20px 0;

      :deep(.el-form-item__label) {
        color: white;
      }
      :deep(.el-input__wrapper) {
        background-color: transparent;
      }
      :deep(.search-input) {
        width: 170px;
      }
    }

    :deep(.el-table) {
      background-color: transparent;
      color: white;
    }
    :deep(.el-table tr) {
      background-color: transparent;
    }
    :deep(.el-table thead) {
      color: white;
    }
    :deep(.el-table--striped
        .el-table__body
        tr.el-table__row--striped
        td.el-table__cell) {
      background-color: #174762;
      border-bottom: none;
    }
    :deep(.el-table .el-table__cell) {
      border-bottom: none;
    }
    :deep(.el-table th.el-table__cell) {
      background-color: #174762;
    }
  }
}
</style>
