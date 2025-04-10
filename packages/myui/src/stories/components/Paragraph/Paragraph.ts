/**
 * Paragraph Component
 * フレームワークに依存しないパラグラフコンポーネント
 */

// パラグラフのプロパティの型定義
export interface ParagraphProps {
  text?: string;
  className?: string;
}

/**
 * パラグラフ要素を作成する
 *
 * @param props - パラグラフのプロパティ
 * @returns パラグラフ要素
 */
export const createParagraph = (props: ParagraphProps = {}): HTMLElement => {
  const { text = "パラグラフのテキスト", className = "" } = props;

  // パラグラフ要素の作成
  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  // 基本クラスを適用
  paragraph.classList.add("paragraph");

  // 追加のクラスがあれば適用
  if (className) {
    paragraph.classList.add(className);
  }

  return paragraph;
};

/**
 * 既存の要素をパラグラフスタイルに変換する
 *
 * @param element - スタイルを適用する要素
 * @param props - スタイリングのプロパティ
 * @returns スタイル適用済みの要素
 */
export const styleAsParagraph = (
  element: HTMLElement,
  props: ParagraphProps = {},
): HTMLElement => {
  const { className = "" } = props;

  // 既存のクラスをクリア
  element.className = "";

  // 基本クラスを適用
  element.classList.add("paragraph");

  // 追加のクラスがあれば適用
  if (className) {
    element.classList.add(className);
  }

  return element;
};
