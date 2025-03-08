<template>
  <div
    class="account"
    @click="selectAccount"
    :style="
      isSelected && {
        'border-bottom-left-radius': 0,
        'border-bottom-right-radius': 0,
        'box-shadow': 'none',
      }
    "
  >
    <img src="../assets/account-empty.png" class="accountImg" alt="" />
    <div class="accountDetails">
      <p class="name">{{ account.fullName }}</p>
      <span class="id">{{ account.tabNumber }}</span>
    </div>
  </div>
  <div v-if="isSelected" class="passwordSection">
    <div class="password">
      <div class="passwordHeader">
        <label class="label">Пароль</label>
        <ShowPassword :setVisible="setVisible" :isVisible="isVisible" />
      </div>
      <input
        type="password"
        v-model="currentPassword"
        placeholder="Введите пароль"
        class="passwordInput"
        ref="password"
      />
      <button
        :class="!currentPassword ? 'loginBtn' : 'loginBtn active'"
        @click="handleLogin"
      >
        Войти
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, useTemplateRef } from "vue";
import router from "@/router";
import { useAccountStore } from "@/stores/accountStore";
import ShowPassword from "./ShowPassword.vue";

const props = defineProps<{ account: StoredAccount }>();
const currentPassword = ref("");
const isSelected = ref(false);
const store = useAccountStore();
const isVisible = ref(false);
const passwordInput = useTemplateRef("password");

const selectAccount = (): boolean => (isSelected.value = !isSelected.value);
const handleLogin = async () => {
  if (isSelected.value) {
    await store.login(currentPassword.value, props.account.id);
    router.push("/home");
  }
};
const setVisible = (): void => {
  isVisible.value = !isVisible.value;
  passwordInput.value!.setAttribute(
    "type",
    isVisible.value ? "text" : "password"
  );
};
</script>
<style>
@import url("../assets/global.css");

.account {
  width: 100%;
  height: 90px;
  display: flex;
  gap: 15px;
  padding: 15px 25px;
  align-items: center;
  justify-content: flex-start;
  backdrop-filter: blur(30px);
  background-color: rgba(255, 255, 255, 0.5);
  color: var(--thirdly);
  box-shadow: 0px 0px 15px 0px rgba(21, 68, 150, 0.2);
  border-radius: 20px;
  transition: 0.1s;
}
.account:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
.accountDetails {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name {
  color: rgba(17, 17, 17, 1);
}
.accountImg {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.passwordSection {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  background-color: rgba(255, 255, 255, 0.5);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.password {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-top: 1px solid #4781ee;
  padding: 20px 0;
}

.password label {
  width: 100%;
  color: var(--secondary);
}
.passwordHeader {
  height: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
