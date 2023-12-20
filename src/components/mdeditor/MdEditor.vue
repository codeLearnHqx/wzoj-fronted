<template>
  <Editor
    style="z-index: 10; width: 100%"
    :value="value"
    :mode="mode"
    :plugins="plugins"
    @change="handleChange"
  />
</template>
<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import { Editor, Viewer } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  mode: "split" | "tab" | "auto";
  handleChange: (v: string) => void;
}

// 注册组件
const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];

// 组件状态由父组件传入
withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>
<style>
/*隐藏不需要的按钮图标*/
.bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
  display: none !important;
}
</style>
