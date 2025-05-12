"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertBox } from "@/components/alert-box"
import type { VerificationData } from "@/lib/types"
import { formatCPF, formatCNPJ, formatDate } from "@/lib/utils"
import { FileText } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { ProtocolBadge } from "@/components/protocol-badge"
import { OfficialSeals } from "@/components/official-seals"
import { LegalReferences } from "@/components/legal-references"

export default function AlertaPage() {
  const router = useRouter()
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null)
  const [protocol, setProtocol] = useState("")
  const currentDate = new Date().toLocaleDateString("pt-BR")
  const currentTime = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

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

  const handleContinue = () => {
    router.push("/regularizacao")
  }

  if (!verificationData) {
    return null
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card border-red-200 bg-red-50">
        <div className="border-b-2 border-red-300 pb-4 mb-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-red-800">ALERTA FISCAL - PENDÊNCIA CRÍTICA</h1>
            <OfficialSeals />
          </div>
          <ProtocolBadge protocol={protocol} date={currentDate} time={currentTime} className="mt-4 bg-white" />
        </div>

        <div className="space-y-6">
          <AlertBox type="critical" title="ATENÇÃO: EMPRESA COM RESTRIÇÃO IMINENTE" className="mb-4">
            <p className="mb-2">
              <strong>
                A empresa {verificationData.companyData.razaoSocial} está em situação irregular e será incluída na lista
                de restrições em 24 horas.
              </strong>
            </p>
            <p>
              Conforme a Resolução Administrativa 187/23 e Portaria SEFISC nº 24/2023, a regularização deve ser
              realizada até <strong>{currentDate} às 23h59</strong>.
            </p>
          </AlertBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Dados do Contribuinte</h2>
              <p>
                <strong>CPF:</strong> {formatCPF(verificationData.cpf)}
              </p>
              <p>
                <strong>Nome:</strong> {verificationData.personData.name}
              </p>
              <p>
                <strong>Data de Nascimento:</strong> {verificationData.personData.birthDate}
              </p>
              {verificationData.personData.email && (
                <p>
                  <strong>E-mail:</strong> {verificationData.personData.email}
                </p>
              )}
              {verificationData.personData.phone && (
                <p>
                  <strong>Telefone:</strong> {verificationData.personData.phone}
                </p>
              )}
            </div>

            <div className="bg-white p-4 rounded border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Dados da Empresa</h2>
              <p>
                <strong>CNPJ:</strong> {formatCNPJ(verificationData.companyData.cnpj)}
              </p>
              <p>
                <strong>Razão Social:</strong> {verificationData.companyData.razaoSocial}
              </p>
              <p>
                <strong>Data de Abertura:</strong> {formatDate(verificationData.companyData.dataAbertura)}
              </p>
              <p>
                <strong>Natureza Jurídica:</strong> {verificationData.companyData.naturezaJuridica}
              </p>
              {verificationData.companyData.capitalSocial && (
                <p>
                  <strong>Capital Social:</strong> R$ {verificationData.companyData.capitalSocial}
                </p>
              )}
            </div>
          </div>

          <CountdownTimer
            hours={9}
            minutes={52}
            seconds={0}
            className="my-4"
            label="Tempo restante para regularização sem restrições:"
          />

          <div className="bg-red-100 border border-red-300 rounded p-4">
            <h3 className="font-semibold text-red-800 mb-2">Consequências imediatas em caso de não regularização:</h3>
            <ul className="space-y-2 text-red-700">
              <li className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>
                  <strong>Bloqueio imediato</strong> de emissão de nota fiscal
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>
                  <strong>Restrição bancária PJ</strong> e impedimento de acesso a créditos
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>
                  <strong>Inclusão do CPF</strong> em cadastros de inadimplentes (SERASA/SPC)
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>
                  <strong>Suspensão</strong> de benefícios MEI e INSS
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚠️</span>
                <span>
                  <strong>Impossibilidade</strong> de emissão de certidões negativas
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded border border-gray-200">
            <div className="flex items-start">
              <FileText className="text-red-600 mr-2 mt-0.5" size={18} />
              <div>
                <h3 className="text-md font-semibold text-[#071D41] mb-2">Detalhamento da Pendência</h3>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Pendência identificada:</strong> Ausência de validação inicial do cadastro empresarial (VICE),
                  procedimento obrigatório para empresas constituídas após 2023.
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Valor para regularização:</strong> <span className="text-red-600 font-medium">R$ 64,90</span>{" "}
                  (pagamento único com validade de 12 meses)
                </p>
              </div>
            </div>
          </div>

          <LegalReferences
            references={[
              "Portaria SEFISC nº 24/2023, Art. 12, Parágrafo 3º",
              "Resolução PGFN/ME nº 101/2024",
              "Art. 7º do Regulamento de Abertura Fiscal Integrada (RAFI)",
              "Resolução Administrativa 187/23, Seção II, Art. 5º",
            ]}
          />

          <div className="flex justify-center mt-6">
            <button onClick={handleContinue} className="gov-button-danger">
              Regularizar Agora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
