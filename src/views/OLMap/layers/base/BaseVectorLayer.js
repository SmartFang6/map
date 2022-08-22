import BaseLayer from './BaseLayer'

/**
 * 矢量图层（非聚合）
 * @memberof 图层
 * @extends BaseLayer
 */
class BaseVectorLayer extends BaseLayer {
  /**
   * 清空图层
   */
  clear() {
    this.getSource().clear()
  }

  /**
   * 添加数据到source
   * @param features
   */
  addFeatures(features) {
    this.getSource().addFeatures(features)
  }
}
export default BaseVectorLayer
