import { postHttp } from "@/utils/axios";

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
  return postHttp("/supervision/getEventStat", { data });
};
