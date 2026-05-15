import { NextResponse } from "next/server"
import OpenAI from "openai"
import { buildPrompt } from "@/lib/prompts"
import type { TextType, Tone } from "@/lib/types"

function getClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, fields, tone } = body as { type: TextType; fields: Record<string, string>; tone: Tone }

    if (!type || !fields) {
      return NextResponse.json({ error: "type e fields são obrigatórios" }, { status: 400 })
    }

    const prompt = buildPrompt(type, fields, tone)
    const client = getClient()

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um assistente especializado em gerar textos profissionais em português. Responda apenas com o texto solicitado, sem explicações adicionais.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    })

    const result = completion.choices[0]?.message?.content?.trim() || ""

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Erro ao gerar texto:", error)
    return NextResponse.json({ error: "Erro ao gerar texto. Verifique sua chave da API OpenAI." }, { status: 500 })
  }
}
