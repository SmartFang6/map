import { createStore } from "vuex";

export default createStore({
  state: {
    /**
     * left: 左侧视图
     * right: 右侧视图
     * bottom: 底部视图
     * **/
    layout: {
      left: "open",
      right: "open",
      bottom: "open",
    },
    /**
     * 驾驶舱查看的事件选项
     * startTime: 开始时间
     * endTime: 结束时间
     */
    searchTime: {
      startTime: "",
      endTime: "",
    },
  },
  getters: {},
  mutations: {
    UPDATE_LAYOUT: (state, payload) => {
      if (!payload) return;
      state.layout = {
        ...state.layout,
        ...payload,
      };
    },

    // 更新查询的时间参数
    UPDATE_SEARCH_TIME: (state, timer) => {
      if (!timer) return;
      state.searchTime = timer;
    },
  },
  actions: {},
  modules: {},
});
