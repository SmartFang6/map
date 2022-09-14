import { postHttp } from "@/utils/axios";

// 统计图图层接口
export const getStatisticsList = (data) => {
  //   return [
  //     {
  //       adcd: "330182202",
  //       adnm: "钦堂乡",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182002",
  //       adnm: "嗷嗷嗷嗷嗷嗷",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182001",
  //       adnm: "钦堂乡哈哈哈哈",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182003",
  //       adnm: "钦堂乡而人人人人",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182101",
  //       adnm: "钦堂乡斤斤计较",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182104",
  //       adnm: "钦堂乡",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182105",
  //       adnm: "钦堂乡",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182106",
  //       adnm: "钦堂乡",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182107",
  //       adnm: "钦堂乡",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182109",
  //       adnm: "钦堂乡",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182110",
  //       adnm: "钦堂乡",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //     {
  //       adcd: "330182111",
  //       adnm: "钦堂乡",
  //       allNum: 1,
  //       completedNum: 0,
  //       unCompletedNum: 1,
  //       completedRate: 0,
  //       dueDateNum: 0,
  //     },
  //   ];
  return postHttp("/supervision/getEventStatMapRegionProblemList", { data });
};

// 点位图图层接口
export const getPointList = (data) => {
  //   return [
  //     {
  //       stcd: "1",
  //       lgtd: "120",
  //       lttd: "30",
  //       problemStatus: "1",
  //     },
  //   ];
  return postHttp("/supervision/listEventStatReportProblemNewRecordBySearch", {
    data,
  }); // http://10.33.158.26:8504/api
};
