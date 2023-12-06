<template id="app">
  <BasicLayout />
</template>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import router from "@/router";
import { useStore } from "vuex";

// 页面跳转时进行权限校验
const store = useStore();
router.beforeEach((to, from, next) => {
  if (to.meta?.access === "canAdmin") {
    if (store.state?.user?.loginUser?.role !== "admin") {
      // 跳转到无权限页
      next("/noAuth");
      return;
    }
  }
  next();
});
</script>

<style>
#app {
}
</style>
