import BaseLayer from '../base/BaseLayer'

class DCWMSLayer extends BaseLayer {
  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    // 先移除图层
    this.removeLayer(map)
    // 重新加载图层
    this.addLayer(map)
  }
}
export default DCWMSLayer
