<!------------------------------------------------------
 ¦ 无缝滚动
 ¦ 
 ¦ Author: 大风
 ¦ Date: 2022-09-19 09:30:19
 ¦ FilePath: src/components/SeamlessScroll.vue
 ¦ Dependencies: vue-virtual-scroller
 ¦----------------------------------------------------->

<template>
  <DynamicScroller
    ref="scrollerRef"
    class="scroller"
    key-field="_key"
    :items="data"
    :min-item-size="30"
  >
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem :item="item" :active="active" :data-index="index">
        <slot :row="item" name="default" />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
  startSize: {
    type: Number,
    default: 5,
  },
});

// 容器 ref
const scrollerRef = ref(null);
let trigger = false;

const data = ref([]);
watch(
  () => props.dataList,
  (dataList) => {
    const el = scrollerRef.value?.$el;
    if (el) {
      el.scrollTo(0, 0);
    }
    let tmp = [];
    if (dataList.length <= props.startSize) {
      tmp = JSON.parse(JSON.stringify([...dataList]));
    } else {
      tmp = JSON.parse(JSON.stringify([...dataList, ...dataList]));
    }
    tmp.forEach((a, i) => {
      a._key = i + 1;
    });
    data.value = tmp;
  },
  { immediate: true }
);

onMounted(() => {
  const el = scrollerRef.value.$el;
  const run = () =>
    setTimeout(() => {
      let scrollTop = el.scrollTop + (trigger ? 0 : 0.8);
      let height = el.scrollHeight;
      if (scrollTop >= height / 3) {
        // data.value = data.value.concat([...props.dataList]);
        const last = data.value.at(-1);
        const newData = JSON.parse(JSON.stringify(props.dataList));
        newData.forEach((a, i) => {
          a._key = last._key + i + 1;
        });
        data.value = data.value.concat(newData);
      }
      el.scrollTo({
        left: 0,
        top: scrollTop,
        behavior: "smooth",
      });
      if (scrollTop <= height) {
        run();
      }
    }, 1000 / 30);
  run();
  el.addEventListener("mouseenter", () => (trigger = true));
  el.addEventListener("mouseleave", () => (trigger = false));
});
</script>

<style lang="less" scoped>
.scroller {
  height: 100%;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 0px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(206, 205, 205, 0.75);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0px;
    background: rgba(255, 255, 255, 0.15);
  }
}
</style>
