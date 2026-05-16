/**
 * Telegram Bot API интеграция
 */

const BOT_TOKEN = process.env.TG_BOT_TOKEN || "";
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function sendMessage(
  chatId: number | string,
  text: string,
  options?: {
    parseMode?: "HTML" | "Markdown";
    replyMarkup?: any;
  }
) {
  try {
    const response = await fetch(`${API_URL}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: options?.parseMode || "HTML",
        reply_markup: options?.replyMarkup,
      }),
    });

    if (!response.ok) {
      throw new Error(`Telegram API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("sendMessage error:", error);
    throw error;
  }
}

export async function setWebhook(webhookUrl: string) {
  try {
    const response = await fetch(`${API_URL}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ["message", "callback_query"],
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("setWebhook error:", error);
    throw error;
  }
}

export function createWebAppKeyboard(webAppUrl: string, buttonText = "☕ Открыть меню") {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: buttonText,
            web_app: { url: webAppUrl },
          },
        ],
      ],
    },
  };
}
