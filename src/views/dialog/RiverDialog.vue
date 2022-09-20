<!-- 河道图层弹窗 -->
<template>
  <div class="map-pop">
    <!-- <div class="header_title">{{ props.info?.name }}</div> -->
    <div class="pop-body">
      <ul>
        <li>
          <span class="label">所属地区：</span>
          <span class="value">{{ props.info?.city }}</span>
        </li>
        <li>
          <span class="label">所属流域：</span>
          <span class="value">
            {{ props.info?.bas }}
          </span>
        </li>
        <li>
          <span class="label">平均宽度：</span>
          <span class="value">{{ props.info?.width?.toFixed(1) }}m</span>
        </li>
        <li>
          <span class="label">河流长度：</span>
          <span class="value">{{ props.info?.length?.toFixed(2) }}km</span>
        </li>
        <li>
          <span class="label">起点：</span>
          <span class="value">{{ props.info?.sname }}</span>
        </li>
        <li>
          <span class="label">终点：</span>
          <span class="value">{{ props.info?.ename }}</span>
        </li>
        <li>
          <span class="label">水域面积：</span>
          <span class="value">{{ props.info?.area?.toFixed(1) }}m²</span>
        </li>
        <li>
          <span class="label">是否为重要水域：</span>
          <span class="value">
            {{ props.info?.imp !== "否" ? "是" : "否" }}
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
    text-align: right;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #ffffff;
    flex-shrink: 0;
  }
}
</style>
