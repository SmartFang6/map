import DCWMSLayer from './impl/DCWMSLayer'
// import { weiPianLayer } from '../config/layerConfig'
import LayerParams from '../common/LayerParams'

class WPianLayer extends DCWMSLayer {
  constructor(layerConfig) {
    super(layerConfig)
    this.layers = {
    }
    this.baseLayers = []
  }

  removeLayer(map) {
    this.baseLayers.forEach(layerid => {
      this.layers[layerid].removeLayer(map)
    })
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
    if (checks) {
      this.map = map
      this.initLayers(checks)
    }
  }

  initLayers(layers) { // 初始化图层，用于地图页面加载图层
    const layerArr = layers
    // 需要加载的图层
    const addLayers = layerArr.filter(layer => {
      return this.baseLayers.indexOf(layer) === -1
    })
    // 需要移除的图层
    const removeLayers = this.baseLayers.filter(layer => {
      return layerArr.indexOf(layer) === -1
    })
    addLayers.forEach(layer => {
      this.changeLayerVisible(layer, true)
    })
    removeLayers.forEach(layer => {
      this.changeLayerVisible(layer, false)
    })
  }
  changeLayerVisible(layerid, status) { // 改变图层的可见性
    if (status) {
      this.layers[layerid].load(new LayerParams({
        vm: this,
        searchInfo: {}
      }))
      this.baseLayers.push(layerid)
    } else {
      this.layers[layerid].removeLayer(this.map, this)
      this.baseLayers.splice(this.baseLayers.indexOf(layerid), 1)
    }
  }
}

export default WPianLayer
