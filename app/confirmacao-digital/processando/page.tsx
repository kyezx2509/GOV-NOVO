"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loading } from "@/components/loading"

export default function ProcessandoPage() {
  const router = useRouter()

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      router.push("/confirmacao-final")
    }, 5000)

    return () => clearTimeout(loadingTimeout)
  }, [router])

  const loadingMessages = [
    "Processando confirmação digital...",
    "Vinculando CPF ao CNPJ no banco nacional...",
    "Atualizando permissões de acesso...",
    "Emitindo selo de autenticidade cadastral...",
    "Finalizando processo de regularização...",
    "Preparando comprovante final...",
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        <Loading messages={loadingMessages} />
      </div>
    </div>
  )
}
