<script setup lang="ts">
const props = defineProps<{
  currentPage: number
}>()

const emits = defineEmits(['firstPage', 'previousPage', 'nextPage', 'lastPage'])
</script>

<template>
  <div
      class="bg-gray-card rounded-md text-2xl p-2 text-center flex items-center justify-center m-auto select-none gap-2 w-full sm:w-fit">
    <i class="fa-solid fa-angles-left text-gray-white hover:text-white-slate cursor-pointer"
       @click="emits('firstPage')"></i>
    <i class="fa-solid fa-angle-left text-gray-white hover:text-white-slate cursor-pointer"
       @click="emits('previousPage')"></i>
    <h2 class="px-10 text-accent">{{ props.currentPage }}</h2>
    <i class="fa-solid fa-angle-right text-gray-white hover:text-white-slate cursor-pointer"
       @click="emits('nextPage')"></i>
    <i class="fa-solid fa-angles-right text-gray-white hover:text-white-slate cursor-pointer"
       @click="emits('lastPage')"></i>
  </div>
</template>
