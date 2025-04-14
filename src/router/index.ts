import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CompilerView from "@/views/CompilerView.vue";
import QuestionsListView from "@/views/QuestionsListView.vue";
import QuestionDetail from "@/views/QuestionDetail.vue";
import GamesView from "@/views/GamesView.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/compiler", name: "Compiler", component: CompilerView },
  { path: "/questions", name: "QuestionsList", component: QuestionsListView },
  {
    path: "/questions/:questionId",
    name: "QuestionDetail",
    component: QuestionDetail,
  },
  { path: "/games", name: "Games", component: GamesView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
