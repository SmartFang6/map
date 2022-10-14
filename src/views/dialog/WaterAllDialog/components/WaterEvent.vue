<!-- #region 水域事件 -->
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
        max-height="380px"
        stripe
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          type="index"
          width="60px"
          label="序号"
        ></el-table-column>
        <el-table-column
          prop="eventId"
          width="150px"
          show-overflow-tooltip
          label="事件编号"
        ></el-table-column>
        <el-table-column label="操作" width="70px">
          <template #default="{ row }">
            <el-button type="primary" @click="changeInfo(row)" link>
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right_box">
      <ul>
        <li class="right-li">
          <span class="item-label">事件编号：</span>
          <el-tooltip
            :content="props.info?.eventId"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.eventId }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">责任部门：</span>
          <el-tooltip
            :content="props.info?.eventResponsibleUnitCodeName"
            effect="light"
            placement="top"
          >
            <span class="item-value">
              {{ props.info?.eventResponsibleUnitCodeName }}
            </span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">所属区域：</span>
          <el-tooltip
            :content="props.info?.adnm"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.adnm }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">所属河湖：</span>
          <el-tooltip
            :content="props.info?.rchnm"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.rchnm }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">发生时间：</span>
          <el-tooltip :content="info?.occurTime" effect="light" placement="top">
            <span class="item-value">{{ props.info?.occurTime }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">事件状态：</span>
          <el-tooltip
            :content="props.info?.eventStatusName"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.eventStatusName }}</span>
          </el-tooltip>
        </li>
      </ul>
      <div class="imgBox">
        <el-carousel
          indicator-position="none"
          v-if="props.info?.imageFileInfoList?.length > 0"
        >
          <el-carousel-item
            v-for="item in props.info.imageFileInfoList"
            :key="item.fileId"
          >
            <img :src="item.relativeUrl" alt="" class="left-img" />
          </el-carousel-item>
        </el-carousel>
        <img :src="noImg" alt="" v-else />
      </div>
    </div>
  </div>
</template>
<!-- #endregion -->

<script setup>
import noImg from "@/assets/images/no-img.png";
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
const emit = defineEmits(["changeEventInfo"]);
const changeInfo = (row) => {
  emit("changeEventInfo", row);
};
</script>

<style scoped lang="less">
.pop-body {
  display: flex;
  justify-content: space-between;
  // align-items: center;
  max-height: 400px;
  box-sizing: border-box;
  .lf_list {
    width: 300px;
    // width: 44%;
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
  flex: 1;
  margin-left: 14px;

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
  }
}

.item-label {
  text-align: right;
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
}
.imgBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
}
:deep(.el-table) {
  .el-table__header-wrapper {
    background: #023368;
    font-size: 14px;
  }
  .el-table__body-wrapper {
    color: #fff;
  }
  .el-table__row {
    .el-table__cell {
      background: #001353 !important;
      color: #fff;
      padding: 4px 0;
    }
  }
  .el-table__row--striped {
    .el-table__cell {
      background: #023368 !important;
      color: #fff;
    }
  }
  .el-table__inner-wrapper {
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
