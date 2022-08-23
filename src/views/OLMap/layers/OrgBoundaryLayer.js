import BaseVectorLayer from './base/BaseVectorLayer'
import { geoServerConfig } from '../config/mapConfig'
import * as commonrough from '../common/commonrough'
import * as common from '../common/common'
import GeoJSON from 'ol/format/GeoJSON'
/**
 * 用于制作五色图，等地图中需要使用行政区划面的图层
 * @extends BaseVectorLayer
 */
class OrgBoundaryLayer extends BaseVectorLayer {
  /**
   * 创建行政区划面图层
   * @param {Object} layerConfig
   */
  constructor(layerConfig) {
    super(layerConfig)
    this.features = []
    this.lastAdcd = ''
  }

  /**
   * 加载图层
   * @param {Object} params - 参数配置
   * @param {Object} params.vm - vue对象
   * @param {ol.Map} params.map - 地图
   * @param {String} params.adcd - 行政区划编码
   * @param {String} params.adcdField - 行政区划编码字段，用于匹配数据
   * @param {Array} params.datas - 行政区划数据
   * @param {Object} params.layerConfig - 图层配置
   * @param {Boolean} params.needRough - 是否使用抽希的边界
   */
  async load(params) {
    this.params = params
    if (params.layerConfig) {
      this.layerConfig = params.layerConfig
      this.removeLayer(params.map)
    }
    if (!this.layer) {
      this.addLayer(params.map)
    }
    this.clear()
    let api
    let rough = ''
    if (params.needRough) {
      api = commonrough
      rough = 'Rough'
    } else {
      api = common
    }
    if (params.adcd !== this.lastAdcd || !this.features || this.features.length === 0) {
      const mapadcd = api.getMapAdcdFromSystem(params.adcd)
      const adLevel = api.getAdLevelBySystemAdcd(params.adcd)
      const featureType = api.getChildFeatureTypesByAdLevel(adLevel)
      const geoserverParams = geoServerConfig.wfsParams
      geoserverParams.typeName = featureType
      geoserverParams.cql_filter = `parent_code=${mapadcd}`
      const result = await api.getGisDataByWfs(geoserverParams, `${geoServerConfig.url}/ZhejiangAdminDivision${rough}/wms`)
      this.features = new GeoJSON().readFeatures(result)
      this.features.forEach((feature) => {
        feature.setId(`${this.layerConfig.id}.${api.getSystemAdcdFromMap(feature.get('admin_div_code'))}`)
        feature.set('properties', {})
      })
    } else {
      this.features.forEach((feature) => {
        feature.setId(`${this.layerConfig.id}.${api.getSystemAdcdFromMap(feature.get('admin_div_code'))}`)
        feature.set('properties', {})
      })
    }

    this.addFeatures(this.features)
    const source = this.getSource()

    if (params.datas && params.datas.length > 0) {
      params.datas.forEach(element => {
        console.log(element[params.adcdField])
        const feature = source.getFeatureById(`${this.layerConfig.id}.${element[params.adcdField]}`)
        if (feature) {
          feature.set('properties', element)
        }
      })
    }
  }

  /**
   * 根据行政区划编码定位到某个行政区划
   * @param {String} adcd - 行政区划编码
   */
  panToMap(adcd) {
    const feature = this.getSource().getFeatureById(`${this.layerConfig.id}.${adcd}`)
    if (feature) {
      this.params.map.getView().fit(feature.getGeometry().getExtent())
    }
  }
}
export default OrgBoundaryLayer
