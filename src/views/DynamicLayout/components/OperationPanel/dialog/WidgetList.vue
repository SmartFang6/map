<!--****************************************
 * 弹窗组件列表
 *
 * founder: king
 * Date:  30 2022/9/30
 *****************************************-->
<template>
  <div>
    <div class="btn--warp">
      <el-button type="primary" @click="submitWidgets">确认</el-button>
    </div>
    <ul class="widget-warp">
      <li
        class="widget--item_warp"
        v-for="widget in widgetList"
        :key="widget?.widgetCode"
        @click="selectFn(widget)"
      >
        <header>
          <span>{{ widget?.name }}</span>
          <template v-if="selectedWidget?.widgetCode === widget?.widgetCode">
            <el-icon color="#67C23A" :size="25">
              <CircleCheckFilled />
            </el-icon>
          </template>
        </header>
        <img :src="widget?.poster" alt="alt" />
      </li>
    </ul>
  </div>
</template>

<script setup>
/**
 弹窗组件列表
 **/
import { ref } from "vue";
// import widgetList from "@/views/dynamicWidget/config/widgetList";
import { CircleCheckFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { getWidgetList } from "@/apis/dynamicLayout";

const emits = defineEmits(["submitSelect"]);
const props = defineProps({
  filterList: {
    type: Array,
    default: () => [],
  },
});
// 远程组件库列表
const widgetList = ref([]);
const params = {};
getWidgetList(params).then((res) => {
  widgetList.value =
    res?.map((item) => ({
      componentInfoId: item?.id,
      widgetCode: item?.componentCode,
      name: item?.componentName,
      poster: item?.poster,
      getDataUri: item?.requestUrl,
      domainName: item?.domainName, // TODO: 域名(暂时没使用)
      port: item?.port, // TODO: 端口(暂时没使用)
      size: item?.size, // TODO: 组件大小(暂时没使用)
    })) || [];
});
const selectedWidget = ref(null);
const selectFn = (widget) => {
  if (props?.filterList?.includes(widget?.widgetCode)) {
    ElMessage.error("该组件在此模块已使用！");
    return;
  }
  selectedWidget.value = widget;
};
const submitWidgets = () => {
  emits("submitSelect", selectedWidget.value);
};
</script>

<style scoped lang="less">
.btn--warp {
  text-align: left;
  padding: 10px 20px;
}
.widget-warp {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 70vh;
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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  .widget--item_warp {
    cursor: pointer;
    width: 33.3%;
    padding: 0 20px;
    margin-bottom: 10px;
    header {
      text-align: left;
      font-weight: 700;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(to right, #3b76ef 0, transparent 100%);
      color: #fff;
      padding: 0 20px;
      font-size: 16px;
      border-radius: 4px;
    }
    img {
      width: 100%;
      margin-top: 12px;
      border-radius: 12px;
    }
  }
}
</style>
