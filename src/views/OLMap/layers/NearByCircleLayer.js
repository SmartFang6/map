import Feature from 'ol/Feature'
import Circle from 'ol/geom/Circle'
import BaseVectorLayer from '../layers/base/BaseVectorLayer'

class NearByCircleLayer extends BaseVectorLayer {
  load(map, datas, radius) {
    if (!this.layer) {
      this.addLayer(map)
    }
    this.clear()
    this.drawCircles(datas, radius)
  }

  drawCircles(datas, radius) {
    // 将圆绘制到搜索图层中
    const degree = radius / (2 * Math.PI * 6371004) * 360
    // 圆
    const features = []
    datas.forEach(element => {
     const feature = new Feature({ geometry: new Circle([element.lgtd, element.lttd], degree) })
     features.push(feature)
    })
    this.addFeatures(features)
  }
}
export default NearByCircleLayer
