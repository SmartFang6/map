<template>
  <div>
    <Title title="事件统计" />
  </div>
</template>

<script setup>
import { inject } from "vue";
import Title from "@/components/Title/index.vue";
const eventBus = inject("EventBus");
eventBus.$on("testEventBus", (val) => {
  console.log(val, "test-console.log");
});
</script>

<style lang="scss" scoped></style>
