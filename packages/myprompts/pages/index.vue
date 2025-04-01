<template>
  <div>
    <UContainer class="py-16">
      <div class="flex items-center gap-4 mb-8">
        <UIcon name="i-heroicons-document-text" class="text-primary-500 text-4xl" />
        <h1 class="text-4xl font-bold">Prompts</h1>
      </div>
      <div v-if="pending">
        <USkeleton class="h-32 w-full mb-4" v-for="i in 3" :key="i" />
      </div>
      <div v-else-if="error">
        <UAlert
          icon="i-heroicons-exclamation-triangle"
          color="error"
          title="An error occurred"
          :description="error.message"
        />
      </div>
      <div v-else-if="!prompts?.length">
        <UAlert
          icon="i-heroicons-information-circle"
          color="neutral"
          title="No prompts available"
          description="No prompts were found. Please add prompt files to the .github/prompts directory."
        />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VPromptCard
          v-for="prompt in prompts"
          :key="prompt.id"
          :prompt="prompt"
        />
      </div>
    </UContainer>
  </div>
</template>
<script setup lang="ts">
import { usePrompts } from "~/utils/prompts";
const { prompts, pending, error } = usePrompts();
</script>
