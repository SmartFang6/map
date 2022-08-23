<template>
  <div class="firstOverlay">
    <img class="bg" :src="bgIcon">
    <!-- <span class="name">{{ detail.adnm !== null ? detail.adnm : '--' }}</span> -->
  </div>
</template>
<script>
import DcMarker from '../common/DcOverlay'
import bgPic from '@/assets/map/bg.png'
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
      bgIcon: '',
    }
  },
  mounted() {
    this.bgIcon = bgPic
  },
  methods: {
    showDetail(e) {
      e.stopPropagation()
      this.$emit('showDetail', this.detail)
    },
  }
}
</script>

<style lang="less" scoped>
.firstOverlay{
  display: flex;
  flex-direction: column;
  align-items: center;
  .bg {
    transform-origin: right top;
    transform: scale(0.8);
    // transform: translate(15%, 15%);
  }
  .title{
    bottom: -30px;
  }
  .text{
    color: #ffecd7;
    left: 11px;
  }
  .image{
    width: 30px;
    height: 14px;
  }
  .line{
    width: 10px;
    bottom: -3px;
  }
}
</style>
