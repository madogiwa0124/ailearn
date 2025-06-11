/**
 * Button Component
 * フレームワークに依存しないボタンコンポーネント
 */

// ボタンのプロパティの型定義
export interface ButtonProps {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary";
  outline?: boolean;
  block?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  iconOnly?: boolean;
  onClick?: (event: MouseEvent) => void;
}

/**
 * ボタン要素を作成する
 *
 * @param props - ボタンのプロパティ
 * @returns ボタン要素
 */
export const createButton = (props: ButtonProps = {}): HTMLButtonElement => {
  const {
    label = "Button",
    variant = "primary",
    outline = false,
    block = false,
    disabled = false,
    iconOnly = false,
    onClick = null,
  } = props;

  // ボタン要素の作成
  const button = document.createElement("button");
  button.textContent = label;
  button.type = "button";

  // 基本クラスを適用
  button.classList.add("btn");

  // バリアントのクラスを適用
  if (outline) button.classList.add("--outline");
  if (variant) button.classList.add(`--${variant}`);
  // ブロック表示のクラスを適用
  if (block) button.classList.add("--block");
  // ラウンドスタイルのクラスを適用
  if (props.rounded) button.classList.add("--rounded");
  // アイコンのみのスタイルを適用
  if (iconOnly) button.classList.add("--icon-only");

  // 無効状態を設定
  if (disabled) {
    button.disabled = true;
    button.classList.add("disabled");
  }

  // クリックイベントリスナーを設定
  if (onClick && typeof onClick === "function") {
    button.addEventListener("click", onClick);
  }

  return button;
};
