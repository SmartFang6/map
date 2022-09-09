<!-- 
    处置绩效-更多 的弹窗组件
-->
<template>
  <div class="more-dialog-container">
    <el-dialog v-model="dialogVisible" width="60%">
      <!--#region 处置绩效图表数据的类型选择区-->
      <div class="more-title">
        <span>处置绩效</span>
        <el-radio-group v-model="radio1" size="large">
          <el-radio-button label="乡镇" />
          <el-radio-button label="部门" />
        </el-radio-group>
      </div>
      <!--#endregion-->

      <!--#region 处置绩效的图标内容区-->
      <div class="more-content">
        <!--#region 销号率排名数据展示区-->
        <div class="completed-rank" ref="completedRank">
          <div class="completed-rank-title">销号率排名</div>
          <div class="progress-wrap">
            <div class="progress-item">
              <i>1</i>
              <p>环南街道</p>
              <el-progress percentage="10" :color="customColor" />
            </div>
          </div>
        </div>
        <!--#endregion-->

        <!--#region 考核排名柱状图展示区-->
        <div class="score-rank" ref="scoreRank"></div>
        <!--#endregion-->
      </div>
      <!--#endregion-->
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// 接收父组件传值
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:visible"]);

// 是否开启弹窗
const dialogVisible = ref(false);

// 监听父组件的开启弹窗参数
watch(
  () => props.visible,
  (visible) => {
    dialogVisible.value = visible;
  },
  {
    immediate: true,
  }
);

// 监听本组件的弹窗展示参数,并同步父组件
watch(
  () => dialogVisible.value,
  (dialogVisible) => {
    if (!dialogVisible) {
      emits("update:visible", false);
    }
  },
  {
    immediate: false,
  }
);
</script>

<style lang="less" scoped>
.more-dialog-container {
  display: block;
  box-sizing: border-box;
  padding: 0 50px;

  :deep(.el-dialog) {
    border: 1px solid #64d2f7;
    color: white;
    background-color: rgba(25, 56, 91, 0.8);
  }
}
</style>
