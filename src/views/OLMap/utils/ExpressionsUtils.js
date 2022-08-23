import ClusterExpressionsUtils from './ClusterExpressionsUtils'
/**
 * 用于处理mapbox公式的工具类  一般用于样式中
 * 现支持运算符为 == != < <= > >= all any case get has !
 * 需要注意点 属性来源于feature.get('properties') 中
 * @memberof 工具类
 * @example
 * 现假设有一组样式需求，当
 * 1.sttp为RR并且status为3时用红色图标red_icon
 * 2.sttp为RR并且status为2时用黄色图标yellow_icon
 * 3.sttp为RR并且status为1时用绿色图标green_icon
 * 则表达式可以写为
 * let expression = [
 *  'case',
 *  ['all',['==',['get','sttp'],'RR'],['==',['get','status'],3]],red_icon
 *  ['all',['==',['get','sttp'],'RR'],['==',['get','status'],3]],yellow_icon
 *  ['all',['==',['get','sttp'],'RR'],['==',['get','status'],3]],green_icon
 *  green_icon
 * ]
 * ExpressionsUtils.dealExpression(feature,expression)
 */
class ExpressionsUtils {
  /**
   * 通过feature处理表达式，并返回结果
   * @static
   * @param {ol.Feature} feature - feature对象
   * @param {Array} expression - 表达式
   * @returns {*} 返回结果
   */
  static dealExpression(feature, expression, clusterProperties, resolution) {
    const features = feature.get('features')
    let properties
    if (features) { // 表示是聚合元素
      if (features.length > 1) {
        properties = ClusterExpressionsUtils.dealExpression(features, clusterProperties || {}, resolution)
      } else {
        properties = features[0].get('properties')
      }
    } else {
      properties = feature.get('properties')
    }
    return this.dealExpressionByProperties(properties, expression, resolution)
  }

  /**
   * 通过属性对象以及表达式返回结果
   * @static
   * @param {Object} properties - 对象元素例如 {a:'123','b':123}
   * @param {Array} expression - 表达式
   * @returns {*}
   */
  static dealExpressionByProperties(properties, expression, resolution) {
    const operate = expression[0]
    let result
    switch (operate) {
      case '==':
        result = this.equalTo(properties, expression[1], expression[2])
        break
      case '!=':
        result = this.notEqualTo(properties, expression[1], expression[2])
        break
      case '<':
        result = this.lessThan(properties, expression[1], expression[2])
        break
      case '<=':
        result = this.lessThanEqualTo(properties, expression[1], expression[2])
        break
      case '>':
        result = this.greaterThan(properties, expression[1], expression[2])
        break
      case '>=':
        result = this.greaterThanEqualTo(properties, expression[1], expression[2])
        break
      case 'all':
        result = this.allTo(properties, expression)
        break
      case 'any':
        result = this.anyTo(properties, expression)
        break
      case 'case':
        result = this.caseTo(properties, expression)
        break
      case 'get':
        result = this.getData(properties, expression[1])
        break
      case 'has':
        result = this.hasData(properties, expression[1])
        break
      case '!':
        result = this.invertData(properties, expression[1])
        break
      case 'concat':
        result = this.concatData(properties, expression)
        break
      case 'max':
        result = this.maxData(properties, expression[1])
        break
      case 'min':
        result = this.minData(properties, expression[1])
        break
      case '+':
        result = this.sumData(properties, expression[1])
        break
      case 'index-of':
        result = this.indexOfData(properties, expression[1], expression[2])
        break
      case 'resolution':
        result = resolution
        break
    }
    return result
  }

  static indexOfData(properties, cExpression, expression) {
    const compair = cExpression instanceof Array ? this.dealExpressionByProperties(properties, cExpression) : cExpression
    const field = expression instanceof Array ? this.dealExpressionByProperties(properties, expression) : expression
    return field.indexOf(compair)
  }

  /**
   * 计算累加值
   * @param {Object} properties - 对象参数 {number:4}
   * @param {Array} expression - 需要求最大值的数组 [['get','number'],2,3]
   * @return {Object} 最小值
   */
   static sumData(properties, expression) {
    let sum = 0
    for (let i = 0; i < expression.length; i++) {
      if (expression[i] instanceof Array) {
        sum += this.dealExpressionByProperties(properties, expression[i])
      } else {
        sum += expression[i]
      }
    }
    return sum
  }

  /**
   * 计算最小值
   * @param {Object} properties - 对象参数 {number:4}
   * @param {Array} expression - 需要求最大值的数组 [['get','number'],2,3]
   * @return {Object} 最小值
   */
  static minData(properties, expression) {
    let min
    for (let i = 0; i < expression.length; i++) {
      let temp
      if (expression[i] instanceof Array) {
        temp = this.dealExpressionByProperties(properties, expression[i])
      } else {
        temp = expression[i]
      }
      if (!min || min > temp) {
        min = temp
      }
    }
    return min
  }

