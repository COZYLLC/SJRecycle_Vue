import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    grade_classes: ''
  },
  mutations: {
    loginM(state, payload) { 
      console.log(`store got ${payload}`)
      state.grade_classes = payload
      sessionStorage.setItem("grade_class", payload)
    },
    logoutM(state) {
      state.grade_classes = ''
      sessionStorage.setItem("grade_class", '')
    },
  },
  actions: {
    loginA(context, payload){
      context.commit("loginM", payload)
    },
    logoutA(context) {
      context.commit("logoutM");
    },
  },
  getters: {
    getGradeClass() {
      return sessionStorage.getItem("grade_class")
    }
  },
  modules: {},
});
