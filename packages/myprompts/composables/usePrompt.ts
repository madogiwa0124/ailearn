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
      return await getAllPrompts();
    } catch (err) {
      console.error("Error loading prompts:", err);
      return [];
    }
  });

  const promptPath = (prompt: Prompt) => {
    return `/prompts/${prompt.id}`;
  };

  const pending = computed(() => status.value === "pending");

  return {
    prompts,
    pending,
    error,
    refresh,
    promptPath,
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
      return await getPrompt(id);
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
