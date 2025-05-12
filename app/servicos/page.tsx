import type React from "react"
import Link from "next/link"
import { FileText, Search, CheckCircle, AlertTriangle, Shield, Clock, HelpCircle, FileCheck } from "lucide-react"

export default function ServicosPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="gov-card">
        <h1 className="gov-heading text-center text-2xl md:text-3xl mb-6">Serviços Disponíveis</h1>

        <div className="mb-6">
          <div className="relative">
            <input type="text" placeholder="Buscar serviços..." className="gov-input pl-10" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            title="Verificação de Conformidade Empresarial"
            description="Verifique pendências cadastrais e obrigações fiscais iniciais da sua empresa"
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            href="/"
            tags={["Empresas", "Regularização"]}
          />

          <ServiceCard
            title="Emissão de Certidões"
            description="Emita certidões negativas de débitos e outras certidões fiscais"
            icon={<FileCheck className="h-6 w-6 text-blue-600" />}
            href="/servicos/certidoes"
            tags={["Empresas", "Documentos"]}
          />

          <ServiceCard
            title="Consulta de Situação Cadastral"
            description="Consulte a situação cadastral de pessoas físicas e jurídicas"
            icon={<Search className="h-6 w-6 text-blue-600" />}
            href="/servicos/situacao-cadastral"
            tags={["Empresas", "Consultas"]}
          />

          <ServiceCard
            title="Regularização de Pendências"
            description="Regularize pendências fiscais e cadastrais junto aos órgãos governamentais"
            icon={<CheckCircle className="h-6 w-6 text-blue-600" />}
            href="/regularizacao"
            tags={["Empresas", "Regularização"]}
          />

          <ServiceCard
            title="Consulta de Débitos"
            description="Consulte débitos fiscais e tributários de pessoas físicas e jurídicas"
            icon={<AlertTriangle className="h-6 w-6 text-blue-600" />}
            href="/servicos/debitos"
            tags={["Empresas", "Consultas"]}
          />

          <ServiceCard
            title="Validação de Documentos"
            description="Valide a autenticidade de documentos fiscais e certidões"
            icon={<Shield className="h-6 w-6 text-blue-600" />}
            href="/servicos/validacao"
            tags={["Documentos", "Validação"]}
          />

          <ServiceCard
            title="Parcelamento de Débitos"
            description="Solicite o parcelamento de débitos fiscais e tributários"
            icon={<Clock className="h-6 w-6 text-blue-600" />}
            href="/servicos/parcelamento"
            tags={["Empresas", "Regularização"]}
          />

          <ServiceCard
            title="Orientações Fiscais"
            description="Obtenha orientações sobre obrigações fiscais e tributárias"
            icon={<HelpCircle className="h-6 w-6 text-blue-600" />}
            href="/servicos/orientacoes"
            tags={["Empresas", "Orientações"]}
          />

          <ServiceCard
            title="Consulta de Processos"
            description="Consulte o andamento de processos administrativos fiscais"
            icon={<FileText className="h-6 w-6 text-blue-600" />}
            href="/servicos/processos"
            tags={["Processos", "Consultas"]}
          />
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Precisa de ajuda?</h2>
          <p className="text-sm text-gray-700 mb-2">
            Se você não encontrou o serviço que procura ou precisa de assistência, entre em contato com nossa central de
            atendimento.
          </p>
          <p className="text-sm text-gray-700">
            Telefone: <strong>0800 725 0194</strong> (Segunda a sexta, das 8h às 20h)
          </p>
        </div>
      </div>
    </div>
  )
}

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  tags?: string[]
}

function ServiceCard({ title, description, icon, href, tags }: ServiceCardProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">{icon}</div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
