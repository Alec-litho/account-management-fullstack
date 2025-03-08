/* eslint-disable */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import RegistrationForm from "@/components/RegistrationForm.vue";
import AccountManager from "@/components/AccountManager.vue";
import Home from "@/components/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/register",
    name: "registration-form",
    component: RegistrationForm,
  },
  {
    path: "/accounts",
    name: "accounts-manager",
    component: AccountManager,
  },
  {
    path: "/home",
    name: "home-page",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
