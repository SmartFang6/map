import MergeLayerImpl from '../base/impl/MergeLayerImpl'
import { mainVillageLayer } from '../../config/layerConfig'

class MainVillageLayer extends MergeLayerImpl {
  constructor() {
    super(mainVillageLayer)
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    const searchInfo = params.getValueByKey('searchInfo')
    // 先移除图层
    this.removeLayer(map)
    // 重新加载图层
    if (!this.layer) {
      this.addLayer(map)
    }
    // 开始加载数据
    if (this.layerConfig.loadFunc) {
      this.res = await this.layerConfig.loadFunc({
        adcd: searchInfo.adcd
      }, vm)
    } else {
      this.res = {
        townCountMap: [],
        townMap: []
      }
    }

    const datas = []
    Object.keys(this.res).forEach(key => {
      Object.keys(this.res[key]).forEach(datakey => {
        if (key === 'townMap') {
          const elements = this.res[key][datakey]
          elements.forEach(element => {
            element.id = element.prevCode
            element.longitude = element.lgtd
            element.latitude = element.lttd
            datas.push(element)
          })
        } else {
          const data = this.res[key][datakey]
          data.id = data.adCode
          datas.push(data)
        }
      })
    })
    this.res = datas
    this.legendChange()
    this.changeLegend(vm)
  }

  changeLegend(vm) {
    const levelField = this.layerConfig.levelField
    if (levelField) {
      const count = {}
      this.res.forEach(element => {
        if (count[element[levelField]]) {
          count[element[levelField]] += 1
        } else {
          count[element[levelField]] = 1
        }
      })
      vm.$emit('changeLegend', {
        type: this.layerConfig.id,
        count: count
      })
    } else {
      vm.$emit('changeLegend', {
        type: this.layerConfig.id,
        count: {
          '0': this.res.length
        }
      })
    }
  }

  legendChange(legend, map) {
    this.clear()
    const datas = this.res
    if (legend === undefined || legend.length > 0) {
      this.addFeatures(datas)
    }
  }

  /**
   * 点击事件弹窗
   * @param {LayerParams} params
   */
   click(params) {
    const vm = params.getValueByKey('vm')
    const feature = params.getValueByKey('feature')
    const properties = feature.get('properties')
    if (properties.prevCode) { // 点击村落点
      properties.layerid = this.layerConfig.id
      vm.$emit('showPop', properties)
    } else { // 点击乡镇点位
      vm.map.getView().setZoom(14)
      vm.map.getView().setCenter(feature.getGeometry().getCoordinates())
    }
  }
}
export default MainVillageLayer
