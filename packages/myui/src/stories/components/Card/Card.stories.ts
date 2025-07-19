import type { Meta, StoryObj } from "@storybook/html";
import { createCard } from "./Card";
import { expect } from "@storybook/test";
import exampleImage from "./320x240.png";

const meta: Meta = {
  title: "Components/Card",
  tags: ["autodocs"],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないカスタムCardコンポーネント。BEMの命名規則とカスケードレイヤーを使用したCSS設計を採用しています。",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    return createCard({
      content: `
      <p style='font-weight: bold; margin-bottom: 4px;'>カードタイトル</p>
      <p>これはカードの本文です。ここにメインコンテンツが表示されます。</p>
      `,
    });
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const card = canvas.querySelector(".card") as HTMLDivElement;
    const content = canvas.querySelector(".card__content") as HTMLDivElement;

    expect(card).not.toBeNull();
    expect(card).toHaveClass("card");
    expect(content).toHaveTextContent("カードタイトル");
    expect(content).toHaveTextContent("これはカードの本文です。");
  },
};

export const Floating: Story = {
  render: () => {
    return createCard({
      content: `
      <p style='font-weight: bold; margin-bottom: 8px;'>カードタイトル</p>
      <p>これはカードの本文です。ここにメインコンテンツが表示されます。</p>
      `,
      floating: true,
    });
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const card = canvas.querySelector(".card") as HTMLDivElement;

    expect(card).not.toBeNull();
    expect(card).toHaveClass("card");
    expect(card).toHaveClass("--floating");
  },
};

export const WithImage: Story = {
  render: () => {
    return createCard({
      content: `
      <p style='font-weight: bold; margin-bottom: 8px;'>カードタイトル</p>
      <p>これはカードの本文です。ここにメインコンテンツが表示されます。</p>
      `,
      image: exampleImage,
      style: "width: 320px; height: auto;",
    });
  },
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const card = canvas.querySelector(".card") as HTMLDivElement;
    const image = canvas.querySelector(".card__image") as HTMLImageElement;

    expect(card).not.toBeNull();
    expect(image).not.toBeNull();
    expect(image).toHaveAttribute("src", exampleImage);
  },
};
