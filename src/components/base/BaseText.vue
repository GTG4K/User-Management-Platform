<script setup lang="ts">
const props = defineProps<{
  "modelValue": string,
  "placeholder": string,
  "icon": string
}>()
const emits = defineEmits(['update:modelValue'])
const updateInput = (e) => {
  emits('update:modelValue', e.target.value);
}

</script>

<template>
  <div class="bg-gray-card rounded-md flex items-center p-3">
    <i v-if="props.icon" :class="`fa-solid fa-${props.icon} text-accent`"/>
    <input type="text" :value="props.modelValue" :placeholder="props.placeholder" @input="updateInput"
            class="bg-transparent flex-grow pl-3 outline-0 text-white-slate"/>
  </div>
</template>
