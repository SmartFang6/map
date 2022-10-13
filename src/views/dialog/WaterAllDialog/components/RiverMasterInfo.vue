<!-- #region 河长信息 -->
<template>
  <div class="pop-body">
    <ul class="right_box">
      <li>
        <span class="item-label">河长姓名：</span>
        <span class="item-value">{{ props.info?.eventId ?? "-" }}</span>
      </li>
      <li>
        <span class="item-label">河长级别：</span>
        <span class="item-value">
          {{ props.info?.eventResponsibleUnitCodeName ?? "-" }}
        </span>
      </li>
      <li>
        <span class="item-label">职务：</span>
        <span class="item-value">{{ props.info?.adnm ?? "-" }}</span>
      </li>
      <li>
        <span class="item-label">联系部门：</span>
        <span class="item-value">{{ props.info?.rchnm ?? "-" }}</span>
      </li>
    </ul>
  </div>
  <div class="children_info">
    <div class="info_title">下级河长</div>
    <ul class="children_box">
      <li v-for="item in 10" :key="item">
        <p class="c-grade">事件编号：</p>
        <p class="c-name">张三</p>
      </li>
    </ul>
  </div>
</template>
<!-- #endregion -->

<script setup>
// import { ref } from "vue";
const props = defineProps({
  info: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<style scoped lang="less">
.pop-body {
  display: flex;
  justify-content: space-between;
  max-height: 400px;
  box-sizing: border-box;
}
.right_box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 1;

  li {
    display: flex;
    width: 23.7%;
    height: 44px;
    margin-right: calc(6% / 4);
    line-height: 44px;
    padding: 0 12px;
    background-color: #0b216c;
    box-shadow: inset 0 2px 1px 0 #1642d8;
    text-align: left;
    &:nth-child(4) {
      margin-right: 0;
    }
  }
}
.children_info {
  .info_title {
    font-size: 16px;
    color: #fff;
    margin: 14px 0 10px 0;
  }
}
.children_box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  li {
    display: block;
    margin-bottom: 10px;
    height: 44px;
    padding: 0 12px;
    background-color: #0b216c;
    box-shadow: inset 0 2px 1px 0 #1642d8;
    width: 19%;
    margin-right: calc(4% / 4);
    &:nth-child(5n) {
      margin-right: 0;
    }
    font-size: 14px;
    color: #fff;
  }
  .c-grade {
    padding-top: 6px;
  }
  .c-name {
    margin-top: -6px;
    text-align: right;
  }
}

.item-label {
  min-width: 82px;
  text-align: right;
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #ffffff;
  flex-shrink: 0;
}

.item-value {
  font-family: MicrosoftYaHei;
  font-size: 16px;
  color: #43c7ff;
  margin-left: 12px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden; //溢出内容隐藏
  text-overflow: ellipsis; //文本溢出部分用省略号表示
  display: -webkit-box; //特别显示模式
  -webkit-line-clamp: 2; //行数
  line-clamp: 2;
  -webkit-box-orient: vertical; //盒子中内容竖直排列
}
</style>
