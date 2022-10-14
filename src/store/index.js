import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

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
    dateRange: null,
    token: null,
    userInfo: {},
    adcdName: "",
    ticket: "",
    dateObj: {
      endTime: "",
      startTime: "",
    },
    // 当前激活的过滤器
    activeFilter: null,
    layoutConfig: null,
  },
  getters: {},
  mutations: {
    UPDATE_DATE: (state, payload) => {
      if (!payload) return;
      state.dateObj = {
        ...state.dateObj,
        ...payload,
      };
    },
    UPDATE_DATE_RANGE: (state, payload) => {
      if (!payload) return;
      state.dateRange = payload;
    },
    UPDATE_LAYOUT: (state, payload) => {
      if (!payload) return;
      state.layout = {
        ...state.layout,
        ...payload,
      };
    },
    UPDATE_TOKEN(state, payload) {
      state.token = payload;
    },
    UPDATE_USER_INFO(state, payload) {
      state.userInfo = payload;
    },
    UPDATE_ADCD_NAME(state, payload) {
      state.adcdName = payload;
    },
    UPDATE_ADCD_TICKET(state, payload) {
      state.ticket = payload;
    },
    UPDATE_ACTIVE_FILTER(state, payload) {
      state.activeFilter = payload;
    },
    UPDATE_LAYOUT_CONFIG(state, payload) {
      if (!payload) return;
      state.layoutConfig = payload;
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
