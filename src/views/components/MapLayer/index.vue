<!--------------------------------------------
 ¦ 地图图层
 ¦ 文件描述
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-23
 ¦------------------------------------------->

<template>
  <div class="map-layer">
    <div class="btns">
      <div
        :class="{ btn: true, active: layerActive }"
        @click="onTriggerLayerActive"
      >
        <img src="@/assets/images/chart-types.png" />
        <span>专题图</span>
      </div>
      <div class="layer-types" :class="layerActive ? '' : 'h0'">
        <div
          v-for="(layer, index) in layerTypes"
          :key="index"
          class="layer-type-item"
        >
          <div class="title">{{ layer.title }}</div>
          <div
            v-for="(item, i) in layer.items"
            :key="i"
            :class="{ item: true, active: selectLayers.includes(item.value) }"
            @click="onSelectLayers(item.value, index)"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="close" @click="onTriggerLayerActive">
          <img src="@/assets/images/chart-arrow-up.png" />
        </div>
      </div>
      <div class="btn" @click="watersDescriptionDialogVisible = true">
        <img src="@/assets/images/chart-description.png" />
        <span>水域概况</span>
      </div>
    </div>

    <WatersDescriptionDialog v-model:visible="watersDescriptionDialogVisible" />

    <!--#region 选中河道图层时显示过滤线-->
    <div v-if="mapLineFilterVisible" :class="['map-line-filter', legendsStyle]">
      <el-checkbox v-model="mapLineFilterData.lineManageLayer">
        <i class="red" />
        <span>管理范围线</span>
      </el-checkbox>
      <el-checkbox v-model="mapLineFilterData.lineWaterLayer">
        <i class="yellow" />
        <span>临水线</span>
      </el-checkbox>
      <el-checkbox v-model="mapLineFilterData.lineCenterLayer">
        <i class="orange" />
        <span>中心线</span>
      </el-checkbox>
    </div>
    <!--#endregion-->
  </div>
</template>

<script setup>
import layerTypes from "./layerTypes.js";
import { ref, computed, watch } from "vue";
import WatersDescriptionDialog from "./WatersDescriptionDialog.vue";
import { useStore } from "vuex";

const store = useStore();

// 图例样式（根据底部问题清单是否收起判断用什么样式)
const legendsStyle = computed(() =>
  store.state?.layout?.bottom === "open" ? "default" : "bottom"
);

// 事件
const emits = defineEmits(["selectLayers", "changeLegend"]);

// 是否显示水域概况弹窗
const watersDescriptionDialogVisible = ref(false);

// 专题图是否激活
const layerActive = ref(false);

// 当前选中的图层类型
const selectLayers = ref([]);

// 当前选中的图层类型索引
let selectLayersTypeIndex = null;

// 河道线数据集
const mapLineFilterData = ref({
  // 管理线范围
  lineManageLayer: false,
  // 临水线
  lineWaterLayer: false,
  // 中心线
  lineCenterLayer: false,
});

// 只有水域调查图层才有三条线
const mapLineFilterVisible = computed(() =>
  selectLayers.value.some((selected) =>
    layerTypes[0].items.find((type) => type.value === selected)
  )
);

// 如果不需要显示河道线，则重置选中数据
watch(
  () => mapLineFilterVisible.value,
  (mapLineFilterVisible) => {
    if (!mapLineFilterVisible) {
      mapLineFilterData.value.lineManageLayer = false;
      mapLineFilterData.value.lineWaterLayer = false;
      mapLineFilterData.value.lineCenterLayer = false;
    }
  }
);

// mapLineFilterData 转 地图所需数据
const legends = computed(() => {
  const legends = [];
  Object.keys(mapLineFilterData.value).forEach((key) => {
    if (mapLineFilterData.value[key]) {
      legends.push(key);
    }
  });
  return legends;
});

// 河道线改变触发select事件
watch(
  () => legends.value,
  (legends) => {
    if (mapLineFilterVisible.value) {
      emits("changeLegend", {
        layerName: "riverLayer",
        legend: legends,
      });
    }
  },
  { deep: true }
);

// 图层切换
const onSelectLayers = (layer, index) => {
  if (selectLayersTypeIndex !== index) {
    selectLayers.value = [];
  }
  selectLayersTypeIndex = index;
  const existIndex = selectLayers.value?.findIndex((curr) => curr === layer);
  if (existIndex > -1) {
    selectLayers.value.splice(existIndex, 1);
  } else {
    selectLayers.value.push(layer);
  }
  emits("selectLayers", selectLayers.value);
};

// 图层开关
const onTriggerLayerActive = () => {
  if (!(layerActive.value = !layerActive.value)) {
    // 关闭时清空数据
    selectLayers.value = [];
    selectLayersTypeIndex = null;
    emits("selectLayers", ["pointLayer"]);
  } else {
    store.commit("UPDATE_LAYOUT", {
      bottom: "close",
    });
  }
};
</script>

<style lang="less" scoped>
.map-layer {
  // width: 830px;
  // height: 83px;
  // margin: 0 auto;
  display: flex;
  position: absolute;
  left: 50%;
  top: 193px;
  margin-left: -415px;
  z-index: 100;
}

.btns > .btn {
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
  // width: 150px;
  padding-top: 6px;
  background-color: rgba(4, 46, 113, 0.88);
  text-align: left;
  box-sizing: border-box;
  transition: height 0.4s;
  height: 81%;
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

.map-line-filter {
  display: flex;
  flex-direction: column;
  @width: 170px;
  width: @width;
  height: 130px;
  box-sizing: border-box;
  position: absolute;
  left: calc(830px - @width);
  z-index: 100;
  padding: 20px;
  background-color: rgba(4, 46, 113, 0.88);
  transition: all 0.5s;
  &.default {
    top: 420px;
  }
  &.bottom {
    top: 650px;
  }
  :deep(.el-checkbox) {
    color: #fff;
  }
  :deep(.el-checkbox__inner) {
    background: transparent;
    border-color: #64d2f7;
  }
  :deep(.el-checkbox__label) {
    display: flex;
    align-items: center;
    i {
      display: block;
      width: 20px;
      height: 12px;
      &.red {
        background: rgb(255, 77, 101);
      }
      &.yellow {
        background: rgb(255, 214, 51);
      }
      &.orange {
        background: rgb(255, 151, 0);
      }
    }
    span {
      margin-left: 8px;
    }
  }
}
</style>
