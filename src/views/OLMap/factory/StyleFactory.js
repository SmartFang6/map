import Text from 'ol/style/Text'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import CircleStyle from 'ol/style/Circle'
import { StyleTypeEnum } from '../enum/TypeEnum'
import ExpressionsUtils from '../utils/ExpressionsUtils'

/**
 * @classdesc 样式函数入口
 * @memberof 工具类
 * @example
 * // 样式配置
 * //点样式
 * {
 *  type:StyleTypeEnum.icon,
 *  icon:{
 *    src:'',
 *    scale:1
 *  }
 * }
 * // 线面样式
 * {
 *  type:StyleTypeEnum.polygon,
 *  fill:{
 *    color:'red'
 *  },
 *  stroke:{
 *    color:'red',
 *    width:2
 *  },
 *  text:{
 *    text:'',
 *    font:'',
 *    fill:{
 *      color:'字体颜色'
 *    },
 *    stroke:{
 *      color:'字体描边颜色',
 *      width:'描边粗细'
 *    }
 *  }
 * }
 */
class StyleFactory {
  /**
   * 创建样式函数主入口
   * @static
   * @param {Object} config 样式配置类，具体参考ol官网
   * @returns {*} 样式函数
   */
  static createStyle(config, clusterProperties) {
    if (config instanceof Style) {
      return config
    }
    const _this = this
    return function(feature, resolution) {
      let style = []
      if (config instanceof Array) {
        config.forEach((element) => {
          style.push(_this.createStyleByConfig(element, feature, clusterProperties, resolution))
        })
      } else {
        style = _this.createStyleByConfig(config, feature, clusterProperties, resolution)
      }
      return style
    }
  }

  /**
   * 具体返回的样式
   * @static
   * @param config 样式配置
   * @param config.type - 样式类型
   * @param feature 要配置样式的feature对象
   * @returns {Style|Style} 返回样式
   */
  static createStyleByConfig(config, feature, clusterProperties, resolution) {
    const _this = this
    let style
    switch (config.type) {
      case StyleTypeEnum.icon:
        style = _this.createIconStyle(config, feature, clusterProperties, resolution)
        break
      case StyleTypeEnum.circle:
        style = _this.createCircleStyle(config, feature, clusterProperties, resolution)
        break
      case StyleTypeEnum.lineString:
        style = _this.createLineStringStyle(config, feature, clusterProperties, resolution)
        break
      case StyleTypeEnum.polygon:
        style = _this.createPolygonStyle(config, feature, clusterProperties, resolution)
        break
      default:
        break
    }
    return style
  }

  /**
   * 创建面元素样式
   * @static
   * @param config 样式配置文件
   * @param feature 样式feature
   * @returns {Style|Style}
   */
  static createPolygonStyle(config, feature, clusterProperties, resolution) {
    return new Style({
      fill: this.getFill(config.fill, feature, clusterProperties, resolution),
      stroke: this.getStroke(config.stroke, feature, clusterProperties, resolution),
      text: this.getText(config.text, feature, clusterProperties, resolution),
      zIndex: config.zIndex
    })
  }

  /**
   * 创建线元素样式
   * @static
   * @param config
   * @param feature
   * @returns {Style|Style}
   */
  static createLineStringStyle(config, feature, clusterProperties, resolution) {
    return new Style({
      stroke: this.getStroke(config.stroke, feature, clusterProperties, resolution),
      text: this.getText(config.text, feature, clusterProperties, resolution),
      zIndex: config.zIndex
    })
  }

  /**
   * 创建以圆点为样式的圆点样式
   * @static
   * @param config
   * @param feature
   * @returns {Style|Style}
   */
  static createCircleStyle(config, feature, clusterProperties, resolution) {
    return new Style({
      image: this.getCircle(config.circle, feature, clusterProperties, resolution),
      text: this.getText(config.text, feature, clusterProperties, resolution),
      zIndex: config.zIndex
    })
  }

