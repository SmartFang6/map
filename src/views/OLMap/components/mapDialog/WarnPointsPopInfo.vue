<template>
  <!-- 弹窗 -->
  <div>
    <layer
      :type="info.color"
      :title="info.title"
      :desc="info.desc"
      :data="info"
      :config="info.config"
      class="test"
    />
    <div class="goto" @click.stop="handleClick(id)">前往 <span /></div>
  </div>
</template>
<script>
import layer from './layer'
import DcOverlay from '@/views/OLMap/common/DcOverlay'
export default {
  components: {
    layer,
  },
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
    return {}
  },
  methods: {
    handleClick(val) {
      this.$router.push('/dispose')
    },
  },
}
</script>
<style lang="less" scoped>
.test {
  height: 180px;
}
.goto {
  font-size: 20px;
  color: white;
  position: absolute;
  top: 140px;
  right: 30px;
  cursor: pointer;
  // background:black;
}
</style>
