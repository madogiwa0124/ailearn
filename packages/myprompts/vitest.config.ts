import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  // any custom Vitest config you require
  test: {
    environment: "nuxt",
    globals: true, // グローバルテスト関数を利用可能にする
    includeSource: ["utils/**/*.{js,ts}"],
  },
});