  /**
   * 创建以图片图标为样式的点元素样式
   * @static
   * @param config
   * @param feature
   * @returns {Style|Style}
   */
  static createIconStyle(config, feature, clusterProperties, resolution) {
    return new Style({
      image: this.getIcon(config.icon, feature, clusterProperties, resolution),
      text: this.getText(config.text, feature, clusterProperties, resolution),
      zIndex: config.zIndex
    })
  }

  /**
   * 创建圆样式
   * @static
   * @param {Object} config
   * @param {Number} config.radius - 半径
   * @param {Object} config.fill - 填充色
   * @param {Object} config.stroke - 线颜色
   * @param {ol.Feature} config.feature - 元素
   * @returns {CircleStyle|CircleStyle}
   */
  static getCircle(config, feature, clusterProperties, resolution) {
    let circle
    if (config) {
      circle = new CircleStyle({
        radius: config.radius instanceof Array ? ExpressionsUtils.dealExpression(feature, config.radius, clusterProperties, resolution) : config.radius,
        fill: this.getFill(config.fill, feature, clusterProperties, resolution),
        stroke: this.getStroke(config.stroke, feature, clusterProperties, resolution)
      })
    }
    return circle
  }

  /**
   * 创建简单的图片样式
   * @static
   * @param config
   * @returns {Icon|Icon}
   */
  static getIcon(config, feature, clusterProperties, resolution) {
    let icon
    if (config) {
      icon = new Icon({
        anchor: config.anchor,
        anchorOrigin: config.anchorOrigin,
        opacity: config.opacity instanceof Array ? ExpressionsUtils.dealExpression(feature, config.opacity, clusterProperties, resolution) : config.opacity,
        scale: config.scale instanceof Array ? ExpressionsUtils.dealExpression(feature, config.scale, clusterProperties, resolution) : config.scale,
        src: config.src instanceof Array ? ExpressionsUtils.dealExpression(feature, config.src, clusterProperties, resolution) : config.src
      })
    }
    return icon
  }

  /**
   * 创建填充样式
   * @static
   * @param config
   * @returns {Fill|Fill}
   */
  static getFill(config, feature, clusterProperties, resolution) {
    let fill
    if (config) {
      fill = new Fill({ color: config.color instanceof Array ? ExpressionsUtils.dealExpression(feature, config.color, clusterProperties, resolution) : config.color })
    }
    return fill
  }

  /**
   * 创建线样式
   * @static
   * @param config
   * @returns {Stroke|Stroke}
   */
  static getStroke(config, feature, clusterProperties, resolution) {
    let stroke
    if (config) {
      stroke = new Stroke({
        color: config.color instanceof Array ? ExpressionsUtils.dealExpression(feature, config.color, clusterProperties, resolution) : config.color,
        lineCap: config.lineCap,
        lineJoin: config.lineJoin,
        lineDash: config.lineDash,
        lineDashOffset: config.lineDashOffset,
        width: config.width instanceof Array ? ExpressionsUtils.dealExpression(feature, config.width, clusterProperties, resolution) : config.width
      })
    }
    return stroke
  }

  /**
   * 创建文本样式
   * @static
   * @param config
   * @param feature
   * @returns {Text|Text}
   */
  static getText(config, feature, clusterProperties, resolution) {
    let text
    if (config) {
      text = new Text({
        font: config.font,
        offsetX: config.offsetX instanceof Array ? ExpressionsUtils.dealExpression(feature, config.offsetX, clusterProperties, resolution) : config.offsetX,
        offsetY: config.offsetY instanceof Array ? ExpressionsUtils.dealExpression(feature, config.offsetY, clusterProperties, resolution) : config.offsetY,
        scale: config.scale,
        text: config.text instanceof Array ? ExpressionsUtils.dealExpression(feature, config.text, clusterProperties, resolution) + '' : config.text,
        textAlign: config.textAlign,
        fill: this.getFill(config.fill, feature, clusterProperties, resolution),
        stroke: this.getStroke(config.stroke, feature, clusterProperties, resolution),
        backgroundFill: this.getFill(config.backgroundFill, feature, clusterProperties, resolution),
        backgroundStroke: this.getStroke(config.backgroundStroke, feature, clusterProperties, resolution),
        padding: config.padding
      })
    }
    return text
  }
}

export default StyleFactory
