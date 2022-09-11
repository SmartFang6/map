<template>
  <div class="table-data">
    <div class="pop-body">
      <!-- #region 等级统计数量-->
      <ul>
        <li>
          <span>全部</span>
          <span class="item-value" style="color: #fff">
            {{ eventGrade["全部"] }}
          </span>
          <span>个</span>
        </li>
        <li>
          <span>重大</span>
          <span class="item-value" style="color: #e35f5f">
            {{ eventGrade["重大问题"] }}
          </span>
          <span>个</span>
        </li>
        <li>
          <span>较严重</span>
          <span class="item-value" style="color: #ffb401">
            {{ eventGrade["较严重问题"] }}
          </span>
          <span>个</span>
        </li>
        <li>
          <span>一般</span>
          <span class="item-value" style="color: #0adbe0">
            {{ eventGrade["一般问题"] }}
          </span>
          <span>个</span>
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
        <!-- <el-form-item label="事件来源" prop="eventSource">
          <DictSelec
            v-model:selectValue="searchFormData.eventSource"
            dict-string="water_one_inspection:event_source"
            class="search-input"
          />
        </el-form-item> -->
        <el-form-item label="行政区域" prop="adcdSelected">
          <el-cascader
            v-model="searchFormData.adcdSelected"
            ref="adcdCascaderRef"
            :props="adcdCascaderProps"
            :options="adcdCascaderOptions"
            class="search-input"
          />
        </el-form-item>
        <!-- <el-form-item label="事件等级" prop="eventGrade">
          <el-select v-model="searchFormData.eventGrade" placeholder="请选择">
            <el-option
              v-for="item in eventGradeOptions"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
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
            :adcd="lastAdcd"
            size="small"
          />
        </el-form-item>
        <el-form-item label="上报时间" prop="dateRange">
          <el-date-picker
            v-model="searchFormData.dateRange"
            class="search-date-range"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
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
        height="45vh"
        stripe
      >
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column label="责任部门" prop="eventResponsibleUnitCodeName" />
        <el-table-column label="事件来源" prop="eventSourceName" />
        <el-table-column label="行政区域" prop="adnm" />
        <el-table-column label="所在河湖" prop="rchnm" />
        <el-table-column label="事件类型">
          <template #default="{ row }">
            <el-tooltip effect="dark" placement="top-start">
              <template #content>
                <p style="width: 500px; font-size: 14px; line-height: 20px">
                  {{ row.eventTypeName }}
                </p>
              </template>
              <div class="eventTypeName">
                {{ row.eventTypeName }}
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="事件等级" prop="eventGradeName" />
        <el-table-column label="发生时间" prop="occurTime" />
        <el-table-column label="上报人员" prop="reportUser" />
        <el-table-column label="状态" prop="eventStatusName" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button link type="primary" @click="onCheck(row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagesize">
        <el-pagination
          layout="total, sizes, prev, pager, next"
          :page-sizes="[10, 50, 100]"
          v-model:pageSize="pageNum"
          v-model:currentPage="pageIndex"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <!-- #endregion -->
    </div>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref, computed } from "vue";
import { getEventQuestionList } from "@/apis/cockpitEventStats";
import store from "@/store";
// import DictSelec from "@/components/DictSelect/index.vue";
import {
  getListDistrict,
  getEventStatGradeForProblemList,
} from "@/apis/home.js";
import RchSelect from "@/components/RchSelect";
import moment from "moment";
import { ElMessage } from "element-plus";
import { getMD5_sign } from "@/utils/index";

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
// const eventGradeOptions = [
//   {
//     label: "全部",
//     value: "",
//   },
//   {
//     label: "重大",
//     value: "1",
//   },
//   {
//     label: "较严重",
//     value: "2",
//   },
//   {
//     label: "一般",
//     value: "3",
//   },
// ];

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

// 分页
const pageData = reactive({
  total: 10,
  pageIndex: 1,
  pageNum: 10,
});
const { total, pageIndex, pageNum } = toRefs(pageData);
// 分页器函数 每页码数量改变时
const handleSizeChange = (val) => {
  pageData.pageNum = val;
  getData();
};
// 分页器函数 当前页码改变时
const handleCurrentChange = (val) => {
  pageData.pageIndex = val;
  getData();
};

