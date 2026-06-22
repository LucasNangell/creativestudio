import { NextResponse } from "next/server";

export function methodNotAllowed(allowed: string[]): NextResponse {
  return NextResponse.json(
    { success: false, error: "Método não permitido." },
    {
      status: 405,
      headers: { Allow: allowed.join(", ") },
    },
  );
}

export async function parseJsonBody(
  request: Request,
): Promise<{ data: unknown } | { error: NextResponse }> {
  try {
    return { data: await request.json() };
  } catch {
    return {
      error: NextResponse.json(
        { success: false, error: "Payload inválido." },
        { status: 400 },
      ),
    };
  }
}

export function assertJsonObject(
  body: unknown,
): { record: Record<string, unknown> } | { error: NextResponse } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      error: NextResponse.json(
        { success: false, error: "Payload inválido." },
        { status: 400 },
      ),
    };
  }

  return { record: body as Record<string, unknown> };
}
