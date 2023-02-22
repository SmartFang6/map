/*
 * @Author: bifang
 * @Date: 2022-11-23 18:28:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-02-21 14:50:10
 * @FilePath: /river-lake-cockpit-front/src/apis/common.js
 */
import { getHttp, postHttp } from "@/utils/axios";
import { getDomainName } from "@/utils/config";
const BASE_URL = getDomainName() + "/manage-api";
/**
 * 根据字典的表和列代码组合查询字典集合
 */
export const getDictList = (data) => {
  return getHttp("/common/dictList", {
    data,
  });
};
// 一键巡河
export const getCustomTicket = (data) =>
  getHttp("/common/getCustomTicket", data);
/**
 * 查看水域数量统计信息
 */
export const getSurvreyTypeStat = (data) => {
  return postHttp("/supervision/getSurvreyTypeStat", { data });
};
/**
 * 获取登陆所需的公钥
 */
export const getAuthSign = (data) => {
  return getHttp("/common/getAuthSign", {
    data,
    baseURL: "/userApi",
  });
};

/**
 * 根据adcd获取事件类型下拉值
 * @param {Object} data data
 * @returns {Object<any>}
 */
export const getListEventTypeByAdcd = (data) => {
  return postHttp(BASE_URL + "/common/listEventTypeByAdcd", {
    data,
  });
};
