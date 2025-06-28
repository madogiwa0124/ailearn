import type { Meta, StoryObj } from "@storybook/html";
import { createLink, type LinkProps } from "./Link";
import { expect } from "@storybook/test";

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
  play: async ({ canvasElement, args }) => {
    const canvas = canvasElement as HTMLElement;
    const link = canvas.querySelector("a") as HTMLAnchorElement;

    expect(link).not.toBeNull();
    expect(link).toHaveClass("link");
    expect(link).toHaveTextContent(args.text || "リンクテキスト");
    expect(link).toHaveAttribute("href", args.href || "https://example.com");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
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
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const links = canvas.querySelectorAll("a");

    const regularLink = links[0];
    const newTabLink = links[1];

    // 通常リンクのテスト
    expect(regularLink).not.toBeNull();
    expect(regularLink).toHaveClass("link");
    expect(regularLink).toHaveTextContent("通常リンク");
    expect(regularLink).toHaveAttribute("href", "https://example.com");
    expect(regularLink).not.toHaveAttribute("target");

    // 新しいタブリンクのテスト
    expect(newTabLink).not.toBeNull();
    expect(newTabLink).toHaveClass("link");
    expect(newTabLink).toHaveTextContent("新しいタブで開くリンク");
    expect(newTabLink).toHaveAttribute("href", "https://example.com");
    expect(newTabLink).toHaveAttribute("target", "_blank");
    expect(newTabLink).toHaveAttribute("rel", "noopener noreferrer");
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
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const paragraph = canvas.querySelector("p") as HTMLParagraphElement;
    const link = canvas.querySelector("a") as HTMLAnchorElement;

    expect(paragraph).not.toBeNull();
    expect(link).not.toBeNull();
    expect(link).toHaveClass("link");
    expect(link).toHaveTextContent("リンク");
    expect(link).toHaveAttribute("href", "https://example.com");

    // パラグラフ内にリンクが含まれていることを確認
    expect(paragraph.contains(link)).toBe(true);
    expect(paragraph.textContent).toContain("これは文章内に");
    expect(paragraph.textContent).toContain("リンク");
    expect(paragraph.textContent).toContain("が含まれている例です。");
  },
};
