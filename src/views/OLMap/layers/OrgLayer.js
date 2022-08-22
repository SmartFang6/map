/*
 * @usageFile: 快捷键：crtl+alt+i
 * @usageFunc: 快捷键：crtl+alt+t
 * @Description:
 * @version:
 * @Author:
 * @Date: 2021-07-15 16:36:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-04 18:31:34
 */
import BaseVectorLayer from './base/BaseVectorLayer'
import { orgLayer } from '../config/layerConfig'
import { geoServerConfig } from '../config/mapConfig'
import GeoJSON from 'ol/format/GeoJSON'
import { getMapAdcdFromSystem, getAdLevelBySystemAdcd, getChildFeatureTypesByAdLevel, getGisDataByWfs, getSystemAdcdFromMap, getParentAdcdBySystemAdcd } from '../common/commonRough'
class OrgLayer extends BaseVectorLayer {
  constructor() {
    super(orgLayer)
    this.minLevel = 4
    this.maxLevel = 1
    this.parentAdcd = ''
  }
  async load(map, adcd) {
    if (!this.layer) {
      this.addLayer(map)
    }
    this.clear()
    const mapadcd = getMapAdcdFromSystem(adcd)
    const adLevel = getAdLevelBySystemAdcd(adcd)
    const featureType = getChildFeatureTypesByAdLevel(adLevel)
    const geoserverParams = geoServerConfig.wfsParams
    geoserverParams['typeName'] = featureType
    geoserverParams['cql_filter'] = 'parent_code=' + mapadcd
    const result = await getGisDataByWfs(geoserverParams, geoServerConfig.url + '/ZhejiangAdminDivisionRough/wms')
    const features = new GeoJSON().readFeatures(result)
    // if (features.length > 0) {
    //   // eslint-disable-next-line prefer-destructuring
    //   this.feature = features[0]
    //   map.getView().fit(features[0].getGeometry().getExtent())
    // }
    features.forEach(feature => {
      // console.log(feature.get('admin_div_name'))
      feature.setId(`${this.layerConfig.id}.${feature.get('admin_div_code')}`)
    })
    this.addFeatures(features)
  }

  click(params) {
    const vm = params.getValueByKey('vm')
    const feature = params.getValueByKey('feature')
    const sysAdcd = getSystemAdcdFromMap(feature.get('admin_div_code'))
    const adLevel = getAdLevelBySystemAdcd(sysAdcd)
    if (adLevel !== vm.minLevel) { // 表示要下钻
      this.parentAdcd = getSystemAdcdFromMap(feature.get('parent_code'))
      vm.drillDown(sysAdcd)
      vm.isTopAdcd = false
    } else { // 表示已经是最小的层级了，无法下钻，将选中的元素丢到选中图层去就好了
      vm.layers.orgSelectLayer.addFeatures([feature])
    }
  }

  goBack(params) { // 返回上级
    const vm = params.getValueByKey('vm')
    const sysAdcd = this.parentAdcd
    const sysAdLevel = getAdLevelBySystemAdcd(sysAdcd)
    const parentAdcd = getParentAdcdBySystemAdcd(this.parentAdcd)
    if (sysAdLevel === vm.maxLevel) { // 表示不能返回上级
      vm.isTopAdcd = true
    }
    vm.drillDown(sysAdcd)
    this.parentAdcd = parentAdcd
  }
}
export default OrgLayer
