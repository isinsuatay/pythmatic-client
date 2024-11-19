<template>
  <div class="compiler-view">
    <CodeEditor />
  </div>
</template>

<script setup>
import CodeEditor from "../components/CodeEditor.vue";
</script>

<style scoped>
.compiler-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}
</style>
