<template>
  <div style="min-height: 400px" id="code-editor" ref="codeEditorRef" />
</template>
<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw, withDefaults, defineProps } from "vue";

const codeEditorRef = ref(); // 用于获取dom对象
const codeEditor = ref();
const value = ref("hello world");

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  handleChange: (v: string) => void;
}

// 组件状态由父组件传入
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value, // 传入的代码内容
    language: "javascript",
    automaticLayout: true,
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
    colorDecorators: true, // 颜色装饰器
    readOnly: false,
    theme: "vs-dark",
    minimap: {
      // 小地图开启
      enabled: true,
      scale: 100,
      size: "fit",
    },
    fontSize: 20,
  });
  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>
<style scoped></style>
