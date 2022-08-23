import DCWMSLayer from './impl/DCWMSLayer'
import { riverManageLineLayer, riverApproachLineLayer, riverCenterLineLayer } from '../config/layerConfig'
import LayerParams from '../common/LayerParams'

class RiverLayer extends DCWMSLayer {
  constructor(layerConfig) {
    super(layerConfig)
    this.layers = {
      lineManagement: new DCWMSLayer(riverManageLineLayer),
      inTheWater: new DCWMSLayer(riverApproachLineLayer),
      centerLine: new DCWMSLayer(riverCenterLineLayer)
    }
  }

  removeLayer(map) {
    if (this.layers.lineManagement) {
      this.layers.lineManagement.removeLayer(this.map, this)
    }
    if (this.layers.inTheWater) {
      this.layers.inTheWater.removeLayer(this.map, this)
    }
    if (this.layers.centerLine) {
      this.layers.centerLine.removeLayer(this.map, this)
    }
    super.removeLayer(map)
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    this.map = map
    this.legendChange()
  }

  legendChange(checks, map) {
    if (checks) {
      this.map = map
      // 处理河道等级筛选
      this.handleRiverLevel(checks)
      // 处理三线图层
      this.handleThreeLineLayer(checks)
    }
  }

  // 处理河道等级筛选
  handleRiverLevel(checks) {
    if (checks.indexOf('city') !== -1 || checks.indexOf('county') !== -1 || checks.indexOf('township') !== -1) { // 处理等级筛选
      let levelFilter =  `county like '%龙泉市%'`
      let grades = []
      checks.forEach(lev => {
          switch (lev) {
            case 'city':
              grades.push('市级')
              break
            case 'county':
              grades.push('县级')
              break
            case 'township':
              grades.push('乡级')
              break
            default:
              break
          }
      })
      levelFilter += `and grade in ('`
      levelFilter += grades.join(`','`)
      levelFilter += `')`
      this.layerConfig.source.params.cql_filter = levelFilter
      if (this.layer) {
        this.removeLayer(this.map)
      }
      this.addLayer(this.map)
    } else {
      this.removeLayer(this.map)
    }
  }

  // 处理三线图层
  handleThreeLineLayer(checks) {  
    const threeLines = ['lineManagement','inTheWater', 'centerLine']  
    threeLines.forEach(lineName => {
      if (checks.indexOf(lineName) !== -1) {
        this.layers[lineName].removeLayer(this.map, this)
        this.layers[lineName].load(new LayerParams({
          vm: this,
          searchInfo: {}
        }))
      } else {
        this.layers[lineName].removeLayer(this.map, this)
      }
    })
  }
}
export default RiverLayer
