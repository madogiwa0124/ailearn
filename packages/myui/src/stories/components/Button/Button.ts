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
    onClick = null,
  } = props;

  // ボタン要素の作成
  const button = document.createElement("button");
  button.textContent = label;
  button.type = "button";

  // 基本クラスを適用
  button.classList.add("btn");

  // バリアントのクラスを適用
  if (outline) {
    button.classList.add(`btn-outline-${variant}`);
  } else {
    button.classList.add(`btn-${variant}`);
  }

  // ブロック表示のクラスを適用
  if (block) {
    button.classList.add("btn-block");
  }

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

/**
 * ボタンラッパーコンポーネント - スタイリングのみを提供し、既存のボタンに適用するためのもの
 *
 * @param buttonElement - 対象のボタン要素
 * @param props - スタイリングのプロパティ
 * @returns スタイル適用済みのボタン要素
 */
export const styleButton = (
  buttonElement: HTMLButtonElement,
  props: ButtonProps = {},
): HTMLButtonElement => {
  const {
    variant = "primary",
    outline = false,
    block = false,
    disabled = false,
  } = props;

  // 既存のクラスをクリア
  buttonElement.className = "";

  // 基本クラスを適用
  buttonElement.classList.add("btn");

  // バリアントのクラスを適用
  if (outline) {
    buttonElement.classList.add(`btn-outline-${variant}`);
  } else {
    buttonElement.classList.add(`btn-${variant}`);
  }

  // ブロック表示のクラスを適用
  if (block) {
    buttonElement.classList.add("btn-block");
  }

  // 無効状態を設定
  if (disabled) {
    buttonElement.disabled = true;
    buttonElement.classList.add("disabled");
  }

  return buttonElement;
};
