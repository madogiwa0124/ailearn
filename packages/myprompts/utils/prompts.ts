import type { ContentCollectionItem } from "@nuxt/content";

/**
 * Interface representing the prompt file information
 */
export interface Prompt {
  id: string;
  title: string;
  content: string;
  description: string;
  filename: string;
}

const buildPrompt = (file: ContentCollectionItem): Prompt => {
  // Extract ID from filename (example: a11y.prompt.md -> a11y)
  const filename = `${file.path}.md`.split("/").pop() || "";
  const id = filename.replace(".prompt.md", "");
  // Extract title (use first heading)
  const title = file.title.replace("\\n", "");
  // Extract description (use first paragraph)
  const description = file.description.replace("\\n", "");
  const content = file.rawbody.replace(/\\n/g, "\n") || "";
  return {
    id,
    title,
    content,
    description,
    filename,
  };
};

/**
 * Composable function to fetch all prompts
 */
export const usePrompts = () => {
  // Composable function to fetch content
  const {
    data: prompts,
    error,
    status,
    refresh,
  } = useAsyncData("all-prompts", async () => {
    try {
      // Fetch prompt files using @nuxt/content module
      const contentFiles = await queryCollection("content").all();
      if (!contentFiles || contentFiles.length === 0) return [];

      // Parse each file's content
      return contentFiles.map((file) => buildPrompt(file));
    } catch (err) {
      console.error("Error loading prompts:", err);
      return [];
    }
  });

  const pending = computed(() => status.value === "pending");

  return {
    prompts,
    pending,
    error,
    refresh,
  };
};

/**
 * Composable function to fetch a specific prompt by ID
 */
export const usePrompt = (id: string) => {
  const {
    data: prompt,
    error,
    status,
    refresh,
  } = useAsyncData(`prompt-${id}`, async () => {
    try {
      const file = await queryCollection("content")
        .path(`/${id}.prompt`)
        .first();

      if (!file) return null;

      return buildPrompt(file);
    } catch (err) {
      console.error(`Error fetching prompt with ID ${id}:`, err);
      return null;
    }
  });

  const pending = computed(() => status.value === "pending");

  return {
    prompt,
    pending,
    error,
    refresh,
  };
};

/**
 * Function to fetch all prompt files (for backward compatibility)
 */
export const getAllPrompts = async (): Promise<Prompt[]> => {
  const { prompts } = usePrompts();
  return prompts.value || [];
};

/**
 * Function to fetch a specific prompt by ID (for backward compatibility)
 */
export const getPromptById = async (id: string): Promise<Prompt | null> => {
  const { prompt } = usePrompt(id);
  return prompt.value || null;
};

/**
 * Function to generate the path for a specific prompt
 */
export const promptPath = (prompt: Prompt) => {
  return `/prompts/${prompt.id}`;
};
