"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loading } from "@/components/loading"

export default function ProcessandoPage() {
  const router = useRouter()

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      router.push("/confirmacao-digital")
    }, 5000)

    return () => clearTimeout(loadingTimeout)
  }, [router])

  const loadingMessages = [
    "Processando validação técnica...",
    "Sincronizando com Sistema Integrado da NF-e...",
    "Atualizando Cadastro Nacional de Responsáveis Legais...",
    "Verificando integração com BNIC...",
    "Validando etapa complementar...",
    "Identificando requisitos finais...",
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        <Loading messages={loadingMessages} />
      </div>
    </div>
  )
}
