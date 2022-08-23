import Point from 'ol/geom/Point'
import Feature from 'ol/Feature'
import MultiPoint from 'ol/geom/MultiPoint'
import LineString from 'ol/geom/LineString'
import MultiLineString from 'ol/geom/MultiLineString'
import LinearRing from 'ol/geom/LinearRing'
import Polygon from 'ol/geom/Polygon'
import MultiPolygon from 'ol/geom/MultiPolygon'
import Circle from 'ol/geom/Circle'

import { FeatureTypeEnum } from '../enum/TypeEnum'

/**
 * @classdesc 创建feature对象工厂 未完善
 */
class FeatureFactory {
  /**
   * 创建feature入口
   * @static
   * @param {String} type 类型
   * @param {Object} config
   * @returns {ol.Feature}
   */
  static createFeature(type, config) {
    const geometry = this.createGeometry(type, config)
    return this.createFeatureByGeometry(geometry, config)
  }

  /**
   * 创建geometry属性
   * @static
   * @param {String} type 参考FeatureTypeEnum
   * @param {Object} config 对象配置 inProperties:对象属性是否直接丢在properties属性字段里  element:对象属性 coordinates: 经纬度坐标点 若为Circle 还需raius:半径
   * @returns {ol.geom.Point|ol.geom.MultiPoint|ol.geom.LineString|ol.geom.MultiLineString|ol.geom.LinearRing|ol.geom.Polygon|*}
   */
  static createGeometry(type, config) {
    const _this = this
    let geometry
    switch (type) {
      case FeatureTypeEnum.point:
        geometry = _this.createPoint(config)
        break
      case FeatureTypeEnum.multiPoint:
        geometry = _this.createMultiPoint(config)
        break
      case FeatureTypeEnum.lineString:
        geometry = _this.createLineString(config)
        break
      case FeatureTypeEnum.multiLineString:
        geometry = _this.createMultiLineString(config)
        break
      case FeatureTypeEnum.linearRing:
        geometry = _this.createLinearRing(config)
        break
      case FeatureTypeEnum.polygon:
        geometry = _this.createPolygon(config)
        break
      case FeatureTypeEnum.multiPolygon:
        geometry = _this.createMultiPolygon(config)
        break
      case FeatureTypeEnum.circle:
        geometry = _this.createCircle(config)
        break
      default:
        break
    }
    return geometry
  }

  /**
   * 创建Point元素
   * @static
   * @param {Object} config 配置项 至少包含   coordinates: 经纬度坐标点
   * @returns {ol.geom.Point} 返回点对象
   */
  static createPoint(config) {
    if (!config.coordinates) {
      throw new Error('Point元素经纬度不能为空')
    }
    const point = new Point(config.coordinates)
    return point
  }

  /**
   * 创建 MultiPoint 元素
   * @static
   * @param {Object} config 配置项 至少包含  coordinates: 经纬度坐标点
   * @returns {ol.geom.MultiPoint} MultiPoint
   */
  static createMultiPoint(config) {
    if (!config.coordinates || config.coordinates.length === 0) {
      throw new Error('MultiPoint元素无可用点')
    }
    const points = new MultiPoint(config.coordinates)
    return points
  }

  /**
   * 创建LineString 元素
   * @static
   * @param {Object} config 配置项 至少包含   coordinates: 经纬度坐标点
   * @returns {ol.geom.LineString} LineString
   */
  static createLineString(config) {
    if (!config.coordinates || config.coordinates.length <= 1) {
      throw new Error('LineString元素应至少包含两个点')
    }
    const lineString = new LineString(config.coordinates)
    return lineString
  }

  /**
   * 创建MultiLineString元素
   * @static
   * @param {Object} config 配置项 至少包含  coordinates: 经纬度坐标点
   * @returns {ol.geom.MultiLineString} MultiLineString
   */
  static createMultiLineString(config) {
    if (!config.coordinates || config.coordinates.length === 0) {
      throw new Error('MultiLineString元素应至少包含两个LineString')
    }
    const lineStrings = new MultiLineString(config.coordinates)
    return lineStrings
  }

  /**
   * 创建LinearRing对象
   * @static
   * @param {Object} config 配置项 至少包含  coordinates: 经纬度坐标点
   * @returns {ol.geom.LinearRing} LinearRing
   */
  static createLinearRing(config) {
    if (!config.coordinates || config.coordinates.length <= 2) {
      throw new Error('LinearRing元素应至少包含两个点坐标')
    }
    const linearRing = new LinearRing(config.coordinates)
    return linearRing
  }

  /**
   * 创建Polygon元素
   * @static
   * @param {Object} config 配置项 至少包含  coordinates: 经纬度坐标点
   * @returns {ol.geom.Polygon} Polygon
   */
  static createPolygon(config) {
    if (!config.coordinates || config.coordinates.length === 0 || config.coordinates[0].length === 0) {
      throw new Error('Polygon元素应至少包含一个坐标数组，且坐标数组的长度应大于3')
    }
    const polygon = new Polygon(config.coordinates)
    return polygon
  }

  /**
   * 创建MultiPolygon元素
   * @static
   * @param {Object} config 配置项 至少包含  coordinates: 经纬度坐标点
   * @returns {ol.geom.MultiPolygon} MultiPolygon
   */
  static createMultiPolygon(config) {
    if (!config.coordinates || config.coordinates.length === 0) {
      throw new Error('MultiPolygon元素应至少包含一个面元素')
    }
    const polygons = new MultiPolygon(config.coordinates)
    return polygons
  }

  /**
   * 创建Circle元素
   * @static
   * @param {Object} config 配置项 至少包含  coordinates: 经纬度坐标点 radius:半径
   * @returns {ol.geom.Circle}  Cirlce
   */
  static createCircle(config) {
    if (!config.coordinates || config.coordinates.length === 0 || !config.radius) {
      throw new Error('Circle元素要包含中心点以及半径')
    }
    const circle = new Circle(config.coordinates, config.radius)
    return circle
  }

  /**
   * 通过geometry 以及配置创建元素
   * @static
   * @param {ol.geom.Point|MultiPoint|LineString|MultiLineString|Polygon|MultiPolygon|Circle|LinearRing} geom 元素类型
   * @param {Object} config 对象配置 inProperties:对象属性是否直接丢在properties属性字段里  element:对象属性
   * @returns {ol.Feature} 返回Feature 对象
   */
  static createFeatureByGeometry(geom, config) {
    const feature = new Feature({
      [config.geometryName ? config.geometryName : 'geometry']: geom
    })
    // 设置geometry名称
    feature.setGeometryName(config.geometryName ? config.geometryName : 'geometry')
    // 设置元素属性
    if (config.inProperties) { // 表示直接丢在properties属性里
      feature.set('properties', config.element)
    } else { // 表示每个属性要单独存放在一个字段里
      const { element } = config
      if (element && typeof (element) === 'object') {
        Object.keys(element).forEach((key) => {
          feature.set(key, element[key])
        })
      }
    }
    return feature
  }
}
export default FeatureFactory
