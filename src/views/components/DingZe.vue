<template>
  <div class="dingze">
    <el-carousel indicator-position="none">
      <el-carousel-item
        v-for="(item, index) in dataList"
        :key="index"
        class="carousel-item"
      >
        <div class="item" v-for="(itm, idx) in item" :key="itm.name">
          <el-progress
            type="circle"
            :percentage="65"
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
              {{ itm.num1 }} %
            </li>
            <li class="item-name">{{ itm.name }}</li>
            <li class="item-footer footer-top">
              问题总数
              <span class="item-footer-value" :style="{ color: colors[idx] }">{{
                itm.num2
              }}</span>
            </li>
            <li class="item-footer">
              已销号
              <span class="item-footer-value" :style="{ color: colors[idx] }">{{
                itm.num3
              }}</span>
            </li>
          </ul>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
// import { ref } from "vue";
const colors = ["#32DA85", "#00F5FF", "#FFCD19", "#E35F5F"];
let dataList = [
  [
    {
      name: "水利部门",
      num1: 98.2,
      num2: 231,
      num3: 110,
    },
    {
      name: "农业农村部",
      num1: 98.2,
      num2: 231,
      num3: 110,
    },
    {
      name: "自然资源部",
      num1: 98.2,
      num2: 231,
      num3: 110,
    },
    {
      name: "生态环境部",
      num1: 98.2,
      num2: 231,
      num3: 110,
    },
  ],
  [
    {
      name: "水利部门",
      num1: 98.2,
      num2: 231,
      num3: 110,
    },
    {
      name: "农业农村部",
      num1: 98.2,
      num2: 231,
      num3: 110,
    },
    {
      name: "自然资源部",
      num1: 98.2,
      num2: 231,
      num3: 110,
    },
  ],
];
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
  }
  .item-footer {
    box-sizing: border-box;
    padding: 8px 5px;
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
