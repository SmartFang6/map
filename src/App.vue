<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>
<script setup>
import { provide } from "vue";
import EventBus from "@/utils/eventBus";
provide("EventBus", EventBus);
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: #fff;
}
</style>
