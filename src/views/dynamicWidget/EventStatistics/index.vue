<template>
  <div class="event">
    <ul class="content">
      <li
        v-for="(item, idx) in configList"
        :key="idx"
        :class="{
          'content-item': true,
          active:
            activeFilter?.type === 'eventStat' &&
            activeFilter?.value === item.key,
        }"
        @click="
          store.commit('UPDATE_ACTIVE_FILTER', {
            type: 'eventStat',
            value: item.key,
          })
        "
      >
        <img :src="item.icon" alt="icon" class="item-img" />
        <div class="value-wrapper">
          <p>
            <span class="item-value" :title="data?.[item.key] || 0">
              {{ data?.[item.key] || 0 }}
            </span>
            <span class="item-unit">{{ item?.unit }}</span>
          </p>
          <p>{{ item?.label }}</p>
        </div>
      </li>
    </ul>

    <EventStatisticsChart :data="data" />
    <el-dialog
      v-model="showMore"
      width="1140px"
      append-to-body
      destroy-on-close
      top="2vh"
      custom-class="common_dialog"
    >
      <template #header>
        <div class="title">事件统计</div>
      </template>
      <EventDialog />
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import EventStatisticsChart from "./Chart.vue";
import EventDialog from "./EventDialog.vue";
import { useStore } from "vuex";
import { countEventClassCount } from "@/apis/home";

const store = useStore();
const showMore = ref(false);
function openDialog() {
  showMore.value = true;
}
defineExpose({ openDialog });
const data = ref({});
const dateRange = computed(() => store?.state?.dateRange);
watch(
  () => dateRange.value,
  async (dateRange) => {
    if (!dateRange) return;
    data.value = await countEventClassCount({
      ...dateRange,
    });
    console.log(data);
    if (data.value.eventSourceSolveRate) {
      data.value.eventSourceSolveRate =
        data.value.eventSourceSolveRate.toFixed(0);
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

// 激活的过滤器
const activeFilter = computed(() => store.state.activeFilter);

// 数据配置项
let configList = [
  {
    icon: require("@/assets/event-icon/icon_1.png"),
    label: "问题总数",
    unit: "个",
    key: "eventNum",
  },
  {
    icon: require("@/assets/event-icon/icon_2.png"),
    label: "未办结",
    unit: "个",
    key: "eventUnSolveNum",
  },
  {
    icon: require("@/assets/event-icon/icon_3.png"),
    label: "已办结",
    unit: "个",
    key: "eventSolveNum",
  },
  {
    icon: require("@/assets/event-icon/icon_5.png"),
    label: "销号率",
    unit: "%",
    key: "eventSourceSolveRate",
  },
];
</script>

<style lang="less" scoped>
.event {
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
  .content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 0 2px;

    &-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: #91cae8;
    }

    .item-img {
      width: 49px;
      height: 46px;
      opacity: 0.5;
    }

    .item-value {
      display: inline-block;
      font-size: 30px;
      font-family: AGENCYB;
      letter-spacing: 4px;
      color: #0adbe0;
      max-width: 65px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .value-wrapper {
      display: flex;
      margin-left: 4px;
      flex-direction: column;
      & > p:first-child {
        & > span:first-child {
          line-height: 28px;
        }
        align-items: flex-end;
        justify-content: flex-end;
      }
      & > p {
        display: flex;
      }
    }

    .item-unit {
      display: inline-block;
      font-size: 12px;
    }
  }
}
.content-item {
  cursor: pointer;
  box-sizing: border-box;
  border-bottom: solid 4px transparent;
  padding: 0 2.5px 6px;
  &.active {
    background-size: 100%;
    border-bottom: solid 4px #ffe475;
    .item-img {
      opacity: 1;
    }
  }
}
</style>
