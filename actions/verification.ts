"use server"

import { getPersonData } from "./data-get"
import type { VerificationData } from "@/lib/types"

export async function verifyTaxStatus(cpf: string): Promise<VerificationData> {
  // 1. Buscar dados pessoais
  const personData = await getPersonData(cpf)

  // 2. Gerar dados da empresa simulados
  const companyData = generateSimulatedCompanyData(cpf, personData.name)

  // 3. Retornar dados consolidados
  return {
    cpf,
    personData,
    companyData,
  }
}

// Função para gerar dados simulados da empresa
function generateSimulatedCompanyData(cpf: string, name: string) {
  // Gerar CNPJ baseado no CPF para simular consistência
  const lastDigits = cpf.slice(-4)
  const cnpjBase = `${lastDigits}${lastDigits}00001`
  const formattedCnpj = `${cnpjBase.slice(0, 2)}.${cnpjBase.slice(2, 5)}.${cnpjBase.slice(5, 8)}/0001-00`

  // Tipos de empresas para simulação
  const companyTypes = ["Ltda", "ME", "EIRELI", "MEI", "S/A"]
  const companyType = companyTypes[Number.parseInt(lastDigits[0]) % companyTypes.length]

  // Atividades para simulação
  const activities = ["Comércio", "Serviços", "Consultoria", "Tecnologia", "Alimentação"]
  const activity = activities[Number.parseInt(lastDigits[1]) % activities.length]

  // Razão social baseada no nome e atividade
  const nameParts = name.split(" ")
  const firstName = nameParts[0] || "Empresa"
  const razaoSocial = `${firstName} ${activity} ${companyType}`

  // Data de abertura recente (últimos 3 meses)
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1
  const randomMonth = Math.max(1, currentMonth - (Number.parseInt(lastDigits[2]) % 3))
  const randomDay = Math.floor(1 + (Number.parseInt(lastDigits[3]) % 28))
  const dataAbertura = `${currentYear}-${String(randomMonth).padStart(2, "0")}-${String(randomDay).padStart(2, "0")}`

  return {
    cnpj: formattedCnpj,
    razaoSocial: razaoSocial,
    naturezaJuridica: "Sociedade Empresária Limitada",
    dataAbertura: dataAbertura,
    situacaoCadastral: "Ativa",
    capitalSocial: (10000 + (Number.parseInt(lastDigits) % 90000)).toFixed(2),
    endereco: "Av. Paulista, 1000, Bela Vista, São Paulo/SP, CEP 01310-100",
    atividadePrincipal: `${activity} em geral`,
  }
}
