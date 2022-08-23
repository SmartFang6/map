<template>
  <!-- 弹窗 -->
  <layer
    :type="info.color"
    :title="info.title"
    :desc="info.desc"
    :data="info"
    :config="info.config"
  />
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
}
</script>
<style lang="less" scoped>
</style>
