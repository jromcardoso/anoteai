import type { TextType, Tone } from "./types"

const toneLabels: Record<Tone, string> = {
  formal: "Formal",
  casual: "Casual",
  divertido: "Divertido",
  persuasivo: "Persuasivo",
}

export function buildPrompt(type: TextType, fields: Record<string, string>, tone: Tone): string {
  const templates: Record<TextType, string> = {
    email: `Crie um e-mail profissional com as seguintes características:
- Para quem: ${fields.para_quem}
- Assunto: ${fields.assunto}
${fields.contexto_extra ? `- Contexto extra: ${fields.contexto_extra}` : ""}

Gere o e-mail completo com assunto, saudação, corpo e despedida.`,

    linkedin: `Crie um post para o LinkedIn com as seguintes características:
- Tema: ${fields.tema}
- Objetivo: ${fields.objetivo}

Gere o post completo com texto envolvente e hashtags relevantes no final.`,

    product: `Crie uma descrição de produto com as seguintes características:
- Nome do produto: ${fields.nome_produto}
- Público-alvo: ${fields.publico_alvo}
- Diferenciais: ${fields.diferenciais}

Gere uma descrição persuasiva que destaque os benefícios e diferenciais.`,

    bio: `Crie uma bio profissional com as seguintes características:
- Nome: ${fields.nome}
- Cargo: ${fields.cargo}
- Experiência: ${fields.experiencia}

Gere uma bio profissional concisa e impactante.`,
  }

  return `Tom: ${toneLabels[tone]}\n\n${templates[type]}`
}
