<script setup lang="ts">
import {getUsers} from "../services/users.ts";
import {useUsersStore} from "../store/users.ts";
import {computed, onMounted, ref} from "vue";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent.vue";
import UserComponent from "../components/UserComponent.vue";

const userStore = useUsersStore();
const usersAreLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    const {users} = await getUsers();
    userStore.setUsers(users)
    usersAreLoading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    usersAreLoading.value = false;
  }
})

const userList = computed(() => {
  return userStore.getUsers
})
</script>

<template>
  <div class="md:px-medium sm:px-small px-mobile flex flex-col gap-3">
    <h2 class="text-accent bg-gray-card rounded-md text-2xl p-2 text-center">List of all users</h2>
    <div class="w-fit m-auto " v-if="usersAreLoading">
      <LoadingSpinnerComponent/>
    </div>
    <div class="bg-gray-card rounded-md p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
         v-else>
      <UserComponent v-for="user in userList" :key="user.id" :user="user"/>
    </div>
    <div class="bg-gray-card rounded-md text-2xl p-2 text-center">

    </div>
  </div>
</template>
