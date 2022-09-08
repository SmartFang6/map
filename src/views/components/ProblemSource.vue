<template>
  <div class="problem-source">
    <Title title="事件来源">
      <template #more>
        <div class="tools">
          <i class="icon-zoom" />
        </div>
      </template>
    </Title>

    <div v-if="leftData.eventSourceList" class="chart">
      <div class="chart-bg" />
      <div class="total-bubble">
        <div class="bg" />
        <div class="content">
          <div class="value">
            <span>79</span>
            <span>个</span>
          </div>
          <div class="label">事件来源</div>
        </div>
      </div>
      <div class="bubbles">
        <!--只显示6条数据-->
        <div
          v-for="(item, index) in leftData.eventSourceList.filter(
            (d, i) => i <= 5
          )"
          :key="index"
          class="bubble-item"
        >
          <span>{{ item.eventSourceName }}</span>
          <span
            >{{ item.eventSourceNum }}/{{
              (item.eventSourceRate * 100).toFixed(0)
            }}%</span
          >
        </div>
        <div
          v-for="(item, index) in leftData.eventSourceList.filter(
            (d, i) => i <= 1
          )"
          :key="index"
          class="bubble-item"
        >
          <span>{{ item.eventSourceName }}</span>
          <span
            >{{ item.eventSourceNum }}/{{
              (item.eventSourceRate * 100).toFixed(0)
            }}%</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";

// 左侧注入数据
const leftData = inject("leftData");
</script>

<style lang="less" scoped>
.problem-source {
  height: 313px;
  display: flex;
  flex-direction: column;
  :deep(.tools) {
    display: flex;
    position: absolute;
    right: 0;
    padding-right: 48px;

    i[class^="icon-"] {
      margin-left: 20px;
      cursor: pointer;
    }

    i[class^="icon-"]:first-child {
      margin-left: 0;
    }

    .icon-square {
      width: 18px;
      height: 18px;
      background: url(@/assets/images/icon-square.png) no-repeat;
      background-size: 100% 100%;
    }

    .icon-zoom {
      width: 16px;
      height: 16px;
      background: url(@/assets/images/icon-zoom.png) no-repeat;
      background-size: 100% 100%;
    }
  }
}

.chart {
  display: flex;
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
}

.chart-bg {
  margin-top: 52px;
  background: url(@/assets/images/problem-source-chart-bg.png);
  background-size: contain;
  width: 327px;
  height: 176px;
}

.bubble-item {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: url(@/assets/images/bubble-bg.png);
  background-size: contain;
  box-sizing: border-box;
  padding-top: 28px;
  & span:first-child {
    font-size: 20px;
    line-height: 20px;
    color: #fff;
    font-family: YOUSHEBIAOTIHEI;
  }
  & span:last-child {
    font-size: 18px;
    line-height: 18px;
    font-family: AGENCYB;
    color: #03ffa9;
  }
}

.bubbles {
  .bubble-item:nth-child(1) {
    top: 10px;
    left: 65px;
  }
  .bubble-item:nth-child(2) {
    top: 10px;
    left: 317px;
    & span:last-child {
      color: #ff4d65;
    }
  }
  .bubble-item:nth-child(3) {
    top: 89px;
    left: 8px;
    & span:last-child {
      color: #ffd633;
    }
  }
  .bubble-item:nth-child(4) {
    top: 89px;
    left: 380px;
  }
  .bubble-item:nth-child(5) {
    top: 169px;
    left: 65px;
    & span:last-child {
      color: #ff9700;
    }
  }
  .bubble-item:nth-child(6) {
    top: 169px;
    left: 317px;
  }
}

.total-bubble {
  width: 117px;
  height: 117px;
  position: absolute;
  top: 43px;
  left: 170px;
  & > .bg {
    background: url(@/assets/images/total-bubble-bg.png);
    background-size: contain;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  & > .content {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 22px;
    font-family: YOUSHEBIAOTIHEI;
    flex-direction: column;
    & .value {
      display: flex;
    }
    & .value > span:first-child {
      color: #00dcf0;
      font-size: 36px;
      line-height: 20px;
      padding-right: 3px;
    }
  }
}
</style>
