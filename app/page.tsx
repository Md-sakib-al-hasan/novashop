// app/page.tsx

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h2 className="text-4xl font-bold tracking-tight">
          Welcome to NovaShop
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A clean, scalable Next.js starter with Tailwind CSS and modern
          design tokens.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold mb-2">Fast</h3>
          <p className="text-sm text-muted-foreground">
            Built with Next.js App Router for optimal performance.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold mb-2">Scalable</h3>
          <p className="text-sm text-muted-foreground">
            Structured layout ready for production apps.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-semibold mb-2">Modern</h3>
          <p className="text-sm text-muted-foreground">
            Uses semantic design tokens and dark mode support.
          </p>
        </div>
      </section>
    </div>
  )
}