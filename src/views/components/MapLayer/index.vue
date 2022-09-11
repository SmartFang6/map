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
          :class="{ item: true, active: currentLayerType === item.value }"
          @click="onChangeLayer(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="close" @click="layerActive = false">
        <img src="@/assets/images/chart-arrow-up.png" />
      </div>
    </div>

    <WatersDescriptionDialog v-model:visible="watersDescriptionDialogVisible" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import WatersDescriptionDialog from "./WatersDescriptionDialog.vue";

// 事件
const emits = defineEmits(["changeLayer"]);

// 是否显示水域概况弹窗
const watersDescriptionDialogVisible = ref(false);

// 专题图是否激活
const layerActive = ref(false);

// 图层类型
const layerTypes = [
  {
    title: "水域调查",
    items: [
      {
        label: "河道",
        value: "riverLayer",
      },
      {
        label: "水库",
        value: "reservoirLayer",
      },
      {
        label: "山塘",
        value: "hillpondLayer",
      },
      {
        label: "湖泊",
        value: "lakeLayer",
      },
      {
        label: "人工水道",
        value: "canalLayer",
      },
      {
        label: "其他水域",
        value: "otherwaterLayer",
      },
    ],
  },
  {
    title: "涉水项目",
    items: [
      {
        label: "完工",
        value: "finishedProj",
      },
      {
        label: "在建",
        value: "buildingProj",
      },
    ],
  },
  {
    title: "监测点",
    items: [
      {
        label: "视频点",
        value: "videoLayer",
      },
      {
        label: "水质断面",
        value: "sectionLayer",
      },
    ],
  },
];

// 当前选中的图层类型
const currentLayerType = ref("");

// 图层切换
const onChangeLayer = (layer) => {
  currentLayerType.value = layer;
  emits("changeLayer", layer);
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
</style>
