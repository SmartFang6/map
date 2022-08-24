import MergeLayerImpl from '../base/impl/MergeLayerImpl'

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
      // console.log('res1', this.res);
      this.res = this.res
    } else {
      this.res = []
    }
    // console.log('load res', this.res);
    // this.legendChange()
    this.clear()
    if (this.res.length > 0) {
      this.addFeatures(this.res)
    }
    return this.res[0]
  }

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

  // 针对AI监管的deCiIndex,checks-图例,time-时间
  legendTimeChange(checks, time) {
    console.log('deci', checks, time)
    this.clear()
    if (!this.res) {
      return
    }
    let datas = this.res
    console.log('datas', datas)
    // 图例过滤
    if (checks) {
      if (checks.length > 0) {
        datas = this.res.filter(element => {
          return checks.indexOf((Number(element.status) + 1).toString()) !== -1 // 将图例中的字符串1234和status中的数字0123做对应
        })
      } else {
        datas = []
      }
    }
    console.log('check', datas)
    // 时间过滤
    if (time) {
      datas = datas.filter(element => {
        let proTime = Number(new Date(element.problemTime)) // 字符串时间转化为时间戳
        return proTime >= time[0] && proTime <= time[1]
      })
    }
    console.log('end', datas)
    this.addFeatures(datas)
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
