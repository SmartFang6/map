<!-- 人工水道图层弹窗 -->
<template>
  <div class="map-pop">
    <div class="pop-body">
      <ul>
        <li>
          <span class="label">所属地区：</span>
          <span class="value">{{ props.info?.city }}</span>
        </li>
        <!-- <li>
          <span class="label">所属流域：</span>
          <span class="value">
            {{ props.info?.bas }}
          </span>
        </li> -->
        <li>
          <span class="label">水域面积：</span>
          <span class="value">{{ props.info?.area?.toFixed(3) }}km²</span>
        </li>
        <li>
          <span class="label">水域容积：</span>
          <span class="value">{{ props.info?.vol?.toFixed(2) }}万m³</span>
        </li>
        <li>
          <span class="label">宽度：</span>
          <span class="value">{{ props.info?.width?.toFixed(1) }}m</span>
        </li>
        <li>
          <span class="label">长度：</span>
          <span class="value">{{ props.info?.length?.toFixed(2) }}km</span>
        </li>
        <li>
          <span class="label">类别：</span>
          <span class="value">
            {{ props.info?.type }}
          </span>
        </li>
      </ul>
    </div>
    <!-- 详情入口 -->
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
    width: 98px;
    min-width: 78px;
    text-align: right;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #ffffff;
    flex-shrink: 0;
  }
}
</style>
