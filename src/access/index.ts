import router from "@/router";
import ACCESS_ENUM from "@/access/accessEnum";
import store from "@/store";
import checkAccess from "@/access/checkAccess";

/**
 * 通过前置路由守卫实现全局的权限校验（在main.ts中引入）
 */
router.beforeEach(async (to, from, next) => {
  const user = store.state?.user;
  const loginUser = user.loginUser;
  // 自动获取登录用户信息
  if (!loginUser || !loginUser?.userRole) {
    // 获取用户信息，使用await可以等获取用户信息后在执行后续逻辑
    await store.dispatch("user/getLoginUser");
  }

  const needAccess = (to.meta?.access ?? ACCESS_ENUM.NOT_LOGIN) as string;
  // 要跳转的页面需要登录，此时用户还是未登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    if (!loginUser || !loginUser?.userRole) {
      // 用户未登录就跳转到登录页面
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    if (!checkAccess(loginUser, needAccess)) {
      // 如果已经登录了，但是权限不足，需要跳转到无权限页面
      next("/noAuth");
      return;
    }
  }
  next();
});
