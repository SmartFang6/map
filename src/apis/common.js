import { getHttp } from "@/utils/axios";
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
