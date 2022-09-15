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
import pointRed from '@/assets/map/pointRed.png'
import pointGreen from '@/assets/map/pointGreen.png'
import pointYellow from '@/assets/map/pointYellow.png'
import { getPointList } from '@/apis/map'
import * as LayerEnum from '@/utils/LayerEnum'
const tdtTk = 'e5abca32c01cf5fa9a82cd58d677fddd'

export const geoserverWmsUrl = {
  adcdWMS: 'https://gis.dcyun.com:48164/geoserver/ZhejiangAdminDivisionRough/wms',
  adcdOWS: 'https://gis.dcyun.com:48164/geoserver/ZhejiangAdminDivisionRough/ows',
  waterRegionInvestigationWMS: 'https://gis.dcyun.com:48164/geoserver/WaterRegionInvestigation/wms',
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
    url: 'https://gis.dcyun.com:48164/geoserver/ZhejiangAdminDivisionRough/wms',
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
    lgtd: 'longitude',
    lttd: 'latitude',
    id: 'id',
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

// 统计图
export const statisticsLayer = {
  id: 'statistics',
  type: LayerTypeEnum.vector,
  source: {
    type: SourceTypeEnum.vector
  },
  zIndex: 20,
  field: {
    lgtd: 'lgtd',
    lttd: 'lttd'
  }
}

// 基础总览
export const basicTotalLayer = {
  id: 'basicTotal',
  type: LayerTypeEnum.vector,
  source: {
    type: SourceTypeEnum.vector
  },
  style: {
    type: StyleTypeEnum.polygon,
    fill: {
      color: 'rgba(0,0,0,0)'
    }
  },
  zIndex: 10
}

// 点位图图层
export const pointLayer = {
  field: {
    lgtd: 'longitude',
    lttd: 'latitude',
    id: 'id',
  },
  id: 'point',
  type: LayerTypeEnum.vector,
  source: { type: SourceTypeEnum.vector },
  zIndex: 21,
  levelField: null,
  style: {
    type: StyleTypeEnum.icon,
    icon: {
      src: [
        'case',
        ['==', ['get', 'statPointLocationType'], '1'],
        pointGreen, // 已销号
        ['==', ['get', 'statPointLocationType'], '2'],
        pointYellow, // 未销号
        ['==', ['get', 'statPointLocationType'], '3'],
        pointRed, // 逾期
        pointGreen
      ],
      scale: 1
    }
  },
  loadFunc: getPointList
}

// 管理范围线
export const riverManageLineLayer = {
  id: 'riverManageLine',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_river_manageline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([{
        rules: [{
          type: StyleTypeEnum.lineString,
          stroke: {
            color: '#CF011C',
            width: 1
          }
        }]
      }], 'WaterRegionInvestigation:vw_river_manageline')
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 河道
export const riverLayer = {
  id: LayerEnum.RIVER_LAYER,
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_river_area',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            { // 省级河流
              type: StyleTypeEnum.polygon,
              fill: { color: '#00FFFF' },
              stroke: {
                color: '#00FFFF',
                width: 2,
              },
              filter: ['EqualTo', ['grade', '省级']],
            }, { // 市级河流
              type: StyleTypeEnum.polygon,
              fill: { color: '#00FFFF' },
              stroke: {
                color: '#00FFFF',
                width: 2,
              },
              filter: ['EqualTo', ['grade', '市级']],
            }, { // 县级河流
              type: StyleTypeEnum.polygon,
              fill: { color: '#00FFFF' },
              stroke: {
                color: '#00FFFF',
                width: 2,
              },
              filter: ['EqualTo', ['grade', '县级']],
            }, { // 乡级河流
              type: StyleTypeEnum.polygon,
              maxScale: 1 / 0.000005364418029785156, // 表示到达这个分辨率后再出现该类型元素
              fill: { color: '#00FFFF' },
              stroke: {
                color: '#00FFFF',
                width: 2,
              },
              filter: ['EqualTo', ['grade', '乡级']],
            }, { // 字体
              type: StyleTypeEnum.polygon,
              text: {
                text: 'name',
                font: {
                  family: '宋体',
                  size: 16,
                },
                stroke: {
                  color: '#FFFFFF',
                  width: 1,
                },
                fill: { color: '#000000' },
              },
            },
          ],
        },
      ], 'WaterRegionInvestigation:vw_river_area'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 17
}

