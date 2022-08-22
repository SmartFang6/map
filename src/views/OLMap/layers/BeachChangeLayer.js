import BaseVectorLayer from '../layers/base/BaseVectorLayer'
import { youbudaoLayer, hydrophilicAndConvenientLayer, beachChangeLayer } from '../config/layerConfig'
import { getQSBMList } from '@/apis/map'
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON'
class BeachChangeLayer extends BaseVectorLayer {
  constructor() {
    super(beachChangeLayer)
  }

  removeLayer(map) {
    super.removeLayer(map)
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    this.map = map
    const searchInfo = params.getValueByKey('searchInfo')
    // 清空图层
    this.removeLayer(map)
    if (!this.layer) {
        this.addLayer(map)
    }

    axios.get('./beachChange.json', {}).then(response => {
        this.fts = new GeoJSON().readFeatures(response.data)
        this.addFeatures(this.fts)
    })
  }

  // 图例筛选
  legendChange(checks) {
    // 清除
    this.clear()

    // 筛选
    const levelField = this.layerConfig.levelField
    if (!this.fts) {
        return
    }
    let datas = this.fts.filter(ele => {
        return checks.indexOf(ele.getProperties()[levelField]) !== -1
    })
    this.addFeatures(datas)
  }

  // 点击事件
  click(params) {
    const vm = params.getValueByKey('vm')
    const layerid = params.getValueByKey('layerid')
    const feature = params.getValueByKey('feature')
    const properties = feature.getProperties()
    properties.layerid = this.layerConfig.id
    vm.$emit('showPop', properties)
  }

}
export default BeachChangeLayer
