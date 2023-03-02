<!------------------------------------------------------
 ¦ 流程进度
 ¦ 
 ¦ Author: 大风
 ¦ Date: 2022-09-15 09:38:55
 ¦ FilePath: src/views/workbench/eventCenter/components/Progress.vue
 ¦----------------------------------------------------->

<template>
  <div v-if="!!eventDetail" class="progress">
    <!-- <div class="basic-info descriptions-container">
      <el-descriptions direction="vertical">
        <el-descriptions-item label="事件编号">
          {{ eventDetail?.reportRecordVO?.eventId }}
        </el-descriptions-item>
        <el-descriptions-item label="事件状态">
          <span class="status">
            {{ eventDetail?.reportRecordVO?.eventNewStatus }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="累计用时">
          {{ eventDetail?.reportRecordVO?.eventWanderDay || "  " }}
        </el-descriptions-item>
      </el-descriptions>
    </div> -->

    <div class="progress-wrapper">
      <template v-for="(item, index) in data" :key="index">
        <div v-if="item.createTime" class="progress-item">
          <p class="title">{{ item.eventLinkName }}</p>
          <p class="datetime">{{ item.createTime }}</p>
          <div class="info">
            <span class="name">{{ item.userName }}</span>
            <el-tooltip
              effect="light"
              v-if="item.remark"
              :content="item.remark"
              placement="top"
            >
              <span class="remark">{{ item.remark }}</span>
            </el-tooltip>
          </div>
        </div>
        <div v-else class="progress-item empty">
          <p class="title">{{ item.eventLinkName }}</p>
          <div class="empty-style">
            <img src="@/assets/images/progress-empty.png" />
            <p class="subtext">暂无信息</p>
          </div>
        </div>
        <img
          v-if="index < data.length - 1"
          class="arrow"
          src="@/assets/images/progress-arrow.png"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * 事件详情
   * @type {Object<any>}
   */
  eventDetail: {
    type: Object,
    default: () => null,
  },
});

// 处理进度数据
const data = computed(() => {
  const { linkNodeList } = props?.eventDetail;
  if (!linkNodeList) {
    return [];
  }

  const data = [];

  const eventReport = linkNodeList.find(
    (node) => node.eventLinkName === "事件上报"
  );

  const eventPreaudit = linkNodeList
    .filter((node) => node.eventLinkName === "中心预审")
    .sort(
      (a, b) =>
        new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    )
    .at(0);
  if (eventPreaudit && !eventPreaudit.createTime) {
    eventPreaudit.createTime = " ";
  }

  const eventHandle = linkNodeList
    .filter((node) => node.eventLinkName === "事项处置")
    .sort(
      (a, b) =>
        new Date(b.createTime).getTime() - new Date(a.createTime).getTime()
    )
    .at(0);
  if (eventHandle && !eventHandle.createTime) {
    eventHandle.createTime = " ";
  }

  const eventAudit = linkNodeList.find(
    (node) => node.eventLinkStatus === "已销号"
  );

  data.push(
    eventReport || {
      eventLinkName: "事件上报",
    }
  );
  data.push(
    eventPreaudit || {
      eventLinkName: "事项处置",
    }
  );
  data.push(
    eventHandle || {
      eventLinkName: "事项处置",
    }
  );
  data.push(
    eventAudit || {
      eventLinkName: "中心审核",
    }
  );
  return data;
});
</script>

<style lang="less" scoped>
.progress {
  padding-left: 40px;
  :deep(.descriptions-container) {
    margin-bottom: 20px !important;
  }
  .status {
    color: #ff5630;
  }
}
.progress-wrapper {
  display: flex;
  justify-content: space-between;
  .arrow {
    display: block;
    margin: 50px 3px 0;
    width: 30px;
    height: 30px;
  }
  &::after {
    display: table;
    content: "";
    clear: both;
  }
}
.progress-item {
  width: 247px;
  height: 130px;
  background-color: #f5f6fa;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 21px 20px 23px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: MicrosoftYaHei;
  &.empty {
    .empty-style {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 90px;
      }
      .subtext {
        font-size: 16px;
        color: #bbbec9;
      }
    }
  }

  & .title {
    font-size: 20px;
    color: #727688;
  }

  & .datetime {
    font-size: 16px;
    color: #2952d0;
  }

  & .info {
    display: flex;
    font-size: 16px;
    & > span {
      display: block;
    }
    .name {
      width: 76px;
      color: #9f9f9f;
    }
    .remark {
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      white-space: nowrap;
      flex: 1;
      width: 100%;
    }
  }
}
</style>
