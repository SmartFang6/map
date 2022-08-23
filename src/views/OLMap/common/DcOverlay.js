import OverlayFactory from '../factory/OverlayFactory'
// 弹窗
/**
 * 地图弹窗对象  适用于vue的混入
 * @mixin
 * @memberof vue混入
 * @property {Number} lgtd - 经度
 * @property {Number} lttd - 纬度
 * @property {Object} overlayConfig - 弹窗的一些配置
 * @property {Boolean} overlayConfig.autoPan - 是否自动平移
 * @property {Boolean} overlayConfig.stopEvent - 是否阻止弹窗中鼠标事件
 * @property {String} overlayConfig.positioning - 弹窗定位 'bottom-left', 'bottom-center', 'bottom-right', 'center-left', 'center-center', 'center-right', 'top-left', 'top-center', and 'top-right'
 * @property {Array} overlayConfig.offset - 弹窗偏移量 单位px [20,20]
 * @example
 *
 * <popup
 *  :lgtd="121"
 *  :lttd="29"
 *  :overlayConfig="config"
 * />
 *
 * popup.vue
 *
 * {
 *  mixins:[DcOverlay]
 * }
 */
const DcOverlay = {
  props: {
    lgtd: {
      type: Number,
      default: 0,
    },
    lttd: {
      type: Number,
      default: 0,
    },
    overlayConfig: {
      type: Object,
      default() {
        return {
          element: 'nearBy',
          autoPan: false,
          stopEvent: true,
          positioning: 'center-center',
        }
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getMap(this.addOverlay)
    })
  },
  beforeDestroy() {
    this.getMap(this.removeOverlay)
  },
  data() {
    return {}
  },
  inject: ['getMap'],
  methods: {
    addOverlay(map) {
      this.overlayConfig.element = this.$el
      this.overlay = OverlayFactory.createOverlay(this.overlayConfig)
      map.addOverlay(this.overlay)
      this.overlay.setPosition([this.lgtd, this.lttd])
      // if (this.overlayConfig.offset === undefined) {
      //   this.overlay.setOffset([0, -20])
      // } else {
      //   this.overlay.setOffset(this.overlayConfig.offset)
      // }
    },
    // setPosition(lgtd, lttd) {
    //   if (lgtd && lttd) {
    //     console.log('set posi', this.overlay);
    //     this.overlay.setPosition([lgtd, lttd])
    //   } else {
    //     this.overlay.setPosition(undefined)
    //   }
    // },
    removeOverlay(map) {
      if (this.overlay) {
        map.removeOverlay(this.overlay)
      }
    },
  },
}
export default DcOverlay
