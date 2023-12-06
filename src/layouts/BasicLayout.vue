<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <header-menu />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Oj判题系统 by 稳住心态</a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import headerMenu from "@/layouts/BasicLayoutHeader.vue";
</script>
<style scoped>
#basicLayout {
  margin-bottom: 16px;
}

#basicLayout .header {
  margin-bottom: 10px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  background: linear-gradient(to right, #bbb, #fff);
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  text-align: center;
}
</style>
