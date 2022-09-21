<template>
  <div class="list">
    <div
      class="cc rowup"
      :style="{ '--speed': speed, '--A_DYNAMIC_VALUE': slotHeight }"
      ref="scroll_box"
      @click.capture="handleClick"
    >
      <slot />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick, computed } from "vue";

// prpps
const props = defineProps({
  // 数据源
  list: {
    type: Array,
    default: () => [],
    required: true,
  },
  // 控制滚动速度
  step: {
    type: Number,
    default: 1,
  },
  // 唯一标识，用于返回当前点击项
  identification: {
    type: String,
    default: "id",
  },
});

// 控制滚动速度
const speed = computed(() => {
  return (props.step * props.list.length || 10) + "s";
});

const scroll_box = ref(null);
const slotHeight = ref("0px");
onMounted(() => {
  if (props.list.length <= 0) {
    alert("请配置数据源！");
    return;
  }
  const outsideDom = scroll_box.value;
  // 获取插槽的DOM，并生成一份新的插槽数据添加到末尾
  const slotDom = outsideDom.children[0];
  const lastDom = `<div style="position:relative;left:0;top:0;height:0;">${slotDom.outerHTML}</div>`;
  outsideDom.innerHTML = slotDom.outerHTML + lastDom;

  // 设置滚动高度可视区域
  nextTick(() => {
    slotHeight.value = `-${outsideDom.children[0].offsetHeight}px`;
    console.log(slotHeight.value, "slotHeight");
  });
  console.log(window.navigator);
});

// 捕获插槽点击事件
const emites = defineEmits(["clicked"]);
function handleClick(e) {
  // 根据唯一标识获取当前点击的数据项
  let curItem = e.path.find((i) => i.dataset?.id);
  const event_id_value = curItem?.dataset?.id;
  const currentItem =
    props.list?.filter((i) => i[props.identification] === event_id_value)[0] ||
    {};
  emites("clicked", currentItem);
}
</script>
<style scoped lang="less">
.list {
  width: 100%;
  height: 100%;
  // margin: 20px auto;
  position: relative;
  overflow: hidden;
  font-family: "Microsoft Yahei";
}

.list .rowup {
  @keyframes rowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(0, var(--A_DYNAMIC_VALUE), 0);
      transform: translate3d(0, var(--A_DYNAMIC_VALUE), 0);
    }
  }
  @-webkit-keyframes rowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(0, var(--A_DYNAMIC_VALUE), 0);
      transform: translate3d(0, var(--A_DYNAMIC_VALUE), 0);
    }
  }
  @-moz-keyframes rowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(0, var(--A_DYNAMIC_VALUE), 0);
      transform: translate3d(0, var(--A_DYNAMIC_VALUE), 0);
    }
  }
  cursor: pointer;
  -webkit-animation: var(--speed) rowup linear infinite normal;
  animation: var(--speed) rowup linear infinite normal;
  animation-play-state: running;
  position: relative;
  &:hover {
    animation-play-state: paused;
  }
}
</style>
