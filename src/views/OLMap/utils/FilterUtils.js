import And from 'ol/format/filter/And.js'
import Bbox from 'ol/format/filter/Bbox.js'
import Contains from 'ol/format/filter/Contains.js'
import DWithin from 'ol/format/filter/DWithin.js'
import Disjoint from 'ol/format/filter/Disjoint.js'
import During from 'ol/format/filter/During.js'
import EqualTo from 'ol/format/filter/EqualTo.js'
import GreaterThan from 'ol/format/filter/GreaterThan.js'
import GreaterThanOrEqualTo from 'ol/format/filter/GreaterThanOrEqualTo.js'
import Intersects from 'ol/format/filter/Intersects.js'
import IsBetween from 'ol/format/filter/IsBetween.js'
import IsLike from 'ol/format/filter/IsLike.js'
import IsNull from 'ol/format/filter/IsNull.js'
import LessThan from 'ol/format/filter/LessThan.js'
import LessThanOrEqualTo from 'ol/format/filter/LessThanOrEqualTo.js'
import Not from 'ol/format/filter/Not.js'
import NotEqualTo from 'ol/format/filter/NotEqualTo.js'
import Or from 'ol/format/filter/Or.js'
import Within from 'ol/format/filter/Within.js'
import { writeFilter } from 'ol/format/WFS'
/**
 * 用于生成wfs xml 中的filter的工具类
 * @memberof 工具类
 * @example
 * 一般配置规则为
 * ['要调用的方法名',['参数1','参数2']]
 * 例如实现
 * rivername like '东*' and riverLevel = '市级' 效果
 * let expression = [
 *  'And',[['IsLike',['rivername','东*']],['EqualTo',['riverLevel','市级']]]
 * ]
 * 调用FilterUtils.dealExpression(expression,true)
 */
class FilterUtils {
  static getFilterStr(filter, version) {
    return new XMLSerializer().serializeToString(writeFilter(filter, version))
  }

  /**
   * 获取复杂表达式
   * @static
   * @param {Array} expression - 表达式
   * @param {Boolean} needStr - 是否转换成字符串
   * @param {String} version - wfs版本
   * @returns {String|ol.format.filter} - 过滤器结果
   */
  static dealExpression(expression, needStr, version) {
    const filter = this.getSingleFilterExpression(expression)
    return needStr ? this.getFilterStr(filter, version || '1.0.0') : filter
  }

  /**
   * 获取单个表达式
   * @static
   * @param {Array} expression
   * @returns  {ol.format.filter} - 过滤器结果
   */
  static getSingleFilterExpression(expression) {
    return this[expression[0]](expression[1])
  }

  /**
   * 表示与
   * @static
   * @param {Array} expression - 表达式
   * @returns {ol.format.And} - 过滤器结果
   */
  static And(expression) {
    const arr = []
    expression.forEach(element => {
      arr.push(this.getSingleFilterExpression(element))
    })
    return new And(...arr)
  }

  /**
   * 表示非
   * @static
   * @param {Array} expression - [propertyName(字段名-必须),expression(比较值-必须)]
   * @static
   * @returns {ol.format.filter.Not}
   */
  static Not(expression) {
    const arr = []
    expression.forEach(element => {
      arr.push(this.getSingleFilterExpression(element))
    })
    return new Not(...arr)
  }

  /**
   * 表示或
   * @param {Array} expression - [propertyName(字段名-必须),expression(比较值-必须)]
   * @static
   * @returns {ol.format.filter.Or}
   */
  static Or(expression) {
    const arr = []
    expression.forEach(element => {
      arr.push(this.getSingleFilterExpression(element))
    })
    return new Or(...arr)
  }

  /**
   * 通过四个边界角获取地图中元素
   * @param {Array} expression - [geometryName(要查询的图层中的geometry字段名-必须),extent(边界范围[121,20,122,30]-必须),srsName(坐标系)]
   * @static
   * @returns {ol.format.filter.Bbox} filter.bbox
   */
  static Bbox(expression) {
    return new Bbox(...expression)
  }

  /**
   * 判断传入的元素是否再服务中的元素内部
   * @param {Array} expression - [geometryName(要查询的图层中的geometry字段名-必须),geometry(元素-必须),srsName(坐标系)]
   * @static
   * @returns {ol.format.filter.Contains}
   */
  static Contains(expression) {
    return new Contains(...expression)
  }

