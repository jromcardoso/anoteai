export type TextType = "email" | "linkedin" | "product" | "bio"
export type Tone = "formal" | "casual" | "divertido" | "persuasivo"

export interface Field {
  key: string
  label: string
  type: "text" | "textarea" | "select"
  placeholder?: string
  options?: { value: string; label: string }[]
}

export interface FormConfig {
  type: TextType
  label: string
  icon: string
  fields: Field[]
}

export interface HistoryItem {
  id: string
  type: TextType
  tone?: Tone
  input: Record<string, string>
  result: string
  createdAt: number
}