  /**
   * 计算最大值
   * @param {Object} properties - 对象参数 {number:4}
   * @param {Array} expression - 需要求最大值的数组 [['get','number'],2,3]
   * @return {Object} 最大值
   */
  static maxData(properties, expression) {
    let max
    for (let i = 0; i < expression.length; i++) {
      let temp
      if (expression[i] instanceof Array) {
        temp = this.dealExpressionByProperties(properties, expression[i])
      } else {
        temp = expression[i]
      }
      if (!max || max < temp) {
        max = temp
      }
    }
    return max
  }

  static concatData(properties, expression) {
    let str = ''
    for (let i = 1; i < expression.length; i++) {
      if (expression[i] instanceof Array) {
        str += this.dealExpressionByProperties(properties, expression[i])
      } else {
        str += expression[i]
      }
    }
    return str
  }

  static invertData(properties, expression) {
    if (expression instanceof Array) {
      expression = this.dealExpressionByProperties(properties, expression)
    }
    return !properties[expression]
  }

  static hasData(properties, expression) {
    if (expression instanceof Array) {
      expression = this.dealExpressionByProperties(properties, expression)
    }
    return !!((properties[expression] || properties[expression] === 0))
  }

  static getData(properties, expression) {
    if (expression instanceof Array) {
      expression = this.dealExpressionByProperties(properties, expression)
    }
    return properties[expression]
  }

  static equalTo(properties, expression, result) {
    let firstData = expression
    let lastData = result
    if (expression instanceof Array) {
      firstData = this.dealExpressionByProperties(properties, expression)
    }
    if (result instanceof Array) {
      lastData = this.dealExpressionByProperties(properties, result)
    }
    if (firstData === lastData) {
      return true
    } else {
      return false
    }
  }

  static notEqualTo(properties, expression, result) {
    let firstData = expression
    let lastData = result
    if (expression instanceof Array) {
      firstData = this.dealExpressionByProperties(properties, expression)
    }
    if (result instanceof Array) {
      lastData = this.dealExpressionByProperties(properties, result)
    }
    if (firstData !== lastData) {
      return true
    } else {
      return false
    }
  }

  static lessThan(properties, expression, result) {
    let firstData = expression
    let lastData = result
    if (expression instanceof Array) {
      firstData = this.dealExpressionByProperties(properties, expression)
    }
    if (result instanceof Array) {
      lastData = this.dealExpressionByProperties(properties, result)
    }
    if (firstData < lastData) {
      return true
    } else {
      return false
    }
  }

  static lessThanEqualTo(properties, expression, result) {
    let firstData = expression
    let lastData = result
    if (expression instanceof Array) {
      firstData = this.dealExpressionByProperties(properties, expression)
    }
    if (result instanceof Array) {
      lastData = this.dealExpressionByProperties(properties, result)
    }
    if (firstData <= lastData) {
      return true
    } else {
      return false
    }
  }

  static greaterThan(properties, expression, result) {
    let firstData = expression
    let lastData = result
    if (expression instanceof Array) {
      firstData = this.dealExpressionByProperties(properties, expression)
    }
    if (result instanceof Array) {
      lastData = this.dealExpressionByProperties(properties, result)
    }
    if (firstData > lastData) {
      return true
    } else {
      return false
    }
  }

  static greaterThanEqualTo(properties, expression, result) {
    let firstData = expression
    let lastData = result
    if (expression instanceof Array) {
      firstData = this.dealExpressionByProperties(properties, expression)
    }

    if (result instanceof Array) {
      lastData = this.dealExpressionByProperties(properties, result)
    }
    if (firstData >= lastData) {
      return true
    } else {
      return false
    }
  }

  static allTo(properties, expression) {
    let result = true
    // 因为表达式的第一个是'all' 是不需要参与计算的，所以先移除
    for (let i = 1; i < expression.length; i++) {
      if (!this.dealExpressionByProperties(properties, expression[i])) {
        result = false
        break
      }
    }
    return result
  }

  static anyTo(properties, expression) {
    let result = false
    // 因为表达式的第一个是'any' 是不需要参与计算的，所以先移除
    for (let i = 1; i < expression.length; i++) {
      if (this.dealExpressionByProperties(properties, expression[i])) {
        result = true
        break
      }
    }
    return result
  }

  static caseTo(properties, expression) {
    let result = false
    // 因为表达式的第一个是'case' 是不需要参与计算的，所以先移除
    for (let i = 1; i < expression.length; i = i + 2) { // 因为case 的表达式都是一个表达式，一个结果
      if (expression[i] instanceof Array) {
        if (i === expression.length - 1) { // 表示是最后一个元素
          result = this.dealExpressionByProperties(properties, expression[i])
          break
        }
        if (this.dealExpressionByProperties(properties, expression[i])) {
          if (expression[i + 1] instanceof Array) {
            result = this.dealExpressionByProperties(properties, expression[i + 1])
          } else {
            result = expression[i + 1]
          }
          break
        }
      } else {
        result = expression[i]
      }
    }
    return result
  }
}
export default ExpressionsUtils
