import type { Meta, StoryObj } from "@storybook/html";
import { createButton, type ButtonProps } from "./Button";
import { expect } from "@storybook/test";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: {
        type: "select",
      },
      options: ["primary", "secondary", "success", "danger", "warning"],
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
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Default: Story = {
  render: (args) => {
    return createButton(args);
  },
  args: {
    label: "Button",
    variant: "primary",
    outline: false,
    block: false,
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const button = canvas.querySelector("button");

    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent("Button");
    expect(button).toHaveClass("btn");
  },
};

export const Variants: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "d-flex";
    container.style.gap = "10px";

    const variants: Array<ButtonProps["variant"]> = [
      "primary",
      "secondary",
      "tertiary",
    ];

    for (const variant of variants) {
      const button = createButton({
        label: variant ? variant : "",
        variant,
      });
      container.appendChild(button);
    }

    return container;
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const buttons = canvas.querySelectorAll("button");
    buttons.forEach((button, index) => {
      const variant = ["primary", "secondary", "tertiary"][index];
      expect(button).toHaveClass("btn");
      expect(button).toHaveClass(`--${variant}`);
      expect(button).toHaveTextContent(variant);
    });
  },
};

export const OutlineButtons: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "d-flex";
    container.style.gap = "10px";

    const variants: Array<ButtonProps["variant"]> = [
      "primary",
      "secondary",
      "tertiary",
    ];

    for (const variant of variants) {
      const button = createButton({
        label: variant || "",
        variant,
        outline: true,
      });
      container.appendChild(button);
    }

    return container;
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const buttons = canvas.querySelectorAll("button");
    buttons.forEach((button, index) => {
      const variant = ["primary", "secondary", "tertiary"][index];
      expect(button).toHaveClass("btn");
      expect(button).toHaveClass(`--${variant}`);
      expect(button).toHaveClass("--outline");
      expect(button).toHaveTextContent(variant);
    });
  },
};

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
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const button = canvas.querySelector("button");
    expect(button).toHaveClass("btn");
    expect(button).toHaveStyle({
      display: "block",
    });
  },
};

export const RoundedButton: Story = {
  render: () => {
    const container = document.createElement("div");
    const button = createButton({
      label: "Block Button",
      variant: "primary",
      rounded: true,
    });
    container.appendChild(button);
    const outlineButton = createButton({
      label: "Block Button",
      variant: "primary",
      outline: true,
      rounded: true,
    });
    container.appendChild(outlineButton);

    return container;
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const buttons = canvas.querySelectorAll("button");

    // 丸みのあるボタンが正しくスタイルされていることを確認
    for (const button of buttons) {
      expect(button).toHaveClass("btn");
      expect(button).toHaveStyle({
        borderRadius: "9999px", // 例として、非常に丸い角を指定
      });
    }
  },
};

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
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const buttons = canvas.querySelectorAll("button");

    const disabledButton = buttons[1];
    expect(disabledButton).toBeDisabled();

    const normalButton = buttons[0];
    expect(normalButton).not.toBeDisabled();
  },
};

export const WithIconButton: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "d-flex";
    container.style.gap = "10px";

    const buttonWithIcon = createButton({
      label: "Button with Icon",
      variant: "primary",
    });

    // アイコンを追加
    const icon = document.createElement("span");
    icon.className = "icon"; // アイコンのクラス名
    icon.textContent = "+"; // ここでは簡単なテキストアイコンを使用
    buttonWithIcon.prepend(icon);

    container.appendChild(buttonWithIcon);

    return container;
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const button = canvas.querySelector("button");
    const icon = button?.querySelector(".icon");

    expect(button).toHaveClass("btn");
    expect(button).toHaveTextContent("Button with Icon");
    expect(icon).not.toBeNull();
    expect(icon).toHaveTextContent("+");
  },
};

export const IconOnlyButton: Story = {
  render: () => {
    const container = document.createElement("div");
    container.className = "d-flex";
    container.style.gap = "10px";

    const buttonWithIcon = createButton({
      label: "",
      variant: "primary",
      iconOnly: true,
    });

    // アイコンを追加
    const icon = document.createElement("span");
    icon.className = "icon"; // アイコンのクラス名
    icon.textContent = "";
    icon.textContent = "+"; // ここでは簡単なテキストアイコンを使用
    buttonWithIcon.prepend(icon);

    container.appendChild(buttonWithIcon);

    return container;
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const button = canvas.querySelector("button");
    const icon = button?.querySelector(".icon");

    expect(button).toHaveClass("btn");
    expect(button).toHaveClass("--icon-only");
    expect(icon).not.toBeNull();
    expect(icon).toHaveTextContent("+");
  },
};
