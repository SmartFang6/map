import BaseVectorLayer from '../layers/base/BaseVectorLayer'
import { shoreLineLayer } from '../config/layerConfig'
import { getShoreLineScoreList } from '@/apis/map'
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON'
class ShoreLineLayer extends BaseVectorLayer {
  constructor() {
    super(shoreLineLayer)
  }

  removeLayer(map) {
    super.removeLayer(map)
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    // 清空图层
    this.removeLayer(map)
    this.addLayer(map)
    // 获取数据
    this.res = await getShoreLineScoreList({
    })
    this.res = this.res.message
    // 加载岸线空间数据
    const wfsUrl = 'https://gis.dcyun.com:48164/geoserver/RiverLakeLib/ows'
    const paramsBuild = {
        service: 'WFS',
        version: '1.0.0',
        request: 'GetFeature',
        typeName: 'RiverLakeLib:lqShoreline_84',
        maxFeatures: '10000',
        CQL_FILTER: '1=1',
        outputFormat: 'application/json'
    }
    axios.get(wfsUrl, { params: paramsBuild }).then(res => {
        this.fts = new GeoJSON().readFeatures(res.data)
        this.fts.forEach(ft => {
            this.res.forEach(re => {
                if(ft.getProperties().ucode === re.ucode) {
                    ft.setProperties(re)
                }
            })
        })
        this.addFeatures(this.fts)
    })
  }

  click(params) {
    const vm = params.getValueByKey('vm')
    const feature = params.getValueByKey('feature')
    const properties = feature.getProperties()
    properties.layerid = this.layerConfig.id
    vm.$emit('showPop', properties)
  }

  // 图例筛选
  legendChange(checks) {
    console.log('shore', checks);
    // 清空所有元素
    this.clear()
    let datas = this.fts.filter(ft => {
        return (ft.getProperties().shorelineConditionScore >= 90 && checks.indexOf('1') !== -1) ||
        (ft.getProperties().shorelineConditionScore >= 80 && ft.getProperties().shorelineConditionScore < 90 && checks.indexOf('2') !== -1) ||
        (ft.getProperties().shorelineConditionScore >= 70 && ft.getProperties().shorelineConditionScore < 80 && checks.indexOf('3') !== -1) ||
        (ft.getProperties().shorelineConditionScore >= 40 && ft.getProperties().shorelineConditionScore < 70 && checks.indexOf('4') !== -1) ||
        (ft.getProperties().shorelineConditionScore < 40 && ft.getProperties().shorelineConditionScore >= 0 && checks.indexOf('5') !== -1)
    })
    this.addFeatures(datas)
  }
}
export default ShoreLineLayer
