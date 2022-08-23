import BaseVectorLayer from './base/BaseVectorLayer'
import axios from 'axios'
import GeoJSON from 'ol/format/GeoJSON'
import { geoserverPath } from '../config/geoserverConfig'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { riverGisLayer } from '../config/layerConfig'

class RiverGisLayer extends BaseVectorLayer {
  constructor() {
    super(riverGisLayer)
  }
  async load(params) {
    const vm = params.getValueByKey('vm')
    const { map } = vm
    this.removeLayer(map)
    this.addLayer(map)
    const rvCode = params.getValueByKey('searchInfo')
    console.log('gis layer', rvCode);
    const riverAreaStr = await axios.get(`${geoserverPath.riverLakeOws}?service=WFS&version=1.0.0&request=GetFeature&typeName=RiverLakeLib%3AlsRiver_84&maxFeatures=50&outputFormat=application%2Fjson&cql_filter=code='${rvCode}'`)
    const riverCenterLineStr = await axios.get(`${geoserverPath.oneMapCityWms}?service=WFS&version=1.0.0&request=GetFeature&typeName=OneMapCity%3Avw_river_centerline&maxFeatures=50&outputFormat=application%2Fjson&cql_filter=code='${rvCode}'`)
    const riverManagelineStr = await axios.get(`${geoserverPath.oneMapCityWms}?service=WFS&version=1.0.0&request=GetFeature&typeName=OneMapCity%3Avw_river_manageline&maxFeatures=50&outputFormat=application%2Fjson&cql_filter=code='${rvCode}'`)
    const riverApproachlineStr = await axios.get(`${geoserverPath.oneMapCityWms}?service=WFS&version=1.0.0&request=GetFeature&typeName=OneMapCity%3Avw_river_approachline&maxFeatures=50&outputFormat=application%2Fjson&cql_filter=code='${rvCode}'`)
    const format = new GeoJSON()
    this.getSource().addFeatures(format.readFeatures(riverAreaStr.data))
    this.getSource().addFeatures(format.readFeatures(riverCenterLineStr.data))
    this.getSource().addFeatures(format.readFeatures(riverManagelineStr.data))
    this.getSource().addFeatures(format.readFeatures(riverApproachlineStr.data))
    const points = []
    const centerLineFeatures = format.readFeatures(riverCenterLineStr.data)
    const startPoint = new Feature({
      geometry: new Point(centerLineFeatures[0].getGeometry().getFirstCoordinate())
    })
    startPoint.set('type', 'start')
    points.push(startPoint)
    const endPoint = new Feature({
      geometry: new Point(centerLineFeatures[0].getGeometry().getLastCoordinate())
    })
    endPoint.set('type', 'end')
    points.push(endPoint)
    this.getSource().addFeatures(points)
    vm.map.getView().fit(this.getSource().getExtent())
  }
}
export default RiverGisLayer
