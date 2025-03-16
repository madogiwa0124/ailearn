/**
 * イベント処理を担当するモジュール
 * DOMに依存しないイベント処理のロジックを提供
 */

// イベントタイプ定義
export const EVENT_LOADING = "ai-response-loading";
export const EVENT_SUCCESS = "ai-response-success";
export const EVENT_ERROR = "ai-response-error";
export const EVENT_VALIDATION_ERROR = "ai-response-validation-error";

// ベースとなるイベント詳細インターフェース
export interface BaseEventDetail {
  timestamp?: number;
  type: string;
}

// 各状態のイベント詳細インターフェース
export interface LoadingEventDetail extends BaseEventDetail {
  type: "loading";
}

export interface SuccessEventDetail extends BaseEventDetail {
  type: "success";
  content: string;
}

export interface ErrorEventDetail extends BaseEventDetail {
  type: "error";
  error: unknown;
}

export interface ValidationErrorEventDetail extends BaseEventDetail {
  type: "validation-error";
  message: string;
}

// イベント詳細の共用型（Union Type）
export type AIResponseEventDetail =
  | LoadingEventDetail
  | SuccessEventDetail
  | ErrorEventDetail
  | ValidationErrorEventDetail;

/**
 * 共通のカスタムイベント作成関数
 * @param eventType イベントタイプ文字列
 * @param detail イベント詳細
 */
export const createCustomEvent = <T extends BaseEventDetail>(
  eventType: string,
  detail: T,
): CustomEvent<T> => {
  return new CustomEvent<T>(eventType, {
    detail: {
      ...detail,
      timestamp: Date.now(), // タイムスタンプを自動的に追加
    },
    bubbles: true,
  });
};

/**
 * カスタムイベントを発行する
 * @param eventType イベントタイプ
 * @param detail イベント詳細
 * @param target イベントのターゲット要素（デフォルトはwindow）
 */
export const dispatchCustomEvent = <T extends BaseEventDetail>(
  eventType: string,
  detail: T,
  target: EventTarget = window,
): void => {
  const event = createCustomEvent(eventType, detail);
  target.dispatchEvent(event);
};

/**
 * 汎用イベントハンドラの作成
 * タイプに基づいてイベントデータを処理する
 * @param callback コールバック関数
 */
export const createGenericEventHandler = (
  callback: (detail: AIResponseEventDetail) => void,
): EventListener => {
  return ((e: Event) => {
    const detail = (e as CustomEvent<AIResponseEventDetail>).detail;
    callback(detail);
  }) as EventListener;
};

/**
 * 特定タイプのイベントハンドラの作成
 * @param callback 特定タイプのイベントに対するコールバック関数
 */
export const createTypedEventHandler = <T extends AIResponseEventDetail>(
  callback: (detail: T) => void,
): EventListener => {
  return ((e: Event) => {
    const detail = (e as CustomEvent<T>).detail;
    callback(detail);
  }) as EventListener;
};
