import DCLayer from './impl/DCLayer'
// import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import axios from 'axios'
import Style from 'ol/style/Style'
import Point from 'ol/geom/Point'
import Fill from 'ol/style/Fill'
import Icon from 'ol/style/Icon'
import Stroke from 'ol/style/Stroke'

class RiverPermitLayer extends DCLayer {
  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    const searchInfo = params.getValueByKey('searchInfo')
    this.removeLayer(map)
    if (!this.layer) {
      this.addLayer(map)
    }
    // 开始加载数据
    if (this.layerConfig.loadFunc) {
      this.res = await this.layerConfig.loadFunc(
        {
          adcd: searchInfo.adcd,
        },
        vm
      )
    } else {
      this.res = []
    }
    this.legendChange()
    // const res = await axios.get('./sheshuixiangmu.geojson')
    // const format = new GeoJSON()
    // this.getSource().addFeatures(format.readFeatures(res.data))
    const img = new Image()
    img.src = require('@/assets/images/map/redriver.png')
    img.onload = () => {
      console.log('图片加载')
      const canvas = document.createElement('canvas')
      canvas.width = 10
      canvas.height = 10
      const ctx = canvas.getContext('2d')
      const pattern = ctx.createPattern(img, 'repeat')
      this.getLayer().setStyle([
        new Style({
          fill: new Fill({
            color: pattern,
          }),
          stroke: new Stroke({
            color: 'red',
            width: 2,
          }),
        }),
        new Style({
          image: new Icon({
            src: require('@/assets/images/map/riverpermit.png'),
            scale: 1,
          }),
        }),
      ])
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
    console.log('clickfeature', feature, feature.getGeometry() instanceof Point)
    if (feature.getGeometry() instanceof Point) {
      properties = feature.get('properties')
      properties.layerid = this.layerConfig.id
      vm.$emit('showPop', properties)
    }
    // else {
    //   properties.名称 = feature.get('名称')
    //   properties.编号 = feature.get('编号')
    //   properties.id = feature.get('id')
    //   properties.ADMIN_DI_1 = feature.get('ADMIN_DI_1')
    // }
  }
}
export default RiverPermitLayer
