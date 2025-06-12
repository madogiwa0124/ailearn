import type { Meta, StoryObj } from "@storybook/html";
import { createVariableElements } from "./Variables";

const meta: Meta = {
  title: "Variables",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "このストーリーは、フレームワークに依存しないカスタムボタンコンポーネントの変数を定義しています。カスケードレイヤーを使用したCSS設計を採用しています。",
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
    const storyRootElement =
      document.querySelector<HTMLEmbedElement>("#storybook-root") ??
      document.body;
    return createVariableElements(storyRootElement);
  },
  args: {
    label: "Button",
    variant: "primary",
    outline: false,
    block: false,
    disabled: false,
  },
};
