import MergeLayerImpl from '../base/impl/MergeLayerImpl'
import { watersIncreasedLayer, watersReduceLayer, managingScopeChangesLayer, otherLayer } from '../../config/layerConfig'
class WaterChangePolygonLayer extends MergeLayerImpl {
  constructor(changeType) {
    let layerConfig = watersIncreasedLayer
    switch (changeType) {
      case '增加':
        layerConfig = watersIncreasedLayer
        break
      case '减少':
        layerConfig = watersReduceLayer
        break
      case '桥梁或涵洞':
        layerConfig = managingScopeChangesLayer
        break
      case '其他':
        layerConfig = otherLayer
        break
    }
    super(layerConfig)
    this.changeType = changeType
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    this.removeLayer(map)
    const searchInfo = params.getValueByKey('searchInfo')
    if (!this.layer) {
      this.addLayer(map)
    }
    // 监测图层没有详情页一说
    this.res = await this.layerConfig.loadFunc({
      adcd: searchInfo.adcd,
      changeType: this.changeType,
      type: '2',
      year: vm.year,
      // year: vm.$moment(new Date()).add(-2, 'year').format('YYYY')
    })
    this.addFeatures(this.res.message)
  }

  /**
   * 点击事件
   * @param {LayerParams} params
   */
   click(params) {
    const vm = params.getValueByKey('vm')
    const feature = params.getValueByKey('feature')
    const properties = feature.get('properties')
    properties.layerid = this.layerConfig.id
    vm.$emit('showPop', properties)
  }
}
export default WaterChangePolygonLayer
