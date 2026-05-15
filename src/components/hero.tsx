import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 mb-8">
        <Sparkles className="h-4 w-4" />
        <span>Texto gerado por IA em segundos</span>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl leading-tight">
        Escreva melhor.
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          Gaste menos tempo.
        </span>
      </h1>

      <p className="mt-6 text-lg text-zinc-400 max-w-xl">
        O AnoteAI cria textos profissionais prontos para copiar — e-mails, posts para LinkedIn,
        descrições de produto e bio. Escolha o tipo, preencha o contexto e pronto.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/gerar"
          className="inline-flex h-12 items-center gap-2 rounded-lg bg-emerald-500 px-8 text-sm font-semibold text-zinc-900 transition-colors hover:bg-emerald-400"
        >
          Começar a usar
          <Sparkles className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl w-full">
        {[
          { label: "Email profissional", desc: "Formal, casual ou urgente" },
          { label: "Post LinkedIn", desc: "Engajamento, autoridade ou divulgação" },
          { label: "Descrição de produto", desc: "Persuasiva e clara" },
          { label: "Bio profissional", desc: "Impactante e concisa" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 text-left"
          >
            <h3 className="text-sm font-medium text-zinc-100">{item.label}</h3>
            <p className="mt-1 text-xs text-zinc-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
