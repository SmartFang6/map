/*
 * @Author: chuyingf chuyingf@163.com
 * @Date: 2022-08-31 13:40:51
 * @LastEditors: chuyingf chuyingf@163.com
 * @LastEditTime: 2022-09-07 09:37:19
 * @FilePath: \water-one-inspection-front\src\views\OLMap\layers\impl\RiverCenterLineLayer.js
 * @Description: 河道管理范围线
 */
import { geoserverPath } from '../../config/geoserverConfig';
import { StyleTypeEnum } from '../../enum/TypeEnum';
import SldUtils from '../../utils/SldUtils';
import BaseLayer from '../base/BaseLayer'

class RiverManageLineLayer extends BaseLayer {
  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    console.log('config', this.layerConfig);
    this.layerConfig.source.url = geoserverPath.waterRegionInvestigationWms
    this.layerConfig.source.params = {
      LAYERS: 'WaterRegionInvestigation:vw_river_manageline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      CQL_FILTER: `county_adcd='${vm.adcd}'`,
      sld_body: SldUtils.createSld([{
        rules: [{
          type: StyleTypeEnum.lineString,
          stroke: {
            color: '#CF011C',
            width: 1
          }
        }]
      }], 'WaterRegionInvestigation:vw_river_manageline')
    }
    // 先移除图层
    this.removeLayer(map)
    // 重新加载图层
    this.addLayer(map)
  }
}
export default RiverManageLineLayer
