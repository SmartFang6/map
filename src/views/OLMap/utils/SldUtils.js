import { StyleTypeEnum } from '../enum/TypeEnum'
import FilterUtils from './FilterUtils'
/**
 * 用于生成sld样式  用于wms服务图层前端改变样式用
 * @memberof 工具类
 * @example
 * import { StyleTypeEnum } from '@dc/dcmap-ol/enum/TypeEnum';
 * import FilterUtils from '@dc/dcmap-ol/utils/FilterUtils'
 * import SldUtils from '@dc/dcmap-ol/utils/SldUtils'
 * // 点样式
 * SldUtils.createSld([{
      rules:[{
        type:StyleTypeEnum.icon, //
        icon:{
          src:'http://localhost:9528/doc/img/toast-ui.png',// 这里好像不能用base64编码的图片
          size:10
        }
      }]
    }],'tiger:poi')
  // 面样式
  SldUtils.createSld([{
    rules:[{ // 省级河流
      type:StyleTypeEnum.polygon,
      stroke:{
        color:'#00ffff',
        width:1
      },
      fill:{
        color:'#00ffff'
      },
      filter:['EqualTo',['grade','省级']]
    },{// 市级河流
      type:StyleTypeEnum.polygon,
      stroke:{
        color:'#cc3366',
        width:1
      },
      fill:{
        color:'#cc3366'
      },
      filter:['EqualTo',['grade','市级']]
    },{// 县级河流
      type:StyleTypeEnum.polygon,
      maxScale:1/0.000171661376953125,// 表示到达这个分辨率后再出现该类型元素
      stroke:{
        color:'#9933cc',
        width:1
      },
      fill:{
        color:'#9933cc'
      },
      filter:['EqualTo',['grade','县级']]
    },{// 乡级河流
      type:StyleTypeEnum.polygon,
      maxScale:1/0.000005364418029785156,// 表示到达这个分辨率后再出现该类型元素
      stroke:{
        color:'#66ff99',
        width:1
      },
      fill:{
        color:'#66ff99'
      },
      filter:['EqualTo',['grade','乡级']]
    }]
  }],'river:jhRiver_84_rectifiedPolygon')
 */
class SldUtils {
  /**
   * 创建sld样式
   * @param {Array} styleGroups - 样式配置
   * @returns {String} sld样式字符串
   */
  static createSld(styleGroups, layerName) {
    let str =
      '<?xml version="1.0" encoding="UTF-8"?>' +
      '<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0.0">' +
      '<sld:UserLayer>' +
      '<sld:LayerFeatureConstraints>' +
      '<sld:FeatureTypeConstraint/>' +
      '</sld:LayerFeatureConstraints>' +
      '<sld:Name>' +
      layerName +
      '</sld:Name>' +
      '<sld:UserStyle>'
    styleGroups.forEach(element => {
      str += this.createFeatureTypeStyle(element)
    })
    str +=
      '</sld:UserStyle>' + '</sld:UserLayer>' + '</sld:StyledLayerDescriptor>'
    return str
  }


  /**
   * 创建样式Group
   * @param {Object} parmas - 样式配置
   * @param {String} parmas.name - 样式组名
   * @param {Array} parmas.rules - 样式规则
   * @returns {String}
   */
  static createFeatureTypeStyle(parmas) {
    let str =
      '<sld:FeatureTypeStyle>' +
      '<sld:Name>' +
      (parmas.name || '--') +
      '</sld:Name>'
    parmas.rules = parmas.rules || []
    parmas.rules.forEach(element => {
      str += this.createRule(element)
    })
    str += '</sld:FeatureTypeStyle>'
    return str
  }

