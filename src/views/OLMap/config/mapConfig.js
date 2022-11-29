import { get } from 'ol/proj'

export const projection = get('EPSG:4326')
export const projectionExtent = projection.getExtent()
export const res = [
  1.40625,
  0.703125,
  0.3515625,
  0.17578125,
  0.087890625,
  0.0439453125,
  0.02197265625,
  0.010986328125,
  0.0054931640625,
  0.00274658203125,
  0.001373291015625,
  0.0006866455078125,
  0.00034332275390625,
  0.000171661376953125,
  0.0000858306884765625,
  0.00004291534423828125,
  0.000021457672119140625,
  0.000010728836059570312,
  0.000005364418029785156,
  0.000002682209014892578,
  0.000001341104507446289,
]
export const matrixIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const geoServerUrl = 'https://gis.dcyun.com:48475/geoserver'

export const geoServerConfig = {
  url: geoServerUrl,
  wfsParams: {
    service: 'WFS',
    version: '1.0.0',
    request: 'GetFeature',
    typeName: '',
    outputformat: 'json',
    cql_filter: '',
  },
}

const mapConfig = {
  view: {
    constrainResolution: true,
    smoothResolutionConstraint: true,
    projection: 'EPSG:4326', // 使用这个坐标系
    center: [120.20968041015627, 30.2447158046875], // 龙泉
    zoom: 8,
    minZoom: 2,
    maxZoom: 18,
    enableRotation: false,
    // extent: [110, 20, 130, 35],
  },
  maxTilesLoading: 16,
  target: 'map',
  controls: {
    attribution: false,
    zoom: false,
    rotate: false,
  },
  renderer: ['canvas', 'webgl'],
  interactions: {
    // mouseWheelZoom: false, // 取消滚动鼠标中间的滑轮交互
    // dragPan: false,
    doubleClickZoom: false,
  },
}

export default mapConfig
