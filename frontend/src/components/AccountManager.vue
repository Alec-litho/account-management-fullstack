<template>
  <div class="erp-login-container">
    <div class="loginWrapper">
      <img src="../assets/logo.png" alt="#" class="logo" />
      <h3 class="title">Вход в ERP-систему</h3>
      <h1 class="welcomeText">С возвращением!</h1>

      <div class="accountsContainer">
        <div class="addAccount" @click="showFullLogin = true">
          <button class="addAccountBtn">+</button>
          <p>Добавить аккаунт</p>
        </div>

        <div class="accounts-scroller">
          <div
            v-for="account in savedAccounts"
            :key="account.id"
            class="account-item"
            @click="selectAccount(account)"
          >
            <AccountItem :account="account" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import AccountItem from "./AccountItem.vue";

const savedAccounts = ref<ERPAccount[]>([]);
const selectedAccount = ref<ERPAccount | null>(null);
const showFullLogin = ref(false);

const newAccount = ref({
  employeeId: "",
  login: "",
  password: "",
  remember: false,
});

// Загрузка сохраненных аккаунтов
onMounted(() => {
  const storedAccounts = localStorage.getItem("erpAccounts");
  if (storedAccounts) {
    savedAccounts.value = JSON.parse(storedAccounts);
  }
});

const selectAccount = (account: ERPAccount) => {
  selectedAccount.value = account;
};

const handleFullLogin = () => {
  if (
    !newAccount.value.employeeId ||
    !newAccount.value.login ||
    !newAccount.value.password
  ) {
    alert("Заполните все поля");
    return;
  }

  const account: ERPAccount = {
    id: Date.now().toString(),
    fullName: "Иванова И.И.", // Пример, должно быть из системы
    employeeId: newAccount.value.employeeId,
    login: newAccount.value.login,
  };

  if (newAccount.value.remember) {
    savedAccounts.value = [account, ...savedAccounts.value];
    localStorage.setItem("erpAccounts", JSON.stringify(savedAccounts.value));
  }

  // Сброс полей
  newAccount.value = {
    employeeId: "",
    login: "",
    password: "",
    remember: false,
  };
  showFullLogin.value = false;
};
</script>

<style scoped>
@import url("../assets/reset.css");
@import url("../assets/variables.css");

.erp-login-container {
  width: 725px;
  height: 835px;
  display: flex;
  justify-content: center;
  margin: 40px auto;
  background: linear-gradient(
    213.61deg,
    #a1c2ff 3.13%,
    #75a3fb 46.43%,
    #4781ee 92.74%
  );
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.loginWrapper {
  width: 470px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 50px 0;
}
.logo {
  margin: 0 auto;
}
.title {
  color: var(--primary-w);
  margin-bottom: 6px;
  text-align: center;
  font-size: 24px;
}

.welcomeText {
  color: var(--primary-w);
  text-align: center;
  margin-bottom: 32px;
  font-size: 40px;
  font-weight: 600;
}

.accountsContainer {
  width: 100%;
}

.addAccount {
  width: 100%;
  height: 90px;
  display: flex;
  gap: 15px;
  padding: 0 25px;
  align-items: center;
  justify-content: flex-start;
  backdrop-filter: blur(30px);
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0px 15px 0px rgba(21, 68, 150, 0.2);
  border-radius: 20px;
}
.addAccountBtn {
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  font-size: 40px;
}

.add-account-btn:hover {
  background: #f8f9fa;
}

.accounts-scroller {
  max-height: 300px;
  overflow-y: auto;
}

.account-item {
  padding: 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.account-item:hover {
  background: #f8f9fa;
}

.account-details {
  display: flex;
  flex-direction: column;
}

.account-name {
  font-weight: 500;
  color: #2c3e50;
}

.account-id {
  color: #95a5a6;
  font-size: 0.9em;
}

.password-section {
  margin: 24px 0;
}

.password-label {
  display: block;
  margin-bottom: 8px;
  color: #2c3e50;
}

.password-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.input-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.remember-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 20px 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.login-btn {
  flex: 1;
  padding: 14px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #2980b9;
}

.back-btn {
  flex: 1;
  padding: 14px;
  background: #95a5a6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.back-btn:hover {
  background: #7f8c8d;
}
</style>
