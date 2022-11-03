<!--****************************************
 * 问题研判
 *
 * founder: wangwg
 * Date:  17 2022/10/24
 *****************************************-->
<template>
  <div class="problem-judgment">
    <!--#region 进度条内容区-->
    <div class="progress_view">
      <ProgressBar
        v-for="(item, index) in list"
        :no="index + 1"
        :key="item?.eventCategoryCode || index"
        :count="item?.completedNum || 0"
        :rate="item?.useRate"
        :title="item?.eventCategoryName || ''"
        flexType="row"
        position="top-start"
      />
      <el-empty
        v-if="!list || !list.length"
        description="暂无数据"
        :image-size="80"
        class="dc-empty"
      />
    </div>
    <!--#endregion-->
  </div>
</template>

<script setup>
/**
 问题研判
 **/
import ProgressBar from "@/views/components/ProgressBar";
import { useStore } from "vuex";
import { ref, computed, watch } from "vue";
import { getEventStatHighIncidenceRank } from "@/apis/home";

// 左侧注入数据
const listModel = ref(null);

// 获取事件列表的数据
function getProblemJudgmentData(dateRange) {
  if (!dateRange) return;
  const params = {
    ...dateRange,
  };
  getEventStatHighIncidenceRank(params).then((res) => {
    // 获取事件高发排名
    if (!res?.eventStatHighIncidenceRankCategoryCodeList) return;
    // 计算出完成率的百分比数值
    let result = res?.eventStatHighIncidenceRankCategoryCodeList.map((item) => {
      item.useRate = item?.completedRate
        ? Number(`${item?.completedRate}e${2}`)
        : 0;
      return item;
    });
    // 按完成率的百分比数值进行排序
    result.sort((prev, next) => {
      return next.useRate - prev.useRate;
    });
    listModel.value = result;
  });
}

const store = useStore();

// 监听驾驶舱的日期间隔
watch(
  () => store?.state?.dateRange,
  (newVal, oldVal) => {
    const val = newVal || oldVal;
    getProblemJudgmentData(val);
  },
  {
    immediate: true,
    deep: true,
  }
);

// 首次加载获取数据
getProblemJudgmentData(store?.state?.dateRange);

// 问题研判的列表数据
const list = computed(() => {
  if (!listModel.value) {
    return [];
  }
  return listModel.value;
});
</script>

<style lang="less" scoped>
.problem-judgment {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.judgment-content {
  width: 468px;
  height: 100%;
  margin: 0;
  .judgment-chart {
    width: 100%;
    height: 100%;
  }
}

.progress_view {
  padding: 0 16px 0 6px;
  height: 100%;
  overflow: hidden;
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
}

:deep(.ProgressBar .bar .progress_view p .count) {
  font-size: 24px;
}
</style>
