/*
 * @usageFile: 快捷键：crtl+alt+i
 * @usageFunc: 快捷键：crtl+alt+t
 * @Description:
 * @version:
 * @Author:
 * @Date: 2021-07-06 15:09:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-10 14:14:38
 */
import BaseLayer from './base/BaseLayer'
import { tdtVec } from '../config/baseLayerConfig'

class TdtImgClipLayer extends BaseLayer { // 天地图裁剪功能
  constructor() {
    super(tdtVec)
  }

  load(vm, map, feature) {
    this.removeLayer(map)
    this.addLayer(map)
    this.layer.on('postrender', (evt) => {
      // 根据多边形进行裁剪
      // this.clip(evt.context, feature.getGeometry(), map)
      // 底图置灰
      // -webkit-filter: ;
      // evt.context.filter = 'contrast(150%) brightness(70%) saturate(10%) '
      // evt.context.filter = 'grayscale(50%)'
    })
  }
  clip(context, boundPolygon, map) {
    const featureType = boundPolygon.getType()
    context.save()
    const pointArr = []
    if (featureType === 'Polygon') {
      this.poinToPixel(pointArr, boundPolygon, map)
    } else {
      boundPolygon.getPolygons().forEach(polygon => {
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
