import Map from 'ol/Map'
import { defaults as controlDefaults } from 'ol/control'
import { defaults as interactionDefaults } from 'ol/interaction'
import View from 'ol/View'
/**
 * 地图公共生成类
 * @memberof 工具类
 */
class MapFactory {
  /**
   *创建地图类
   * @static
   * @param {Object} config - 配置项
   * @param {Array} config.renderer - 地图渲染方式
   * @param {String} config.target - 地图容器
   * @param {Object} config.controls - 地图控制控件
   * @param {Object} config.interactions - 地图事件
   * @param {Number} config.maxTilesLoading - 最大瓦片加载数量
   * @param {Object} config.view - 地图视图窗口配置
   * @param {String} config.view.projection - 地图投影
   * @param {Array} config.view.center - 地图中心
   * @param {zoom} config.view.zoom - 地图初始化层级
   * @param {minZoom} config.view.minZoom - 地图最小缩放层级
   * @param {maxZoom} config.view.maxZoom - 地图最大缩放层级
   * @returns {ol.Map}
   */
  static createMap(config) {
    return new Map({
      renderer: config.renderer,
      target: config.target,
      controls: controlDefaults(config.controls),
      interactions: interactionDefaults(config.interactions),
      maxTilesLoading: config.maxTilesLoading,
      view: new View(config.view)
    })
  }
}
export default MapFactory
