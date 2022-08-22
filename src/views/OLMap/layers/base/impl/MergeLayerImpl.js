import BaseMergeLayer from '../BaseMergeLayer'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
/**
 * 全部图层都可以使用的图层类，建议使用
 * @extends BaseMergeLayer
 * @example
 * let layerConfig = {
 *   id:'layerid',
 *   type:LayerTypeEnum.vector,
 *   source:{
 *      type:SourceTypeEnum.vector
 *   },
 *   zIndex:10,
 *   style:{
 *      type:StyleTypeEnum.icon,
 *      icon:{
 *        src:'imgsrc',
 *        scale:0.8
 *      }
 *   },
 *   loadFunc:function(params){},// 调用load时将被调用,用于请求接口获取数据 params 为调用load传入的参数 this指向MergeLayerImpl 类
 *   clickFunc:function(params){},// 调用click时将被调用
 *   mouseoverFunc:function(params){},// 调用mouseover时将被调用
 * }
 */
class MergeLayerImpl extends BaseMergeLayer {
  /**
   * 加载图层
   * @param {LayerParams} params
   */
  load(params) {
    const map = params.map
    if (!this.layer) {
      this.addLayer(map)
    }
    this.clear()
    if (this.layerConfig.loadFunc) {
      this.layerConfig.loadFunc.call(this, params)
    }
  }

  /**
   * 点击事件
   * @param {LayerParams} params
   */
  click(params) {
    if (this.layerConfig.clickFunc) {
      this.layerConfig.clickFunc.call(this, params)
    }
  }

  /**
   * 鼠标经过事件
   * @param {LayerParams} params
   */
  mouseover(params) {
    if (this.layerConfig.mouseoverFunc) {
      this.layerConfig.mouseoverFunc.call(this, params)
    }
  }

  /**
     * 添加元素
     * @param {Array} datas - 接口返回的数据
     */
  addFeatures(datas) {
      const features = this.createFeatures(datas)
      super.addFeatures(features)
      this.getSource().getFeatures()
  }

  /**
   * 创建features对象
   * @param {Array} datas - 接口返回的对象
   * @returns {Array}
   */
  createFeatures(datas) {
      const { field } = this.layerConfig
      const features = []
      datas.forEach((element) => {
          if (element[field.lgtd] && element[field.lttd]) {
              element.lgtd = parseFloat(element[field.lgtd])
              element.lttd = parseFloat(element[field.lttd])
              element.fid = element[field.id]
              element.layerid = this.layerConfig.id
              const feature = new Feature({ geometry: new Point([parseFloat(element[field.lgtd]), parseFloat(element[field.lttd])]) })
              if (field.id) {
                  feature.setId(`${this.layerConfig.id}.${element[field.id]}`)
              }
              feature.set('properties', element)
              features.push(feature)
          }
      })
      return features
  }
}
export default MergeLayerImpl
