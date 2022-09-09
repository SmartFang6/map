<template>
  <div style="background: #2c3e50">
    <ProgressBar v-for="i in 10" :count="i" :key="i" />
  </div>
</template>

<script setup>
/**

 **/

import ProgressBar from "@/views/components/ProgressBar";
</script>

<style scoped></style>
