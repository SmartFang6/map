import { getHttp, postHttp } from "@/utils/axios";
/**
 * 视频站查询播放链接列表
 * @param {codeList} data 视频编号列表
 */
export const queryVideoUrlList = (data, config) => {
  return getHttp("/supervision/queryVideoUrlList", {
    data,
    ...config,
  });
};
/**
 * 根据视频编号控制云台
 * @param {
 * code 视频编号
 * command 控制指令
 * speed 速度(0~255) 默认值: 15 , 传0会被重置为129
 * } data
 */
export const controlVideo = (data) => {
  return getHttp("/supervision/controlVideo", {
    data,
  });
};
// 获取项目信息详情
export const subjectDetail = (data) => {
  return getHttp("/supervision/supervise/subject/detail", {
    data,
  });
};

// 获取涉水项目列表
export const getSubjectList = (data) => {
  return postHttp("/supervision/getSubjectList", {
    data,
  });
};
// 查询事件信息分页列表
export const getEventList = (data) => {
  return postHttp("/supervision/getEventList", {
    data,
  });
};
