"use client"

import type React from "react"

import Link from "next/link"
import { Search, User, Menu, HelpCircle, Bell, ChevronDown, Globe } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState("")
  const [notifications, setNotifications] = useState(2)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen("")
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // Fechar menu mobile quando mudar de página
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleDropdownToggle = (e: React.MouseEvent, name: string) => {
    e.stopPropagation()
    setDropdownOpen(dropdownOpen === name ? "" : name)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Busca por: ${searchQuery}`)
    setSearchQuery("")
  }

  return (
    <header className="header-gov">
      <div className="bg-[#071D41] text-white text-xs py-1">
        <div className="gov-container flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/acessibilidade" className="hover:underline flex items-center">
              <span className="sr-only">Acessibilidade</span>
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
                className="mr-1"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m8 12 2 2 4-4"></path>
              </svg>
              <span className="hidden sm:inline">Acessibilidade</span>
            </Link>
            <span className="text-gray-400">|</span>
            <Link href="/mapa-do-site" className="hover:underline hidden sm:block">
              Mapa do site
            </Link>
            <Link href="/alto-contraste" className="hover:underline flex items-center sm:hidden">
              <span className="sr-only">Alto Contraste</span>
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
                className="mr-1"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 18a6 6 0 0 0 0-12v12z"></path>
              </svg>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/acesso-informacao" className="hover:underline hidden sm:block">
              Acesso à informação
            </Link>
            <span className="text-gray-400 hidden sm:block">|</span>
            <Link href="/transparencia" className="hover:underline hidden sm:block">
              Transparência
            </Link>
            <Link href="/idiomas" className="hover:underline flex items-center">
              <Globe size={14} className="mr-1" />
              <span className="hidden sm:inline">Idiomas</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="gov-container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight flex items-center">
                <span className="text-white">GOV</span>
                <span className="text-white opacity-80">.BR</span>
              </h1>
              <h2 className="text-xs font-medium">Plataforma Federal de Conformidade Empresarial</h2>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button
                onClick={(e) => handleDropdownToggle(e, "notifications")}
                className="text-white hover:text-gray-200 relative"
                aria-label="Notificações"
              >
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              {dropdownOpen === "notifications" && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 text-gray-800">
                  <div className="p-3 border-b border-gray-200">
                    <h3 className="font-medium">Notificações</h3>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm font-medium">Validação cadastral pendente</p>
                    <p className="text-xs text-gray-500">Hoje, 10:45</p>
                  </div>
                  <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                    <p className="text-sm font-medium">Atualização do sistema</p>
                    <p className="text-xs text-gray-500">Ontem, 15:30</p>
                  </div>
                  <div className="p-2 text-center">
                    <Link href="/notificacoes" className="text-xs text-blue-600 hover:underline">
                      Ver todas as notificações
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/acesso-restrito" className="text-sm hover:underline flex items-center">
              <User size={16} className="mr-1" />
              Acesso Restrito
            </Link>
            <Link href="/ajuda" className="text-sm hover:underline flex items-center">
              <HelpCircle size={16} className="mr-1" />
              Ajuda
            </Link>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar no portal"
                className="text-sm py-1 px-3 pr-8 rounded text-gray-800 w-40 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search size={16} />
              </button>
            </form>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
      <div className="header-nav">
        <div className="gov-container py-2">
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <Link href="/" className={`hover:underline ${pathname === "/" ? "font-medium" : ""}`}>
              Início
            </Link>
            <div className="relative">
              <button
                onClick={(e) => handleDropdownToggle(e, "servicos")}
                className={`hover:underline flex items-center ${pathname.startsWith("/servicos") ? "font-medium" : ""}`}
              >
                Serviços
                <ChevronDown size={14} className="ml-1" />
              </button>
              {dropdownOpen === "servicos" && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 text-gray-800">
                  <Link
                    href="/servicos/verificacao-fiscal"
                    className="block p-3 hover:bg-gray-50 text-sm border-b border-gray-100"
                  >
                    Verificação Fiscal
                  </Link>
                  <Link
                    href="/servicos/regularizacao"
                    className="block p-3 hover:bg-gray-50 text-sm border-b border-gray-100"
                  >
                    Regularização Empresarial
                  </Link>
                  <Link
                    href="/servicos/certidoes"
                    className="block p-3 hover:bg-gray-50 text-sm border-b border-gray-100"
                  >
                    Emissão de Certidões
                  </Link>
                  <Link href="/servicos" className="block p-3 hover:bg-gray-50 text-sm text-blue-600">
                    Ver todos os serviços
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={(e) => handleDropdownToggle(e, "consultas")}
                className={`hover:underline flex items-center ${
                  pathname.startsWith("/consultas") ? "font-medium" : ""
                }`}
              >
                Consultas
                <ChevronDown size={14} className="ml-1" />
              </button>
              {dropdownOpen === "consultas" && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 text-gray-800">
                  <Link
                    href="/consultas/situacao-cadastral"
                    className="block p-3 hover:bg-gray-50 text-sm border-b border-gray-100"
                  >
                    Situação Cadastral
                  </Link>
                  <Link
                    href="/consultas/debitos"
                    className="block p-3 hover:bg-gray-50 text-sm border-b border-gray-100"
                  >
                    Consulta de Débitos
                  </Link>
                  <Link
                    href="/consultas/processos"
                    className="block p-3 hover:bg-gray-50 text-sm border-b border-gray-100"
                  >
                    Processos Administrativos
                  </Link>
                  <Link href="/consultas" className="block p-3 hover:bg-gray-50 text-sm text-blue-600">
                    Ver todas as consultas
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/regularizacao"
              className={`hover:underline ${pathname === "/regularizacao" ? "font-medium" : ""}`}
            >
              Regularização
            </Link>
            <Link href="/legislacao" className={`hover:underline ${pathname === "/legislacao" ? "font-medium" : ""}`}>
              Legislação
            </Link>
            <Link
              href="/perguntas-frequentes"
              className={`hover:underline ${pathname === "/perguntas-frequentes" ? "font-medium" : ""}`}
            >
              Perguntas Frequentes
            </Link>
          </div>

          {/* Menu mobile */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-[#1351b4] mt-2 rounded-b-md">
              <div className="flex flex-col space-y-2 py-3 px-4">
                <Link href="/" className="text-white hover:underline py-1">
                  Início
                </Link>
                <Link href="/servicos" className="text-white hover:underline py-1">
                  Serviços
                </Link>
                <Link href="/consultas" className="text-white hover:underline py-1">
                  Consultas
                </Link>
                <Link href="/regularizacao" className="text-white hover:underline py-1">
                  Regularização
                </Link>
                <Link href="/legislacao" className="text-white hover:underline py-1">
                  Legislação
                </Link>
                <Link href="/perguntas-frequentes" className="text-white hover:underline py-1">
                  Perguntas Frequentes
                </Link>
                <div className="pt-2 border-t border-blue-700">
                  <Link href="/acesso-restrito" className="text-white hover:underline py-1 flex items-center">
                    <User size={16} className="mr-1" />
                    Acesso Restrito
                  </Link>
                  <Link href="/ajuda" className="text-white hover:underline py-1 flex items-center">
                    <HelpCircle size={16} className="mr-1" />
                    Ajuda
                  </Link>
                  <Link href="/notificacoes" className="text-white hover:underline py-1 flex items-center">
                    <Bell size={16} className="mr-1" />
                    Notificações
                    {notifications > 0 && (
                      <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </Link>
                </div>
                <div className="relative pt-2">
                  <form onSubmit={handleSearch} className="flex">
                    <input
                      type="text"
                      placeholder="Buscar no portal"
                      className="text-sm py-1 px-3 pr-8 rounded-l text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-[#1351b4] text-white px-2 rounded-r flex items-center justify-center"
                    >
                      <Search size={16} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="gov-container py-2">
          <div className="text-xs text-gray-600 flex items-center overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:underline">
              Página Inicial
            </Link>
            {pathname !== "/" && (
              <>
                <span className="mx-2">›</span>
                {pathname === "/verificacao" && <span className="font-medium">Verificação de Conformidade</span>}
                {pathname === "/alerta" && (
                  <>
                    <Link href="/verificacao" className="hover:underline">
                      Verificação de Conformidade
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="font-medium">Alerta Fiscal</span>
                  </>
                )}
                {pathname === "/regularizacao" && (
                  <>
                    <Link href="/verificacao" className="hover:underline">
                      Verificação de Conformidade
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="font-medium">Regularização</span>
                  </>
                )}
                {pathname === "/pagamento" && (
                  <>
                    <Link href="/verificacao" className="hover:underline">
                      Verificação de Conformidade
                    </Link>
                    <span className="mx-2">›</span>
                    <Link href="/regularizacao" className="hover:underline">
                      Regularização
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="font-medium">Pagamento</span>
                  </>
                )}
                {pathname === "/confirmacao" && (
                  <>
                    <Link href="/verificacao" className="hover:underline">
                      Verificação de Conformidade
                    </Link>
                    <span className="mx-2">›</span>
                    <Link href="/regularizacao" className="hover:underline">
                      Regularização
                    </Link>
                    <span className="mx-2">›</span>
                    <Link href="/pagamento" className="hover:underline">
                      Pagamento
                    </Link>
                    <span className="mx-2">›</span>
                    <span className="font-medium">Confirmação</span>
                  </>
                )}
                {pathname === "/termos-de-uso" && <span className="font-medium">Termos de Uso</span>}
                {pathname === "/politica-privacidade" && <span className="font-medium">Política de Privacidade</span>}
                {pathname === "/perguntas-frequentes" && <span className="font-medium">Perguntas Frequentes</span>}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
