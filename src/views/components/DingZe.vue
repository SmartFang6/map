<template>
  <div class="dingze">
    <el-carousel indicator-position="none" style="width: 100%">
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
          <div class="" v-if="itm !== 0">
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
            <ul>
              <li class="item-value" :style="{ color: colors[idx] }">
                {{ itm.unitCompletedRate }} %
              </li>
              <li class="item-name" :title="itm.eventResponsibleUnitCodeName">
                {{ itm.eventResponsibleUnitCodeName }}
              </li>
              <li class="item-footer footer-top">
                问题总数
                <span
                  class="item-footer-value"
                  :style="{ color: colors[idx] }"
                  >{{ itm.unitEventNum }}</span
                >
              </li>
              <li class="item-footer">
                已销号
                <span
                  class="item-footer-value"
                  :style="{ color: colors[idx] }"
                  >{{ itm.unitCompletedNum }}</span
                >
              </li>
            </ul>
          </div>
          <div v-else>
            <div
              class="item-icon item-icon-bg"
              v-if="idx !== item.length - 1"
            ></div>
          </div>
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
    iconsArr[page].push(0);
  });
  return iconsArr;
}
</script>

<style lang="less" scoped>
.dingze {
  width: 100%;
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
    height: 100%;
    margin-top: 15px;
  }
  .item-icon {
    width: 25px;
    height: 11px;
    margin-bottom: 40px;
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
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 21px;
    line-height: 21px;
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