// 管理范围线
export const lineManageLayer = {
  id: 'lineManageLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_river_manageline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              // fill: { color: '#ff4d65' },
              stroke: {
                color: '#ff4d65',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_river_manageline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 临水线
export const lineWaterLayer = {
  id: 'lineWaterLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_river_approachline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              // fill: { color: '#ff4d65' },
              stroke: {
                color: '#ffd633',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_river_approachline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 中心线
export const lineCenterLayer = {
  id: 'lineCenterLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_river_centerline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              // fill: { color: '#ff4d65' },
              stroke: {
                color: '#ff9700',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_river_centerline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 水库
export const reservoirLayer = {
  id: LayerEnum.RESERVOIR_LAYER,
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_reservoir_area',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.polygon,
              // label: true,
              fill: { color: '#00FFFF' },
              stroke: {
                color: '#00FFFF',
                width: 2,
              },
            }, { // 字体
              type: StyleTypeEnum.polygon,
              text: {
                text: 'name',
                font: {
                  family: '宋体',
                  size: 16,
                },
                stroke: {
                  color: '#FFFFFF',
                  width: 1,
                },
                fill: { color: '#000000' },
              },
            },
          ],
        },
      ], 'WaterRegionInvestigation:vw_reservoir_area'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 17
}

// 水库-管理范围线
export const reservoirManageLayer = {
  id: 'reservoirManageLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_reservoir_manageline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#ff4d65',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_reservoir_manageline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 水库-临水线
export const reservoirWaterLayer = {
  id: 'reservoirWaterLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_reservoir_approachline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#ffd633',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_reservoir_approachline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 山塘
export const hillpondLayer = {
  id: LayerEnum.HILLPOND_LAYER,
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_hillypond_area',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.polygon,
              fill: { color: '#00FFFF' },
              stroke: {
                color: '#00FFFF',
                width: 2,
              },
            }, { // 字体
              type: StyleTypeEnum.polygon,
              text: {
                text: 'name',
                font: {
                  family: '宋体',
                  size: 16,
                },
                stroke: {
                  color: '#FFFFFF',
                  width: 1,
                },
                fill: { color: '#000000' },
              },
            },
          ],
        },
      ], 'WaterRegionInvestigation:vw_hillypond_area'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 17
}

// 山塘-管理范围线
export const hillpondManageLayer = {
  id: 'hillpondManageLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_hillypond_manageline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#ff4d65',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_hillypond_manageline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 水库-临水线
export const hillpondWaterLayer = {
  id: 'hillpondWaterLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_hillypond_approachline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#ffd633',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_hillypond_approachline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 湖泊
export const lakeLayer = {
  id: LayerEnum.LAKE_LAYER,
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_lake_area',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.polygon,
              fill: { color: '#00FFFF' },
            }, { // 字体
              type: StyleTypeEnum.polygon,
              text: {
                text: 'name',
                font: {
                  family: '宋体',
                  size: 16,
                },
                stroke: {
                  color: '#FFFFFF',
                  width: 1,
                },
                fill: { color: '#000000' },
              },
            },
          ],
        },
      ], 'WaterRegionInvestigation:vw_lake_area'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 17
}

