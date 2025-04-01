import { describe, it, expect, vi } from "vitest";
import * as utilPrompts from "~/utils/prompts";
import { usePrompts, usePrompt } from "~/composables/usePrompt";
import type { Prompt } from "~/utils/prompts";
import { afterEach } from "node:test";
import { flushPromises } from "@vue/test-utils";

const mockPrompts: Prompt[] = [
  {
    id: "prompts-test-prompt",
    title: "Test Prompt",
    content: "Test content",
    description: "Test description",
    filename: "test-prompt.prompt.md",
    tokens: 10,
  },
  {
    id: "prompts-another-prompt",
    title: "Another Prompt",
    content: "Another content",
    description: "Another description",
    filename: "another-prompt.prompt.md",
    tokens: 15,
  },
];

describe("usePrompts", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("正常にプロンプト一覧を取得できること", async () => {
    vi.spyOn(utilPrompts, "getAllPrompts").mockResolvedValue(mockPrompts);
    const { prompts, pending, error } = usePrompts();
    await flushPromises();
    expect(utilPrompts.getAllPrompts).toHaveBeenCalledTimes(1);
    expect(prompts.value).toEqual(mockPrompts);
    expect(pending.value).toBe(false);
    expect(error.value).toBe(null);
  });

  it("promptPathが正しいパスを返すこと", () => {
    const { promptPath } = usePrompts();
    const path = promptPath(mockPrompts[0]);

    expect(path).toBe(`/prompts/${mockPrompts[0].id}`);
  });

  it("エラー発生時にからの配列を返すこと", async () => {
    vi.spyOn(utilPrompts, "getAllPrompts").mockRejectedValueOnce(
      new Error("Test error"),
    );
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { prompts, error } = usePrompts();
    await flushPromises();

    expect(utilPrompts.getAllPrompts).toHaveBeenCalledTimes(1);
    expect(prompts.value).toEqual([]);
    expect(error.value).toBe(null); // エラーはcatchされて空配列が返されるため
  });
});

describe("usePrompt", () => {
  it("指定したIDのプロンプトを取得できること", async () => {
    vi.spyOn(utilPrompts, "getPrompt").mockResolvedValue(mockPrompts[0]);
    const promptId = "prompts-test-prompt";
    const { prompt, pending, error } = usePrompt(promptId);
    await flushPromises();

    expect(utilPrompts.getPrompt).toHaveBeenCalledTimes(1);
    expect(utilPrompts.getPrompt).toHaveBeenCalledWith(promptId);
    expect(prompt.value).toEqual(mockPrompts[0]);
    expect(pending.value).toBe(false);
    expect(error.value).toBe(null);
  });
  it("IDが無効な場合はnullが返されること", async () => {
    const promptId = "invalid-id";
    vi.spyOn(utilPrompts, "getPrompt").mockResolvedValue(null);
    const { prompt, pending, error } = usePrompt(promptId);
    await flushPromises();

    expect(utilPrompts.getPrompt).toHaveBeenCalledTimes(1);
    expect(utilPrompts.getPrompt).toHaveBeenCalledWith(promptId);
    expect(prompt.value).toBeNull();
    expect(pending.value).toBe(false);
    expect(error.value).toBe(null);
  });

  it("エラー発生時にnullを返すこと", async () => {
    const promptId = "error-id";
    vi.spyOn(utilPrompts, "getPrompt").mockRejectedValueOnce(
      new Error("Test error"),
    );
    const { prompt, error } = usePrompt(promptId);
    await flushPromises();

    expect(utilPrompts.getPrompt).toHaveBeenCalledTimes(1);
    expect(prompt.value).toBeNull();
    expect(error.value).toBe(null); // エラーはcatchされてnullが返されるため
  });
});
