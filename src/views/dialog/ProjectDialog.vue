<!-- 人工水道图层弹窗 -->
<template>
  <div class="map-pop">
    <div class="header_title">涉河许可</div>
    <div class="pop-body">
      <ul>
        <li>
          <span class="label">项目名称：</span>
          <span class="value">{{ props.info?.subjectName }}</span>
        </li>
        <li>
          <span class="label">所在乡镇：</span>
          <span class="value">
            {{ props.info?.town }}
          </span>
        </li>
        <li>
          <span class="label">审批文号：</span>
          <span class="value">
            {{ props.info?.approveNumber }}
          </span>
        </li>
        <li>
          <span class="label">占用单位：</span>
          <span class="value">
            {{ props.info?.bas }}
          </span>
        </li>
        <li>
          <span class="label">批复时间：</span>
          <span class="value">
            {{ props.info?.approveTime }}
          </span>
        </li>
        <li>
          <span class="label">完成时间：</span>
          <span class="value">
            {{ props.info?.bas }}
          </span>
        </li>
        <li>
          <span class="label">占用面积：</span>
          <span class="value">
            {{ props.info?.waterPreArea?.toFixed(3) }}km²
          </span>
        </li>
        <li>
          <span class="label">拟补偿面积：</span>
          <span class="value">
            {{ props.info?.waterPreCompensateArea?.toFixed(1) }}km²
          </span>
        </li>
        <li>
          <span class="label">已补偿面积：</span>
          <span class="value">
            {{ props.info?.waterCompensateArea?.toFixed(2) }}km²
          </span>
        </li>
        <li>
          <span class="label">占用类型：</span>
          <span class="value">
            {{ props.info?.base }}
          </span>
        </li>
        <li>
          <span class="label">占用水域名称：</span>
          <span class="value">
            {{ props.info?.base }}
          </span>
        </li>
        <li>
          <span class="label">水域类型：</span>
          <span class="value">
            {{ props.info?.base }}
          </span>
        </li>
        <li>
          <span class="label">是否占用重要水域：</span>
          <span class="value">
            {{ props.info?.base }}
          </span>
        </li>
        <li>
          <span class="label">实施状态：</span>
          <span class="value">
            {{ props.info?.base }}
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
.map-pop {
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    li {
      display: flex;
      // width: 100%;
      width: 49.5%;
      height: 44px;
      line-height: 44px;
      margin-bottom: 10px;
      padding: 0 12px;
      background-color: #005273;
      box-shadow: inset 0px 2px 1px 0px #0089be;
      text-align: left;
      margin-right: 0.5%;
    }
    li:nth-child(2n) {
      margin-right: 0;
    }
  }

  .label {
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
