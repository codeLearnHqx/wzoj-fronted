import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/global.css";
// 引入配置好的拦截器的axios（api也是基于axios生成的）
import "@/plugins/axios";
// 引入全局的权限校验
import "@/access/index";

import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";

createApp(App).use(store).use(router).use(ArcoVue).mount("#app");

// 在vue.config.js中关闭了webpack的页面爆红错误警告（用于屏蔽 arco design组件库的bug），在这里通过控制台显示错误
window.onerror = function (message, source, lineno, colno, error) {
  console.log("捕获到异常：", { message, source, lineno, colno, error });
};
