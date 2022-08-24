<template>
  <div class="dingze">
    <el-carousel indicator-position="none">
      <el-carousel-item
        v-for="(item, index) in dataList"
        :key="index"
        class="carousel-item"
      >
        <div
          class="item"
          v-for="(itm, idx) in item"
          :key="itm.eventResponsibleUnitCode"
        >
          <el-progress
            type="circle"
            :percentage="itm.unitCompletedRate"
            :stroke-width="18"
            :color="colors[idx]"
            :show-text="false"
            :width="80"
            stroke-linecap="butt"
            :class="`item-${idx}`"
          />
          <div class="item-icon" :class="{ 'item-icon-bg': idx !== 0 }"></div>
          <ul>
            <li class="item-value" :style="{ color: colors[idx] }">
              {{ itm.unitCompletedRate }} %
            </li>
            <li class="item-name" :title="itm.eventResponsibleUnitCodeName">
              {{ itm.eventResponsibleUnitCodeName }}
            </li>
            <li class="item-footer footer-top">
              问题总数
              <span class="item-footer-value" :style="{ color: colors[idx] }">{{
                itm.unitEventNum
              }}</span>
            </li>
            <li class="item-footer">
              已销号
              <span class="item-footer-value" :style="{ color: colors[idx] }">{{
                itm.unitCompletedNum
              }}</span>
            </li>
          </ul>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
const colors = ["#32DA85", "#00F5FF", "#FFCD19", "#E35F5F"];

let dataList = ref([]);
// 获取注入数据
let leftData = inject("leftData");
// 监听注入的数据更新echarts
// watch(
//   () => leftData,
//   (n, o) => {
//     console.log(n, o, "22222");
//     // chart.value.setOption(option);
//     nextTick(() => {
//       dataList.value = arrTrans(4, eventResponsibleUnitList.value);
//     });
//   },
//   { deep: true }
// );
// 定性
let eventResponsibleUnitList = computed(() => {
  return leftData.value?.eventResponsibleUnitList || [];
});
dataList.value = arrTrans(4, eventResponsibleUnitList.value);

/**
 * num 为二维数组中的item 数量
 * arr 为一维数组
 */
function arrTrans(num, arr) {
  if (!arr.length) return [];
  // 一维数组转换为二维数组
  const iconsArr = []; // 声明数组
  arr.forEach((item, index) => {
    // Math.floor() 计算结果为下舍整数，如小于1的都取0
    const page = Math.floor(index / num); // 计算该元素为第几个素组内
    if (!iconsArr[page]) {
      // 判断是否存在，不存在则创建一个空的二维数组
      iconsArr[page] = [];
    }
    iconsArr[page].push(item);
  });
  return iconsArr;
}
</script>

<style lang="less" scoped>
.dingze {
  .carousel-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item-icon {
    width: 30px;
    height: 11px;
    margin: 0 0 0 -130px;
  }
  .item-icon-bg {
    background: url(@/assets/images/issue_icon.png);
    background-size: 100% 100%;
  }
  .item-0 {
    :deep(.el-progress-circle__track) {
      stroke: #13606d;
    }
  }
  .item-1 {
    :deep(.el-progress-circle__track) {
      stroke: #0c4b65;
    }
  }
  .item-2 {
    :deep(.el-progress-circle__track) {
      stroke: #344242;
    }
  }
  .item-3 {
    :deep(.el-progress-circle__track) {
      stroke: #332b3a;
    }
  }
  .item-value {
    font-family: AGENCYB;
    font-size: 24px;
  }
  .item-name {
    font-family: MicrosoftYaHei;
    color: #fff;
    max-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-footer {
    box-sizing: border-box;
    padding: 8px;
    margin-top: 10px;
    background: url(@/assets/images/issue_footer.png);
    background-size: 100% 100%;
    color: #c4f0ff;
  }
  .footer-top {
    margin-top: 10px;
  }
  .item-footer-value {
    font-family: AGENCYB;
    font-size: 24px;
  }
}
</style>
