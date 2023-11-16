<script setup lang="ts">
import {getUsers} from "../services/users.ts";
import {useUsersStore} from "../store/users.ts";
import {computed, onMounted, ref, watch} from "vue";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent.vue";
import UserComponent from "../components/UserComponent.vue";
import PageSelectorComponent from "../components/PageSelectorComponent.vue";
import BaseText from "../components/base/BaseText.vue";
import {useRouter} from "vue-router";

const userStore = useUsersStore();
const currentPage = ref<number>(1);
const searchValue = ref<string>("")

const router = useRouter()

const limit: number = 12
const total = computed(()=>{
  return userStore.getTotalUsers
})

const usersAreLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    if (!userStore.getUsersByPage(currentPage.value)) {
      const {users, total} = await getUsers(currentPage.value);
      userStore.setTotal(total)
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
      userStore.setTotal(total)
      userStore.setUsers(currentPage.value, users)
    }
    usersAreLoading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    usersAreLoading.value = false;
  }
})

const userList = computed(() => {
  if (searchValue.value) return userStore.getUsersBySearch(searchValue.value)
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
  if (currentPage.value === Math.ceil(total.value / limit)) return
  currentPage.value += 1
}
const lastPage = () => {
  currentPage.value = Math.ceil(total.value / limit)
}

</script>

<template>
  <div class="md:px-medium sm:px-small px-mobile flex flex-col gap-3 pb-3">
    <h2 class="text-accent bg-gray-card rounded-md text-2xl p-2 text-center">List of all users</h2>
    <BaseText type="text" v-model="searchValue" placeholder="Search.." icon="magnifying-glass" error=""/>
    <div class="w-fit m-auto " v-if="usersAreLoading">
      <LoadingSpinnerComponent/>
    </div>
    <div class="bg-gray-card rounded-md p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-5"
         v-else>
      <UserComponent v-for="user in userList" :key="user.id" :user="user" @click="router.push(`/users/${user.id}`)"/>
    </div>
    <PageSelectorComponent v-if="!searchValue" @firstPage="firstPage" @lastPage="lastPage" @previousPage="previousPage"
                           @nextPage="nextPage" :currentPage="currentPage"/>
  </div>
</template>
