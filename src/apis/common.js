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
  return postHttp(
    "/survreyCommonBiz/getSurvreyTypeStat",
    { data },
    {
      baseURL: "/onemap-api",
    }
  );
};
