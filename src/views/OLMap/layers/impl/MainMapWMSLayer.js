/*
 * @Author: chuyingf chuyingf@163.com
 * @Date: 2022-09-08 15:43:09
 * @LastEditors: chuyingf chuyingf@163.com
 * @LastEditTime: 2022-11-29 11:15:09
 * @FilePath: \river-lake-cockpit-front\src\views\OLMap\layers\impl\MainMapWMSLayer.js
 * @Description: 大屏的wms图层通用配置，主要设置cql_filter参数
 */
import { getToken } from '../../global/global';
import BaseLayer from '../base/BaseLayer';

class MainMapWMSLayer extends BaseLayer {
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
}
export default MainMapWMSLayer
