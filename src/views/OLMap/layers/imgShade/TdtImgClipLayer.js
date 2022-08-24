import BaseLayer from '../base/BaseLayer'
import { tdtImg, tdtImgAnnoLayer } from '../../config/layerConfig'
import LayerFactory from "../../factory/LayerFactory";

/**
 * 裁剪天地图
 * @extends BaseLayer
 */
class TdtImgClipLayer extends BaseLayer { // 天地图裁剪功能
  /**
   * 创建图层，如果有配置采用配置，没有则使用默认
   * @param {Object} layerConfig 图层配置
   */
  constructor(layerConfig) {
    const tdtConfig = JSON.parse(JSON.stringify(tdtImg))
    tdtConfig.zIndex = 5
    const config = layerConfig || tdtConfig
    config.source.tilePixelRatio = window.devicePixelRatio
    super(config)
  }

  load(vm, map, feature) {
    this.removeLayer(map)
    this.addLayer(map)
    tdtImgAnnoLayer.zIndex=6
    this.tdtImgAnnoLayer = LayerFactory.createLayer(tdtImgAnnoLayer)
    map.addLayer(this.tdtImgAnnoLayer)
    this.tdtImgAnnoLayer.on('postrender', (evt) => {
      // 根据多边形进行裁剪
      this.clip(evt.context, feature.getGeometry(), map)
      // 底图置灰
      // evt.context.filter = 'grayscale(100%)'
    })
  }

  clip(context, boundPolygon, map) {
    const featureType = boundPolygon.getType()
    context.save()
    context.scale(window.devicePixelRatio, window.devicePixelRatio)
    const pointArr = []
    if (featureType === 'Polygon') {
      this.poinToPixel(pointArr, boundPolygon, map)
    } else {
      boundPolygon.getPolygons().forEach((polygon) => {
        this.poinToPixel(pointArr, polygon, map)
      })
    }
    context.globalCompositeOperation = 'destination-in'
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
    context.fillStyle = '#000000'
    context.fill()
    context.restore()
  }

  poinToPixel(pointArr, polygon, map) {
    const coors = polygon.getCoordinates()
    for (let i = 0; i < coors.length; i++) {
      const coorTmp = coors[i]
      const pointTmp = []
      for (let j = 0; j < coorTmp.length; j++) {
        pointTmp.push(map.getPixelFromCoordinate(coorTmp[j]))
      }
      pointArr.push(pointTmp)
    }
  }
}

export default TdtImgClipLayer
