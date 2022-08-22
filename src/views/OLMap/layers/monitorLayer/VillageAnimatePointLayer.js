import MergeLayerImpl from '../base/impl/MergeLayerImpl'

// 引入 echarts 图层
import EChartsLayer from '../olecharts/index'
import NearByCircleLayer from '@/views/OLMap/layers/NearByCircleLayer'
import { warningAreaCircleLayer } from '@/views/OLMap/config/layerConfig'

class VillageAnimatePointLayer extends MergeLayerImpl {
  constructor(layerConfig) {
    super(layerConfig)
    this.echartsLayer = null
    this.warningAreaCircle = new NearByCircleLayer(warningAreaCircleLayer)// 添加圆样式
  }

  removeLayer(map) {
    if (this.echartsLayer) {
      this.echartsLayer.remove()
      this.echartsLayer = null
    }
    this.warningAreaCircle.removeLayer(map)// 移除圆样式
    super.removeLayer(map)
  }

  addLayer(map) {
    // 加载扩散点
    this.echartsLayer = new EChartsLayer({}, {
      hideOnZooming: true,
      hideOnMoving: true,
      hideOnRotating: true
    }, map)
    // 加载矢量图层
    super.addLayer(map)
  }

  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    const searchInfo = params.getValueByKey('searchInfo')
    // 追求简单直接移除图层
    this.removeLayer(map)
    // 直接加载图层
    this.addLayer(map)
    // 开始加载数据
    if (this.layerConfig.loadFunc) {
      this.res = await this.layerConfig.loadFunc({
        adcd: searchInfo.adcd
      }, vm)
    } else {
      this.res = []
    }
    this.legendChange()
// 添加圆样式
    this.warningAreaCircle.load(map, this.res, 1000)
  }

  clear() {
    this.echartsLayer.clear()
    super.clear()
  }

  legendChange(checks) {
    this.clear()
    const levelField = this.layerConfig.levelField
    const warnConfig = this.layerConfig.warnConfig
    const field = this.layerConfig.field
    if (!this.res) {
      return
    }
    let datas = this.res
    if (checks && this.res) {
      datas = this.res.filter(element => {
        return checks.indexOf(element[levelField]) !== -1
      })
    }

    // 表示需要展示预警内容
    const warnDatas = {
      effectScatter: [],
      scatter: []
    }
    if (warnConfig && datas) {
      datas.forEach(element => {
        warnDatas.scatter.push({
          name: element[field.id],
          value: [element[field.lgtd], element[field.lttd], element],
          symbol: 'image://' + warnConfig.icon,
          symbolSize: warnConfig.symbolSize || [15, 15]
        })
        warnDatas.effectScatter.push({
          name: element[field.id],
          value: [element[field.lgtd], element[field.lttd], element],
          rippleEffect: {
            color: warnConfig.color || '#FE3000'
          }
        })
      })
    }
    this.addFeatures(datas)
    this.addCharts(warnDatas)
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

  addCharts(datas) {
    const options = {
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'openlayers',
          zlevel: 2,
          rippleEffect: { // 涟漪特效
            color: '#FE3000',
            period: 2, // 动画时间，值越小速度越快
            brushType: 'fill', // 波纹绘制方式 stroke, fill
            scale: 15 // 波纹圆环最大限制，值越大波纹越大
          },
          data: datas.effectScatter
        },
        {
          type: 'scatter',
          coordinateSystem: 'openlayers',
          showEffectOn: 'render',
          rippleEffect: { brushType: 'stroke' },
          hoverAnimation: true,
          data: datas.scatter,
          zlevel: 3
        }
      ]
    }

    console.log(options)
    this.echartsLayer.setChartOptions(options)
  }
}
export default VillageAnimatePointLayer
