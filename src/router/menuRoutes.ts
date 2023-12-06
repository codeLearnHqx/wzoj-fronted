import { RouteRecordRaw } from "vue-router";
/*
  定义导航菜单需要显示的页面
 */
const menuRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "浏览题目",
    component: () => import("../views/HelloHome.vue"),
  },
  {
    path: "/about",
    name: "关于我的",
    meta: {
      access: "canAdmin",
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/HelloAbout.vue"),
  },
];

export default menuRoutes;
