import type { TextType, Field } from "@/lib/types"
import { formConfigs } from "@/lib/form-config"

interface Props {
  type: TextType
  values: Record<string, string>
  onChange: (key: string, value: string) => void
}

export default function DynamicForm({ type, values, onChange }: Props) {
  const config = formConfigs.find((c) => c.type === type)
  if (!config) return null

  return (
    <div className="space-y-4">
      {config.fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-zinc-300 mb-1.5">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              value={values[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="" disabled>
                Selecione...
              </option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              value={values[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
            />
          ) : (
            <input
              type="text"
              value={values[field.key] || ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          )}
        </div>
      ))}
    </div>
  )
}
