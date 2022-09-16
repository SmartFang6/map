<!--
  事件处置结果显示
-->
<template>
  <div class="descriptions-container highlight-title">
    <template v-if="mockStatus === '1'">
      <el-descriptions title="事项处置" direction="vertical">
        <el-descriptions-item label="处置结果">
          {{ eventHandleVO?.handleResultName }}
        </el-descriptions-item>
        <el-descriptions-item label="处理时间">
          {{ moment(eventHandleVO?.handleTime).format("YYYY-MM-DD") }}
        </el-descriptions-item>
        <el-descriptions-item label="处理人员">
          {{ eventHandleVO?.handleUser }}
        </el-descriptions-item>
        <el-descriptions-item label="责任部门">
          {{ eventHandleVO?.assignUnit }}
        </el-descriptions-item>
        <el-descriptions-item label="责任人员">
          {{ eventHandleVO?.assignUser }}
        </el-descriptions-item>
        <el-descriptions-item label="截止时间">
          {{ moment(eventHandleVO?.dueDate).format("YYYY-MM-DD") }}
        </el-descriptions-item>
        <el-descriptions-item label="处置要求" :span="3">
          {{ eventHandleVO?.assignInstruction }}
        </el-descriptions-item>
      </el-descriptions>
    </template>
    <template v-else>
      <el-descriptions title="事件处置" direction="vertical">
        <el-descriptions-item label="处置结果">
          {{ eventHandleVO?.handleResultName }}
        </el-descriptions-item>
        <el-descriptions-item label="处理时间">
          {{ moment(eventHandleVO?.handleTime).format("YYYY-MM-DD") }}
        </el-descriptions-item>
        <el-descriptions-item label="处理人员">
          {{ eventHandleVO?.handleUser }}
        </el-descriptions-item>
        <el-descriptions-item label="处置说明">
          {{ eventHandleVO?.handleInstruction }}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions class="files-content" direction="vertical" :column="1">
        <el-descriptions-item label="处置图片">
          <div class="file-list">
            <template
              v-for="(imageItem, index) in eventHandleVO?.imageFileInfoList"
              :key="imageItem?.fileId"
            >
              <el-image
                class="img"
                :src="`${imageItem?.relativeUrl}?x-oss-process=image/resize,m_lfit,h_200,w_220`"
                :initial-index="index"
                :preview-src-list="
                  eventHandleVO?.imageFileInfoList.map(
                    (item) => item?.relativeUrl
                  )
                "
              />
            </template>
            <template
              v-if="
                !eventHandleVO?.imageFileInfoList ||
                eventHandleVO?.imageFileInfoList?.length <= 0
              "
            >
              <div class="file blank">
                <el-icon><Link /></el-icon>
              </div>
            </template>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="处置附件" class="file-list">
          <div class="file-list">
            <template
              v-for="fileItem in eventHandleVO?.pdfFileInfoList"
              :key="fileItem?.fileId"
            >
              <File :src="fileItem?.relativeUrl" />
            </template>
            <template
              v-if="
                !eventHandleVO?.pdfFileInfoList ||
                eventHandleVO?.pdfFileInfoList?.length <= 0
              "
            >
              <div class="file blank">
                <el-icon><Link /></el-icon>
              </div>
            </template>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </template>
  </div>
</template>

<script>
import { toRefs, reactive, watch } from "vue";
import { Link } from "@element-plus/icons-vue";
import moment from "moment";

export default {
  name: "ShowEventHandle",
  components: {
    Link,
  },
  props: {
    mockStatus: {
      type: Number,
      default: 1,
    },
    /**
     * 事件详情
     */
    details: {
      type: Object,
      default: () => null,
    },
  },
  setup(props) {
    const state = reactive({
      // 事件详情对象
      eventHandleVO: null,
    });

    watch(
      () => props.details,
      (details) => {
        state.eventHandleVO = reactive(JSON.parse(JSON.stringify(details)));
      },
      {
        immediate: true,
      }
    );

    return {
      ...toRefs(state),
      moment,
    };
  },
};
</script>

<style lang="less" scoped>
.files-content {
  :deep(.el-descriptions__content.is-vertical-content) {
    border-bottom: none;
  }
}
.file-list {
  display: flex;
  flex-wrap: wrap;
}
.img,
.file {
  width: 148px;
  height: 120px;
  background-color: #e9ecf4;
  border-radius: 4px;
  margin-right: 20px;
}
.blank {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
