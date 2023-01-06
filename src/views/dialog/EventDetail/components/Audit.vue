<!--
 * @Author: bifang
 * @Date: 2022-09-16 11:03:31
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-01-06 14:04:01
 * @FilePath: /river-lake-cockpit-front/src/views/dialog/EventDetail/components/Audit.vue
-->
<!--
  中心审核结果查看
-->
<template>
  <div class="descriptions-container highlight-title">
    <el-descriptions title="中心审核" direction="vertical">
      <el-descriptions-item label="审核结果">
        {{ eventAuditVO?.reviewResultName }}
      </el-descriptions-item>
      <el-descriptions-item label="处理时间">
        {{
          eventAuditVO?.eventReviewDate &&
          moment(eventAuditVO?.eventReviewDate).format("YYYY-MM-DD")
        }}
      </el-descriptions-item>
      <el-descriptions-item label="处理人员">
        {{ eventAuditVO?.eventReviewUser }}
      </el-descriptions-item>
      <el-descriptions-item label="审核说明">
        {{ eventAuditVO?.reviewInstruction }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { toRefs, reactive, watch } from "vue";
import moment from "moment";

export default {
  name: "ShowAudit",
  props: {
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
      // 中心审核对象
      eventAuditVO: null,
    });

    watch(
      () => props.details,
      (details) => {
        state.eventAuditVO = reactive(JSON.parse(JSON.stringify(details)));
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
