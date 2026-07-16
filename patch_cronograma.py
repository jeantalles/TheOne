import re

with open('site/src/components/PropostaAnderson.jsx', 'r') as f:
    content = f.read()

cronograma_code = """
const CRONOGRAMA_STEPS = [
  { etapa: '01', nome: 'Contrato e Pagamento', descricao: 'Assinatura simples do contrato e definição do pagamento (50% ou à vista).' },
  { etapa: '02', nome: 'Rodada de Ajustes', descricao: 'Como o site já foi construído, faremos até 2 rodadas de revisões e ajustes de informações e conteúdo.' },
  { etapa: '03', nome: 'Configuração', descricao: 'Nós cuidamos de registrar seu domínio, configurar a hospedagem e deixar a estrutura pronta pra rodar.' },
  { etapa: '04', nome: 'Entrega Final', descricao: 'Passamos todos os acessos do domínio e do site para você. Projeto 100% finalizado e no seu controle.' },
];

function Cronograma() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }
      gsap.from('.crono-p-step', {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-24 pb-28 md:py-36 px-6 md:px-12 lg:px-16 min-h-[100svh] flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto w-full">

        <div className="mb-24 md:mb-32 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.55fr)] gap-8 lg:gap-16 items-end">
          <div>
            <span className="font-halyard text-[15px] md:text-[17px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
              O Passo a Passo
            </span>
            <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
              Como seu projeto será executado
            </h2>
          </div>
          <p className="font-halyard font-light text-black text-[20px] md:text-[24px] leading-[1.45] max-w-[36ch] lg:justify-self-end lg:text-right">
            Processo prático, sem enrolação e focado no resultado.
          </p>
        </div>

        <div className="hidden md:block relative">
          <div className="absolute top-[36px] left-0 right-0 h-px bg-black/10" />
          <div ref={lineRef} className="absolute top-[36px] left-0 right-0 h-px bg-[#FE6942] origin-left" />
          <div className="grid" style={{ gridTemplateColumns: `repeat(${CRONOGRAMA_STEPS.length}, 1fr)` }}>
            {CRONOGRAMA_STEPS.map((step, i) => (
              <div key={i} className="crono-p-step flex flex-col items-center text-center px-4">
                <div className="w-[72px] h-[72px] rounded-full border-2 border-[#FE6942] bg-white flex items-center justify-center mb-6 relative z-10">
                  <span className="font-halyard font-medium text-[#FE6942] text-[1.55rem]">{step.etapa}</span>
                </div>
                <span className="font-halyard font-medium text-[#181412] text-[19px] lg:text-[20px] mb-2">{step.nome}</span>
                <p className="font-halyard font-light text-black text-[16px] lg:text-[17px] leading-[1.45]">{step.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden relative pl-10">
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-black/10" />
          <div className="space-y-10">
            {CRONOGRAMA_STEPS.map((step, i) => (
              <div key={i} className="crono-p-step relative">
                <div className="absolute -left-[28px] top-0 w-9 h-9 rounded-full border-2 border-[#FE6942] bg-white flex items-center justify-center">
                  <span className="font-halyard font-medium text-[#FE6942] text-[1rem]">{step.etapa}</span>
                </div>
                <span className="font-halyard font-medium text-[#181412] text-[21px] block mb-1">{step.nome}</span>
                <p className="font-halyard font-light text-black text-[18px] leading-[1.5]">{step.descricao}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

"""

# Insert right before function Calculadora
content = content.replace('function Calculadora({ clientName }) {', cronograma_code + '\nfunction Calculadora({ clientName }) {')

with open('site/src/components/PropostaAnderson.jsx', 'w') as f:
    f.write(content)
