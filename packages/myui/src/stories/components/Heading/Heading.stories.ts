import type { Meta, StoryObj } from "@storybook/html";
import { createHeading, type HeadingProps } from "./Heading";

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
    a11y: {
      config: {
        rules: [
          {
            id: "heading-order",
            reviewOnFail: true,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<HeadingProps>;

/**
 * デフォルトのヘディングを表示する基本ストーリー
 */
export const Default: Story = {
  render: (args) => {
    return createHeading(args);
  },
  args: {
    text: "見出しテキスト",
    level: 1,
    className: "",
  },
};

/**
 * すべてのヘディングレベルを表示するストーリー
 */
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
};
