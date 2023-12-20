<template>
  <div class="home">
    <MdEditor :value="mdValue" :handle-change="onMdChange" />
    <CodeEditor :value="codeValue" :handle-change="onCodeChange" />
  </div>
</template>

<script setup lang="ts">
import MdEditor from "@/components/mdeditor/MdEditor.vue";
import { ref } from "vue";
import CodeEditor from "@/components/codeeditor/CodeEditor.vue";

const mdValue = ref();
const onMdChange = (v: string) => {
  mdValue.value = v;
  console.log(v);
};

const codeValue = ref();
const onCodeChange = (v: string) => {
  codeValue.value = v;
  console.log(v);
};
</script>
<style scoped>
.home {
}
</style>
