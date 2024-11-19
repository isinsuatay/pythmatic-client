<template>
  <div class="all-questions-container">
    <h2>ALL QUESTIONS</h2>
    <ul class="question-list">
      <li
        v-for="question in questions"
        :key="question._id"
        class="question-item"
      >
        <router-link :to="`/questions/${question._id}`">{{
          question.question
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "AllQuestionsPage",
  setup() {
    const questions = ref([]);

    const fetchAllQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/questions");
        questions.value = response.data.sort(() => Math.random() - 0.5);
      } catch (error) {
        console.error("Error fetching all questions:", error);
      }
    };

    onMounted(() => {
      fetchAllQuestions();
    });

    return {
      questions,
    };
  },
};
</script>

<style scoped>
.all-questions-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  margin-bottom: 100px;
}

.question-list {
  width: 80%;
  list-style: none;
  padding: 0;
}

.question-item {
  width: 100%;
  padding: 1rem;
  margin: 0.5rem 0;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  font-size: 1.2rem;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.question-item a {
  color: inherit;
  text-decoration: none;
}

.question-item a:hover {
  text-decoration: underline;
}
</style>
