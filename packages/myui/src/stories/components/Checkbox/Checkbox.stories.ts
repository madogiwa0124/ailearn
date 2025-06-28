import type { Meta, StoryObj } from "@storybook/html";
import { createCheckbox, createCheckboxWithLabel } from "./Checkbox";
import { expect, userEvent } from "@storybook/test";

const meta: Meta = {
  title: "Components/Checkbox",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないカスタムCheckboxコンポーネント。カスケードレイヤーを使用したCSS設計を採用しています。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    return createCheckbox();
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const checkbox = canvas.querySelector(
      "input[type='checkbox']",
    ) as HTMLInputElement;

    expect(checkbox).not.toBeNull();
    expect(checkbox).toHaveClass("checkbox");
    expect(checkbox).not.toBeChecked();
    expect(checkbox).not.toBeDisabled();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  },
};

export const Checked: Story = {
  render: () => {
    return createCheckbox({
      name: "checkbox-checked",
      value: "checkbox-checked",
      checked: true,
    });
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const checkbox = canvas.querySelector(
      "input[type='checkbox']",
    ) as HTMLInputElement;

    expect(checkbox).not.toBeNull();
    expect(checkbox).toHaveClass("checkbox");
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  },
};

export const Disabled: Story = {
  render: () => {
    return createCheckbox({
      name: "checkbox-disabled",
      value: "checkbox-disabled",
      disabled: true,
    });
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const checkbox = canvas.querySelector(
      "input[type='checkbox']",
    ) as HTMLInputElement;

    expect(checkbox).not.toBeNull();
    expect(checkbox).toHaveClass("checkbox");
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toBeDisabled();
  },
};

export const CheckedDisabled: Story = {
  render: () => {
    return createCheckbox({
      name: "checkbox-checked-disabled",
      value: "checkbox-checked-disabled",
      checked: true,
      disabled: true,
    });
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const checkbox = canvas.querySelector(
      "input[type='checkbox']",
    ) as HTMLInputElement;

    expect(checkbox).not.toBeNull();
    expect(checkbox).toHaveClass("checkbox");
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeDisabled();
  },
};

export const WithLabel: Story = {
  render: () => {
    return createCheckboxWithLabel(
      {
        name: "checkbox-with-label",
        value: "checkbox-with-label",
        id: "checkbox-with-label",
      },
      "利用規約に同意する",
    );
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const checkbox = canvas.querySelector(
      "input[type='checkbox']",
    ) as HTMLInputElement;
    const label = canvas.querySelector("label") as HTMLLabelElement;
    expect(checkbox).not.toBeNull();
    expect(label).not.toBeNull();
    expect(label).toHaveAttribute("for", "checkbox-with-label");
    expect(label).toHaveTextContent("利用規約に同意する");

    expect(checkbox).not.toBeChecked();

    await userEvent.click(label);
    expect(checkbox).toBeChecked();

    await userEvent.click(label);
    expect(checkbox).not.toBeChecked();
  },
};
