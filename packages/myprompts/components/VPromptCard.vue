<script setup lang="ts">
import type { Prompt } from "~/utils/prompts";
defineProps<{ prompt: Prompt }>();
</script>
<template>
  <UCard
    :key="prompt.id"
    :ui="{
      base: 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1',
      body: 'flex-1'
    }"
    class="flex flex-col h-full"
  >
    <template #header>
      <div class="font-bold text-xl line-clamp-2">{{ prompt.title }}</div>
    </template>

    <p class="text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
      {{ prompt.description }}
    </p>

    <template #footer>
      <div class="flex justify-between items-center">
        <UBadge color="primary">{{ prompt.id }}</UBadge>
        <NuxtLink
          :to="promptPath(prompt)"
          class="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500"
          >View Details</NuxtLink>
      </div>
    </template>
  </UCard>
</template>
