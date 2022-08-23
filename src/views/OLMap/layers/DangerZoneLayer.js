import DCLayer from './impl/DCLayer'
// import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import axios from 'axios'
// import Style from 'ol/style/Style'
// import Point from 'ol/geom/Point'
// import Fill from 'ol/style/Fill'
// import Icon from 'ol/style/Icon'
// import Stroke from 'ol/style/Stroke'

class DangerZoneLayer extends DCLayer {
  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    const searchInfo = params.getValueByKey('searchInfo')
    this.removeLayer(map)
    if (!this.layer) {
      this.addLayer(map)
    }
    // 开始加载数据
    const res = await axios.get('./dangerarea.geojson')
    const format = new GeoJSON()
    const features = format.readFeatures(res.data)
    this.res = features
    features.forEach(element => {
      element.set('properties', element.getProperties())
    })
    this.legendChange()
    this.changeLegend(vm)
  }

  legendChange(checks) {
    this.clear()
    const levelField = this.layerConfig.levelField
    let datas = this.res
    if (checks) {
      datas = this.res.filter(element => {
        return checks.indexOf(element.get(levelField)) !== -1
      })
    }
    this.getSource().addFeatures(datas)
  }

  changeLegend(vm) {
    const levelField = this.layerConfig.levelField
    if (levelField) {
      const count = {}
      this.res.forEach(feature => {
        const element = feature.get('properties')
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
      console.log('as', count)
    } else {
      vm.$emit('changeLegend', {
        type: this.layerConfig.id,
        count: {
          0: this.res.length,
        },
      })
    }
  }

  /**
   * 点击事件
   * @param {LayerParams} params
   */
  click(params) {
    const vm = params.getValueByKey('vm')
    const feature = params.getValueByKey('feature')
    let properties = {}
    // console.log('clickfeature', feature, feature.getGeometry() instanceof Point)

    properties = feature.get('properties')
    properties.layerid = this.layerConfig.id
    vm.$emit('showPop', properties)
    // else {
    //   properties.名称 = feature.get('名称')
    //   properties.编号 = feature.get('编号')
    //   properties.id = feature.get('id')
    //   properties.ADMIN_DI_1 = feature.get('ADMIN_DI_1')
    // }
  }
}
export default DangerZoneLayer
