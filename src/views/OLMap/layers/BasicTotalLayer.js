import BaseVectorLayer from './base/BaseVectorLayer'
import * as common from '../common/common'
import { geoServerConfig } from '../config/mapConfig'
import GeoJSON from 'ol/format/GeoJSON'
import { getStatisticsList } from '@/apis/map'
class AreaHappinessLayer extends BaseVectorLayer {
  constructor(layerConfig) {
    super(layerConfig)
    this.adcdFeatures = {}
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const map = params.map
    const adcd = vm.adcd
    if (this.layer) {
      this.removeLayer(map, vm)
    }
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
    let res = await getStatisticsList(querys)
    res = res.message // 测试，后边需删掉！！！！！！！
    this.adcdFeatures[adcd].forEach(feature => {
      const happyscore = common.getSystemAdcdFromMap(
        feature.get('admin_div_code')
      )
      
      feature.setId(`${this.layerConfig.id}.${happyscore}`)
      feature.set('properties', {})
      if (res.length === 0) {
        feature.set('properties', {
          adnm: feature.get('admin_div_name')
        })
      } else {
        for (let i = 0; i < res.length; i++) {
          if (res[i].adcd === happyscore) {
            feature.set('properties', res[i])
            break
          }
        }
      }
    })
    if (!this.layer) {
      this.addLayer(map)
    }
    console.log('features', this.adcdFeatures[adcd]);
    this.addFeatures(this.adcdFeatures[adcd])
    if (!vm.interval) { // 防止加载多个定时器
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
