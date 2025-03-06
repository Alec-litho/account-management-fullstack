/* eslint-disable */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import RegistrationForm from "@/components/RegistrationForm.vue";
import AccountManager from "@/components/AccountManager.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "registration-form",
    component: AccountManager,
  },
  {
    path: "/accounts",
    name: "accounts-manager",
    component: AccountManager,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
