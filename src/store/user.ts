// 用户信息模块
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "@/api";

// 存储状态信息
const state = () => ({
  loginUser: {
    userName: "未登录",
  },
});

// 便捷获取数据的方法
const getters = {};

// 可以执行异步操作，调用 mutations 更新状态变量
const actions = {
  /**
   * 获取当前登录用户信息
   * @param commit
   * @param state
   * @param payload
   */
  async getLoginUser({ commit, state }: any, payload: any) {
    // 获取当前登录用户信息
    const loginUser = await UserControllerService.getLoginUserUsingGet();
    if (loginUser?.code === 0) {
      // 成功
      commit("updateUser", loginUser?.data);
    } else {
      // 失败
      commit("updateUser", {
        ...state.loginUser,
        userRole: ACCESS_ENUM.NOT_LOGIN,
      });
    }
  },
};

// 修改状态变量（同步）
const mutations = {
  updateUser(state: any, payload: any) {
    state.loginUser = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
