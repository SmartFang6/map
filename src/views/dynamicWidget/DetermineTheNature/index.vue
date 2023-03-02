<!--****************************************
 * 事件定性
 *
 * founder: king
 * Date:  11 2022/10/11
 *****************************************-->
<template>
  <div class="nature">
    <div class="nature-types">
      <div class="nature-item" @click="onSetActiveFilter(1)">
        <div class="name">重大</div>
        <div class="value">
          <span>{{ leftData?.serious.rate }}</span>
          <span>%</span>
        </div>
        <div class="num">
          <span>{{ leftData?.serious.value }}</span>
          <span>个</span>
        </div>
      </div>

      <div class="nature-item" @click="onSetActiveFilter(2)">
        <div class="name">较严重</div>
        <div class="value">
          <span>{{ leftData?.lowSerious.rate }}</span>
          <span>%</span>
        </div>
        <div class="num">
          <span>{{ leftData?.lowSerious.value }}</span>
          <span>个</span>
        </div>
      </div>

      <div class="nature-item" @click="onSetActiveFilter(3)">
        <div class="name">一般</div>
        <div class="value">
          <span>{{ leftData?.general.rate }}</span>
          <span>%</span>
        </div>
        <div class="num">
          <span>{{ leftData?.general.value }}</span>
          <span>个</span>
        </div>
      </div>
    </div>
    <div class="funnel-chart" />
  </div>
</template>

<script setup>
/**
 事件定责
 **/
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { getEventStatDistribute } from "@/apis/home";

// 左侧注入数据
const leftData = ref(null);
// 获取左侧栏数据
function getLeftData(dateRange) {
  if (!dateRange) return;
  const params = {
    ...dateRange,
  };
  getEventStatDistribute(params).then((res) => {
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
    if (!res?.eventGradeList) {
      leftData.value = data;
    }
    res.eventGradeList.forEach((grade) => {
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
    leftData.value = data;
  });
}

const store = useStore();
const onSetActiveFilter = (value) => {
  store.commit("UPDATE_ACTIVE_FILTER", {
    type: "eventGradeStatus",
    value,
  });
};

watch(
  () => store?.state?.dateRange,
  (newVal, oldVal) => {
    const val = newVal || oldVal;
    getLeftData(val);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<style lang="less" scoped>
.nature {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.funnel-chart {
  width: 250px;
  height: 200px;
  background: url(@/assets/images/funnel-bg.png);
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  right: 5px;
  top: 0px;
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
  cursor: pointer;
  position: relative;
  z-index: 99;
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
    margin-top: 20px;
    margin-left: 90px;
  }
  &:nth-child(2) {
    margin-left: 45px;
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
