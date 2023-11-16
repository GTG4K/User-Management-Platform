<script setup lang="ts">
import BaseDialog from "./base/BaseDialog.vue";
import {deleteUserById} from "../services/users.ts";
import {useUsersStore} from "../store/users.ts";
import {useRouter} from "vue-router";
import {computed} from "vue";

const userStore = useUsersStore();
const router = useRouter();

const props = defineProps<{
  userID: number
  firstName: string
}>()
const emits = defineEmits(['closeDialog'])
const closeDialog = () => {
  emits("closeDialog")
}

const deleteUser = async () => {
  const deletedUser = await deleteUserById(props.userID)
  userStore.deleteUser(props.userID)
  router.push({name: 'users'})
  emits("closeDialog")
}

const dialogHeader = computed(() => {
  return `delete user: ${props.firstName}?`
})

</script>

<template>
  <BaseDialog :header="dialogHeader" @closeDialog="closeDialog">
    <div class="flex justify-evenly gap-3">
      <button class="bg-accent hover:bg-blue-600 flex-grow p-2 rounded" @click="closeDialog">Cancel</button>
      <button class="bg-red-500 hover:bg-red-600 flex-grow p-2 rounded" @click="deleteUser">Confirm</button>
    </div>
  </BaseDialog>
</template>

<style scoped>

</style>