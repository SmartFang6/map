<template>
  <div class="Title">
    <span class="Title-text">{{ props.title }}</span>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
});
</script>

<style lang="less" scoped>
.Title {
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  box-sizing: border-box;
  padding: 0 12px;
  background: url(@/assets/images/title-bg.png);
  background-size: 100% 100%;
  color: white;

  &-text {
    display: inline-block;
    margin-left: 45px;
    font-family: "YouSheBiaoTiHei";
  }
}
</style>
