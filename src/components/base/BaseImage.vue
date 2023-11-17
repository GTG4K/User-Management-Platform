<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  'modelValue': string | ArrayBuffer | null,
  "error": string | null,
}>();
const emits = defineEmits(['update:modelValue']);

const uploadedImage = ref<string | ArrayBuffer | null>(props.modelValue ?? null);

const updateFile = (e: Event) => {
  const fileInput = e.target as HTMLInputElement;
  const files = fileInput.files;

  if (files && files.length > 0) {
    const firstFile = files[0];
    emits('update:modelValue', firstFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      uploadedImage.value = fileReader.result
    }
    fileReader.readAsDataURL(firstFile);
  }
}
</script>

<template>
  <div>
    <label v-if='!uploadedImage' for="image"
           class="relative transition-all w-full bg-accent hover:bg-blue-500 p-2 justify-center text-white-slate rounded-md flex gap-3 items-center cursor-pointer">
      <i class="fa-solid fa-camera"></i>
      Upload Image.
    </label>
    <label
        class="relative flex gap-2 transition-all w-full border border-white/20 rounded items-center text-sm p-2 hover:bg-accent/20 cursor-pointer text-white-slate"
        v-else for="image">
      <img :src="uploadedImage" alt="image preview" class="h-20 object-cover rounded">
      Upload another image?
    </label>
    <input name="image" type="file" id="image" @change="updateFile" class="hidden"/>
    <p v-if="props.error" class="text-red-500 text-xs">{{ props.error }}</p>
  </div>
</template>
