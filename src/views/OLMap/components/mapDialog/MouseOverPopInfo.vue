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
  render() {
    return (
      <layer
      type={this.info.color}
      title={this.info.title}
      desc={this.info.desc}
      data={this.info}
      config={this.info.config}
      />
    )
  }
}
</script>
<style lang="less" scoped>
</style>
