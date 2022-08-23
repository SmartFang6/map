import VectorLayer from 'ol/layer/Vector'
import ImageLayer from 'ol/layer/Image'
import TileLayer from 'ol/layer/Tile'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorImageLayer from 'ol/layer/VectorImage'
import WebGLPointsLayer from 'ol/layer/WebGLPoints'
import { LayerTypeEnum } from '../enum/TypeEnum'
import SourceFactory from './SourceFactory'
import StyleFactory from './StyleFactory'

/**
 * 创建图层的工厂类
 * @memberof 工具类
 */
class LayerFactory {
  /**
   * 创建图层
   * @static
   * @param {Object} config - 图层配置
   * @param {String} config.id - 图层id
   * @param {String} config.className - 图层作用的样式名
   * @param {String} config.type - 图层类型 其值再枚举中查看
   * @param {Object} config.source - 数据源配置项
   * @param {Number} config.zIndex - 图层层级
   * @param {Object} config.style - 图层样式
   * @returns {*}
   */
  static createLayer(config) {
    const _this = this
    let layer
    switch (config.type) {
      case LayerTypeEnum.cluster:
        layer = _this.createClusterLayer(config)
        break
      case LayerTypeEnum.image:
        layer = _this.createImageLayer(config)
        break
      case LayerTypeEnum.tile:
        layer = _this.createTileLayer(config)
        break
      case LayerTypeEnum.vector:
        layer = _this.createVectorLayer(config)
        break
      case LayerTypeEnum.vectorTile:
        layer = _this.createVectorTileLayer(config)
        break
      case LayerTypeEnum.vectorImage:
        layer = _this.createVectorImageLayer(config)
        break
      case LayerTypeEnum.webglPoints:
        layer = _this.createWebGlPointsLayer(config)
        break
      default:
        break
    }
    return layer
  }

  /**
   * 创建瓦片图层
   * @static
   * @param {Object} config
   * @param {String} config.className - 样式类名
   * @param {String} config.id - 样式id
   * @param {Boolean} config.visible - 图层可见性
   * @param {Object} config.source - 图层源 {@link SourceFactory}
   * @param {Number} config.zIndex - 图层层级
   * @param {Number} config.maxZoom - 最大可见层级
   * @param {Number} config.minZoom - 最小可见层级
   * @param {Number} config.opacity - 图层透明度
   * @returns {ol.layer.TileLayer}
   */
  static createTileLayer(config) {
    return new TileLayer({
      className: config.className,
      id: config.id,
      visible: config.visible,
      source: SourceFactory.createSource(config.source),
      zIndex: config.zIndex,
      minResolution: config.minResolution,
      maxResolution: config.maxResolution,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      opacity: config.opacity
    })
  }

  /**
   * 创建矢量瓦片图层
   * @static
   * @param {Object} config
   * @param {String} config.className - 样式类名
   * @param {String} config.id - 样式id
   * @param {Boolean} config.visible - 图层可见性
   * @param {Object} config.source - 图层源 {@link SourceFactory}
   * @param {Object} config.style - 图层样式 {@link StyleFactory}
   * @param {Number} config.zIndex - 图层层级
   * @param {Number} config.maxZoom - 最大可见层级
   * @param {Number} config.minZoom - 最小可见层级
   * @param {Number} config.opacity - 图层透明度
   * @returns {*}
   */
  static createVectorTileLayer(config) {
    return new VectorTileLayer({
      className: config.className,
      id: config.id,
      visible: config.visible,
      minResolution: config.minResolution,
      maxResolution: config.maxResolution,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      source: SourceFactory.createSource(config.source),
      style: typeof (config.style) === 'function' ? config.style : StyleFactory.createStyle(config.style, config.clusterProperties),
      opacity: config.opacity,
      zIndex: config.zIndex
    })
  }

