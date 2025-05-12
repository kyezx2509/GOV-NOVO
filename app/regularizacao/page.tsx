"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertBox } from "@/components/alert-box"
import type { VerificationData } from "@/lib/types"
import { formatCurrency, formatCPF, formatCNPJ } from "@/lib/utils"
import { ProtocolBadge } from "@/components/protocol-badge"
import { CountdownTimer } from "@/components/countdown-timer"
import { Shield, CheckCircle, FileText, AlertTriangle } from "lucide-react"
import { OfficialSeals } from "@/components/official-seals"
import { LegalReferences } from "@/components/legal-references"

export default function RegularizacaoPage() {
  const router = useRouter()
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [protocol, setProtocol] = useState("")
  const currentDate = new Date().toLocaleDateString("pt-BR")

  useEffect(() => {
    const storedData = sessionStorage.getItem("verificationData")
    const storedProtocol = sessionStorage.getItem("protocol")

    if (!storedData) {
      router.push("/")
      return
    }

    setVerificationData(JSON.parse(storedData))
    if (storedProtocol) {
      setProtocol(storedProtocol)
    }
  }, [router])

  const handleGenerateQRCode = () => {
    setIsLoading(true)

    // Simular tempo de processamento
    setTimeout(() => {
      router.push("/pagamento")
    }, 1500)
  }

  if (!verificationData) {
    return null
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        <div className="flex justify-between items-start mb-4">
          <h1 className="gov-heading">Regularização Fiscal</h1>
          <OfficialSeals variant="compact" />
        </div>

        <ProtocolBadge protocol={protocol} date={currentDate} className="mb-6" />

        <div className="space-y-6">
          <AlertBox type="info" title="Informação de Regularização">
            <p>
              Para concluir a validação cadastral e liberar o status de conformidade fiscal da sua empresa, gere abaixo
              o QR Code da Taxa de Regularização no valor de {formatCurrency(64.9)}.
            </p>
            <p className="mt-2">
              Após o pagamento, a verificação será automaticamente atualizada e sua empresa estará em conformidade com a
              Portaria SEFISC nº 24/2023 e Resolução PGFN/ME nº 101/2024.
            </p>
          </AlertBox>

          <div className="bg-white p-4 rounded border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Resumo da Pendência</h2>
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="py-1 font-medium">CPF:</td>
                  <td>{formatCPF(verificationData.cpf)}</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Nome:</td>
                  <td>{verificationData.personData.name}</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">CNPJ:</td>
                  <td>{formatCNPJ(verificationData.companyData.cnpj)}</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Razão Social:</td>
                  <td>{verificationData.companyData.razaoSocial}</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Tipo de Pendência:</td>
                  <td>Validação Inicial de Cadastro Empresarial (VICE)</td>
                </tr>
                <tr>
                  <td className="py-1 font-medium">Valor da Taxa:</td>
                  <td className="font-medium text-blue-700">{formatCurrency(64.9)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
            <div className="flex items-start">
              <AlertTriangle className="text-yellow-600 mr-2 mt-0.5" size={18} />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Prazo para Regularização</h3>
                <p className="text-sm text-gray-700 mt-1">
                  A regularização deve ser realizada até às 23h59 de hoje para evitar a aplicação de multa adicional e
                  outras penalidades previstas na legislação.
                </p>
                <CountdownTimer hours={9} minutes={52} seconds={0} className="mt-3" showIcon={false} />
              </div>
            </div>
          </div>

          <div className="bg-[#e5f1ff] p-6 rounded border border-[#c4daff]">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-[#071D41]">Taxa de Regularização Inicial Empresarial</h2>
              <OfficialSeals variant="inline" />
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-4 text-center">{formatCurrency(64.9)}</p>
            <p className="text-sm text-[#1351b4] mb-6 text-center">Pagamento único - Validade: 12 meses</p>

            <div className="flex flex-col space-y-3 mb-6">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span className="text-sm">Liberação imediata para emissão de notas fiscais</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span className="text-sm">Regularização automática junto à Receita Federal</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span className="text-sm">Acesso a programas de incentivo fiscal</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span className="text-sm">Certidão negativa de débitos disponível imediatamente</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2" size={18} />
                <span className="text-sm">Prevenção de bloqueios bancários e restrições cadastrais</span>
              </div>
            </div>

            <button onClick={handleGenerateQRCode} className="gov-button w-full md:w-auto" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Gerando QR Code...
                </span>
              ) : (
                "EMITIR QR CODE DA TAXA DE VALIDAÇÃO"
              )}
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <div className="flex items-start">
              <FileText className="text-[#1351b4] mr-2 mt-0.5" size={18} />
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">Informações Adicionais</h3>
                <p className="text-sm text-gray-700 mb-2">
                  A Taxa de Regularização Inicial Empresarial é um pagamento único com validade de 12 meses, conforme
                  estabelecido na Portaria SEFISC nº 24/2023 e Resolução PGFN/ME nº 101/2024.
                </p>
                <p className="text-sm text-gray-700">
                  Após o pagamento, o sistema emitirá automaticamente um comprovante de regularização que poderá ser
                  utilizado para comprovar a conformidade fiscal da empresa junto aos órgãos governamentais.
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500 mt-4">
            <p>
              <strong>Nota:</strong> O pagamento da Taxa de Regularização é obrigatório para todas as empresas
              recém-formalizadas, conforme a Resolução Administrativa 187/23 e Portaria SEFISC nº 24/2023.
            </p>
            <p className="mt-2 text-xs flex items-center">
              <Shield size={14} className="mr-1 text-[#1351b4]" />
              Pagamento processado em ambiente seguro com certificação SSL
            </p>
          </div>

          <LegalReferences
            references={[
              "Portaria SEFISC nº 24/2023, Art. 12, Parágrafo 3º",
              "Resolução PGFN/ME nº 101/2024",
              "Art. 7º do Regulamento de Abertura Fiscal Integrada (RAFI)",
              "Resolução Administrativa 187/23, Seção II, Art. 5º",
            ]}
          />
        </div>
      </div>
    </div>
  )
}
