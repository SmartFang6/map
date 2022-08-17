<!--------------------------------------------
 ¦ 问题清单
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-16 16:51:12
 ¦------------------------------------------->

<template>
  <div class="problem-list">
    <div class="problem-list-header">
      <div class="shake-hands">
        <div class="custom-select-wrapper">
          <el-select v-if="!collapsed" placeholder="全部" class="custom-select">
            <el-option value="1">111</el-option>
          </el-select>
        </div>
        <div class="title">问题清单</div>
        <div class="operator-wrapper">
          <div class="operator" @click="onPanelTrigger">
            <i :class="{ icon: true, 'is-reverse': !collapsed }" />
            <span>{{ collapsed ? "展开" : "收起" }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
import { ElSelect, ElOption } from "element-plus";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";

const store = useStore();

// 是否折叠
const collapsed = computed(() => {
  return store.state.layout?.bottom === "close" || false;
});

// 展开/收起事件处理
const onPanelTrigger = () => {
  store.commit("UPDATE_LAYOUT", {
    bottom: store.state.layout?.bottom === "close" ? "open" : "close",
  });
};
</script>

<style lang="less" scoped>
.problem-list {
  width: 100%;
  height: 100%;
  background: url(@/assets/images/layout-bottom-bg.png) no-repeat center bottom;
  &-header {
    height: 61px;
    width: 1039px;
    margin: 0 auto;
    background: url(@/assets/images/problem-list-header-bg.png) no-repeat center
      bottom;

    .shake-hands {
      display: flex;
      align-items: center;
      height: 38px;
      width: 622px;
      padding-top: 6px;
      box-sizing: border-box;
      background: url(@/assets/images/problem-list-title.png) no-repeat center
        top;
      margin: 0 auto;
      .title {
        color: #fff;
        font-size: 24px;
        width: 322px;
        font-family: YOUSHEBIAOTIHEI;
      }
      .custom-select-wrapper,
      .operator-wrapper {
        width: 149px;
      }
      .custom-select-wrapper {
        display: flex;
        justify-content: flex-end;
        padding-right: 25px;
        box-sizing: border-box;
      }
      .operator {
        display: flex;
        align-items: center;
        margin-left: 20px;
        cursor: pointer;
        & > i {
          width: 12px;
          height: 7px;
          background: url(@/assets/images/custom-select-arrow-down.png);
          display: block;
          transition: transform var(--el-transition-duration);
          transform: rotateZ(180deg);
          &.is-reverse {
            transform: rotateZ(0deg);
          }
        }
        & > span {
          color: #c4f0ff;
          font-size: 20px;
          font-family: YOUSHEBIAOTIHEI;
          padding-left: 11px;
        }
      }
    }
  }
}

.custom-select {
  --el-input-border: transparent;
  --el-select-input-focus-border-color: transparent;
  --el-select-input-border-color: transparent;
  --el-select-border-color-hover: transparent;
  --el-select-border-color: transparent;
  background-image: url(@/assets/images/custom-select-bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  height: 24px;
  width: 81px;
  :deep(.el-input__inner) {
    background-color: transparent;
    padding-left: 5px;
    height: 24px;
    font-size: 14px;
    &:focus-visible {
      border: none;
      outline: none;
    }
    &::-webkit-input-placeholder {
      color: #c4f0ff;
    }
    &::-moz-placeholder {
      color: #c4f0ff;
    }
    &::-ms-input-placeholder {
      color: #c4f0ff;
    }
  }
  :deep(.el-input__wrapper) {
    background-color: transparent;
    box-shadow: none;
    padding: 0;
    padding-left: 15px;
    padding-right: 10px;
  }
  :deep(.el-select__caret.el-icon) {
    width: 12px;
    height: 7px;
    background: url(@/assets/images/custom-select-arrow-down.png);
    display: block;
    & > svg {
      display: none;
    }
  }
}
</style>
