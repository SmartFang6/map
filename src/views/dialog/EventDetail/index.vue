<!------------------------------------------------------
 ¦ 事件详情弹窗
 ¦ 
 ¦ Author: 大风
 ¦ Date: 2022-09-16 09:02:48
 ¦ FilePath: src/views/dialog/EventDetail/index.vue
 ¦----------------------------------------------------->

<template>
  <el-dialog
    v-model="dialogVisible"
    :width="1280"
    append-to-body
    destroy-on-close
    title="事件流程查看"
    top="3%"
    :custom-class="'event-detail-dialog'"
  >
    <div class="map-pop">
      <div class="event-detail">
        <Progress :event-detail="eventDetail" />
        <BasicInfo :details="eventDetail?.reportRecordVO" />
        <!--#region 事件流转表单区,根据返回结果生成-->
        <template v-for="(enevntInfo, index) in handEventList" :key="index">
          <PreAudit
            v-if="enevntInfo?.eventLinkName === '中心预审'"
            :pre-audit="enevntInfo"
            :mock-status="enevntInfo?.previewResult"
          />
          <Handle
            v-else-if="enevntInfo?.eventLinkName === '事项处置'"
            :details="enevntInfo"
            :mock-status="enevntInfo?.handleResult"
          />
          <Audit
            v-else-if="enevntInfo?.eventLinkName === '中心审核'"
            :details="enevntInfo"
          />
        </template>
        <!--#endregion-->
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { getEventDetail } from "@/apis/cockpitEventStats";
import Progress from "./components/Progress.vue";
import BasicInfo from "./components/BasicInfo.vue";
import PreAudit from "./components/PreAudit.vue";
import Handle from "./components/Handle.vue";
import Audit from "./components/Audit.vue";

// 是否显示双向绑定
const emits = defineEmits(["update:visible"]);

// 事件详情
const eventDetail = ref(null);

const handEventList = ref([]);

const props = defineProps({
  /**
   * 是否显示弹窗
   * @type {boolean}
   */
  visible: {
    default: false,
    type: Boolean,
  },
  info: {
    default: () => null,
    type: Object,
  },
});

const dialogVisible = ref(false);

watch(
  () => props.visible,
  (visible) => {
    dialogVisible.value = visible;
  },
  { immediate: true }
);

watch(
  () => dialogVisible.value,
  (dialogVisible) => {
    if (!dialogVisible) {
      emits("update:visible", dialogVisible);
    }
  }
);

watch(
  () => props.info,
  async (info) => {
    if (info) {
      eventDetail.value = await getEventDetail({
        id: info?.id,
        eventId: info?.eventId,
      });
      handEventList.value = [];
      eventDetail.value?.linkList?.forEach((linkItem) => {
        eventDetail.value?.linkNodeList?.forEach((nodeItem) => {
          if (nodeItem.id === linkItem.id) {
            const target = Object.assign(linkItem, {
              eventLinkName: nodeItem.eventLinkName,
              eventLinkStatus: nodeItem.eventLinkStatus,
            });
            return handEventList.value.push(target);
          }
        });
      });
    }
  }
);
</script>

<style lang="less" scoped>
.progress {
  margin-bottom: 30px;
}
</style>

<style lang="less">
// 表单, 内容展示容器
.form-container,
.descriptions-container {
  p.title {
    padding-bottom: 18px;
  }
  p.title,
  .el-descriptions__title {
    font-size: 18px;
    color: #696f75;
    font-weight: bold;
  }
}
.descriptions-container {
  margin-bottom: 30px;
  .el-descriptions__header {
    margin-bottom: 8px;
    justify-content: initial;
  }
  &.highlight-title {
    .el-descriptions__header {
      margin-bottom: 8px;
      justify-content: initial;
      height: 48px;
      padding-left: 30px;
      background: linear-gradient(90deg, #5971f8 15%, #fff);
      .el-descriptions__title {
        color: #feffff;
        font-family: MicrosoftYaHei;
        font-weight: bold;
      }
    }
    .el-descriptions__body {
      padding-left: 40px;
      box-sizing: border-box;
    }
  }
  .report-info {
    display: flex;
    align-items: center;
    & > div {
      padding-left: 18px;
    }
  }
  .el-descriptions__label.el-descriptions__cell:not(.is-bordered-label).is-vertical-label {
    color: #a3a9b4;
    font-size: 16px;
    border-right: 30px solid transparent;
    width: 33%;
    padding-top: 10px;
  }
  .el-descriptions__body
    .el-descriptions__table:not(.is-bordered)
    .el-descriptions__cell {
    font-size: 16px;
    border-right: 30px solid transparent;
    width: 33%;
  }
  .el-descriptions__content.is-vertical-content {
    border-bottom: solid 1px #e9ecf4;
  }
  .vertical-align-top {
    vertical-align: top;
  }
}
.event-detail-dialog {
  .el-dialog__body {
    padding-top: 10px;
  }
}
</style>
