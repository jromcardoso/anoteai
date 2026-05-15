import type { FormConfig } from "./types"

export const formConfigs: FormConfig[] = [
  {
    type: "email",
    label: "Email profissional",
    icon: "✉️",
    fields: [
      { key: "para_quem", label: "Para quem", type: "text", placeholder: "Ex: cliente, chefe, equipe" },
      { key: "assunto", label: "Assunto", type: "text", placeholder: "Ex: proposta comercial" },
      { key: "contexto_extra", label: "Contexto extra (opcional)", type: "textarea", placeholder: "Detalhes adicionais..." },
    ],
  },
  {
    type: "linkedin",
    label: "Post LinkedIn",
    icon: "💼",
    fields: [
      { key: "tema", label: "Tema", type: "text", placeholder: "Ex: liderança, inovação, carreira" },
      {
        key: "objetivo",
        label: "Objetivo",
        type: "select",
        options: [
          { value: "engajamento", label: "Engajamento" },
          { value: "autoridade", label: "Autoridade" },
          { value: "divulgacao", label: "Divulgação" },
        ],
      },
    ],
  },
  {
    type: "product",
    label: "Descrição de produto",
    icon: "📦",
    fields: [
      { key: "nome_produto", label: "Nome do produto", type: "text", placeholder: "Ex: Curso de Marketing Digital" },
      { key: "publico_alvo", label: "Público-alvo", type: "text", placeholder: "Ex: empreendedores iniciantes" },
      { key: "diferenciais", label: "Diferenciais", type: "textarea", placeholder: "O que torna esse produto único?" },
    ],
  },
  {
    type: "bio",
    label: "Bio profissional",
    icon: "👤",
    fields: [
      { key: "nome", label: "Nome", type: "text", placeholder: "Seu nome completo" },
      { key: "cargo", label: "Cargo", type: "text", placeholder: "Ex: Engenheira de Software" },
      { key: "experiencia", label: "Experiência", type: "textarea", placeholder: "Resumo da sua trajetória" },
    ],
  },
]
