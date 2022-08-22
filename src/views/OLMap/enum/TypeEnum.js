
/**
 * @module Enum
 */

/**
 * @readonly
 * @enum
 * @description feature对象枚举值
 */
const FeatureTypeEnum = {
  /** Point */
  point: 'Point',
  /** MultiPoint */
  multiPoint: 'MultiPoint',
  /** LineString */
  lineString: 'LineString',
  /** MultiLineString */
  multiLineString: 'MultiLineString',
  /** LinearRing */
  linearRing: 'LinearRing',
  /** Polygon */
  polygon: 'Polygon',
  /** MultiPolygon */
  multiPolygon: 'MultiPolygon',
  /** Circle */
  circle: 'Circle'
}

// 数据格式枚举
/**
 * @readonly
 * @enum
 * @description feature数据格式枚举
 */
const FeatureFormatTypeEnum = {
  /** GeoJson */
  GeoJSON: 'GeoJson',
  /** WKT */
  WKT: 'WKT',
  /** MVT */
  MVT: 'MVT',
  /** TopoJSON */
  TopoJSON: 'TopoJSON'
}

// 图层类型枚举
/**
 * @readonly
 * @enum
 * @description 图层类型枚举
 */
const LayerTypeEnum = {
  /** vector */
  vector: 'vector',
  /** cluster */
  cluster: 'cluster',
  /** image */
  image: 'image',
  /** tile */
  tile: 'tile',
  /** echarts */
  echarts: 'echarts',
  /** vectorTile */
  vectorTile: 'vectorTile',
  /** vectorImage */
  vectorImage: 'vectorImage',
  /** webglPoints */
  webglPoints: 'webglPoints'
}

// 图层源类型枚举
/**
 * @readonly
 * @enum
 * @description 数据源类型枚举
 */
const SourceTypeEnum = {
  /** vector */
  vector: 'vector',
  /** wmts */
  wmts: 'wmts',
  /** cluster */
  cluster: 'cluster',
  /** imagewms */
  imagewms: 'imagewms',
  /** imagestatic */
  imagestatic: 'imagestatic',
  /** xyz */
  xyz: 'xyz',
  /** tileImage */
  tileImage: 'tileImage',
  /** vectorTile */
  vectorTile: 'vectorTile'
}

// 样式枚举
/**
 * @readonly
 * @enum
 * @description 样式枚举
 */
const StyleTypeEnum = {
  /** icon */
  icon: 'icon',
  /** circle */
  circle: 'circle',
  /** lineString */
  lineString: 'lineString',
  /** polygon */
  polygon: 'polygon'
}

export {
  FeatureTypeEnum,
  FeatureFormatTypeEnum,
  LayerTypeEnum,
  SourceTypeEnum,
  StyleTypeEnum
}
