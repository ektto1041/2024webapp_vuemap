<template>
  <div class="content-wrapper">
    <router-view />
  </div>
  <NavBar />
</template>

<script setup>
import NavBar from './components/NavBar.vue';
</script>

<style lang="scss" scoped>
.content-wrapper {
  height: 100%;
  background-color: #eeeeed;
}
</style>
