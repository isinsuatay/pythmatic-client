<template>
  <div class="question-answer-container">
    <div
      v-for="(question, index) in questions"
      :key="index"
      class="question-container"
    >
      <Question
        :question="question.question"
        :definition="question.definition"
        :description="question.description"
        @show-answer="handleShowAnswer(question._id)"
      />
      <!-- Show answer button -->
      <button
        class="show-answer-button"
        @click="handleShowAnswer(question._id)"
      >
        <i class="fas fa-eye"></i>
        <span class="hover-text">Show Answer</span>
      </button>
    </div>

    <!-- Code editor component -->
    <CodeEditor ref="codeEditorRef" />

    <!-- Answers container -->
    <div
      v-if="showAnswer && selectedQuestionId && answers.length > 0"
      ref="answersRef"
      class="answer-container"
    >
      <!-- Close button -->
      <button class="close-button" @click="closeAnswerSection">
        <i class="fas fa-times"></i>
      </button>
      <div
        v-for="(answer, index) in answers"
        :key="index"
        class="code-block-container"
      >
        <!-- Copy to clipboard button -->
        <button class="copy-button" @click="copyToClipboard(answer)">
          {{ copied ? "Copied!" : "Copy" }}
        </button>
        <!-- Syntax highlighter for code -->
        <SyntaxHighlighter :language="'python'" class="code-block">
          {{ answer }}
        </SyntaxHighlighter>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { nextTick } from "vue";
import Question from "../components/MainQuestion.vue";
import CodeEditor from "../components/CodeEditor.vue";

export default {
  components: { Question, CodeEditor },
  setup() {
    const route = useRoute();
    const questions = ref([]);
    const selectedQuestionId = ref(null);
    const answers = ref([]);
    const showAnswer = ref(false);
    const copied = ref(false);
    const codeEditorRef = ref(null);
    const answersRef = ref(null);

    // Fetch data when component is mounted
    onMounted(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
      fetchCategoryData(); // Load questions data
    });

    // Fetch category data
    const fetchCategoryData = async () => {
      const { categoryId, questionId } = route.params;
      if (categoryId) {
        try {
          const { data } = await axios.get(
            `http://localhost:8000/categories/${categoryId}/questions`
          );
          questions.value = data;
          if (questionId) fetchQuestionById(questionId); // If specific question ID is provided
        } catch (error) {
          console.error("Error fetching category data:", error);
        }
      } else if (questionId) {
        fetchQuestionById(questionId); // Fetch question by ID
      }
    };

    // Fetch specific question by ID
    const fetchQuestionById = async (questionId) => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/questions/${questionId}`
        );
        questions.value = [data.question];
        fetchAnswers(questionId); // Fetch answers for the question
      } catch (error) {
        console.error("Error fetching question by id:", error);
      }
    };

    // Fetch answers for a specific question
    const fetchAnswers = async (questionId) => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/questions/${questionId}/answers`
        );
        answers.value = data.map((item) => item.answer); // Map answers
        selectedQuestionId.value = questionId; // Update selected question ID
      } catch (error) {
        console.error("Error fetching or processing answers:", error);
      }
    };

    // Handle "Show Answer" button click
    const handleShowAnswer = async (questionId) => {
      await fetchAnswers(questionId); // Fetch answers for the question
      showAnswer.value = true;
      selectedQuestionId.value = questionId; // Update selected question ID

      // Wait for DOM update and scroll to answers section
      await nextTick();
      if (answersRef.value) {
        answersRef.value.scrollIntoView({
          behavior: "smooth",
          block: "start", // Align to the top of the container
        });
      }
    };

    // Copy code block to clipboard
    const copyToClipboard = (answer) => {
      navigator.clipboard.writeText(answer).then(() => {
        copied.value = true;
      });
    };

    // Close answer section
    const closeAnswerSection = () => {
      showAnswer.value = false;
      selectedQuestionId.value = null;
      answers.value = [];
      copied.value = false;
    };

    return {
      questions,
      selectedQuestionId,
      answers,
      showAnswer,
      copied,
      codeEditorRef,
      answersRef,
      handleShowAnswer,
      copyToClipboard,
      closeAnswerSection,
    };
  },
};
</script>

<style scoped>
.question-answer-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 50px;
  box-sizing: border-box;
}

.question-container {
  width: 70vw;
  height: 30vh;
  margin-top: 100px;
  padding: 1rem;
  box-sizing: border-box;
  position: relative;
}

.answer-container {
  position: relative;
  width: 70vw;
  max-height: 50vh;
  overflow-y: auto;
  margin: 20px 0;
  padding: 1rem;
  background-color: #282c34;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  color: #ffffff;
}

.show-answer-button {
  position: absolute;
  right: 10px;
  width: 120px;
  height: 40px;
  transform: translateY(-50%);
  padding: 10px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  background-color: transparent;
  background-color: rgba(255, 255, 255, 0.1);
}

.show-answer-button i {
  font-size: 16px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.show-answer-button .hover-text {
  font-size: 14px;
  opacity: 0;
  transform: translateY(10px);
  transition: transform 0.3s ease, opacity 0.3s ease;
  position: absolute;
}

.show-answer-button:hover i {
  transform: translateY(-10px);
  opacity: 0;
}

.show-answer-button:hover .hover-text {
  opacity: 1;
  transform: translateY(0);
}

.code-block-container {
  position: relative;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 5px;
  margin: 1.2rem;
  border: 1px solid #444;
  overflow-y: scroll;
  overflow-x: hidden;
}

.code-block {
  font-family: "Fira Code", monospace;
  font-size: 14px;
  white-space: pre;
  padding: 0;
}

.copy-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.copy-button:hover {
  background: transparent;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 5px;
  background-color: transparent;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  padding: 10px;
}

.close-button i {
  font-size: 16px;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .question-container {
    width: 90vw;
    height: auto;
    margin-top: 50px;
  }

  .show-answer-button {
    width: 100px;
    height: 35px;
  }

  .answer-container {
    width: 90vw;
    max-height: 60vh;
  }

  .code-block-container {
    width: 100%;
    margin: 10px 0;
  }

  .copy-button {
    top: 5px;
    right: 5px;
  }

  .close-button {
    top: -1px;
    right: 0;
    font-size: 14px;
  }

  .code-block {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .question-container {
    width: 100vw;
    margin-top: 20px;
    height: auto;
  }

  .show-answer-button {
    width: 80px;
    height: 30px;
    font-size: 14px;
  }

  .answer-container {
    width: 100vw;
    max-height: 50vh;
  }

  .code-block-container {
    width: 100%;
    margin: 5px 0;
  }

  .code-block {
    font-size: 10px;
  }

  .copy-button {
    top: 5px;
    right: 5px;
    font-size: 12px;
  }

  .close-button {
    top: -2px;
    right: 3px;
    font-size: 14px;
  }
}
</style>
