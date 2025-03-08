<template>
  <div class="showInput" @click="() => setVisible!()">
    <img v-if="isVisible" src="../assets/eye.png" />
    <img v-else src="../assets/eyeOff.png" alt="" />
  </div>
</template>
<script setup lang="ts">
defineProps({
  setVisible: Function,
  isVisible: Boolean,
});
</script>
<style>
.showInput {
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.showInput img {
  width: 24px;
  height: 24px;
}
</style>
