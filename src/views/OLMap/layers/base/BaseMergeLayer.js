import { SourceTypeEnum } from '../../enum/TypeEnum'
import BaseLayer from './BaseLayer'

/**
 * 支持全部图层类型的图层
 * @memberof 图层
 * @extends BaseLayer
 */
class BaseMergeLayer extends BaseLayer {
  /**
   * 获取数据源
   * @override
   * @returns {*}
   */
  getSource() {
    let source
    if (this.layer) {
      if (this.layerConfig.source.type === SourceTypeEnum.cluster) {
        source = this.layer.getSource().getSource()
      } else {
        source = this.layer.getSource()
      }
    }
    return source
  }

  /**
   * 用于矢量图层的清空元素
   */
  clear() {
    this.getSource().clear()
  }

  /**
   * 用于矢量图层的添加元素
   * @param {Array} features - feature对象数组
   */
  addFeatures(features) {
    this.getSource().addFeatures(features)
  }
}
export default BaseMergeLayer
