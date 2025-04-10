import { Meta, StoryObj } from "@storybook/html";
import { createParagraph, ParagraphProps } from "./Paragraph";

const meta: Meta<ParagraphProps> = {
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
    a11y: {
      config: {
        rules: [
          {
            id: "document-structure",
            reviewOnFail: true,
          },
        ],
      },
    },
  },
};

export default meta;
type Story = StoryObj<ParagraphProps>;

/**
 * デフォルトのパラグラフを表示する基本ストーリー
 */
export const Default: Story = {
  render: (args) => {
    return createParagraph(args);
  },
  args: {
    text: "これはサンプルテキストです。パラグラフは複数の文をグループ化し、関連する情報を一緒に表示するために使用されます。",
    className: "",
  },
};

/**
 * 複数のパラグラフを表示するストーリー
 */
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
};

/**
 * カスタムクラスが適用されたパラグラフを表示するストーリー
 */
export const CustomStyledParagraphs: Story = {
  render: () => {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "20px";

    const normalParagraph = createParagraph({
      text: "通常のパラグラフスタイルです。",
    });

    const customParagraph1 = createParagraph({
      text: "中央揃えのテキストです。",
      className: "text-center",
    });
    customParagraph1.style.textAlign = "center"; // デモ用にインラインスタイルを適用

    const customParagraph2 = createParagraph({
      text: "右揃えのテキストです。",
      className: "text-right",
    });
    customParagraph2.style.textAlign = "right"; // デモ用にインラインスタイルを適用

    container.appendChild(normalParagraph);
    container.appendChild(customParagraph1);
    container.appendChild(customParagraph2);

    return container;
  },
};
