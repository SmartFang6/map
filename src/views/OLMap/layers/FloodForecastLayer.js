import BaseLayer from './base/BaseLayer'
import { floodForecastLayer } from '../config/layerConfig'

class FloodForecastLayer extends BaseLayer {
  constructor() {
    super(floodForecastLayer)
  }
  load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    const searchInfo = params.getValueByKey('searchInfo')
    this.removeLayer(map)
    if (searchInfo.planid) {
      this.layerConfig.source.params.cql_filter = `uid='${searchInfo.planid}'`
      this.addLayer(map)
    }
  }
}
export default FloodForecastLayer
