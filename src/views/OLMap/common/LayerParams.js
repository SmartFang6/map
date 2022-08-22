/**
 * 数据传输对象类
 * @classdesc 数据参数类
 */
class LayerParams {
  /**
   * 创建一个数据传输类
   * @param {Object} params 数据传输类
   * @param {string} params.searchInfo - 搜索参数.
   * @param {Object} params.vm - vue对象
   * @param {Object} params.olMap - 地图对象
   * @param {Object} params.olMap.map - 地图
   * @param {Object} params.olMap.layers - 全部图层
   * @param {String} params.layerid - 选中的图层id
   * @param {Object} params.feature - 选中的元素
   * @param {Object} params.row - 列表选中的数据
   * @param {Array} params.coord - 当前点击的位置经纬度
   */
  constructor(params) {
    const baseParams = {
      searchInfo: null, // 点击搜索地图联动同步
      vm: null, // map.vue 对象
      olMap: null, // 真实的地图对象，包含layers以及map
      layerid: '', // 图层id
      feature: '', // feature对象
      row: null, // 行点击对象
      coord: '' // 当前点击点的位置
    }
    this.params = Object.assign(baseParams, params)
  }

  get config() {
    return this.params
  }

  set config(params) {
    this.params = params
  }

  get map() {
    return this.params.olMap ? this.params.olMap.map : this.params.vm.map
  }

  get searchInfo() {
    return this.params.searchInfo
  }

  set searchInfo(searchInfo) {
    this.params.searchInfo = searchInfo
  }

  get layerid() {
    return this.params.layerid
  }

  set layerid(layerid) {
    this.params.layerid = layerid
  }

  get feature() {
    return this.params.feature
  }

  set feature(feature) {
    this.params.feature = feature
  }

  get coord() {
    return this.params.coord
  }

  set coord(coord) {
    this.params.coord = coord
  }

  /**
   * 获取参数
   * @param {String} key - 参数名
   * @returns {*} 参数值
   */
  getValueByKey(key) { // 返回参数
    return this.params[key]
  }

  /**
   * 设置参数
   * @param {String} key - 参数名
   * @param {*} val 参数值
   */
  setValueByKey(key, val) {
    this.params[key] = val
  }
}
export default LayerParams
