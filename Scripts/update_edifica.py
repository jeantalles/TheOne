import re

with open('Site/src/components/PropostaBaseM.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove IS_ALUDE declaration and hardcode to true, or just replace usages.
content = content.replace("const IS_ALUDE = typeof window !== 'undefined' && /^\\/alude\\/?$/.test(window.location.pathname);", "const IS_ALUDE = true;")
content = content.replace("export default function PropostaBaseM() {", "export default function PropostaEdifica() {")

# 2. Update ALUDE_PROPOSAL to EDIFICA_PROPOSAL
edifica_proposal = """const EDIFICA_PROPOSAL = {
  clientName: 'Edifica',
  cenarioAtual: `- Faturamento rodando muito bem (R$ 200k/mês) e operação real robusta, mas que não transparece pro mercado antes da call de vendas (postzinhos sem narrativa forte).\n\n- Dependência 100% de tráfego pago, sem prospecção ativa, com CPL (Custo Por Lead) ficando cada vez mais alto pela concorrência absurda.\n\n- Ticket travado (R$ 1.800 – R$ 2.600) e leads que já entram nas reuniões negociando preço e pedindo descontos pois não percebem valor.\n\n- Concorrência feroz no setor (278 agências oferecendo a "mesma coisa" por valores menores), tornando o mar azul um oceano vermelho onde a diferenciação está difícil.`,
  cenarioDesejado: `- Construir uma narrativa forte e um posicionamento de marca que diferencie a Edifica da concorrência, criando um verdadeiro "movimento" (storytelling, inimigo em comum, comunidade e pertencimento).\n\n- Elevar o ticket para R$ 5.000 – R$ 6.000+, com autoridade pré-construída para que o lead não questione o preço na call de vendas.\n\n- Estruturar a arquitetura da marca onde a Edifica se posiciona como corporativa forte, e as marcas pessoais (Pedro e Léo) funcionam como conselheiros e catalisadores dessa autoridade.\n\n- Ter clareza do direcionamento estratégico para guiar o novo estrategista de conteúdo (social media) na produção contínua.`,
};"""
content = re.sub(r'const ALUDE_PROPOSAL = \{.*?^\};', edifica_proposal, content, flags=re.MULTILINE|re.DOTALL)

# Update references to ALUDE_PROPOSAL
content = content.replace("ALUDE_PROPOSAL", "EDIFICA_PROPOSAL")

# 3. Update SERVICES
services = """const SERVICES = [
  { id: 'estrategia', label: 'Estratégia de Marca e Posicionamento', price: 9000, prazo: '6 semanas' },
  { id: 'identidade', label: 'Identidade de Marca Essencial', price: 6000, prazo: '4 semanas' },
  { id: 'mybranding', label: 'myBranding (Pedro + Léo)', price: 6000, prazo: '4 semanas' }
];"""
content = re.sub(r'const SERVICES = IS_ALUDE.*?];', services, content, flags=re.MULTILINE|re.DOTALL)

# 4. Update Calculadora initial state
calc_initial = """const [selected, setSelected] = useState({
    estrategia: true,
    entrevistas: false,
    naming:     false,
    identidade: true,
    identidade_completa: false,
    sitebrand: false,
  });
  const [myBrandingQty, setMyBrandingQty] = useState(1);
  const myBrandingUnitPrice = 6000;"""
content = re.sub(r'const \[selected, setSelected\] = useState\(\{.*?const myBrandingUnitPrice =.*?;', calc_initial, content, flags=re.MULTILINE|re.DOTALL)

# 5. Update Condições de Pagamento in Calculadora
condicoes = """<span className="font-medium">3 parcelas:</span> {formatBRL(Math.round(total / 3))} (D+0 pra iniciar, D+30 e D+60)"""
content = re.sub(r'\{IS_ALUDE \? <><span className="font-medium">4 parcelas:.*?\}\}', condicoes, content)
prazo = """<span className="font-medium">Prazo:</span> de 10 semanas."""
content = re.sub(r'\{IS_ALUDE \? <><span className="font-medium">Prazo:.*?\}\}', prazo, content)

# 6. Update Consultoria
consultoria = """function Consultoria() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cons-item', {
        opacity: 0, y: 24, stagger: 0.09, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24 flex flex-col justify-center min-h-[100svh]">
      <div className="max-w-[900px] mx-auto w-full">

        <h2 className="cons-item font-halyard font-semibold text-[#181412] text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.1] mb-4">
          Advisory de Conteúdo & Posicionamento
        </h2>
        <p className="cons-item font-halyard font-light text-[#181412] text-[20px] md:text-[22px] leading-[1.5] mb-12 max-w-[58ch]">
          Um acompanhamento estratégico focado em garantir que o planejamento de marca ganhe vida. Atuamos como seu "Head de Conteúdo", direcionando o estrategista (social media), revisando pautas e orientando o tom de voz da Edifica e de vocês.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="cons-item bg-[#F8F8F8] border border-black/10 rounded-2xl p-8 flex flex-col justify-between" style={{ border: '1px solid #FE6942' }}>
            <div>
              <h3 className="font-halyard font-semibold text-[20px] text-[#181412] mb-1">Acompanhamento Quinzenal</h3>
              <ul className="mt-8 space-y-3 mb-10">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0 mt-2.5" />
                  <span className="font-halyard font-light text-[#181412] text-[16px] leading-[1.4]">Direcionamento do estrategista contratado</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0 mt-2.5" />
                  <span className="font-halyard font-light text-[#181412] text-[16px] leading-[1.4]">1 reunião a cada 15 dias para ideação e revisão</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0 mt-2.5" />
                  <span className="font-halyard font-light text-[#181412] text-[16px] leading-[1.4]">Acompanhamento direto e suporte via grupo de WhatsApp</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-halyard font-medium text-[2.2rem] text-[#FE6942] leading-[1]">R$ 4.000<span className="text-[1.125rem] text-black/40 font-light"> /mês</span></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}"""
content = re.sub(r'function Consultoria\(\) \{.*?\}\s*(?=// ── PÁGINA)', consultoria, content, flags=re.MULTILINE|re.DOTALL)

with open('Site/src/components/PropostaEdifica.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
