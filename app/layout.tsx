// app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NovaShop",
  description: "Modern Next.js Application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col">

          {/* Header */}
          <header className="border-b border-border bg-card">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
              <h1 className="text-xl font-bold">NovaShop</h1>
              <nav className="space-x-6 text-sm">
                <a href="/" className="hover:text-accent transition">
                  Home
                </a>
                <a href="/about" className="hover:text-accent transition">
                  About
                </a>
                <a href="/contact" className="hover:text-accent transition">
                  Contact
                </a>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-6 py-10">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-border bg-card">
            <div className="container mx-auto px-6 py-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} NovaShop. All rights reserved.
            </div>
          </footer>

        </div>
      </body>
    </html>
  )
}