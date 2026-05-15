import type { TextType } from "@/lib/types"
import { formConfigs } from "@/lib/form-config"

interface Props {
  value: TextType
  onChange: (type: TextType) => void
}

export default function TextTypeSelect({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {formConfigs.map((config) => {
        const selected = config.type === value
        return (
          <button
            key={config.type}
            onClick={() => onChange(config.type)}
            className={`relative rounded-lg border px-4 py-3 text-left text-sm transition-all ${
              selected
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
            }`}
          >
            <span className="text-lg">{config.icon}</span>
            <p className="mt-1 font-medium">{config.label}</p>
          </button>
        )
      })}
    </div>
  )
}
