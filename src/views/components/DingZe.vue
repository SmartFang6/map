<template>
  <div class="responsble">
    <div
      v-for="(item, index) in unitList"
      :key="index"
      :class="['unit-item', getStyle()]"
    >
      <div class="content">
        <div class="name">{{ item.eventResponsibleUnitCodeName }}</div>
        <div class="info">
          <div class="value">
            <span>{{ item.unitEventNum }}</span>
            <span>个</span>
            <span>/</span>
          </div>
          <div class="rate">
            <span>{{ (item.unitCompletedRate * 100).toFixed(0) }}</span>
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";

// 左侧注入数据
const leftData = inject("leftData");

// 责任单位列表
const unitList = computed(() => {
  if (!leftData || !leftData.value.eventResponsibleUnitList) {
    return [];
  }
  return leftData.value.eventResponsibleUnitList;
});

let i = -1;
const styles = ["style1", "style2", "style3", "style4"];
const getStyle = () => {
  if (i >= 3) {
    i = 0;
    return styles[0];
  }
  i++;
  return styles[i];
};
</script>

<style lang="less" scoped>
.responsble {
  width: 100%;
  flex: 1;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: 2px;
  overflow: hidden;
}
.unit-item {
  width: 49%;
  height: 44px;
  margin: 6px 0;
  display: flex;
  align-items: center;
  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 219px;
    height: 44px;
    margin-left: 10px;
    background: url(@/assets/images/responsble-unit-bg.png);
    background-size: contain;
    box-sizing: border-box;
    padding: 0px 10px 0 17px;
    overflow: hidden;
    .name {
      font-family: FZZDHJW;
      font-size: 20px;
      padding-top: 6px;
      color: #fff;
      text-shadow: 0px 3px 3px rgba(0, 12, 59, 0.5);
      text-align: left;
      line-height: 20px;
    }
    .info {
      width: 120px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-shadow: 0px 3px 3px rgba(0, 12, 59, 0.5);
    }
    .value {
      color: #00d4f4;
      font-size: 26px;
      font-family: AGENCYB;
      display: flex;
      width: 60px;
      justify-content: flex-end;
      & > span:nth-child(1) {
        display: flex;
        align-items: flex-end;
      }
      & > span:nth-child(2) {
        font-size: 18px;
        padding-left: 3px;
        padding-right: 2px;
        display: flex;
        align-items: flex-end;
        padding-bottom: 3.5px;
      }
      & > span:nth-child(3) {
        font-family: MicrosoftYaHei;
        font-size: 24px;
        font-weight: 100;
      }
    }
    .rate {
      color: #a3efff;
      font-family: AGENCYB;
      display: flex;
      align-items: flex-end;
      padding-left: 4px;
      & > span:nth-child(1) {
        font-size: 26px;
        padding-top: 3px;
      }
      & > span:nth-child(2) {
        font-weight: 100;
        font-size: 18px;
        padding-left: 3px;
        padding-bottom: 1.5px;
      }
    }
  }
}
.style1 {
  &:before {
    margin-left: 7px;
    display: block;
    content: "";
    width: 2px;
    height: 44px;
    background: url(@/assets/images/responsble-unit-style-1.png);
    background-size: contain;
  }
  &:after {
    margin-left: 7px;
    display: block;
    content: "";
    width: 2px;
    height: 44px;
  }
}
.style2 {
  margin-left: -2px;
  &:after {
    margin-left: 10px;
    display: block;
    content: "";
    width: 2px;
    height: 44px;
    background: url(@/assets/images/responsble-unit-style-2.png);
  }
}
.style3 {
  &:before {
    margin-left: 7px;
    display: block;
    content: "";
    width: 2px;
    height: 44px;
  }
  &:after {
    margin-left: 7px;
    display: block;
    content: "";
    width: 2px;
    height: 44px;
    background: url(@/assets/images/responsble-unit-style-1.png);
    background-size: contain;
  }
}
.style4 {
  margin-left: -2px;
  &:after {
    margin-left: 10px;
    display: block;
    content: "";
    width: 2px;
    height: 44px;
  }
}
</style>
