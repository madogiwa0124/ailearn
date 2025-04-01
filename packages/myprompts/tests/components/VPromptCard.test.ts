import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import VPromptCard from "~/components/VPromptCard.vue";
import type { Prompt } from "~/utils/prompts";

// モックデータ
const mockPrompt: Prompt = {
  id: "test-prompt",
  title: "Test Prompt Title",
  description: "This is a test prompt description",
  content: "Test prompt content",
  filename: "test-prompt.prompt.md",
  tokens: 10,
};

const buildWrapper = () => {
  return mount(VPromptCard, {
    props: {
      prompt: { ...mockPrompt },
      promptPath: `/prompts/${mockPrompt.id}`,
    },
    global: {
      stubs: {
        NuxtLink: true,
      },
    },
  });
};

describe("VPromptCard", () => {
  it("コンポーネントがマウントできること", () => {
    const wrapper = buildWrapper();
    expect(wrapper.exists()).toBeTruthy();
  });

  it("プロンプトのタイトルが正しく表示されること", () => {
    const wrapper = buildWrapper();
    expect(wrapper.text()).toContain(mockPrompt.title);
  });

  it("プロンプトの説明が正しく表示されること", () => {
    const wrapper = buildWrapper();
    expect(wrapper.text()).toContain(mockPrompt.description);
  });

  it("プロンプトのIDが表示されること", async () => {
    const wrapper = buildWrapper();
    expect(wrapper.text()).toContain(mockPrompt.id);
  });

  it("View Detailsリンクが正しいURLを持っていること", () => {
    const wrapper = buildWrapper();
    const link = wrapper.findComponent({ name: "NuxtLink" });
    expect(link.exists()).toBeTruthy();
    expect(link.attributes("to")).toBe(`/prompts/${mockPrompt.id}`);
  });
});
