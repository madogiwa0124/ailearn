import type { PromptsCollectionItem } from "@nuxt/content";
import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";

const tiktoken = new Tiktoken(o200k_base);

/**
 * Interface representing the prompt file information
 */
export interface Prompt {
  id: string;
  title: string;
  content: string;
  description: string;
  filename: string;
  tokens: number;
}

export const getAllPrompts = async (): Promise<Prompt[]> => {
  // Fetch prompt files using @nuxt/content module
  const contentFiles = await queryCollection("prompts").all();
  if (!contentFiles || contentFiles.length === 0) return [];

  // Parse each file's content
  return contentFiles.map((file) => buildPrompt(file));
};

export const getPrompt = async (id: string): Promise<Prompt | null> => {
  const path = calcPromptPath(id);
  const file = await queryCollection("prompts").path(`/${path}`).first();
  if (!file) return null;

  return buildPrompt(file);
};

const calcPromptPath = (id: string): string => {
  return id.replace("prompts-", "prompts/").replace("-prompt", ".prompt");
};

const buildPrompt = (file: PromptsCollectionItem): Prompt => {
  // Extract filename
  // example: /prompts/test-prompt.prompt.md => test-prompt.prompt.md
  const filename = `${file.path}.md`.slice(1) || "";
  // Extract ID (use path as ID)
  // example: /prompts/test.prompt.md => prompts-test-prompt
  const id = file.path.slice(1).replace(/\.|\//g, "-");
  // Extract title (use first heading)
  const title = file.title.replace(/\\n/g, "").trim();
  // Extract description (use first paragraph)
  const description = file.rawbody.replace(/\\n/g, "").substring(0, 240);
  const content = file.rawbody.replace(/\\n/g, "\n") || "";
  const tokens = tiktoken.encode(content).length;
  return {
    id,
    title,
    content,
    description,
    filename,
    tokens,
  };
};

// Vitestのインソーステスト - テスト環境でのみ実行される
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("buildPrompt", () => {
    it("通常のプロンプトファイルを正しく処理する", () => {
      const mockFile = {
        path: "/prompts/test-prompt.prompt",
        title: "テスト用プロンプト\\n",
        rawbody:
          "これはテスト用のプロンプトです。\\nさらに詳細な説明が続きます。",
        description: "",
      } as PromptsCollectionItem;

      const result = buildPrompt(mockFile);

      expect(result.id).toBe("prompts-test-prompt-prompt");
      expect(result.title).toBe("テスト用プロンプト");
      expect(result.content).toBe(
        "これはテスト用のプロンプトです。\nさらに詳細な説明が続きます。",
      );
      expect(result.description).toBe(
        "これはテスト用のプロンプトです。さらに詳細な説明が続きます。",
      );
      expect(result.filename).toBe("prompts/test-prompt.prompt.md");
      expect(typeof result.tokens).toBe("number");
    });

    it("空のパスと内容を正しく処理する", () => {
      const emptyFile = {
        path: "",
        title: "",
        rawbody: "",
      } as PromptsCollectionItem;

      const result = buildPrompt(emptyFile);

      expect(result.id).toBe("");
      expect(result.title).toBe("");
      expect(result.content).toBe("");
      expect(result.description).toBe("");
      expect(result.filename).toBe("md");
      expect(result.tokens).toBe(0);
    });

    it("説明を240文字に切り詰める", () => {
      // 300文字の長い説明を持つモックファイル
      const longDescriptionFile = {
        path: "/prompts/long-description.prompt",
        title: "長い説明のテスト\\n",
        rawbody: "".padStart(300, "あ"),
      } as PromptsCollectionItem;

      const result = buildPrompt(longDescriptionFile);

      expect(result.description.length).toBe(240);
      expect(result.description).toBe("".padStart(240, "あ"));
    });
  });
}
