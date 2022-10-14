import { postHttp, getHttp } from "@/utils/axios";

//浙水美丽接口
// const BSER_URL = "https://sgpt.yw.gov.cn:6006/manage-api";

/**
 * 事根据上一级河段编号查询下一级河段列表(及河长相关信息)
 * @param {Object<any>} data 查询参数
 * @returns {Object<any>}
 */
export const getEventSourceInfo = (data) => {
  return postHttp("/beautiful/master/listRvMasterByUpRchcd", { data });
};
/**
 * 根据河段编号查询河长
 * @param {Object<any>} rchcd 查询参数
 */
export const getPersonInfoByRchcd = (data) => {
  return getHttp("/beautiful/rlrcReachInfo/getPersonInfoByRchcd", {
    data,
  });
};
