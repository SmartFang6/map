/**
 * 驾驶舱事件统计 api
 */

import { postHttp } from "@/utils/axios/index";
import { getDomainName } from "@/utils/config";

/**
 * 获取事件统计结果 (事件统计、问题来源、问题派发)
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const getEventStat = (queryParams) => {
  return postHttp("/supervision/getEventStat", { data: queryParams });
};

/**
 * 获取事件高发排名 (按地区、类型)
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const getEventIncidenceRank = (queryParams) => {
  return postHttp("/supervision/getEventStatHighIncidenceRank", {
    data: queryParams,
  });
};

/**
 * 获取处置绩效 (考核排名)
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const getEventPointRank = (queryParams) => {
  return postHttp("/supervision/getEventStatPointRank", {
    data: queryParams,
  });
};

/**
 * 获取风险管控结果
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const getEventRiskControl = (queryParams) => {
  return postHttp("/supervision/getEventStatRiskControl", {
    data: queryParams,
  });
};

/**
 * 获取问题清单的列表
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const getEventQuestionList = (queryParams) => {
  return postHttp("/supervision/pageEventStatReportProblemNewRecord", {
    data: queryParams,
  });
};

/**
 * 获取事件高发排名的'类型'列表数据(新)
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const getEventTypeIncidenceRank = (queryParams) => {
  return postHttp("/supervision/getEventStatHighIncidenceRank", {
    data: queryParams,
  });
};

/**
 * 获取处置绩效接口V2
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const getEventStatPointRankV2 = (queryParams) => {
  return postHttp("/supervision/getEventStatPointRank/V2", {
    data: queryParams,
  });
};

/**
 * 获取考核绩效排名 特殊的地市
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const listRank = (queryParams) => {
  return postHttp("/performanceAppraisalRank/listRank", {
    data: queryParams,
  });
};

/**
 * 获取政策制度列表
 * @param {*} queryParams 查询参数
 * @returns [Array]
 */
export const getPoliciesSystemsList = (queryParams) => {
  return postHttp("/supervision/getPolicyInfo", {
    data: queryParams,
  });
};

/**
 * 获取趋势分析结果的列表数据
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const getEventStatTrendAnalysisList = (queryParams) => {
  return postHttp("/supervision/getEventStatTrendAnalysisList", {
    data: queryParams,
  });
};

/**
 * 获取标题统计信息
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const getEventTitleCount = (queryParams) => {
  return postHttp("/supervision/eventTitleCount", {
    data: queryParams,
  });
};

/**
 * 获取问题清单的列表(9月12日新接口，新增筛选参数)
 * @param {*} queryParams 查询参数
 * @returns {Object}
 */
export const getEventStatReportProblemList = (queryParams) => {
  return postHttp("/supervision/listEventStatReportProblemNewRecordBySearch", {
    data: queryParams,
  });
};

/**
 * 获取问题详情
 * @param {Object<any>} queryParams 查询参数
 * @returns {Object}
 */
//水域监管后台接口
// const BSER_URL = "https://sgpt.yw.gov.cn:6006/manage-api";
const BASE_URL = getDomainName() + "/manage-api";
export const getEventDetail = (queryParams) => {
  return postHttp(BASE_URL + "/eventCenter/getEventDetail", {
    data: queryParams,
  });
};
