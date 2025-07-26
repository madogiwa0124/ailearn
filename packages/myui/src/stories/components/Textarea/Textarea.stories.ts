import type { Meta, StoryObj } from "@storybook/html";
import { expect } from "@storybook/test";

const meta: Meta = {
  title: "Components/Textarea",
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    rows: { control: "number" },
    cols: { control: "number" },
    block: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないカスタムTextareaコンポーネント。カスケードレイヤーを使用したCSS設計を採用しています。",
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // NOTE: This rule is disabled because the textarea element is not required in storybook.
            // https://dequeuniversity.com/rules/axe/4.10/select-name?application=RuleDescription
            // https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-20-level-a--aa-rules
            id: "select-name",
            enabled: false,
          },
          {
            // NOTE: This rule is disabled because the textarea element is not required in storybook.
            // https://dequeuniversity.com/rules/axe/4.10/select-name?application=RuleDescription
            // https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-20-level-a--aa-rules
            id: "label",
            enabled: false,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const textarea = document.createElement("textarea");
    textarea.className = "textarea";
    textarea.classList.toggle("--block", args.block);
    textarea.placeholder = args.placeholder;
    if (args.rows) textarea.rows = args.rows;
    if (args.cols) textarea.cols = args.cols;
    textarea.disabled = args.disabled;
    return textarea;
  },
  args: {
    placeholder: "Type your message here...",
    rows: null,
    cols: null,
    block: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const textarea = canvas.querySelector("textarea") as HTMLTextAreaElement;

    expect(textarea).not.toBeNull();
    expect(textarea).toHaveClass("textarea");
    expect(textarea).not.toBeDisabled();
  },
};

export const Disabled: Story = {
  render: () => {
    const textarea = document.createElement("textarea");
    textarea.className = "textarea";
    textarea.value = "This is a disabled textarea";
    textarea.disabled = true;
    return textarea;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const textarea = canvas.querySelector("textarea") as HTMLTextAreaElement;

    expect(textarea).not.toBeNull();
    expect(textarea).toHaveClass("textarea");
    expect(textarea).toBeDisabled();
  },
};

export const Invalid: Story = {
  render: () => {
    const form = document.createElement("form");
    form.className = "textarea-form";
    form.noValidate = true;

    const textarea = document.createElement("textarea");
    textarea.className = "textarea";
    textarea.required = true;
    form.appendChild(textarea);
    form.reportValidity();
    return form;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const textarea = canvas.querySelector("textarea") as HTMLTextAreaElement;

    expect(textarea).not.toBeNull();
    expect(textarea).toHaveClass("textarea");
    expect(textarea).toBeRequired();
  },
};

export const Placeholder: Story = {
  render: () => {
    const textarea = document.createElement("textarea");
    textarea.className = "textarea";
    textarea.placeholder = "Enter your detailed message here...";
    return textarea;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const textarea = canvas.querySelector("textarea") as HTMLTextAreaElement;

    expect(textarea).not.toBeNull();
    expect(textarea).toHaveClass("textarea");
    expect(textarea).toHaveAttribute(
      "placeholder",
      "Enter your detailed message here...",
    );
  },
};

export const Block: Story = {
  render: () => {
    const textarea = document.createElement("textarea");
    textarea.className = "textarea --block";
    textarea.placeholder = "Block level textarea";
    return textarea;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const textarea = canvas.querySelector("textarea") as HTMLTextAreaElement;

    expect(textarea).not.toBeNull();
    expect(textarea).toHaveClass("textarea");
    expect(textarea).toHaveClass("--block");
  },
};

export const AutoFit: Story = {
  render: () => {
    const textarea = document.createElement("textarea");
    textarea.className = "textarea --auto-fit";
    textarea.placeholder = "Auto-fit textarea";
    return textarea;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const textarea = canvas.querySelector("textarea") as HTMLTextAreaElement;

    expect(textarea).not.toBeNull();
    expect(textarea).toHaveClass("textarea");
    expect(textarea).toHaveClass("--auto-fit");
  },
};
