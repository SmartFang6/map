
import GeoJSON from 'ol/format/GeoJSON'
import Feature from 'ol/Feature'
import { fromExtent } from 'ol/geom/Polygon'
import { shadeLayer } from '../config/layerConfig'
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
class ShadeLayer {
  changeExtent(map) {
    if (this.feature) {
      map.getView().fit(this.feature.getGeometry().getExtent())
    }
  }

  async load(adcd, map, needfit) {
    // 加载边界数据
    if (!this.layer) {
      this.layer = new BaseVectorLayer(shadeLayer)
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
    if (features.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      this.feature = features[0]
      if (!needfit) {
        map.getView().fit(features[0].getGeometry().getExtent())
      }
    }
    this.handleMask(features)
  }

  // eslint-disable-next-line class-methods-use-this
  erase(geom) {
    const extent = [-180, -90, 180, 90]
    const polygonRing = fromExtent(extent)
    const featureType = geom.getType()
    if (featureType === 'MultiPolygon') {
      geom.getPolygons().forEach((polygon) => {
        const LinearRings = polygon.getLinearRings()
        LinearRings.forEach((LinearRing) => {
          polygonRing.appendLinearRing(LinearRing)
        })
      })
    } else {
      const LinearRings = geom.getLinearRings()
      LinearRings.forEach((LinearRing) => {
        polygonRing.appendLinearRing(LinearRing)
      })
    }
    return polygonRing
  }

  handleMask(fts) {
    const ft = fts[0]
    const coverGeom = this.erase(ft.getGeometry())
    const covertFt = new Feature({ geometry: coverGeom })
    this.layer.getSource().clear()
    this.layer.getSource().addFeature(covertFt)
  }
}

export default ShadeLayer
