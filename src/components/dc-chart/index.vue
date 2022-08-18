<template>
  <div ref="chart" :style="{ height: props.height, width: props.width }" />
</template>

<script setup>
import * as echarts from "echarts";
import debounce from "lodash/debounce";
import { ref, watch, onBeforeUnmount, onMounted, nextTick, markRaw } from "vue";
const props = defineProps({
  chartOption: {
    type: Object,
    required: true,
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: "canvas",
  },
});

const chart = ref(null);
const chartInstance = ref({});
defineExpose({ chartInstance });
watch(
  () => [props.width, props.height],
  () => {
    nextTick(() => {
      if (!chartInstance.value) return;
      chartInstance.value.clear();
      chartInstance.value.resize();
      chartInstance.value.setOption(props.chartOption, true);
    });
  }
);

onMounted(() => {
  let resizeObserver;
  // 初始化图表
  const instance = markRaw(
    echarts.init(chart.value, "", {
      renderer: props.type,
    })
  );
  instance.setOption(props.chartOption, true);
  chartInstance.value = instance;
  // 默认跟着试图窗口尺寸变化而变化
  if (props.autoResize) {
    const resizeHandler = debounce(() => {
      chartInstance.value?.resize();
    }, 200);
    resizeObserver = new ResizeObserver((entries) => {
      // eslint-disable-next-line no-unused-vars
      for (const entry of entries) {
        resizeHandler();
      }
    });
    resizeObserver.observe(window.document.body);
  }
  // 卸载
  onBeforeUnmount(() => {
    if (!chartInstance.value) {
      return;
    }
    if (props.autoResize) {
      resizeObserver.observe(window.document.body);
    }
    chartInstance.value.dispose();
    chartInstance.value = null;
  });
});
</script>
