export interface PersonData {
  name: string
  birthDate: string
  address: string
  email?: string
  phone?: string
}

export interface CompanyData {
  cnpj: string
  razaoSocial: string
  naturezaJuridica: string
  dataAbertura: string
  situacaoCadastral?: string
  capitalSocial?: string
  endereco?: string
  atividadePrincipal?: string
}

export interface VerificationData {
  cpf: string
  personData: PersonData
  companyData: CompanyData
  protocol?: string
  verificationDate?: string
}

export interface PaymentData {
  qrCodeUrl: string
  qrCodeText: string
  value: number
  expiresAt: string
  paymentId: string
}

export interface ValidationStatus {
  status: "pending" | "valid" | "invalid"
  message: string
  lastChecked: string
}

export interface NotificationSettings {
  email: boolean
  sms: boolean
  push: boolean
}

export interface UserPreferences {
  notifications: NotificationSettings
  language: string
  accessibility: {
    highContrast: boolean
    fontSize: "small" | "medium" | "large"
  }
}