  /**
   * 创建wms图层 适用于geoserver wms服务
   * @static
   * @param {Object} config
   * @param {String} config.className - 样式类名
   * @param {String} config.id - 样式id
   * @param {Boolean} config.visible - 图层可见性
   * @param {Object} config.source - 图层源 {@link SourceFactory}
   * @param {Number} config.zIndex - 图层层级
   * @param {Number} config.maxZoom - 最大可见层级
   * @param {Number} config.minZoom - 最小可见层级
   * @param {Number} config.opacity - 图层透明度
   * @returns {*}
   */
  static createImageLayer(config) {
    return new ImageLayer({
      className: config.className,
      id: config.id,
      visible: config.visible,
      source: SourceFactory.createSource(config.source),
      zIndex: config.zIndex,
      minResolution: config.minResolution,
      maxResolution: config.maxResolution,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      opacity: config.opacity
    })
  }

  /**
   * 创建聚合图层
   * @static
   * @param {Object} config
   * @returns {*}
   */
  static createClusterLayer(config) {
    return this.createVectorLayer(config)
  }

  /**
   * 创建矢量图层
   * @static
   * @param {Object} config
   * @param {String} config.className - 样式类名
   * @param {String} config.id - 样式id
   * @param {Boolean} config.visible - 图层可见性
   * @param {Object} config.source - 图层源 {@link SourceFactory}
   * @param {Object} config.style - 样式 {@link StyleFactory}
   * @param {Number} config.zIndex - 图层层级
   * @param {Number} config.maxZoom - 最大可见层级
   * @param {Number} config.minZoom - 最小可见层级
   * @param {Number} config.opacity - 图层透明度
   * @returns {*}
   */
  static createVectorLayer(config) {
    return new VectorLayer({
      className: config.className,
      id: config.id,
      visible: config.visible,
      minResolution: config.minResolution,
      maxResolution: config.maxResolution,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      source: SourceFactory.createSource(config.source),
      style: typeof (config.style) === 'function' ? config.style : StyleFactory.createStyle(config.style, config.clusterProperties),
      opacity: config.opacity,
      zIndex: config.zIndex
    })
  }

  /**
   * 创建矢量图片图层 性能相对于vector要好
   * @static
   * @param {Object} config
   * @param {String} config.className - 样式类名
   * @param {String} config.id - 样式id
   * @param {Boolean} config.visible - 图层可见性
   * @param {Object} config.source - 图层源 {@link SourceFactory}
   * @param {Object} config.style - 样式 {@link StyleFactory}
   * @param {Number} config.zIndex - 图层层级
   * @param {Number} config.maxZoom - 最大可见层级
   * @param {Number} config.minZoom - 最小可见层级
   * @param {Number} config.opacity - 图层透明度
   * @returns {*}
   */
  static createVectorImageLayer(config) {
    return new VectorImageLayer({
      className: config.className,
      id: config.id,
      visible: config.visible,
      minResolution: config.minResolution,
      maxResolution: config.maxResolution,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      source: SourceFactory.createSource(config.source),
      style: typeof (config.style) === 'function' ? config.style : StyleFactory.createStyle(config.style, config.clusterProperties),
      opacity: config.opacity,
      declutter: config.declutter,
      zIndex: config.zIndex
    })
  }

  /**
   * 创建webGlPoint图层
   * @static
   * @param {Object} config
   * @param {String} config.className - 样式类名
   * @param {String} config.id - 样式id
   * @param {Boolean} config.visible - 图层可见性
   * @param {Object} config.source - 图层源 {@link SourceFactory}
   * @param {Object} config.style - 样式 webgl特有样式配置，参考网上，暂时获得相关匹配样式
   * @param {Number} config.zIndex - 图层层级
   * @param {Number} config.maxZoom - 最大可见层级
   * @param {Number} config.minZoom - 最小可见层级
   * @param {Number} config.opacity - 图层透明度
   * @returns {*}
   */
  static createWebGlPointsLayer(config) {
    return new WebGLPointsLayer({
      className: config.className,
      id: config.id,
      visible: config.visible,
      minResolution: config.minResolution,
      maxResolution: config.maxResolution,
      minZoom: config.minZoom,
      maxZoom: config.maxZoom,
      source: SourceFactory.createSource(config.source),
      style: config.style,
      opacity: config.opacity,
      disableHitDetection: false,
      zIndex: config.zIndex
    })
  }
}
export default LayerFactory
