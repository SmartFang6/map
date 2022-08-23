import Overlay from 'ol/Overlay'

/**
 * 地图弹出层工厂
 * @memberof 工具类
 */
class OverlayFactory {
  /**
   * 创建弹窗
   * @static
   * @param {Object} config - 地图弹窗配置
   * @param {String} config.id - id
   * @param {String | document} config.element - 弹窗容器
   * @param {Array} config.offset - 弹窗偏移量
   * @param {String} config.positioning - 弹窗定位位置例如'bottom-left', 'bottom-center', 'bottom-right', 'center-left', 'center-center', 'center-right', 'top-left', 'top-center', and 'top-right'等
   * @param {Boolean} config.stopEvent - 是否阻止弹窗内事件透传到地图
   */
  static createOverlay(config) {
    let { element } = config
    if (typeof (config.element) === 'string') {
      element = document.getElementById(config.element)
    }
    return new Overlay({
      id: config.id,
      element,
      offset: config.offset,
      position: config.position,
      positioning: config.positioning,
      stopEvent: config.stopEvent,
      insertFirst: config.insertFirst,
      autoPan: config.autoPan,
      autoPanAnimation: config.autoPanAnimation,
      autoPanMargin: config.autoPanMargin,
      autoPanOptions: config.autoPanOptions,
      className: config.className
    })
  }
}
export default OverlayFactory
