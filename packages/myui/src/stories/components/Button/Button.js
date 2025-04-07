/**
 * Button Component
 * フレームワークに依存しないボタンコンポーネント
 * 
 * @param {Object} props - ボタンのプロパティ
 * @param {string} props.label - ボタンのラベル
 * @param {string} [props.variant='primary'] - ボタンのバリアント (primary, secondary, success, danger, warning)
 * @param {string} [props.size] - ボタンのサイズ (sm, md, lg)
 * @param {boolean} [props.outline=false] - アウトラインスタイル
 * @param {boolean} [props.block=false] - 幅いっぱいに広がるボタン
 * @param {boolean} [props.disabled=false] - 無効状態
 * @param {Function} [props.onClick] - クリック時のコールバック
 * @returns {HTMLElement} ボタン要素
 */
export function createButton(props = {}) {
  const {
    label = 'Button',
    variant = 'primary',
    size = '',
    outline = false,
    block = false,
    disabled = false,
    onClick = null,
  } = props;

  // ボタン要素の作成
  const button = document.createElement('button');
  button.textContent = label;
  button.type = 'button';
  
  // 基本クラスを適用
  button.classList.add('btn');
  
  // バリアントのクラスを適用
  if (outline) {
    button.classList.add(`btn-outline-${variant}`);
  } else {
    button.classList.add(`btn-${variant}`);
  }
  
  // サイズのクラスを適用
  if (size === 'sm') {
    button.classList.add('btn-sm');
  } else if (size === 'lg') {
    button.classList.add('btn-lg');
  }
  
  // ブロック表示のクラスを適用
  if (block) {
    button.classList.add('btn-block');
  }
  
  // 無効状態を設定
  if (disabled) {
    button.disabled = true;
    button.classList.add('disabled');
  }
  
  // クリックイベントリスナーを設定
  if (onClick && typeof onClick === 'function') {
    button.addEventListener('click', onClick);
  }
  
  return button;
}

/**
 * ボタンラッパーコンポーネント - スタイリングのみを提供し、既存のボタンに適用するためのもの
 * 
 * @param {HTMLElement} buttonElement - 対象のボタン要素
 * @param {Object} props - スタイリングのプロパティ
 * @returns {HTMLElement} スタイル適用済みのボタン要素
 */
export function styleButton(buttonElement, props = {}) {
  const {
    variant = 'primary',
    size = '',
    outline = false,
    block = false,
    disabled = false,
  } = props;

  // 既存のクラスをクリア
  buttonElement.className = '';
  
  // 基本クラスを適用
  buttonElement.classList.add('btn');
  
  // バリアントのクラスを適用
  if (outline) {
    buttonElement.classList.add(`btn-outline-${variant}`);
  } else {
    buttonElement.classList.add(`btn-${variant}`);
  }
  
  // サイズのクラスを適用
  if (size === 'sm') {
    buttonElement.classList.add('btn-sm');
  } else if (size === 'lg') {
    buttonElement.classList.add('btn-lg');
  }
  
  // ブロック表示のクラスを適用
  if (block) {
    buttonElement.classList.add('btn-block');
  }
  
  // 無効状態を設定
  if (disabled) {
    buttonElement.disabled = true;
    buttonElement.classList.add('disabled');
  }
  
  return buttonElement;
}