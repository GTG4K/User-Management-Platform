<script setup lang="ts">
import {useRouter} from "vue-router";

const props = defineProps<{
  title: string,
  description: string,
  icon: string
  route: string
}>()

const router = useRouter()
const changeRoute = (): void => {
  if (props.route) router.push(props.route)
}
</script>

<template>
  <div
      class="bg-gray-card rounded-xl flex gap-2 items-center justify-center overflow-hidden pt-3 group cursor-pointer hover:bg-accent transition "
      @click="changeRoute">
    <div class="bg-accent w-full h-24 rounded-t-xl flex justify-between items-center px-3.5 group-hover:bg-gray-card">
      <div class="flex items-center gap-3">
        <i :class="`fa-solid fa-${props.icon} text-accent bg-gray-black rounded-lg p-3 group-hover:bg-accent group-hover:text-white-slate`"></i>
        <div class="flex flex-col gap-1">
          <h2 class="text-gray-black font-bold text-sm group-hover:text-accent">{{ props.title }}</h2>
          <p class="text-white-slate text-xs">{{ props.description }}</p>
        </div>
      </div>
      <i class="fa-solid fa-arrow-right text-accent bg-gray-black rounded-lg p-1 group-hover:bg-accent group-hover:text-white-slate"></i>
    </div>
  </div>
</template>
