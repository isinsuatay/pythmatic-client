<template>
  <div class="all-questions-container">
    <h2>ALL QUESTIONS</h2>
    <ul class="question-list">
      <li
        v-for="question in questionsStore.questions"
        :key="question.id"
        class="question-item"
      >
        <router-link :to="`/questions/${question.id}`">
          {{ question.question }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useQuestionsStore } from "@/store/useQuestionsStore";

export default {
  name: "QuestionsListView",
  setup() {
    const questionsStore = useQuestionsStore();

    onMounted(async () => {
      await questionsStore.fetchAllQuestions();
    });

    return {
      questionsStore,
    };
  },
};
</script>
