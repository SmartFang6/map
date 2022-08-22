import DCLayer from './impl/DCLayer'
// import Feature from 'ol/Feature'
import GeoJSON from 'ol/format/GeoJSON'
import axios from 'axios'
// import Style from 'ol/style/Style'
// import Point from 'ol/geom/Point'
// import Fill from 'ol/style/Fill'
// import Icon from 'ol/style/Icon'
// import Stroke from 'ol/style/Stroke'

class WeiPianLayer extends DCLayer {
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
    const res = await axios.get('./weipian.geojson')
    const format = new GeoJSON()
    this.getSource().addFeatures(format.readFeatures(res.data))
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
export default WeiPianLayer
