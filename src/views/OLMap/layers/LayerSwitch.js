import Group from 'ol/layer/Group'
import BaseLayer from './base/BaseLayer'
import { tdtImg, tdtVec, tdtTer, tdtVecAnno, tdtImgAnno } from '../config/baseLayerConfig'

class LayerSwitch {
  initLayerGroup(baselayers, map) {
    this.removeLayers(map)
    const layers = []
    baselayers.forEach((layerid) => {
      const layer = new BaseLayer(layerid)
      layers.push(layer.getLayer(map))
    })
    this.baseLayerGroup = new Group({ layers })
    map.addLayer(this.baseLayerGroup)
  }

  removeLayers(map) {
    if (this.baseLayerGroup) {
      map.removeLayer(this.baseLayerGroup)
    }
  }

  changeLayers(num, map) {
    const vm = this
    switch (num) {
      case '1':
        // vm.initLayerGroup([tdtTer], map)
        vm.initLayerGroup([tdtTer], map)
        break
      case '2':
        // vm.initLayerGroup([tdtImg], map)
        vm.initLayerGroup([tdtImg, tdtImgAnno], map)
        break
      case '3':
        // vm.initLayerGroup([tdtVec], map)
        vm.initLayerGroup([tdtVec, tdtVecAnno], map)
        break
      default:
        // vm.initLayerGroup([tdtVec], map)
        vm.initLayerGroup([tdtVec, tdtVecAnno], map)
        break
    }
  }
}
export default LayerSwitch
