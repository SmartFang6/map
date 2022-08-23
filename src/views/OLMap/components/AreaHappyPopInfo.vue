<template>
  <div
    class="popInfo"
  >
  <img :src="icon" />
  </div>
</template>
<script>
import DcOverlay from '../common/DcOverlay'
import bgPic from '@/assets/map/bg.png'
export default {
  mixins: [DcOverlay],
  props: {
    info: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      icon: '',
    }
  },
  mounted() {
    this.icon = bgPic
  },
  methods: {
    
  },
}
</script>
<style lang="less" scoped>
.popInfo {
  background-repeat: no-repeat;
  background-size: 100%, 100%;
  color: #ffffff;
  font-family: MicrosoftYaHei-Bold;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
}
</style>
