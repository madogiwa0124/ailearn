/**
 * Heading Component
 * フレームワークに依存しないヘディングコンポーネント
 */

// ヘディングのプロパティの型定義
export interface HeadingProps {
  text?: string;
  level?: number;
  className?: string;
}

/**
 * ヘディング要素を作成する
 *
 * @param props - ヘディングのプロパティ
 * @returns ヘディング要素
 */
export const createHeading = (props: HeadingProps = {}): HTMLElement => {
  const { text = "Heading", level = 1, className = "" } = props;

  // 有効なレベル範囲に制限（1-6）
  const safeLevel = Math.max(1, Math.min(6, level));

  // ヘディング要素の作成
  const heading = document.createElement(`h${safeLevel}`);
  heading.textContent = text;

  // 基本クラスを適用
  heading.classList.add(`h${safeLevel}`);

  // 追加のクラスがあれば適用
  if (className) {
    heading.classList.add(className);
  }

  return heading;
};

/**
 * 既存の要素をヘディングスタイルに変換する
 *
 * @param element - スタイルを適用する要素
 * @param props - スタイリングのプロパティ
 * @returns スタイル適用済みの要素
 */
export const styleAsHeading = (
  element: HTMLElement,
  props: HeadingProps = {},
): HTMLElement => {
  const { level = 1, className = "" } = props;

  // 有効なレベル範囲に制限（1-6）
  const safeLevel = Math.max(1, Math.min(6, level));

  // 既存のクラスをクリア
  element.className = "";

  // 基本クラスを適用
  element.classList.add(`h${safeLevel}`);

  // 追加のクラスがあれば適用
  if (className) {
    element.classList.add(className);
  }

  return element;
};
