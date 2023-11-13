<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";

const menuIsOpen = ref<boolean>(false);
const navigation = ref(null);
const navigationIcon = ref(null);

const emits = defineEmits(['openAddUser']);

const toggleMenu = () => {
  menuIsOpen.value = !menuIsOpen.value
}

const openAddUser = () => {
  emits('openAddUser')
  toggleMenu()
}

const menuStyling = computed(() => {
  return {
    'translate-x-0': menuIsOpen.value,
    'translate-x-full': !menuIsOpen.value
  }
})

const handleClickOutside = (e) => {
  if (menuIsOpen.value && !navigation.value.contains(e.target) && !navigationIcon.value.contains(e.target)) {
    toggleMenu()
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
})


</script>

<template>
  <header
      class="fixed w-full h-20 top-0 left-0 flex justify-between items-center z-20 bg-gray-black md:px-medium sm:px-small px-mobile">
    <div class="flex items-center gap-2">
      <div class="bg-accent rounded-xl w-10 h-10 flex items-center justify-center">
        <i class="fa-solid fa-users text-accent bg-gray-black rounded-md p-2"></i>
      </div>
      <h2 class="text-accent font-bold">User Finder</h2>
    </div>
    <i class="fa-solid fa-bars text-white-slate text-xl cursor-pointer sm:hidden" ref="navigationIcon"
       @click="toggleMenu"></i>
    <div class="absolute right-0 transition bottom-0 translate-y-full flex flex-col w-14 sm:hidden"
         ref="navigation"
         :class="menuStyling">
      <router-link
          class="flex justify-center items-center h-14 group bg-white-slate cursor-pointer hover:bg-accent transition"
          :to="{name: 'home'}" @click="toggleMenu">
        <i class="fa-solid fa-house group-hover:text-white-slate"/>
      </router-link>
      <router-link
          class="flex justify-center items-center h-14 group bg-white-slate cursor-pointer hover:bg-accent transition"
          :to="{name: 'users'}" @click="toggleMenu">
        <i class="fa-solid fa-user group-hover:text-white-slate"/>
      </router-link>
      <div
          class="flex justify-center items-center h-14 group bg-green-500 cursor-pointer hover:bg-green-600 transition"
          @click="openAddUser">
        <i class="fa-solid fa-user-plus group-hover:text-white-slate"/>
      </div>
    </div>
    <nav class="gap-5 hidden select-none sm:flex">
      <router-link
          class="flex items-center gap-2 text-gray-white"
          :to="{name: 'home'}">
        <i class="fa-solid fa-house "/>
        <h2>Home</h2>
      </router-link>
      <router-link
          class="flex items-center gap-2 text-gray-white"
          :to="{name: 'users'}">
        <i class="fa-solid fa-user "/>
        <h2>Users</h2>
      </router-link>
      <div @click="openAddUser"
           class="flex items-center gap-2 text-white-slate bg-green-500  hover:bg-green-600 transition rounded cursor-pointer p-2">
        <i class="fa-solid fa-user-plus"/>
        <h2>Add User</h2>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.router-link-active {
  background: #41abff;
  color: #F8F8F8;
}

@media only screen and (min-width: 640px) {
  .router-link-active {
    background: transparent;
    color: #41abff;
  }
}
</style>
