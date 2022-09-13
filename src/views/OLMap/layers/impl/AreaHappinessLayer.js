import BaseVectorLayer from '../base/BaseVectorLayer'
import * as common from '../../common/common'
import { geoServerConfig } from '../../config/mapConfig'
import GeoJSON from 'ol/format/GeoJSON'
import { postRequest } from '@/utils/axios'
import {getDomainName} from "@/utils/config";
class AreaHappinessLayer extends BaseVectorLayer {
  constructor(layerConfig) {
    super(layerConfig)
    this.adcdFeatures = {}
    //   this.interval = null// 轮播定时器
    //   this.needInterval = false// 需要定时器
    // }
    // removeLayer(map) {
    //   this.removeInterval()// 移除定时器
  }

  async load(params) {
    // this.removeInterval()
    const vm = params.getValueByKey('vm')
    const map = params.map
    const searchInfo = params.searchInfo
    const adcd = searchInfo.adcd
    this.removeLayer(map, vm)
    if (!this.adcdFeatures[adcd]) {
      const mapadcd = common.getMapAdcdFromSystem(adcd)
      const adLevel = common.getAdLevelBySystemAdcd(adcd)
      const featureType = common.getChildFeatureTypesByAdLevel(adLevel)
      const geoserverParams = geoServerConfig.wfsParams
      geoserverParams.typeName = featureType
      geoserverParams.cql_filter = `parent_code=${mapadcd}`
      const result = await common.getGisDataByWfs(
        geoserverParams,
        `${geoServerConfig.url}/ZhejiangAdminDivision/wms`
      )
      this.adcdFeatures[adcd] = new GeoJSON().readFeatures(result)
    }
    // 获取幸福指数
    const domainName = getDomainName()
    const res = await postRequest(
      domainName + '/api/evaluateIndex/listHappinessIndex',
      {
        indexId: '0',
        indexLevel: 'town',
        indexType: '1',
        levelCode: adcd,
        adcd: adcd,
      }
    )
    // res.message = [
    //   {
    //     happinessDegree: '非常幸福',
    //     happinessIndex: '92.3分',
    //     isBeautiful: true,
    //     orderById: '92.3',
    //     townCode: '331181001',
    //     townshipName: '龙渊街道',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '幸福',
    //     happinessIndex: '84.4分',
    //     isBeautiful: true,
    //     orderById: '84.4',
    //     townCode: '331181002',
    //     townshipName: '西街街道',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '比较幸福',
    //     happinessIndex: '74.4分',
    //     isBeautiful: true,
    //     orderById: '74.4',
    //     townCode: '331181003',
    //     townshipName: '剑池街道',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '一般',
    //     happinessIndex: '55.4分',
    //     isBeautiful: true,
    //     orderById: '55.4',
    //     townCode: '331181004',
    //     townshipName: '石达石街道',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '不幸福',
    //     happinessIndex: '23.3分',
    //     isBeautiful: true,
    //     orderById: '23.3',
    //     townCode: '331181100',
    //     townshipName: '八都镇',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '非常幸福',
    //     happinessIndex: '95.6分',
    //     isBeautiful: true,
    //     orderById: '95.6',
    //     townCode: '331181101',
    //     townshipName: '上垟镇',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '幸福',
    //     happinessIndex: '85.6分',
    //     isBeautiful: true,
    //     orderById: '85.6',
    //     townCode: '331181102',
    //     townshipName: '小梅镇',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '非常幸福',
    //     happinessIndex: '93.0分',
    //     isBeautiful: true,
    //     orderById: '93.0',
    //     townCode: '331181103',
    //     townshipName: '查田镇',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '一般',
    //     happinessIndex: '64.4分',
    //     isBeautiful: true,
    //     orderById: '64.4',
    //     townCode: '331181104',
    //     townshipName: '安仁镇',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '幸福',
    //     happinessIndex: '89.7分',
    //     isBeautiful: true,
    //     orderById: '89.7',
    //     townCode: '331181105',
    //     townshipName: '锦溪镇',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '不幸福',
    //     happinessIndex: '34.4分',
    //     isBeautiful: true,
    //     orderById: '34.4',
    //     townCode: '331181106',
    //     townshipName: '住龙镇',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '非常幸福',
    //     happinessIndex: '97.1分',
    //     isBeautiful: true,
    //     orderById: '97.1',
    //     townCode: '331181107',
    //     townshipName: '屏南镇',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '比较幸福',
    //     happinessIndex: '76.6分',
    //     isBeautiful: true,
    //     orderById: '76.6',
    //     townCode: '331181200',
    //     townshipName: '兰巨乡',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '幸福',
    //     happinessIndex: '88.3分',
    //     isBeautiful: true,
    //     orderById: '88.3',
    //     townCode: '331181203',
    //     townshipName: '竹垟畲族乡',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '一般',
    //     happinessIndex: '64.8分',
    //     isBeautiful: true,
    //     orderById: '64.8',
    //     townCode: '331181206',
    //     townshipName: '城北乡',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '非常幸福',
    //     happinessIndex: '95.1分',
    //     isBeautiful: true,
    //     orderById: '95.1',
    //     townCode: '331181204',
    //     townshipName: '道太乡',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '不幸福',
    //     happinessIndex: '31.2分',
    //     isBeautiful: true,
    //     orderById: '31.2',
    //     townCode: '331181205',
    //     townshipName: '岩樟乡',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '幸福',
    //     happinessIndex: '86.6分',
    //     isBeautiful: true,
    //     orderById: '86.6',
    //     townCode: '331181207',
    //     townshipName: '龙南乡',
    //     trend: null,
    //   },
    //   {
    //     happinessDegree: '幸福',
    //     happinessIndex: '85.1分',
    //     isBeautiful: true,
    //     orderById: '85.1',
    //     townCode: '331181202',
    //     townshipName: '宝溪乡',
    //     trend: null,
    //   },
    // ]
    this.adcdFeatures[adcd].forEach(feature => {
      const happyscore = common.getSystemAdcdFromMap(
        feature.get('admin_div_code')
      )
      feature.setId(`${this.layerConfig.id}.${happyscore}`)
      feature.set('properties', {})
      for (let i = 0; i < res.message.length; i++) {
        if (res.message[i].townCode === happyscore) {
          feature.set('properties', res.message[i])
          break
        }
      }
    })
    this.addLayer(map)

    this.addFeatures(this.adcdFeatures[adcd])
    vm.initInterval()
    // 增加定时器
    // this.needInterval = true
    // this.addInterval()
  }

  removeLayer(map, vm) {
    vm.layers.selectLayer.clear()
    vm.removeInterval()
    super.removeLayer(map)
  }

  click(params) {
    // this.removeInterval()
    const vm = params.getValueByKey('vm')
    const feature = params.getValueByKey('feature')
    const properties = feature.get('properties')
    const coord = params.getValueByKey('coord')
    properties.layerid = this.layerConfig.id
    properties.lgtd = coord[0]
    properties.lttd = coord[1]
    vm.layers.selectLayer.addFeatures([feature]) // 高亮
    vm.$emit('showPop', properties)
    // vm.popInfo = properties
    // vm.$nextTick(() => {
    // vm.areaHappyShow = true
    // })
  }
  addInterval() {
    let index = 0
    this.interval = setInterval(() => {
      const source = this.getSource()
      if (source) {
        const features = source.getFeatures()
        if (features.length > 0) {
          if (index >= features.length) {
            index = 0
          }
        }
        const feature = features[index]
        this.showPop(this, feature)
      }
      index++
    }, 2000)
  }

  // removeInterval() {
  //   if (this.interval) {
  //     clearInterval(this.interval)
  //     this.interval = null
  //   }
  // }
}
export default AreaHappinessLayer
