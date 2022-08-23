import BaseLayer from '../../layers/base/BaseLayer'
import {
  getMapAdcdFromSystem,
  getAdLevelBySystemAdcd,
  getFeatureTypesByAdLevel,
  getChildFeatureTypesByAdLevel,
} from '../../common/commonrough'
import SldUtils from '../../utils/SldUtils'
import { StyleTypeEnum } from '../../enum/TypeEnum'
import { orgBoundaryLayer } from '../../config/layerConfig'

/**
 * 行政区划边界图层 - wms方式无点击以及鼠标经过事件
 */
class OrgBoundaryLayer extends BaseLayer {
  /**
   * 图层配置
   * @param {Object} styleConfig - 图层配置
   * @param {Object} styleConfig.fill - 填充色配置
   * @param {String} styleConfig.fill.color - 填充色
   * @param {String} styleConfig.fill.opacity - 填充透明度
   * @param {Object} styleConfig.stroke - 边界线配色
   * @param {String} styleConfig.stroke.color - 边界线颜色
   * @param {String} styleConfig.stroke.width - 边界线线宽
   * @param {Object} styleConfig.text - 文本配置
   * @param {String} styleConfig.text - 文本字段
   * @param {String} styleConfig.sldBody - sld样式
   *
   */
  constructor(styleConfig) {
    const defaultStyle = { 
      rules: [
        {
          type: StyleTypeEnum.polygon,
          stroke: {
            color: '#0383cf',
            width: 2,
          },
        },
      ],
    }
    super(orgBoundaryLayer)

    this.styleConfig = styleConfig || defaultStyle
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
    // const featureType = getFeatureTypesByAdLevel(adLevel)
    const featureType = getChildFeatureTypesByAdLevel(adLevel)
    this.layerConfig.source.params.LAYERS = featureType
    this.layerConfig.source.params.CQL_FILTER = `parent_code=${mapadcd}`
    // this.layerConfig.source.params.CQL_FILTER = `parent_code=${mapadcd}`
    if (this.styleConfig) {
      if (this.styleConfig.sldBody) {
        this.layerConfig.source.params.sld_body = this.styleConfig.sldBody
      } else {
        this.layerConfig.source.params.sld_body = SldUtils.createSld(this.styleConfig instanceof Array ? this.styleConfig : [this.styleConfig], featureType)
      }
    } else {
      this.layerConfig.source.params.sld_body = SldUtils.createSld(this.styleConfig instanceof Array ? this.styleConfig : [this.styleConfig], featureType)
    }

    this.addLayer(map)
  }
}
export default OrgBoundaryLayer
