import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import path from "node:path";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: {
        cwd: path.resolve("../../", ".github", "prompts"),
        include: "**/*.md",
      },
      schema: z.object({
        rawbody: z.string(),
      }),
    }),
  },
});
