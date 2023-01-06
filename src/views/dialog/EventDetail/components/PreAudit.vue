<!--
  中心预审结果查看
-->
<template>
  <div class="descriptions-container highlight-title">
    <template v-if="mockStatus === '1'">
      <el-descriptions title="中心预审" direction="vertical">
        <el-descriptions-item label="预审结果">
          {{ preAuditVo?.previewResultName }}
        </el-descriptions-item>
        <el-descriptions-item label="处理时间">
          {{
            preAuditVo?.eventPrequalifyDate &&
            moment(preAuditVo?.eventPrequalifyDate).format("YYYY-MM-DD")
          }}
        </el-descriptions-item>
        <el-descriptions-item label="处理人员">
          {{ preAuditVo?.eventPrequalifyUser }}
        </el-descriptions-item>
        <el-descriptions-item label="事件类型">
          {{ preAuditVo?.eventTypeName }}
        </el-descriptions-item>
        <el-descriptions-item label="事件等级">
          {{ preAuditVo?.eventGradeName }}
        </el-descriptions-item>
        <el-descriptions-item label="责任部门">
          {{ preAuditVo?.handleUnit }}
        </el-descriptions-item>
        <el-descriptions-item label="责任人员">
          {{ preAuditVo?.handleUser }}
        </el-descriptions-item>
        <el-descriptions-item label="截止时间">
          {{
            preAuditVo?.dueDate &&
            moment(preAuditVo?.dueDate).format("YYYY-MM-DD")
          }}
        </el-descriptions-item>
        <el-descriptions-item label="中心要求" :span="3">
          {{ preAuditVo?.centerRequirement }}
        </el-descriptions-item>
      </el-descriptions>
    </template>
    <template v-else>
      <el-descriptions title="中心预审" direction="vertical">
        <el-descriptions-item label="预审结果">
          {{ preAuditVo?.previewResultName }}
        </el-descriptions-item>
        <el-descriptions-item label="处理时间">
          {{
            preAuditVo?.eventPrequalifyDate &&
            moment(preAuditVo?.eventPrequalifyDate).format("YYYY-MM-DD")
          }}
        </el-descriptions-item>
        <el-descriptions-item label="处理人员">
          {{ preAuditVo?.eventPrequalifyUser }}
        </el-descriptions-item>
        <el-descriptions-item label="结案说明" :span="3">
          {{ preAuditVo?.centerRequirement }}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions class="files-content" direction="vertical" :column="2">
        <el-descriptions-item label="相关图片">
          <div class="file-list">
            <template
              v-for="(imageItem, index) in preAuditVo?.imageFileInfoList"
              :key="imageItem?.fileId"
            >
              <el-image
                class="img"
                :src="imageItem?.relativeUrl"
                :initial-index="index"
                :preview-src-list="
                  preAuditVo?.imageFileInfoList.map((item) => item?.relativeUrl)
                "
              />
            </template>
            <template
              v-if="
                !preAuditVo?.imageFileInfoList ||
                preAuditVo?.imageFileInfoList?.length <= 0
              "
            >
              <div class="file blank">
                <el-icon><Link /></el-icon>
              </div>
            </template>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="相关附件" class="file-list">
          <div class="file-list">
            <template
              v-for="fileItem in preAuditVo?.pdfFileInfoList"
              :key="fileItem?.fileId"
            >
              <File :src="fileItem?.relativeUrl" />
            </template>
            <template
              v-if="
                !preAuditVo?.pdfFileInfoList ||
                preAuditVo?.pdfFileInfoList?.length <= 0
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
  name: "ShowPreAudit",
  components: {
    Link,
  },
  props: {
    mockStatus: {
      type: Number,
      default: 1,
    },
    // 中心预审
    preAudit: {
      type: Object,
      default: () => null,
    },
  },
  setup(props) {
    const state = reactive({
      // 事件详情对象
      preAuditVo: null,
    });

    watch(
      () => props.preAudit,
      (preAudit) => {
        state.preAuditVo = reactive(JSON.parse(JSON.stringify(preAudit)));
        console.log("preAuditVo", state.preAuditVo);
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
