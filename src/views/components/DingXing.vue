<template>
  <div class="nature">
    <div class="nature-types">
      <div class="nature-item">
        <div class="name">重大</div>
        <div class="value">
          <span>34.21</span>
          <span>%</span>
        </div>
        <div class="num">
          <span>7</span>
          <span>个</span>
        </div>
      </div>

      <div class="nature-item">
        <div class="name">较严重</div>
        <div class="value">
          <span>34.21</span>
          <span>%</span>
        </div>
        <div class="num">
          <span>7</span>
          <span>个</span>
        </div>
      </div>

      <div class="nature-item">
        <div class="name">一般</div>
        <div class="value">
          <span>34.21</span>
          <span>%</span>
        </div>
        <div class="num">
          <span>7</span>
          <span>个</span>
        </div>
      </div>
    </div>
    <div class="funnel-chart" />
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.nature {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.funnel-chart {
  width: 269px;
  height: 225px;
  background: url(@/assets/images/funnel-bg.png);
  background-size: contain;
  position: absolute;
  right: 10px;
  top: 23px;
}
.nature-item {
  width: 223px;
  height: 44px;
  display: flex;
  align-items: center;
  background: url(@/assets/images/funnel-arrow.png);
  background-size: contain;
  box-sizing: border-box;
  margin: 19px 0;
  .name {
    font-size: 18px;
    font-family: FZZYJW;
    color: #fff;
    width: 58px;
  }
  .value {
    width: 110px;
  }
  .value,
  .num {
    & span:first-child {
      color: #ff5080;
      font-family: AGENCYB;
      font-size: 24px;
    }
    & span:last-child {
      color: #fff;
      font-size: 16px;
    }
  }
  &:nth-child(1) {
    margin-top: 23px;
    margin-left: 80px;
  }
  &:nth-child(2) {
    margin-left: 40px;
    .value,
    .num {
      & span:first-child {
        color: #ffd633;
      }
      & span:last-child {
        font-family: MicrosoftYaHei;
      }
    }
  }
  &:nth-child(3) {
    .value,
    .num {
      & span:first-child {
        color: #03ffa9;
      }
      & span:last-child {
        font-family: MicrosoftYaHei;
      }
    }
  }
}
</style>
