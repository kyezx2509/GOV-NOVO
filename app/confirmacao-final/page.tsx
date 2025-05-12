"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Download, Printer, Mail, FileText, ExternalLink } from "lucide-react"
import type { VerificationData } from "@/lib/types"
import { formatCPF, formatCurrency, getCurrentDateTime, generateProtocol } from "@/lib/utils"
import { ProtocolBadge } from "@/components/protocol-badge"
import { OfficialSeals } from "@/components/official-seals"
import { LegalReferences } from "@/components/legal-references"

export default function ConfirmacaoFinalPage() {
  const router = useRouter()
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [protocol, setProtocol] = useState("")
  const [authCode, setAuthCode] = useState("")
  const currentDate = new Date().toLocaleDateString("pt-BR")
  const currentTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

  useEffect(() => {
    const storedVerificationData = sessionStorage.getItem("verificationData")
    const storedProtocol = sessionStorage.getItem("protocol")

    if (!storedVerificationData) {
      router.push("/")
      return
    }

    const vData = JSON.parse(storedVerificationData) as VerificationData
    setVerificationData(vData)

    if (storedProtocol) {
      setProtocol(storedProtocol)
    } else {
      setProtocol(generateProtocol(vData.cpf))
    }

    // Gerar código de autenticação
    setAuthCode(Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 8).toUpperCase())
  }, [router])

  const handleDownloadComprovante = () => {
    alert("Funcionalidade simulada: O comprovante seria gerado e baixado aqui.")
  }

  const handlePrintComprovante = () => {
    window.print()
  }

  const handleSendEmail = () => {
    alert("Funcionalidade simulada: O comprovante seria enviado por e-mail.")
  }

  if (!verificationData) {
    return null
  }

  // Calcular o valor total pago
  const totalPaid = 64.87 + 27.38 + 13.48

  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-green-800 text-center">Processo de Regularização Concluído</h1>
          <p className="text-green-600 mt-2">
            Todas as etapas de regularização foram concluídas com sucesso às {getCurrentDateTime()}.
          </p>
        </div>

        <ProtocolBadge protocol={protocol} date={currentDate} time={currentTime} className="mb-6" />

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Resumo da Regularização</h2>
              <OfficialSeals variant="inline" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm mb-1">
                  <strong>CPF:</strong> {formatCPF(verificationData.cpf)}
                </p>
                <p className="text-sm mb-1">
                  <strong>Nome:</strong> {verificationData.personData.name}
                </p>
                <p className="text-sm mb-1">
                  <strong>Etapas concluídas:</strong> 3/3
                </p>
              </div>
              <div>
                <p className="text-sm mb-1">
                  <strong>Valor Total Pago:</strong> {formatCurrency(totalPaid)}
                </p>
                <p className="text-sm mb-1">
                  <strong>Data/Hora:</strong> {getCurrentDateTime()}
                </p>
                <p className="text-sm mb-1">
                  <strong>Autenticação:</strong> <span className="font-mono text-xs">SEFISC-{authCode}</span>
                </p>
                <p className="text-sm mb-1">
                  <strong>Validade:</strong> 12 meses
                </p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded border border-green-200">
            <h3 className="font-medium text-green-800 mb-3">Etapas Concluídas:</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Validação Inicial de Cadastro Empresarial (VICE)</p>
                  <p className="text-xs text-gray-600">Regularização fiscal inicial concluída</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Validação Técnica Complementar de CNPJ Ativo</p>
                  <p className="text-xs text-gray-600">Sincronização com sistemas federais concluída</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Confirmação Digital de Responsabilidade Técnica (CDRT)</p>
                  <p className="text-xs text-gray-600">Vinculação do CPF ao CNPJ concluída</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded border border-green-200">
            <h3 className="font-medium text-green-800 mb-3">Situação Atual:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Emissão de notas fiscais liberada</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Situação bancária regularizada</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>CPF sem restrições junto aos órgãos reguladores</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Acesso ao e-CAC como responsável principal</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Selo de autenticidade cadastral emitido</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <span>Certidão negativa de débitos disponível</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#e5f1ff] p-4 rounded border border-[#c4daff]">
            <div className="flex items-start">
              <FileText className="text-[#1351b4] mr-2 mt-0.5" size={18} />
              <div>
                <h3 className="text-md font-semibold text-[#071D41] mb-2">Informações Importantes</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Este comprovante tem validade fiscal e pode ser utilizado para comprovar a regularidade da empresa
                  junto aos órgãos governamentais.
                </p>
                <p className="text-sm text-gray-700">
                  A validação deste documento pode ser realizada através do protocolo {protocol} no portal da Receita
                  Federal ou PGFN.
                </p>
                <div className="mt-3 flex items-center">
                  <a href="/legislacao" className="text-xs text-[#1351b4] hover:underline flex items-center">
                    Verificar situação cadastral
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <LegalReferences
            references={[
              "Portaria SEFISC nº 24/2023, Art. 12, Parágrafo 3º",
              "Resolução PGFN/ME nº 101/2024",
              "Portaria Técnica Conjunta nº 145/2024 da PFCE/SEFISC",
              "Resolução Administrativa 187/23, Seção II, Art. 5º",
            ]}
            linkUrl="/legislacao"
          />

          <div className="flex flex-col md:flex-row justify-center gap-3 mt-6">
            <button onClick={handleDownloadComprovante} className="gov-button flex items-center justify-center">
              <Download size={18} className="mr-2" />
              Baixar comprovante
            </button>
            <button onClick={handlePrintComprovante} className="gov-button flex items-center justify-center">
              <Printer size={18} className="mr-2" />
              Imprimir
            </button>
            <button onClick={handleSendEmail} className="gov-button flex items-center justify-center">
              <Mail size={18} className="mr-2" />
              Enviar por e-mail
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              O comprovante foi enviado automaticamente para o e-mail vinculado ao seu CPF.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Em caso de dúvidas, entre em contato com a Central de Atendimento: <strong>0800 725 0194</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
