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
  },
  actions: {},
  modules: {},
});
