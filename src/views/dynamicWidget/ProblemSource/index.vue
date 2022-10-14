<!--****************************************
 * 问题来源
 *
 * founder: king
 * Date:  09 2022/10/9
 *****************************************-->
<template>
  <div class="problem-source">
    <div v-if="leftData?.eventSourceList" class="chart">
      <div class="chart-bg" />
      <div class="total-bubble">
        <div class="bg" />
        <div class="content">
          <div class="value">
            <span>{{ total }}</span>
            <span>个</span>
          </div>
          <div class="label">事件来源</div>
        </div>
      </div>
      <div class="bubbles">
        <!--只显示6条数据-->
        <div
          v-for="(item, index) in leftData?.eventSourceList.filter(
            (d, i) => i <= 5
          )"
          :key="index"
          :class="{
            'bubble-item': true,
            active:
              activeFilter?.type === 'eventSource' &&
              activeFilter?.value === item.eventSource,
          }"
          @click="
            store.commit('UPDATE_ACTIVE_FILTER', {
              type: 'eventSource',
              value: item?.eventSource,
            })
          "
        >
          <span>{{ item?.eventSourceName }}</span>
          <span>
            {{ item?.eventSourceNum }}/{{
              ((item?.eventSourceRate || 0) * 100).toFixed(0)
            }}%
          </span>
        </div>
      </div>
    </div>
    <el-empty v-else description="暂无数据" class="dc-empty" />
    <el-dialog
      v-model="show"
      width="75%"
      append-to-body
      destroy-on-close
      custom-class="common_dialog"
    >
      <EventSource />
    </el-dialog>
  </div>
</template>

<script setup>
/**
 问题来源
 **/
import EventSource from "@/views/dialog/EventSource";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { getEventStat } from "@/apis/home";

const store = useStore();
const show = ref(false);
function openDialog() {
  show.value = true;
}
defineExpose({ openDialog });
// 左侧注入数据
const leftData = ref(null);
// 获取左侧栏数据
function getLeftData(dateRange) {
  if (!dateRange) return;
  const params = {
    ...dateRange,
  };
  getEventStat(params).then((res) => {
    // 事件统计平均耗时（小时）转（天 ）
    res.eventStatEvent.completedAverageCostTime = parseInt(
      (res?.eventStatEvent?.completedAverageCostTime || 0) / 24
    );
    // 事件统计消耗率转百分比
    res.eventStatEvent.completedRate = (
      (res?.eventStatEvent?.completedRate || 0) * 100
    ).toFixed(0);
    leftData.value = res;
  });
}
// 活动的过滤器
const activeFilter = computed(() => store.state.activeFilter);

// 来源总数
const total = computed(() => {
  return leftData.value?.eventSourceList?.[0]?.allNum || 0;
});
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
getLeftData(store?.state?.dateRange);
</script>

<style lang="less" scoped>
.problem-source {
  // :deep(.el-empty__image) {
  //   opacity: 0.5;
  // }
  height: 100%;
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
  cursor: pointer;
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(@/assets/images/bubble-bg.png);
  background-size: contain;
  &.active {
    background-image: url(@/assets/images/bubble-checked.png);
  }
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
