import * as echarts from 'echarts'
var checkDecoded = function (json) { return !json.UTF8Encoding }
var decodePolygon = function (coordinate, encodeOffsets, encodeScale) {
  var result = []
  var _a = [encodeOffsets[0], encodeOffsets[1]]; var prevX = _a[0]; var prevY = _a[1]
  for (var i = 0; i < coordinate.length; i += 2) {
    var x = coordinate.charCodeAt(i) - 64
    var y = coordinate.charCodeAt(i + 1) - 64
    x = (x >> 1) ^ -(x & 1)
    y = (y >> 1) ^ -(y & 1)
    x += prevX
    y += prevY
    prevX = x
    prevY = y
    result.push([x / encodeScale, y / encodeScale])
  }
  return result
}
var decode = function (json) {
  if (checkDecoded(json)) {
    return json
  }
  var encodeScale = json.UTF8Scale
  if (encodeScale == null) {
    encodeScale = 1024
  }
  var features = json.features
  for (var f = 0; f < features.length; f++) {
    var feature = features[f]
    var geometry = feature.geometry
    var _a = [geometry.coordinates, geometry.encodeOffsets]; var coordinates = _a[0]; var encodeOffsets = _a[1]
    for (var c = 0; c < coordinates.length; c++) {
      var coordinate = coordinates[c]
      if (geometry.type === 'Polygon') {
        coordinates[c] = decodePolygon(coordinate, encodeOffsets[c], encodeScale)
      } else if (geometry.type === 'MultiPolygon') {
        for (var c2 = 0; c2 < coordinate.length; c2++) {
          var polygon = coordinate[c2]
          coordinate[c2] = decodePolygon(polygon, encodeOffsets[c][c2], encodeScale)
        }
      }
    }
  }
  json.UTF8Encoding = false
  return json
}
export default function (json) {
  var geoJson = decode(json)
  var _features = echarts.util.map(echarts.util.filter(geoJson.features, function (featureObj) {
    return featureObj.geometry && featureObj.properties && featureObj.geometry.coordinates.length > 0
  }), function (featureObj) {
    var properties = featureObj.properties
    var geo = featureObj.geometry
    var coordinates = geo.coordinates
    var geometries = []
    if (geo.type === 'Polygon') {
      geometries.push(coordinates[0])
    }
    if (geo.type === 'MultiPolygon') {
      echarts.util.each(coordinates, function (item) {
        if (item[0]) {
          geometries.push(item[0])
        }
      })
    }
    return {
      properties: properties,
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: geometries
      }
    }
  })
  return {
    type: 'FeatureCollection',
    crs: {},
    features: _features
  }
}
