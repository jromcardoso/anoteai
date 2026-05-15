"use client"

import { useState } from "react"
import TextTypeSelect from "@/components/text-type-select"
import ToneSelect from "@/components/tone-select"
import DynamicForm from "@/components/dynamic-form"
import ResultCard from "@/components/result-card"
import History from "@/components/history"
import { useHistory } from "@/hooks/use-history"
import type { TextType, Tone } from "@/lib/types"
import { Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function GerarPage() {
  const [type, setType] = useState<TextType>("email")
  const [tone, setTone] = useState<Tone>("formal")
  const [fields, setFields] = useState<Record<string, string>>({})
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { items, addItem, clearHistory } = useHistory()

  const handleFieldChange = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  const handleTypeChange = (newType: TextType) => {
    setType(newType)
    setFields({})
    setResult("")
    setError("")
  }

  const handleGenerate = async () => {
    setError("")
    setLoading(true)
    setResult("")

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, fields, tone }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Erro ao gerar texto")
      }

      setResult(data.result)
      addItem({ type, tone, input: fields, result: data.result })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  const allFieldsFilled = () => {
    return Object.values(fields).every((v) => v.trim() !== "")
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" />
            <h1 className="text-lg font-semibold">AnoteAI</h1>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-3">
              Escolha o tipo de texto
            </label>
            <TextTypeSelect value={type} onChange={handleTypeChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-3">
              Escolha o tom do texto
            </label>
            <ToneSelect value={tone} onChange={setTone} />
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
            <DynamicForm type={type} values={fields} onChange={handleFieldChange} />

            {error && (
              <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!allFieldsFilled() || loading}
              className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 text-sm font-semibold text-zinc-900 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
                  Gerando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Gerar texto
                </>
              )}
            </button>
          </div>

          <ResultCard text={result} loading={loading} />

          <History items={items} onClear={clearHistory} />
        </div>
      </div>
    </div>
  )
}
