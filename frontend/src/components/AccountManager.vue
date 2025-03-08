<template>
  <div class="erp-login-container">
    <div class="loginWrapper">
      <img src="../assets/logo.png" alt="#" class="logo" />
      <h3 class="title">Вход в ERP-систему</h3>
      <h1 class="welcomeText">С возвращением!</h1>

      <div class="accountsContainer">
        <div class="addAccount" @click="showFullLogin = true">
          <RouterLink to="/register" class="addAccountBtn"><p>+</p></RouterLink>
          <p>Добавить аккаунт</p>
        </div>

        <div class="accountsScroller">
          <div
            v-for="account in store.getAccounts"
            :key="account.id"
            class="accountItem"
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
import { ref } from "vue";
import AccountItem from "./AccountItem.vue";
import { useAccountStore } from "@/stores/accountStore";

const store = useAccountStore();
store.loadFromLocalStorage();

const selectedAccount = ref<StoredAccount | null>(null);
const showFullLogin = ref(false);
const selectAccount = (account: StoredAccount) => {
  selectedAccount.value = account;
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
  display: flex;
  flex-direction: column;
  gap: 18px;
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
  color: var(--secondary);
  box-shadow: 0px 0px 15px 0px rgba(21, 68, 150, 0.2);
  border-radius: 20px;
  cursor: pointer;
  transition: 0.2s;
}
.addAccount:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
.addAccountBtn {
  position: relative;
  width: 60px;
  height: 60px;
  background-color: white;
  color: var(--secondary);
  border-radius: 50%;
  font-size: 40px;
}

.addAccountBtn p {
  position: absolute;
  left: 30%;
  bottom: 15%;
}

.accountsScroller {
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  overflow-y: auto;
}
.accountsScroller::-webkit-scrollbar {
  display: none;
}

.accountItem {
  width: 100%;
  cursor: pointer;
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
</style>
