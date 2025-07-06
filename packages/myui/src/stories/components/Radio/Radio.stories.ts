import type { Meta, StoryObj } from "@storybook/html";
import { createRadio, createRadioWithLabel } from "./Radio";
import { expect, userEvent } from "@storybook/test";

const meta: Meta = {
  title: "Components/Radio",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないカスタムRadioコンポーネント。カスケードレイヤーを使用したCSS設計を採用しています。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    return createRadio();
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const radio = canvas.querySelector(
      "input[type='radio']",
    ) as HTMLInputElement;

    expect(radio).not.toBeNull();
    expect(radio).toHaveClass("radio");
    expect(radio).not.toBeChecked();
    expect(radio).not.toBeDisabled();

    await userEvent.click(radio);
    expect(radio).toBeChecked();
  },
};

export const Checked: Story = {
  render: () => {
    const checked = createRadio({
      name: "radio-checked",
      value: "radio-checked",
      checked: true,
    });
    const notChecked = createRadio({
      name: "radio-checked",
      value: "radio-checked",
      checked: false,
    });
    const root = document.createElement("div");
    root.style.display = "flex";
    root.style.flexDirection = "column";
    root.style.gap = "10px";
    root.appendChild(checked);
    root.appendChild(notChecked);
    root.classList.add("radio-group");
    return root;
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const radio = canvas.querySelector(
      "input[type='radio']",
    ) as HTMLInputElement;

    expect(radio).not.toBeNull();
    expect(radio).toHaveClass("radio");
    expect(radio).toBeChecked();
    expect(radio).toHaveAttribute("name", "radio-checked");
    expect(radio).toHaveAttribute("value", "radio-checked");
  },
};

export const Disabled: Story = {
  render: () => {
    return createRadio({
      name: "radio-disabled",
      value: "radio-disabled",
      disabled: true,
    });
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const radio = canvas.querySelector(
      "input[type='radio']",
    ) as HTMLInputElement;

    expect(radio).not.toBeNull();
    expect(radio).toHaveClass("radio");
    expect(radio).not.toBeChecked();
    expect(radio).toBeDisabled();
    expect(radio).toHaveAttribute("name", "radio-disabled");
  },
};

export const CheckedDisabled: Story = {
  render: () => {
    return createRadio({
      name: "radio-checked-disabled",
      value: "radio-checked-disabled",
      checked: true,
      disabled: true,
    });
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const radio = canvas.querySelector(
      "input[type='radio']",
    ) as HTMLInputElement;

    expect(radio).not.toBeNull();
    expect(radio).toHaveClass("radio");
    expect(radio).toBeChecked();
    expect(radio).toBeDisabled();
    expect(radio).toHaveAttribute("name", "radio-checked-disabled");
    expect(radio).toHaveAttribute("value", "radio-checked-disabled");
  },
};

export const WithLabel: Story = {
  render: () => {
    return createRadioWithLabel(
      {
        name: "radio-with-label",
        value: "radio-with-label",
        id: "radio-with-label",
      },
      "この選択肢を選ぶ",
    );
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const radio = canvas.querySelector(
      "input[type='radio']",
    ) as HTMLInputElement;
    const label = canvas.querySelector("label") as HTMLLabelElement;

    expect(radio).not.toBeNull();
    expect(radio).toHaveAttribute("id", "radio-with-label");
    expect(radio).toHaveAttribute("name", "radio-with-label");
    expect(radio).toHaveAttribute("value", "radio-with-label");

    expect(label).not.toBeNull();
    expect(label).toHaveAttribute("for", "radio-with-label");
    expect(label).toHaveTextContent("この選択肢を選ぶ");

    expect(radio).not.toBeChecked();

    await userEvent.click(label);
    expect(radio).toBeChecked();
  },
};
