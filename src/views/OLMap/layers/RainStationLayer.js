import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { rainStationList } from '@/api/map'
import BaseVectorLayer from './base/BaseVectorLayer'
import { rainStationLayer } from '../config/layerConfig'

class RainStationLayer extends BaseVectorLayer {
  constructor() {
    super(rainStationLayer)
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const searchInfo = params.getValueByKey('searchInfo')
    const { map } = vm
    vm.rains = []
    if (!this.layer) {
      this.addLayer(map)
    }
    this.res = await rainStationList(searchInfo)
    if (this.res && this.res.length > 0) {
      vm.rains = this.res
      // 数据处理
      if (searchInfo.hour === '1' || searchInfo.hour === 1) {
        // 1h的10mm以上为红色
        vm.rains.forEach((element) => {
          if (element.drp && Number(element.drp) > 30) {
            element.warnType = '1'
          } else {
            element.warnType = '0'
          }
        })
      } else if (searchInfo.hour === '3' || searchInfo.hour === 3) {
        // 3h的50mm以上为红色
        vm.rains.forEach((element) => {
          if (element.drp && Number(element.drp) > 50) {
            element.warnType = '1'
          } else {
            element.warnType = '0'
          }
        })
      }
    } else {
      vm.rains = []
      // vm.rains = [
      //   {
      //     stnm: '测试1',
      //     drp: 20,
      //     lgtd: 120.01,
      //     lttd: 30.01,
      //     stcd: '1',
      //     warnType: '1',
      //   }, {
      //     stnm: '测试2',
      //     drp: 2,
      //     lgtd: 119.99,
      //     lttd: 29.99,
      //     stcd: '2',
      //     warnType: '0',
      //   },
      // ]
    }
    // if (res.message.length > 0) {
    //   vm.rains = res.message
    // }
  }

  removeLayer(map, vm) {
    vm.rains = []
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
export default RainStationLayer
