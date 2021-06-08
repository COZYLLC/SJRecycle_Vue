import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleLeft,
  faAngleRight,
  faArrowUp,
  faCaretDown,
  faCaretLeft,
  faCaretRight,
  faCaretUp,
  faCog,
  faEdit,
  faInfo,
  faPlus,
  faQuestion,
  faRecycle,
  faSchool,
  faUpload,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import VueMoment from 'vue-moment'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu)
Vue.use(VueMoment)

Vue.directive('touppercase', {
  update(el) {
    const koreanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (koreanCheck.test(el.value)) {
      alert("소문자와 영어만 입력할 수 있습니다.")
      el.value = ''
    }else {
      el.value = el.value.toUpperCase()
    }

  },
})

library.add(faUpload, faInfo, faCog, faUserCircle, faSchool, faRecycle, faEdit, faCaretDown, faCaretUp, faCaretLeft, faCaretRight, faQuestion, faPlus, faArrowUp, faAngleRight, faAngleLeft);
Vue.component("vue-fontawesome", FontAwesomeIcon);
Vue.prototype.$axios = axios;

Vue.use(Buefy, {
  defaultIconComponent: "vue-fontawesome",
  defaultIconPack: "fas",
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
