import type { Meta, StoryObj } from "@storybook/html";
// import { createButton, type ButtonProps } from "./Checkbox";

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
    a11y: {
      // アクセシビリティチェックの設定
      config: {
        rules: [
          {
            // コントラスト比のチェック
            id: "color-contrast",
            reviewOnFail: true,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * デフォルトのボタンを表示する基本ストーリー
 */
export const Default: Story = {
  render: (args) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.name = "checkbox";
    checkbox.value = "checkbox";
    return checkbox;
  },
  args: {},
};
