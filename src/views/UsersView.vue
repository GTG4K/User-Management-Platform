<script setup lang="ts">
import {getUsers} from "../services/users.ts";
import {useUsersStore} from "../store/users.ts";
import {computed, onMounted, ref, watch} from "vue";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent.vue";
import UserComponent from "../components/UserComponent.vue";
import PageSelectorComponent from "../components/PageSelectorComponent.vue";
import BaseText from "../components/base/BaseText.vue";

const userStore = useUsersStore();
const currentPage = ref<number>(1);
const searchQuery = ref<string>("");

let totalUsers: number | null = null
let limit: number | null = 12
const usersAreLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    if (!userStore.getUsersByPage(currentPage.value)) {
      const {users, total} = await getUsers(currentPage.value);
      totalUsers = total
      userStore.setUsers(currentPage.value, users)
    }
    usersAreLoading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    usersAreLoading.value = false;
  }
})

watch(currentPage, async () => {
  usersAreLoading.value = true;
  try {
    if (!userStore.getUsersByPage(currentPage.value)) {
      const {users, total} = await getUsers(currentPage.value);
      totalUsers = total
      userStore.setUsers(currentPage.value, users)
    }
    usersAreLoading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    usersAreLoading.value = false;
  }
})

const userList = computed(() => {
  return userStore.getUsersByPage(currentPage.value)
})

const firstPage = () => {
  currentPage.value = 1
}
const previousPage = () => {
  if (currentPage.value - 1 === 0) return
  currentPage.value -= 1
}
const nextPage = () => {
  if (currentPage.value === Math.ceil(totalUsers / limit)) return
  currentPage.value += 1
}
const lastPage = () => {
  currentPage.value = Math.ceil(totalUsers / limit)
}

</script>

<template>
  <div class="md:px-medium sm:px-small px-mobile flex flex-col gap-3 pb-3">
    <h2 class="text-accent bg-gray-card rounded-md text-2xl p-2 text-center">List of all users</h2>
    <BaseText v-model="searchQuery" placeholder="Search.." icon="magnifying-glass"/>
    <div class="w-fit m-auto " v-if="usersAreLoading">
      <LoadingSpinnerComponent/>
    </div>
    <div class="bg-gray-card rounded-md p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
         v-else>
      <UserComponent v-for="user in userList" :key="user.id" :user="user"/>
    </div>
    <PageSelectorComponent @firstPage="firstPage" @lastPage="lastPage" @previousPage="previousPage"
                           @nextPage="nextPage" :currentPage="currentPage"/>
  </div>
</template>
