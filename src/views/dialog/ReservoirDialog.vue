<!-- 水库图层弹窗 -->
<template>
  <div class="map-pop">
    <div class="header_title">{{ props.info?.name }}</div>
    <div class="pop-body">
      <ul>
        <li>
          <span class="label">水库名称：</span>
          <span class="value">{{ props.info?.name }}</span>
        </li>
        <li>
          <span class="label">水库等级：</span>
          <span class="value">{{ props.info?.type }}</span>
        </li>
        <li>
          <span class="label">所属地区：</span>
          <span class="value">{{ props.info?.city }}</span>
        </li>
        <li>
          <span class="label">所属流域：</span>
          <span class="value">{{ props.info?.bas }}</span>
        </li>
        <li>
          <span class="label">集雨面积：</span>
          <span class="value">
            {{
              Number.isInteger(props.info?.rcarea)
                ? props.info?.rcarea
                : props.info?.rcarea?.toFixed(2)
            }}km²
          </span>
        </li>
        <li>
          <span class="label">正常蓄水位：</span>
          <span class="value">{{ props.info?.npl?.toFixed(1) }}m</span>
        </li>

        <li>
          <span class="label">设计供水位：</span>
          <span class="value">{{ props.info?.dfl?.toFixed(1) }}m</span>
        </li>
        <li>
          <span class="label">校核洪水位：</span>
          <span class="value">{{ props.info?.mfl?.toFixed(1) }}m</span>
        </li>
        <li>
          <span class="label">总库容：</span>
          <span class="value">
            {{
              Number.isInteger(props.info?.tcr)
                ? props.info?.tcr
                : props.info?.tcr?.toFixed(3)
            }}
            万m³
          </span>
        </li>
        <li>
          <span class="label">水域面积：</span>
          <span class="value">{{ props.info?.area?.toFixed(1) }}m²</span>
        </li>
        <li>
          <span class="label">坝顶高程：</span>
          <span class="value">{{ props.info?.ce?.toFixed(1) }}m</span>
        </li>
        <li>
          <span class="label">建成时间：</span>
          <span class="value">{{ props.info?.bldtm }}</span>
        </li>
        <li class="oneLine">
          <span class="label">主要功能：</span>
          <span class="value">{{ props.info?.function }}</span>
        </li>
        <li class="oneLine">
          <span class="label">工程管理单位：</span>
          <span class="value">{{ props.info?.mu }}</span>
        </li>
        <!-- <li>
          <span class="label">监测工程负责人：</span>
          <span class="value">{{ props.info?.fzr || "-" }}</span>
        </li> -->
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
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    li {
      display: flex;
      width: calc(100% / 2 - 5px);
      height: 44px;
      line-height: 44px;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 0 12px;
      background-color: #005273;
      box-shadow: inset 0 2px 1px 0 #0089be;
      text-align: left;
    }
    li:nth-child(2n) {
      margin-right: 0;
    }
    li:last-child {
      .label {
        width: 140px;
      }
    }
    .oneLine {
      width: 100%;
      margin-right: 0;
    }
  }

  .label {
    width: 120px;
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
