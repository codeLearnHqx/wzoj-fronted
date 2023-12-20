<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <layout-header />
      </a-layout-header>
      <a-layout-content class="content">
        <!--      header菜单路由  -->
        <router-view />
      </a-layout-content>
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from "@/layouts/BasicLayoutHeader.vue";
import GlobalFooter from "@/components/footer/GlobalFooter.vue";
</script>
<style scoped>
#basicLayout {
}

#basicLayout .header {
  margin-bottom: 10px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
}
</style>
