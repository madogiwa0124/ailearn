import "./index.css";
import {
  fetchOpenAIResponse,
  formatResponse,
  formatErrorMessage,
  getAiAnswerContent,
} from "./services/apiService";
import {
  EVENT_LOADING,
  EVENT_SUCCESS,
  EVENT_ERROR,
  EVENT_VALIDATION_ERROR,
  type LoadingEventDetail,
  type SuccessEventDetail,
  type ErrorEventDetail,
  type ValidationErrorEventDetail,
  dispatchCustomEvent,
  createTypedEventHandler,
} from "./events/event";

const rootEl = document.querySelector("#root") as HTMLElement;

// 初期UIの設定
rootEl.innerHTML = `
<div class="content">
  <h1>OpenAI Chat Demo</h1>
  <p>質問を入力して、AIからの回答を取得しましょう。</p>

  <div class="input-container">
    <textarea id="userQuestion" placeholder="AIに質問したいことを入力してください..." rows="3"></textarea>
  </div>

  <button id="fetchButton">AIに質問する</button>
  <div id="loading" style="display: none;">Loading...</div>
  <div id="response" class="response-container" style="display: none;"></div>
</div>
`;

/**
 * ユーザーからの質問に応じてAI応答を取得し、適切なイベントを発行する
 */
const fetchResponse = async (userQuestion: string): Promise<void> => {
  try {
    // ローディング状態のイベント発行
    dispatchCustomEvent<LoadingEventDetail>(
      EVENT_LOADING,
      { type: "loading" },
      rootEl,
    );

    // APIサービスを使用してユーザーの質問に対するOpenAIレスポンスを取得
    const result = await fetchOpenAIResponse(userQuestion);

    // 成功イベントの発行
    const content = getAiAnswerContent(result) || "No response received";
    dispatchCustomEvent<SuccessEventDetail>(
      EVENT_SUCCESS,
      {
        type: "success",
        content,
      },
      rootEl,
    );
  } catch (error) {
    // エラーイベントの発行
    console.error("Error fetching OpenAI response:", error);
    dispatchCustomEvent<ErrorEventDetail>(
      EVENT_ERROR,
      {
        type: "error",
        error,
      },
      rootEl,
    );
  }
};

const userQuestionValidation = (userQuestion: string): boolean => {
  if (!userQuestion) {
    dispatchCustomEvent<ValidationErrorEventDetail>(
      EVENT_VALIDATION_ERROR,
      {
        type: "validation-error",
        message: "質問を入力してください。",
      },
      rootEl,
    );
    return false;
  }
  return true;
};

// DOM要素の参照を取得する関数
const getUIElements = () => {
  const loadingElement = document.querySelector<HTMLDivElement>("#loading");
  const responseElement = document.querySelector<HTMLDivElement>("#response");

  return { loadingElement, responseElement };
};

// UIイベントハンドラの設定

// ローディング状態のハンドラ
rootEl.addEventListener(
  EVENT_LOADING,
  createTypedEventHandler<LoadingEventDetail>((detail) => {
    const { loadingElement, responseElement } = getUIElements();

    if (loadingElement && responseElement) {
      loadingElement.style.display = "block";
      responseElement.innerHTML = "";
    }
  }),
);

// 成功状態のハンドラ
rootEl.addEventListener(
  EVENT_SUCCESS,
  createTypedEventHandler<SuccessEventDetail>((detail) => {
    const { loadingElement, responseElement } = getUIElements();

    if (loadingElement && responseElement) {
      loadingElement.style.display = "none";
      responseElement.style.display = "block";
      responseElement.innerHTML = `
      <h3>AIの回答:</h3>
      <div class="response-text">${formatResponse(detail.content)}</div>
    `;
    }
  }),
);

// エラー状態のハンドラ
rootEl.addEventListener(
  EVENT_ERROR,
  createTypedEventHandler<ErrorEventDetail>((detail) => {
    console.error("Error event occurred:", detail.error);

    const { loadingElement, responseElement } = getUIElements();

    if (loadingElement && responseElement) {
      loadingElement.style.display = "none";
      responseElement.innerHTML = `
      <h3>Error:</h3>
      <div class="error-message">${formatErrorMessage(detail.error)}</div>
      <p>Check console for more details.</p>
    `;
    }
  }),
);

// バリデーションエラー状態のハンドラ
rootEl.addEventListener(
  EVENT_VALIDATION_ERROR,
  createTypedEventHandler<ValidationErrorEventDetail>((detail) => {
    const { loadingElement, responseElement } = getUIElements();

    if (loadingElement && responseElement) {
      loadingElement.style.display = "none";
      responseElement.innerHTML = `
      <h3>エラー:</h3>
      <div class="error-message">${detail.message}</div>
    `;
    }
  }),
);

// ボタンクリックイベントの設定
const buttonElement = document.querySelector<HTMLButtonElement>("#fetchButton");

if (buttonElement) {
  buttonElement.addEventListener("click", () => {
    const userQuestionElement =
      document.querySelector<HTMLTextAreaElement>("#userQuestion");
    if (!userQuestionElement) return;

    const userQuestion = userQuestionElement.value.trim();
    if (userQuestionValidation(userQuestion)) {
      fetchResponse(userQuestion);
    } else {
      console.warn(`Validation error: ${userQuestion}`);
    }
  });
}
