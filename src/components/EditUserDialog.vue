<script setup lang="ts">
import BaseText from "./base/BaseText.vue";
import BaseDialog from "./base/BaseDialog.vue";
import {ref} from "vue";
import {editUser} from "../services/users.ts";
import BaseImage from "./base/BaseImage.vue";
import {useUserStore} from "../store/users.ts";
import {isEmail, isEmpty, isNumber, validationPassed} from "../Util/validators/validate.ts";
import {IUser} from "../ts/interfaces/user.interface.ts";

const props = defineProps<{
  user: IUser,
}>()
const emits = defineEmits(['closeDialog'])

const userStore = useUserStore()

const firstName = ref<string>(props.user.firstName)
const firstNameError = ref<string>("")
const lastName = ref<string>(props.user.lastName)
const lastNameError = ref<string>("")
const email = ref<string>(props.user.email)
const emailError = ref<string>("")
const age = ref<number>(props.user.age)
const ageError = ref<string>("")
const image = ref<string | ArrayBuffer | null
>(null);
const imageError = ref<string>("")


const formIsValid = (): boolean => {
  clearErrors()

  emailError.value = isEmail(email.value);
  ageError.value += isNumber(age.value);
  firstNameError.value += isEmpty(firstName.value);
  lastNameError.value += isEmpty(lastName.value);
  ageError.value += isEmpty(String(age.value));
  emailError.value += isEmpty(email.value);


  return validationPassed([firstNameError.value, lastNameError.value, emailError.value, ageError.value])
}
const generateUserData = (): FormData => {
  const userData = new FormData();
  userData.append('firstName', firstName.value);
  userData.append('lastName', lastName.value);
  userData.append('age', String(age.value));
  userData.append('email', email.value);
  // I don't think dummyjson accepts multipart/formdata on the user routes,
  // If it did, I would also send the image File from the user and store it in the user store
  // userData.append('image', image.value)
  return userData
}
const handleAddUser = async (): Promise<void> => {
  if (formIsValid()) {
    const userData = generateUserData()
    const updatedUser: IUser = await editUser(props.user.id, userData)
    userStore.updateUser(updatedUser.id, updatedUser);
    closeDialog()
  }
}
const closeDialog = (): void => {
  emits("closeDialog")
}
const clearErrors = (): void => {
  firstNameError.value = ""
  lastNameError.value = ""
  ageError.value = ""
  emailError.value = ""
}
</script>

<template>
  <BaseDialog :header="`Edit user: ${props.user.firstName}`" @closeDialog="closeDialog">
    <div class="flex flex-col gap-2">
      <BaseText :error="firstNameError" type="text" icon="" v-model="firstName"
                :placeholder="props.user.firstName"
                @click="firstNameError = ''"/>
      <BaseText :error="lastNameError" type="text" icon="" v-model="lastName"
                :placeholder="props.user.lastName"
                @click="lastNameError = ''"/>
      <BaseText :error="emailError" type="email" icon="" v-model="email"
                :placeholder="props.user.email"
                @click="emailError = ''"/>
      <BaseText :error="ageError" type="number" icon="" v-model="age"
                :placeholder="String(props.user.age)"
                @click="ageError = ''"/>
      <BaseImage v-model="image" :error="imageError" @click="imageError = ''"/>
      <div @click="handleAddUser"
           class="flex items-center justify-center gap-2 text-white-slate bg-green-500 hover:bg-green-600 transition rounded cursor-pointer mt-2 p-2">
        <i class="fa-solid fa-user-plus"/>
        <h2>Edit User</h2>
      </div>
      <div @click="closeDialog"
           class="flex items-center justify-center gap-2 text-white-slate bg-accent hover:bg-blue-600 transition rounded cursor-pointer p-2">
        <h2>Cancel</h2>
      </div>
    </div>
  </BaseDialog>
</template>
