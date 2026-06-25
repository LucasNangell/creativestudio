import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userInput } = body;

    if (
      !userInput ||
      typeof userInput !== "string" ||
      userInput.trim() === ""
    ) {
      return NextResponse.json(
        { success: false, error: "A entrada do usuário é obrigatória." },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "A variável de ambiente GEMINI_API_KEY não está configurada.",
        },
        { status: 500 },
      );
    }

    // Carrega o prompt template de prompt_escopo.txt
    const promptPath = path.join(process.cwd(), "prompt_escopo.txt");
    if (!fs.existsSync(promptPath)) {
      return NextResponse.json(
        {
          success: false,
          error: "O arquivo prompt_escopo.txt não foi encontrado no servidor.",
        },
        { status: 500 },
      );
    }

    const promptTemplate = fs.readFileSync(promptPath, "utf-8");
    const finalPrompt = promptTemplate.replace(
      "[COLE AQUI O RESUMO DA REUNIÃO COM O CLIENTE]",
      userInput,
    );

    // Faz a chamada direta para a API do Gemini
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: finalPrompt,
              },
            ],
          },
        ],
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      return NextResponse.json(
        {
          success: false,
          error: `Erro na API do Gemini: ${geminiResponse.statusText} (${errorText})`,
        },
        { status: geminiResponse.status },
      );
    }

    const resJson = await geminiResponse.json();
    const generatedText = resJson.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Não foi possível extrair a resposta gerada pela API do Gemini.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      result: generatedText,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro interno do servidor.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

