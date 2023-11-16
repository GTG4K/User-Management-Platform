<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  "modelValue": string | number,
  "placeholder": string,
  "type": string | null,
  "error": string | null,
  "icon": string
}>()

const emits = defineEmits(['update:modelValue', 'click'])
const updateInput = (e: Event): void => {
  if (e.target instanceof HTMLInputElement) {
    emits('update:modelValue', e.target.value);
  }
}

const inputStyling = computed<object>(() => {
  return {
    "border border-red-500": props.error,
    "border border-transparent": !props.error
  }
})

</script>

<template>
  <div class="bg-gray-card rounded-md flex items-center p-3" :class="inputStyling" @click="emits('click')">
    <i v-if="props.icon" :class="`fa-solid fa-${props.icon} text-accent`"/>
    <input :type="props.type || 'text'" :value="props.modelValue" :placeholder="props.placeholder" @input="updateInput"
           class="bg-transparent flex-grow pl-3 outline-0 text-white-slate"/>
  </div>
  <p v-if="props.error" v-html="props.error" class="text-red-500 text-xs"></p>
</template>
