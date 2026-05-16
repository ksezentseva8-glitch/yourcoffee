/**
 * Валидация initData от Telegram
 */
export function parseInitData(initDataRaw: string) {
  const params = new URLSearchParams(initDataRaw);
  const user = params.get("user");
  
  return {
    user: user ? JSON.parse(user) : null,
    authDate: parseInt(params.get("auth_date") || "0"),
    queryId: params.get("query_id"),
    startParam: params.get("start_param"),
    hash: params.get("hash"),
  };
}

/**
 * Валидация подписи (упрощённая версия)
 */
export async function validateInitData(
  initDataRaw: string,
  botToken: string
): Promise<boolean> {
  try {
    const params = new URLSearchParams(initDataRaw);
    const hash = params.get("hash");
    
    if (!hash) return false;

    params.delete("hash");
    
    const dataCheckString = Array.from(params.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    const encoder = new TextEncoder();
    const keyData = encoder.encode("WebAppData");
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const messageData = encoder.encode(botToken);
    const secretKey = await crypto.subtle.sign("HMAC", key, messageData);

    const signKey = await crypto.subtle.importKey(
      "raw",
      secretKey,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signData = encoder.encode(dataCheckString);
    const signature = await crypto.subtle.sign("HMAC", signKey, signData);

    const hashArray = Array.from(new Uint8Array(signature));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    return hashHex === hash;
  } catch (error) {
    console.error("Validation error:", error);
    return false;
  }
}
