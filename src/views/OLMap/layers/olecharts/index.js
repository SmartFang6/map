/* eslint-disable no-prototype-builtins */
import Map from 'ol/Map'
import obj from 'ol/Object'
import { transform } from 'ol/proj'
import * as echarts from 'echarts'
import {
  isObject, merge, arrayAdd, bind, uuid, bindAll, removeNode, mockEvent
} from './utils'
import formatGeoJSON from './utils/formatGeoJSON'

let extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      // eslint-disable-next-line no-proto
      ({ __proto__: [] } instanceof Array && function(d, b) { d.__proto__ = b }) ||
      function(d, b) { for (const p in b) if (b.hasOwnProperty(p)) d[p] = b[p] }
  return extendStatics(d, b)
}

function __extends(d, b) {
  extendStatics(d, b)
  function __() { this.constructor = d }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __())
}

const _options = {
  forcedRerender: false,
  forcedPrecomposeRerender: false,
  hideOnZooming: false,
  hideOnMoving: false,
  hideOnRotating: false,
  convertTypes: ['pie', 'line', 'bar'],
  insertFirst: false,
  stopEvent: false,
  polyfillEvents: true
}

/**
 * echarts与ol结合  需要设置echarts的coordinates 为 openlayers 其余均按照echarts的进行设置
 * @module EchartsLayer
 * @memberof 扩展
 */

