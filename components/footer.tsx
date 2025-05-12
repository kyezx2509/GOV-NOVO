import type React from "react"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
  TwitterIcon as TikTok,
  Shield,
  FileText,
  Clock,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const lastUpdate = "15/04/2024"

  return (
    <footer className="footer-gov mt-8">
      <div className="gov-container py-6">
        {/* Seção principal do rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold mb-3">Plataforma Federal de Conformidade Empresarial</h3>
            <p className="text-xs text-gray-200 mb-3">Sistema Integrado de Fiscalização e Regularização Tributária</p>
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="bg-[#1351b4] p-2 rounded text-xs text-center w-20 h-10 flex items-center justify-center">
                SEFISC
              </div>
              <div className="bg-[#1351b4] p-2 rounded text-xs text-center w-20 h-10 flex items-center justify-center">
                PGFN
              </div>
              <div className="bg-[#1351b4] p-2 rounded text-xs text-center w-20 h-10 flex items-center justify-center">
                SIF
              </div>
              <div className="bg-[#1351b4] p-2 rounded text-xs text-center w-20 h-10 flex items-center justify-center">
                SERPRO
              </div>
            </div>
            <div className="text-xs text-gray-300 flex items-center mb-2">
              <Shield size={14} className="mr-1" />
              <span>Certificado de Segurança SSL</span>
            </div>
            <div className="text-xs text-gray-300 flex items-center mb-2">
              <Clock size={14} className="mr-1" />
              <span>Última atualização: {lastUpdate}</span>
            </div>
            <div className="text-xs text-gray-300 flex items-center">
              <FileText size={14} className="mr-1" />
              <Link href="/acessibilidade" className="hover:underline">
                Acessibilidade
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Canais de Atendimento</h3>
            <p className="text-xs text-gray-200 mb-1">Telefone: 0800 725 0194</p>
            <p className="text-xs text-gray-200 mb-1">Horário: Segunda a sexta, 8h às 20h</p>
            <p className="text-xs text-gray-200 mb-1">E-mail: atendimento@pfce.gov.br</p>
            <p className="text-xs text-gray-200 mb-3">
              Protocolo:{" "}
              <Link href="/protocolo" className="underline">
                Consultar protocolo
              </Link>
            </p>

            <h3 className="text-sm font-semibold mb-2 mt-4">Redes Sociais</h3>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Youtube">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="WhatsApp">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="TikTok">
                <TikTok size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold mb-3">Serviços</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              <FooterLink href="/servicos/cidadania">Cidadania e Assistência Social</FooterLink>
              <FooterLink href="/servicos/saude">Saúde</FooterLink>
              <FooterLink href="/servicos/educacao">Educação e Pesquisa</FooterLink>
              <FooterLink href="/servicos/trabalho">Trabalho e Previdência</FooterLink>
              <FooterLink href="/servicos/economia">Economia e Gestão Pública</FooterLink>
              <FooterLink href="/servicos/justica">Justiça e Segurança</FooterLink>
              <FooterLink href="/servicos/agricultura">Agricultura e Pecuária</FooterLink>
              <FooterLink href="/servicos/meio-ambiente">Meio Ambiente</FooterLink>
            </div>

            <h3 className="text-sm font-semibold mb-3 mt-6">Sistemas Integrados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              <FooterLinkExternal href="https://www.gov.br/receitafederal">Receita Federal</FooterLinkExternal>
              <FooterLinkExternal href="https://cav.receita.fazenda.gov.br">e-CAC</FooterLinkExternal>
              <FooterLinkExternal href="https://www.gov.br/pgfn">PGFN</FooterLinkExternal>
              <FooterLinkExternal href="https://www.gov.br/empresas-e-negocios/pt-br/redesim">
                Redesim
              </FooterLinkExternal>
              <FooterLinkExternal href="https://www.gov.br/pt-br/servicos/obter-certificado-digital">
                Certificado Digital
              </FooterLinkExternal>
              <FooterLinkExternal href="https://www.gov.br/empresas-e-negocios/pt-br">
                Portal de Serviços
              </FooterLinkExternal>
            </div>
          </div>
        </div>

        {/* Seção de links adicionais */}
        <div className="border-t border-[#1351b4] pt-6 pb-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h4 className="text-xs font-semibold mb-2 text-gray-300">Navegação</h4>
              <ul className="text-xs space-y-1">
                <li>
                  <FooterLink href="/acessibilidade">Acessibilidade</FooterLink>
                </li>
                <li>
                  <FooterLink href="/mapa-do-site">Mapa do Site</FooterLink>
                </li>
                <li>
                  <FooterLink href="/termos-de-uso">Termo de Uso e Aviso de Privacidade</FooterLink>
                </li>
                <li>
                  <FooterLink href="/consultar-solicitacoes">Consultar minhas solicitações</FooterLink>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-2 text-gray-300">Órgãos do Governo</h4>
              <ul className="text-xs space-y-1">
                <li>
                  <FooterLinkExternal href="https://www.gov.br/pt-br">Por dentro do Gov.br</FooterLinkExternal>
                </li>
                <li>
                  <FooterLink href="/perguntas-frequentes">Dúvidas Frequentes</FooterLink>
                </li>
                <li>
                  <FooterLink href="/politica-eparticipacao">Política de e-participação</FooterLink>
                </li>
                <li>
                  <FooterLinkExternal href="https://www.gov.br/governodigital/pt-br">
                    Governo Digital
                  </FooterLinkExternal>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold mb-2 text-gray-300">Temas em Destaque</h4>
              <ul className="text-xs space-y-1">
                <li>
                  <FooterLink href="/orcamento-nacional">Orçamento Nacional</FooterLink>
                </li>
                <li>
                  <FooterLink href="/protecao-dados">Proteção de Dados Pessoais</FooterLink>
                </li>
                <li>
                  <FooterLink href="/servicos-empresas">Serviços para Empresas</FooterLink>
                </li>
                <li>
                  <FooterLink href="/dados-abertos">Dados Abertos</FooterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seção de copyright e informações legais */}
        <div className="border-t border-[#1351b4] pt-4 mt-2">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-xs text-gray-300">
                © {currentYear} Plataforma Federal de Conformidade Empresarial - Todos os direitos reservados
              </p>
            </div>
            <div className="flex items-center">
              <Link href="/acesso-informacao" className="text-xs text-gray-300 hover:text-white mr-4">
                Acesso à Informação
              </Link>
              <Link href="/politica-privacidade" className="text-xs text-gray-300 hover:text-white">
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Componente auxiliar para links do rodapé
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white text-xs">
      {children}
    </Link>
  )
}

// Componente auxiliar para links externos do rodapé
function FooterLinkExternal({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-white text-xs flex items-center"
    >
      {children}
      <ExternalLink size={10} className="ml-1" />
    </a>
  )
}
