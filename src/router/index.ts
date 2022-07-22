import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@view/HomePage/HomePage.vue";
import GamePage from "@view/GamePage/GamePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/game",
    name: "Game",
    component: GamePage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes,
});

export default router;
