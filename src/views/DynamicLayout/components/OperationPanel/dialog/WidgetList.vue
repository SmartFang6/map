<!--****************************************
 * 弹窗组件列表
 *
 * founder: king
 * Date:  30 2022/9/30
 *****************************************-->
<template>
  <div>
    <div class="btn--warp">
      <el-button type="primary" @click="$emit('submitSelect', selectedWidget)">
        确认
      </el-button>
    </div>
    <ul class="widget-warp">
      <li
        class="widget--item_warp"
        v-for="widget in widgetList"
        :key="widget?.ic"
        @click="selectFn(widget)"
      >
        <header>
          <span>{{ widget?.name }}</span>
          <div class="checked--icon" v-if="selectedWidget === widget?.ic">
            <el-icon color="#67C23A" :size="25">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </header>
        <img
          src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          alt="alt"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
/**
 弹窗组件列表
 **/
import { ref } from "vue";
import { CircleCheckFilled } from "@element-plus/icons-vue";

defineEmits(["submitSelect"]);
// 组件库列表
const widgetList = ref([]);
for (let i = 1; i <= 20; i++) {
  widgetList.value.push({
    ic: `widget_${i}`,
    name: `组件_${i}`,
  });
}
const selectedWidget = ref("");
const selectFn = (widget) => {
  selectedWidget.value = widget?.ic;
  console.log(widget);
};
</script>

<style scoped lang="less">
.btn--warp {
  text-align: left;
  padding: 10px 20px;
}
.widget-warp {
  overflow-y: scroll;
  overflow-x: hidden;
  height: 70vh;
  //background: #0af0f3;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(243, 243, 243, 0.75);
  }
  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.15);
  }
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  .widget--item_warp {
    cursor: pointer;
    width: 33.3%;
    padding: 0 20px;
    margin-bottom: 10px;
    header {
      text-align: left;
      font-weight: 700;
      line-height: 40px;
      position: relative;
      top: 0;
      left: 0;
      .checked--icon {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    img {
      width: 100%;
    }
  }
}
</style>
