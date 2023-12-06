import { createRouter, createWebHistory } from "vue-router";
import menuRoutes from "@/router/menuRoutes";
import infoRoutes from "@/router/infoRoutes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [...menuRoutes, ...infoRoutes],
});

export default router;
