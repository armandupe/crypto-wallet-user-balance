import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    balanceBTS: 0,
    balanceUSD: 0,
    balanceDOGE: 0,
    balanceLTC: 0,
    balanceSHIB: 0,
    balanceRUR: 0,
    balanceBNB: 0,
  },
  getters: {
    getAllBalances: (state) => {
      return state;
    },
  },
  mutations: {
    increaseCurrencyBalance(state, payload) {
      state.balanceBTS = payload.BTS;
      state.balanceUSD = payload.USD;
      state.balanceDOGE = payload.DOGE;
      state.balanceLTC = payload.LTC;
      state.balanceSHIB = payload.SHIB;
      state.balanceRUR = payload.RUR;
      state.balanceBNB = payload.BNB;
    },
  },
  actions: {
    increaseBalance({ commit }, val) {
      commit("increaseCurrencyBalance", val);
    },
  },
});
