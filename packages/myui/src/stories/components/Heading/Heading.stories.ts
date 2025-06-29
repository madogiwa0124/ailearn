import type { Meta, StoryObj } from "@storybook/html";
import { createHeading, type HeadingProps } from "./Heading";
import { expect } from "@storybook/test";

const meta: Meta<HeadingProps> = {
  title: "Components/Heading",
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    level: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
    },
    className: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないヘディングコンポーネント。CSSのカスケードレイヤーを使用したスタイル設計を採用しています。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<HeadingProps>;

export const Default: Story = {
  render: (args) => {
    return createHeading(args);
  },
  args: {
    text: "見出しテキスト",
    level: 1,
    className: "",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = canvasElement as HTMLElement;
    const heading = canvas.querySelector("h1") as HTMLHeadingElement;

    expect(heading).not.toBeNull();
    expect(heading).toHaveClass("h1");
    expect(heading).toHaveTextContent(args.text || "見出しテキスト");
    expect(heading.tagName.toLowerCase()).toBe("h1");
  },
};

export const AllHeadings: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "20px";

    for (let level = 1; level <= 6; level++) {
      const heading = createHeading({
        text: `見出しレベル ${level}`,
        level,
      });
      container.appendChild(heading);
    }

    return container;
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;

    // すべてのヘディングレベル（h1-h6）がレンダリングされていることを確認
    for (let level = 1; level <= 6; level++) {
      const heading = canvas.querySelector(`h${level}`) as HTMLHeadingElement;
      expect(heading).not.toBeNull();
      expect(heading).toHaveClass(`h${level}`);
      expect(heading).toHaveTextContent(`見出しレベル ${level}`);
      expect(heading.tagName.toLowerCase()).toBe(`h${level}`);
    }
  },
};
