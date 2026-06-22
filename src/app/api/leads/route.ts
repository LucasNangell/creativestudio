import { NextResponse } from "next/server";

import {
  assertJsonObject,
  methodNotAllowed,
  parseJsonBody,
} from "@/lib/api/route-utils";
import { getPublicErrorMessage } from "@/lib/logger";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  contactLeadSchema,
  diagnosticLeadSchema,
  type ContactLeadInput,
  type DiagnosticLeadInput,
} from "@/lib/validations/lead";
import {
  createContactLead,
  createDiagnosticLead,
} from "@/services/leads-service";

function honeypotTriggered(body: Record<string, unknown>): boolean {
  const trap = body.website_url;
  return typeof trap === "string" && trap.trim().length > 0;
}

export async function GET() {
  return methodNotAllowed(["POST"]);
}

export async function POST(request: Request) {
  const parsedBody = await parseJsonBody(request);
  if ("error" in parsedBody) return parsedBody.error;

  const objectResult = assertJsonObject(parsedBody.data);
  if ("error" in objectResult) return objectResult.error;

  const record = objectResult.record;

  if (honeypotTriggered(record)) {
    return NextResponse.json({ success: true, id: "ignored" });
  }

  const ip = getClientIp(request);
  const email =
    typeof record.email === "string" ? record.email.toLowerCase().trim() : "unknown";
  const rateKey = `${ip}:${email}`;
  const rateLimit = checkRateLimit(rateKey);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: rateLimit.reason,
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  const sourcePage = record.source_page;

  if (sourcePage === "/contato") {
    const parsed = contactLeadSchema.safeParse(parsedBody.data);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Verifique os campos do formulário.",
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }

    const result = await createContactLead(parsed.data as ContactLeadInput);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: getPublicErrorMessage(result.error) },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: "Mensagem recebida com sucesso.",
    });
  }

  const parsed = diagnosticLeadSchema.safeParse(parsedBody.data);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Verifique os campos do formulário.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const result = await createDiagnosticLead(parsed.data as DiagnosticLeadInput);

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: getPublicErrorMessage(result.error) },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    id: result.id,
    message: "Diagnóstico enviado com sucesso.",
  });
}
