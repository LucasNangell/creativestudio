const isDev = process.env.NODE_ENV === "development";

type LogContext = Record<string, unknown>;

function sanitizeContext(context?: LogContext): LogContext | undefined {
  if (!context) return undefined;

  const sensitiveKeys = [
    "password",
    "token",
    "email",
    "phone",
    "authorization",
    "cookie",
  ];

  const sanitized: LogContext = {};

  for (const [key, value] of Object.entries(context)) {
    if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
      sanitized[key] = "[redacted]";
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export const logger = {
  info(message: string, context?: LogContext) {
    if (isDev) {
      console.info(message, sanitizeContext(context));
    }
  },
  warn(message: string, context?: LogContext) {
    if (isDev) {
      console.warn(message, sanitizeContext(context));
    }
  },
  error(message: string, error?: unknown, context?: LogContext) {
    if (isDev) {
      console.error(message, error, sanitizeContext(context));
    } else {
      console.error(message);
    }
  },
};

export function getPublicErrorMessage(
  fallback = "Erro interno. Tente novamente mais tarde.",
): string {
  return fallback;
}
