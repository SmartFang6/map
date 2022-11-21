<!--------------------------------------------
 ¦ 地图图层
 ¦ 文件描述
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-23
 ¦------------------------------------------->

<template>
  <div class="map-layer">
    <div class="btns" v-if="showLayers.length > 0">
      <div
        :class="{ btn: true, active: layerActive }"
        @click="onTriggerLayerActive"
      >
        <img src="@/assets/images/chart-types.png" />
        <span>专题图</span>
      </div>
      <div
        class="layer-types"
        :style="{
          '--titleLen': layerLength,
        }"
        :class="layerActive ? '' : 'h0'"
      >
        <div
          v-for="(layer, index) in layerTypes"
          :key="index"
          class="layer-type-item"
        >
          <div class="title" v-if="isShowLayerTitle(layer)">
            {{ layer.title }}
          </div>
          <template v-for="(item, i) in layer.items" :key="i">
            <div
              v-if="showLayers.includes(item.value)"
              :class="{ item: true, active: selectLayers.includes(item.value) }"
              @click="onSelectLayers(item, index)"
            >
              {{ item.label }}
            </div>
          </template>
        </div>
        <div class="close" @click="onTriggerLayerActive">
          <img src="@/assets/images/chart-arrow-up.png" />
        </div>
      </div>
      <!-- 暂时注释掉 等水域年报上线后展示 -->
      <!-- <div
        class="btn"
        @click1="watersDescriptionDialogVisible = true"
        @click="emits('showDesc')"
      >
        <img src="@/assets/images/chart-description.png" />
        <span>水域概况</span>
      </div> -->
    </div>
    <div class="btn" @click="patrolTheRiver">AI智能巡河</div>
    <el-dialog v-model="dialogVisible" width="95%">
      <div v-if="dialogVisible">
        <iframe src="" frameborder="0"></iframe>
      </div>
    </el-dialog>
    <WatersDescriptionDialog v-model:visible="watersDescriptionDialogVisible" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import layerTypes from "./layerTypes.js";
import WatersDescriptionDialog from "./WatersDescriptionDialog.vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { loadScriptString } from "@/utils";
import { getDictList, getCustomTicket } from "@/apis/common";

const store = useStore();

// 显示的长度
const layerLength = computed(() => {
  let titleLen = layerTypes.reduce((pre, cur) => {
    let l = isShowLayerTitle(cur);
    return pre + (l ? 1 : 0);
  }, 0);
  return (
    titleLen +
    layerTypes.reduce((pre, cur) => {
      let l = cur.items.filter((i) => {
        return showLayers.value.includes(i.value);
      });
      return pre + l.length;
    }, 0)
  );
});

// 是否显示表头
const isShowLayerTitle = (items) => {
  let l = items.items.filter((i) => {
    return showLayers.value.includes(i.value);
  });
  return l.length > 0;
};
// 事件
const emits = defineEmits(["selectLayers", "showDesc"]);

// 是否显示水域概况弹窗
const watersDescriptionDialogVisible = ref(false);

// 专题图是否激活
const layerActive = ref(false);

// 当前选中的图层类型
const selectLayers = ref([]);

// 当前选中的图层类型索引
let selectLayersTypeIndex = null;

// 图层切换 图层value ,图层图例legend
const onSelectLayers = (item, index) => {
  if (selectLayersTypeIndex !== index) {
    selectLayers.value = [];
  }
  selectLayersTypeIndex = index;
  const existIndex = selectLayers.value?.findIndex(
    (curr) => curr === item.value
  );
  if (existIndex > -1) {
    selectLayers.value.splice(existIndex, 1);
  } else {
    selectLayers.value.push(item.value);
    loadScriptString();
  }
  emits("selectLayers", {
    layerInfos: selectLayers.value.length > 0 ? item : [],
    selectLayers: selectLayers.value,
  });
};

// 图层开关
const onTriggerLayerActive = () => {
  if (!(layerActive.value = !layerActive.value)) {
    // 关闭时清空数据
    selectLayers.value = [];
    selectLayersTypeIndex = null;
    emits("selectLayers", {
      layerInfos: {},
      selectLayers: ["pointLayer"],
    });
  } else {
    store.commit("UPDATE_LAYOUT", {
      bottom: "close",
    });
  }
};
// 可以显示的图层
const showLayers = ref([]);
// 获取图层字典列表
const getLayerDict = async () => {
  try {
    let tableColumnCodes = "water_one_cockpit_layer:layer_code";
    let res = await getDictList({
      tableColumnCodes,
    });
    showLayers.value = res[tableColumnCodes].map((i) => {
      return i.eucd;
    });
  } catch (error) {
    console.log(error);
  }
};
getLayerDict();
const dialogVisible = ref(false);
const iframeUrl = ref("");
// ai 巡河
const patrolTheRiver = () => {
  getCustomTicket({
    adcd: "331181",
    trueName: store.state.userInfo?.trueName || "",
    userName: store.state.userInfo?.userName || "",
  }).then((res) => {
    console.log("getCustomTicket", res);
    if (res.message) {
      iframeUrl.value = `https://lqai.dcyun.com:9777/patrol-lq/index.html?ticket=${res.message}&title=%E6%B0%B4%E5%9F%9F%E7%9B%91%E7%AE%A1%E6%99%BA%E8%83%BD%E5%B7%A1%E6%B2%B3&userId=longquanshi&mapCenter=119.13678302089386,28.07794980954407`;
    } else {
      ElMessage.error("一键巡河票据获取失败,请联系管理员");
    }
  });
};
</script>

<style lang="less" scoped>
.map-layer {
  // width: 830px;
  // height: 83px;
  // margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 193px;
  margin-left: -415px;
  z-index: 100;
}

.btn {
  display: flex;
  align-items: center;
  width: 138px;
  height: 36px;
  margin-top: 10px;
  background: url(@/assets/images/chart-bg.png);
  background-size: 100% 100%;
  padding-left: 19px;
  box-sizing: border-box;
  font-size: 14px;
  color: #7be5ff;
  cursor: pointer;
  user-select: none;
  font-family: MicrosoftYaHei;
  & > span {
    padding-left: 14px;
  }
  &.active {
    background: url(@/assets/images/chart-bg-active.png);
    background-size: 100% 100%;
    color: #fff;
    font-weight: bold;
  }
}
.h0 {
  height: 0 !important;
  padding: 0 !important;
}
.layer-types {
  --titleLen: 9;
  // width: 150px;
  padding-top: 6px;
  background-color: rgba(4, 46, 113, 0.88);
  text-align: left;
  box-sizing: border-box;
  transition: height 0.4s;
  height: calc(26px * var(--titleLen) + 38.5px);
  overflow: hidden;
  .title {
    font-family: YOUSHEBIAOTIHEI;
    font-size: 20px;
    color: #00d4f4;
    padding-left: 14px;
  }
  .item {
    color: #fff;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    cursor: pointer;
    padding: 4px 18px 4px 47px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.active {
      color: #00d4f4;
      &::after {
        display: block;
        content: "";
        background: url(@/assets/images/chart-checked.png);
        background-size: 100% 100%;
        width: 12px;
        height: 8px;
      }
    }
  }
  .close {
    height: 17px;
    margin-top: 10px;
    background: rgba(68, 195, 255, 0.74);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
