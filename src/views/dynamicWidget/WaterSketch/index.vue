<!--****************************************
 * 水域概述
 *
 * founder: wangwg
 * Date: 2022/11/01 9:30
 *****************************************-->
<template>
  <div class="water-sketch">
    <div class="water-summary">
      <p v-html="waterSummary"></p>
    </div>
    <div class="list-wrap">
      <div
        class="water-item"
        v-for="(item, index) in list"
        :key="item?.id || index"
      >
        <span class="type-name">{{ item?.typeName }}</span>
        <i class="interval"></i>
        <div class="water-desc">
          <strong class="arch-tips">{{ item?.num }}</strong>
          {{ item?.unit }}
          <strong class="area-tips">{{ item?.area }}</strong>
          {{ item?.areaUnit }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 水域概述
 **/
import { ref, reactive, toRefs, computed, watch } from "vue";
import { useStore } from "vuex";
import moment from "moment";

// 组件注入数据模型
const dataModel = reactive({
  summary: {
    id: 1001,
    year: "",
    areaName: "",
    waterMeasureTotal: 56.7533,
    WaterSurfaceRatio: 4.23,
  },
  list: [
    {
      id: 2001,
      typeName: "河道",
      num: 324,
      unit: "条",
      area: 27.173,
      areaUnit: "k㎡",
    },
    {
      id: 2002,
      typeName: "水库",
      num: 337,
      unit: "座",
      area: 17.173,
      areaUnit: "k㎡",
    },
    {
      id: 2003,
      typeName: "山塘",
      num: 1107,
      unit: "座",
      area: 127.173,
      areaUnit: "k㎡",
    },
    {
      id: 2004,
      typeName: "湖泊",
      num: 324,
      unit: "座",
      area: 27.173,
      areaUnit: "k㎡",
    },
    {
      id: 2005,
      typeName: "人工水道",
      num: 324,
      unit: "条",
      area: 27.173,
      areaUnit: "k㎡",
    },
    {
      id: 2006,
      typeName: "其他",
      num: 324,
      unit: "个",
      area: 27.173,
      areaUnit: "k㎡",
    },
    {
      id: 2007,
      typeName: "人工水道",
      num: 324,
      unit: "条",
      area: 27.173,
      areaUnit: "k㎡",
    },
    {
      id: 2008,
      typeName: "其他",
      num: 324,
      unit: "个",
      area: 27.173,
      areaUnit: "k㎡",
    },
  ],
});

const { summary, list } = toRefs(dataModel);

// 左侧注入数据
const leftData = ref(null);

// 获取左侧栏数据
function getLeftData(dateRange) {
  if (!dateRange) return;
  const params = {
    ...dateRange,
  };
  // getEventStatDistribute(params).then((res) => {});
  console.log(leftData, params);
}

const store = useStore();

// 获取地区名称
let currentAdcdName = ref("");
currentAdcdName.value = store?.state?.adcdName || "";

// 监听驾驶舱的日期间隔
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

// 首次加载获取数据
getLeftData(store?.state?.dateRange);

// 水域概述总结
const waterSummary = computed(() => {
  if (!summary) {
    return "";
  }
  const year = summary.value?.year || moment().year();
  let result = `根据${year}年度${currentAdcdName.value}水域基础调查成果汇总，${year}年${currentAdcdName.value}水域总面积为<strong class="yellow">${summary.value?.waterMeasureTotal}</strong>km²，水面率为<strong class="green">${summary.value?.WaterSurfaceRatio}</strong>%。`;
  return result;
});
</script>

<style lang="less" scoped>
.water-sketch {
  width: 100%;
  height: 254px;
  display: flex;
  flex-direction: column;
  padding: 2px 10px 0 4px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(206, 205, 205, 0.75);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.15);
  }

  .water-summary {
    width: 462px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1px;
    padding: 18px 0 19px 0;
    background: url(@/assets/images/custom-perform-bg.png) no-repeat;
    background-size: 100% 100%;

    & > p {
      width: 420px;
      font-family: YOUSHEBIAOTIHEI;
      font-size: 16px;
      text-align: left;
      text-indent: 32px;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }

  .list-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin-top: 18px;

    .water-item {
      width: 218px;
      height: 44px;
      display: flex;
      align-items: center;
      border-radius: 1px;
      margin-bottom: 10px;
      background: url(@/assets/images/custom-perform-bg.png) no-repeat;
      background-size: 100% 100%;
    }

    .water-item:nth-child(2n) {
      margin-left: 23px;
    }

    .type-name {
      width: 36px;
      height: auto;
      margin-left: 10px;
      font-family: YOUSHEBIAOTIHEI;
      font-size: 16px;
      line-height: 15px;
      letter-spacing: 0px;
      color: #ffffff;
    }

    .interval {
      width: 1px;
      height: 28px;
      margin-left: 9px;
      background: linear-gradient(
        180deg,
        rgba(0, 153, 237, 0.2) 5%,
        rgba(0, 153, 237, 1) 50%,
        rgba(0, 153, 237, 0.2) 95%
      );
    }

    .water-desc {
      width: auto;
      height: 20px;
      display: flex;
      align-items: baseline;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      text-align: right;
      letter-spacing: 0px;
      box-sizing: border-box;
      color: #53a3ca;

      & > .arch-tips {
        min-width: 42px;
        line-height: 1;
        padding: 0 5px 0 12px;
        font-size: 21px;
        font-family: AgencyFB-Bold;
        color: #ffd800;
      }

      & > .area-tips {
        min-width: 64px;
        line-height: 1;
        padding: 0 5px 0 12px;
        font-size: 21px;
        font-family: AgencyFB-Bold;
        color: #00d4f4;
      }
    }
  }

  :deep(.yellow) {
    color: #ffd800;
  }

  :deep(.green) {
    color: #00ccf7;
  }
}
</style>
