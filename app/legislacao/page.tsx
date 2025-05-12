export default function LegislacaoPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="gov-card">
        <h1 className="gov-heading text-center text-2xl md:text-3xl mb-6">Legislação Aplicável</h1>

        <div className="space-y-6 text-sm text-gray-700">
          <section>
            <h2 className="text-lg font-semibold text-[#071D41] mb-3">Portaria SEFISC nº 24/2023</h2>
            <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-4">
              <p className="mb-2">
                <strong>Artigo 12, Parágrafo 3º:</strong> Estabelece a obrigatoriedade da Taxa de Regularização Inicial
                Empresarial (TRIE) para todas as empresas constituídas a partir de janeiro de 2023, independentemente de
                sua natureza jurídica ou regime tributário.
              </p>
              <p>
                "Todas as pessoas jurídicas formalizadas a partir de 01/01/2023 deverão realizar a validação cadastral
                fiscal inicial mediante o pagamento da Taxa de Regularização Inicial Empresarial (TRIE), no valor
                estabelecido pela Secretaria Especial de Fiscalização e Conformidade, como requisito para a plena
                operação fiscal e emissão de documentos fiscais eletrônicos."
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="mb-2">
                <strong>Artigo 14:</strong> Define as consequências da não regularização:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Bloqueio temporário de emissão de documentos fiscais eletrônicos até a regularização da pendência;
                </li>
                <li>
                  Inclusão da pessoa jurídica na lista de empresas com restrições operacionais junto ao sistema
                  bancário;
                </li>
                <li>Impossibilidade de emissão de certidões negativas de débitos fiscais e tributários;</li>
                <li>
                  Inclusão do CPF do responsável legal em cadastros de inadimplentes em caso de não regularização após
                  90 dias do prazo estabelecido;
                </li>
                <li>
                  Aplicação de multa adicional de 20% sobre o valor da taxa após o vencimento, acrescida de juros de 1%
                  ao mês.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#071D41] mb-3">Resolução PGFN/ME nº 101/2024</h2>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="mb-2">
                Regulamenta os procedimentos de validação cadastral fiscal inicial e estabelece a integração entre os
                sistemas da Receita Federal, PGFN e demais órgãos fiscalizadores para o monitoramento do cumprimento da
                obrigação.
              </p>
              <p className="mb-2">
                <strong>Artigo 3º:</strong> "A Taxa de Regularização Inicial Empresarial (TRIE) constitui obrigação
                acessória indispensável para a regularidade fiscal da pessoa jurídica, sendo seu pagamento condição
                necessária para a plena operação da empresa no Sistema Tributário Nacional."
              </p>
              <p>
                <strong>Artigo 5º:</strong> "O pagamento da TRIE terá validade de 12 (doze) meses a contar da data de
                quitação, sendo dispensada sua renovação após este período, desde que a empresa mantenha regularidade em
                suas demais obrigações fiscais."
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#071D41] mb-3">
              Regulamento de Abertura Fiscal Integrada (RAFI)
            </h2>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="mb-2">
                <strong>Artigo 7º:</strong> Estabelece os procedimentos para a Validação Inicial de Cadastro Empresarial
                (VICE) e sua importância para a integridade do sistema tributário nacional.
              </p>
              <p className="mb-2">
                "A Validação Inicial de Cadastro Empresarial (VICE) tem como objetivo garantir a autenticidade e
                integridade dos dados cadastrais das pessoas jurídicas recém-constituídas, prevenindo fraudes fiscais e
                assegurando a conformidade com as normas tributárias desde o início das atividades empresariais."
              </p>
              <p>
                "O procedimento de validação será realizado mediante o pagamento da Taxa de Regularização Inicial
                Empresarial (TRIE), cujo valor será definido anualmente pela Secretaria Especial de Fiscalização e
                Conformidade, considerando os custos operacionais do sistema de validação e monitoramento."
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#071D41] mb-3">Resolução Administrativa 187/23</h2>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="mb-2">
                <strong>Seção II, Artigo 5º:</strong> Define os prazos e procedimentos para a regularização cadastral
                fiscal inicial.
              </p>
              <p className="mb-2">
                "As empresas constituídas a partir de 01/01/2023 deverão realizar a validação cadastral fiscal inicial
                no prazo de até 90 (noventa) dias após a data de abertura constante no CNPJ, sob pena de restrições
                operacionais conforme estabelecido na Portaria SEFISC nº 24/2023."
              </p>
              <p>
                "Para as empresas constituídas antes da publicação desta Resolução e que ainda não realizaram a
                validação cadastral fiscal inicial, fica estabelecido o prazo de regularização até 31/12/2024, após o
                qual serão aplicadas as restrições previstas na legislação."
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#071D41] mb-3">Instrução Normativa RFB nº 2.119/2022</h2>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="mb-2">
                Dispõe sobre o Cadastro Nacional da Pessoa Jurídica (CNPJ) e estabelece a necessidade de validação
                cadastral para a plena operação fiscal das empresas.
              </p>
              <p className="mb-2">
                <strong>Artigo 28, Parágrafo 4º:</strong> "A regularidade cadastral da pessoa jurídica junto ao CNPJ
                está condicionada ao cumprimento de todas as obrigações acessórias estabelecidas pela legislação
                tributária, incluindo a validação cadastral fiscal inicial para empresas constituídas a partir de
                01/01/2023."
              </p>
              <p>
                <strong>Artigo 32:</strong> "A Receita Federal do Brasil poderá suspender a inscrição no CNPJ quando
                constatada a omissão de obrigações acessórias ou a existência de pendências cadastrais que comprometam a
                regularidade fiscal da pessoa jurídica."
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#071D41] mb-3">Lei Complementar nº 197/2023</h2>
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <p className="mb-2">
                Altera dispositivos da Lei Complementar nº 123/2006 (Estatuto Nacional da Microempresa e da Empresa de
                Pequeno Porte) e estabelece a obrigatoriedade da validação cadastral fiscal inicial também para
                Microempreendedores Individuais (MEI), Microempresas (ME) e Empresas de Pequeno Porte (EPP).
              </p>
              <p className="mb-2">
                <strong>Artigo 17, Inciso XVI:</strong> "Não poderão recolher os impostos e contribuições na forma do
                Simples Nacional a microempresa ou a empresa de pequeno porte que possua pendências relacionadas à
                validação cadastral fiscal inicial, conforme estabelecido em regulamento específico."
              </p>
              <p>
                <strong>Artigo 18-A, Parágrafo 15-B:</strong> "O Microempreendedor Individual (MEI) deverá realizar a
                validação cadastral fiscal inicial nos termos estabelecidos pela Secretaria Especial de Fiscalização e
                Conformidade, como condição para a manutenção de seu enquadramento no SIMEI."
              </p>
            </div>
          </section>

          <div className="mt-8 p-4 bg-gray-50 rounded border border-gray-200">
            <p className="text-xs text-gray-500">
              <strong>Nota:</strong> A legislação acima é constantemente atualizada. Para consultar a versão mais
              recente e obter informações detalhadas, acesse o Portal da Legislação do Governo Federal ou consulte um
              profissional especializado.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
