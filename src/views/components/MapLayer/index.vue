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
        @click="layerActive = !layerActive"
      >
        <img src="@/assets/images/chart-types.png" />
        <span>专题图</span>
      </div>
      <div class="btn" @click="watersDescriptionDialogVisible = true">
        <img src="@/assets/images/chart-description.png" />
        <span>水域概况</span>
      </div>
    </div>
    <div v-if="layerActive" class="layer-types">
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
      <div class="close" @click="layerActive = false">
        <img src="@/assets/images/chart-arrow-up.png" />
      </div>
    </div>

    <WatersDescriptionDialog v-model:visible="watersDescriptionDialogVisible" />

    <!--#region 选中河道图层时显示过滤线-->
    <div v-if="mapLineFilterVisible" class="map-line-filter">
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

// 只有河道需要显示线条图层
const mapLineFilterVisible = computed(() => {
  return !!selectLayers.value.find((layer) => layer === "riverLayer");
});

// 河道线数据集
const mapLineFilterData = ref({
  // 管理线范围
  lineManageLayer: false,
  // 临水线
  lineWaterLayer: false,
  // 中心线
  lineCenterLayer: false,
});

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
    emits("changeLegend", {
      layerName: "riverLayer",
      legend: legends,
    });
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
  /*
  if (legends.value.length > 0) {
    emits(
      "selectLayers",
      selectLayers.value.map((layer) => {
        return {
          layerName: layer,
          legend: layer === "riverLayer" ? legends.value : [],
        };
      })
    );
  } else {
    emits("selectLayers", selectLayers.value);
  }*/
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
  width: 138px;
  height: 36px;
  background: url(@/assets/images/chart-bg.png);
  display: flex;
  align-items: center;
  padding-left: 19px;
  box-sizing: border-box;
  font-size: 14px;
  color: #7be5ff;
  cursor: pointer;
  font-family: MicrosoftYaHei;
  margin-bottom: 10px;
  & > span {
    padding-left: 14px;
  }
  &.active {
    background: url(@/assets/images/chart-bg-active.png);
    color: #fff;
    font-weight: bold;
  }
}

.layer-types {
  margin-left: 5px;
  width: 150px;
  background-color: rgba(4, 46, 113, 0.88);
  text-align: left;
  box-sizing: border-box;
  padding-top: 20px;
  .title {
    font-family: YOUSHEBIAOTIHEI;
    font-size: 24px;
    color: #00d4f4;
    padding-left: 14px;
  }
  .item {
    color: #fff;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    cursor: pointer;
    padding: 3.5px 18px 3.5px 47px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.active {
      color: #00d4f4;
      &::after {
        display: block;
        content: "";
        background: url(@/assets/images/chart-checked.png);
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
  top: 420px;
  z-index: 100;
  padding: 20px;
  background-color: rgba(4, 46, 113, 0.88);
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
