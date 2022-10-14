<!-- 湖泊图层弹窗 -->
<template>
  <div class="map-pop">
    <div class="pop-body">
      <ul>
        <li>
          <span class="label">所属地区：</span>
          <span class="value">{{ props.info?.city }}</span>
        </li>
        <li>
          <span class="label">所属流域：</span>
          <span class="value">{{ props.info?.bas }}</span>
        </li>
        <li>
          <span class="label">平均水深：</span>
          <span class="value">{{ props.info?.averdep?.toFixed(2) }}m</span>
        </li>
        <li>
          <span class="label">水域面积：</span>
          <span class="value">{{ props.info?.area?.toFixed(3) }}km²</span>
        </li>
        <li>
          <span class="label">最高允许蓄水位：</span>
          <span class="value">{{ props.info?.masl.toFixed(2) }}m</span>
        </li>
        <li>
          <span class="label">水域容积：</span>
          <span class="value">{{ props.info?.vol?.toFixed(2) }}万m³</span>
        </li>
        <li>
          <span class="label">主要功能：</span>
          <span class="value">
            {{ props.info?.function }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<style lang="less" scoped>
@import url(./waterDialog.less);
.map-pop {
  .label {
    width: 150px;
    min-width: 78px;
    text-align: right;
    font-family: MicrosoftYaHei;
    font-size: 20px;
    color: #ffffff;
    flex-shrink: 0;
  }
}
</style>
