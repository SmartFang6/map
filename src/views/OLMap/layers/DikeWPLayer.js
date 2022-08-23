import BaseVectorLayer from './base/BaseVectorLayer'
import Feature from 'ol/Feature'
import MultiLineString from 'ol/geom/MultiLineString'
class DikeWPLayer extends BaseVectorLayer {
  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    this.removeLayer(map)
    const searchInfo = params.getValueByKey('searchInfo')
    this.addLayer(map)

    this.res = await this.layerConfig.loadFunc({
      adcd: searchInfo.adcd
    })
    this.legendChange()
  }

  legendChange(checks) {
    this.clear()
    const levelField = this.layerConfig.levelField
    let datas = this.res
    if (checks) {
      datas = this.res.filter(element => {
        return checks.indexOf(element[levelField]) !== -1
      })
    }
    this.addFeatures(datas)
  }

  addFeatures(datas) {
    const features = []
    let temp = document.createElement('div')
    datas.forEach(element => {
      let coordStr = element.coordinates
      temp.innerHTML = coordStr
      const output = temp.innerText || temp.textContent
      try {
        coordStr = JSON.parse(output)
        const coords = []
        coordStr.forEach(coord => {
          const arr = []
          coord.forEach(c => {
            arr.push([c.lng, c.lat])
          })
          coords.push(arr)
        })
        const feature = new Feature({
          geometry: new MultiLineString(coords)
        })
        feature.setId(`${this.layerConfig.id}.${element.stationId}`)
        element.lgtd = element.longitude
        element.lttd = element.latitude
        element.fid = element.stationId
        feature.set('properties', element)
        features.push(feature)
      } catch (e) {}
    })
    this.getSource().addFeatures(features)
    // super.addFeatures(features)
  }

  /**
   * 点击事件
   * @param {LayerParams} params
   */
   click(params) {
    const vm = params.getValueByKey('vm')
    const feature = params.getValueByKey('feature')
    const properties = feature.get('properties')
    properties.layerid = this.layerConfig.id
    vm.$emit('showPop', properties)
  }
}
export default DikeWPLayer