  /**
   * 判断传入的元素是否跟服务中的元素在某一个范围内
   * @param {Array} expression - [geometryName(要查询的图层中的geometry字段名-必须),geometry(元素-必须),distance(距离-必须),unit(单位-必须),srsName(坐标系)]
   * @static
   * @returns {ol.format.filter.DWithin}
   */
  static DWithin(expression) {
    return new DWithin(...expression)
  }

  /**
   * 判断传入的元素是否与服务中的元素不相交
   * @param {Array} expression - [geometryName(要查询的图层中的geometry字段名-必须),geometry(元素-必须),srsName(坐标系)]
   * @static
   * @returns {ol.format.filter.Disjoint}
   */
  static Disjoint(expression) {
    return new Disjoint(...expression)
  }

  /**
   * 时间字段是否在某一个范围内
   * @param {Array} expression - [propertyName(时间字段名-必须),begin(开始时间-必须 时间格式为ISO-8601format),end(结束时间-必须 时间格式为时间格式为ISO-8601format)]
   * @static
   * @returns {ol.format.filter.During}
   */
   static During(expression) {
    return new During(...expression)
  }

  /**
   * 判断字段是否与传入的值相等
   * @param {Array} expression - [propertyName(字段名-必须),expression(比较值-必须),matchCase(匹配大小写-非必须)]
   * @static
   * @returns {ol.format.filter.EqualTo}
   */
   static EqualTo(expression) {
    return new EqualTo(...expression)
  }

  /**
   * 判断字段是否大于传入的值
   * @param {Array} expression - [propertyName(字段名-必须),expression(比较值-必须)]
   * @static
   * @returns {ol.format.filter.GreaterThan}
   */
   static GreaterThan(expression) {
    return new GreaterThan(...expression)
  }

  /**
   * 判断字段是否大于等于传入的值
   * @param {Array} expression - [propertyName(字段名-必须),expression(比较值-必须)]
   * @static
   * @returns {ol.format.filter.GreaterThanOrEqualTo}
   */
   static GreaterThanOrEqualTo(expression) {
    return new GreaterThanOrEqualTo(...expression)
  }

  /**
   * 判断传入的元素是否与服务中的元素相交
   * @param {Array} expression - [geometryName(geometry字段名-必须),geometry(传入的geometry-必须),srsName(坐标系)]
   * @static
   * @returns {ol.format.filter.Intersects}
   */
   static Intersects(expression) {
    return new Intersects(...expression)
  }

  /**
   * 判断数值是否在某个范围区间
   * @param {Array} expression - [propertyName(字段名-必须),lowerBoundary(最小值-必须),upperBoundary(最大值-必须)]
   * @static
   * @returns {ol.format.filter.IsBetween}
   */
   static IsBetween(expression) {
    return new IsBetween(...expression)
  }

  /**
   * 判断是否相似
   * @param {Array} expression - [propertyName(字段名-必须),pattern(需要匹配的正则-必须),wildCard(匹配任意多个字符串的正则符号-默认*),singleChar(匹配一个字符串的正则符号-默认.),escapeChar(用于转义的字符串，默认!),matchCase(忽略大小写)]
   * @static
   * @returns {ol.format.filter.IsLike}
   */
   static IsLike(expression) {
    return new IsLike(...expression)
  }

  /**
   * 判断是否为空
   * @param {Array} expression - [propertyName(字段名-必须)]
   * @static
   * @returns {ol.format.filter.IsNull}
   */
   static IsNull(expression) {
    return new IsNull(...expression)
  }

  /**
   * 判断是否小于传入的值
   * @param {Array} expression - [propertyName(字段名-必须),expression(比较值-必须)]
   * @static
   * @returns {ol.format.filter.LessThan}
   */
   static LessThan(expression) {
    return new LessThan(...expression)
  }

  /**
   * 判断是否小于等于传入的值
   * @param {Array} expression - [propertyName(字段名-必须),expression(比较值-必须)]
   * @static
   * @returns {ol.format.filter.LessThanOrEqualTo}
   */
   static LessThanOrEqualTo(expression) {
    return new LessThanOrEqualTo(...expression)
  }

  /**
   * 判断是否不等于传入的值
   * @param {Array} expression - [propertyName(字段名-必须),expression(比较值-必须)]
   * @static
   * @returns {ol.format.filter.NotEqualTo}
   */
   static NotEqualTo(expression) {
    return new NotEqualTo(...expression)
  }

  /**
   * 判断输入的元素是否在服务器的元素内部
   * @param {Array} expression - [geometryName(geometry字段名-必须),geometry(传入的符号-必须),srsName(坐标系)]
   * @static
   * @returns {ol.format.filter.Within}
   */
   static Within(expression) {
    return new Within(...expression)
  }
}
export default FilterUtils
