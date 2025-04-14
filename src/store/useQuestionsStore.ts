import { defineStore } from "pinia";
import axios from "axios";

export interface Question {
  id: string;
  question: string;
  definition: string;
  description: string;
}

export interface Answer {
  id?: string;
  answer: string;
}

export const useQuestionsStore = defineStore("questions", {
  state: () => ({
    questions: [] as Question[],
    answers: [] as Answer[],
    selectedQuestionId: null as string | null,
    showAnswer: false,
    copied: false,
  }),

  actions: {
    async fetchAllQuestions() {
      try {
        const { data } = await axios.get(
          "https://pythmatic-backend-nodejs.onrender.com/questions"
        );
        this.questions = data;
      } catch (error) {
        console.error("Error fetching all questions:", error);
      }
    },

    async fetchQuestionById(id: string) {
      try {
        const { data } = await axios.get(
          `https://pythmatic-backend-nodejs.onrender.com/questions/${id}`
        );
        this.questions = [data.question];
        await this.fetchAnswers(id);
      } catch (error) {
        console.error("Error fetching question by id:", error);
      }
    },

    async fetchAnswers(id: string) {
      try {
        const { data } = await axios.get(
          `https://pythmatic-backend-nodejs.onrender.com/questions/${id}/answers`
        );
        this.answers = data.map((item: { answer: string }) => ({
          answer: item.answer,
        }));
        this.selectedQuestionId = id;
        this.showAnswer = true;
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    },

    clearAnswers() {
      this.answers = [];
      this.selectedQuestionId = null;
      this.showAnswer = false;
      this.copied = false;
    },

    markCopied() {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1500);
    },
  },
});
