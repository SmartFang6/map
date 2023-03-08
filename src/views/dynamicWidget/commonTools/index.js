// export default [
//   {
//     widgetCode: "EventStatistics",
//     name: "事件统计",
//     poster: require("@/views/dynamicWidget/config/previewImg/eventStatistics.png"),
//     getDataUri: "", // 接口地址
//     domainName: "", // TODO: 域名(暂时没使用)
//     port: "", // TODO: 端口(暂时没使用)
//     size: {
//       // TODO: 组件大小(暂时没使用)
//       row: null,
//       col: null,
//     },
//   },
//   {
//     widgetCode: "ProblemSource",
//     name: "事件来源",
//     poster: require("@/views/dynamicWidget/config/previewImg/problemSource.png"),
//     getDataUri: "",
//     domainName: "", // TODO: 域名(暂时没使用)
//     port: "", // TODO: 端口(暂时没使用)
//     size: {
//       // TODO: 组件大小(暂时没使用)
//       row: null,
//       col: null,
//     },
//   },
//   {
//     widgetCode: "DetermineTheNature",
//     name: "事件定性",
//     poster: require("@/views/dynamicWidget/config/previewImg/determineTheNature.png"),
//     getDataUri: "",
//     domainName: "", // TODO: 域名(暂时没使用)
//     port: "", // TODO: 端口(暂时没使用)
//     size: {
//       // TODO: 组件大小(暂时没使用)
//       row: null,
//       col: null,
//     },
//   },
//   {
//     widgetCode: "DetermineTheAccountability",
//     name: "事件派发",
//     poster: require("@/views/dynamicWidget/config/previewImg/determineTheAccountability.png"),
//     getDataUri: "",
//     domainName: "", // TODO: 域名(暂时没使用)
//     port: "", // TODO: 端口(暂时没使用)
//   },
//   {
//     widgetCode: "TrendAnalysis",
//     name: "趋势分析",
//     poster: require("@/views/dynamicWidget/config/previewImg/trendAnalysis.png"),
//     getDataUri: "",
//     domainName: "", // TODO: 域名(暂时没使用)
//     port: "", // TODO: 端口(暂时没使用)
//     size: {
//       // TODO: 组件大小(暂时没使用)
//       row: null,
//       col: null,
//     },
//   },
//   {
//     widgetCode: "Performance",
//     name: "处理绩效",
//     poster: require("@/views/dynamicWidget/config/previewImg/performance.png"),
//     getDataUri: "",
//     domainName: "", // TODO: 域名(暂时没使用)
//     port: "", // TODO: 端口(暂时没使用)
//     size: {
//       // TODO: 组件大小(暂时没使用)
//       row: null,
//       col: null,
//     },
//   },
//   {
//     widgetCode: "PoliciesSystems",
//     name: "政策制度",
//     poster: require("@/views/dynamicWidget/config/previewImg/policiesSystems.png"),
//     getDataUri: "",
//     domainName: "", // TODO: 域名(暂时没使用)
//     port: "", // TODO: 端口(暂时没使用)
//     size: {
//       // TODO: 组件大小(暂时没使用)
//       row: null,
//       col: null,
//     },
//   },
// ];
/**
 * 根据接口结果，返回前端布局描述对象
 * */
function createSide(config) {
  // config side 详情
  let sideInfo = {
    id: config?.id,
    widgets: [],
  };
  if (!config) return;
  sideInfo.widgets =
    config?.componentRecordVOList?.map((item) => ({
      title: item?.title,
      componentInfoId: item?.componentInfoId,
      widgetCode:
        item?.configComponentInfo?.componentCode || item?.componentInfoId,
      poster: item?.configComponentInfo?.poster,
      name: item?.configComponentInfo?.componentName,
      // TODO: 其他参数暂时不用
    })) || [];
  return sideInfo;
}
export function buildUserLayout(requestData) {
  let layoutInfo = { left: [], right: [], layoutName: "" };
  if (!requestData) return layoutInfo;
  Object.keys(layoutInfo).forEach((item) => {
    if (
      requestData?.[`${item}LayoutRecordVOList`] &&
      requestData?.[`${item}LayoutRecordVOList`]?.length
    ) {
      layoutInfo[item] =
        requestData?.[`${item}LayoutRecordVOList`]?.map((item) =>
          createSide(item)
        ) || [];
    }
  });
  layoutInfo.id = requestData?.id;
  layoutInfo.layoutName = requestData?.layoutName;
  return layoutInfo;
}
/**
 * 根据配置结果，生产接口入参（布局描述对象）
 * */
function createLayoutRecordVO(config) {
  // config side 详情
  let sideInfo = {
    componentRecordVOList: [],
  };
  if (!config) return;
  sideInfo.componentRecordVOList =
    config?.widgets?.map((item) => ({
      componentInfoId: item?.componentInfoId,
      title: item?.title,
      // TODO: 其他参数暂时不用
    })) || [];
  return sideInfo;
}

export function buildParamsLayout(requestData) {
  let layoutInfo = {
    rightLayoutRecordVOList: [],
    leftLayoutRecordVOList: [],
    layoutName: "",
  };
  if (!requestData) return layoutInfo;
  const keys = ["left", "right"];
  keys.forEach((item) => {
    if (requestData?.[item] && requestData?.[item]?.length) {
      layoutInfo[`${item}LayoutRecordVOList`] =
        requestData?.[item]?.map((item) => createLayoutRecordVO(item)) || [];
    }
  });
  if (requestData?.id) {
    layoutInfo.id = requestData?.id;
  }
  layoutInfo.layoutName = requestData?.layoutName;
  return layoutInfo;
}
