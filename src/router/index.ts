import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CompilerView from "@/views/CompilerView.vue";
import QuestionsListView from "@/views/QuestionsListView.vue";
import QuestionsView from "@/views/QuestionsView.vue";
import GamesView from "@/views/GamesView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/compiler", component: CompilerView },
  { path: "/questions", component: QuestionsListView },
  { path: "/questions/:questionId", component: QuestionsView },
  { path: "/games", component: GamesView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
