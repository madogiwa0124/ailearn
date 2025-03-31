<template>
  <div>
    <UContainer class="py-16">
      <div v-if="pending">
        <USkeleton class="h-8 w-1/2 mb-4" />
        <USkeleton class="h-4 w-full mb-2" v-for="i in 8" :key="i" />
      </div>
      <div v-else-if="error || !prompt">
        <UAlert
          icon="i-heroicons-exclamation-triangle"
          title="An error occurred"
          :description="error?.message || 'The prompt was not found'"
        />
        <UButton
          icon="i-heroicons-arrow-left"
          color="primary"
          variant="ghost"
          to="/"
          class="mt-4"
        >
          Back to Prompts
        </UButton>
      </div>
      <template v-else>
        <div class="mb-6">
          <div class="flex items-center gap-4 mb-4">
            <UButton
              icon="i-heroicons-arrow-left"
              color="primary"
              variant="ghost"
              to="/"
            >
              Back to Prompts
            </UButton>
            <UBadge color="primary" size="lg">{{ prompt.id }}</UBadge>
          </div>
          <h1 class="text-3xl font-bold mb-2">{{ prompt.title }}</h1>
          <p class="text-sm text-gray-500">Filename: {{ prompt.filename }}</p>
          <p class="text-sm text-gray-500">Characters: {{ prompt.content.length }}</p>
          <p class="text-sm text-gray-500">Tokens: {{ prompt.tokens }}</p>
        </div>
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
            <h2 class="font-medium">Prompt Content</h2>
            <UButton
              color="primary"
              icon="i-heroicons-clipboard"
              variant="soft"
              size="sm"
              @click="copyPrompt"
            >
              Copy
            </UButton>
          </div>
          <div class="p-6">
            <div class="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
              {{ prompt.content }}
            </div>
          </div>
        </div>
      </template>
    </UContainer>
  </div>
</template>
<script setup lang="ts">
import { usePrompt } from "~/utils/prompts";
const route = useRoute();
const id = route.params.id as string;
const toast = useToast();
const { prompt, pending, error } = usePrompt(id);
const copyPrompt = (): void => {
  if (!prompt.value) return;
  navigator.clipboard
    .writeText(prompt.value.content)
    .then(() => {
      toast.add({
        title: "Copied",
        description: "The prompt has been copied to the clipboard",
        icon: "i-heroicons-clipboard-check",
        color: "green",
      });
    })
    .catch((err: Error) => {
      toast.add({
        title: "Copy failed",
        description: err.message,
        icon: "i-heroicons-exclamation-triangle",
        color: "red",
      });
    });
};
</script>
