import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    grade: 0,
    cl: 0,
    token: "",
  },
  mutations: {},
  actions: {
    loginTokenA(context) {
      context.commit("loginTokenM");
    },
    logoutA(context) {
      context.commit("logoutM");
    },
    loginCheckA({ commit, state }) {
      const token = state.token;

      return this.$axios
        .post(
          process.env.VUE_APP_API_URL + `/classes/tokencheck`,
          {},
          {
            //POST 요청을 보내서 토큰에 해당하는 유저데이터 불러와 가공. (created에서 호출 해 유저데이터 갱신)
            headers: {
              "x-access-token": token,
            },
          }
        )
        .then(
          (res) => {
            commit("loginCheckM", {
              grade: res.data.message.uid,
              cl: res.data.message.name,
            });
            return res.data;
          },
          () => {
            commit("loginCheckM", {
              grade: null,
              cl: null,
            });
            return null;
          }
        );
    },
  },
  modules: {},
});
