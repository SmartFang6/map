<template>
  <div class="dialog" :style="{ color: themeColor }">
    <div class="head">
      <div class="title">{{ title }}</div>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    themeColor: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped>
.dialog {
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.48);
  .head {
    .title {
      padding: 8px;
      background-color: rgba(12, 89, 90, 0.66);
      font-size: 18px;
    }
  }
  .body {
    padding: 10px;
  }
}
</style>
