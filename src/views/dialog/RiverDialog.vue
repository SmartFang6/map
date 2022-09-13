<template>
  <div class="map-pop">
    <div class="header_title">{{ props.info?.name }}</div>
    <div class="pop-body">
      <ul>
        <li class="right-li">
          <span class="item-label">所属地区：</span>
          <el-tooltip
            :content="props.info?.city"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.city }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">所属流域：</span>
          <el-tooltip :content="props.info?.bas" effect="light" placement="top">
            <span class="item-value">
              {{ props.info?.bas }}
            </span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">平均宽度：</span>
          <el-tooltip
            :content="props.info?.width + 'm'"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.width }}m</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">河流长度：</span>
          <el-tooltip
            :content="props.info?.length + 'km'"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.length }}km</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">起点：</span>
          <el-tooltip
            :content="props.info?.sname"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.sname }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">终点：</span>
          <el-tooltip
            :content="props.info?.ename"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.ename }}</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">水域面积：</span>
          <el-tooltip
            :content="props.info?.area?.toFixed(3) + 'm²'"
            effect="light"
            placement="top"
          >
            <span class="item-value">{{ props.info?.area?.toFixed(3) }}m²</span>
          </el-tooltip>
        </li>
        <li class="right-li">
          <span class="item-label">是否为重要水域：</span>
          <el-tooltip :content="props.info?.imp" effect="light" placement="top">
            <span class="item-value">{{ props.info?.imp }}</span>
          </el-tooltip>
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
    padding: 0 30px;
    li {
      display: flex;
      width: 100%;
      line-height: 30px;
      text-align: left;
      margin-bottom: 15px;
    }
  }

  .item-label {
    width: 130px;
    min-width: 78px;
    height: 30px;
    background: url(@/assets/images/pop-label.png);
    background-size: 100% 100%;
    color: #0adbe0;
    text-align: center;
    flex-shrink: 0;
  }

  .item-value {
    color: white;
    margin-left: 15px;
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
