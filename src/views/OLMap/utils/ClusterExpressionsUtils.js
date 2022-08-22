import ExpressionsUtils from './ExpressionsUtils'
/**
 * 用于生成聚合属性
 * @memberof 工具类
 */
class ClusterExpressionsUtils {
  /**
   * 获取聚合属性
   * @param {Array} features
   * @param {Object} clusterProperties - 聚合属性表达式 {max:['max',['get','number']],min:['min',['get','min']],sum:['+',['get','sum']]}
   * @returns {Object} 聚合属性
   */
  static dealExpression(features, clusterProperties, resolution) {
    const properties = {
      point_count: features.length
    }
    Object.keys(clusterProperties).forEach(key => {
      properties[key] = this.dealSingleExpression(features, clusterProperties[key], resolution)
    })
    return properties
  }
  /**
   * 计算单个表达式结果
   * @param {Array} features - 元素
   * @param {Array} expression - 单个表达式
   * @returns {Object} 结果
   */
  static dealSingleExpression(features, expression, resolution) {
    let result = ''
    switch (expression[0]) {
      case 'max':
        result = this.maxData(features, expression[1], resolution)
        break
      case 'min':
        result = this.minData(features, expression[1], resolution)
        break
      case '+':
        result = this.sumData(features, expression[1], resolution)
        break
    }
    return result
  }

  /**
   * 计算聚合元素 求和
   * @param {Array} features - 聚合元素
   * @param {Array} expression - 表达式 ['+',['get','number']]
   * @returns {Object} 最大值
   */
  static sumData(features, expression, resolution) {
    const datas = []
    features.forEach(feature => {
      const properties = feature.get('properties')
      datas.push(ExpressionsUtils.dealExpressionByProperties(properties, expression, resolution))
    })
    return ExpressionsUtils.dealExpressionByProperties(null, ['+', datas], resolution)
  }

  /**
   * 计算聚合元素中的最大值
   * @param {Array} features - 聚合元素
   * @param {Array} expression - 表达式 ['min',['get','number']]
   * @returns {Object} 最大值
   */
   static minData(features, expression, resolution) {
    const datas = []
    features.forEach(feature => {
      const properties = feature.get('properties')
      datas.push(ExpressionsUtils.dealExpressionByProperties(properties, expression, resolution))
    })
    return ExpressionsUtils.dealExpressionByProperties(null, ['min', datas], resolution)
  }

  /**
   * 计算聚合元素中的最大值
   * @param {Array} features - 聚合元素
   * @param {Array} expression - 表达式 ['max',['get','number']]
   * @returns {Object} 最大值
   */
  static maxData(features, expression, resolution) {
    const datas = []
    features.forEach(feature => {
      const properties = feature.get('properties')
      datas.push(ExpressionsUtils.dealExpressionByProperties(properties, expression, resolution))
    })
    return ExpressionsUtils.dealExpressionByProperties(null, ['max', datas], resolution)
  }
}
export default ClusterExpressionsUtils
