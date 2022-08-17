<template>
  <div class="ProblemSource">
    <Title title="问题来源" />

    <div class="top3">
      <div class="top3-left">
        <ul>
          <li>
            <span class="no">No.</span>
            <span class="no second-number">2</span>
            <span class="second-text">河长巡河</span>
          </li>
          <li>
            <span class="no">No.</span>
            <span class="no second-number">3</span>
            <span class="second-text">AI智能发现</span>
          </li>
        </ul>
      </div>
      <div class="top3-right">
        <div class="first-bg"></div>
        <ul class="first-info">
          <li>
            <span class="no">No.</span>
            <span class="no first-number">1</span>
          </li>
          <li class="first-text">公众举报</li>
        </ul>
      </div>
    </div>

    <!-- echart -->
    <div id="problemEchart"></div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.ProblemSource {
  flex: 1;

  .top3 {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 12px;

    &-left {
      ul {
        height: 98px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      ul > li {
        width: 260px;
        background: url(@/assets/images/problem_source_2.png);
        background-size: 100% 100%;
        text-align: center;
        line-height: 42px;

        .second-number {
          font-size: 24px;
        }

        .second-text {
          font-family: FZZDHJW;
          color: #c4f0ff;
          font-size: 16px;
          margin-left: 10px;
          letter-spacing: 0px;
        }
      }
    }

    &-right {
      width: 100%;
      height: 98px;
      background: url(@/assets/images/problem_source_1.png);
      background-size: 100% 100%;
      margin-left: 10px;
      position: relative;

      .first-bg {
        width: 97px;
        height: 88px;
        background: url(@/assets/images/first_icon.png);
        background-size: 100% 100%;
        margin: 12px 5px;
      }

      .first-info {
        position: absolute;
        right: 30px;
        bottom: 20px;

        li {
          font-size: 20px;
        }
      }

      .first-number {
        font-size: 40px;
      }

      .first-text {
        font-family: FZZDHJW;
        color: #fff;
        font-size: 20px;
      }
    }

    .no {
      font-family: YOUSHEBIAOTIHEI;
      color: #09c4e6;
    }
  }
  #problemEchart {
    width: 100%;
    max-height: 300px;
  }
}
</style>
