<script setup lang="ts">
const props = defineProps<{
  user: object
}>()
</script>

<template>
  <div class="cursor-pointer bg-accent/20 p-2 rounded-md hover:bg-accent/60 transition-all">
    <img class="bg-gray-black rounded-md w-full h-80 object-cover" :src="user.image" alt="profile picture"/>
    <div class="flex flex-col bg-gray-black rounded-md gap-1 mt-2">
      <h2 class="text-accent text-2xl text-center">{{ user.firstName }} {{ user.lastName }}</h2>
      <h2 class="text-gray-white text-lg text-center">{{ user.email }}</h2>
      <div class="flex justify-center gap-2">
        <h2 class="text-gray-white text-lg text-center">age: </h2>
        <h2 class="text-gray-white text-lg text-center">{{ user.age }}</h2>
      </div>
    </div>
  </div>
</template>
