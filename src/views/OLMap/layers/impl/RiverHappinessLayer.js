import BaseVectorLayer from '../base/BaseVectorLayer'
import * as common from '../../common/common'
import { geoServerConfig } from '../../config/mapConfig'
import GeoJSON from 'ol/format/GeoJSON'

class RiverHappinessLayer extends BaseVectorLayer {
  constructor(layerConfig) {
    super(layerConfig)
    this.adcdFeatures = {}
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const map = params.map
    const searchInfo = params.searchInfo
    const adcd = searchInfo.adcd
    this.removeLayer(map)
    if (!this.adcdFeatures[adcd]) {
      const mapadcd = common.getMapAdcdFromSystem(adcd)
      const adLevel = common.getAdLevelBySystemAdcd(adcd)
      const featureType = common.getChildFeatureTypesByAdLevel(adLevel)
      const geoserverParams = geoServerConfig.wfsParams
      geoserverParams.typeName = featureType
      geoserverParams.cql_filter = `parent_code=${mapadcd}`
      const result = await common.getGisDataByWfs(geoserverParams, `${geoServerConfig.url}/ZhejiangAdminDivision/wms`)
      this.adcdFeatures[adcd] = new GeoJSON().readFeatures(result)
    }
    this.adcdFeatures[adcd].forEach((feature) => {
      feature.setId(`${this.layerConfig.id}.${common.getSystemAdcdFromMap(feature.get('admin_div_code'))}`)
      const fadcd = feature.get('properties')
      if (fadcd === '4') {
        feature.set('properties', {
          score: '98',
          level: '很幸福'
          // adName: feature.get('admin_div_name')
        })
      } else if (fadcd === '3') {
        feature.set('properties', {
          score: '98',
          level: '幸福'
          // adName: feature.get('admin_div_name')
        })
      } else if (fadcd === '2') {
        feature.set('properties', {
          score: '98',
          level: '一般'
          // adName: feature.get('admin_div_name')
        })
      } else if (fadcd === '1') {
        feature.set('properties', {
          score: '98',
          level: '不幸福'
          // adName: feature.get('admin_div_name')
        })
      } else {
        feature.set('properties', {
          score: '98',
          level: '非常幸福'
          // adName: feature.get('admin_div_name')
        })
      }
    })
    this.addLayer(map)

    this.addFeatures(this.adcdFeatures[adcd])
  }

  click(params) {
    const vm = params.getValueByKey('vm')
    const feature = params.getValueByKey('feature')
    const properties = feature.get('properties')
    const coord = params.getValueByKey('coord')
    properties.layerid = this.layerConfig.id
    properties.lgtd = coord[0]
    properties.lttd = coord[1]
    vm.$emit('showPop', properties)
    vm.popInfo = properties
    vm.$nextTick(() => {
      vm.areaHappyShow = true
    })
  }
}
export default RiverHappinessLayer
