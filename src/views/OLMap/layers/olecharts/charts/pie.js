const pie = function (_options, serie, coordinateSystem) {
  serie.center = coordinateSystem.dataToPoint(serie.coordinates)
  return serie
}
export default pie
