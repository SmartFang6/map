/*
 * @Author: chuyingf chuyingf@163.com
 * @Date: 2022-09-08 15:43:09
 * @LastEditors: chuyingf chuyingf@163.com
 * @LastEditTime: 2022-09-08 16:00:11
 * @FilePath: \river-lake-cockpit-front\src\views\OLMap\layers\impl\MainMapWMSLayer.js
 * @Description: 大屏的wms图层通用配置，主要设置cql_filter参数
 */
import BaseLayer from '../base/BaseLayer';

class MainMapWMSLayer extends BaseLayer {
  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    
    this.layerConfig.source.params.CQL_FILTER = `county_adcd=${vm.adcd}`

    // 先移除图层
    this.removeLayer(map)
    // 重新加载图层
    this.addLayer(map)
  }
}
export default MainMapWMSLayer
