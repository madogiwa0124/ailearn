<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <!-- ヘッダー -->
    <header class="border-b dark:border-gray-800">
      <UContainer class="py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl">
            Prompts Viewer
          </NuxtLink>

          <div class="flex items-center gap-4">
            <UButton
              :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
              color="neutral"
              variant="ghost"
              @click="isDark = !isDark"
            />
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
