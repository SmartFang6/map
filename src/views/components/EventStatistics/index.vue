<template>
  <div class="event">
    <Title title="事件统计" />
    <ul class="content" @click="dialogVisible = true">
      <li class="content-item" v-for="(item, idx) in configList" :key="idx">
        <img :src="item.icon" alt="icon" class="item-img" />
        <div class="value-wrapper">
          <p>
            <span class="item-value" :title="eventStatEvent?.[item.key] || 0">
              {{ eventStatEvent?.[item.key] || 0 }}
            </span>
            <span class="item-unit">{{ item?.unit }}</span>
          </p>
          <p>{{ item?.label }}</p>
        </div>
      </li>
    </ul>

    <EventStatisticsChart />
    <el-dialog
      v-model="dialogVisible"
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
import { inject, computed, ref } from "vue";
import Title from "@/components/Title/index.vue";
import EventStatisticsChart from "./Chart.vue";
import EventDialog from "./EventDialog.vue";
let leftData = inject("leftData");
const dialogVisible = ref(false);
let eventStatEvent = computed(() => {
  return leftData.value?.eventStatEvent;
});

// 数据配置项
let configList = [
  {
    icon: require("@/assets/event-icon/icon_1.png"),
    label: "问题总数",
    unit: "个",
    key: "allNum",
  },
  {
    icon: require("@/assets/event-icon/icon_2.png"),
    label: "未办结",
    unit: "个",
    key: "unCompleteNum",
  },
  {
    icon: require("@/assets/event-icon/icon_3.png"),
    label: "已办结",
    unit: "个",
    key: "completedNum",
  },
  {
    icon: require("@/assets/event-icon/icon_5.png"),
    label: "销号率",
    unit: "%",
    key: "completedRate",
  },
];
</script>

<style lang="less" scoped>
.event {
  height: 315px;
  display: flex;
  flex-direction: column;
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
</style>
