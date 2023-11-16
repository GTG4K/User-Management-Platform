<script setup lang="ts">
import UserComponent from "../components/UserComponent.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {useUsersStore} from "../store/users.ts";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent.vue";
import {getUserById} from "../services/users.ts";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog.vue";
import {IUser} from "../ts/user.interface.ts";

const route = useRoute()
const router = useRouter()
const userStore = useUsersStore();

const userID = ref<number>(Number(route.params.id))
const user = ref<IUser | undefined>();
const userIsLoading = ref<boolean>(true);
const deleteDialogActive = ref<boolean>(false);

onMounted(() => {
  refreshUserDetails()
})

watch(() => route.params.id, () => {
  refreshUserDetails()
})

const toggleDeleteDialog = () => {
  deleteDialogActive.value = !deleteDialogActive.value
}
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

const toggleDeleteUserDialog = async () => {
  deleteDialogActive.value = !deleteDialogActive.value
}
</script>

<template>
  <div class="md:px-medium sm:px-small px-mobile flex flex-col gap-3 pb-3">
    <ConfirmDeleteDialog :userID="userID" :firstName="user.firstName" v-if="deleteDialogActive" @closeDialog="toggleDeleteDialog"/>
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
    <div
        class="text-white-slate user-none bg-red-500 hover:bg-red-600 rounded-md text-2xl p-2 text-center cursor-pointer"
        @click="toggleDeleteUserDialog">Delete User
    </div>
  </div>
</template>