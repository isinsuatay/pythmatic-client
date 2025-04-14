<template>
  <div>
    <p>{{ answer }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainAnswer",
  props: {
    answer: {
      type: String,
      required: true,
    },
  },
});
</script>
