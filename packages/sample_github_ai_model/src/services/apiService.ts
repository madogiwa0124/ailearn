/**
 * APIサービス - OpenAI APIとの通信を処理
 */

const SERVER_PORT = process.env.SERVER_PORT || 3001; // Default port
const SERVER_ROOT = `http://localhost:${SERVER_PORT}`;

/**
 * OpenAI APIからレスポンスを取得
 * @param userMessage - ユーザーからの質問テキスト（オプション）
 * @returns API応答データ
 * @throws フェッチに失敗した場合のエラー
 */
export const fetchOpenAIResponse = async (userMessage?: string) => {
  const url = `${SERVER_ROOT}/api/chat`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: userMessage || "What is the capital of France?",
    }),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};

/**
 * レスポンステキストを表示用にフォーマットする
 * @param text - OpenAIからのレスポンステキスト
 * @returns フォーマットされたHTMLテキスト
 */
export const formatResponse = (text: string): string => {
  // Replace newlines with HTML line breaks for better formatting
  return text
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
};

/**
 * エラーメッセージをフォーマットする
 * @param error - エラーオブジェクト
 * @returns フォーマットされたエラーメッセージ
 */
export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return "An unknown error occurred";
};

/**
 * OpenAI APIからのレスポンスを取得して、そのコンテンツを返す
 * @param result - OpenAI APIからのレスポンス
 * @returns レスポンスコンテンツ
 */
export const getAiAnswerContent = (result: {
  choices: Array<{ message: { content: string } }>;
}) => {
  return result.choices[0]?.message?.content;
};
