import re

with open('site/src/components/PropostaAnderson.jsx', 'r') as f:
    content = f.read()

# 1. SLIDE_TOTAL
content = re.sub(r'const SLIDE_TOTAL = 20;', 'const SLIDE_TOTAL = 8;', content)
# 2. DARK_SLIDES
content = re.sub(r'const DARK_SLIDES = \[0, 1, 4, 5, 6, 7, 8, 10, 16\];', 'const DARK_SLIDES = [0, 5, 7];', content)

# 3. Modify Capa
content = re.sub(r'Bem-vindo à TheOne', 'Anderson Neville', content)
content = re.sub(r'Construindo um posicionamento inevitável', 'Site de Advocacia', content)

# 4. Modify Dores to be Diferenças
# Replace the dores array and the rendering of it.
old_dores_start = content.find('const dores = [')
old_dores_end = content.find('  useEffect(() => {', old_dores_start)

new_dores = """const dores = [
    {
      titulo: 'Outras Consultorias',
      descricao: 'Cobram mensalidade de manutenção (R$ 200 a R$ 500) e taxa de hospedagem (R$ 100 a R$ 150). O site nunca é 100% seu.',
    },
    {
      titulo: 'Nosso Modelo',
      descricao: 'ZERO mensalidade. Hospedagem por nossa conta. O site é 100% seu. Pague apenas quando precisar de uma alteração (R$ 100 a R$ 300).',
    },
  ];
"""
content = content[:old_dores_start] + new_dores + content[old_dores_end:]

content = content.replace('O que impede marcas como a sua de crescerem', 'Chega de ficar preso a mensalidades abusivas')
content = content.replace('Diagnóstico', 'A Nossa Diferença')
content = content.replace('A raiz de tudo isso é uma marca sem fundação estratégica.', 'O único custo que você terá é a renovação anual do seu domínio.')
content = content.replace('Não é sobre logo ou cores. É sobre o que você representa no mercado, e por que alguém deveria te escolher.', 'Que varia de R$ 80 a R$ 150/ano. Nada a mais.')

# 5. Simplify PropostaSlideshow render
slides_render_start = content.find('{current === 0  && <Capa />}')
slides_render_end = content.find('</div>', slides_render_start)

new_slides_render = """{current === 0  && <Capa />}
        {current === 1  && <Dores />}
        {current === 2  && <CaseSlide slug="zenic" />}
        {current === 3  && <CaseSlide slug="thunders" />}
        {current === 4  && <CaseSlide slug="camilla-toscano" />}
        {current === 5  && <SobreJean scrollerRef={slideScrollRef} />}
        {current === 6  && <Cronograma />}
        {current === 7  && <Calculadora />}
"""
content = content[:slides_render_start] + new_slides_render + content[slides_render_end:]

# 6. Adjust Cronograma
content = content.replace('Como seu projeto será executado', 'O Passo a Passo')
content = content.replace('Mapeamento e Fundações', 'Contrato e Pagamento')
content = content.replace('Imersão profunda no negócio, análise de concorrentes, entrevistas de diagnóstico e definição da arquitetura da marca.', 'Assinatura simples do contrato e definição do pagamento (50% ou à vista).')
content = content.replace('Definição Estratégica', 'Rodada de Ajustes')
content = content.replace('Desenvolvimento do posicionamento central, manifesto, tom de voz, territórios da marca e entrega do TheOne Foundation.', 'Como o site já foi construído, faremos até 2 rodadas de revisões e ajustes de informações e conteúdo.')
content = content.replace('Identidade e Materialização', 'Contratação e Configuração')
content = content.replace('Criação do sistema visual, design de touchpoints, assets fotográficos, tipografia e entrega do Brandbook.', 'Nós cuidamos de registrar seu domínio, configurar a hospedagem e deixar a estrutura pronta pra rodar.')
content = content.replace('Implementação e Lançamento', 'Entrega Final')
content = content.replace('Setup das estruturas digitais (site, redes), treinamento interno, acompanhamento de rollout e go-to-market.', 'Passamos todos os acessos do domínio e do site para você. Projeto 100% finalizado e no seu controle.')

# 7. Adjust Calculadora
content = content.replace('Investimento do Projeto', 'O que está incluso')
content = content.replace('const totalPrice = includedServices.reduce((acc, serviceId) => {', 'const totalPrice = 2500;')

# We can replace the initial state of includedServices so it doesn't calculate dynamically, or just replace the JSX.
# It's easier to just replace the JSX of Calculadora.
calc_jsx_start = content.find('return (', content.find('function Calculadora'))
calc_jsx_end = content.find('function Consultoria', calc_jsx_start)

new_calc_jsx = """return (
    <section className="bg-white min-h-[100svh] flex flex-col pt-16 md:pt-20 pb-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1000px] mx-auto w-full flex-1 flex flex-col">
        <div className="mb-12 md:mb-16">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold block mb-4">Investimento</span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.5rem,4vw,3.75rem)] leading-[1.02] tracking-tight">O que está incluso</h2>
        </div>
        <div className="flex-1 flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <div className="p-6 border border-black/10 rounded-xl">
              <h3 className="font-halyard font-semibold text-[20px] mb-2">Site Completo</h3>
              <p className="font-halyard text-black/60">Implementação do Site de Advocacia</p>
            </div>
            <div className="p-6 border border-black/10 rounded-xl">
              <h3 className="font-halyard font-semibold text-[20px] mb-2">Hospedagem The One</h3>
              <p className="font-halyard text-black/60">Sem custos mensais</p>
            </div>
            <div className="p-6 border border-black/10 rounded-xl">
              <h3 className="font-halyard font-semibold text-[20px] mb-2">Transferência Total</h3>
              <p className="font-halyard text-black/60">Posse total do domínio e site</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-end items-end text-right">
            <span className="font-halyard text-black/40 uppercase tracking-widest text-sm mb-2">Investimento Total</span>
            <h1 className="font-editorial text-[clamp(3.5rem,5vw,4.5rem)] text-black leading-none mb-4">R$ 2.500</h1>
            <div className="font-halyard text-black/60 space-y-2 text-right">
              <p><b>50/50:</b> 50% de entrada + 50% na entrega</p>
              <p><b>À vista:</b> 5% de desconto</p>
              <p><b>Cartão:</b> Parcelamento disponível (taxa da operadora)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"""
content = content[:calc_jsx_start] + new_calc_jsx + content[calc_jsx_end:]

with open('site/src/components/PropostaAnderson.jsx', 'w') as f:
    f.write(content)
