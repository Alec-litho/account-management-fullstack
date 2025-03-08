<template>
  <div class="header">
    <div class="buttonContainer">
      <button v-if="router.currentRoute.value.fullPath === '/register'" class="backBtn" @click="handleAction">< Назад </button>
    </div>

    <div class="logoContainer">
      <img src="../assets/logo.png" alt="#" class="logo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";

const handleAction = () => {
  router.push("/accounts");
};
</script>
<style>
@import url("../assets/reset.css");

.header {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
}

.buttonContainer {
  flex: 1;
}

.backBtn {
  width: 120px;
  padding: 14px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
}

.backBtn:hover {
  background-color: rgba(248, 249, 253, 1);
}

.backBtn:active {
  background-color: rgba(236, 243, 255, 1);
  color: rgba(119, 166, 255, 1);
}

.logoContainer {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}
</style>
