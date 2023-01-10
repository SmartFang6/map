/*
 * @Author: bifang
 * @Date: 2022-11-23 18:28:45
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-01-10 09:59:20
 * @FilePath: /river-lake-cockpit-front/src/apis/common.js
 */
import { getHttp, postHttp } from "@/utils/axios";
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
