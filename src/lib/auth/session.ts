export const ADMIN_SESSION_COOKIE = "nangell_admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 horas

export type AdminSession = {
  userId: string;
  email: string;
  name: string;
  role: string;
  exp: number;
};

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret && process.env.NODE_ENV === "production") {
    throw new Error("ADMIN_SESSION_SECRET is required in production.");
  }
  return secret ?? "nangell-dev-session-secret-change-me";
}

function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBuffer(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

let cryptoKeyPromise: Promise<CryptoKey> | null = null;

async function getCryptoKey(): Promise<CryptoKey> {
  if (!cryptoKeyPromise) {
    cryptoKeyPromise = crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(getSessionSecret()),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign", "verify"],
    );
  }
  return cryptoKeyPromise;
}

async function signPayload(payload: string): Promise<string> {
  const key = await getCryptoKey();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return bufferToBase64Url(signature);
}

export async function createSessionToken(
  session: Omit<AdminSession, "exp">,
): Promise<string> {
  const payload: AdminSession = {
    ...session,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
  };
  const encoded = btoa(JSON.stringify(payload))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const signature = await signPayload(encoded);
  return `${encoded}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined | null,
): Promise<AdminSession | null> {
  if (!token) return null;

  const separatorIndex = token.lastIndexOf(".");
  if (separatorIndex <= 0) return null;

  const encoded = token.slice(0, separatorIndex);
  const signature = token.slice(separatorIndex + 1);

  try {
    const key = await getCryptoKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToBuffer(signature) as BufferSource,
      new TextEncoder().encode(encoded),
    );

    if (!valid) return null;

    const json = atob(encoded.replace(/-/g, "+").replace(/_/g, "/"));
    const session = JSON.parse(json) as AdminSession;

    if (!session.userId || !session.email || !session.exp) return null;
    if (session.exp < Date.now()) return null;

    return {
      ...session,
      name: session.name ?? session.email.split("@")[0] ?? "Admin",
    };
  } catch {
    return null;
  }
}

export function getSessionCookieOptions() {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
