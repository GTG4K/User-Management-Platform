<script setup lang="ts">
import {RouterView} from "vue-router"
import HeaderComponent from "./components/HeaderComponent.vue";
import AddUserDialog from "./components/AddUserDialog.vue";
import {ref} from "vue";

const addUserIsActive = ref<boolean>(false);

const toggleAddUserDialog = (): void => {
  addUserIsActive.value = !addUserIsActive.value
}
</script>

<template>
  <main class="min-h-[100vh] overflow-x-hidden bg-gray-black pt-[5rem]">
    <HeaderComponent @openAddUser="toggleAddUserDialog"/>
    <AddUserDialog @closeDialog="toggleAddUserDialog" v-if="addUserIsActive"/>
    <RouterView/>
  </main>
</template>

<style scoped>

</style>
