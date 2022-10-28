<!--****************************************
 * 动态加载模版
 *
 * founder: king
 * Date:  10 2022/10/10
 *****************************************-->
<template>
  <div class="add_warp">
    <div class="header">
      <ul class="header-content">
        <li
          v-for="tab in widgetConfig?.widgets"
          :class="{
            'active--span': activeTabName === tab?.widgetCode,
          }"
          @click="clickMap(tab?.widgetCode)"
          :key="tab?.widgetCode"
        >
          {{ tab?.title }}
        </li>
      </ul>
      <div class="more" @click="showDialog"></div>
    </div>
    <div class="content">
      <component :is="activeTabView" ref="childRef" />
    </div>
  </div>
</template>

<script setup>
/**
 动态加载模版
 **/
import { computed, ref, defineAsyncComponent, onMounted } from "vue";
const props = defineProps({
  widgetConfig: {
    type: Object,
    required: true,
  },
});
const childRef = ref(null);
function showDialog() {
  childRef?.value?.openDialog && childRef?.value?.openDialog();
}
defineEmits(["newBuild", "delWidget", "editWidget"]);
const activeTabName = ref("");
const activeTabView = computed(() => {
  if (!activeTabName.value) return;
  const nowWidget = props?.widgetConfig?.widgets.find(
    (item) => item.widgetCode === activeTabName.value
  );
  return defineAsyncComponent(() =>
    import(`@/views/dynamicWidget/${nowWidget?.widgetCode}/index.vue`)
  );
});
const clickMap = (code) => {
  activeTabName.value = code;
};
onMounted(() => {
  activeTabName.value = props?.widgetConfig?.widgets?.[0]?.widgetCode || "";
});
</script>

<style scoped lang="less">
@header: 50px;
.add_warp {
  width: 100%;
  height: 33%;
  padding: 8px 0;
  position: relative;
  top: 0;
  left: 0;

  .toolsBox {
    position: absolute;
    top: 0;
    right: -30px;
    width: 0px;
    height: 100px;
    background: rgba(227, 227, 227, 0.1);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    i {
      cursor: pointer;
    }
  }
  .header {
    width: 100%;
    height: @header;
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
      margin: 0 10px;
      justify-content: flex-start;
      align-items: center;
      overflow-y: hidden;
      overflow-x: scroll;
      color: #fff;
      li {
        padding-left: 10px;
        font-size: 22px;
        font-family: "YouSheBiaoTiHei";
        opacity: 0.75;
        cursor: pointer;
        white-space: nowrap;
        user-select: none;
      }
      .active--span {
        //font-weight: 700;
        opacity: 1;
      }
      //background: #0af0f3;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 6px;
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
    height: calc(100% - @header);
    width: 100%;
    margin-top: 8px;

    .content--img {
      width: 100%;
      height: 100%;
    }

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
