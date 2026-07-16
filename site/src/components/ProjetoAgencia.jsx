import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Briefcase, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SLIDE_TOTAL = 6;
const DARK_SLIDES = [0, 1, 2];

// ── SLIDE 0: CAPA ─────────────────────────────────────────────────────────────
function Capa() {
  return (
    <section
      className="relative overflow-hidden flex flex-col justify-between"
      style={{ height: '100svh', background: '#0a0a0a', padding: '48px 56px 44px' }}
    >
      <div className="noise-overlay" aria-hidden="true" />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '-120px', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,255,255,.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, paddingBottom: '20px' }}>
        <img src="https://platform.thegrowthhub.com.br/assets/logo-bFz4opvq.png" alt="The Growth Hub" style={{ height: '36px', width: 'auto', display: 'block', margin: '0 auto' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-100px' }}>
        <h1
          className="text-[clamp(3.5rem,7vw,6.5rem)] leading-[1.05] tracking-tighter text-white mb-8 font-semibold"
        >
          <span className="text-white/60 font-medium">Bem-vindos</span><br />
          <span className="relative inline-block pb-1">
            IDP
            <div className="absolute left-0 bottom-2 md:bottom-3 w-full h-[6px] md:h-[8px] bg-[#A3E635] -z-10" />
          </span>
        </h1>

        <p
          className="text-[clamp(1.1rem,1.5vw,1.35rem)] text-white/60 font-light max-w-[32ch] mx-auto leading-relaxed"
        >
          Ao seu projeto de <strong className="text-white font-medium">reposicionamento de marca</strong>.
        </p>
      </div>
    </section>
  );
}

// ── SLIDE 1: SOBRE O JEAN ────────────────────────────────────────────────────
const CLIENT_LOGOS = [
  { src: '/images/founders-logos/o-boticario.png', alt: 'O Boticario' },
  { src: '/images/founders-logos/max-titanium.png', alt: 'Max Titanium' },
  { src: '/images/founders-logos/stihl.png', alt: 'Stihl' },
  { src: '/images/founders-logos/jacuzzi.png', alt: 'Jacuzzi' },
  { src: '/images/founders-logos/arezzo.png', alt: 'Arezzo' },
  { src: '/images/founders-logos/cyrela.png', alt: 'Cyrela' },
];

