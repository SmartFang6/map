<template>
  <div class="firstOverlay">
    <img class="title" :src="titleIcon" alt="图片">
    <span class="text" >{{ this.detail.totalChangeArea !== null ? Math.abs(this.detail.totalChangeArea).toFixed(2) : '--' }}万km²</span>
    <img class="line" :height="getLineHeight()" :src="lineIcon" alt="线条">
    <img class="image" :src="icon" @click="showDetail" alt="图片">
  </div>
</template>
<script>
import DcMarker from '../common/DcOverlay'
import waterAreaBottom from '@/assets/images/map/waterAreaBottom.png'
import waterAreaLine from '@/assets/images/map/waterAreaLine.png'
import waterAreaIncrease from '@/assets/images/map/waterAreaIncrease.png'
import waterAreaDecrease from '@/assets/images/map/waterAreaDecrease.png'
export default {
  name: 'Pyramid',
  filters: {
    twoDecimal(value) {
      if (
        value === undefined ||
        value === null ||
        value === ''
      ) {
        return '-'
      } else if (isNaN(value * 1)) {
        return '-'
      } else {
        return Math.abs(value * 1).toFixed(2)
      }
    }
  },
  mixins: [DcMarker],
  props: {
    detail: {
      type: Object,
      default() { return {} }
    },
  },
  data() {
    return {
      icon: '',
      titleIcon: '',
      lineIcon: '',
    }
  },
  mounted() {
    this.icon = waterAreaBottom
    this.lineIcon = waterAreaLine
    if (this.detail.totalChangeArea < 0) {
      this.titleIcon = waterAreaDecrease // 减少
    } else if (this.detail.totalChangeArea > 0) {
      this.titleIcon = waterAreaIncrease // 增加
    }
  },
  methods: {
    showDetail(e) {
      e.stopPropagation()
      this.$emit('showDetail', this.detail)
    },
    getLineHeight(){
      let height = 0
      if (Math.abs(this.detail.totalChangeArea) > 0) { // 最小值为40，最大值为120
        height = (Math.abs(this.detail.totalChangeArea) - this.detail.minNum)/(this.detail.maxNum - this.detail.minNum) * 80 + 40
      }
      return Math.round(height)
    },
    getTextBottom() {
      let height = 0
      if (Math.abs(this.detail.totalChangeArea) > 0) { // 最小值为40，最大值为120
        height = (Math.abs(this.detail.totalChangeArea) - this.detail.minNum)/(this.detail.maxNum - this.detail.minNum) * 80 + 40
      }
      return `${height+16}px`
    },
    getTitleBottom() {
      let height = 0
      if (Math.abs(this.detail.totalChangeArea) > 0) { // 最小值为40，最大值为120
        height = (Math.abs(this.detail.totalChangeArea) - this.detail.minNum)/(this.detail.maxNum - this.detail.minNum) * 80 + 40
      }
      return `${height+2}px`
    }
  }
}
</script>

<style lang="less" scoped>
.firstOverlay{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    position: relative;
    bottom: -30px;
  }
  .text{
    position: relative;
    color: #ffecd7;
    left: 11px;
  }
  .image{
    width: 30px;
    height: 14px;
  }
  .line{
    position: relative;
    width: 10px;
    bottom: -3px;
  }
}
</style>
