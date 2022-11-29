import axios from 'axios'
import Point from 'ol/geom/Point'

/**
 * @module common
 * @description 未抽希的地图图层相关操作函数
 * */

/**
 * 将地图中的adcd转换成系统中对应的adcd
 * @param {String} adcd - 地图服务中的adcd
 * @returns {String} adcd - 系统中的adcd
 */
export function getSystemAdcdFromMap(adcd) {
  if (adcd.endsWith('0000000')) {
    adcd = adcd.substring(0, 2)
  } else if (adcd.endsWith('00000')) {
    adcd = adcd.substring(0, 4)
  } else if (adcd.endsWith('000')) {
    adcd = adcd.substring(0, 6)
  }
  return adcd
}

/**
 * 将系统中的adcd转换成地图中的adcd
 * @param {String} adcd - 系统中的adcd
 * @returns {String} 地图服务中的adcd
 */
export function getMapAdcdFromSystem(adcd) {
  return adcd.padEnd(9, '0')
}

/**
 * 通过地图行政区划编码获取对应行政区划级别
 * @param {String} adcd - 地图行政区划编码
 * @returns {Number} 行政区划级别
 */
export function getAdLevelByMapAdcd(adcd) {
  let level = 4
  if (adcd.endsWith('0000000')) {
    level = 1
  } else if (adcd.endsWith('00000')) {
    level = 2
  } else if (adcd.endsWith('000')) {
    level = 3
  }
  return level
}

/**
 * 通过系统行政区划编码获取对应行政区划级别
 * @param {String} adcd - 地图行政区划编码
 * @returns {Number} 行政区划级别
 */
export function getAdLevelBySystemAdcd(adcd) {
  let level = 4
  switch (adcd.length) {
    case 2:
      level = 1
      break
    case 4:
      level = 2
      break
    case 6:
      level = 3
      break
    case 9:
      level = 4
      break
    default:
      break
  }
  return level
}

/**
 * 通过行政区划级别枚举获取对应的行政区划图层
 * @param {Number} adLevel - 行政区划级别
 * @returns {String} 地图行政区划图层
 */
export function getFeatureTypesByAdLevel(adLevel) {
  let featureTypes = []
  switch (adLevel) {
    case 1:
      featureTypes = 'ZhejiangAdminDivision:province'
      break
    case 2:
      featureTypes = 'ZhejiangAdminDivision:city'
      break
    case 3:
      featureTypes = 'ZhejiangAdminDivision:county'
      break
    default:
      featureTypes = 'ZhejiangAdminDivision:town'
  }
  return featureTypes
}

/**
 * 通过本级行政区划级别获取下级行政区划地图服务图层
 * @param {Number} adLevel - 本级行政区划级别
 * @returns {String} 下一级行政区划地图服务图层
 */
export function getChildFeatureTypesByAdLevel(adLevel) { // 获取下级行政区划对应geoserver的图层
  let featureTypes = ''
  switch (adLevel) {
    case 1:
      featureTypes = 'ZhejiangAdminDivision:city'
      break
    case 2:
      featureTypes = 'ZhejiangAdminDivision:county'
      break
    case 3:
      featureTypes = 'ZhejiangAdminDivision:town'
      break
    default:
      featureTypes = ''
  }
  return featureTypes
}

/**
 * 通过wfs的方式加载geoserver服务数据
 * @param {Object} requestParams - 请求参数
 * @param {String} wfsUrl - wfsurl地址
 * @returns {Object} geojson格式的地图空间数据
 */
export async function getGisDataByWfs(requestParams, wfsUrl) { // 通过wfs的方式获取数据
  Object.keys(requestParams).forEach((key) => {
    if (wfsUrl.indexOf('?') !== -1) {
      wfsUrl += `&${key}=${requestParams[key]}`
    } else {
      wfsUrl += `?${key}=${requestParams[key]}`
    }
  })
  const res = await fetch(wfsUrl + `&accessKey=${token.access_key}&token=${token.token}`)
  const result = await res.json()
  return result
}

/**
 * 通过geoserver的接口查询数据
 * @param {String} url - 请求的url
 * @returns {Object} geojson格式的地图数据
 */
export function getFeatures(url) {
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * 生成色带
 * @param {Array} startColor - 开始颜色 [255,255,255]
 * @param {Array} endColor - 结束颜色 [255,255,255]
 * @param {Number} step - 生成颜色个数
 * @param {Number} space - 生成步长
 * @returns {Array} 颜色返回值
 */
export function gradientColor(startColor, endColor, step, space) {
  if (step > space) step = space
  if (step === 0) step = 1
  const startR = startColor[0]
  const startG = startColor[1]
  const startB = startColor[2]
  const endR = endColor[0]
  const endG = endColor[1]
  const endB = endColor[2]
  const sR = (endR - startR) / space// 总差值
  const sG = (endG - startG) / space
  const sB = (endB - startB) / space
  // 计算每一步的hex值
  const hex = [parseInt((sR * step + startR)), parseInt((sG * step + startG)), parseInt((sB * step + startB))]
  return hex
}

/**
 * 前端获取面元素中心点
 * @param {ol.geom.Polygon | ol.geom.MultiPolygon} geom - 面元素
 * @returns {Array} 中心点经纬度
 */
export function getCenter(geom) {
  const type = geom.getType()
  let center = [0, 0]
  if (type === 'Polygon') {
    center = geom.getInteriorPoint()
  } else if (type === 'MultiPolygon') {
    const extent = geom.getExtent()
    center = new Point([(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2])
  }
  return center
}

/**
 * 字符串替换
 * @param {String} repStr - 需要替换的字符串，字符串格式为 {a}出发到{b}
 * @param {Object} data - 字段来源对象 {a:'aaaa',b:'cccc'}
 * @returns {String} 返回替换后的字符串
 */
export function templateReplace(repStr, data) {
  const exp = /\{\{(\w+)\}\}/
  let result
  // eslint-disable-next-line no-cond-assign
  while (result = exp.exec(repStr)) {
    if (result[0]) {
      repStr = repStr.replace(result[0], data[result[1]])
    }
  }
  return repStr
}

/**
 * 通过系统行政区划编码获取上级行政区划编码
 * @param {String} adcd - 系统行政区划编码
 * @returns {string} 上级行政区划编码
 */
export function getParentAdcdBySystemAdcd(adcd) {
  const { length } = adcd
  switch (length) {
    case 12:
      adcd = adcd.substring(0, 9)
      break
    case 9:
      adcd = adcd.substring(0, 6)
      break
    case 6:
      adcd = adcd.substring(0, 4)
      break
    case 4:
      adcd = adcd.substring(0, 2)
      break
    case 2:
      adcd = adcd.substring(0, 2)
      break
  }
  return adcd
}
