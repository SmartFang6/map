/* eslint-disable no-debugger */
import LayerFactory from '../../factory/LayerFactory'

/**
 * @classdesc 基础图层类
 * @memberof 图层
 */
class BaseLayer {
  /**
   * @param {Object} layerConfig - 图层配置
   * @param {String} layerConfig.id - 图层id
   * @param {String} layerConfig.type - 图层类型 参考枚举中的LayerTypeEnum
   * @param {Object} layerConfig.source - 图层数据源配置项 具体配置参考SourceFactory中的方法参数
   * @param {String} layerConfig.source.type - 数据源类型 参考枚举中的SourceTypeEnum
   * @param {Number} layerConfig.minZoom - 最小可见层级
   * @param {Number} layerConfig.maxZoom - 最大可见层级
   * @param {String} layerConfig.zIndex - 图层层级
   * @param {Object} layerConfig.style - 支持style,styleFunc,以及json配置项 json配置项参考StyleFactory中的方法参数
   *
   */
  constructor(layerConfig) {
    this.layerConfig = layerConfig
  }

  get curLayer() {
    return this.layer
  }

  get lConfig() {
    return this.layerConfig
  }

  set lConfig(layerConfig) {
    this.layerConfig = layerConfig
  }

  get clickAble() { // 是否可点击
    return this.layerConfig.clickAble
  }

  get layerType() {
    return this.layerConfig.type
  }

  get sourceType() {
    return this.layerConfig.source.type
  }

  get mouseoverAble() { // 是否有鼠标经过事件
    return this.layerConfig.mouseoverAble
  }

  /**
   * 添加图层到地图
   * @param {ol.Map} map - 地图
   */
  addLayer(map) {
    this.layer = this.getLayer()
    map.addLayer(this.layer)
  }

  /**
   * 获取图层
   * @returns {ol.Layer}
   */
  getLayer() {
    if (!this.layer) {
      this.layer = LayerFactory.createLayer(this.layerConfig)
    }
    return this.layer
  }

  /**
   * 获取数据源
   * @returns {*}
   */
  getSource() {
    let source
    if (this.layer) {
      source = this.layer.getSource()
    }
    return source
  }

  /**
   * 移除图层
   * @param {ol.Map} map - 地图类
   */
  removeLayer(map) {
    if (this.layer) {
      map.removeLayer(this.layer)
      this.layer = null
    }
  }

  /**
   * 改变图层可见性
   * @param {Boolean} status - true 展示图层 false 隐藏图层
   */
  changeVisible(status) {
    if (this.layer) {
      this.layer.setVisible(status)
    }
  }
}
export default BaseLayer
