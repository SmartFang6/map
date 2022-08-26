import { postHttp, getHttp } from "@/utils/axios";

// 获取事件统计结果 (事件统计、问题来源、问题派发)
/**
 *
 * @param {
 * adcd 行政区划代码
 * code 编号
 * endTime 结束时间
 * startTime 开始时间
 * pageNo 页码
 * pageSize 分页数量
 * searchText 模糊搜索关键字
 * } data
 */
export const getEventStat = (data) => {
  return postHttp("/supervision/getEventStat", {
    data,
  });
};
// 获取事件等级统计结果 (问题清单列表)
/**
 *
 * @param {
 * adcd 行政区划代码
 * code 编号
 * endTime 结束时间
 * startTime 开始时间
 * pageNo 页码
 * pageSize 分页数量
 * searchText 模糊搜索关键字
 * eventDealStatus 事件处理状态:1:待受理; 2:未处理; 3:待审核; 4:审核退回; 5:已销号; 6:逾期;
 * } data
 */
export const getEventStatGradeForProblemList = (data) => {
  return postHttp("/supervision/getEventStatGradeForProblemList", {
    data,
  });
};

//水域监管后台接口
const BSER_URL = "http://192.168.2.238:8502/api";
/**
 * 查询数据库字典
 * tableCode:columnCode,tableCode:columnCode,规则组装
 * @param {string} tableColumnCodes 询字典集合
 * @return {Object}
 */
export const getListDict = (tableColumnCodes) => {
  return getHttp(BSER_URL + "/common/listDict", {
    data: { tableColumnCodes },
  });
};

// 下级行政区域列表查询
export const getListDistrict = (data) => {
  return getHttp(BSER_URL + "/common/listDistrict", { data });
};
/**
 * 查询河段信息集合
 * @param {Object<any>} data 查询参数
 * @returns {Object<any>}
 */
export const getListRlrcReachInfo = (data) => {
  return postHttp(BSER_URL + "/common/listRlrcReachInfo", { data });
};