  /**
   *
   * @param {Object} params - 样式配置
   * @param {String} params.name - 规则名
   * @param {Number} params.minScale - 最小可见层级
   * @param {Number} params.maxScale - 最大可见层级
   * @param {Array} params.filter - 筛选条件
   * @param {Object} params.style - 样式配置
   * @returns {String}
   */
  static createRule(params) {
    let str =
      '<sld:Rule>' + '<sld:Name>' + (params.name || '--') + '</sld:Name>'
    if (params.minScale) {
      str += `<sld:MinScaleDenominator>${
        params.minScale
      }</sld:MinScaleDenominator>`
    }
    if (params.maxScale) {
      str += `<sld:MaxScaleDenominator>${
        params.maxScale
      }</sld:MaxScaleDenominator>`
    }
    if (params.label) {
      str += '<sld:PolygonSymbolizer/>' +
      '<sld:TextSymbolizer>' +
          '<sld:Geometry>' +
              '<ogc:Function name="centroid">' +
                  '<ogc:PropertyName>wkb_geometry</ogc:PropertyName>' +
              '</ogc:Function>' +
          '</sld:Geometry>' +
          '<sld:Label>' +
              '<ogc:PropertyName>name</ogc:PropertyName>' +
          '</sld:Label>' +
          '<sld:Font>' +
              '<sld:CssParameter name="font-family">宋体</sld:CssParameter>' +
              '<sld:CssParameter name="font-size">15.0</sld:CssParameter>' +
              '<sld:CssParameter name="font-style">normal</sld:CssParameter>' +
              '<sld:CssParameter name="font-weight">normal</sld:CssParameter>' +
          '</sld:Font>' +
          '<sld:Halo>' +
              '<sld:Radius>1</sld:Radius>' +
              '<sld:Fill>' +
                  '<sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>' +
              '</sld:Fill>' +
          '</sld:Halo>' +
          '<sld:Fill>' +
              '<sld:CssParameter name="fill">#000000</sld:CssParameter>' +
          '</sld:Fill>' +
      '</sld:TextSymbolizer>'
    }
    if (params.filter) {
      str += FilterUtils.dealExpression(params.filter, true)
    }
    str += this.createStyle(params)
    str += '</sld:Rule>'
    return str
  }

  /**
   * 创建样式
   * @param {Object} config 样式配置项
   * @returns {String} 样式的xml字符串
   */
  static createStyle(config) {
    let str = ''
    switch (config.type) {
      case StyleTypeEnum.circle: // 表示的是普通的点
        str += this.createPointSymbolizer(config)
        break
      case StyleTypeEnum.icon: // 表示是带图标的点
        str += this.createPointSymbolizer(config)
        break
      case StyleTypeEnum.lineString: // 表示是线
        str += this.createLineSymbolizer(config)
        break
      case StyleTypeEnum.polygon: // 表示是面
        str += this.createPolygonSymbolizer(config)
        break
      default:
        break
    }
    if (config.text) {
      str += this.createTextSymbolizer(config.text)
    }
    return str
  }

  /**
   * 创建面样式
   * @param {Object} config
   * @param {Object} config.fill - 填充色
   * @param {Object} config.fill.color - 颜色
   * @param {Object} config.fill.opacity - 透明度
   * @param {Object} config.stroke - 线段 详细查看线配置项
   * @returns {String}
   */
  static createPolygonSymbolizer(config) {
    let str = '<sld:PolygonSymbolizer>'
    if (config.fill) {
      str += this.createFill(config.fill)
    }
    if (config.stroke) {
      str += this.createStroke(config.stroke)
    }
    str += '</sld:PolygonSymbolizer>'
    return str
  }

  /**
   * 创建线样式
   * @param {Object} config - 线样式配置项
   * @param {String} config.color - 线颜色
   * @param {String} config.width - 线宽
   * @param {String} config.lineCap - 线条头部样式  butt, round, or square
   * @param {String} config.lineJoin - 线条连接样式  bevel, round, or miter
   * @param {Array} config.lineDash - 线间隔 [10,10]
   * @param {Number}  config.lineDashOffset - 线间隔偏移
   * @returns {String}
   */
  static createLineSymbolizer(config) {
    let str = '<sld:LineSymbolizer>'
    if (config.stroke) {
      str += this.createStroke(config.stroke)
    }
    str += '</sld:LineSymbolizer>'
    return str
  }

  /**
   * 创建线样式
   * @param {Object} config
   * @returns {String}
   */
  static createStroke(config) {
    let str = '<sld:Stroke>'
    if (config.color) {
      str += `<sld:CssParameter name="stroke">${
        config.color
      }</sld:CssParameter>`
    }
    if (config.width) {
      str += `<sld:CssParameter name="stroke-width">${
        config.width
      }</sld:CssParameter>`
    }
    if (config.lineCap) {
      str += `<sld:CssParameter name="stroke-linecap">${
        config.lineCap
      }</sld:CssParameter>`
    }
    if (config.lineJoin) {
      str += `<sld:CssParameter name="stroke-linejoin">${
        config.lineJoin
      }</sld:CssParameter>`
    }
    if (config.lineDash) {
      str += `<sld:CssParameter name="stroke-dasharray">${config.lineDash.join(
        ' '
      )}</sld:CssParameter>`
    }
    if (config.lineDashOffset) {
      str += `<sld:CssParameter name="stroke-dashoffset">${
        config.lineDashOffset
      }</sld:CssParameter>`
    }
    str += '</sld:Stroke>'
    return str
  }

