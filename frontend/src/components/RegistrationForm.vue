<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <h1 class="form-header">Вход в ERP-систему</h1>
    <div class="form-group">
      <label for="tabNumber">Табельный номер</label>
      <input
        type="text"
        id="tabNumber"
        v-model="state.tabNumber"
        placeholder="Введите табельный номер"
        @input="validateForm"
      />
      <div v-if="errors.tabNumber" class="error">{{ errors.tabNumber }}</div>
    </div>

    <div class="form-group">
      <label for="login">Логин</label>
      <input
        type="text"
        id="login"
        v-model="state.login"
        placeholder="Введите логин"
        @input="validateForm"
      />
      <div v-if="errors.login" class="error">{{ errors.login }}</div>
    </div>

    <div class="form-group">
      <label for="password">Пароль</label>
      <input
        type="password"
        id="password"
        v-model="state.password"
        placeholder="Введите пароль"
        @input="validateForm"
      />
      <div v-if="errors.password" class="error">{{ errors.password }}</div>
    </div>

    <div class="form-group remember">
      <input type="checkbox" v-model="state.rememberAccount" />
      <p>Запомнить аккаунт</p>
    </div>

    <button type="submit" :class="isValid ? 'submit-btn.active' : 'submit-btn'">
      Войти
    </button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

interface FormState {
  tabNumber: string;
  login: string;
  password: string;
  rememberAccount: boolean;
}

interface FormErrors {
  tabNumber?: string;
  login?: string;
  password?: string;
}

const state = reactive<FormState>({
  tabNumber: "",
  login: "",
  password: "",
  rememberAccount: false,
});
const isValid = ref(false);
const errors = reactive<FormErrors>({});

const validateForm = (): boolean => {
  isValid.value =
    state.password && state.login && state.tabNumber ? true : false;

  return isValid.value;
};

function showErrors() {
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

const handleSubmit = () => {
  if (validateForm()) {
    console.log("Отправка данных:", {
      tabNumber: state.tabNumber,
      login: state.login,
      password: state.password,
      remember: state.rememberAccount,
    });
  } else {
    showErrors();
  }
};
</script>

<style scoped>
@import url("../assets/reset.css");
@import url("../assets/variables.css");

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 460px;
  margin: 20px auto;
  padding: 20px;
}
.form-header {
  margin-bottom: 5px;
}

.form-group {
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 12px;
  height: 56px;
}
.form-group input[type="text"]::placeholder {
  color: var(--thirdly);
}
.form-group input[type="password"]::placeholder {
  color: var(--thirdly);
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
.submit-btn {
  width: 100%;
  min-height: 56px;
  background-color: var(--btn-non-active);
  color: var(--secondary);
  font-size: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit-btn.active {
  background-color: var(--highlight);
}

.submit-btn.active:hover {
  background-color: #0056b3;
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
