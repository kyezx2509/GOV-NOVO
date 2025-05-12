import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCPF(cpf: string): string {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

export function formatCNPJ(cnpj: string): string {
  return cnpj
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
}

export function formatDate(date: string): string {
  if (!date) return ""

  try {
    const [year, month, day] = date.split("-")
    return `${day}/${month}/${year}`
  } catch (error) {
    console.error("Error formatting date:", error)
    return date
  }
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function generateProtocol(cpf: string): string {
  const timestamp = Date.now().toString().slice(-6)
  const cpfDigits = cpf.replace(/\D/g, "").slice(0, 4)
  const date = new Date()
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")

  return `REG-FISCAL-${cpfDigits}-${day}${month}`
}

export function getCurrentDate(): string {
  return new Date().toLocaleDateString("pt-BR")
}

export function getCurrentDateTime(): string {
  return new Date().toLocaleString("pt-BR")
}

// Função para validar CPF (algoritmo completo)
export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "")

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cpf)) return false

  // Validação do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (10 - i)
  }
  let remainder = 11 - (sum % 11)
  const digit1 = remainder > 9 ? 0 : remainder

  // Validação do segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cpf.charAt(i)) * (11 - i)
  }
  remainder = 11 - (sum % 11)
  const digit2 = remainder > 9 ? 0 : remainder

  // Verifica se os dígitos calculados são iguais aos dígitos informados
  return digit1 === Number.parseInt(cpf.charAt(9)) && digit2 === Number.parseInt(cpf.charAt(10))
}

// Função para gerar uma data de expiração (hoje às 23:59)
export function getExpirationDate(): string {
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return today.toLocaleString("pt-BR")
}

// Função para gerar um nome baseado no CPF (simulação)
export function generateNameFromCPF(cpf: string): string {
  const lastDigits = cpf.slice(-4)
  const nameOptions = [
    "João Silva",
    "Maria Oliveira",
    "Pedro Santos",
    "Ana Souza",
    "Carlos Ferreira",
    "Juliana Costa",
    "Roberto Almeida",
    "Fernanda Lima",
    "Ricardo Pereira",
    "Patrícia Gomes",
  ]

  const index = Number.parseInt(lastDigits[0] + lastDigits[1]) % nameOptions.length
  return nameOptions[index]
}

// Função para gerar uma razão social baseada no CPF (simulação)
export function generateCompanyNameFromCPF(cpf: string): string {
  const lastDigits = cpf.slice(-4)

  // Tipos de empresas para simulação
  const companyTypes = ["Ltda", "ME", "EIRELI", "MEI", "S/A"]
  const companyType = companyTypes[Number.parseInt(lastDigits[0]) % companyTypes.length]

  // Atividades para simulação
  const activities = ["Comércio", "Serviços", "Consultoria", "Tecnologia", "Alimentação"]
  const activity = activities[Number.parseInt(lastDigits[1]) % activities.length]

  // Nomes para simulação
  const nameOptions = ["Silva", "Oliveira", "Santos", "Costa", "Almeida"]
  const name = nameOptions[Number.parseInt(lastDigits[2]) % nameOptions.length]

  return `${name} ${activity} ${companyType}`
}
