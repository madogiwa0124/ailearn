import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import path from "node:path";

const targetPromptPath = path.resolve("../../", ".github");

export default defineContentConfig({
  collections: {
    prompts: defineCollection({
      type: "page",
      source: {
        cwd: targetPromptPath,
        include: "**/*.md",
      },
      schema: z.object({
        rawbody: z.string(),
      }),
    }),
  },
});
