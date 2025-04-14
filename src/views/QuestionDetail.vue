<template>
  <button class="back-button" @click="goBack">
    <i class="fas fa-arrow-left"></i> Go Back
  </button>
  <div class="question-answer-container">
    <div v-if="paginatedQuestion" class="question-container">
      <Question :key="paginatedQuestion.id" :question="paginatedQuestion" />
      <button
        class="show-answer-button"
        @click="handleShowAnswer(paginatedQuestion.id)"
      >
        <i class="fas fa-eye"></i>
        <span class="hover-text">Show Answer</span>
      </button>
    </div>

    <div class="code-editor-wrapper">
      <CodeEditor />
    </div>

    <div
      v-if="questionsStore.showAnswer && questionsStore.answers.length > 0"
      ref="answersRef"
      class="answer-container"
    >
      <button class="questions-close-button" @click="closeAnswerSection">
        <i class="fas fa-times"></i>
      </button>
      <div
        v-for="(answer, index) in questionsStore.answers"
        :key="index"
        class="code-block-container"
      >
        <button class="copy-button" @click="copyToClipboard(answer.answer)">
          {{ questionsStore.copied ? "Copied!" : "Copy" }}
        </button>
        <SyntaxHighlighter :language="'python'" class="code-block">
          {{ answer.answer }}
        </SyntaxHighlighter>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { onMounted, ref, computed, nextTick, watch } from "vue";
import { useQuestionsStore } from "@/store/useQuestionsStore";
import Question from "@/components/MainQuestion.vue";
import CodeEditor from "@/components/CodeEditor.vue";

export default {
  components: {
    Question,
    CodeEditor,
  },
  setup() {
    const answersRef = ref<HTMLElement | null>(null);
    const questionsStore = useQuestionsStore();
    const route = useRoute();
    const router = useRouter();
    const goBack = () => {
      router.back();
    };

    const routeId = computed(() => route.params.id?.toString() || "");

    const paginatedQuestion = computed(() => {
      if (routeId.value) {
        return questionsStore.questions.find(
          (q) => q.id.toString() === routeId.value
        );
      }
      return questionsStore.questions[0];
    });

    const fetchQuestions = async () => {
      if (questionsStore.questions.length === 0) {
        await questionsStore.fetchAllQuestions();
      }

      if (routeId.value) {
        const found = questionsStore.questions.find(
          (q) => q.id === routeId.value
        );
        if (!found) {
          await questionsStore.fetchQuestionById(routeId.value);
        }
      }
    };

    onMounted(async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      questionsStore.clearAnswers();
      await fetchQuestions();
    });

    watch(
      () => routeId.value,
      async (id) => {
        if (!id) return;
        questionsStore.clearAnswers();

        if (questionsStore.questions.length === 0) {
          await questionsStore.fetchAllQuestions();
        }
      },
      { immediate: true }
    );

    const handleShowAnswer = async (id: string) => {
      if (!id) return;
      await questionsStore.fetchAnswers(id);
      await nextTick();
      answersRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const copyToClipboard = (answer: string) => {
      navigator.clipboard
        .writeText(answer)
        .then(() => questionsStore.markCopied())
        .catch((err) => {
          console.error("Kopyalama hatası:", err);
        });
    };

    const closeAnswerSection = () => {
      questionsStore.clearAnswers();
    };

    return {
      questionsStore,
      handleShowAnswer,
      copyToClipboard,
      closeAnswerSection,
      answersRef,
      paginatedQuestion,
      goBack,
    };
  },
};
</script>
