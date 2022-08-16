<template>
  <div>测试文本</div>
</template>

<script setup>
import { inject } from "vue";
const eventBus = inject("EventBus");
eventBus.$on("testEventBus", (val) => {
  console.log(val, "test-console.log");
});
</script>

<style lang="scss" scoped></style>
