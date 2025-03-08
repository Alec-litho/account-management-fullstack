<template>
  <div class="homePage">
    <div class="welcome" v-if="store.currentAccount">
      <h1>Welcome!</h1>
      <p class="userData" v-for="(value, key) in store.currentAccount">
        {{ key + " : " + value }}
      </p>
    </div>
    <RouterLink v-else to="/accounts">login or register</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from "@/stores/accountStore";
const store = useAccountStore();
</script>

<style scoped>
@import url("../assets/reset.css");
@import url("../assets/variables.css");

.homePage {
  width: 100%;
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
