<script setup lang="ts">
defineProps<{ prompt: Prompt; promptPath: string }>();
</script>
<template>
  <UCard
    :key="prompt.id"
    :ui="{
      root: 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1',
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
        <div class="flex items-center gap-2">
          <UBadge color="primary">{{ prompt.id }}</UBadge>
        </div>
        <NuxtLink
          :to="promptPath"
          class="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500"
          >View Details</NuxtLink>
      </div>
    </template>
  </UCard>
</template>
