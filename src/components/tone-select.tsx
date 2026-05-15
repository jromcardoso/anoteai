"use client"

import type { Tone } from "@/lib/types"

const tones: { value: Tone; label: string; icon: string }[] = [
  { value: "formal", label: "Formal", icon: "🎩" },
  { value: "casual", label: "Casual", icon: "😊" },
  { value: "divertido", label: "Divertido", icon: "😂" },
  { value: "persuasivo", label: "Persuasivo", icon: "🎯" },
]

interface Props {
  value: Tone
  onChange: (tone: Tone) => void
}

export default function ToneSelect({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {tones.map((tone) => {
        const selected = tone.value === value
        return (
          <button
            key={tone.value}
            onClick={() => onChange(tone.value)}
            className={`relative rounded-lg border px-4 py-3 text-left text-sm transition-all ${
              selected
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            <span className="text-lg">{tone.icon}</span>
            <p className="mt-1 font-medium">{tone.label}</p>
          </button>
        )
      })}
    </div>
  )
}
