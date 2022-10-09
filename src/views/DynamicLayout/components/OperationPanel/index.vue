<!--****************************************
 * 操作面板
 *
 * founder: king
 * Date:  28 2022/9/28
 *****************************************-->
<template>
  <div class="warp">
    <div class="left-warp">
      <template v-for="side in layoutView.left" :key="side?.id">
        <AddSideUI />
      </template>
      <AddSideUI
        v-if="layoutView.right?.length < 3"
        @newBuild="addSide({ location: 'left' })"
      />
    </div>
    <div class="right-warp">
      <template v-for="side in layoutView.right" :key="side?.id">
        <AddSideUI />
      </template>
      <AddSideUI
        v-if="layoutView.right?.length < 3"
        @newBuild="addSide({ location: 'right' })"
      />
    </div>
    <el-dialog title="新增组件" v-model="showDialog" width="85vw">
      <EditSideWidget
        @submitAdd="submitAddCall"
        :location="newBuildSideLocation"
        @close="showDialog = false"
      />
    </el-dialog>
  </div>
</template>

<script setup>
/**
 操作面板
 **/
import AddSideUI from "./components/AddSideUI";
import EditSideWidget from "./dialog/EditSideWidget";
import { ref } from "vue";
const layoutView = ref({
  left: [],
  right: [],
});

const showDialog = ref(false);
const newBuildSideLocation = ref("");
function addSide(location) {
  showDialog.value = true;
  newBuildSideLocation.value = location;
}

function submitAddCall(payload) {
  showDialog.value = false;
  console.log("widgetConfig", payload);
}
</script>

<style scoped lang="less">
@topH: 60px;
@sideW: 26%;
.warp {
  width: 80vw;
  height: calc(80vw * 1080 / 1920);
  margin: auto;
  border-radius: 10px;
  box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.05);
  position: relative;
  top: 0;
  left: 0;
  background-image: url(~@/assets/images/config/config_bg.png);
  background-size: 80vw calc(80vw * 1080 / 1920);

  .left-warp {
    width: @sideW;
    height: calc(100% - @topH);
    position: absolute;
    top: @topH;
    left: 10px;
  }
  .right-warp {
    width: @sideW;
    height: calc(100% - @topH);
    position: absolute;
    top: @topH;
    right: 10px;
  }
}
</style>
