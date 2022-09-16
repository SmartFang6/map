<template>
  <div class="legend" :class="legendsStyle" v-if="legendList.length">
    <div class="box">
      <el-checkbox-group
        v-show="isShow"
        v-model="checkedCities"
        @change="checkboxChange"
      >
        <el-checkbox
          v-for="item in legendList"
          :key="item.type"
          :label="item.type"
        >
          <div class="content">
            <img v-if="item.icon" :src="item.icon" alt="" />
            <div v-if="item.style" class="icon-div" :style="item.style" />
            {{ item.name }}
            {{ item.count !== undefined ? "(" + item.count + ")" : "" }}
          </div>
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="btn" @click="toggle">
      <i class="icon-icon-tuli" />
      <span>图例</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import store from "@/store";
const props = defineProps({
  legendList: {
    type: Array,
    default: () => [],
  },
  isShowDefault: {
    type: Boolean,
    default: true,
  },
});
const checkedCities = ref([]);
const emits = defineEmits(["change"]);
function checkboxChange(change) {
  change = change.filter((i) => i !== undefined);
  checkedCities.value = change;
  emits("change", change);
}
watch(
  () => props.legendList,
  (newVal) => {
    checkedCities.value = newVal
      .flat()
      .filter((i) => !i.unChecked)
      .map((i) => i.type);
    emits("change", checkedCities.value);
  },
  {
    immediate: true,
  }
);
const isShow = ref(props.isShowDefault);
function toggle() {
  isShow.value = !isShow.value;
}
// 图例样式（根据底部问题清单是否收起判断用什么样式)
const legendsStyle = computed(() =>
  store.state?.layout?.bottom === "open" ? "default" : "bottom"
);
</script>

<style lang="less" scoped>
.legend {
  position: absolute;
  @width: 590px;
  right: calc(@width - 30px);
  padding: 16px;
  transition: all 0.3s;
  background-color: rgba(4, 46, 113, 0.88);
  z-index: 1;
  :deep(.el-checkbox-group) {
    display: flex;
    flex-direction: column;
  }
  .box {
    display: flex;
  }
  .content {
    display: flex;
    align-items: center;
    color: #fff;
    img {
      width: 20px;
      margin-right: 10px;
    }
    .icon-div {
      display: inline-block;
      width: 20px;
      margin-right: 6px;
    }
  }
  .btn {
    float: right;
    width: 107px;
    line-height: 36px;
    background-color: rgba(0, 186, 255, 0.6);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
    font-size: 16px;
    text-align: center;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:nth-of-type(2) {
      margin-top: 10px;
    }
    span {
      margin-left: 4px;
    }
  }
}
.default {
  bottom: 260px;
}
.bottom {
  bottom: 35px;
}
</style>
