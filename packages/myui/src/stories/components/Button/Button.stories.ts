import { Meta, StoryObj } from "@storybook/html";
import { createButton, ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: {
        type: "select",
        options: ["primary", "secondary", "success", "danger", "warning"],
      },
    },
    size: {
      control: { type: "select", options: ["", "sm", "lg"] },
    },
    outline: { control: "boolean" },
    block: { control: "boolean" },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないカスタムボタンコンポーネント。カスケードレイヤーを使用したCSS設計を採用しています。",
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
type Story = StoryObj<ButtonProps>;

/**
 * デフォルトのボタンを表示する基本ストーリー
 */
export const Default: Story = {
  render: (args) => {
    return createButton(args);
  },
  args: {
    label: "Button",
    variant: "primary",
    size: "",
    outline: false,
    block: false,
    disabled: false,
  },
};

/**
 * すべてのボタン種類（バリアント）を表示するストーリー
 */
export const Variants: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "d-flex";
    container.style.gap = "10px";

    const variants: Array<ButtonProps["variant"]> = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
    ];

    variants.forEach((variant) => {
      const button = createButton({
        label: variant
          ? variant.charAt(0).toUpperCase() + variant.slice(1)
          : "",
        variant,
      });
      container.appendChild(button);
    });

    return container;
  },
};

/**
 * アウトラインスタイルのボタンを表示するストーリー
 */
export const OutlineButtons: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "d-flex";
    container.style.gap = "10px";

    const variants: Array<ButtonProps["variant"]> = [
      "primary",
      "secondary",
      "success",
      "danger",
      "warning",
    ];

    variants.forEach((variant) => {
      const button = createButton({
        label: variant || "",
        variant,
        outline: true,
      });
      container.appendChild(button);
    });

    return container;
  },
};

/**
 * 異なるサイズのボタンを表示するストーリー
 */
export const Sizes: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "d-flex align-items-center";
    container.style.gap = "10px";

    const sizes: Array<{ name: ButtonProps["size"]; label: string }> = [
      { name: "sm", label: "Small" },
      { name: "", label: "Default" },
      { name: "lg", label: "Large" },
    ];

    sizes.forEach((size) => {
      const button = createButton({
        label: size.label,
        variant: "primary",
        size: size.name,
      });
      container.appendChild(button);
    });

    return container;
  },
};

/**
 * ブロック幅のボタンを表示するストーリー
 */
export const BlockButton: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.width = "100%";

    const button = createButton({
      label: "Block Button",
      variant: "primary",
      block: true,
    });
    container.appendChild(button);

    return container;
  },
};

/**
 * 無効化されたボタンを表示するストーリー
 */
export const DisabledButton: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "d-flex";
    container.style.gap = "10px";

    const normalButton = createButton({
      label: "Normal Button",
      variant: "primary",
    });

    const disabledButton = createButton({
      label: "Disabled Button",
      variant: "primary",
      disabled: true,
    });

    container.appendChild(normalButton);
    container.appendChild(disabledButton);

    return container;
  },
};
