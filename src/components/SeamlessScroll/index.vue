<template>
  <div class="list" :key="componentKey" v-if="show" ref="scroll_outside">
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
import { ref, onMounted, nextTick, computed, watch } from "vue";

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

// 动态key,解决组件因为DOM复用造成的bug
let show = ref(true);
let componentKey = ref("");
// 生成动态key
function getRandomKey() {
  let randomNum = null;
  for (let i = 0; i < 3; i++) {
    randomNum += Math.floor(Math.random() * 10);
  }
  componentKey.value = `seamlessScroll-${randomNum}`;
}
getRandomKey();

// 控制滚动速度
const speed = computed(() => {
  return (props.step * props.list.length || 10) + "s";
});

// 获取DOM高度,执行滚动动画
const scroll_outside = ref(null);
const scroll_box = ref(null);
const slotHeight = ref("0px");
function initDom() {
  if (props.list.length <= 0) {
    // alert("请配置数据源！");
    return;
  }
  // 获取组件高度
  const scrollOutsideH = scroll_outside.value.offsetHeight;
  // 获取滚动内容高度
  const scrollDOM = scroll_box.value;
  const scrollHeight = scrollDOM.offsetHeight;
  // console.log("高度---",scrollHeight,scrollOutsideH);
  if (scrollHeight > scrollOutsideH) {
    // 获取插槽的DOM，并生成一份新的插槽数据添加到末尾
    const slotDom = scrollDOM.innerHTML;
    const copyDom = `<div style="position:relative;left:0;top:0;height:100%;">${slotDom}</div>`;
    scrollDOM.innerHTML = slotDom + copyDom;
    // 设置向上滚动的偏移量,为插槽内容的高度
    slotHeight.value = `-${scrollDOM.offsetHeight / 2}px`;
  } else {
    slotHeight.value = 0;
  }
}

onMounted(() => {
  initDom();
});

watch(
  () => props.list,
  () => {
    // 解决数据变更DOM没重新渲染,影响滚动效果
    show.value = false;
    getRandomKey();
    setTimeout(() => {
      show.value = true;
      nextTick(() => {
        initDom();
      });
    });
  },
  {
    // immediate: true,
    deep: true,
  }
);

// 捕获插槽点击事件
const emites = defineEmits(["clicked"]);
function handleClick(e) {
  console.log("handleClick", e);
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
  -webkit-animation: var(--speed) rowup linear infinite normal;
  animation: var(--speed) rowup linear infinite normal;
  animation-play-state: running;
  position: relative;
  &:hover {
    animation-play-state: paused;
  }
}
</style>
