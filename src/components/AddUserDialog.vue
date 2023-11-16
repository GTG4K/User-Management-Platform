<script setup lang="ts">
import BaseText from "./base/BaseText.vue";
import BaseDialog from "./base/BaseDialog.vue";
import {ref} from "vue";
import {addUser} from "../services/users.ts";
import BaseImage from "./base/BaseImage.vue";
import {useUsersStore} from "../store/users.ts";
import {useRouter} from "vue-router";
import {isEmail, isEmpty, isNumber, validationPassed} from "../Util/validate.ts";

const userStore = useUsersStore()
const router = useRouter()

const firstName = ref<string>("")
const firstNameError = ref<string>("")
const lastName = ref<string>("")
const lastNameError = ref<string>("")
const email = ref<string>("")
const emailError = ref<string>("")
const age = ref<number>(0)
const ageError = ref<string>("")
const image = ref<File | null>(null);
const imageError = ref<string>("")

const emits = defineEmits(['closeDialog'])

const formIsValid = (): boolean => {
  clearErrors()

  emailError.value = isEmail(email.value);
  ageError.value = isNumber(age.value);
  firstNameError.value = isEmpty(firstName.value);
  lastNameError.value = isEmpty(lastName.value);
  ageError.value = isEmpty(String(age.value));
  emailError.value = isEmpty(email.value);


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
const handleAddUser = async () => {
  if (formIsValid()) {
    const userData = generateUserData()
    const newUser = await addUser(userData)
    userStore.addUser(newUser);
    router.push(`/users/${newUser.id}`)
    closeDialog()
  }
}
const closeDialog = () => {
  emits("closeDialog")
}
const clearErrors = () => {
  firstNameError.value = ""
  lastNameError.value = ""
  ageError.value = ""
  emailError.value = ""
}
</script>

<template>
  <BaseDialog header="Add user.." @closeDialog="closeDialog">
    <div class="flex flex-col gap-2">
      <BaseText :error="firstNameError" type="text" icon="" v-model="firstName" placeholder="firstname.."
                @click="firstNameError = ''"/>
      <BaseText :error="lastNameError" type="text" icon="" v-model="lastName" placeholder="lastname.."
                @click="lastNameError = ''"/>
      <BaseText :error="emailError" type="email" icon="" v-model="email" placeholder="email.."
                @click="emailError = ''"/>
      <BaseText :error="ageError" type="number" icon="" v-model="age" placeholder="age.." @click="ageError = ''"/>
      <BaseImage v-model="image" :error="imageError" @click="imageError = ''"/>
      <div @click="handleAddUser"
           class="flex items-center justify-center gap-2 text-white-slate bg-green-500 hover:bg-green-600 transition rounded cursor-pointer mt-2 p-2">
        <i class="fa-solid fa-user-plus"/>
        <h2>Add User</h2>
      </div>
      <div @click="closeDialog"
           class="flex items-center justify-center gap-2 text-white-slate bg-accent hover:bg-blue-600 transition rounded cursor-pointer p-2">
        <h2>Cancel</h2>
      </div>
    </div>
  </BaseDialog>
</template>
