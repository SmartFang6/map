const graphic = function (_options, graphic, serie, coordinateSystem) {
  const pixel = coordinateSystem.dataToPoint(graphic.coordinates)
  const radius = parseFloat(serie.radius.replace('px', ''))
  graphic.top = `${pixel[1] + (radius / 2)}px`
  graphic.left = `${pixel[0] - (radius / 2)}px`
  return graphic
}
export default graphic
