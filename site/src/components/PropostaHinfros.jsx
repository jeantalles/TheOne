import PropostaBaseP from './PropostaBaseP';

const INITIAL_STATE = {
  clientName: 'Hinfros',
  cenarioAtual: `A Hinfros já tem experiência em infraestrutura para escritórios contábeis, mas a comunicação atual ainda não evidencia essa especialização nem o valor da entrega.

Com o Contábil Pro e o Brasil que Conta, falta definir como empresa, produtos e movimento se apresentam ao público. Anúncios do Brasil que Conta já atraíram clientes que encontraram uma oferta diferente da expectativa.

Robinson e Lucas querem organizar essa estrutura antes de ampliar a divulgação. Hoje, o investimento na Revo e no tráfego pressiona o caixa, enquanto o formato do ecossistema ainda está em construção.`,
  cenarioDesejado: `Profissionalizar os pequenos escritórios de contabilidade, ajudando o contador a se tornar empresário contábil, com tecnologia, visão de negócio, marca e automação.

Fazer do Brasil que Conta a marca que atrai e reúne esses contadores, com selos de evolução que eles queiram conquistar. A Hinfros sustenta a entrega e a credibilidade do ecossistema, preservando espaço para atender outros mercados.

Construir as marcas pessoais de Robinson e Lucas junto dessa proposta e definir como cada marca se comunica. Com essa direção, alinhar a execução com a Revo e atrair clientes para sustentar o crescimento do projeto.`
};

const INITIAL_SCOPE = {
  selected: {
    estrategia: true,
    estrategia_conteudo: true,
    entrevistas: false,
    naming: false,
    identidade: true,
    identidade_completa: false,
    sitebrand: false,
  },
  myBrandingQty: { mybranding_marca: 2, mybranding_conteudo: 2 },
};

export default function PropostaHinfros() {
  return <PropostaBaseP initialState={INITIAL_STATE} initialScope={INITIAL_SCOPE} />;
}
