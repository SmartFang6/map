import BaseLayer from './base/BaseLayer'
import { orgAdcdWmsLayer } from '../config/layerConfig'
import {
  getMapAdcdFromSystem,
  getAdLevelBySystemAdcd,
  getChildFeatureTypesByAdLevel,
} from '../common/common'

/**
 * 行政区划边界图层 - wms方式无点击以及鼠标经过事件
 */
class OrgAdcdWmsLayer extends BaseLayer {
  /**
   * 图层配置
   * @param {Object} layerConfig - 图层配置
   * @param {String} layerConfig.id - 图层id
   * @param {String} layerConfig.type - 图层类型 必须为LayerTypeEnum.image
   * @param {Object} layerConfig.source - 数据源
   * @param {String} layerConfig.source.type - 数据源类型 必须为SourceTypeEnum.imagewms
   * @param {String} layerConfig.source.url - 数据源url 'https://gis.dcyun.com:48164/geoserver/ZhejiangAdminDivision/wms'
   * @param {Object} layerConfig.source.params - 请求参数
   * @param {Object} layerConfig.source.params.LAYERS - 行政区划图层 geoserver服务图层，不填，由代码自动计算出
   * @param {String} layerConfig.source.params.VERSION - 版本 写死1.3.0
   * @param {String} layerConfig.source.params.SRS - 投影坐标系 写死‘EPSG:4326’
   * @param {String} layerConfig.source.params.STYLES - 图层样式id geoserver中配置的图层样式id
   * @param {String} layerConfig.source.params.CQL_FILTER - 查询条件 类sql写法 例如1=1
   * @param {String} layerConfig.source.crossOrigin - 配置允许跨域  ‘anonymous’
   * @param {Number} layerConfig.zIndex - 图层层级
   * @param {Function} layerConfig.sldFunc - 样式函数 function(type){} 其中type为地图服务中的图层名
   */
  constructor(layerConfig) {
    let config = orgAdcdWmsLayer
    if (layerConfig) {
      config = Object.assign(orgAdcdWmsLayer, layerConfig)
    }
    super(config)
  }

  /**
   * 加载行政区划边界
   * @param {ol.Map} map - 地图
   * @param {String} adcd - 系统中的行政区划编码 例如金华：3307  浙江省：33
   */
  async load(map, adcd) {
    if (this.layer) {
      this.removeLayer(map)
    }
    const mapadcd = getMapAdcdFromSystem(adcd)
    const adLevel = getAdLevelBySystemAdcd(adcd)
    const featureType = getChildFeatureTypesByAdLevel(adLevel)
    this.layerConfig.source.params.LAYERS = featureType
    this.layerConfig.source.params.CQL_FILTER = `parent_code=${mapadcd}`
    if (this.layerConfig.sldFunc) {
      this.layerConfig.source.params.sld_body = this.layerConfig.sldFunc(
        featureType
      )
    } else {
      this.layerConfig.source.params.sld_body = this.getOrgSld(featureType)
    }
    this.addLayer(map)
  }

  getOrgSld(type) {
    return (
      '<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">' +
      '<sld:UserLayer>' +
      '<sld:LayerFeatureConstraints>' +
      '<sld:FeatureTypeConstraint/>' +
      '</sld:LayerFeatureConstraints>' +
      '<sld:Name>' +
      type +
      '</sld:Name>' +
      '<sld:UserStyle>' +
      '<sld:Name>vw polderPolygon</sld:Name>' +
      '<sld:FeatureTypeStyle>' +
      '<sld:Name>group0</sld:Name>' +
      '<sld:FeatureTypeName>Feature</sld:FeatureTypeName>' +
      '<sld:SemanticTypeIdentifier>generic:geometry</sld:SemanticTypeIdentifier>' +
      '<sld:SemanticTypeIdentifier>simple</sld:SemanticTypeIdentifier>' +
      '<sld:Rule>' +
      '<sld:Name>name</sld:Name>' +
      '<sld:PolygonSymbolizer/>' +
      '<sld:TextSymbolizer>' +
      '<sld:Label>' +
      '<ogc:PropertyName>admin_div_name</ogc:PropertyName>' +
      '</sld:Label>' +
      '<sld:Font>' +
      '<sld:CssParameter name="font-family">宋体</sld:CssParameter>' +
      '<sld:CssParameter name="font-size">15.0</sld:CssParameter>' +
      '<sld:CssParameter name="font-style">normal</sld:CssParameter>' +
      '<sld:CssParameter name="font-weight">normal</sld:CssParameter>' +
      '</sld:Font>' +
      '<sld:LabelPlacement>' +
      '<sld:PointPlacement>' +
      '<sld:AnchorPoint>' +
      '<sld:AnchorPointX>0.0</sld:AnchorPointX>' +
      '<sld:AnchorPointY>0.0</sld:AnchorPointY>' +
      '</sld:AnchorPoint>' +
      '<sld:Displacement>' +
      '<sld:DisplacementX>0.0</sld:DisplacementX>' +
      '<sld:DisplacementY>0.0</sld:DisplacementY>' +
      '</sld:Displacement>' +
      '</sld:PointPlacement>' +
      '</sld:LabelPlacement>' +
      '<sld:Halo>' +
      '<sld:Radius>1</sld:Radius>' +
      '<sld:Fill>' +
      '<sld:CssParameter name="fill">#FFFFFF</sld:CssParameter>' +
      '</sld:Fill>' +
      '</sld:Halo>' +
      '<sld:Fill>' +
      '<sld:CssParameter name="fill">#000000</sld:CssParameter>' +
      '</sld:Fill>' +
      '</sld:TextSymbolizer>' +
      '</sld:Rule>' +
      '<sld:Rule>' +
      '<sld:Name>riverlake</sld:Name>' +
      '<sld:LineSymbolizer>' +
      '<sld:Stroke>' +
      '<sld:CssParameter name="stroke">#33B3FD</sld:CssParameter>' +
      '<sld:CssParameter name="stroke-width">0.5</sld:CssParameter>' +
      '</sld:Stroke>' +
      '</sld:LineSymbolizer>' +
      '</sld:Rule>' +
      '</sld:FeatureTypeStyle>' +
      '</sld:UserStyle>' +
      '</sld:UserLayer>' +
      '</sld:StyledLayerDescriptor>'
    )
  }
}
export default OrgAdcdWmsLayer
