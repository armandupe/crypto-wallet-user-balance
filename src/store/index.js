import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currencyBalance: 0,
  },
  getters: {
    getBalance: (state) => {
      return state.currencyBalance;
    },
  },
  mutations: {
    increaseCurrencyBalance(state, payload) {
      state.currencyBalance += payload;
    },
  },
  actions: {
    increaseBalance({ commit }, val) {
      commit("increaseCurrencyBalance", val);
    },
  },
  modules: {},
});
