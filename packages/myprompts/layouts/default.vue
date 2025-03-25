<template>
  <div class="min-h-screen flex flex-col">
    <!-- ヘッダー -->
    <header class="border-b dark:border-gray-800">
      <UContainer class="py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl">
            <UIcon name="i-heroicons-document-text" class="text-primary-500" />
            Prompts Viewer
          </NuxtLink>

          <div class="flex items-center gap-4">
            <UColorModeButton />
          </div>
        </div>
      </UContainer>
    </header>

    <!-- メインコンテンツ -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- フッター -->
    <footer class="border-t dark:border-gray-800 py-6 mt-8">
      <UContainer>
        <div class="flex justify-between items-center">
          <div class="text-sm text-gray-500">
            &copy; {{ new Date().getFullYear() }} madogiwa0124
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>
