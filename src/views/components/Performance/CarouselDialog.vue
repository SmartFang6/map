<!--
    处理绩效的轮播弹窗组件
-->
<template>
  <div class="carousel-dialog">
    <!--#region 轮播的内容区-->
    <el-dialog
      v-model="dialogVisible"
      width="60%"
      @before-close="onHandleDialogClosed"
    >
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
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
let dialogVisible = ref(false);

// 弹窗关闭前的回调
const onHandleDialogClosed = () => {
  dialogVisible.value = false;
  emits("update:visible", false);
};

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
</script>

<style lang="less" scoped>
.carousel-dialog {
  display: block;

  :deep(.el-carousel__item h3) {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
}
</style>
