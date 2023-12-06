import ACCESS_ENUM from "@/access/accessEnum";

/**
 * 权限校验
 * @param loginUser 当前登录用户
 * @param needAccess 访问页面需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  // 获取当前用户所具有的权限（如果没有loginUser则表示未登录）
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }
  // 用户登录了才能访问
  if (needAccess === ACCESS_ENUM.USER) {
    // 用户未登录就没有权限访问
    if (loginUserAccess !== ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }
  }
  // 用户权限为管理员才能访问
  if (needAccess === ACCESS_ENUM.ADMIN) {
    // 如果不是管理员就没权限访问
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false;
    }
  }
  return true;
};

export default checkAccess;
