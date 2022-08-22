
import GeoJSON from 'ol/format/GeoJSON'
import { innerShadeLayer } from '../config/layerConfig'
import {
  getAdLevelBySystemAdcd,
  getFeatureTypesByAdLevel,
  getGisDataByWfs,
  getMapAdcdFromSystem
} from '../common/common'
import { geoServerConfig } from '../config/mapConfig'
import BaseVectorLayer from './base/BaseVectorLayer'
/**
 * 遮罩层
 */
class InnerShadeLayer {
  changeExtent(map) {
    if (this.feature) {
      map.getView().fit(this.feature.getGeometry().getExtent())
    }
  }

  async load(adcd, map) {
    // 加载边界数据
    if (!this.layer) {
      this.layer = new BaseVectorLayer(innerShadeLayer)
      this.layer.addLayer(map)
    }
    this.layer.clear()
    const mapadcd = getMapAdcdFromSystem(adcd)
    const adLevel = getAdLevelBySystemAdcd(adcd)
    const featureType = getFeatureTypesByAdLevel(adLevel)
    const params = geoServerConfig.wfsParams
    params.typeName = featureType
    params.cql_filter = `admin_div_code=${mapadcd}`
    const result = await getGisDataByWfs(
        params,
        `${geoServerConfig.url}/ZhejiangAdminDivision/wms`
      )
    const features = new GeoJSON().readFeatures(result)
    this.layer.getSource().addFeatures(features)
  }
}

export default InnerShadeLayer
