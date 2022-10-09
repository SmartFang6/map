import { getHttp } from "@/utils/axios";
/**
 * 视频站查询播放链接列表
 * @param {codeList} data 视频编号列表
 */
export const queryVideoUrlList = (data) => {
  return getHttp("/supervision/queryVideoUrlList", {
    data,
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
