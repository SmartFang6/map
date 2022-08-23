/* eslint-disable no-unused-vars */

import Icon from 'ol/style/Icon'
import Text from 'ol/style/Text'
import Style from 'ol/style/Style'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Point from 'ol/geom/Point'
import GeoJSON from 'ol/format/GeoJSON'
import { SourceTypeEnum, LayerTypeEnum, StyleTypeEnum } from '../enum/TypeEnum'
import { geoserverPath } from './geoserverConfig'
import { res, matrixIds, projectionExtent } from './mapConfig'
import SldUtils from '../utils/SldUtils'
const tdtTk = 'e5abca32c01cf5fa9a82cd58d677fddd'

export const geoserverWmsUrl = {
  adcdWMS: 'https://gis.dcyun.com:48164/geoserver/ZhejiangAdminDivisionRough/wms',
  adcdOWS: 'https://gis.dcyun.com:48164/geoserver/ZhejiangAdminDivisionRough/ows',
}
// 天地图 影像图
export const tdtImg = {
  type: LayerTypeEnum.tile,
  className: 'clipImg',
  id: 'tdt_img',
  visible: true,
  zIndex: 1,
  source: {
    type: SourceTypeEnum.wmts,
    name: '天地图影像图',
    url: `http://t{0-6}.tianditu.gov.cn/img_c/wmts?tk=${tdtTk}`,
    layer: 'img',
    style: 'default',
    matrixSet: 'c',
    format: 'tiles',
    projectionExtent,
    resolutions: res,
    matrixIds,
  },
}

export const tdtImgAnnoLayer = {
  type: LayerTypeEnum.tile,
  id: "tdt_img_anno",
  className: "clipImg",
  visible: true,
  source: {
    type: SourceTypeEnum.wmts,
    name: "天地图影像注记图",
    url: `http://t{0-6}.tianditu.gov.cn/cia_c/wmts?tk=${tdtTk}`,
    layer: "cia",
    style: "default",
    matrixSet: "c",
    format: "tiles",
    projectionExtent,
    resolutions: res,
    matrixIds,
  },
  zIndex: 10
}

// 行政区划外边界图层
export const orgBoundaryLayer = {
  id: 'orgadcdWms',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverWmsUrl.adcdWMS,
    params: {
      LAYERS: '',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      CQL_FILTER: '1=1',
    },
    crossOrigin: 'anonymous',
  },
  zIndex: 10,
}

// 遮罩层
export const shadeLayer = {
  id: 'shade',
  type: LayerTypeEnum.vectorImage,
  source: { type: SourceTypeEnum.vector },
  style: {
    type: StyleTypeEnum.polygon,
    fill: { color: 'rgba(0,142,224, 0.5)' },
  },
  zIndex: 1,
}

// 遮罩层
export const shadeLayer_coord = {
  id: 'shade',
  type: LayerTypeEnum.vectorImage,
  source: { type: SourceTypeEnum.vector },
  style: {
    type: StyleTypeEnum.polygon,
    fill: { color: 'rgba(0,142,224, 0)' },
  },
  zIndex: 1,
}

// 遮罩层
export const innerShadeLayer = {
  id: 'innerShade',
  type: LayerTypeEnum.vectorImage,
  source: { type: SourceTypeEnum.vector },
  style: {
    type: StyleTypeEnum.polygon,
    fill: { color: 'rgba(64,193,247, 0.5)' },
  },
  zIndex: 6,
}

export const shadowLayer = {
  type: LayerTypeEnum.vectorImage,
  className: 'imgShade',
  id: 'imgShade',
  zIndex: 4,
  source: { type: SourceTypeEnum.vector },
  style: {
    type: StyleTypeEnum.polygon,
    fill: { color: 'rgba(0,229,255,0.5)' },
  },
}

// 行政区划边界线
export const orgAdcdWmsLayer = {
  id: 'orgadcdWms',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: 'https://gis.dcyun.com:48164/geoserver/ZhejiangAdminDivision/wms',
    params: {
      LAYERS: '',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      CQL_FILTER: '1=1',
    },
    crossOrigin: 'anonymous',
  },
  zIndex: 6,
}

