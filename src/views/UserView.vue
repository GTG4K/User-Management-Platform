<script setup lang="ts">
import UserComponent from "../components/UserComponent.vue";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref, watch} from "vue";
import {useUsersStore} from "../store/users.ts";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent.vue";
import {deleteUserById, getUserById} from "../services/users.ts";

const route = useRoute()
const router = useRouter()
const userStore = useUsersStore();

const userID = ref<number>(Number(route.params.id))
const user = ref(null);
const userIsLoading = ref<boolean>(true);

onMounted(() => {
  refreshUserDetails()
})

watch(() => route.params.id, () => {
  refreshUserDetails()
})

const refreshUserDetails = async () => {
  userIsLoading.value = true
  userID.value = Number(route.params.id)
  if (userStore.getUserById(userID.value)) {
    user.value = userStore.getUserById(userID.value)
    userIsLoading.value = false
    return
  }
  user.value = await getUserById(userID.value)
  userIsLoading.value = false
}

const nextUser = () => {
  router.push(`/users/${userID.value + 1}`)
}

const previousUser = () => {
  if (userID.value - 1 !== 0) router.push(`/users/${userID.value - 1}`)
}

const deleteUser = async () => {
  const deletedUser = await deleteUserById(userID.value)
  userStore.deleteUser(userID.value)
  router.push({name: 'users'})
}
</script>

<template>
  <div class="md:px-medium sm:px-small px-mobile flex flex-col gap-3 pb-3">
    <h2 class="text-accent bg-gray-card rounded-md text-2xl p-2 text-center">User</h2>
    <div class="w-fit m-auto " v-if="userIsLoading">
      <LoadingSpinnerComponent/>
    </div>
    <UserComponent v-else :user="user"/>
    <div class="flex gap-2">
      <i class="fa-solid fa-angle-left text-gray-white flex-grow bg-gray-card hover:text-white-slate hover:bg-accent transition rounded-lg cursor-pointer text-center py-3.5"
         @click="previousUser"></i>
      <i class="fa-solid fa-angle-right text-gray-white flex-grow bg-gray-card hover:text-white-slate hover:bg-accent transition rounded-lg cursor-pointer text-center py-3.5"
         @click="nextUser"></i>
    </div>
    <div class="text-white-slate user-none bg-red-500 hover:bg-red-600 rounded-md text-2xl p-2 text-center cursor-pointer" @click="deleteUser">Delete User</div>
  </div>
</template>