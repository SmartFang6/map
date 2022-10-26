<!--****************************************
 *
 *
 * founder: king
 * Date:  29 2022/9/29
 *****************************************-->
<template>
  <div
    class="add_warp"
    :class="{
      'addWarp--left': layout === 'left' && !!widgets?.length,
      'addWarp--right': layout === 'right' && !!widgets?.length,
    }"
  >
    <div class="header">
      <ul class="header-content">
        <li
          v-for="tab in widgets"
          :class="{
            'active--span': activeTabName === tab?.widgetCode,
          }"
          @click="clickMap(tab?.widgetCode)"
          :key="tab?.widgetCode"
        >
          {{ tab?.title }}
        </li>
      </ul>
      <div class="more"></div>
    </div>
    <div class="content">
      <template v-if="!!widgets?.length">
        <img class="content--img" :src="activeTabView?.poster" alt="" />
      </template>
      <div v-else class="add-icon" @click="$emit('newBuild')">
        <el-icon>
          <Plus />
        </el-icon>
      </div>
    </div>
    <div
      class="toolsBox"
      :class="{
        'toolsBox--left': layout === 'left',
        'toolsBox--right': layout === 'right',
      }"
      v-if="!!widgets?.length"
    >
      <el-icon color="#fff" :size="20" @click="$emit('editWidget')">
        <Edit />
      </el-icon>
      <el-icon color="#F56C6C" :size="20" @click="$emit('delWidget')">
        <DeleteFilled />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
/**

 **/
import { Plus, Edit, DeleteFilled } from "@element-plus/icons-vue";
import { computed, ref, watch } from "vue";
defineEmits(["newBuild", "delWidget", "editWidget"]);
const props = defineProps({
  widgets: {
    type: Array,
    default: () => [],
  },
  layout: {
    type: String,
    default: () => "left",
  },
});
const activeTabName = ref(props?.widgets?.[0]?.widgetCode || "");
const activeTabView = computed(() => {
  return props?.widgets.find((item) => item.widgetCode === activeTabName.value);
});
watch(
  () => props.widgets,
  () => {
    activeTabName.value = props?.widgets?.[0]?.widgetCode;
  },
  {
    immediate: true,
    deep: true,
  }
);
const clickMap = (code) => {
  activeTabName.value = code;
};
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
    width: 0px;
    height: 100px;
    background: rgba(227, 227, 227, 0.1);
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    i {
      cursor: pointer;
    }
  }

  .toolsBox--left {
    right: -30px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .toolsBox--right {
    left: -30px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &:hover {
    background: rgba(227, 227, 227, 0.1);
    transform: translateY(-2px);
    border-radius: 10px;
  }
  &:hover .toolsBox {
    width: 30px;
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
.addWarp--left {
  &:hover {
    background: rgba(227, 227, 227, 0.1);
    transform: translateY(-2px);
    border-radius: 10px 0 10px 10px;
  }
}
.addWarp--right {
  &:hover {
    background: rgba(227, 227, 227, 0.1);
    transform: translateY(-2px);
    border-radius: 0 10px 10px 10px;
  }
}
</style>
