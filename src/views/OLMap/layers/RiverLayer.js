import DCWMSLayer from './impl/DCWMSLayer'
import { riverManageLineLayer, riverApproachLineLayer, riverCenterLineLayer } from '../config/layerConfig'
import LayerParams from '../common/LayerParams'

class RiverLayer extends DCWMSLayer {
  constructor(layerConfig) {
    super(layerConfig)
  }

  removeLayer(map) {
    super.removeLayer(map)
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    this.map = map
    this.removeLayer(map)
    this.addLayer(map)
    this.legendChange()
  }

  legendChange(checks, map) {
    // if (checks) {
    //   this.map = map
    //   // 处理河道等级筛选
    //   // this.handleRiverLevel(checks)
    //   // 处理三线图层
    //   // this.handleThreeLineLayer(checks)
    // }
  }
}
export default RiverLayer
