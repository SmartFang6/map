import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { getStatisticsList } from '@/apis/map'
import BaseVectorLayer from './base/BaseVectorLayer'
import { statisticsLayer } from '../config/layerConfig'
import * as common from '../common/common'
import { geoServerConfig } from '../config/mapConfig'
import GeoJSON from 'ol/format/GeoJSON'
import { getCenter } from 'ol/extent'

class StatisticsLayer extends BaseVectorLayer {
  constructor() {
    super(statisticsLayer)
  }
  async load(params) {
    const vm = params.getValueByKey('vm')
    vm.towns = []
    if (!this.layer) {
      this.addLayer(vm.map)
    }
    const querys = params.getValueByKey('searchInfo')

    let res = await getStatisticsList(querys)
    // res = res.message // 测试，后期需要删掉！！！！！！！！
    vm.towns = res
    console.log('res', res);

    // 把数据进行处理
    if (res.length > 0) {
      // 获取每个街道的中心点
      const mapadcd = common.getMapAdcdFromSystem(vm.adcd)
      const adLevel = common.getAdLevelBySystemAdcd(vm.adcd)
      const featureType = common.getChildFeatureTypesByAdLevel(adLevel)
      const geoserverParams = geoServerConfig.wfsParams
      geoserverParams.typeName = featureType
      geoserverParams.cql_filter = `parent_code=${mapadcd}`
      const result = await common.getGisDataByWfs(
        geoserverParams,
        `${geoServerConfig.url}/ZhejiangAdminDivision/wms`
      )
      const fts = new GeoJSON().readFeatures(result)
      console.log('fts', fts);
      fts.forEach(ft => {
        vm.towns.forEach(town => {
          if (town.adcd === ft.get('admin_div_code')) {
            town.lgtd = getCenter(ft.getGeometry().getExtent())[0]
            town.lttd = getCenter(ft.getGeometry().getExtent())[1]
          }
        })
      })
      vm.$nextTick(() => {
        vm.townss = vm.towns
      })
      console.log('towns', vm.towns)
    }
  }

  createFeatures(result) {
    const features = []
    const { field } = this.layerConfig
    result.forEach((element) => {
      if (element[field.lgtd] && element[field.lttd] && element[field.lgtd] > 0 && element[field.lttd] > 0) {
        const feature = new Feature({
          geometry: new Point([element[field.lgtd], element[field.lttd]])
        })
        element.lgtd = element[field.lgtd]
        element.lttd = element[field.lttd]
        element.layerid = this.layerConfig.id
        feature.setId(`${this.layerConfig.id}.${element[field.id]}`)
        feature.set('properties', element)
        features.push(feature)
      }
    })
    return features
  }
  click(params) {
    const feature = params.getValueByKey('feature')
    const vm = params.getValueByKey('vm')
    const properties = feature.get('properties')
    properties.layerid = this.layerConfig.id
    vm.detail = properties
    vm.popShow = true
  }
  panToMap(params) {
    const detail = params.getValueByKey('detail')
    const vm = params.getValueByKey('vm')
    const { field } = this.layerConfig
    if (detail[field.lgtd] && detail[field.lttd] && detail[field.lgtd] > 0 && detail[field.lttd] > 0) {
      vm.map.getView().setCenter([detail[field.lgtd], detail[field.lttd]])
      vm.map.getView().setZoom(14)
    }
    vm.detail = detail
    vm.popShow = true
  }
  removeLayer(map, vm) {
    vm.towns = []
    super.removeLayer(map)
  }
}
export default StatisticsLayer
