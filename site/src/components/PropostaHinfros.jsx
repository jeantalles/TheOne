import PropostaBaseP from './PropostaBaseP';

const INITIAL_STATE = {
  clientName: 'Hinfros',
  cenarioAtual: `A construção da marca ficou concentrada na comunicação institucional. Falta uma estratégia que defina o posicionamento da Hinfros e oriente como construir valor de marca, produzir conteúdo e se conectar com os contadores.

A experiência no segmento contábil e a qualidade da entrega ainda não aparecem com a mesma força no site e no Instagram. Quem ainda não é cliente não percebe o que torna a Hinfros especializada nem por que escolher suas soluções.

Com o Brasil que Conta e os novos produtos, falta organizar o papel de cada marca e a mensagem que une o ecossistema. O potencial de gerar comunidade e pertencimento entre os contadores ainda precisa ser desenvolvido em narrativa, promessa e comunicação.

Robinson e Lucas também têm experiência e competências que podem fortalecer essa construção, mas suas marcas pessoais ainda precisam de posicionamento e direcionamento de conteúdo para gerar autoridade e atrair clientes.`,
  cenarioDesejado: `Construir um posicionamento que torne a Hinfros e suas soluções reconhecidas pelo valor que entregam aos escritórios contábeis. Definir o papel de cada marca para orientar as decisões de comunicação e sustentar o crescimento do ecossistema.

Fazer do Brasil que Conta uma comunidade da qual os contadores queiram participar. Construir uma narrativa que valorize o contador como parceiro do crescimento das empresas e gere pertencimento em torno da evolução de contador para empresário contábil.

Ser referência na profissionalização dos pequenos escritórios de contabilidade do país, reunindo tecnologia, desenvolvimento empresarial, marca e automação em uma proposta que o público entenda, valorize e queira comprar.

Fortalecer as marcas pessoais de Robinson e Lucas e definir a estratégia de conteúdo e canais das marcas para ampliar a distribuição, gerar demanda e trazer mais clientes para as soluções do ecossistema.`
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
