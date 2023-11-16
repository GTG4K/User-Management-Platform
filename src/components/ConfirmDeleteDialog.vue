<script setup lang="ts">
import BaseDialog from "./base/BaseDialog.vue";
import {deleteUserById} from "../services/users.ts";
import {useUserStore} from "../store/users.ts";
import {useRouter} from "vue-router";
import {computed} from "vue";

const userStore = useUserStore();
const router = useRouter();

const props = defineProps<{
  userID: number
  firstName: string
}>()
const emits = defineEmits(['closeDialog'])
const closeDialog = (): void => {
  emits("closeDialog")
}

const deleteUser = async (): Promise<void> => {
  await deleteUserById(props.userID)
  userStore.deleteUser(props.userID)
  await router.push({name: 'users'})
  emits("closeDialog")
}

const dialogHeader = computed<string>(() => {
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