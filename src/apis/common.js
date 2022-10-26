import { getHttp } from "@/utils/axios";
/**
 * 根据字典的表和列代码组合查询字典集合
 */
export const getDictList = (data) => {
  return getHttp("/common/dictList", {
    data,
  });
};
