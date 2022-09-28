import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/ssoLogin",
    name: "ssoLogin",
    component: () => import("@/views/ssoLogin.vue"),
  },
  {
    path: "/waterSsoLogin",
    name: "waterSsoLogin",
    component: () => import("@/views/waterSsoLogin.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/test.vue"),
  },
  {
    path: "/401",
    name: "401",
    meta: {
      title: "401...",
    },
    component: () => import("@/views/401"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
