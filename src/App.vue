<template id="app">
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";

// 全局初始化函数，全局单次调用
const doInit = () => {
  console.log("hello");
};

onMounted(() => {
  doInit();
});
</script>

<style>
#app {
}
</style>
