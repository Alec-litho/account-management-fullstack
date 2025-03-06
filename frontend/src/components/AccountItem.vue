<template>
  <div class="account">
    <span class="account-name">{{ account.fullName }}</span>
    <span class="account-id">{{ account.employeeId }}</span>
  </div>
  <div class="password-section">
    <label class="password-label">Пароль</label>
    <input
      type="password"
      v-model="currentPassword"
      placeholder="Введите пароль"
      class="password-input"
    />
  </div>
  <button class="login-btn" @click="">Войти</button>
</template>
<script setup lang="ts">
import { ref } from "vue";

defineProps<{ account: ERPAccount }>();
const currentPassword = ref("");
</script>
<style>
.account {
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
</style>
