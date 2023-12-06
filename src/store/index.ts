import { createStore } from "vuex";
import user from "./user";

// 注册模块
export default createStore({
  modules: { user },
});
