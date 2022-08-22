import BaseVectorLayer from '../layers/base/BaseVectorLayer'
import { youbudaoLayer, hydrophilicAndConvenientLayer } from '../config/layerConfig'
import { getQSBMList } from '@/apis/map'
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON'
import MergeLayerImpl from './base/impl/MergeLayerImpl'
class QSBMLayer extends MergeLayerImpl {
  constructor() {
    super(hydrophilicAndConvenientLayer)
    this.layers = {
      youbudaoLayer: new BaseVectorLayer(youbudaoLayer)
    }
  }

  removeLayer(map) {
    if (this.layers.youbudaoLayer) {
      this.layers.youbudaoLayer.removeLayer(map)
    }
    super.removeLayer(map)
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    this.map = map
    const searchInfo = params.getValueByKey('searchInfo')
    // 清空图层
    this.removeLayer(map)
    if (!this.layer) {
        this.addLayer(map)
    }
    // 获取数据
    this.res = await getQSBMList(searchInfo)
    this.res = this.res.message

    // 添加游步道外的点位
    const datas = this.res.filter(ele => {
        return ele.category !== '游步道'
    })
    this.addFeatures(datas)
    // 添加游步道线图层
    this.addYoubudaoLayer(map)

    this.changeLegend(vm)
  }

  // 添加游步道线图层
  addYoubudaoLayer(map) {
    axios.get('./youbudao.json', {}).then(response => {
        const fts = new GeoJSON().readFeatures(response.data)
        fts.forEach(ft => {
            this.res.forEach(re => {
                if (ft.getProperties().名称 === re.facilitiesName) {
                    ft.setProperties(re)
                }
            })
        })
        this.layers.youbudaoLayer.addLayer(map)
        this.layers.youbudaoLayer.addFeatures(fts)
    })
  }

  // 统计数据给前端
  changeLegend(vm) {
    const levelField = this.layerConfig.levelField
    if (levelField) {
      const count = {}
      this.res.forEach(element => {
        if (count[element[levelField]]) {
          count[element[levelField]] += 1
        } else {
          count[element[levelField]] = 1
        }
      })
      vm.$emit('changeLegend', {
        type: this.layerConfig.id,
        count: count,
      })
    } else {
      vm.$emit('changeLegend', {
        type: this.layerConfig.id,
        count: {
          0: this.res.length,
        },
      })
    }
  }

  // 图例筛选
  legendChange(checks) {
    // 清除点位，移除游步道
    this.clear()
    this.layers.youbudaoLayer.removeLayer(this.map)

    // 筛选
    const levelField = this.layerConfig.levelField
    if (!this.res) {
        return
    }
    let datas = this.res.filter(ele => {
        return ele.category !== '游步道'
    })
    if(checks.length === 0) {
        datas = []
    } else {
        datas = datas.filter(data => {
            return checks.indexOf(data[levelField]) !== -1
        })
    }
    if(checks.indexOf('游步道') !== -1) {
        this.addYoubudaoLayer(this.map)
    }
    this.addFeatures(datas)
  }

  // 点击事件
  click(params) {
    const vm = params.getValueByKey('vm')
    const layerid = params.getValueByKey('layerid')
    const feature = params.getValueByKey('feature')
    var properties
    if (layerid === 'youbudao') {
        properties = feature.getProperties()
    } else {
        properties = feature.get('properties')
    }
    properties.layerid = this.layerConfig.id
    vm.$emit('showPop', properties)
  }

}
export default QSBMLayer
