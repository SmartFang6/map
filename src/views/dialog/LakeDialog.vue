<!-- 湖泊图层弹窗 -->
<template>
  <div class="map-pop">
    <div class="header_title">{{ props.info?.name }}</div>
    <div class="pop-body">
      <ul>
        <li>
          <span class="label">所属地区：</span>
          <span class="value">{{ props.info?.city }}</span>
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
          <span class="label">水域面积：</span>
          <span class="value">{{ props.info?.area?.toFixed(1) }}m²</span>
        </li>
        <li>
          <span class="label">最高允许蓄水位：</span>
          <span class="value">{{ props.info?.masl }}</span>
        </li>
        <li>
          <span class="label">水域容积：</span>
          <span class="value">{{ props.info?.vol }}</span>
        </li>
        <li>
          <span class="label">主要功能：</span>
          <span class="value">
            {{ props.info?.function }}
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
.map-pop {
  ul {
    li {
      display: flex;
      width: 100%;
      height: 44px;
      line-height: 44px;
      margin-bottom: 10px;
      padding: 0 12px;
      background-color: #005273;
      box-shadow: inset 0px 2px 1px 0px #0089be;
      text-align: left;
    }
  }

  .label {
    width: 150px;
    min-width: 78px;
    text-align: right;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #ffffff;
    flex-shrink: 0;
  }

  .value {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    color: #00dcf0;
    margin-left: 12px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden; //溢出内容隐藏
    text-overflow: ellipsis; //文本溢出部分用省略号表示
    display: -webkit-box; //特别显示模式
    -webkit-line-clamp: 2; //行数
    line-clamp: 2;
    -webkit-box-orient: vertical; //盒子中内容竖直排列
  }
}
</style>
