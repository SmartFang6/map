import { isObject } from '../utils'

const bar = function (options, serie, coordinateSystem) {
  if (isObject(options.grid) && !Array.isArray(options.grid)) { 
  } else if (Array.isArray(options.grid)) {
    options.grid = options.grid.map((gri, index) => {
      const coorPixel = coordinateSystem.dataToPoint(options.series[index].coordinates)
      gri.left = coorPixel[0] - parseFloat(gri.width) / 2
      gri.top = coorPixel[1] - parseFloat(gri.height) / 2
      return gri
    })
  }
  return serie
}
export default bar
// # sourceMappingURL=bar.js.map
