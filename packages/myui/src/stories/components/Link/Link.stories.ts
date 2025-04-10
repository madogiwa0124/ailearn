import { Meta, StoryObj } from "@storybook/html";
import { createLink, LinkProps } from "./Link";

const meta: Meta<LinkProps> = {
  title: "Components/Link",
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    href: { control: "text" },
    newTab: { control: "boolean" },
    className: { control: "text" },
    onClick: { action: "clicked" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないリンクコンポーネント。カスケードレイヤーを使用したCSS設計を採用しています。",
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: "link-name",
            reviewOnFail: true,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<LinkProps>;

/**
 * デフォルトのリンクを表示する基本ストーリー
 */
export const Default: Story = {
  render: (args) => {
    return createLink(args);
  },
  args: {
    text: "リンクテキスト",
    href: "https://example.com",
    newTab: false,
    className: "",
  },
};

/**
 * 新しいタブで開くリンクを表示するストーリー
 */
export const NewTabLink: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "10px";

    const regularLink = createLink({
      text: "通常リンク",
      href: "https://example.com",
      newTab: false,
    });

    const newTabLink = createLink({
      text: "新しいタブで開くリンク",
      href: "https://example.com",
      newTab: true,
    });

    container.appendChild(regularLink);
    container.appendChild(newTabLink);

    return container;
  },
};

/**
 * パラグラフ内のリンクを表示するストーリー
 */
export const LinkInParagraph: Story = {
  render: () => {
    const container = document.createElement("div");

    const paragraph = document.createElement("p");
    paragraph.textContent = "これは文章内に";

    const link = createLink({
      text: "リンク",
      href: "https://example.com",
    });

    paragraph.appendChild(link);
    paragraph.appendChild(document.createTextNode("が含まれている例です。"));

    container.appendChild(paragraph);

    return container;
  },
};
