import BaseVectorLayer from '../base/BaseVectorLayer'
import { shadowLayer } from '../../config/layerConfig'

/**
 * 阴影图层 用于给图层添加阴影
 */
class ShadowLayer extends BaseVectorLayer {
  /**
   * 创建图层
   * 使用内部填充元素
   * @param layerConfig
   */
  constructor(layerConfig) {
    const config = layerConfig || shadowLayer
    super(config)
  }

  load(vm, map, feature, shadow) {
    this.removeLayer(map)
    this.addLayer(map)
    this.layer.on('prerender', (evt) => {
      // 根据多边形添加阴影
      this.addShade(evt.context, feature.getGeometry(), map, shadow)
    })
    this.addFeatures([feature])
  }

  addShade(context, boundPolygon, map, shadow) { // 裁剪
    const featureType = boundPolygon.getType()
    if (featureType === 'Polygon') {
      this.shade(context, boundPolygon, map, shadow)
    } else {
      boundPolygon.getPolygons().forEach((polygon) => {
        this.shade(context, polygon, map, shadow)
      })
    }
  }

  shade(context, boundPolygon, map, shadow) {
    if (!shadow) {
      shadow = {}
    }
    context.save()
    context.scale(window.devicePixelRatio, window.devicePixelRatio)
    const coors = boundPolygon.getCoordinates()
    const pointArr = []
    for (let i = 0; i < coors.length; i++) {
      const coorTmp = coors[i]
      const pointTmp = []
      for (let j = 0; j < coorTmp.length; j++) {
        pointTmp.push(map.getPixelFromCoordinate(coorTmp[j]))
      }
      pointArr.push(pointTmp)
    }
    context.beginPath()
    for (let i = 0; i < pointArr.length; i++) {
      const pointTmp = pointArr[i]
      for (let j = 0; j < pointTmp.length; j++) {
        if (j === 0) {
          context.moveTo(pointTmp[j][0], pointTmp[j][1])
        } else {
          context.lineTo(pointTmp[j][0], pointTmp[j][1])
        }
      }
    }
    context.closePath()
    context.shadowOffsetX = shadow.shadowOffsetX || -14
    context.shadowOffsetY = shadow.shadowOffsetY || 14
    context.shadowBlur = shadow.shadowBlur || 8
    context.shadowColor = shadow.shadowColor || 'rgba(0,0,0, 1)'
    context.fillStyle = shadow.fillStyle || 'rgba(0,0,0,0.6)'
    context.fill()
    context.restore()
  }
}
export default ShadowLayer