// 湖泊-管理范围线
export const lakeManageLayer = {
  id: 'lakeManageLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_lake_manageline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#ff4d65',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_lake_manageline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 湖泊-临水线
export const lakeWaterLayer = {
  id: 'lakeWaterLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_lake_approachline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#ffd633',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_lake_approachline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 人工水道
export const canalLayer = {
  id: LayerEnum.CANAL_LAYER,
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_canal_area',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.polygon,
              fill: { color: '#00FFFF' },
              stroke: {
                color: '#00FFFF',
                width: 2,
              },
            }, { // 字体
              type: StyleTypeEnum.polygon,
              text: {
                text: 'name',
                font: {
                  family: '宋体',
                  size: 16,
                },
                stroke: {
                  color: '#FFFFFF',
                  width: 1,
                },
                fill: { color: '#000000' },
              },
            },
          ],
        },
      ], 'WaterRegionInvestigation:vw_canal_area'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 17
}

// 人工水道-管理范围线
// export const canalManageLayer = {
//   id: 'canalManageLayer',
//   type: LayerTypeEnum.image,
//   source: {
//     type: SourceTypeEnum.imagewms,
//     url: geoserverPath.waterRegionInvestigationWMS,
//     params: {
//       LAYERS: 'WaterRegionInvestigation:vw_lake_manageline',
//       VERSION: '1.3.0',
//       SRS: 'EPSG:4326',
//       STYLES: '',
//       sld_body: SldUtils.createSld([
//         {
//           rules: [
//             {
//               type: StyleTypeEnum.lineString,
//               stroke: {
//                 color: '#ff4d65',
//                 width: 1,
//               },
//             }
//           ],
//         },
//       ], 'WaterRegionInvestigation:vw_lake_manageline'),
//     },
//     crossOrigin: 'anonymous'
//   },
//   zIndex: 18
// }

// // 水库-临水线
// export const canalWaterLayer = {
//   id: 'canalWaterLayer',
//   type: LayerTypeEnum.image,
//   source: {
//     type: SourceTypeEnum.imagewms,
//     url: geoserverPath.waterRegionInvestigationWMS,
//     params: {
//       LAYERS: 'WaterRegionInvestigation:vw_lake_approachline',
//       VERSION: '1.3.0',
//       SRS: 'EPSG:4326',
//       STYLES: '',
//       sld_body: SldUtils.createSld([
//         {
//           rules: [
//             {
//               type: StyleTypeEnum.lineString,
//               stroke: {
//                 color: '#ffd633',
//                 width: 1,
//               },
//             }
//           ],
//         },
//       ], 'WaterRegionInvestigation:vw_lake_approachline'),
//     },
//     crossOrigin: 'anonymous'
//   },
//   zIndex: 18
// }

// 其他水域
export const otherwaterLayer = {
  id: LayerEnum.OTHERWATER_LAYER,
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_otherwater_area',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.polygon,
              fill: { color: '#00FFFF' },
              stroke: {
                color: '#00FFFF',
                width: 2,
              },
            }, { // 字体
              type: StyleTypeEnum.polygon,
              text: {
                text: 'name',
                font: {
                  family: '宋体',
                  size: 16,
                },
                stroke: {
                  color: '#FFFFFF',
                  width: 1,
                },
                fill: { color: '#000000' },
              },
            },
          ],
        },
      ], 'WaterRegionInvestigation:vw_otherwater_area'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 17
}

// 其他水域-管理范围线
export const otherwaterManageLayer = {
  id: 'otherwaterManageLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_otherwater_manageline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#ff4d65',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_otherwater_manageline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}

// 湖泊-临水线
export const otherwaterWaterLayer = {
  id: 'otherwaterWaterLayer',
  type: LayerTypeEnum.image,
  source: {
    type: SourceTypeEnum.imagewms,
    url: geoserverPath.waterRegionInvestigationWMS,
    params: {
      LAYERS: 'WaterRegionInvestigation:vw_otherwater_approachline',
      VERSION: '1.3.0',
      SRS: 'EPSG:4326',
      STYLES: '',
      sld_body: SldUtils.createSld([
        {
          rules: [
            {
              type: StyleTypeEnum.lineString,
              stroke: {
                color: '#ffd633',
                width: 1,
              },
            }
          ],
        },
      ], 'WaterRegionInvestigation:vw_otherwater_approachline'),
    },
    crossOrigin: 'anonymous'
  },
  zIndex: 18
}
