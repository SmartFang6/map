<!--****************************************
 *
 *
 * founder: king
 * Date:  29 2022/9/29
 *****************************************-->
<template>
  <div class="add_warp">
    <div class="header">
      <div class="header-content"></div>
      <div class="more"></div>
    </div>
    <div class="content">
      <div class="add-icon" @click="$emit('newBuild')">
        <el-icon>
          <Plus />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
/**

 **/
import { Plus } from "@element-plus/icons-vue";
defineEmits(["newBuild"]);
</script>

<style scoped lang="less">
.add_warp {
  width: 100%;
  height: 33%;
  padding: 8px 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  &:hover {
    background: rgba(227, 227, 227, 0.1);
    transform: translateY(-2px);
    border-radius: 10px;
  }
  .header {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: url(@/assets/images/title-bg.png) no-repeat;
    background-size: 100% 100%;
    padding: 0 30px;
    .header-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      overflow-y: hidden;
      overflow-x: scroll;
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

    .more {
      width: 16px;
      height: 16px;
      margin-right: 8px;
      background: url(@/assets/images/icon-zoom.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .content {
    flex: 1 1 auto;
    width: 100%;
    margin-top: 8px;

    .add-icon {
      cursor: pointer;
      background: rgba(127, 194, 226, 0.12);
      border: 2px dashed #0af0f3;
      border-radius: 8px;
      color: #0af0f3;
      font-size: 32px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
