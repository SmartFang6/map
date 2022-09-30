<!--****************************************
 * 弹窗组件列表
 *
 * founder: king
 * Date:  30 2022/9/30
 *****************************************-->
<template>
  <div class="widget-warp">$END$</div>
</template>

<script setup>
/**
 弹窗组件列表
 **/
</script>

<style scoped lang="less">
.widget-warp {
  overflow-y: scroll;
  overflow-x: hidden;
  //background: #0af0f3;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(243, 243, 243, 0.75);
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.15);
  }
}
</style>
