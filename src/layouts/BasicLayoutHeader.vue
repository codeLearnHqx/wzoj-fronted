<template>
  <a-row id="menu" align="center">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectKey"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/logo.svg" alt="logo" />
            <span class="title">WZ OJ</span>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ username || "无昵称" }}</div>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import menuRoutes from "@/router/menuRoutes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";

const router = useRouter();
const route = useRoute();
const store = useStore();
const selectKey = ref(["/"]);

// 根据用户权限过滤路由
// 使用计算属性，响应式改变 visibleRoutes
const visibleRoutes = computed(() => {
  return menuRoutes[0]?.children?.filter((route) => {
    if (
      !checkAccess(store.state.user.loginUser, route.meta?.access as string) ||
      route?.meta?.show === false
    ) {
      return false;
    }
    return true;
  });
});

const username = computed(() => {
  return store.state.user.loginUser.userName;
});

// 路由跳转时，高亮选中菜单项
watchEffect(() => {
  selectKey.value = [route.path];
});
// 点击菜单导航事件
const doMenuClick = (key: string) => {
  router.push(key);
};
</script>

<style scoped>
#menu {
}

#menu .title-bar {
  height: 48px;
}

#menu .title-bar .logo {
  width: 40px;
  vertical-align: bottom;
  margin-right: 5px;
}

#menu .title-bar .title {
  color: #4e5969;
  font-weight: 700;
  font-size: 18px;
}
</style>
