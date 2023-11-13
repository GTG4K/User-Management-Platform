<script setup lang="ts">
import {RouterView} from "vue-router"
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <main class="min-h-[100vh] overflow-x-hidden bg-gray-black pt-[5rem]">
    <HeaderComponent/>
    <RouterView/>
  </main>
</template>

<style scoped>

</style>
