"use server"

import type { PaymentData } from "@/lib/types"
import { getUserData } from "./user-data"

export async function generatePayment(cpf: string, value = 64.87): Promise<PaymentData> {
  try {
    const token = process.env.GHOSTSPAY_TOKEN

    // Verificar se o token existe
    if (!token) {
      console.warn("Ghosts Pay API token não encontrado nas variáveis de ambiente")
      throw new Error("Token não configurado")
    }

    // Limpar o CPF (remover caracteres não numéricos)
    const cleanCpf = cpf.replace(/\D/g, "")

    // Obter os dados reais do usuário
    const userData = await getUserData(cleanCpf)

    // Extrair informações do usuário
    const userName = userData.name
    const userEmail = userData.email || `${cleanCpf.substring(0, 4)}@exemplo.com`
    const userPhone = userData.phone?.replace(/\D/g, "") || `16${cleanCpf.substring(0, 8)}`

    // Converter valor para centavos (a API espera em centavos)
    const amountInCents = Math.round(value * 100)

    // Construir o payload com os dados reais do usuário
    const pixData = {
      name: userName, // Nome real do cliente
      email: userEmail, // Email do cliente
      cpf: cleanCpf, // CPF do cliente
      phone: userPhone.replace(/\D/g, ""), // Telefone do cliente sem caracteres não numéricos
      paymentMethod: "PIX", // Método de pagamento
      amount: amountInCents, // Valor em centavos
      traceable: true, // Rastreável
      items: [
        {
          unitPrice: amountInCents, // Valor unitário em centavos
          title: "Taxa de Regularização", // Título do item
          quantity: 1, // Quantidade
          tangible: false, // Item não tangível
        },
      ],
    }

    console.log("Tentando gerar pagamento na API Ghosts Pay para CPF:", cleanCpf)
    console.log("Payload enviado:", pixData)

    // Usar o endpoint correto baseado no exemplo PHP
    const apiUrl = "https://app.ghostspaysv1.com/api/v1/transaction.purchase"

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Sem o prefixo "Bearer"
      },
      body: JSON.stringify(pixData),
      // Adicionar cache control para garantir dados atualizados
      cache: "no-store",
      // Adicionar timeout para evitar esperas longas
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      console.error(`Ghosts Pay API error: ${response.status} - ${response.statusText}`)
      const errorText = await response.text()
      console.error("Resposta de erro:", errorText)
      throw new Error(`Ghosts Pay API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("Dados de pagamento recebidos da API Ghosts Pay:", data)

    // Mapear os campos conforme o formato da resposta da API
    return {
      qrCodeUrl: data.pixQrCode || "/qr-code-pix.png", // QR Code em base64
      qrCodeText: data.pixCode || "00020101021226...",
      value: value,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutos de validade
      paymentId: data.id || `payment-${Date.now()}`,
    }
  } catch (error) {
    console.error("Error generating payment:", error)

    // Fallback para simulação - sempre usar a imagem local
    console.log("Usando QR code simulado para pagamento")

    // Criar um código PIX simulado com o valor correto
    const pixCode = `00020101021226580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426655440000520400005303986540${value.toFixed(2).replace(".", "")}5802BR5913Simulador PIX6008Brasilia62070503***63041234`

    return {
      qrCodeUrl: "/qr-code-pix.png",
      qrCodeText: pixCode,
      value: value,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      paymentId: `payment-${Date.now()}`,
    }
  }
}

export async function checkPaymentStatus(paymentId: string): Promise<boolean> {
  try {
    const token = process.env.GHOSTSPAY_TOKEN

    // Verificar se o token existe
    if (!token) {
      console.warn("Ghosts Pay API token não encontrado nas variáveis de ambiente")
      throw new Error("Token não configurado")
    }

    console.log("Verificando status do pagamento:", paymentId)

    // Usar o mesmo endpoint que o código PHP está usando
    const apiUrl = `https://app.ghostspaysv1.com/api/v1/transaction.getpayment?id=${encodeURIComponent(paymentId)}`

    console.log("URL da API para verificação:", apiUrl)

    const response = await fetch(apiUrl, {
      method: "GET", // Especificar método GET explicitamente
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // Sem o prefixo "Bearer"
      },
      // Adicionar cache control para garantir dados atualizados
      cache: "no-store",
      // Adicionar timeout para evitar esperas longas (reduzido para 5 segundos)
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      console.error(`Ghosts Pay API error: ${response.status} - ${response.statusText}`)
      const errorText = await response.text()
      console.error("Resposta de erro:", errorText)
      throw new Error(`Ghosts Pay API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("Resposta completa da API:", data)
    console.log("Status do pagamento recebido:", data.status)

    // Verificar o status do pagamento conforme a documentação da API
    // Aceitar qualquer status que indique pagamento aprovado
    const approvedStatuses = ["paid", "approved", "completed", "PAID", "APPROVED", "COMPLETED", "success", "SUCCESS"]
    return approvedStatuses.includes(data.status)
  } catch (error) {
    console.error("Error checking payment status:", error)

    // Para ambiente de desenvolvimento, podemos ter uma variável de ambiente para simular pagamentos
    if (process.env.NODE_ENV === "development" && process.env.SIMULATE_PAYMENTS === "true") {
      console.log("Ambiente de desenvolvimento: simulando pagamento como realizado")
      return true
    }

    // Em produção, não simular pagamento aprovado em caso de erro
    return false
  }
}
