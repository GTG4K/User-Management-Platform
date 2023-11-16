<script setup lang="ts">
import UserComponent from "../components/UserComponent.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {useUserStore} from "../store/users.ts";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent.vue";
import {getUserById, getUsers} from "../services/users.ts";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog.vue";
import {IUser} from "../ts/interfaces/user.interface.ts";
import EditUserDialog from "../components/EditUserDialog.vue";

const route = useRoute()
const router = useRouter()
const userStore = useUserStore();

const userID = ref<number>(Number(route.params.id))
const user = ref<IUser | null>(null);
const userIsLoading = ref<boolean>(true);
const deleteDialogActive = ref<boolean>(false);
const editUserDialogActive = ref<boolean>(false);

const usersPerPage = 12

onMounted(() => {
  refreshUserDetails()
})

watch(() => route.params.id, () => {
  refreshUserDetails()
})

const toggleDeleteDialog = (): void => {
  deleteDialogActive.value = !deleteDialogActive.value
}
const refreshUserDetails = async (): Promise<void> => {
  userIsLoading.value = true
  userID.value = Number(route.params.id)
  if (userStore.getUserById(userID.value)) {
    user.value = userStore.getUserById(userID.value)
    userIsLoading.value = false
    return
  }
  user.value = await getUserById(userID.value)
  userIsLoading.value = false
  await getCurrentPageUsers()
}

const getCurrentPageUsers = async (): Promise<void> => {
  const userPage = Math.ceil(userID.value / usersPerPage)
  try {
    if (!userStore.getUsersByPage(userPage)) {
      const {users, total} = await getUsers(userPage);
      userStore.setTotal(total)
      userStore.setUsers(userPage, users)
    }
  } catch (error) {
    userIsLoading.value = false
    console.error('Error fetching data:', error);
  }
}

const nextUser = (): void => {
  router.push(`/users/${userID.value + 1}`)
}

const previousUser = (): void => {
  if (userID.value - 1 !== 0) router.push(`/users/${userID.value - 1}`)
}

const toggleDeleteUserDialog = (): void => {
  deleteDialogActive.value = !deleteDialogActive.value
}
const toggleEditUserDialog = (): void => {
  refreshUserDetails()
  editUserDialogActive.value = !editUserDialogActive.value
}
</script>

<template>
  <div class="md:px-medium sm:px-small px-mobile flex flex-col gap-3 pb-3">
    <EditUserDialog v-if="editUserDialogActive" :user="user" @closeDialog="toggleEditUserDialog"/>
    <ConfirmDeleteDialog :userID="userID" :firstName="user!.firstName" v-if="deleteDialogActive"
                         @closeDialog="toggleDeleteDialog"/>
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
        class="text-white-slate user-none bg-blue-500 hover:bg-blue-600 rounded-md text-2xl p-2 text-center cursor-pointer"
        @click="toggleEditUserDialog">Edit User
    </div>
    <div
        class="text-white-slate user-none bg-red-500 hover:bg-red-600 rounded-md text-2xl p-2 text-center cursor-pointer"
        @click="toggleDeleteUserDialog">Delete User
    </div>
  </div>
</template>