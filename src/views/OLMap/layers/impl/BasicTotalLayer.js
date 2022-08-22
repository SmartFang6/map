import BaseVectorLayer from '../base/BaseVectorLayer'
import * as common from '../../common/common'
import { geoServerConfig } from '../../config/mapConfig'
import GeoJSON from 'ol/format/GeoJSON'
import { getWaterAreaInfo } from '@/apis/map'
class AreaHappinessLayer extends BaseVectorLayer {
  constructor(layerConfig) {
    super(layerConfig)
    this.adcdFeatures = {}
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const map = params.map
    const adcd = vm.adcd
    this.removeLayer(map, vm)
    if (!this.adcdFeatures[adcd]) {
      const mapadcd = common.getMapAdcdFromSystem(adcd)
      const adLevel = common.getAdLevelBySystemAdcd(adcd)
      const featureType = common.getChildFeatureTypesByAdLevel(adLevel)
      const geoserverParams = geoServerConfig.wfsParams
      geoserverParams.typeName = featureType
      geoserverParams.cql_filter = `parent_code=${mapadcd}`
      const result = await common.getGisDataByWfs(
        geoserverParams,
        `${geoServerConfig.url}/ZhejiangAdminDivision/wms`
      )
      this.adcdFeatures[adcd] = new GeoJSON().readFeatures(result)
    }
    // 获取幸福指数
    const querys = params.getValueByKey('searchInfo')
    var res = await getWaterAreaInfo(querys)
    this.adcdFeatures[adcd].forEach(feature => {
      const happyscore = common.getSystemAdcdFromMap(
        feature.get('admin_div_code')
      )
      feature.setId(`${this.layerConfig.id}.${happyscore}`)
      feature.set('properties', {})
      for (let i = 0; i < res.message.length; i++) {
        if (res.message[i].adcd === happyscore) {
          feature.set('properties', res.message[i])
          break
        }
      }
    })
    if (!this.layer) {
      this.addLayer(map)
    }

    this.addFeatures(this.adcdFeatures[adcd])
    if(!vm.interval) { // 防止加载多个定时器
      vm.initInterval()
    }
  }

  removeLayer(map, vm) {
    vm.layers.selectLayer.clear()
    vm.removeInterval()
    super.removeLayer(map)
  }
}
export default AreaHappinessLayer
