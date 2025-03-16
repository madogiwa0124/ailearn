import { defineConfig } from "@rsbuild/core";

export default defineConfig({
  source: {
    define: {
      "process.env.GITHUB_PAT_FOR_AI_MODEL": JSON.stringify(
        process.env.GITHUB_PAT_FOR_AI_MODEL || "",
      ),
      "process.env.SERVER_PORT": JSON.stringify(
        process.env.SERVER_PORT || "",
      ),
    },
  },
  dev: {
    client: {
      host: "0.0.0.0",
    },
  },
});
