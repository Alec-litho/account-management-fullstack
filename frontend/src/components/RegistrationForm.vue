<template>
  <form @submit.prevent="handleSubmit" class="authForm">
    <h1 class="formHeader">Вход в ERP-систему</h1>
    <!-- tab number form -->
    <div class="formGroup">
      <label for="tabNumber">Табельный номер</label>
      <input class="passwordInput" type="text" id="tabNumber" v-model="state.tabNumber" placeholder="Введите табельный номер" @input="validateForm" />
      <div v-if="errors.tabNumber" class="error">{{ errors.tabNumber }}</div>
    </div>

    <!-- login form -->
    <div class="formGroup">
      <label for="login">Логин</label>
      <input class="loginInput" type="text" id="login" v-model="state.login" placeholder="Введите логин" @input="validateForm" />
      <div v-if="errors.login" class="error">{{ errors.login }}</div>
    </div>

    <!-- password form -->
    <div class="formGroup">
      <div class="formHeader">
        <label for="password">Пароль</label>
        <ShowPassword :setVisible="setVisible" :isVisible="isVisible" />
      </div>
      <input class="tabNumberInput" type="password" id="password" v-model="state.password" placeholder="Введите пароль" @input="validateForm" ref="password" />
      <div v-if="errors.password" class="error">{{ errors.password }}</div>
    </div>

    <!-- remember checkbox -->
    <div class="formGroup remember">
      <input type="checkbox" @click="handleRememberMe" />
      <p>Запомнить аккаунт</p>
    </div>

    <button type="submit" :class="isValid ? 'loginBtn active' : 'loginBtn'">
      Войти
    </button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref, useTemplateRef } from "vue";
import { useAccountStore } from "@/stores/accountStore";
import router from "@/router";
import ShowPassword from "./ShowPassword.vue";

const state = reactive<FormState>({
  tabNumber: "",
  login: "",
  password: "",
});

const store = useAccountStore();
const isValid = ref(false);
const errors = reactive<FormErrors>({ tabNumber: "", login: "", password: "" });
const passwordInput = useTemplateRef("password");
const isVisible = ref(false);

const validateForm = (): boolean => {
  isValid.value = state.password && state.login && state.tabNumber ? true : false;
  return isValid.value;
};
const handleRememberMe = (event: any) => {
  store.setRemember(event.target.checked);
};

const setVisible = (): void => {
  isVisible.value = !isVisible.value;
  passwordInput.value!.setAttribute(
    "type",
    isVisible.value ? "text" : "password"
  );
};
const showErrors = () => {
  errors.tabNumber = "";
  errors.login = "";
  errors.password = "";
  if (!state.login.trim()) {
    errors.login = "Логин обязателен";
  }
  if (!state.password.trim()) {
    errors.password = "Пароль обязателен";
  }
  if (!state.tabNumber.trim()) {
    errors.tabNumber = "Табельный номер обязателен";
  }
}

const handleSubmit = async () => {
  if (validateForm()) {
    await store.createAccount(state);
    if (store.currentAccount) router.push("/accounts");
  } else {
    showErrors();
  }
};
</script>

<style scoped>
@import url("../assets/reset.css");
@import url("../assets/variables.css");

.authForm {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 460px;
  margin: 20px auto;
  padding: 20px;
}

.formHeader {
  margin-bottom: 5px;
}

.formGroup {
  width: 100%;
}

.formGroup label {
  display: block;
  margin-bottom: 0.5rem;
}

.formHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.loginBtn.active {
  background-color: var(--highlight);
}

.remember {
  display: flex;
  align-items: center;
  margin: 1rem 0;
  color: var(--secondary);
}

.remember input {
  width: 24px;
  height: 24px;
  margin-right: 15px;
}

.error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

label {
  color: var(--secondary);
  font-size: 16px;
}
</style>
