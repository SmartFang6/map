<!-- 水域调查弹窗 -->
<template>
  <div class="pop">
    <div class="header_title">{{ props.info?.name }}</div>
    <div class="body">
      <div class="tabs">
        <div
          class="tab"
          v-for="item in tabs"
          :class="curTab === item.value ? 'tab_act' : ''"
          :key="item.name"
          @click="switchTab(item.value)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- #region 水域基础信息 -->
    <component :is="curDialogCom" :info="props.info"></component>
    <!-- #endregion -->
    <!-- #region 水域事件 -->

    <!-- #endregion -->
    <!-- #region 涉水项目 -->
    <!-- #endregion -->
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import useHomeDialog from "@/views/components/useHomeDialog.js";
const { curDialogCom, currentDialog } = useHomeDialog();
console.log(curDialogCom.value);
const props = defineProps({
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
// 监听水域类型切换
watch(
  () => props.info,
  () => {
    currentDialog.value = props.info.layerid;
  }
);
// 切换tab
const tabs = ref([
  {
    name: "水域基础信息",
    value: 1,
  },
  {
    name: "水域事件",
    value: 2,
  },
  {
    name: "涉水项目",
    value: 3,
  },
]);
const curTab = ref(1);
const switchTab = (tab) => {
  curTab.value = tab;
};
</script>

<style lang="less" scoped>
.pop {
  .tabs {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    .tab {
      width: 135px;
      height: 27px;
      font-family: YouSheBiaoTiHei;
      font-size: 18px;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
    }
    .tab_act {
      width: 135px;
      height: 27px;
      background: url(@/assets/images/water_tab.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
