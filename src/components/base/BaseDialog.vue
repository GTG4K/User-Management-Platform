<script setup lang="ts">
import BaseText from "./BaseText.vue";
import {ref} from "vue";

const props = defineProps<{
  header: String,
}>()
const emits = defineEmits(['closeDialog'])

</script>

<template>
  <div
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-black w-4/5 sm:w-96 rounded-lg border border-white/10 p-4 z-50">
    <h2 class="text-white-slate text-center font-bold">{{ props.header }}</h2>
    <div class="w-full h-0.5 mt-3 mb-4 bg-white-slate/10"></div>
    <slot>

    </slot>
  </div>
  <div class="fixed top-0 left-0 bg-gray-black/50 w-full h-full z-40" @click="emits('closeDialog')">

  </div>
</template>
