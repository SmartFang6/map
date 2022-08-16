<template>
  <Layout>
    <template #header><Header /></template>
    <template #map>
      <div class="map">MAP</div>
    </template>
  </Layout>
</template>

<script setup>
import Layout from "./components/Layout";
import Header from "./components/Header";
</script>

<style scoped lang="less">
.map {
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100vh;
  font-size: 200px;
  font-weight: 900;
}
</style>
