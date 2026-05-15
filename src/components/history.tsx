"use client"

import type { HistoryItem } from "@/lib/types"
import { Clock, Trash2, Copy, Check } from "lucide-react"
import { useState } from "react"

interface Props {
  items: HistoryItem[]
  onClear: () => void
}

const typeLabels: Record<string, string> = {
  email: "Email profissional",
  linkedin: "Post LinkedIn",
  product: "Descrição de produto",
  bio: "Bio profissional",
}

const toneLabels: Record<string, string> = {
  formal: "Formal",
  casual: "Casual",
  divertido: "Divertido",
  persuasivo: "Persuasivo",
}

export default function History({ items, onClear }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6 text-center">
        <Clock className="mx-auto h-8 w-8 text-zinc-600" />
        <p className="mt-2 text-sm text-zinc-500">Nenhum texto gerado ainda</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-zinc-400">Últimos textos</h2>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          <Trash2 className="h-3 w-3" />
          Limpar
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-emerald-400">
                  {typeLabels[item.type] || item.type}
                </span>
                {item.tone && (
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
                    {toneLabels[item.tone] || item.tone}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleCopy(item.result, item.id)}
                className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-zinc-300 line-clamp-3 leading-relaxed">
              {item.result}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
