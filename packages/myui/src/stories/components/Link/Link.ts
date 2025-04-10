/**
 * Link Component
 * フレームワークに依存しないリンクコンポーネント
 */

// リンクのプロパティの型定義
export interface LinkProps {
  text?: string;
  href?: string;
  newTab?: boolean;
  className?: string;
  onClick?: (event: MouseEvent) => void;
}

/**
 * リンク要素を作成する
 *
 * @param props - リンクのプロパティ
 * @returns リンク要素
 */
export const createLink = (props: LinkProps = {}): HTMLElement => {
  const {
    text = "リンク",
    href = "#",
    newTab = false,
    className = "",
    onClick = null,
  } = props;

  // リンク要素の作成
  const link = document.createElement("a");
  link.textContent = text;
  link.href = href;

  // 新しいタブで開く設定
  if (newTab) {
    link.target = "_blank";
    link.rel = "noopener noreferrer"; // セキュリティ対策
  }

  // 基本クラスを適用
  link.classList.add("link");

  // 追加のクラスがあれば適用
  if (className) {
    link.classList.add(className);
  }

  // クリックイベントリスナーを設定
  if (onClick && typeof onClick === "function") {
    link.addEventListener("click", (e) => {
      // プリベントデフォルトを呼び出さない - コールバックで制御可能に
      onClick(e);
    });
  }

  return link;
};

/**
 * 既存の要素をリンクスタイルに変換する
 *
 * @param element - スタイルを適用する要素
 * @param props - スタイリングのプロパティ
 * @returns スタイル適用済みの要素
 */
export const styleAsLink = (
  element: HTMLElement,
  props: LinkProps = {},
): HTMLElement => {
  const { className = "" } = props;

  // 既存のクラスをクリア
  element.className = "";

  // 基本クラスを適用
  element.classList.add("link");

  // 追加のクラスがあれば適用
  if (className) {
    element.classList.add(className);
  }

  return element;
};
