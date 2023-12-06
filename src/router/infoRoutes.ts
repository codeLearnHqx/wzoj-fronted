import { RouteRecordRaw } from "vue-router";

/*
  用于权限不足等跳转的页面，不需要在导航菜单中显示的页面
 */
const infoRoute: Array<RouteRecordRaw> = [
  {
    path: "/noAuth",
    name: "无权限页面",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NoAuth.vue"),
  },
];

export default infoRoute;
