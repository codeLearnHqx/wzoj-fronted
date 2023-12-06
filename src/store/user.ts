// 用户信息模块

// 存储状态信息
const state = () => ({
  loginUser: {
    username: "华格纳齐",
  },
});

// 便捷获取数据的方法
const getters = {};

// 可以执行异步操作，调用 mutations 更新状态变量
const actions = {
  getLoginUser({ commit }: any, payload: string) {
    commit("updateUser", { username: payload, role: "admin" });
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