// 行政区划高亮图层
export const orgHighLightLayer = {
  id: 'orgHighLight',
  type: LayerTypeEnum.vector,
  source: { type: SourceTypeEnum.vector },
  zIndex: 20,
  style: {
    type: StyleTypeEnum.polygon,
    fill: { color: 'rgba(24,255,253,0.7)' },
  },
}

export const drawLayer = {
  id: 'draw',
  type: LayerTypeEnum.vector,
  source: { type: SourceTypeEnum.vector },
  zIndex: 40,
  style: drawStyle,
  // style:''
}
function drawStyle(feature) {
  const type = feature.getGeometry().getType()
  let style
  if (type === 'LineString') {
    style = new Style({
      fill: new Fill({ color: 'rgba(216,30,6,0.4)' }),
      stroke: new Stroke({
        color: 'rgb(216,30,6)',
        width: 2,
      }),
    })
  } else if (type === 'Point') {
    style = new Style({
      image: new Icon({
        src: location,
        scale: 0.1,
      }),
    })
  }
  return style
}

// 雨量站
// export const rainStationLayer = {
//   id: 'rainStation',
//   type: LayerTypeEnum.vector,
//   source: { type: SourceTypeEnum.vector },
//   levelField: 'warnType',
//   warnConfig: {
//     1: {
//       color: '#f3382b',
//       icon: rainRed,
//       symbolSize: [20, 20],
//     },
//   },
//   style: rainStationStyle,
//   zIndex: 10,
//   field: {
//     id: 'stcd',
//     lgtd: 'lgtd',
//     lttd: 'lttd',
//   },
//   // loadFunc: getRiverLevelList,
// }
// function rainStationStyle(feature) {
//   let icon
//   const name = feature.get('properties').stnm
//   const { drp } = feature.get('properties')
//   switch (feature.get('properties').warnType) {
//     case '1':
//       icon = rainRed
//       break
//     case '0':
//       icon = rainGreen
//       break
//     default:
//       icon = rainGreen
//       break
//   }
//   return new Style({
//     type: StyleTypeEnum.icon,
//     image: new Icon({
//       src: icon,
//       scale: 0.6,
//     }),
//     text: new Text({
//       text: [`${name}  `, '', drp, 'bold 16px SourceHanSansCN-Heavy', 'mm', ''],
//       fill: new Fill({ color: '#ffffff' }),
//       font: 'normal 16px SourceHanSansCN-Regular',
//       offsetY: 30,
//       padding: [4, 5, 3, 5],
//       backgroundFill: new Fill({ color: '#38407faa' }),
//     }),
//   })
// }

// 雨量站
export const rainStationLayer = {
  id: 'rainStation',
  type: LayerTypeEnum.vector,
  source: { type: SourceTypeEnum.vector },
  zIndex: 15,
  field: {
    id: 'stcd',
    lgtd: 'lgtd',
    lttd: 'lttd',
  },
}

// 防治村
export const protectVillageLayer = {
  id: 'protectVillage',
  type: LayerTypeEnum.vector,
  source: { type: SourceTypeEnum.vector },
  zIndex: 15,
  field: {
    id: 'prevCode',
    lgtd: 'lgtd',
    lttd: 'lttd',
  },
}

// 河段点
export const riverPointLayer = {
  field: {
    lgtd: 'lgtd',
    lttd: 'lttd',
    id: 'stcd',
  },
  id: 'riverPoint',
  type: LayerTypeEnum.vector,
  source: { type: SourceTypeEnum.vector },
  zIndex: 11,
  levelField: null,
  style: riverPointStyle,
  // loadFunc: getRiverByLongLat
}
function riverPointStyle(feature) {
  const text = feature.getProperties().properties.hnnm
  console.log('text', text)
  return new Style({
    type: StyleTypeEnum.icon,
    image: new Icon({
      src: location,
      scale: 0.15,
    }),
    text: new Text({
      text,
      font: '14px Arial',
      fill: new Fill({ color: '#555556' }),
      backgroundFill: new Fill({ color: '#edf0f4cc' }),
      padding: [3, 5, 3, 5],
      offsetY: -28,
    }),
  })
}
