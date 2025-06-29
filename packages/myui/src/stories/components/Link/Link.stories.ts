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

    expect(paragraph.contains(link)).toBe(true);
    expect(paragraph.textContent).toContain("これは文章内に");
    expect(paragraph.textContent).toContain("リンク");
    expect(paragraph.textContent).toContain("が含まれている例です。");
  },
};
