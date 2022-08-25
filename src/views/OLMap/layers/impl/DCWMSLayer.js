import { geoserverPath } from '../../config/geoserverConfig';
import { StyleTypeEnum } from '../../enum/TypeEnum';
import SldUtils from '../../utils/SldUtils';
import BaseLayer from '../base/BaseLayer'

class DCWMSLayer extends BaseLayer {
  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    console.log('config', this.layerConfig);
    switch(vm.adcd) {
      case '330182': // 建德
        this.layerConfig.source.url = geoserverPath.beautifulWms
        this.layerConfig.source.params = {
          LAYERS: 'BeautifulRiverLake:vw_river_manageline',
          VERSION: '1.3.0',
          SRS: 'EPSG:4326',
          STYLES: '',
          CQL_FILTER: '1=1',
          sld_body: SldUtils.createSld([{
            rules: [{
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#CF011C',
                width: 1
              }
            }]
          }], 'BeautifulRiverLake:vw_river_manageline')
        }
        break
      case '330782': // 义乌
        this.layerConfig.source.url = geoserverPath.riverLakeWms
        this.layerConfig.source.params = {
          LAYERS: 'RiverLakeLib:ywRiver_manageline_84',
          VERSION: '1.3.0',
          SRS: 'EPSG:4326',
          STYLES: '',
          CQL_FILTER: '1=1',
          sld_body: SldUtils.createSld([{
            rules: [{
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#CF011C',
                width: 1
              }
            }]
          }], 'RiverLakeLib:ywRiver_manageline_84')
        }
        break
      case '330902': // 定海
        this.layerConfig.source.url = geoserverPath.waterAreaSurveyWms
        this.layerConfig.source.params = {
          LAYERS: 'WaterAreaSurvey:vw_river_manageline',
          VERSION: '1.3.0',
          SRS: 'EPSG:4326',
          STYLES: '',
          CQL_FILTER: `county_code='330902'`,
          sld_body: SldUtils.createSld([{
            rules: [{
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#CF011C',
                width: 1
              }
            }]
          }], 'WaterAreaSurvey:vw_river_manageline')
        }
        break
      case '330327': // 苍南
        this.layerConfig.source.url = geoserverPath.waterAreaSurveyWms
        this.layerConfig.source.params = {
          LAYERS: 'WaterAreaSurvey:vw_river_manageline',
          VERSION: '1.3.0',
          SRS: 'EPSG:4326',
          STYLES: '',
          CQL_FILTER: `county_code='330327'`,
          sld_body: SldUtils.createSld([{
            rules: [{
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#CF011C',
                width: 1
              }
            }]
          }], 'WaterAreaSurvey:vw_river_manageline')
        }
        break
      case '330502': // 吴兴
      this.layerConfig.source.url = geoserverPath.waterAreaSurveyWms
      this.layerConfig.source.params = {
        LAYERS: 'WaterAreaSurvey:vw_river_manageline',
        VERSION: '1.3.0',
        SRS: 'EPSG:4326',
        STYLES: '',
        CQL_FILTER: `county_code='330502'`,
        sld_body: SldUtils.createSld([{
          rules: [{
            type: StyleTypeEnum.lineString,
            stroke: {
              color: '#CF011C',
              width: 1
            }
          }]
        }], 'WaterAreaSurvey:vw_river_manageline')
      }
        break
      default:
        break
    }
    // 先移除图层
    this.removeLayer(map)
    // 重新加载图层
    this.addLayer(map)
  }
}
export default DCWMSLayer
