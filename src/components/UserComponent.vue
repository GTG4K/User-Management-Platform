<script setup lang="ts">
import {computed, onMounted} from "vue";

const props = defineProps<{
  user: any
}>()

const image = computed(() => {
  return props.user?.image
})

const fullName = computed(() => {
  return `${props.user?.firstName} ${props.user?.lastName}`
})

</script>

<template>
  <div v-if="props.user"
       class="cursor-pointer bg-accent/20 p-2 rounded-md hover:bg-accent/60 transition-all md:flex md:gap-2">
    <img class="bg-gray-black rounded-md w-full md:w-32 h-40 md:h-32 object-cover"
         :src="image"
         alt="profile picture"/>
    <div class="flex flex-col bg-gray-black rounded-md p-3 gap-1 mt-2 md:mt-0 md:w-full md:justify-center">
      <h2 class="text-accent text-2xl text-center md:text-start">{{ fullName }}</h2>
      <h2 class="text-gray-white text-lg text-center md:text-start">{{ props.user?.email }}</h2>
      <div class="flex justify-center gap-2 md:justify-start">
        <h2 class="text-gray-white text-lg text-center md:text-start">age: </h2>
        <h2 class="text-gray-white text-lg text-center md:text-start">{{ props.user?.age }}</h2>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-gray-white text-4xl p-12">
    404 Not found
  </div>
</template>
