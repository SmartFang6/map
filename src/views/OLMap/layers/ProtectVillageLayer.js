import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { warnVillageList } from '@/api/map'
import BaseVectorLayer from './base/BaseVectorLayer'
import { protectVillageLayer } from '../config/layerConfig'

class ProtectVillageLayer extends BaseVectorLayer {
  constructor() {
    super(protectVillageLayer)
  }

  async load(params) {
    console.log('load village')
    const vm = params.getValueByKey('vm')
    const searchInfo = params.getValueByKey('searchInfo')
    const { map } = vm
    vm.villages = []
    if (!this.layer) {
      this.addLayer(map)
    }
    this.res = await warnVillageList(searchInfo)
    if (this.res && this.res.length > 0) {
      vm.villages = this.res
    } else {
      vm.villages = []
    }
  }

  removeLayer(map, vm) {
    vm.villages = []
  }

  createFeatures(result) {
    const features = []
    const { field } = this.layerConfig
    result.forEach((element) => {
      if (element[field.lgtd] && element[field.lttd] && element[field.lgtd] > 0 && element[field.lttd] > 0) {
        const feature = new Feature({ geometry: new Point([element[field.lgtd], element[field.lttd]]) })
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
}
export default ProtectVillageLayer
