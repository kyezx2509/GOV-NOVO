export default function PerguntasFrequentesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="gov-card">
        <h1 className="gov-heading">Perguntas Frequentes</h1>

        <div className="space-y-6 text-sm text-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              1. O que é a Taxa de Regularização Inicial Empresarial?
            </h2>
            <p>
              A Taxa de Regularização Inicial Empresarial é uma taxa obrigatória para empresas recém-formalizadas,
              conforme previsto na Portaria SEFISC nº 24/2023 e Resolução PGFN/ME nº 101/2024. Ela tem como objetivo
              garantir a integridade da base de dados federal e prevenir inconsistências junto ao sistema de emissão
              fiscal, PGFN e plataformas integradas.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">2. Quem deve pagar a Taxa de Regularização?</h2>
            <p>
              Todas as empresas formalizadas como MEI, LTDA, EIRELI ou Sociedade Limitada Unipessoal a partir de janeiro
              de 2023 devem realizar o pagamento da Taxa de Regularização Inicial Empresarial, conforme estabelecido na
              legislação vigente.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">3. Qual o valor da Taxa de Regularização?</h2>
            <p>
              O valor atual da Taxa de Regularização Inicial Empresarial é de R$ 64,90, conforme estabelecido na
              Portaria SEFISC nº 24/2023. Este valor é único e tem validade de 12 meses.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              4. O que acontece se eu não pagar a Taxa de Regularização?
            </h2>
            <p>A não regularização pode resultar em:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Bloqueio temporário de emissão de nota fiscal</li>
              <li>Restrição bancária PJ</li>
              <li>Inclusão do CPF em averbação junto a órgãos reguladores</li>
              <li>Suspensão de benefícios MEI e INSS</li>
              <li>Impossibilidade de emissão de certidões negativas de débitos</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">5. Como posso pagar a Taxa de Regularização?</h2>
            <p>
              O pagamento pode ser realizado através de QR Code PIX gerado na Plataforma Federal de Conformidade
              Empresarial. Após a geração do QR Code, você pode utilizar o aplicativo do seu banco para efetuar o
              pagamento.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              6. Quanto tempo leva para a regularização ser processada?
            </h2>
            <p>
              Após o pagamento, a regularização é processada automaticamente e a situação da empresa é atualizada
              imediatamente nos sistemas integrados. O comprovante de regularização é gerado na hora e enviado para o
              e-mail cadastrado.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">7. A Taxa de Regularização é anual?</h2>
            <p>
              Não, a Taxa de Regularização Inicial Empresarial é um pagamento único com validade de 12 meses. Após este
              período, a empresa já estará devidamente regularizada no sistema.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              8. Como posso obter o comprovante de regularização?
            </h2>
            <p>
              O comprovante de regularização é gerado automaticamente após a confirmação do pagamento. Ele pode ser
              baixado, impresso ou enviado por e-mail diretamente na plataforma. Além disso, uma cópia é enviada
              automaticamente para o e-mail vinculado ao CPF do responsável legal.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              9. O que é a Validação Inicial de Cadastro Empresarial (VICE)?
            </h2>
            <p>
              A Validação Inicial de Cadastro Empresarial (VICE) é um procedimento obrigatório para empresas
              recém-formalizadas, que visa garantir a integridade dos dados cadastrais e fiscais junto aos órgãos
              governamentais. Este procedimento é realizado através do pagamento da Taxa de Regularização Inicial
              Empresarial.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              10. Como posso verificar se minha empresa está regularizada?
            </h2>
            <p>
              Você pode verificar a situação de regularização da sua empresa através da Plataforma Federal de
              Conformidade Empresarial, informando o CPF do responsável legal. O sistema apresentará o status atual da
              empresa e, se necessário, as pendências a serem regularizadas.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              11. Posso parcelar o pagamento da Taxa de Regularização?
            </h2>
            <p>
              Não, a Taxa de Regularização Inicial Empresarial deve ser paga em parcela única, conforme estabelecido na
              legislação vigente.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-800 mb-2">
              12. Preciso de um certificado digital para realizar a regularização?
            </h2>
            <p>
              Não é necessário certificado digital para realizar a regularização. O processo pode ser feito informando o
              CPF do responsável legal na Plataforma Federal de Conformidade Empresarial.
            </p>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded border border-blue-200">
            <p className="font-medium text-blue-800">Ainda tem dúvidas?</p>
            <p className="mt-2">
              Entre em contato com a Central de Atendimento pelo telefone <strong>0800 725 0194</strong>, de segunda a
              sexta-feira, das 8h às 20h, ou envie um e-mail para <strong>atendimento@pfce.gov.br</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
