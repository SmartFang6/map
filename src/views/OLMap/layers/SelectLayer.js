import BaseVectorLayer from './base/BaseVectorLayer'
import { selectLayer } from '../config/layerConfig'

import GeoJSON from 'ol/format/GeoJSON'

import Feature from 'ol/Feature'

class SelectLayer extends BaseVectorLayer {
  constructor() {
    super(selectLayer)
    this.deletedFeatures = []
  }
  load(map) {
    if (!this.layer) {
      this.addLayer(map)
    }
  }

  clear(callback) { // 清空
    this.deletedFeatures.push(this.getSource().getFeatures())
    super.clear()
    if (callback) {
      this.dealCallBack(this.getSource().getFeatures(), callback)
    }
  }

  addFeatures(geomStr) {
    const geoms = geomStr.split(';')
    const features = []
    geoms.forEach(geom => {
      const feature = new Feature({
        geometry: new GeoJSON().readGeometry(geom)
      })
      features.push(feature)
    })
    super.addFeatures(features)
  }
}
export default SelectLayer
