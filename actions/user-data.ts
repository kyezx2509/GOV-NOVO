"use server"

import { getPersonData } from "./data-get"
import type { PersonData } from "@/lib/types"

// Cache para armazenar dados do usuário por CPF
const userDataCache = new Map<string, PersonData>()

export async function getUserData(cpf: string): Promise<PersonData> {
  // Verificar se já temos os dados no cache
  if (userDataCache.has(cpf)) {
    return userDataCache.get(cpf)!
  }

  try {
    // Obter dados do usuário usando a função existente
    const personData = await getPersonData(cpf)

    // Armazenar no cache para uso futuro
    userDataCache.set(cpf, personData)

    return personData
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error)

    // Fallback para dados simulados
    const fallbackData: PersonData = {
      name: `Usuário ${cpf.substring(0, 4)}`,
      birthDate: "01/01/1980",
      address: "Endereço não disponível",
      email: `${cpf.substring(0, 4)}@exemplo.com`,
      phone: `(${cpf.substring(0, 2)}) 9${cpf.substring(2, 6)}-${cpf.substring(6, 10)}`,
    }

    return fallbackData
  }
}
