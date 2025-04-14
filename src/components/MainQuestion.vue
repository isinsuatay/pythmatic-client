<template>
  <div class="question">
    <h3>{{ question.question }}</h3>
    <p>{{ question.definition }}</p>
    <p>{{ question.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    question: {
      type: Object as () => {
        id: string;
        question: string;
        definition: string;
        description: string;
      },
      required: true,
    },
  },
});
</script>

<style scoped>
.question {
  margin-bottom: 20px;
}
</style>
