import BaseVectorLayer from '../layers/base/BaseVectorLayer'
import BaseLayer from './base/BaseLayer'
import { riverInfoLayer, riverFiveColorLayer, happinessRiverLayer } from '../config/layerConfig'
import { getHappyRiverList } from '@/apis/map'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { StyleTypeEnum } from '../enum/TypeEnum'
import SldUtils from '../utils/SldUtils'
import { geoserverPath } from '../config/geoserverConfig'
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON'
class RiverInfoLayer extends BaseVectorLayer {
  constructor() {
    super(riverInfoLayer)
    this.layers = {
      riverLayer: new BaseVectorLayer(happinessRiverLayer)
    }
    // this.riverLayer = new BaseVectorLayer(happinessRiverLayer)
  }

  removeLayer(map) {
    if (this.layers.riverLayer) {
      this.layers.riverLayer.removeLayer(map)
      // this.layers.riverLayer = null
    }
    super.removeLayer(map)
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    const searchInfo = params.getValueByKey('searchInfo')
    // 清空图层
    this.removeLayer(map)
    this.addLayer(map)
    // 获取数据
    this.res = await getHappyRiverList({
      adcd: searchInfo.adcd,
      indexId: '0',
      indexLevel: 'river_infos',
      indexType: '1',
      levelCode: searchInfo.adcd,
    })
    this.res = this.res.message.riversLakesListVOS
    // 表示需要加载河道五色图
    this.loadRiverColorLayer(this.res, map)
    this.addFeatures(this.res)
  }

  loadRiverColorLayer(res, map) {
    if (this.riverLayer) {
      this.riverLayer.removeLayer(map)
      this.riverLayer = null
    }
    let cqlArray = []
    this.res.forEach(element => {
      cqlArray.push(element.sydcRiverCode[0])
    })
    let cqlText = `code in ('` + cqlArray.join(`','`) + `')`
    // wfs加载
    const wfsUrl = 'https://gis.dcyun.com:48164/geoserver/RiverLakeLib/wfs'
    const paramsBuild = {
      service: 'WFS',
      version: '1.0.0',
      request: 'GetFeature',
      typeName: 'RiverLakeLib:lsRiver_84',
      maxFeatures: '10000',
      CQL_FILTER: cqlText,
      outputFormat: 'application/json',
    }
    axios.get(wfsUrl, {params: paramsBuild}).then(res => {
      const fts = new GeoJSON().readFeatures(res.data)
      fts.forEach(ft => {
        this.res.forEach(re => {
          if (re.sydcRiverCode[0] === ft.get('code')) {
            ft.set('happinessDegree', re.happinessDegree)
          }
        })
      })
      this.layers.riverLayer.addLayer(map)
      this.layers.riverLayer.addFeatures(fts)
    })
  }

  panToMap(params) {
    const vm = params.getValueByKey('vm')
    const row = params.getValueByKey('row')
    const field = this.layerConfig.field
    const feature = this.getSource().getFeatureById(
      this.layerConfig.id + '.' + row[field['id']]
    )
    if (feature) {
      vm.map.getView().fit(feature.getGeometry().getExtent())
    }
    const properties = row
    properties.searchInfo = vm.dataMsgProp
    properties.layerid = this.layerConfig.id
    vm.$emit('showPop', properties)
  }
  click(params) {
    const vm = params.getValueByKey('vm')
    const feature = params.getValueByKey('feature')
    const properties = feature.get('properties')
    properties.layerid = this.layerConfig.id
    vm.$emit('showPop', properties)
  }
  legendChange(checks) {
    let checksText = []
    let checkText = ''
    checks.forEach(check => {
      switch (check) {
        case '1':
          checkText = '非常幸福'
          break
        case '2':
          checkText = '幸福'
          break
        case '3':
          checkText = '比较幸福'
          break
        case '4':
          checkText = '一般'
          break
        case '5':
          checkText = '不幸福'
          break
      }
      checksText.push(checkText)
    })
    this.clear()
    const levelField = this.layerConfig.levelField
    if (!this.res) {
      return
    }
    let datas = this.res
    if (checks) {
      if (!levelField && checks.length > 0) {
        datas = this.res
      } else {
        datas = this.res.filter(element => {
          return checksText.indexOf(element[levelField]) !== -1
        })
      }
    }
    this.addFeatures(datas)
  }

  addFeatures(datas) {
    const features = this.createFeatures(datas)
    super.addFeatures(features)
  }
  createFeatures(datas) {
    const field = this.layerConfig.field
    const features = []
    datas.forEach(element => {
      if (element[field['lgtd']] && element[field['lttd']]) {
        element.lgtd = parseFloat(element[field['lgtd']])
        element.lttd = parseFloat(element[field['lttd']])
        const feature = new Feature({
          geometry: new Point([
            parseFloat(element[field['lgtd']]),
            parseFloat(element[field['lttd']]),
          ]),
        })
        const mapper = this.layerConfig.mapper
        if (mapper) {
          Object.keys(mapper).forEach(key => {
            element[key] = element[mapper[key]]
          })
        }
        feature.setId(this.layerConfig.id + '.' + element[field['id']])
        feature.set('properties', element)
        features.push(feature)
      }
    })
    return features
  }
}
export default RiverInfoLayer
