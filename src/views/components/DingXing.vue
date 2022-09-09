<template>
  <div class="nature">
    <div class="nature-types">
      <div class="nature-item">
        <div class="name">重大</div>
        <div class="value">
          <span>{{ data.serious.rate }}</span>
          <span>%</span>
        </div>
        <div class="num">
          <span>{{ data.serious.value }}</span>
          <span>个</span>
        </div>
      </div>

      <div class="nature-item">
        <div class="name">较严重</div>
        <div class="value">
          <span>{{ data.lowSerious.rate }}</span>
          <span>%</span>
        </div>
        <div class="num">
          <span>{{ data.lowSerious.value }}</span>
          <span>个</span>
        </div>
      </div>

      <div class="nature-item">
        <div class="name">一般</div>
        <div class="value">
          <span>{{ data.general.rate }}</span>
          <span>%</span>
        </div>
        <div class="num">
          <span>{{ data.general.value }}</span>
          <span>个</span>
        </div>
      </div>
    </div>
    <div class="funnel-chart" />
  </div>
</template>

<script setup>
import { inject, computed } from "vue";

// 左侧注入数据
const leftData = inject("leftData");

// 定性数据
const data = computed(() => {
  const data = {
    // 一般
    general: {
      value: 0,
      rate: 0,
    },
    // 较严重
    lowSerious: {
      value: 0,
      rate: 0,
    },
    // 重大
    serious: {
      value: 0,
      rate: 0,
    },
  };
  if (!leftData || !leftData.value.eventGradeList) {
    return data;
  }
  leftData.value.eventGradeList.forEach((grade) => {
    if (grade.eventGrade === "1") {
      data.serious.value = grade.eventGradeNum;
      data.serious.rate = (grade.eventGradeRate * 100).toFixed(2);
    } else if (grade.eventGrade === "2") {
      data.lowSerious.value = grade.eventGradeNum;
      data.lowSerious.rate = (grade.eventGradeRate * 100).toFixed(2);
    } else {
      data.general.value = grade.eventGradeNum;
      data.general.rate = (grade.eventGradeRate * 100).toFixed(2);
    }
  });
  return data;
});
</script>

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
