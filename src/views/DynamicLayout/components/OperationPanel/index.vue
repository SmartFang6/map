<!--****************************************
 * 操作面板
 *
 * founder: king
 * Date:  28 2022/9/28
 *****************************************-->
<template>
  <div class="warp">
    <div class="left-warp">
      <template v-for="(side, idx) in layoutView.left" :key="side?.id">
        <AddSideUI
          :widgets="side?.widgets"
          @delWidget="delWidgetCall('left', idx)"
          @editWidget="editWidgetCall('left', side?.widgets, idx)"
        />
      </template>
      <AddSideUI
        v-if="layoutView.right?.length < 3"
        @newBuild="addSide({ location: 'left' })"
      />
    </div>
    <div class="right-warp">
      <template v-for="(side, idx) in layoutView.right" :key="side?.id">
        <AddSideUI
          :widgets="side?.widgets"
          layout="right"
          @delWidget="delWidgetCall('right', idx)"
          @editWidget="editWidgetCall('right', side?.widgets, idx)"
        />
      </template>
      <AddSideUI
        v-if="layoutView.right?.length < 3"
        @newBuild="addSide({ location: 'right' })"
      />
    </div>
    <div class="map">
      <CenterToolsBar />
      <!-- 图层切换 -->
      <MapLayer />
      <Map ref="mapRef" />
    </div>
    <el-dialog v-model="showDialog" width="85vw" destroy-on-close>
      <template #title>
        <header class="addWidgets--header">新增组件</header>
      </template>
      <EditSideWidget
        @submitAdd="submitAddCall"
        :nowSide="nowSide"
        @close="showDialog = false"
      />
    </el-dialog>
  </div>
</template>

<script setup>
/**
 操作面板
 **/
import Map from "@/views/OLMap/MainMap";
import MapLayer from "@/views/components/MapLayer/index.vue";
import CenterToolsBar from "@/views/components/CenterToolsBar.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import AddSideUI from "./components/AddSideUI";
import EditSideWidget from "./dialog/EditSideWidget";
// import { ref, defineAsyncComponent } from "vue";
import { reactive, ref, watch } from "vue";

const emits = defineEmits(["updateConfig"]);
const layoutView = reactive({
  left: [],
  right: [],
});
function clearConfig() {
  layoutView.left = [];
  layoutView.right = [];
}
defineExpose({
  clearConfig,
});
watch(
  () => layoutView,
  (newVal, oldVal) => {
    const payload = newVal || oldVal;
    emits("updateConfig", payload);
  },
  {
    immediate: true,
    deep: true,
  }
);
const showDialog = ref(false);
const nowSide = reactive({
  type: "add",
  location: "",
  idx: null,
  widgets: [],
});
function addSide({ location }) {
  showDialog.value = true;
  nowSide.location = location;
  nowSide.widgets = [];
  nowSide.type = "add";
}

function editWidgetCall(location, widgets, idx) {
  nowSide.location = location;
  nowSide.widgets = widgets;
  nowSide.type = "edit";
  nowSide.idx = idx;
  showDialog.value = true;
}

function delWidgetCall(location, idx) {
  ElMessageBox.confirm("是否删除？", "", {
    confirmButtonText: "删除",
  }).then(() => {
    ElMessage.success("已删除！");
    layoutView[location].splice(idx, 1);
  });
}

function submitAddCall(payload) {
  showDialog.value = false;
  const { widgets } = payload;
  nowSide.widgets = widgets;
  if (nowSide.type === "add") {
    layoutView[nowSide.location].push({
      widgets: widgets,
    });
  } else if (nowSide.type === "edit") {
    layoutView[nowSide.location][nowSide.idx].widgets = widgets;
  }
}
</script>

<style scoped lang="less">
@topH: 60px;
@sideW: 26%;
.warp {
  //width: 80vw;
  //height: calc(80vw * 1080 / 1920);
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  top: 0;
  left: 0;
  background-size: 100% 100%;

  .left-warp {
    width: @sideW;
    height: calc(100% - @topH);
    position: absolute;
    top: @topH;
    left: 10px;
    z-index: 1;
  }
  .right-warp {
    width: @sideW;
    height: calc(100% - @topH);
    position: absolute;
    top: @topH;
    right: 10px;
    z-index: 1;
  }
  .map {
    border-top: 1px solid transparent;
    width: 100%;
    height: 100%;
  }
}
.addWidgets--header {
  text-align: left;
  font-size: 20px;
  font-weight: 700;
}
</style>
