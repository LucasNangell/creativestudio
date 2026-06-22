type RateLimitEntry = {
  timestamps: number[];
};

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_ANALYTICS_REQUESTS = 120;
const MIN_INTERVAL_MS = 30 * 1000;

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number; reason: string };

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [] };

  entry.timestamps = entry.timestamps.filter((ts) => now - ts < WINDOW_MS);

  if (entry.timestamps.length >= MAX_REQUESTS) {
    const oldest = entry.timestamps[0] ?? now;
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    return {
      allowed: false,
      retryAfterSeconds,
      reason: "Muitas tentativas. Aguarde alguns minutos antes de enviar novamente.",
    };
  }

  const lastSubmission = entry.timestamps.at(-1);
  if (lastSubmission && now - lastSubmission < MIN_INTERVAL_MS) {
    const retryAfterSeconds = Math.ceil((MIN_INTERVAL_MS - (now - lastSubmission)) / 1000);
    return {
      allowed: false,
      retryAfterSeconds,
      reason: "Aguarde alguns segundos antes de enviar novamente.",
    };
  }

  entry.timestamps.push(now);
  store.set(key, entry);

  return { allowed: true };
}

export function checkAnalyticsRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key) ?? { timestamps: [] };

  entry.timestamps = entry.timestamps.filter((ts) => now - ts < WINDOW_MS);

  if (entry.timestamps.length >= MAX_ANALYTICS_REQUESTS) {
    const oldest = entry.timestamps[0] ?? now;
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    return {
      allowed: false,
      retryAfterSeconds,
      reason: "Limite de eventos excedido.",
    };
  }

  entry.timestamps.push(now);
  store.set(key, entry);

  return { allowed: true };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}
