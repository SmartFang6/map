import Cluster from 'ol/source/Cluster'
import ImageWMS from 'ol/source/ImageWMS'
import VectorSource from 'ol/source/Vector'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import Static from 'ol/source/ImageStatic'
import { getTopLeft } from 'ol/extent'
import XYZ from 'ol/source/XYZ'
import TileGrid from 'ol/tilegrid/TileGrid'
import TileImage from 'ol/source/TileImage'
import VectorTile from 'ol/source/VectorTile'
import { SourceTypeEnum } from '../enum/TypeEnum'

/**
 * 数据源工厂
 * @memberof 工具类
 */
class SourceFactory {
  /**
   * 创建图层源的主入口
   * @static
   * @param {Object} config 图层配置
   * @param {String} config.type - 图层类型
   * @returns {*}
   */
  static createSource(config) {
    const _this = this
    let source
    switch (config.type) {
      case SourceTypeEnum.cluster:
        source = _this.createClusterSource(config)
        break
      case SourceTypeEnum.imagewms:
        source = _this.createImageWMSSource(config)
        break
      case SourceTypeEnum.imagestatic:
        source = _this.createImageStaticSource(config)
        break
      case SourceTypeEnum.vector:
        source = _this.createVectorSource(config)
        break
      case SourceTypeEnum.wmts:
        source = _this.createWMTSSource(config)
        break
      case SourceTypeEnum.xyz:
        source = _this.createXYZSource(config)
        break
      case SourceTypeEnum.tileImage:
        source = _this.createTileImageSource(config)
        break
      case SourceTypeEnum.vectorTile:
        source = _this.createVectorTileSource(config)
        break
      default:
        break
    }
    return source
  }

  /**
   * 创建tileImage图层
   * @static
   * @param {Object} config
   * @param {String} config.projection - 投影坐标系
   * @param {Array} config.resolutions - 分辨率数组
   * @param {Array} config.origin
   * @param {Array} config.extent - 四个边界角
   * @param {Array} config.tileSize - 瓦片大小默认[256,256]
   * @param {Function} config.tileUrlFunction - 瓦片加载函数
   * @returns {ol.source.TileImage}
   */
  static createTileImageSource(config) {
    return new TileImage({
      projection: config.projection,
      tileGrid: new TileGrid({
        resolutions: config.resolutions,
        origin: config.origin,
        extent: config.extent,
        tileSize: config.tileSize
      }),
      tileUrlFunction: config.tileUrlFunction
    })
  }

  /**
   * 创建静态图片图层
   * @static
   * @param {Object} config
   * @param {String} config.crossOrigin - 图片跨域
   * @param {Array} config.imageExtent - 图片边界  依次左下右上
   * @param {String} config.url - 图片地址
   * @returns {ol.source.ImageStatic}
   */
  static createImageStaticSource(config) {
    return new Static({
      crossOrigin: config.crossOrigin,
      imageExtent: config.imageExtent,
      url: config.url
    })
  }

  /**
   * 创建XYZ图层
   * @static
   * @param {Object} config
   * @param {String} config.url - 瓦片地址
   * @param {String} config.projection - 投影坐标系
   * @param {Array} config.resolutions - 分辨率数组
   * @param {Array} config.origin
   * @param {Array} config.extent - 四个边界角
   * @param {Array} config.tileSize - 瓦片大小默认[256,256]
   * @returns {ol.source.XYZ}
   */
  static createXYZSource(config) {
    return new XYZ({
      projection: config.projection,
      url: config.url,
      tileGrid: new TileGrid({
        resolutions: config.resolutions,
        origin: config.origin,
        extent: config.extent,
        tileSize: config.tileSize
      })
    })
  }

  /**
   * 创建wmts图层源
   * @static
   * @param {Object} config
   * @param {String} config.crossOrigin - 跨域配置
   * @param {String} config.name - 名称
   * @param {String} config.url - wmts地址
   * @param {String} config.layer - 图层名
   * @param {String} config.style - 图层样式
   * @param {String} config.matrixSet -
   * @param {String} config.format - 输出格式
   * @param {Boolean} config.wrapX
   * @param {Array} config.projectionExtent
   * @param {Array} config.resolutions
   * @param {Array} config.matrixIds
   * @returns {ol.source.WMTS}
   */
  static createWMTSSource(config) {
    return new WMTS({
      crossOrigin: config.crossOrigin,
      name: config.name,
      url: config.url,
      layer: config.layer,
      style: config.style,
      matrixSet: config.matrixSet,
      tilePixelRatio: config.tilePixelRatio,
      format: config.format,
      wrapX: config.wrapX,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(config.projectionExtent),
        resolutions: config.resolutions,
        matrixIds: config.matrixIds
      })
    })
  }

  /**
   * 创建矢量数据源
   * @static
   * @param {Object} config
   * @param {Array} config.features - 元素
   * @param {Boolean} config.wrapX
   * @returns {ol.source.VectorSource}
   */
  static createVectorSource(config) {
    return new VectorSource({
      features: config.features,
      wrapX: config.wrapX
    })
  }

  /**
   * 创建imgwms数据源 适用于geoserver的wms服务
   * @static
   * @param {Object} config
   * @param {String} config.url - wms地址
   * @param {Object} config.params - wms参数
   * @param {String} config.params.layers - wms图层名称
   * @param {String} config.params.styles - wms图层样式
   * @param {String} config.params.version - wms服务版本
   * @param {String} config.params.srs - 投影坐标系
   * @param {String} config.params.sld_body - sld样式 生成参考{@link SldUtils}
   * @param {String} config.params.cql_filter - 筛选条件
   * @returns {ol.source.ImageWMS}
   */
  static createImageWMSSource(config) {
    return new ImageWMS({
      url: config.url,
      params: config.params,
      serverType: config.serverType,
      crossOrigin: config.crossOrigin
    })
  }

  /**
   * 创建聚合数据源
   * @static
   * @param {Object} config
   * @param {Number} config.distance - 聚合距离 像素
   * @param {Source} config.source-聚合数据源 {@link SourceFactory.createVectorSource}
   * @param {Boolean} config.wrapX
   * @returns {ol.source.Cluster}
   */
  static createClusterSource(config) {
    return new Cluster({
      distance: config.distance,
      source: this.createVectorSource(config.source),
      wrapX: config.wrapX
    })
  }

  /**
   * 创建矢量瓦片源
   * @static
   * @param {Object} config
   * @returns {*}
   */
  static createVectorTileSource(config) {
    return new VectorTile({
      url: this.getUrl(config.url, config.params),
      format: config.format,
      projection: config.projection,
      tileLoadFunction: config.tileLoadFunction,
      tileGrid: new WMTSTileGrid({
        tileSize: config.tileSize,
        origin: config.origin,
        resolutions: config.resolutions,
        matrixIds: config.matrixIds
      }),
      warpX: config.warpX
    })
  }

  /**
   * 获取矢量瓦片请求地址
   * @param {String} baseUrl - 请求地址
   * @param {Object} params - 请求参数
   * @returns {string}
   */
  static getUrl(baseUrl, params) {
    let url = `${baseUrl}?`
    for (const param in params) {
      url = `${url}${param}=${params[param]}&`
    }
    url = url.slice(0, -1)
    return url
  }
}
export default SourceFactory
