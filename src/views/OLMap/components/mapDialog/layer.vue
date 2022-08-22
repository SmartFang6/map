<script>
import ItemInfo from './itemInfo.vue'
export default {
  props: {
    type: {
      type: String,
      default: 'yellow', // 颜色控制 yellow  red
    },
    title: {
      type: String, // 显示标题
      default: '',
    },
    desc: {
      type: String, // 描述
      default: '',
    },
    data: {
      type: Object,
      default: () => ({
        // val: 32132,
        // fd: 34232
      }),
    },
    config: {
      type: Array,
      default: () => [
        // { label: 'fdsgfd', key: 'val', unit: 'm' },
        // { label: 'gfdsgf', key: 'fd' }
      ],
    },
  },
  data() {
    return {
      // data: {
      //   val: 32132,
      //   fd: 34232
      // }
    }
  },
  computed: {
    // config() {
    //   return [
    //     { label: 'fdsgfd', key: 'val', unit: 'm' },
    //     { label: 'gfdsgf', key: 'fd' }
    //   ]
    // }
  },
  render() {
    return (
      <div class={['layer-box grid', this.type]}>
        <div class="layer-title">
          {this.title || '--'}
          {this.desc ? <div class="desc">{this.desc}</div> : ''}
        </div>
        {this.config.length > 0 ? (
          <div class="layer-content">
            <ItemInfo config={this.config} data={this.data}></ItemInfo>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  },
}
</script>
<style lang="less" scoped>
.layer-box {
  // width: 337px;
  // height: 133px;
  padding: 12px;
  // position: relative;
  &.green {
    border: 2px solid #31d80e;
    box-shadow: 0 0 6px 2px #31d80e inset;
  }
  &.yellow {
    border: 2px solid #fffaad;
    box-shadow: 0 0 6px 2px #fffaad inset;
  }
  &.red {
    border: 2px solid #ff4533;
    box-shadow: 0 0 6px 2px #ff4533 inset;
  }
}
.layer-title {
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  letter-spacing: 0;
  color: #ffffff;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  .desc {
    height: 24px;
    line-height: 24px;
    background-color: #ff4230;
    border-radius: 4px;
    font-size: 16px;
    padding: 0 8px;
    margin-left: 8px;
  }
}
.layer-content {
  background-color: rgba(7, 63, 91,0.7);
  // background-color: rgba($color: #073f5b, $alpha: 0.7);
  border: solid 2px #449dbe;
  padding: 12px;
}
.grid {
  background-color: rgba(12, 110, 185, 0.6);
  background-image: linear-gradient(to right, rgba(12, 110, 185, 0.8) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(12, 110, 185, 0.6) 1px, transparent 1px);
  background-repeat: repeat;
  /* 默认为 repeat */
  background-size: 8px 8px;
}
</style>
