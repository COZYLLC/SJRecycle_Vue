import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Status from "../views/Status.vue";
import DoRecycle from "../views/DoRecycle.vue";
import Dashboard from "../views/Dashboard/Dashboard.vue";
import Dashboard_Home from "../views/Dashboard/Dashboard_Home.vue";
import Dashboard_Class from "../views/Dashboard/Dashboard_Class.vue";
import Dashboard_DischargeRecord from "../views/Dashboard/Dashboard_DischargeRecord.vue";
import Dashboard_Question from "../views/Dashboard/Dashboard_Question.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/class",
    name: "Status",
    component: Status,
  },
  {
    path: "/dorecycle",
    name: "DoRecycle",
    component: DoRecycle,
  },
  {
    path: "/dashboard",
    name: "DashBoard",
    component: Dashboard,
    children: [
      {
        path: "/dashboard/",
        component: Dashboard_Home,
        meta: {
          isDashboard: true,
        },
      },
      {
        path: "/dashboard/class",
        component: Dashboard_Class,
        meta: {
          isDashboard: true,
        },
      },
      {
        path: "/dashboard/dc_record",
        component: Dashboard_DischargeRecord,
        meta: {
          isDashboard: true,
        },
      },
      {
        path: "/dashboard/question",
        component: Dashboard_Question,
        meta: {
          isDashboard: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