let lastAdcd = computed(() => {
  return (
    data.searchFormData.adcdSelected[
      data.searchFormData.adcdSelected.length - 1
    ] || ADMIN_DIV_CODE
  );
});
// 查询数据 ---end

let data = reactive({
  searchFormData: {
    eventSource: "",
    adcdSelected: [ADMIN_DIV_CODE],
    eventGrade: "",
    eventAcceptStatus: "",
    dateRange: [
      moment(new Date()).startOf("year").format("YYYY-MM-DD 00:00:00"),
      moment(new Date()).endOf("year").format("YYYY-MM-DD 23:59:59"),
    ],
    searchText: "",
  },
  tableData: [],
  eventGrade: {}, // 统计数量
});
const { searchFormData, tableData, eventGrade } = toRefs(data);

// 获取table数据
function getData() {
  console.log(data.searchFormData, "data---");
  const params = {
    adcd:
      data.searchFormData.adcdSelected[
        data.searchFormData.adcdSelected.length - 1
      ] || ADMIN_DIV_CODE,
    code: "",
    startTime: data.searchFormData.dateRange?.[0],
    endTime: data.searchFormData.dateRange?.[1],
    searchText: data.searchFormData.searchText,
    pageNo: pageData.pageIndex,
    pageSize: pageData.pageNum,
    eventDealStatus: data.searchFormData.eventAcceptStatus,
  };
  getEventQuestionList(params)
    .then((res) => {
      data.tableData = res.records.map((item) => {
        return {
          ...item,
          occurTime: item.occurTime?.substring(0, 10),
        };
      });
      pageData.total = res.total;
    })
    .catch((err) => {
      console.log(err);
    });
  getEventStatGradeForProblemList(params)
    .then((res) => {
      res.forEach((item) => {
        data.eventGrade[item.eventGradeName] = item.allNum;
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
getData();

// 重置
let searchFormRef = ref(null);
function onRest() {
  data.searchFormData.searchTextValue = "";
  searchFormRef.value.resetFields();
  getData();
}
// 查看详情
function onCheck(row) {
  if (store.state?.userInfo?.roleId === "065e6e9013954b09b013a1846499a720") {
    const ticket = store?.state?.userInfo?.userId || "";
    const pathObj = {
      prePath: "/workbench/eventCenter/accept/list",
      path: "/workbench/eventCenter/showEvent",
      query: {
        id: row.id,
        eventId: row.eventId,
      },
    };
    const JUMP_URL =
      "https://sgpt.yw.gov.cn:6006/oneInspection/ssoLogin?moduleId=water_one_inspection&userId=" +
      ticket +
      "&sign=" +
      getMD5_sign() +
      "&ticket=" +
      store?.state?.ticket +
      "&params=" +
      JSON.stringify(pathObj);
    window.open(JUMP_URL);
    console.log("详情跳转》》》", JUMP_URL);
  } else {
    ElMessage({
      message: "本功能暂未开放",
      type: "warning",
    });
  }
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
          font-family: YOUSHEBIAOTIHEI;
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
      :deep(.el-select .el-input__inner) {
        color: white;
      }
      :deep(.el-cascader .el-input .el-input__inner) {
        color: white;
      }
      :deep(.el-range-input) {
        color: white;
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
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
      background-color: rgba(0, 0, 0, 0);
    }

    .pagesize {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
      :deep(.el-pagination__total) {
        color: white;
      }
      :deep(.el-select .el-input__wrapper) {
        background-color: transparent;
        color: white;
      }
      :deep(.el-select .el-input__inner) {
        color: white;
      }
      :deep(.btn-prev) {
        background-color: transparent;
        color: white;
      }
      :deep(.el-pager li) {
        background-color: transparent;
      }
      :deep(.btn-next) {
        background-color: transparent;
        color: white;
      }
      :deep(.number) {
        color: white;
      }
      :deep(.el-pager li.is-active) {
        color: #1e93d7;
      }
    }
  }
  .eventTypeName {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden; //溢出内容隐藏
    text-overflow: ellipsis; //文本溢出部分用省略号表示
    display: -webkit-box; //特别显示模式
    -webkit-line-clamp: 2; //行数
    line-clamp: 2;
    -webkit-box-orient: vertical; //盒子中内容竖直排列
  }
}
</style>
