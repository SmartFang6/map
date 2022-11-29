/*
 * @Author: chuyingf chuyingf@163.com
 * @Date: 2022-09-08 15:43:09
 * @LastEditors: chuyingf chuyingf@163.com
 * @LastEditTime: 2022-11-29 11:15:13
 * @FilePath: \river-lake-cockpit-front\src\views\OLMap\layers\impl\MainMapWMSLayer.js
 * @Description: 大屏的wms图层通用配置，主要设置cql_filter参数
 */
import BaseLayer from '../base/BaseLayer';
import MainMapWMSLayer from './MainMapWMSLayer';
import LayerParams from '../../common/LayerParams';
import { getToken } from '../../global/global';

class MainMapWMSWithLinesLayer extends BaseLayer {

  constructor(layerConfig, lineManageLayer, lineWaterLayer) {
    super(layerConfig)
    this.layers = {
      lineManageLayer: new MainMapWMSLayer(lineManageLayer), // 管理范围线
      lineWaterLayer: new MainMapWMSLayer(lineWaterLayer), // 临水线
    }
    this.threeLines = []
  }
  
  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    const token = getToken()
    this.layerConfig.source.params.CQL_FILTER = `county_adcd=${vm.adcd}`
    this.layerConfig.source.params.accessKey = token.access_key
    this.layerConfig.source.params.token = token.token

    // 先移除图层
    this.removeLayer(map)
    // 重新加载图层
    this.addLayer(map)
  }

  changeLegend(legends, vm) {
    this.changeLayer(legends, 'lineManageLayer', vm)
    this.changeLayer(legends, 'lineWaterLayer', vm)
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

  removeLayer(map) {
    super.removeLayer(map)
    this.threeLines.forEach(layer => {
      this.layers[layer].removeLayer(map)
    })
  }
}
export default MainMapWMSWithLinesLayer