function SobreJean() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.jean-item', {
        opacity: 0, y: 32, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#212121] font-sans min-h-[100svh] px-6 md:px-12 lg:px-16 pt-10 md:pt-12 pb-16 md:pb-20 flex items-center">
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="border border-[#5B5B5B] rounded-[28px] overflow-hidden">
          <div className="flex flex-col md:flex-row">

            <div className="relative overflow-hidden w-full md:w-[38%] aspect-[4/5] md:aspect-auto md:min-h-[560px] shrink-0 bg-[#1a1a1a]">
              <img
                src="/images/Jean.jpeg"
                alt="Jean Talles"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
            </div>

            <div className="flex-1 flex flex-col justify-center bg-[#212121] px-8 md:px-14 lg:px-16 pt-10 pb-12 md:py-14">
              <span className="jean-item inline-flex items-center bg-[#333] text-white text-[13px] font-semibold tracking-[0.24em] uppercase px-6 py-2.5 rounded-full w-fit mb-8 border border-white/10">
                Liderança do Projeto
              </span>
              <h3 className="jean-item font-sans font-semibold tracking-tighter text-white text-[32px] md:text-[52px] leading-[1.05] mb-3">Jean Talles</h3>
              <p className="jean-item text-[#A8A8A8] text-[14px] md:text-[15px] uppercase tracking-[0.18em] mb-8">Estrategista de Marca e Comunicação</p>
              <div className="jean-item w-16 h-px bg-white/10 mb-8" />
              <ul className="space-y-5 mb-10">
                {[
                  'Especialista em branding, comunicação e marketing com 08 anos de mercado.',
                  'Liderou e estruturou o setor de comunicação para key accounts B2B e B2C na maior assessoria de marketing do país.',
                  'Fundador e idealizador da TheOne, consultoria que empodera empresários visionários no Brasil.',
                ].map((b, i) => (
                  <li key={i} className="jean-item flex gap-4 items-start">
                    <span className="text-[#A8A8A8] text-[1.1rem] leading-none mt-1.5 shrink-0">→</span>
                    <p className="text-[#E1E1E1] font-light text-[18px] md:text-[21px] leading-[1.5] max-w-[34ch]">{b}</p>
                  </li>
                ))}
              </ul>
              <div className="jean-item grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-5">
                {CLIENT_LOGOS.map((logo) => (
                  <div key={logo.alt} className="flex h-[22px] items-center">
                    <img src={logo.src} alt={logo.alt} className="max-h-full w-auto max-w-[80px] object-contain opacity-60" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ── SLIDE 2: METODOLOGIA (Pirâmide Adaptada) ──────────────────────────────────
function MetodologiaSlide() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.meto-item', {
        opacity: 0, y: 32, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
      gsap.from('.meto-pyramid', {
        opacity: 0, scale: 0.9, filter: 'blur(10px)', duration: 1, ease: 'power3.out', delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] min-h-[100svh] px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24 flex items-center">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
        
        <div>
          <span className="meto-item font-sans text-[15px] tracking-[0.22em] uppercase text-[#A3E635] font-semibold block mb-6">Nossa Metodologia</span>
          <h2 className="meto-item font-sans font-semibold tracking-tighter font-normal text-white text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-tight mb-8">
            A ciência por trás de uma <span className="italic text-white/70">marca forte</span>
          </h2>
          
          <div className="meto-item mb-8 text-white/70 font-sans text-[18px] md:text-[20px] leading-[1.5]">
            Nossa metodologia de construção de marca é baseada em pesquisa aprofundada em 3 pilares fundamentais: <strong>Seu público, seu negócio e seu mercado.</strong> Construímos marcas embasadas em dados, não em achismos.
          </div>

          <ul className="space-y-4">
            {[
              'O que o público precisa, deseja e tem medo.',
              'Como os concorrentes se posicionam e se vendem.',
              'Sua solução, transformação e onde se diferenciam.',
            ].map((item, i) => (
              <li key={i} className="meto-item flex items-start gap-3">
                <span className="text-white/40 font-sans font-medium text-[16px] md:text-[18px] mt-[3px]">0{i + 1}.</span>
                <span className="font-sans font-light text-white/80 text-[18px] md:text-[19px] leading-[1.5]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="meto-pyramid relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0 pointer-events-none opacity-20">
            <line x1="200" y1="60" x2="350" y2="320" stroke="#FFF" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="350" y1="320" x2="50" y2="320" stroke="#FFF" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="320" x2="200" y2="60" stroke="#FFF" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full border border-white/20 bg-[#141414] flex items-center justify-center mb-3">
              <Users size={26} className="text-white/80" />
            </div>
            <span className="text-white font-sans text-[15px] md:text-[16px] tracking-wide">Público</span>
          </div>

          <div className="absolute top-[80%] left-[87.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full border border-white/20 bg-[#141414] flex items-center justify-center mb-3">
              <Briefcase size={26} className="text-white/80" />
            </div>
            <span className="text-white font-sans text-[15px] md:text-[16px] tracking-wide">Negócio</span>
          </div>

          <div className="absolute top-[80%] left-[12.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full border border-white/20 bg-[#141414] flex items-center justify-center mb-3">
              <Target size={26} className="text-white/80" />
            </div>
            <span className="text-white font-sans text-[15px] md:text-[16px] tracking-wide">Mercado</span>
          </div>

          <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[80%]">
            <p className="text-white/60 font-sans font-semibold tracking-tighter tracking-tight text-[22px] md:text-[26px] leading-none mb-2">Posicionamento</p>
            <span className="font-sans font-semibold tracking-tighter text-white text-[32px] md:text-[40px] leading-none">Inevitável</span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── SLIDE 3: ESCOPO FOUNDATION (Sem preços e sem laranja) ───────────────────
function EstrategiaDeMarca() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState({ '01': true, '02': true, '03': true }); // aberto por padrão
  const togglePilar = (num) => setExpanded(prev => ({ ...prev, [num]: !prev[num] }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.est-item', {
        opacity: 0, y: 24, stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24 min-h-[100svh]">
      <div className="max-w-[1400px] mx-auto">

        <div className="est-item mb-6">
          <span className="font-sans text-[15px] tracking-[0.22em] uppercase text-[#181412]/60 font-semibold">O Escopo</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start mb-10 md:mb-12">
          <div>
            <h2 className="est-item font-sans font-semibold tracking-tighter font-normal text-[#181412] text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-tight mb-8">
              Estratégia de Posicionamento e Marca
            </h2>
            <p className="est-item font-sans font-light text-[#181412] text-[22px] md:text-[25px] leading-[1.45] max-w-[40ch]">
              Um sistema estratégico organizado por etapas: primeiro entendemos o terreno, depois definimos o posicionamento e, por fim, desenhamos como a sua marca se efetiva nos canais certos.
            </p>
          </div>
          <div className="est-item hidden lg:flex items-center justify-center self-center">
            <img
              src="/images/guia-de-estrategia.png"
              alt="Guia de Estratégia de Posicionamento e Marca"
              className="w-full max-w-[420px] object-contain"
            />
          </div>
        </div>

        {/* Pilares do projeto */}
        <div className="est-item grid grid-cols-1 lg:grid-cols-3 gap-3 mb-10 md:mb-14">
          {[
            {
              num: '01',
              titulo: 'A Fundação: Diagnóstico e Pesquisa',
              descricao: 'É aqui que nos aprofundamos e entendemos de forma completa seu negócio, mercado e público.',
              itens: [
                { titulo: 'Imersão Estratégica', descricao: 'Mapeamento completo do contexto do negócio, objetivos, impulsionadores, detratores e desafios que afetam a percepção da marca no mercado.' },
                { titulo: 'Pesquisa de Mercado', descricao: 'Como os concorrentes se posicionam, onde estão os padrões repetidos e quais brechas estratégicas existem para você ocupar.' },
                { titulo: 'Mapeamento Profundo de Público', descricao: 'Definição de público baseada não só em dados demográficos, mas nas necessidades, dores e desejos de quem compra de você.' },
              ],
            },
            {
              num: '02',
              titulo: 'A Estratégia de Posicionamento e Marca',
              descricao: 'Construímos uma estratégia para sua marca se tornar uma das principais referências, se diferenciar da concorrência e gerar desejo no público.',
              itens: [
                { titulo: 'Posicionamento e Diferenciação', descricao: 'Definição da proposta única de valor, diferenciais estratégicos e do território de marca que você vai ocupar.' },
                { titulo: 'Personalidade da Marca', descricao: 'Propósito, valores, crenças e arquétipos que sustentam a conexão da marca com seu público e justificam a escolha.' },
                { titulo: 'Conceito e Narrativa', descricao: 'Criação do conceito central e da narrativa que unifica toda a comunicação da marca nos diferentes canais.' },
              ],
            },
            {
              num: '03',
              titulo: 'A Efetivação',
              descricao: 'O plano prático para efetivar a estratégia da marca e posicionamento.',
              itens: [
                { titulo: 'Estratégia de Canais', descricao: 'Como a marca deve se portar em cada ponto de contato: Instagram, WhatsApp, Google, site e indicação, para ser vista, lembrada e escolhida.' },
                { titulo: 'Estratégia de Conteúdo', descricao: 'Principais formatos, tópicos e linhas de comunicação para que a marca construa autoridade e gere demanda orgânica.' },
                { titulo: 'Guia de Estratégia de Posicionamento', descricao: 'Documento completo com toda a fundação estratégica da marca, o mapa que orienta toda decisão de comunicação, venda e crescimento.' },
              ],
            },
          ].map((pilar) => (
            <article key={pilar.num} className="bg-[#F8F8F8] rounded-2xl px-7 md:px-8 py-8 border border-black/[0.08] flex flex-col">
              <button
                onClick={() => togglePilar(pilar.num)}
                className="flex items-center gap-4 mb-5 w-full text-left"
              >
                <span className="w-12 h-12 rounded-full flex items-center justify-center bg-[#181412] text-white font-sans text-[16px] font-semibold shrink-0">
                  {pilar.num}
                </span>
                <h3 className="font-sans font-medium text-[#181412] text-[21px] md:text-[23px] leading-[1.1] flex-1">{pilar.titulo}</h3>
                <svg
                  className="shrink-0 transition-transform duration-300"
                  style={{ transform: expanded[pilar.num] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                >
                  <path d="M5 7.5l5 5 5-5" stroke="#181412" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p className="font-sans font-normal text-[#181412] text-[17px] md:text-[18px] leading-[1.6] mb-4">{pilar.descricao}</p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: expanded[pilar.num] ? '1fr' : '0fr',
                  transition: 'grid-template-rows 380ms cubic-bezier(0.23,1,0.32,1)',
                }}
              >
                <div className="overflow-hidden">
                  <div
                    className="mt-2 divide-y divide-black/[0.08] border-t border-black/[0.08]"
                    style={{
                      opacity: expanded[pilar.num] ? 1 : 0,
                      transition: 'opacity 300ms ease',
                      transitionDelay: expanded[pilar.num] ? '80ms' : '0ms',
                    }}
                  >
                    {pilar.itens.map((item) => (
                      <div key={item.titulo} className="py-4 last:pb-0">
                        <h4 className="font-sans font-semibold text-[#181412] text-[16px] md:text-[17px] leading-[1.25] mb-2">{item.titulo}</h4>
                        <p className="font-sans font-normal text-[#181412]/70 text-[15px] md:text-[16px] leading-[1.55]">{item.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}


// ── SLIDE 3: IDENTIDADE DE MARCA ──────────────────────────────────────────────
function IdentidadeVisual() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.id-item', {
        opacity: 0, y: 24, stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24 min-h-[100svh] flex flex-col justify-center">
      <div className="max-w-[1400px] w-full mx-auto">

        <div className="id-item mb-6">
          <span className="font-sans text-[15px] tracking-[0.22em] uppercase text-[#181412]/60 font-semibold">O Escopo</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="id-item font-sans font-semibold tracking-tighter font-normal text-[#181412] text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-tight mb-8">
              Identidade<br />de Marca
            </h2>
            <p className="id-item font-sans font-light text-[#181412] text-[22px] md:text-[25px] leading-[1.45] max-w-[38ch]">
              Transformamos a estratégia em uma expressão visual única. Uma identidade que o mercado reconhece, o público deseja e você tem orgulho de mostrar em qualquer contexto.
            </p>
          </div>
          <div className="id-item hidden lg:block rounded-[24px] overflow-hidden" style={{ height: '400px' }}>
            <img
              src="/images/eike-identidade-bg.jpg"
              alt="Identidade de Marca"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

      </div>
    </section>
  );
}


// ── SLIDE 4: CRONOGRAMA (6 etapas ajustadas para a agência) ───────────────────
const CRONOGRAMA_STEPS = [
  { 
    etapa: '01', 
    nome: 'Entrevistas e Imersão', 
    descricao: 'Entrevistas em profundidade com stakeholders internos (liderança, equipes) e público externo (clientes, parceiros) para entender a percepção atual da marca e lacunas.',
    prazo: '2 semanas'
  },
  { 
    etapa: '02', 
    nome: 'Workshops', 
    descricao: 'Imersões e workshops com lideranças e diretoria para sintetizar descobertas, confrontar percepções e construir consenso sobre os objetivos da marca.',
    prazo: '2 semanas'
  },
  { 
    etapa: '03', 
    nome: 'Pesquisa de Mercado', 
    descricao: 'Leitura do mercado com foco estratégico: análise de concorrentes, padrões do setor e identificação de brechas para a marca ocupar seu território.',
    prazo: '2 semanas'
  },
  { 
    etapa: '04', 
    nome: 'Estratégia e Reposicionamento', 
    descricao: 'Construção da fundação estratégica: posicionamento, proposta de valor única, propósito, arquétipos e conceito central de comunicação.',
    prazo: '2-3 semanas'
  },
  { 
    etapa: '05', 
    nome: 'Narrativa, Comunicação e Identidade', 
    descricao: 'Efetivação na linguagem e estética: narrativa institucional, tom de voz, direção criativa, Key Visual e o sistema completo de identidade visual (logo, paleta, tipografia).',
    prazo: '4 semanas'
  },
  { 
    etapa: '06', 
    nome: 'Entrega e Brandbook', 
    descricao: 'Consolidação de tudo no Brandbook completo (estratégia, identidade, diretrizes) e apresentação de entrega para alinhamento final com a diretoria.',
    prazo: '1-2 semanas'
  },
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
    <section ref={sectionRef} className="bg-[#fcfcfc] pt-24 pb-28 md:py-36 px-6 md:px-12 lg:px-16 min-h-[100svh]">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-32 md:mb-40 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.55fr)] gap-8 lg:gap-16 items-end">
          <div>
            <span className="font-sans text-[15px] md:text-[17px] tracking-[0.22em] uppercase text-[#181412]/60 font-semibold block mb-5">
              Linha do Tempo
            </span>
            <h2 className="font-sans font-semibold tracking-tighter font-normal text-[#181412] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
              Como trabalhamos
            </h2>
          </div>
          <p className="font-sans font-light text-black text-[20px] md:text-[24px] leading-[1.45] max-w-[36ch] lg:justify-self-end lg:text-right">
            Prazo total estimado de <strong className="font-medium">12 a 14 semanas</strong>.
          </p>
        </div>

        <div className="hidden lg:block relative">
          <div className="absolute top-[36px] left-0 right-0 h-px bg-black/10" />
          <div ref={lineRef} className="absolute top-[36px] left-0 right-0 h-px bg-[#181412] origin-left" />
          <div className="grid" style={{ gridTemplateColumns: `repeat(${CRONOGRAMA_STEPS.length}, 1fr)` }}>
            {CRONOGRAMA_STEPS.map((step, i) => (
              <div key={i} className="crono-p-step flex flex-col items-center text-center px-3">
                <div className="w-[72px] h-[72px] rounded-full border-[3px] border-[#181412] bg-white flex items-center justify-center mb-6 relative z-10 transition-transform hover:scale-105">
                  <span className="font-sans font-semibold text-[#181412] text-[1.4rem]">{step.etapa}</span>
                </div>
                <span className="font-sans font-semibold text-[#181412] text-[17px] mb-2">{step.nome}</span>
                <p className="font-sans font-light text-[#181412]/70 text-[14px] leading-[1.45] mb-3">{step.descricao}</p>
                <span className="font-sans font-medium text-[12px] uppercase tracking-[0.1em] text-[#181412]/50 bg-black/5 px-3 py-1 rounded-full">
                  {step.prazo}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:hidden relative pl-10">
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-[#181412]/20" />
          <div className="space-y-12">
            {CRONOGRAMA_STEPS.map((step, i) => (
              <div key={i} className="crono-p-step relative">
                <div className="absolute -left-[28px] top-0 w-9 h-9 rounded-full border-2 border-[#181412] bg-white flex items-center justify-center">
                  <span className="font-sans font-semibold text-[#181412] text-[0.95rem]">{step.etapa}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-sans font-semibold text-[#181412] text-[20px]">{step.nome}</span>
                  <span className="font-sans font-medium text-[11px] uppercase tracking-[0.1em] text-[#181412]/60 bg-black/5 px-2.5 py-1 rounded-full">
                    {step.prazo}
                  </span>
                </div>
                <p className="font-sans font-light text-[#181412]/80 text-[17px] leading-[1.5]">{step.descricao}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── SLIDESHOW COMPONENT ───────────────────────────────────────────────────────
function ProjetoAgenciaSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState('next');
  const [hasMoreBelow, setHasMoreBelow] = useState(false);
  const slideScrollRef = useRef(null);
  const isTransitioning = useRef(false);

  const checkScroll = useCallback(() => {
    const el = slideScrollRef.current;
    if (!el) return;
    setHasMoreBelow(el.scrollHeight > el.clientHeight && el.scrollTop + el.clientHeight < el.scrollHeight - 8);
  }, []);

  useEffect(() => {
    let innerId = 0;
    const id = requestAnimationFrame(() => {
      setHasMoreBelow(false);
      innerId = requestAnimationFrame(checkScroll);
    });
    return () => {
      cancelAnimationFrame(id);
      cancelAnimationFrame(innerId);
    };
  }, [current, checkScroll]);

  const navigate = useCallback((dir) => {
    if (isTransitioning.current) return;
    const next = current + dir;
    if (next < 0 || next >= SLIDE_TOTAL) return;
    isTransitioning.current = true;
    setAnimDir(dir > 0 ? 'next' : 'prev');
    setCurrent(next);
    setTimeout(() => { isTransitioning.current = false; }, 800);
  }, [current]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ height: '100svh', background: DARK_SLIDES.includes(current) ? '#0a0a0a' : '#fff' }}
    >
      <div
        key={current}
        ref={slideScrollRef}
        data-lenis-prevent
        onScroll={checkScroll}
        className={`absolute inset-0 overflow-y-auto ${DARK_SLIDES.includes(current) ? 'pb-0' : 'pb-20 md:pb-16'} ${animDir === 'next' ? 'slide-from-right' : 'slide-from-left'}`}
      >
        {current === 0 && <Capa />}
        {current === 1 && <SobreJean />}
        {current === 2 && <MetodologiaSlide />}
        {current === 3 && <EstrategiaDeMarca />}
        {current === 4 && <IdentidadeVisual />}
        {current === 5 && <Cronograma />}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: hasMoreBelow ? 1 : 0,
          background: `linear-gradient(to top, ${DARK_SLIDES.includes(current) ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)'} 0%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <button
          onClick={() => navigate(-1)}
          disabled={current === 0}
          aria-label="Slide anterior"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-150 disabled:opacity-25 active:scale-[0.97]"
          style={{
            border: `1px solid ${DARK_SLIDES.includes(current) ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.15)'}`,
            background: DARK_SLIDES.includes(current) ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.9)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke={DARK_SLIDES.includes(current) ? 'white' : '#181412'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: SLIDE_TOTAL }).map((_, i) => (
            <div
              key={i}
              onClick={() => {
                if (i === current || isTransitioning.current) return;
                isTransitioning.current = true;
                setAnimDir(i > current ? 'next' : 'prev');
                setCurrent(i);
                setTimeout(() => { isTransitioning.current = false; }, 800);
              }}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === current ? '16px' : '5px',
                height: '5px',
                backgroundColor: i === current
                  ? (DARK_SLIDES.includes(current) ? '#fff' : '#181412')
                  : (DARK_SLIDES.includes(current) ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,0.14)'),
              }}
            />
          ))}
        </div>

        <button
          onClick={() => navigate(1)}
          disabled={current === SLIDE_TOTAL - 1}
          aria-label="Próximo slide"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-150 active:scale-[0.97] disabled:opacity-25"
          style={{ 
            background: DARK_SLIDES.includes(current) ? '#fff' : '#181412',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 12l4-4-4-4" stroke={DARK_SLIDES.includes(current) ? '#181412' : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── PÁGINA PRINCIPAL ──────────────────────────────────────────────────────────
export default function ProjetoAgencia() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    // Injeta fontes da TGH
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Substitui as fontes editoriais da TheOne pelas da TGH
    

    return () => { 
      document.head.removeChild(meta); 
      document.head.removeChild(fontLink);
      
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    const rafId = requestAnimationFrame(() =>
      requestAnimationFrame(() => ScrollTrigger.refresh())
    );
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans">
      <div className="noise-overlay" aria-hidden="true" />
      <ProjetoAgenciaSlideshow />
    </div>
  );
}
