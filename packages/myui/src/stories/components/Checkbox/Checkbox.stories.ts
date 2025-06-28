import type { Meta, StoryObj } from "@storybook/html";
import { createCheckbox, createCheckboxWithLabel } from "./Checkbox";

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
};
