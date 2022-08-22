import BaseVectorLayer from './BaseVectorLayer'

/**
 * @classdesc 基础聚合图层
 * @memberof 图层
 * @extends BaseVectorLayer
 */
class BaseClusterLayer extends BaseVectorLayer {
  /**
   * 获取数据源
   * @override
   * @returns {*}
   */
  getSource() {
    let source
    if (this.layer) {
      source = this.layer.getSource().getSource()
    }
    return source
  }
}
export default BaseClusterLayer
