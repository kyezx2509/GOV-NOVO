export default function PoliticaPrivacidadePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        <h1 className="gov-heading">Política de Privacidade</h1>

        <div className="space-y-4 text-sm text-gray-700">
          <p>
            Esta Política de Privacidade ("Política") descreve como a Plataforma Federal de Conformidade Empresarial
            ("Plataforma"), operada pela Secretaria Especial de Fiscalização e Conformidade ("SEFISC"), coleta, usa,
            armazena, processa e compartilha seus dados pessoais.
          </p>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">1. Dados Coletados</h2>
          <p>A Plataforma pode coletar os seguintes tipos de dados:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Dados de identificação (CPF, nome, data de nascimento)</li>
            <li>Dados empresariais (CNPJ, razão social, data de abertura)</li>
            <li>Dados de contato (e-mail, telefone, endereço)</li>
            <li>Dados de acesso e uso da Plataforma</li>
            <li>Dados de pagamento para fins de regularização fiscal</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2. Finalidades do Tratamento</h2>
          <p>Os dados pessoais são tratados para as seguintes finalidades:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Verificação de conformidade fiscal e cadastral</li>
            <li>Identificação e regularização de pendências</li>
            <li>Emissão de guias e comprovantes</li>
            <li>Comunicação com o usuário</li>
            <li>Cumprimento de obrigações legais e regulatórias</li>
            <li>Prevenção de fraudes e segurança</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">3. Base Legal</h2>
          <p>O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Cumprimento de obrigação legal ou regulatória</li>
            <li>Execução de políticas públicas</li>
            <li>Execução de contrato ou procedimentos preliminares</li>
            <li>Legítimo interesse</li>
            <li>Consentimento, quando aplicável</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">4. Compartilhamento de Dados</h2>
          <p>Os dados pessoais podem ser compartilhados com:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Órgãos governamentais (Receita Federal, PGFN, etc.)</li>
            <li>Prestadores de serviços que atuam em nome da SEFISC</li>
            <li>Instituições financeiras para processamento de pagamentos</li>
            <li>Autoridades judiciais, administrativas ou governamentais, quando exigido por lei</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">5. Segurança dos Dados</h2>
          <p>
            A SEFISC implementa medidas técnicas e organizacionais apropriadas para proteger os dados pessoais contra
            acesso não autorizado, alteração, divulgação ou destruição. Essas medidas incluem criptografia, controles de
            acesso, auditorias de segurança e planos de contingência.
          </p>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">6. Direitos dos Titulares</h2>
          <p>De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Confirmação da existência de tratamento</li>
            <li>Acesso aos dados</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados</li>
            <li>
              Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade
            </li>
            <li>Portabilidade dos dados</li>
            <li>Revogação do consentimento</li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">7. Retenção de Dados</h2>
          <p>
            Os dados pessoais são armazenados pelo tempo necessário para cumprir as finalidades para as quais foram
            coletados, incluindo obrigações legais, contratuais, de prestação de contas ou requisição de autoridades
            competentes.
          </p>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">8. Cookies e Tecnologias Similares</h2>
          <p>
            A Plataforma utiliza cookies e tecnologias similares para melhorar a experiência do usuário, analisar o
            tráfego e personalizar o conteúdo. Você pode gerenciar suas preferências de cookies através das
            configurações do seu navegador.
          </p>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">9. Alterações na Política</h2>
          <p>
            Esta Política pode ser atualizada periodicamente. A versão mais recente estará sempre disponível na
            Plataforma. Recomendamos que você revise esta Política regularmente.
          </p>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">10. Contato</h2>
          <p>
            Para exercer seus direitos ou esclarecer dúvidas sobre esta Política, entre em contato com o Encarregado de
            Proteção de Dados (DPO) através do e-mail: dpo@pfce.gov.br ou pelo telefone: 0800 725 0194.
          </p>

          <div className="mt-8 text-xs text-gray-500">
            <p>Última atualização: 15 de janeiro de 2024</p>
            <p>Plataforma Federal de Conformidade Empresarial - SEFISC/PGFN</p>
          </div>
        </div>
      </div>
    </div>
  )
}
