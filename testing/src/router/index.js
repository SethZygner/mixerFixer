import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/randomCocktails",
      name: "randomCocktails",
      component: () => import("../views/RandomCocktails.vue"),
    },
    {
      path: "/browseCocktails",
      name: "browseCocktails",
      component: () => import("../views/BrowseCocktails.vue"),
    },
  ],
});

export default router;