  /**
   * 点样式
   * @param {*} config
   * @param {String} config.type - 类型 icon,circle,cross,star,arrow,square
   * @param {String} config.src - 图片路径
   * @param {Number} config.size - 图片大小
   * @param {Object} config.fill - 填充色
   * @param {Object} config.stroke - 线颜色
   * @param {Number} config.radius - 半径
   * @param {Number} config.rotation - 角度
   * @returns {String}
   */
  static createPointSymbolizer(config) {
    let str = '<sld:PointSymbolizer>' + '<sld:Graphic>'

    if (config.type === 'icon') {
      str +=
        '<sld:ExternalGraphic>' +
        '<sld:OnlineResource xlink:type="simple" xlink:href="' +
        config.icon.src +
        '" />' +
        '<sld:Format>image/png</sld:Format>' +
        '</sld:ExternalGraphic>' +
        '<sld:Size>' +
        config.icon.size +
        '</sld:Size>'
    } else {
      str +=
        '<sld:Mark>' +
        '<sld:WellKnownName>' +
        config.type +
        '</sld:WellKnownName>' +
        this.createFill(config.circle.fill) +
        this.createStroke(config.circle.stroke) +
        '</sld:Mark>' +
        '<sld:Size>' +
        config.circle.radius +
        '</sld:Size>'
      if (config.circle.rotation) {
        str += '<sld:Rotation>' + config.circle.rotation + '</sld:Rotation>'
      }
    }

    str += '</sld:Graphic>' + '</sld:PointSymbolizer>'
    return str
  }

  /**
   * 创建文字标注
   * @param {Object} config
   * @param {String} config.text - 展示的text字段名
   * @param {Object} config.font - 字体配置
   * @param {String} config.font.family - 字体名
   * @param {Number} config.font.size - 字体大小
   * @param {Object} config.stroke - 描边
   * @param {Number} config.stroke.width - 描边粗细
   * @param {String} config.stroke.color - 描边颜色
   * @param {Object} config.fill - 填充色
   * @param {String} config.fill.color - 填充色颜色
   * @returns {String}
   */
  static createTextSymbolizer(config) {
    let str = '<sld:TextSymbolizer>'
    if (config.text) {
      str +=
        '<sld:Label>' +
        '<ogc:PropertyName>' +
        config.text +
        '</ogc:PropertyName>' +
        '</sld:Label>'
    }
    if (config.font) {
      const font = config.font
      str += '<sld:Font>'
      if (font.family) {
        str += `<sld:CssParameter name="font-family">${
          font.family
        }</sld:CssParameter>`
      }
      if (font.size) {
        str += `<sld:CssParameter name="font-size">${
          font.size
        }</sld:CssParameter>`
      }
      str +=
        '<sld:CssParameter name="font-style">normal</sld:CssParameter>' +
        '<sld:CssParameter name="font-weight">normal</sld:CssParameter>' +
        '</sld:Font>'
    }
    if (config.stroke) {
      const stroke = config.stroke
      str +=
        '<sld:Halo>' +
        `<sld:Radius>${stroke.width || 1}</sld:Radius>` +
        '<sld:Fill>' +
        `<sld:CssParameter name="fill">${stroke.color}</sld:CssParameter>` +
        '</sld:Fill>' +
        '</sld:Halo>'
    }
    if (config.fill) {
      str += this.createFill(config.fill)
    }
    str +=
      '<sld:LabelPlacement>' +
      '<sld:PointPlacement>' +
      '<sld:AnchorPoint>' +
      '<sld:AnchorPointX>0.5</sld:AnchorPointX>' +
      '<sld:AnchorPointY>0.5</sld:AnchorPointY>' +
      '</sld:AnchorPoint>' +
      '<sld:Displacement>' +
      '<sld:DisplacementX>0.0</sld:DisplacementX>' +
      '<sld:DisplacementY>0.0</sld:DisplacementY>' +
      '</sld:Displacement>' +
      '</sld:PointPlacement>' +
      '</sld:LabelPlacement>' +
      '</sld:TextSymbolizer>'
    return str
  }

  /**
   * 填充色配置
   * @param {Object} config
   * @param {Object} config.fill - 填充色
   * @param {Object} config.opacity - 填充色透明度
   * @returns {String}
   */
  static createFill(config) {
    let str = '<sld:Fill>'
    if (config.color) {
      str += `<sld:CssParameter name="fill">${config.color}</sld:CssParameter>`
    }
    if (config.opacity) {
      str += `<sld:CssParameter name="fill-opacity">${
        config.opacity
      }</sld:CssParameter>`
    }
    str += '</sld:Fill>'
    return str
  }
}
export default SldUtils
