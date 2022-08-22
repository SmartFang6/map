import BaseLayer from '../layers/base/BaseLayer'
// import * as common from '../common/common'
import { dangerAreaLayer } from '../config/layerConfig'
import { getFeatures } from '../common/common'
import GeoJSON from 'ol/format/GeoJSON'
class DangerAreaLayer extends BaseLayer {
  constructor() {
    super(JSON.parse(JSON.stringify(dangerAreaLayer)))
  }
  load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    this.removeLayer(map)
    const searchInfo = params.getValueByKey('searchInfo')
    let cql_filter = '1=1'
    // 这里也有一个问题，就是圩区数据没有行政区划一说，搜索条件先留着，代码不执行
    if (searchInfo.adcd) {
      cql_filter += ` and adcd like '${searchInfo.adcd}%'`
    }
    this.layerConfig.source.params.CQL_FILTER = cql_filter
    if (!this.layer) {
      this.addLayer(map)
    }
  }

  click(params) {
    const feature = params.getValueByKey('feature')
    const vm = params.getValueByKey('vm')
    const properties = feature.getProperties()
    properties.layerid = this.layerConfig.id
    const extent = feature.getGeometry().getExtent()
    vm.layers.selectLayer.addFeatures([feature])
    properties.lgtd = (extent[0] + extent[2]) / 2
    properties.lttd = (extent[1] + extent[3]) / 2
    vm.dialogInfo = properties
    vm.dialogVisible = true
  }

  async gotoMap(params) {
    const detail = params.getValueByKey('row')
    const vm = params.getValueByKey('vm')
    const config = this.layerConfig
    const res = await getFeatures(`${'https://shyjpt.zjwater.com:48080/geoserver/TorrentialFlood/wms'}?service=WFS&version=1.0.0&request=GetFeature&typeName=${config.source.params.LAYERS}&maxFeatures=50&outputFormat=application%2Fjson&cql_filter=ucode='${detail.ucode}'`)
    const features = new GeoJSON().readFeatures(res.data)
    if (features.length > 0) {
      const properties = features[0].getProperties()
      properties.layerid = this.layerConfig.id
      const extent = features[0].getGeometry().getExtent()
      vm.layers.selectLayer.addFeatures([features[0]])
      properties.lgtd = (extent[0] + extent[2]) / 2
      properties.lttd = (extent[1] + extent[3]) / 2
      vm.map.getView().fit(extent)
      vm.dialogInfo = properties
      vm.dialogVisible = true
    }
  }
}
export default DangerAreaLayer
