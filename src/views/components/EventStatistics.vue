<template>
  <div class="event">
    <Title title="事件统计" />
    <ul class="content">
      <li class="content-item" v-for="(item, idx) in configList" :key="idx">
        <img :src="item.icon" alt="icon" class="item-img" />
        <div>
          <p>
            <span class="item-value" :title="eventStatEvent?.[item.key] || 0">{{
              eventStatEvent?.[item.key] || 0
            }}</span>
            <span class="item-unit">{{ item?.unit }}</span>
          </p>
          <p>{{ item?.label }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { inject, computed } from "vue";
import Title from "@/components/Title/index.vue";
let leftData = inject("leftData");

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
    icon: require("@/assets/event-icon/icon_4.png"),
    label: "逾期问题",
    unit: "个",
    key: "dueDateNum",
  },
  {
    icon: require("@/assets/event-icon/icon_5.png"),
    label: "销号率",
    unit: "%",
    key: "completedRate",
  },
  {
    icon: require("@/assets/event-icon/icon_6.png"),
    label: "平均耗时",
    unit: "天",
    key: "completedAverageCostTime",
  },
];
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 15px;

  &-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 33%;
    box-sizing: border-box;
    padding: 15px 5px;
    font-size: 16px;
    font-family: MicrosoftYaHei;
    color: #c4f0ff;
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

  .item-unit {
    display: inline-block;
    font-size: 12px;
  }
}
</style>
