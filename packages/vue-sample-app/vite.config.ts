import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    "import.meta.vitest": "undefined",
  },
  server: {
    hmr: {
      host: "0.0.0.0",
    },
  },
});
