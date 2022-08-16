<!--------------------------------------------
 ¦ 处置绩效
 ¦
 ¦ Author: 大风
 ¦ Date: 2022-08-16 16:41:12
 ¦------------------------------------------->

<template>
  <div class="performance">
    <Title title="处置绩效" />
    <div class="medal-bar">
      <!--#region 第一名-->
      <div class="first">
        <img src="@/assets/images/performance-first.png" />
        <div class="first-info">
          <div class="name">水利局</div>
          <div class="value">
            <span>99</span>
            <span>%</span>
          </div>
        </div>
      </div>
      <!--#endregion-->

      <!--#region 其他-->
      <div class="other">
        <div class="tabs">
          <div class="tab active">销号率排名</div>
          <div class="tab">考核排名</div>
        </div>
        <!--#region 列表-->
        <div class="other-list">
          <div class="other-item">
            <div class="no"><span>No.</span><span>2</span></div>
            <div class="name">建设厅</div>
            <div class="score">
              <span>89</span>
              <span>%</span>
            </div>
          </div>
          <div class="other-item">
            <div class="no"><span>No.</span><span>3</span></div>
            <div class="name">综合办</div>
            <div class="score">
              <span>78</span>
              <span>%</span>
            </div>
          </div>
        </div>
        <!--#endregion-->
      </div>
      <!--#endregion-->
    </div>
  </div>
</template>

<script setup>
import Title from "@/components/Title/index.vue";
</script>

<style lang="less" scoped>
.performance {
  display: flex;
  flex-direction: column;
}

.medal-bar {
  display: flex;
  padding-bottom: 12px;
  justify-content: space-between;
  align-items: flex-end;

  .tabs {
    padding: 10px 0 12px 10px;
    display: flex;
    letter-spacing: 1px;
    color: #c4f0ff;
    font-size: 18px;
    font-family: YOUSHEBIAOTIHEI;
    .tab {
      width: 130px;
      height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .tab.active {
      background: url(@/assets/images/performance-tab-active.png);
    }
  }

  .first {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    padding-bottom: 7px;
    .first-info {
      display: flex;
      padding-left: 15px;
      flex-direction: column;
      align-items: flex-end;
    }
    .name {
      color: #fff;
      font-size: 24px;
      font-family: FZZDHJW;
    }
    .value {
      font-family: AGENCYB;
      & > span:first-child {
        font-size: 36px;
        color: #00f5ff;
      }
      & > span:last-child {
        font-size: 18px;
        color: #c4f0ff;
        padding-left: 3px;
        padding-right: 2px;
      }
    }
  }

  .other {
    &-item {
      width: 263px;
      height: 44px;
      background: url(@/assets/images/medal-bar-item.png);
      background-size: 100%;
      box-sizing: border-box;
      padding-left: 35px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      &:first-child {
        margin-bottom: 20px;
      }
      &:last-child .score > span:first-child {
        color: #ffcd19;
      }
      .no {
        font-family: YOUSHEBIAOTIHEI;
        text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
        background-image: linear-gradient(#0af0f3, #089ddb);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        padding-right: 8px;
        & > span:first-child {
          font-size: 24px;
        }
        & > span:last-child {
          font-size: 36px;
        }
      }
      .name {
        color: #c4f0ff;
        font-size: 18px;
        font-family: FZZDHJW;
        padding-top: 5px;
        padding-right: 18px;
      }
      .score {
        & > span:first-child {
          font-family: AGENCYB;
          font-size: 30px;
          color: #32da85;
        }
        & > span:last-child {
          font-family: AGENCYB;
          color: #c4f0ff;
          font-size: 18px;
          padding-left: 3px;
        }
      }
    }
  }
}
</style>
