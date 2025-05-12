import Script from "next/script"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GOV.BR - Plataforma Federal de Conformidade Empresarial",
  description: "Verifique pendências cadastrais e obrigações fiscais iniciais da sua empresa",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>

        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-EFVFLYQDHG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EFVFLYQDHG');
          `}
        </Script>
      </body>
    </html>
  )
}
