<!--------------------------------------------
 ¦ 事件高发排名
 ¦ 文件描述
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-16 16:49:02
 ¦------------------------------------------->

<template>
  <div>
    <Title title="事件高发排名" />
    <div class="top-list">
      <div v-for="item in dataList" :key="item.index" class="top-list-item">
        <div class="index">{{ item.index }}</div>
        <div class="item-content">
          <div class="name">
            <span>{{ item.name }}</span>
            <span>{{ item.value }}</span>
          </div>
          <div class="progress-outer">
            <div class="progress-inner" :style="{ width: `${item.rate}%` }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const dataList = reactive([]);
for (let i = 1; i <= 5; i++) {
  dataList.push({
    index: i,
    name: "乡镇名称展示/企业名称展示",
    value: "23/90%",
    rate: 30,
  });
}
</script>

<style lang="less" scoped>
.top-list {
  padding-top: 13px;
  padding-left: 5px;
  padding-right: 20px;
  color: #c4f0ff;
  font-size: 14px;
  &-item {
    display: flex;
    align-items: center;
    height: 44px;
    margin: 10px 0;
    justify-content: space-between;
    & > .index {
      width: 39px;
      height: 100%;
      font-size: 24px;
      font-family: AGENCYB;
      color: #00f5ff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      & > .index {
        padding-bottom: 21px;
        background: url(@/assets/images/rankings-bottom.png) no-repeat center
          bottom;
      }
    }
    &:nth-child(1) > .index {
      color: #ffcd19;
    }
    &:nth-child(2) > .index {
      color: #dadbdb;
    }
    &:nth-child(3) > .index {
      color: #ac502f;
    }
  }

  .item-content {
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-left: 15px;
    .name {
      display: flex;
      justify-content: space-between;
      padding-bottom: 3px;
    }
  }

  .progress-outer {
    border-radius: 8px;
    height: 16px;
    background: rgba(255, 255, 255, 0.2);
  }

  .progress-inner {
    border-radius: 8px;
    height: 100%;
    background-image: linear-gradient(-18deg, #0adbe0 0%, #14a2d2 100%),
      linear-gradient(90deg, rgba(89, 240, 93, 0.5) 0%, #59f05d 100%);
    background-blend-mode: normal, normal;
  }
}
</style>
