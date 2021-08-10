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
  // getters: {
  //   getBalance: (state) => {
  //     return state.balance;
  //   },
  // },
  mutations: {
    increaseCurrencyBalanceBTS(state, payload) {
      state.balanceBTS = payload;
    },
    increaseCurrencyBalanceUSD(state, payload) {
      state.balanceUSD = payload;
    },
    increaseCurrencyBalanceDOGE(state, payload) {
      state.balanceDOGE = payload;
    },
    increaseCurrencyBalanceLTC(state, payload) {
      state.balanceLTC = payload;
    },
    increaseCurrencyBalanceSHIB(state, payload) {
      state.balanceSHIB = payload;
    },
    increaseCurrencyBalanceRUR(state, payload) {
      state.balanceRUR = payload;
    },
    increaseCurrencyBalanceBNB(state, payload) {
      state.balanceBNB = payload;
    },
  },
  actions: {
    increaseBalanceBTS({ commit }, val) {
      commit("increaseCurrencyBalanceBTS", val);
    },
    increaseBalanceUSD({ commit }, val) {
      commit("increaseCurrencyBalanceUSD", val);
    },
    increaseBalanceDOGE({ commit }, val) {
      commit("increaseCurrencyBalanceDOGE", val);
    },
    increaseBalanceLTC({ commit }, val) {
      commit("increaseCurrencyBalanceLTC", val);
    },
    increaseBalanceSHIB({ commit }, val) {
      commit("increaseCurrencyBalanceSHIB", val);
    },
    increaseBalanceRUR({ commit }, val) {
      commit("increaseCurrencyBalanceRUR", val);
    },
    increaseBalanceBNB({ commit }, val) {
      commit("increaseCurrencyBalanceBNB", val);
    },
  },
});
