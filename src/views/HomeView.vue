<script setup lang="ts">
import BaseCard from "../components/base/BaseCard.vue";
</script>

<template>
  <div class="md:px-medium sm:px-small px-mobile flex flex-col gap-5">
    <h2 class="text-accent text-4xl">User Finder:</h2>
    <p class="pt-5 text-gray-white font-light">Unlock the power of streamlined user management with User Finder, your
      go-to
      solution for mastering user access,
      security, and collaboration.</p>
    <BaseCard title="User list" description="check out users in the database." icon="users" route="users"/>
  </div>
</template>