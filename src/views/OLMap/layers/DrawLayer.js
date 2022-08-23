import BaseVectorLayer from '../layers/base/BaseVectorLayer'
import LineString from 'ol/geom/LineString'
import GeoJSON from 'ol/format/GeoJSON'
import Draw from 'ol/interaction/Draw'
import { drawLayer } from '../config/layerConfig'
import { getLength } from 'ol/sphere'
import Overlay from 'ol/Overlay'
import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'

class DrawLayer extends BaseVectorLayer {
  constructor(map) {
    super(drawLayer)
    this.map = map
  }
  // 绘制元素
  drawFeature(params, type, callback) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    if (!this.layer) {
      this.addLayer(map)
    }
    this.stopDraw(map)
    this.draw = new Draw({
      source: this.getSource(),
      type: type,
      stopClick: true,
      // style: this.layerConfig.style
      style:(feature,type)=>{
        let text = ''
        let style
          if(type === 'Point'){
            style = new Style({
              image: new Icon({
                src: loaction
              })
            })
          }else{
            text = feature.get('length') ? feature.get('length') : ''
            style = new Style({
              fill: new Fill({
                color: 'rgba(216,30,6,0.4)'
              }),
              stroke: new Stroke({
                color: 'rgb(216,30,6)',
                width: 1
              }),
              text: new Text({
                text,
                font: '15px Arial',
                color: '#ff0000',
                haoColor: '#ff0000',
                haoWidth: 0
              })
            })
          }
          return style
      }
    })
    map.addInteraction(this.draw)
    this.draw.on('drawstart', (evt) => {
      this.startDraw(evt, map)
    })
    this.draw.on('drawend', (evt) => {
      this.endDraw(evt, params)
      if (callback) {
        callback(evt.feature)
      }
    })
  }
  // 开始绘制
  startDraw(evt, map) {
    if (this.layer) {
      super.clear()
    }
    if (this.measureTooltip) {
      map.removeOverlay(this.measureTooltip)
      this.measureTooltip = null
    }
    const feature = evt.feature
    const type = feature.getGeometry().getType()
    if (type !== 'Point') {
      this.createMeasureTooltip(map)
    }
    feature.getGeometry().on('change', (e) => {
      const geom = e.target
      let tooltipCoord = [0,0]
      if (geom instanceof LineString) {
        this.measureTooltipElement.innerHTML = this.formatLength(geom, map)
        tooltipCoord = geom.getLastCoordinate()
      }
      this.measureTooltip.setPosition(tooltipCoord)
    })
  }
  endDraw(evt, params) {
    // this.stopDraw(map)
    const vm = params.getValueByKey('vm')
    const feature = evt.feature
    const type = feature.getGeometry().getType()
    if (type === 'LineString') {
      const writer = new GeoJSON()
      const geoJsonStr = writer.writeGeometry(evt.feature.getGeometry())
      vm.$emit('LineStringDraw',geoJsonStr)
    }
  }
  /**
   * 结束绘制
   */
  stopDraw(map) {
    if (this.draw) {
      map.removeInteraction(this.draw)
      this.draw = undefined
    }
    if (this.measureTooltip) {
      map.removeOverlay(this.measureTooltip)
      this.measureTooltip = null
    }
  }
  addLayer(map) {
    this.layer = this.getLayer()
    map.addLayer(this.layer)
  }
  /**
   * 计算线长度
   */
  formatLength(line, map) {
    let sourceProj = map.getView().getProjection()
    let length = getLength(line, {
      projection: sourceProj
    })
    let output
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm'
    }
    return output
  }
  // 创建弹窗
  createMeasureTooltip(map) {
    this.measureTooltipElement = document.createElement('div')
    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false
    })
    map.addOverlay(this.measureTooltip)
  }
  /**
   * 清空绘制的元素
   */
  clear(map) {
    
    if (this.layer) {
      console.log('clear')
      super.clear()
    }
    this.stopDraw(map)
  }
}
export default DrawLayer
