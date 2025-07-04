import type { Meta, StoryObj } from "@storybook/html";
import { expect } from "@storybook/test";

interface ParagraphArgs {
  text: string;
  className: string;
}

const meta: Meta<ParagraphArgs> = {
  title: "Components/Paragraph",
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    className: { control: "text" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "フレームワークに依存しないパラグラフコンポーネント。カスケードレイヤーを使用したCSS設計を採用しています。",
      },
    },
  },
};

export default meta;
type Story = StoryObj<ParagraphArgs>;

const createParagraph = (
  props: { text?: string; className?: string } = {},
): HTMLElement => {
  const { text = "パラグラフのテキスト", className = "" } = props;

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  paragraph.classList.add("paragraph");

  if (className) {
    paragraph.classList.add(className);
  }

  return paragraph;
};

export const Default: Story = {
  render: (args) => {
    return createParagraph(args);
  },
  args: {
    text: "これはサンプルテキストです。パラグラフは複数の文をグループ化し、関連する情報を一緒に表示するために使用されます。",
    className: "",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = canvasElement as HTMLElement;
    const paragraph = canvas.querySelector("p") as HTMLParagraphElement;

    expect(paragraph).not.toBeNull();
    expect(paragraph).toHaveTextContent(args.text || "");
    expect(paragraph.tagName.toLowerCase()).toBe("p");
    expect(paragraph).toHaveClass("paragraph");
  },
};

export const MultipleParagraphs: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "0"; // 間隔はCSSで制御するためここでは設定しない

    const paragraph1 = createParagraph({
      text: "1つ目のパラグラフです。段落の間には適切な間隔が自動的に設定されます。",
    });

    const paragraph2 = createParagraph({
      text: "2つ目のパラグラフです。段落の間には適切な間隔が自動的に設定されます。",
    });

    const paragraph3 = createParagraph({
      text: "3つ目のパラグラフです。段落の間には適切な間隔が自動的に設定されます。",
    });

    container.appendChild(paragraph1);
    container.appendChild(paragraph2);
    container.appendChild(paragraph3);

    return container;
  },
  play: async ({ canvasElement }) => {
    const canvas = canvasElement as HTMLElement;
    const paragraphs = canvas.querySelectorAll("p");

    expect(paragraphs).toHaveLength(3);

    const expectedTexts = [
      "1つ目のパラグラフです。段落の間には適切な間隔が自動的に設定されます。",
      "2つ目のパラグラフです。段落の間には適切な間隔が自動的に設定されます。",
      "3つ目のパラグラフです。段落の間には適切な間隔が自動的に設定されます。",
    ];

    for (const [index, paragraph] of paragraphs.entries()) {
      expect(paragraph).not.toBeNull();
      expect(paragraph.tagName.toLowerCase()).toBe("p");
      expect(paragraph).toHaveClass("paragraph");
      expect(paragraph).toHaveTextContent(expectedTexts[index]);
    }
  },
};
