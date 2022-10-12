/*
 * @Author: chuyingf chuyingf@163.com
 * @Date: 2022-09-07 20:42:01
 * @LastEditors: chuyingf chuyingf@163.com
 * @LastEditTime: 2022-10-12 15:55:54
 * @FilePath: \river-lake-cockpit-front\src\views\OLMap\layers\impl\SubjectLayer.js
 * @Description: 涉河许可图层
 */
import MergeLayerImpl from '../base/impl/MergeLayerImpl'
import Polygon from 'ol/geom/Polygon'
import MultiPolygon from 'ol/geom/MultiPolygon'
import { getCenter } from 'ol/extent'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'

class DCLayer extends MergeLayerImpl {
  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    const searchInfo = params.getValueByKey('searchInfo')
    // 先移除图层
    this.removeLayer(map)
    // 重新加载图层
    if (!this.layer) {
      this.addLayer(map)
    }
    // 开始加载数据

    if (this.layerConfig.loadFunc) {
      this.res = await this.layerConfig.loadFunc(searchInfo)
      this.res = this.res
    } else {
      this.res = []
    }
    let features = []
    this.res.forEach(message => {
      if (message.subjectArea.waterPreAreaPoints) { // 占用水域
        const center = this.getCenterByPoints(message.subjectArea.waterPreAreaPoints)
        const record = {...message, lgtd: center[0], lttd: center[1], subjectType: 'waterPreAreaPoints', id: 'preArea' + message.id}
        features.push(record)
      }
      if (message.subjectArea.waterPreCompensateAreaPoints) { // 拟补偿水域
        const center = this.getCenterByPoints(message.subjectArea.waterPreCompensateAreaPoints)
        const record = {...message, lgtd: center[0], lttd: center[1], subjectType: 'waterPreCompensateAreaPoints', id: 'preCompensateArea' + message.id}
        features.push(record)
      }
      if (message.subjectArea.waterCompensateAreaPoints) { // 已补偿水域
        const center = this.getCenterByPoints(message.subjectArea.waterCompensateAreaPoints)
        const record = {...message, lgtd: center[0], lttd: center[1], subjectType: 'waterCompensateAreaPoints', id: 'compensateArea' + message.id}
        features.push(record)
      }
    })
    this.res = features
    this.clear()
    if (this.res.length > 0) {
      this.addFeatures(this.res)
    }
    // this.changeLegend(vm) // 分类型统计
  }

  // 根据坐标串获取中心点
  getCenterByPoints(points) {
    const jsonPoints = JSON.parse(points)
    let center = []
    switch(jsonPoints.type) {
      case 'Polygon':
        const polygon  = new Polygon(jsonPoints.coordinates)
        center = getCenter(polygon.getExtent())
        break
      case 'MultiPolygon':
        const multiPolygon = new MultiPolygon(jsonPoints.coordinates)
        center = getCenter(multiPolygon.getExtent())
        break
      default:
        break
    }
    return center
  }

  // 图例选择修改
  legendChange(checks) {
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
          return checks.indexOf(element[levelField]) !== -1
        })
      }
    }
    console.log('dc datas', datas)
    this.addFeatures(datas)
  }

  // 分类别统计
  changeLegend(vm) {
    const levelField = this.layerConfig.levelField
    if (levelField) {
      const count = {}
      this.res.forEach(element => {
        if (count[element[levelField]]) {
          count[element[levelField]] += 1
        } else {
          count[element[levelField]] = 1
        }
      })
      console.log('图例统计', {
        type: this.layerConfig.id,
        count: count
      });
      vm.$emit('changeLegend', {
        type: this.layerConfig.id,
        count: count
      })
    } else {
      vm.$emit('changeLegend', {
        type: this.layerConfig.id,
        count: {
          '0': this.res.length
        }
      })
    }
  }


  /**
   * 点击事件弹窗
   * @param {LayerParams} params
   */
  click(params) {
    const vm = params.getValueByKey('vm')
    const feature = params.getValueByKey('feature')
    const properties = feature.get('properties')
    properties.layerid = this.layerConfig.id
    console.log('click dclayer', properties)
    vm.$emit('showPop', properties)
  }
}
export default DCLayer
