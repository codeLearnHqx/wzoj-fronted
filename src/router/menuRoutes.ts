import { RouteRecordRaw } from "vue-router";
import ACCESS_ENUM from "@/access/accessEnum";
/*
  定义导航菜单需要显示的页面
 */
const menuRoutes: Array<RouteRecordRaw> = [
  {
    path: "/main",
    component: () => import("@/layouts/BasicLayout.vue"),
    redirect: "/main/home",
    children: [
      {
        path: "/main/home",
        name: "浏览题目",
        component: () => import("../views/HomeView.vue"),
      },
      {
        path: "/main/about",
        name: "管理员可见",
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
      },
      {
        path: "/main/question/add",
        name: "创建题目",
        component: () => import("../views/question/QuestionAddView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
      {
        path: "/main/question/update",
        name: "更新题目",
        component: () => import("../views/question/QuestionAddView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
          show: false,
        },
      },
      {
        path: "/main/question/manager",
        name: "管理题目",
        component: () => import("../views/question/QuestionManagerView.vue"),
        meta: {
          access: ACCESS_ENUM.ADMIN,
        },
      },
    ],
  },
];

export default menuRoutes;
