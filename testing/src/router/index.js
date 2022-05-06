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
      path: "/browseCocktails",
      name: "browseCocktails",
      component: () => import("../views/BrowseCocktails.vue"),
    },
    {
      path: "/logInSignUp",
      name: "logIn",
      component: () => import("../views/LoginSignUp.vue")
    },
    {
      path: "/Account",
      name: "Account",
      component: () => import("../views/UserAccount.vue")
    },
    {
      path: "/socialHub",
      name: "socialHub",
      component: () => import("../views/SocialHub.vue")
    },
    {
      path: "/fellowUser",
      name: "fellowUser",
      component: ()=> import("../views/OtherUserAccount.vue")
    },
    {
      path: "/createCocktail",
      name: "createCocktail",
      component: ()=> import("../views/CreateDrink.vue")
    },
    {
      path: "/makeGame",
      name: "makeGame",
      component: ()=> import("../views/MakeGame.vue")
    },
    {
      path: "/test",
      name: "test",
      component: ()=>import("../views/test.vue")
    }
  ],
});

// const app = Vue.createApp({});
// app.use(router);
// app.mount('#test');

export default router;
