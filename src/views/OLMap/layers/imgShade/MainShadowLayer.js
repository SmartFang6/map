/*
 * @usageFile: 快捷键：crtl+alt+i
 * @usageFunc: 快捷键：crtl+alt+t
 * @Description:
 * @version:
 * @Author:
 * @Date: 2021-08-23 15:22:51
 * @LastEditors: chuyingf chuyingf@163.com
 * @LastEditTime: 2022-11-28 11:09:27
 */
import GeoJSON from 'ol/format/GeoJSON'
import ShadowLayer from './ShadowLayer'
import TdtImgClipLayer from './TdtImgClipLayer'
import {
  getAdLevelBySystemAdcd,
  getFeatureTypesByAdLevel,
  getGisDataByWfs,
  getMapAdcdFromSystem
} from '../../common/commonrough'
import { geoServerConfig } from '../../config/mapConfig'

/**
 * 带有阴影的遮罩层主入口
 */
class MainShadowLayer {
  init(config, feature) {
    if (!this.shadowLayer) {
      this.shadowLayer = new ShadowLayer(config.shadeLayer)
      this.shadowLayer.load(config.vm, config.map, feature, config.shadow)
    }
    if (!this.tdtImgClipLayer) {
      this.tdtImgClipLayer = new TdtImgClipLayer(config.baseLayer)
      this.tdtImgClipLayer.load(config.vm, config.map, feature)
    }
  }

  /**
   * 加载带有遮罩的图层
   * @param {Object} config - 配置
   * @param {ol.Map} config.map - 地图
   * @param {String} config.adcd - 行政区划编码 例如金华3307 浙江省33
   * @param {Object} config.baseLayer - 需要裁减的图层配置
   * @param {Object} config.shadeLayer - 作为阴影的矢量图层配置
   * @param {Object} config.vm - vue对象
   * @param {Object} config.shadow - 阴影相关配置 详细可以查看canvas阴影相关
   * @param {Number} config.shadow.shadowOffsetX - x向偏移
   * @param {Number} config.shadow.shadowOffsetY - y向偏移
   * @param {Number} config.shadow.shadowBlur - 模糊程度
   * @param {Number} config.shadow.shadowColor - 阴影颜色
   * @param {Number} config.shadow.fillStyle - 填充色颜色 （填充色颜色透明度不能设置为0，因为阴影的透明度收到填充色的透明度影响）
   */
  async load(config) {
    this.removeLayer(config.map)
    // if (config.adcd.length !== 2) { // 非省级
      const mapadcd = getMapAdcdFromSystem(config.adcd)
      const adLevel = getAdLevelBySystemAdcd(config.adcd)
      const featureType = getFeatureTypesByAdLevel(adLevel)
      const params = geoServerConfig.wfsParams
      params.typeName = featureType
      params.cql_filter = `admin_div_code=${mapadcd}`
      console.log('---------------',geoServerConfig.url);
      const result = await getGisDataByWfs(
        params,
        `${geoServerConfig.url}/ZhejiangAdminDivisionRough/wms`,
      )
      const features = new GeoJSON().readFeatures(result)
      if (features.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        this.feature = features[0]
        if (!config.notFit) {
          config.map.getView().fit(features[0].getGeometry().getExtent())
        } // 视图定位
      }

      this.init(config, features[0])
    // }
  }

  /**
   * 移除图层操作
   * @param {ol.Map} map
   */
  removeLayer(map) {
    if (this.tdtImgClipLayer) {
      this.tdtImgClipLayer.removeLayer(map)
      this.tdtImgClipLayer = null
    }
    if (this.shadowLayer) {
      this.shadowLayer.removeLayer(map)
      this.shadowLayer = null
    }
  }
}
export default MainShadowLayer
