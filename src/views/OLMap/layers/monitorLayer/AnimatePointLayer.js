import MergeLayerImpl from '../base/impl/MergeLayerImpl'

// 引入 echarts 图层
import EChartsLayer from '../olecharts/index'

class AnimatePointLayer extends MergeLayerImpl {
  constructor(layerConfig) {
    super(layerConfig)
    this.echartsLayer = null
  }

  removeLayer(map) {
    if (this.echartsLayer) {
      this.echartsLayer.remove()
      this.echartsLayer = null
    }
    super.removeLayer(map)
  }

  addLayer(map) {
    // 加载扩散点
    this.echartsLayer = new EChartsLayer({}, {
      hideOnZooming: true,
      hideOnMoving: true,
      hideOnRotating: true,
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
      this.res = await this.layerConfig.loadFunc(searchInfo)
    } else {
      this.res = []
    }
    if (this.layerConfig.id === 'rainStation') { // 雨量站数据处理
      this.handleRainDatas(searchInfo)
    }
    this.legendChange()
    // this.changeLegend(vm)
  }

  // 单独处理雨量站数据
  handleRainDatas(searchInfo) {
    // 测试数据
    // this.res = {
    //   message:
    //     [
    //       {
    //         stnm: '测试1',
    //         drp: 20,
    //         lgtd: 120.01,
    //         lttd: 30.01,
    //         stcd: '1',
    //       }, {
    //         stnm: '测试2',
    //         drp: 2,
    //         lgtd: 119.99,
    //         lttd: 29.99,
    //         stcd: '2',
    //       },
    //     ],
    // }
    if (searchInfo.hour === 1) {
      // 1h的10mm以上为红色
      this.res.message.forEach((element) => {
        if (element.drp && element.drp > 10) {
          element.warnType = '1'
        } else {
          element.warnType = '0'
        }
      })
    } else if (searchInfo.hour === 3) {
      // 3h的50mm以上为红色
      this.res.message.forEach((element) => {
        if (element.drp && element.drp > 50) {
          element.warnType = '1'
        } else {
          element.warnType = '0'
        }
      })
    }
  }

  // changeLegend(vm) {
  //   const { levelField } = this.layerConfig
  //   if (levelField) {
  //     const count = {}
  //     this.res.message.forEach((element) => {
  //       if (count[element[levelField]]) {
  //         count[element[levelField]] += 1
  //       } else {
  //         count[element[levelField]] = 1
  //       }
  //     })
  //     vm.$emit('changeLegend', {
  //       type: this.layerConfig.id,
  //       count,
  //     })
  //   } else {
  //     vm.$emit('changeLegend', {
  //       type: this.layerConfig.id,
  //       count: { 0: this.res.message.length },
  //     })
  //   }
  // }

  clear() {
    this.echartsLayer.clear()
    super.clear()
  }

  legendChange(checks) {
    this.clear()
    const { levelField } = this.layerConfig
    const { warnConfig } = this.layerConfig
    const { field } = this.layerConfig
    let datas
    if (this.res) {
      datas = this.res.message
      if (checks) {
        datas = this.res.message.filter((element) => checks.indexOf(element[levelField]) !== -1)
      }
    }

    // 表示需要展示预警内容
    const warnDatas = {
      effectScatter: [],
      scatter: [],
    }
    if (warnConfig) {
      const warnChecks = []
      Object.keys(warnConfig).forEach((key) => {
        warnChecks.push(key)
      })
      if (datas && datas.length > 0) {
        datas.forEach((element) => {
          if (warnChecks.indexOf(element[levelField]) !== -1) {
            warnDatas.scatter.push({
              name: element[field.id],
              value: [element[field.lgtd], element[field.lttd], element],
              symbol: `image://${warnConfig[element[levelField]].icon}`,
              symbolSize: warnConfig[element[levelField]].symbolSize || [15, 15],
            })
            warnDatas.effectScatter.push({
              name: element[field.id],
              value: [element[field.lgtd], element[field.lttd], element],
              rippleEffect: { color: warnConfig[element[levelField]].color || '#FE3000' },
            })
          }
        })
      }
    }
    if (datas && datas.length > 0) {
      this.addFeatures(datas)
    }
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
            scale: 5, // 波纹圆环最大限制，值越大波纹越大
          },
          data: datas.effectScatter,
        },
        {
          type: 'scatter',
          coordinateSystem: 'openlayers',
          showEffectOn: 'render',
          rippleEffect: { brushType: 'stroke' },
          hoverAnimation: true,
          data: datas.scatter,
          zlevel: 3,
        },
      ],
    }

    console.log(options)
    this.echartsLayer.setChartOptions(options)
  }
}
export default AnimatePointLayer
