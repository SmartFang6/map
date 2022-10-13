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
          prop="num"
          width="140px"
          label="项目名称"
        ></el-table-column>
        <el-table-column label="时间" width="120px">
          <template #default="{ row }">
            {{ row }}
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="right_box">
      <ul>
        <li>
          <span class="item-label">所在乡镇</span>
          <el-tooltip
            :content="props.info?.eventId"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.eventId }}</span>
          </el-tooltip>
        </li>
        <li>
          <span class="item-label">项目名称</span>
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
        <li>
          <span class="item-label">类型</span>
          <el-tooltip
            :content="props.info?.adnm"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.adnm }}</span>
          </el-tooltip>
        </li>
        <li>
          <span class="item-label">联系人</span>
          <el-tooltip
            :content="props.info?.rchnm"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.rchnm }}</span>
          </el-tooltip>
        </li>
        <li>
          <span class="item-label">占用水域面积</span>
          <el-tooltip
            :content="props.info?.occurTime"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.occurTime }}</span>
          </el-tooltip>
        </li>
        <li>
          <span class="item-label">实施状态</span>
          <el-tooltip
            :content="props.info?.eventStatusName"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.eventStatusName }}</span>
          </el-tooltip>
        </li>
        <li>
          <span class="item-label">相关文件</span>
          <span class="item-value">{{ props.info?.eventStatusName }}</span>
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
import Map from "@/views/OLMap/ReadMap";
import { ref } from "vue";
// 地图的坐标信息
const location = ref({});
const props = defineProps({
  list: {
    type: Array,
    default() {
      return [
        {
          num: 111,
        },
        {
          num: 222,
        },
      ];
    },
  },
});
</script>

<style scoped lang="less">
.pop-body {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  .lf_list {
    width: 300px;
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
    &:last-child {
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
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden; //溢出内容隐藏
  text-overflow: ellipsis; //文本溢出部分用省略号表示
  display: -webkit-box; //特别显示模式
  -webkit-line-clamp: 2; //行数
  line-clamp: 2;
  -webkit-box-orient: vertical; //盒子中内容竖直排列
}
.imgBox {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 240px;
}
.map {
  height: 240px;
  margin: 0 16px 0 20px;
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
