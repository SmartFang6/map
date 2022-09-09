<template>
  <div class="Title">
    <span class="Title-text">{{ props.title }}</span>
    <img src="@/assets/images/char-title.png" alt="" />
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
  display: inline-flex;
  flex-direction: column;
  // width: 200px;
  align-items: flex-start;
  height: 40px;
  box-sizing: border-box;
  &-text {
    padding-left: 10px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 18px;
    color: #ffffff;
  }
  img {
    margin-top: -4px;
    width: 110px;
    height: 20px;
  }
}
</style>
