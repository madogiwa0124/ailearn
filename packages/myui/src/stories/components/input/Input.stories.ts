import type { Meta, StoryObj } from "@storybook/html";
import { expect } from "@storybook/test";

const meta: Meta = {
  title: "Components/Input",
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    inputType: {
      control: {
        type: "select",
      },
      options: ["text", "email", "password", "number", "date", "color", "file"],
    },
    block: { control: "boolean" },
    disabled: { control: "boolean" },
    onInput: { action: "input" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないカスタムInputコンポーネント。カスケードレイヤーを使用したCSS設計を採用しています。",
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // NOTE: This rule is disabled because the input element is not required in storybook.
            // https://dequeuniversity.com/rules/axe/4.10/select-name?application=RuleDescription
            // https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-20-level-a--aa-rules
            id: "select-name",
            enabled: false,
          },
          {
            // NOTE: This rule is disabled because the input element is not required in storybook.
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
    const input = document.createElement("input");
    input.className = "input";
    input.classList.toggle("--block", args.block);
    input.placeholder = args.placeholder;
    input.type = args.inputType;
    input.disabled = args.disabled;
    input.addEventListener("input", (event) => {
      const target = event.target as HTMLInputElement;
      args.onInput(target.value);
    });

    return input;
  },
  args: {
    placeholder: "Type something...",
    inputType: "text",
    block: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const input = canvas.querySelector("input") as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input).toHaveClass("input");
    expect(input).not.toBeDisabled();
  },
};

export const Types: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style =
      "display: flex; flex-direction: column; gap: 10px; width: 350px;";
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.placeholder = "type text";
    const emailInput = document.createElement("input");
    emailInput.className = "input";
    emailInput.type = "email";
    emailInput.placeholder = "type email";
    const passwordInput = document.createElement("input");
    passwordInput.className = "input";
    passwordInput.type = "password";
    passwordInput.placeholder = "type password";
    const numericInput = document.createElement("input");
    numericInput.className = "input";
    numericInput.type = "number";
    numericInput.placeholder = "type number";
    const dateInput = document.createElement("input");
    dateInput.className = "input";
    dateInput.type = "date";
    dateInput.placeholder = "type date";
    const colorInput = document.createElement("input");
    colorInput.className = "input";
    colorInput.type = "color";
    colorInput.value = "#ff0000";
    const fileInput = document.createElement("input");
    fileInput.className = "input";
    fileInput.type = "file";
    fileInput.accept = ".txt, .pdf";

    container.appendChild(input);
    container.appendChild(numericInput);
    container.appendChild(emailInput);
    container.appendChild(passwordInput);
    container.appendChild(dateInput);
    container.appendChild(colorInput);
    container.appendChild(fileInput);
    return container;
  },
};

export const Disabled: Story = {
  render: () => {
    const input = document.createElement("input");
    input.className = "input";
    input.value = "Disabled text field";
    input.disabled = true;
    return input;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const input = canvas.querySelector("input") as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input).toHaveClass("input");
    expect(input).toBeDisabled();
  },
};

export const Invalid: Story = {
  render: () => {
    const form = document.createElement("form");
    form.className = "input-form";
    form.noValidate = true;

    const input = document.createElement("input");
    input.className = "input";
    input.required = true;
    form.appendChild(input);
    form.reportValidity();
    return form;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const input = canvas.querySelector("input") as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input).toHaveClass("input invalid");
  },
};

export const Placeholder: Story = {
  render: () => {
    const input = document.createElement("input");
    input.className = "input";
    input.placeholder = "Placeholder text";
    return input;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const input = canvas.querySelector("input") as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input).toHaveClass("input");
  },
};

export const Block: Story = {
  render: () => {
    const input = document.createElement("input");
    input.className = "input --block";
    input.placeholder = "Block level input";
    return input;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const input = canvas.querySelector("input") as HTMLInputElement;

    expect(input).not.toBeNull();
    expect(input).toHaveClass("input --block");
  },
};
