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
    token: null,
    userInfo: {},
    adcdName: "",
    ticket: "",
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
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
