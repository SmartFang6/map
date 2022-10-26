import { postHttp } from "@/utils/axios";

/**
 * 获取组件列表
 **/
export const getWidgetList = (data) =>
  postHttp("configLayoutRecord/listComponent", { data });

/**
 * 用户布局列表
 **/
export const getUserConfigLayoutList = (data) =>
  postHttp("configLayoutRecord/userConfigLayoutList", { data });

/**
 * 保存、新增用户布局
 **/
export const setUserConfigLayoutInfo = (data) =>
  postHttp("configLayoutRecord/save", { data });

/**
 * 删除用户布局
 **/
export const delUserConfigLayout = (data) =>
  postHttp("configLayoutRecord/deleteLayout", { data });

/**
 * 根据布局 ID 获取布局详情
 **/
export const getConfigLayoutById = (data) =>
  postHttp("configLayoutRecord/getConfigLayoutById", { data });

/**
 * 获取用户默认布局详情
 **/
export const getUserDefaultLayout = (data) =>
  postHttp("configLayoutRecord/userDefaultConfigLayout", { data });
