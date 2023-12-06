<template>
  <a-row id="menu" style="margin-bottom: 16px" align="center">
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
        <a-menu-item v-for="item in menuRoutes" :key="item.path"
          >{{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user.loginUser.username }}</div>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import menuRoutes from "@/router/menuRoutes";
import { useRoute, useRouter } from "vue-router";
import { ref, watchEffect } from "vue";
import { useStore } from "vuex";

const router = useRouter();
const route = useRoute();
const selectKey = ref(["/"]);
// 路由跳转时，高亮选中菜单项
watchEffect(() => {
  selectKey.value = [route.path];
});
// 点击菜单导航事件
const doMenuClick = (key: string) => {
  router.push(key);
};

/* 测试 vuex */
const store = useStore();
console.log(store.state.user.loginUser);
setTimeout(() => {
  // 修改vuex 中的用户状态信息
  store.dispatch("user/getLoginUser", "花姑娘");
}, 5000);
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
