import { createRouter, createWebHistory, useRouter} from "vue-router";
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
    {
      path: "/logInSignUp",
      name: "logIn",
      component: () => import("../views/LoginSignUp.vue")
    }
  ],
});

// const app = Vue.createApp({});
// app.use(router);
// app.mount('#test');

export default router;
