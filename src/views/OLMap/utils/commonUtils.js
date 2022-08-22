/**
 * @module commonUtils
 * @memberof 工具类
 * @description 一些公共的工具类
 *
 */

/**
 * 生成uuid
 * @returns {*}
 */
const uuid = function() {
    function rd(a) {
        return a ? (a ^ Math.random() * 16 >> a / 4).toString(16)
            : ([1e7] + -[1e3] + -4e3 + -8e3 + -1e11).replace(/[018]/g, rd)
    }
    return rd()
}
export { uuid }
