import { postHttp, getHttp } from "@/utils/axios";

//浙水美丽接口
const BSER_URL = "https://web.dcyun.com:48460/beautiful-api/beautiful";

/**
 * 事根据上一级河段编号查询下一级河段列表(及河长相关信息)
 * @param {Object<any>} data 查询参数
 * @returns {Object<any>}
 */
export const getEventSourceInfo = (data) => {
  return postHttp(BSER_URL + "/master/listRvMasterByUpRchcd", { data });
};
/**
 * 根据河段编号查询河长
 * @param {Object<any>} rchcd 查询参数
 */
export const getPersonInfoByRchcd = (data) => {
  return getHttp(BSER_URL + "/rlrcReachInfo/getPersonInfoByRchcd", {
    data,
  });
};
