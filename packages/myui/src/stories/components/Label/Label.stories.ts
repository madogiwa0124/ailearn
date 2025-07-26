import type { Meta, StoryObj } from "@storybook/html";
import { expect } from "@storybook/test";

const meta: Meta = {
  title: "Components/Label",
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないLabelコンポーネント。カスケードレイヤーを使用したCSS設計を採用しています。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.className = "label";
    label.textContent = args.text;
    container.appendChild(label);
    return container;
  },
  args: {
    text: "Label text",
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const label = canvas.querySelector("label") as HTMLLabelElement;

    expect(label).not.toBeNull();
    expect(label).toHaveClass("label");
  },
};

export const WithInput: Story = {
  render: () => {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.className = "label";
    label.textContent = "Input Label";
    label.setAttribute("for", "input-id");

    const input = document.createElement("input");
    input.className = "input";
    input.id = "input-id";
    input.type = "text";
    input.placeholder = "Type here...";

    container.appendChild(label);
    container.appendChild(input);
    return container;
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const label = canvas.querySelector("label") as HTMLLabelElement;
    const input = canvas.querySelector("input") as HTMLInputElement;

    expect(label).not.toBeNull();
    expect(label).toHaveClass("label");
    expect(input).not.toBeNull();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("placeholder", "Type here...");

    label.click();
    expect(document.activeElement).toBe(input);
  },
};