const EChartsLayer = (function(_super) {
  __extends(EChartsLayer, _super)

  /**
   * 创建echarts图层
   * @class EChartsLayer
   * @param {Object} chartOptions - echarts的option配置项
   * @param {*} options - 一些额外的配置
   * @param {ol.Map} map - 地图
   */
  function EChartsLayer(chartOptions, options, map) {
    let _this = this
    const opts = Object.assign(_options, options)
    _this = _super.call(this, opts) || this
    _this._options = opts
    _this._chartOptions = chartOptions
    _this.set('chartOptions', chartOptions)
    _this.$chart = null
    _this.$container = undefined
    _this._isRegistered = false
    _this._initEvent = false
    _this._incremental = []
    _this._coordinateSystem = null
    _this.coordinateSystemId = ''
    _this.prevVisibleState = ''
    bindAll([
      'redraw', 'onResize', 'onZoomEnd', 'onCenterChange',
      'onDragRotateEnd', 'onMoveStart', 'onMoveEnd',
      'mouseDown', 'mouseUp', 'onClick', 'mouseMove'], _this)
    if (map) { _this.setMap(map) }
    return _this
  }
  /**
   * 将echarts添加到地图中
   * @param {ol.Map} map
   */
  EChartsLayer.prototype.appendTo = function(map) {
    this.setMap(map)
  }

  EChartsLayer.prototype.getMap = function() {
    return this._map
  }
  EChartsLayer.prototype.setMap = function(map) {
    const _this = this
    if (map && map instanceof Map) {
      this._map = map
      this._map.once('postrender', () => {
        _this.handleMapChanged()
      })
      this._map.renderSync()
    } else {
      throw new Error('not ol map object')
    }
  }
  EChartsLayer.prototype.getChartOptions = function() {
    return this.get('chartOptions')
  }
  /**
   * 设置echarts配置项
   * @param {Object} options - echarts配置项
   */
  EChartsLayer.prototype.setChartOptions = function(options) {
    if (options === void 0) { options = {} }
    this._chartOptions = options
    this.set('chartOptions', options)
    this.clearAndRedraw()
    return this
  }
  EChartsLayer.prototype.appendData = function(data, save) {
    if (save === void 0) { save = true }
    if (data) {
      if (save) {
        this._incremental = arrayAdd(this._incremental, {
          data: data.data,
          seriesIndex: data.seriesIndex
        })
      }
      this.$chart.appendData({
        data: data.data.copyWithin(),
        seriesIndex: data.seriesIndex
      })
    }
    return this
  }
  /**
   * 清空echarts图层
   */
  EChartsLayer.prototype.clear = function() {
    this._incremental = []
    if (this.$chart) {
      this.$chart.clear()
    }
  }
  /**
   * 移除echarts图层
   */
  EChartsLayer.prototype.remove = function() {
    this.clear()
    if (this.$chart) {
      this.$chart.dispose()
    }
    if (this._initEvent && this.$container) {
      this.$container && removeNode(this.$container)
      this.unBindEvent()
    }
    delete this.$chart
    delete this._map
  }
  /**
   * 显示
   */
  EChartsLayer.prototype.show = function() {
    this.setVisible(true)
  }
  EChartsLayer.prototype.innerShow = function() {
    if (this.$container) {
      this.$container.style.display = this.prevVisibleState
      this.prevVisibleState = ''
    }
  }
  /**
   * 隐藏
   */
  EChartsLayer.prototype.hide = function() {
    this.setVisible(false)
  }
  EChartsLayer.prototype.innerHide = function() {
    if (this.$container) {
      this.prevVisibleState = this.$container.style.display
      this.$container.style.display = 'none'
    }
  }
  EChartsLayer.prototype.isVisible = function() {
    return this.$container && this.$container.style.display !== 'none'
  }
  EChartsLayer.prototype.showLoading = function() {
    if (this.$chart) {
      this.$chart.showLoading()
    }
  }
  EChartsLayer.prototype.hideLoading = function() {
    if (this.$chart) {
      this.$chart.hideLoading()
    }
  }
  /**
   * 设置层级
   * @param {Number}} zIndex
   */
  EChartsLayer.prototype.setZIndex = function(zIndex) {
    if (this.$container) {
      if (typeof zIndex === 'number') {
        zIndex = String(zIndex)
      }
      this.$container.style.zIndex = zIndex
    }
  }
  EChartsLayer.prototype.getZIndex = function() {
    return this.$container && this.$container.style.zIndex
  }
  /**
   * 设置可见性
   * @param {Boolean} visible - 可见行
   */
  EChartsLayer.prototype.setVisible = function(visible) {
    if (visible) {
      if (this.$container) {
        this.$container.style.display = ''
      }
      this._chartOptions = this.getChartOptions()
      this.clearAndRedraw()
    } else {
      if (this.$container) {
        this.$container.style.display = 'none'
      }
      this.clear()
      this._chartOptions = {}
      this.clearAndRedraw()
    }
  }
  EChartsLayer.prototype.render = function() {
    if (!this.$chart && this.$container) {
      this.$chart = echarts.init(this.$container)
      if (this._chartOptions) {
        this.registerMap()
        this.$chart.setOption(this.convertData(this._chartOptions), false)
      }
      this.dispatchEvent({
        type: 'load',
        source: this,
        value: this.$chart
      })
    } else if (this.isVisible()) {
      this.redraw()
    }
  }
  EChartsLayer.prototype.redraw = function() {
    this.clearAndRedraw()
  }
  EChartsLayer.prototype.updateViewSize = function(size) {
    if (!this.$container) { return }
    this.$container.style.width = `${size[0]}px`
    this.$container.style.height = `${size[1]}px`
    this.$container.setAttribute('width', String(size[0]))
    this.$container.setAttribute('height', String(size[1]))
  }
  EChartsLayer.prototype.onResize = function(event) {
    const map = this.getMap()
    if (map) {
      const size = map.getSize()
      this.updateViewSize(size)
      this.clearAndRedraw()
      if (event) {
        this.dispatchEvent({
          type: 'change:size',
          source: this,
          value: size
        })
      }
    }
  }
  EChartsLayer.prototype.onZoomEnd = function() {
    this._options.hideOnZooming && this.innerShow()
    const map = this.getMap()
    if (map && map.getView()) {
      this.clearAndRedraw()
      this.dispatchEvent({
        type: 'zoomend',
        source: this,
        value: map.getView().getZoom()
      })
    }
  }
  EChartsLayer.prototype.onDragRotateEnd = function() {
    this._options.hideOnRotating && this.innerShow()
    const map = this.getMap()
    if (map && map.getView()) {
      this.clearAndRedraw()
      this.dispatchEvent({
        type: 'change:rotation',
        source: this,
        value: map.getView().getRotation()
      })
    }
  }
  EChartsLayer.prototype.onMoveStart = function() {
    this._options.hideOnMoving && this.innerHide()
    const map = this.getMap()
    if (map && map.getView()) {
      this.dispatchEvent({
        type: 'movestart',
        source: this,
        value: map.getView().getCenter()
      })
    }
  }
  EChartsLayer.prototype.onMoveEnd = function() {
    this._options.hideOnMoving && this.innerShow()
    const map = this.getMap()
    if (map && map.getView()) {
      this.clearAndRedraw()
      this.dispatchEvent({
        type: 'moveend',
        source: this,
        value: map.getView().getCenter()
      })
    }
  }
  EChartsLayer.prototype.onClick = function(event) {
    if (this.$chart) {
      this.$chart.getZr().painter.getViewportRoot().dispatchEvent(mockEvent('click', event))
    }
  }
  EChartsLayer.prototype.mouseDown = function(event) {
    if (this.$chart) {
      this.$chart.getZr().painter.getViewportRoot().dispatchEvent(mockEvent('mousedown', event))
    }
  }
  EChartsLayer.prototype.mouseUp = function(event) {
    if (this.$chart) {
      this.$chart.getZr().painter.getViewportRoot().dispatchEvent(mockEvent('mouseup', event))
    }
  }
  EChartsLayer.prototype.mouseMove = function(event) {
    if (this.$chart) {
      let { target } = event.originalEvent
      while (target) {
        // console.log(target)
        // if (target.className === 'ol-overlaycontainer-stopevent') {
        if (target.className.indexOf('ol-unselectable') !== -1) {
          this.$chart.getZr().painter.getViewportRoot().dispatchEvent(mockEvent('mousemove', event))
          return
        }
        target = target.parentElement
      }
    }
  }
  EChartsLayer.prototype.onCenterChange = function() {
    const map = this.getMap()
    if (map && map.getView()) {
      this.clearAndRedraw()
      this.dispatchEvent({
        type: 'change:center',
        source: this,
        value: map.getView().getCenter()
      })
    }
  }
  EChartsLayer.prototype.handleMapChanged = function() {
    const map = this.getMap()
    if (this._initEvent && this.$container) {
      this.$container && removeNode(this.$container)
      this.unBindEvent()
    }
    if (!this.$container) {
      this.createLayerContainer()
      this.onResize(false)
    }
    if (map) {
      const container = this._options.stopEvent ? map.getOverlayContainerStopEvent() : map.getOverlayContainer()
      if (this._options.insertFirst) {
        container.insertBefore(this.$container, container.childNodes[0] || null)
      } else {
        container.appendChild(this.$container)
      }
      this.render()
      this.bindEvent(map)
    }
  }
  EChartsLayer.prototype.createLayerContainer = function() {
    this.$container = document.createElement('div')
    this.$container.style.position = 'absolute'
    this.$container.style.top = '0'
    this.$container.style.left = '0'
    this.$container.style.right = '0'
    this.$container.style.bottom = '0'
  }
  EChartsLayer.prototype.bindEvent = function(map) {
    const view = map.getView()
    if (this._options.forcedPrecomposeRerender) {
      map.on('precompose', this.redraw)
    }
    map.on('change:size', this.onResize)
    view.on('change:resolution', this.onZoomEnd)
    view.on('change:center', this.onCenterChange)
    view.on('change:rotation', this.onDragRotateEnd)
    map.on('movestart', this.onMoveStart)
    map.on('moveend', this.onMoveEnd)
    if (this._options.polyfillEvents) {
      map.on('pointerdown', this.mouseDown)
      map.on('pointerup', this.mouseUp)
      map.on('pointermove', this.mouseMove)
      map.on('click', this.onClick)
    }
    this._initEvent = true
  }
  EChartsLayer.prototype.unBindEvent = function() {
    const map = this.getMap()
    if (!map) { return }
    const view = map.getView()
    if (!view) { return }
    map.un('precompose', this.redraw)
    map.un('change:size', this.onResize)
    view.un('change:resolution', this.onZoomEnd)
    view.un('change:center', this.onCenterChange)
    view.un('change:rotation', this.onDragRotateEnd)
    map.un('movestart', this.onMoveStart)
    map.un('moveend', this.onMoveEnd)
    if (this._options.polyfillEvents) {
      map.un('pointerdown', this.mouseDown)
      map.un('pointerup', this.mouseUp)
      map.un('pointermove', this.mouseMove)
      map.un('click', this.onClick)
    }
    this._initEvent = false
  }
  EChartsLayer.prototype.clearAndRedraw = function() {
    if (!this.$chart || !this.isVisible()) { return }
    if (this._options.forcedRerender) {
      this.$chart.clear()
    }
    this.$chart.resize()
    if (this._chartOptions) {
      this.registerMap()
      this.$chart.setOption(this.convertData(this._chartOptions), false)
      if (this._incremental && this._incremental.length > 0) {
        for (let i = 0; i < this._incremental.length; i++) {
          this.appendData(this._incremental[i], false)
        }
      }
    }
    this.dispatchEvent({
      type: 'redraw',
      source: this
    })
  }
  EChartsLayer.prototype.registerMap = function() {
    if (!this._isRegistered) {
      this.coordinateSystemId = `openlayers_${uuid()}`
      echarts.registerCoordinateSystem(this.coordinateSystemId, this.getCoordinateSystem(this._options))
      this._isRegistered = true
    }
    if (this._chartOptions) {
      const { series } = this._chartOptions
      if (series && isObject(series)) {
        const { convertTypes } = this._options
        if (convertTypes) {
          for (let i = series.length - 1; i >= 0; i--) {
            if (!(convertTypes.indexOf(series[i].type) > -1)) {
              series[i].coordinateSystem = this.coordinateSystemId
            }
            series[i].animation = false
          }
        }
      }
    }
  }
  EChartsLayer.prototype.convertData = function(options) {
    const { series } = options
    if (series && series.length > 0) {
      if (!this._coordinateSystem) {
        const Rc = this.getCoordinateSystem(this._options)
        this._coordinateSystem = new Rc(this.getMap())
      }
      if (series && isObject(series)) {
        const { convertTypes } = this._options
        if (convertTypes) {
          for (let i = series.length - 1; i >= 0; i--) {
            if (convertTypes.indexOf(series[i].type) > -1) {
              if (series[i] && series[i].hasOwnProperty('coordinates')) {
                series[i] = echarts[series[i].type](options, series[i], this._coordinateSystem, i)
              }
            }
          }
        }
      }
    }
    return options
  }
  EChartsLayer.prototype.getCoordinateSystem = function(options) {
    const map = this.getMap()
    const { coordinateSystemId } = this
    let RegisterCoordinateSystem = function(map) {
      this.map = map
      this._mapOffset = [0, 0]
      this.dimensions = ['lng', 'lat']
      this.projCode = RegisterCoordinateSystem.getProjectionCode(this.map)
    }
    RegisterCoordinateSystem.dimensions = RegisterCoordinateSystem.prototype.dimensions || ['lng', 'lat']
    RegisterCoordinateSystem.prototype.getZoom = function() {
      return this.map.getView().getZoom()
    }
    RegisterCoordinateSystem.prototype.setZoom = function(zoom) {
      return this.map.getView().setZoom(zoom)
    }
    RegisterCoordinateSystem.prototype.getViewRectAfterRoam = function() {
      return this.getViewRect().clone()
    }
    RegisterCoordinateSystem.prototype.setMapOffset = function(mapOffset) {
      this._mapOffset = mapOffset
    }
    RegisterCoordinateSystem.prototype.dataToPoint = function(data) {
      let coords
      if (data && Array.isArray(data) && data.length > 0) {
        coords = data.map((item) => {
          let res = 0
          if (typeof item === 'string') {
            res = Number(item)
          } else {
            res = item
          }
          return res
        })
        const source = (options && options.source) || 'EPSG:4326'
        const destination = (options && options.destination) || this.projCode
        const pixel = this.map.getPixelFromCoordinate(transform(coords, source, destination))
        const mapOffset = this._mapOffset
        return [pixel[0] - mapOffset[0], pixel[1] - mapOffset[1]]
      }
      return [0, 0]
    }
    RegisterCoordinateSystem.prototype.pointToData = function(pixel) {
      const mapOffset = this._mapOffset
      return this.map.getCoordinateFromPixel([pixel[0] + mapOffset[0], pixel[1] + mapOffset[1]])
    }
    RegisterCoordinateSystem.prototype.getViewRect = function() {
      const size = this.map.getSize()
      return new echarts.graphic.BoundingRect(0, 0, size[0], size[1])
    }
    RegisterCoordinateSystem.prototype.getRoamTransform = function() {
      return echarts.matrix.create()
    }
    RegisterCoordinateSystem.prototype.prepareCustoms = function() {
      const rect = this.getViewRect()
      return {
        coordSys: {
          type: coordinateSystemId,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        },
        api: {
          coord: bind(this.dataToPoint, this),
          size: bind(RegisterCoordinateSystem.dataToCoordsSize, this)
        }
      }
    }
    RegisterCoordinateSystem.create = function(echartsModel) {
      echartsModel.eachSeries((seriesModel) => {
        if (seriesModel.get('coordinateSystem') === coordinateSystemId) {
          seriesModel.coordinateSystem = new RegisterCoordinateSystem(map)
        }
      })
    }
    RegisterCoordinateSystem.getProjectionCode = function(map) {
      let code = ''
      if (map) {
        code = map.getView() &&
                  map
                    .getView()
                    .getProjection()
                    .getCode()
      } else {
        code = 'EPSG:3857'
      }
      return code
    }
    RegisterCoordinateSystem.dataToCoordsSize = function(dataSize, dataItem) {
      const _this = this
      if (dataItem === void 0) { dataItem = [0, 0] }
      return [0, 1].map((dimIdx) => {
        const val = dataItem[dimIdx]
        const p1 = []
        const p2 = []
        const halfSize = dataSize[dimIdx] / 2
        p1[dimIdx] = val - halfSize
        p2[dimIdx] = val + halfSize
        p1[1 - dimIdx] = dataItem[1 - dimIdx]
        p2[1 - dimIdx] = dataItem[1 - dimIdx]
        const offset = _this.dataToPoint(p1)[dimIdx] - _this.dataToPoint(p2)[dimIdx]
        return Math.abs(offset)
      }, this)
    }
    return RegisterCoordinateSystem
  }
  EChartsLayer.prototype.dispatchEvent = function(event) {
    return _super.prototype.dispatchEvent.call(this, event)
  }
  EChartsLayer.prototype.set = function(key, value, optSilent) {
    return _super.prototype.set.call(this, key, value, optSilent)
  }
  EChartsLayer.prototype.get = function(key) {
    return _super.prototype.get.call(this, key)
  }
  EChartsLayer.prototype.unset = function(key, optSilent) {
    return _super.prototype.unset.call(this, key, optSilent)
  }
  EChartsLayer.prototype.on = function(type, listener) {
    return _super.prototype.on.call(this, type, listener)
  }
  EChartsLayer.prototype.un = function(type, listener) {
    return _super.prototype.un.call(this, type, listener)
  }
  EChartsLayer.formatGeoJSON = formatGeoJSON
  EChartsLayer.bind = bind
  EChartsLayer.merge = merge
  EChartsLayer.uuid = uuid
  EChartsLayer.bindAll = bindAll
  EChartsLayer.arrayAdd = arrayAdd
  EChartsLayer.removeNode = removeNode
  EChartsLayer.isObject = isObject
  return EChartsLayer
}(obj))
export default EChartsLayer
