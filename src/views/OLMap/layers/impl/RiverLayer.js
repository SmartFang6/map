/*
 * @Author: chuyingf chuyingf@163.com
 * @Date: 2022-09-08 15:43:09
 * @LastEditors: chuyingf chuyingf@163.com
 * @LastEditTime: 2022-09-13 17:08:37
 * @FilePath: \river-lake-cockpit-front\src\views\OLMap\layers\impl\MainMapWMSLayer.js
 * @Description: 大屏的wms图层通用配置，主要设置cql_filter参数
 */
import LayerParams from '../../common/LayerParams';
import { lineCenterLayer, lineManageLayer, lineWaterLayer } from '../../config/layerConfig';
import BaseLayer from '../base/BaseLayer';
import MainMapWMSLayer from './MainMapWMSLayer'

class RiverLayer extends BaseLayer {
  constructor(layerConfig) {
    super(layerConfig)
    this.layers = {
      lineManageLayer: new MainMapWMSLayer(lineManageLayer), // 管理范围线
      lineWaterLayer: new MainMapWMSLayer(lineWaterLayer), // 临水线
      lineCenterLayer: new MainMapWMSLayer(lineCenterLayer), // 中心线
    }
    this.threeLines = []
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    
    this.layerConfig.source.params.CQL_FILTER = `county_adcd=${vm.adcd}`

    // 先移除图层
    this.removeLayer(map)
    // 重新加载图层
    this.addLayer(map)
  }

  changeLegend(legends, vm) {
    this.changeLayer(legends, 'lineManageLayer', vm)
    this.changeLayer(legends, 'lineWaterLayer', vm)
    this.changeLayer(legends, 'lineCenterLayer', vm)
    // if (legends.indexOf('lineManageLayer') !== -1) { // 如果需要加载管理线
    //   if (this.threeLines.indexOf('lineManageLayer') === -1) {
    //     this.layers.lineManageLayer.load(new LayerParams({
    //       vm,
    //       searchInfo: {}
    //     }))
    //     this.threeLines.push('lineManageLayer')
    //   }
    // } else {
    //   if (this.threeLines.indexOf('lineManageLayer') !== -1) {
    //     this.layers.lineManageLayer.removeLayer(vm.map, vm)
    //     this.threeLines.splice(this.threeLines.indexOf('lineManageLayer'), 1);
    //   }
    // }
  }

  changeLayer(legends, layerid, vm) {
    if (legends.indexOf(layerid) !== -1) { // 如果需要加载管理线
      if (this.threeLines.indexOf(layerid) === -1) {
        this.layers[layerid].load(new LayerParams({
          vm,
          searchInfo: {}
        }))
        this.threeLines.push(layerid)
      }
    } else {
      if (this.threeLines.indexOf(layerid) !== -1) {
        this.layers[layerid].removeLayer(vm.map, vm)
        this.threeLines.splice(this.threeLines.indexOf(layerid), 1);
      }
    }
  }
}
export default RiverLayer
