import Hero from "@/components/hero"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          AnoteAI
        </Link>
        <Link
          href="/gerar"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-emerald-400"
        >
          Gerar texto
        </Link>
      </header>
      <main className="mx-auto max-w-5xl px-4">
        <Hero />
      </main>
      <footer className="border-t border-zinc-900 py-6 text-center text-sm text-zinc-700">
        AnoteAI &mdash; textos gerados por inteligência artificial.
      </footer>
    </div>
  )
}
