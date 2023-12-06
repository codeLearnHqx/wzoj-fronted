import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import menuRoutes from "@/router/menuRoutes";
import infoRoutes from "@/router/infoRoutes";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/user/login",
    name: "登录",
    component: () => import("@/views/user/UserLogin.vue"),
  },
  {
    path: "/user/register",
    name: "注册",
    component: () => import("@/views/user/UserRegister.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...routes, ...menuRoutes, ...infoRoutes],
});

export default router;
