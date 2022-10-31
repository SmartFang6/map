import { postHttp, getHttp } from "@/utils/axios";
import { getDomainName } from "@/utils/config";

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
// const BSER_URL = "https://sgpt.yw.gov.cn:6006/manage-api";
const BSER_URL = getDomainName() + "/manage-api";
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

/**
 * 事件来源更多: 完整事件来源列表
 * @param {Object<any>} data 查询参数
 * @returns {Object<any>}
 */
export const getEventSourceInfo = (data) => {
  return postHttp("/supervision/getEventSourceInfo", { data });
};
/**
 * 事件分类统计（两饼图）
 * @param {Object<any>} data 查询参数
 * @returns {Object<any>}
 */
export const countEventClassCount = (data) => {
  return postHttp("/supervision/countEventClassCount", { data });
};
export const getEventDistributeInfo = (data) => {
  return postHttp("/supervision/getEventDistributeInfo", { data });
};

/**
 * 事件定人的列表数据
 * date: 2022.10.26
 * @param {Object<any>} data: 查询参数
 * @returns {Object<any>}
 */
export const getEventStatDistributePerson = (data) => {
  return postHttp("/supervision/getEventStatDistributePer", { data });
};
/**
 * 事件定性的列表数据
 * date: 2022.10.31
 * @param {Object<any>} data: 查询参数
 * @returns {Object<any>}
 */
export const getEventStatDistribute = (data) => {
  return postHttp("/supervision/getEventStatDistribute", { data });
};

/**
 * 事件定责的列表数据
 * date: 2022.10.31
 * @param {Object<any>} data: 查询参数
 * @returns {Object<any>}
 */
export const getEventStatDistributePersons = (data) => {
  return postHttp("/supervision/getEventStatDistributePerson", { data });
};

/**
 * 获取工作成效的列表
 * date: 2022.10.26
 * @param {Object<any>} data: 查询参数
 * @returns {Object<any>}
 */
export const getWorkEffectList = (data) => {
  return postHttp("/supervision/getEventStatDistribution", { data });
};

/**
 * 获取问题研判断的列表
 * date: 2022.10.26
 * @param {Object<any>} data: 查询参数
 * @returns {Object<any>}
 */
export const getProblemJudgmentList = (data) => {
  // return postHttp("/supervision/getProblemJudgmentList", { data });
  return {
    ...data,
    config: null,
    list: [
      {
        id: 1001,
        eventName: "侵占河湖空间",
        num: 624,
        rate: 100,
      },
      {
        id: 1002,
        eventName: "占用水域",
        num: 277,
        rate: 84,
      },
      {
        id: 1003,
        eventName: "影响航道",
        num: 154,
        rate: 73,
      },
      {
        id: 1004,
        eventName: "城市河道保洁",
        num: 92,
        rate: 62,
      },
      {
        id: 1005,
        eventName: "水域保洁",
        num: 47,
        rate: 54,
      },
      {
        id: 1006,
        eventName: "非法拦网",
        num: 45,
        rate: 27,
      },
      {
        id: 1007,
        eventName: "非法采砂",
        num: 13,
        rate: 10,
      },
    ],
  };
};
