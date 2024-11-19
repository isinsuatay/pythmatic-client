<template>
  <div class="question">
    <h3>{{ question }}</h3>
    <p>{{ definition }}</p>
    <p>{{ description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    question: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  emits: ["show-answer"],
  setup(props, { emit }) {
    const emitShowAnswer = () => {
      emit("show-answer");
    };
    return { ...props, emitShowAnswer };
  },
});
</script>

<style scoped>
.question {
  margin-bottom: 20px;
}
</style>
