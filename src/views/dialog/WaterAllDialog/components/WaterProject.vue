<!-- #region 涉水项目 -->
<template>
  <div class="pop-body">
    <div class="lf_list">
      <el-table
        :data="props.list"
        style="width: 100%"
        :header-cell-style="{
          'text-align': 'center',
          background: '#023368',
          color: '#fff',
        }"
        stripe
        @row-click="getRightInfo"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          type="index"
          width="60px"
          label="序号"
        ></el-table-column>
        <el-table-column
          prop="subjectName"
          width="160px"
          label="项目名称"
        ></el-table-column>
        <el-table-column label="时间">
          <template #default="{ row }">
            {{
              row?.createTime
                ? moment(row.createTime).format("YYYY-MM-DD")
                : "-"
            }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right_box">
      <ul>
        <li v-if="props.info?.suitAreaName">
          <span class="item-label">所在乡镇</span>
          <el-tooltip
            :content="props.info?.suitAreaName"
            effect="dark"
            placement="top"
          >
            <span class="item-value">
              {{ props.info?.suitAreaName ?? "-" }}
            </span>
          </el-tooltip>
        </li>
        <li v-if="props.info?.subjectName">
          <span class="item-label">项目名称</span>
          <el-tooltip
            :content="props.info?.subjectName"
            effect="dark"
            placement="top"
          >
            <span class="item-value">
              {{ props.info?.subjectName ?? "-" }}
            </span>
          </el-tooltip>
        </li>
        <li v-if="props.info?.subjectType">
          <span class="item-label">类型</span>
          <el-tooltip
            :content="props.info?.subjectType"
            effect="dark"
            placement="top"
          >
            <span class="item-value">{{ props.info?.subjectType ?? "-" }}</span>
          </el-tooltip>
        </li>
        <li v-if="props.info?.subjectContacts">
          <span class="item-label">联系人</span>
          <el-tooltip
            :content="props.info?.subjectContacts"
            effect="dark"
            placement="top"
          >
            <span class="item-value">
              {{ props.info?.subjectContacts ?? "-" }}
            </span>
          </el-tooltip>
        </li>
        <li>
          <span class="item-label">占用水域面积</span>
          <span class="item-value">
            {{ props.info?.waterPreArea + "km²" }}
          </span>
        </li>
        <li>
          <span class="item-label">实施状态</span>
          <el-tooltip
            :content="props.info?.subjectStatus === 0 ? '未完成' : '完成'"
            effect="dark"
            placement="top"
          >
            <span class="item-value">
              {{ props.info?.subjectStatus === 0 ? "未完成" : "完成" }}
            </span>
          </el-tooltip>
        </li>
        <li v-if="props.info?.fileCompensate?.relativeUrl">
          <span class="item-label">相关文件</span>
          <span class="item-value">
            <a
              v-if="props.info?.fileCompensate?.relativeUrl"
              :href="props.info?.fileCompensate?.relativeUrl"
              target="__blank"
            >
              项目文件
            </a>
            <span v-else>未上传项目文件</span>
          </span>
        </li>
      </ul>
      <div class="map">
        <Map :location="location" />
      </div>
    </div>
  </div>
</template>
<!-- #endregion -->

<script setup>
import Map from "@/views/OLMap/SubjectMap";
import { ref } from "vue";
import moment from "moment";
// 地图的坐标信息
const location = ref({});
const props = defineProps({
  list: {
    type: Array,
    default() {
      return [];
    },
  },
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
const emits = defineEmits("getSubDetail");
const getRightInfo = (row) => {
  console.log(row);
  emits("getSubDetail", row);
};
</script>

<style scoped lang="less">
.pop-body {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 620px;
  overflow: hidden;
  .lf_list {
    width: 35%;
  }

  .left-img {
    width: 268px;
    height: 100%;
  }

  .left-map {
    width: 358px;
    height: 348px;
  }
}
ul {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 20px;

  li {
    display: flex;
    width: 47.8%;
    height: 44px;
    margin-right: 2%;
    line-height: 44px;
    margin-bottom: 10px;
    padding: 0 12px;
    background-color: #0b216c;
    box-shadow: inset 0 2px 1px 0 #1642d8;
    text-align: left;
    &:nth-child(2n) {
      margin-right: 0;
    }
    &:nth-child(7) {
      width: 100%;
    }
  }
}

.item-label {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #ffffff;
  flex-shrink: 0;
}

.item-value {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #43c7ff;
  margin-left: 12px;
  white-space: nowrap;
  overflow: hidden; //溢出内容隐藏
  text-overflow: ellipsis; //文本溢出部分用省略号表示
  a {
    color: #43c7ff;
    border-bottom: 1px solid;
  }
}
.right_box {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.imgBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
}
.map {
  // height: 390px;
  flex: 1;
  min-height: 380px;
  margin: 0 16px 0 20px;
}
:deep(.el-table) {
  max-height: 540px;
  .el-table__header-wrapper {
    background: #023368;
    font-size: 14px;
  }
  .el-table__body-wrapper {
    color: #fff;
    max-height: 500px;
    width: calc(100% + 22px);
    overflow-y: scroll !important;
    background: #023368 !important;
  }
  .el-table__row {
    .el-table__cell {
      background: #001353 !important;
      color: #fff;
      // padding: 4px 0;
      cursor: pointer;
    }
  }
  .el-table__row--striped {
    .el-table__cell {
      background: #023368 !important;
      color: #fff;
    }
  }
  .el-table__empty-block {
    background: #023368 !important;
  }
  .el-table__inner-wrapper {
    max-height: 540px;
    background: #001353 !important;
    &::before {
      display: none;
    }
  }
  td.el-table__cell,
  th.el-table__cell.is-leaf {
    border: none !important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cel {
    background: transparent;
  }
}
</style>
