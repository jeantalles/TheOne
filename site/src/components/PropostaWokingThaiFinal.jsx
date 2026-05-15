import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── DADOS DA PROPOSTA — WOKING THAI FOOD ──────────────────────────────────────
const PROPOSTA_DATA = {
  cliente: 'Woking Thai Food',
  empresa: 'Woking',
  data: 'Maio 2026',

  contextoA: {
    pontos: [
      'Indo para a 5ª unidade com franquias crescendo de forma estável, mas com dificuldade de atrair novos públicos além da bolha atual de clientes',
      'Nunca realizaram pesquisa com a base para entender o que diferencia o Woking e por que as pessoas escolhem a marca',
      'Comunicação ainda institucional e pouco orgânica — redes sociais em desenvolvimento, mas ainda sem a assertividade necessária para conectar e engajar',
      'Time dividido entre expansão de franquias e produção de conteúdo, sem uma estratégia de marca unificando as duas frentes',
      'Leads de potenciais franqueados chegam de forma pontual, não orgânica — a marca ainda não é conhecida o suficiente para gerar atração natural',
      'Foco no delivery reduz a margem e enfraquece a experiência de marca — o salão precisa ser o centro da conexão com o público',
    ],
  },

  contextoB: {
    pontos: [
      'Marca com posicionamento claro que atraia novos públicos e fortaleça a conexão com quem já é cliente fiel',
      'Comunicação orgânica, humanizada e consistente que coloque o Woking no mapa de quem ainda não conhece',
      'Clientes indo mais vezes — não só no delivery, mas presencialmente, aumentando margem e fortalecendo a experiência da marca',
      'Estratégia unificada que oriente toda a comunicação, o conteúdo e a expansão de franquias numa visão única de marca',
      'Geração de demanda orgânica pelo Instagram, WhatsApp e iFood com estratégia clara e conteúdo com propósito',
      'Franqueados chegando atraídos pela força e visibilidade da marca — não por esforço de prospecção, mas pela reputação que a marca constrói',
    ],
  },

  escopo: {
    entrega: 'TheOne Foundation',
    pilares: [
      {
        label: 'Pilar 1',
        titulo: 'A Fundação: Diagnóstico e Pesquisa',
        descricao: 'É aqui que nos aprofundamos e entendemos de forma completa seu negócio, mercado e público.',
        itens: [
          {
            titulo: 'Imersão Estratégica',
            descricao: 'Mapeamento completo do contexto do negócio, objetivos, impulsionadores, detratores e desafios que afetam a percepção da marca no mercado.',
          },
          {
            titulo: 'Pesquisa de Mercado',
            descricao: 'Como os concorrentes se posicionam, onde estão os padrões repetidos e quais brechas estratégicas existem para a marca ocupar.',
          },
          {
            titulo: 'Mapeamento Profundo de Público',
            descricao: 'Definição de público baseada não só em dados demográficos, mas nas necessidades, dores e desejos de quem compra da marca.',
          },
        ],
      },
      {
        label: 'Pilar 2',
        titulo: 'A Estratégia de Posicionamento e Marca',
        descricao: 'Baseado no diagnóstico e pesquisa, construímos uma estratégia para sua marca se tornar uma das principais referências, se diferenciar da concorrência e gerar desejo no público.',
        itens: [
          {
            titulo: 'Posicionamento e Diferenciação',
            descricao: 'Definição da proposta única de valor, diferenciais estratégicos e do território de marca que sua marca vai ocupar.',
          },
          {
            titulo: 'Personalidade da Marca',
            descricao: 'Propósito, valores, crenças e arquétipos que sustentam a conexão da marca com seu público e justificam a escolha.',
          },
          {
            titulo: 'Conceito e Narrativa',
            descricao: 'Criação do conceito central e da narrativa que unifica toda a comunicação da marca nos diferentes canais.',
          },
        ],
      },
      {
        label: 'Pilar 3',
        titulo: 'A Efetivação',
        descricao: 'O plano prático para efetivar a estratégia da marca e posicionamento.',
        itens: [
          {
            titulo: 'Estratégia de Canais',
            descricao: 'Como a marca deve se portar em cada ponto de contato para ser vista, lembrada e escolhida.',
          },
          {
            titulo: 'Estratégia de Conteúdo',
            descricao: 'Principais formatos, tópicos e linhas de comunicação para que a marca construa autoridade no nicho e gere demanda orgânica.',
          },
          {
            titulo: 'Guia de Estratégia de Posicionamento',
            descricao: 'Documento completo com toda a fundação estratégica da marca — o mapa que orienta toda decisão de comunicação, venda e crescimento.',
          },
        ],
      },
    ],
    bonus: {
      titulo: 'Agent',
      descricao: 'Agente de IA especialista no seu negócio, treinado com toda sua estratégia de marca e posicionamento para otimizar apresentações, gerar ideias de conteúdo focadas no seu público, analisar pitchs de vendas no dia a dia e muito mais.',
    },
  },

  resultados: [
    'Estratégia de marca que unifique posicionamento, comunicação e expansão de franquias numa visão única',
    'Comunicação mais assertiva e humanizada, que conecte o Woking Thai Food com novos públicos além da bolha atual',
    'Aumento da frequência de visitas ao salão, fortalecendo a margem e a experiência presencial da marca',
    'Base de clientes mais engajada, presente e conectada com a proposta e a identidade do Woking',
    'Geração de demanda orgânica com estratégia clara de conteúdo para Instagram, WhatsApp e iFood',
    'Marca mais conhecida e capilarizada, preparando o terreno para novos franqueados chegarem atraídos pela força da marca',
  ],

  cronograma: [
    { etapa: '01', nome: 'Imersão', descricao: 'Diagnóstico completo do negócio, mercado e público' },
    { etapa: '02', nome: 'Pesquisa', descricao: 'Análise de concorrência e oportunidades de posicionamento' },
    { etapa: '03', nome: 'Estratégia', descricao: 'Posicionamento, marca e diferenciação' },
    { etapa: '04', nome: 'Efetivação', descricao: 'Estratégia de canais e conteúdo para colocar a marca para funcionar' },
    { etapa: '05', nome: 'Entrega', descricao: 'Guia de Estratégia de Posicionamento e Marca' },
    { etapa: '06', nome: 'Acompanhamento', descricao: 'Acompanhamento estratégico da execução e direcionamento dos próximos passos' },
  ],
};
// ─────────────────────────────────────────────────────────────────────────────


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
          background: 'radial-gradient(ellipse, rgba(254,105,66,.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <img src="/logo-navbar.svg" alt="TheOne" style={{ height: '72px', width: 'auto', display: 'block', margin: '0 auto' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 0, marginTop: '-100px' }}>
        <span
          className="font-halyard"
          style={{ fontWeight: 600, fontSize: '17px', letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(254,105,66,.7)', marginBottom: '24px', display: 'block' }}
        >
          Proposta Comercial
        </span>

        <h1
          className="font-editorial"
          style={{ fontWeight: 400, fontSize: 'clamp(3rem,7vw,6.5rem)', lineHeight: .95, letterSpacing: '-.03em', color: '#fff', marginBottom: '32px' }}
        >
          TheOne Foundation
        </h1>

        <div style={{ width: '48px', height: '2px', background: 'linear-gradient(90deg,#FE6942,#FF5224)', borderRadius: '2px', margin: '0 auto 28px' }} />

        <p
          className="font-halyard"
          style={{ fontWeight: 300, fontSize: 'clamp(1.8rem,3.5vw,2.75rem)', color: 'rgba(255,255,255,.75)', marginBottom: '8px' }}
        >
          {PROPOSTA_DATA.cliente}
        </p>
        <p
          className="font-halyard"
          style={{ fontWeight: 300, fontSize: '15px', color: 'rgba(255,255,255,.35)', letterSpacing: '.06em' }}
        >
          {PROPOSTA_DATA.data}
        </p>
      </div>
    </section>
  );
}


// ── SEÇÃO: CONTEXTO A→B ───────────────────────────────────────────────────────
function Contexto({ showDesejado = true }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ctx-card', {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-24 pb-28 md:py-36 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-16 md:mb-20">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
            Análise de contexto
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] tracking-tight">
            O projeto do {PROPOSTA_DATA.cliente}
          </h2>
        </div>

        <div className="grid items-start gap-6 md:gap-0 grid-cols-1 md:grid-cols-[1fr_72px_1fr]">

          <div className="ctx-card bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-10 border border-black/10">
            <h3 className="font-halyard text-[15px] tracking-[0.22em] uppercase text-black/40 font-semibold mb-8">
              Cenário Atual
            </h3>
            <ul className="space-y-5">
              {PROPOSTA_DATA.contextoA.pontos.map((p, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-black/25 text-[24px] leading-[1.55] shrink-0 mt-px select-none">—</span>
                  <span className="font-halyard font-light text-[24px] leading-[1.55] text-[#181412]">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {showDesejado ? (
            <div className="ctx-card flex items-start justify-center pt-5 md:pt-14">
              <svg className="hidden md:block" width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M7 18h22M21 9l9 9-9 9" stroke="#FE6942" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <svg className="md:hidden" width="36" height="36" viewBox="0 0 36 36" fill="none" style={{ transform: 'rotate(90deg)' }}>
                <path d="M7 18h22M21 9l9 9-9 9" stroke="#FE6942" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ) : (
            <div className="hidden md:block" />
          )}

          {showDesejado ? (
            <div className="ctx-card bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-10 border-2 border-[#FE6942]">
              <h3 className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold mb-8">
                Cenário Desejado
              </h3>
              <ul className="space-y-5">
                {PROPOSTA_DATA.contextoB.pontos.map((p, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-[#FE6942] text-[24px] leading-[1.55] shrink-0 mt-px select-none">→</span>
                    <span className="font-halyard font-light text-[24px] leading-[1.55] text-[#181412]">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="hidden md:block" />
          )}

        </div>
      </div>
    </section>
  );
}

// ── SEÇÃO: ESCOPO ─────────────────────────────────────────────────────────────
function Escopo({ visiblePillars = 3 }) {
  const sectionRef = useRef(null);
  const scope = PROPOSTA_DATA.escopo;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.escopo-block', {
        opacity: 0, y: 22, stagger: 0.07, duration: 0.72, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 py-10 md:py-12 lg:py-14 min-h-full flex flex-col justify-center">
      <div className="max-w-[1440px] mx-auto w-full">

        <div className="escopo-block grid grid-cols-1 lg:grid-cols-[minmax(620px,0.95fr)_1fr] gap-8 lg:gap-14 mb-8 md:mb-10 items-start">
          <div>
            <span className="font-halyard text-[13px] tracking-[0.24em] uppercase text-[#FE6942] font-semibold block mb-4">
              Escopo do Projeto
            </span>
            <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.5rem,3.5vw,3.35rem)] leading-[1.02] tracking-tight max-w-none">
              TheOne Foundation
            </h2>
            <p className="font-halyard font-light text-[#181412]/60 text-[clamp(1.15rem,1.65vw,1.45rem)] leading-[1.3] mt-2">
              Estratégia de Posicionamento e Marca
            </p>
          </div>
          <div className="lg:justify-self-end lg:pt-9">
            <p className="font-halyard font-light text-[#181412] text-[18px] md:text-[22px] leading-[1.55] max-w-[620px] lg:text-right">
              Um sistema estratégico organizado por etapas: primeiro entendemos o terreno, depois definimos o posicionamento e, por fim, desenhamos como a marca se efetiva nos canais certos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {scope.pilares.slice(0, visiblePillars).map((pilar, i) => (
            <article
              key={pilar.label}
              className="escopo-block bg-[#F8F8F8] rounded-lg px-5 md:px-6 py-6 border border-black/[0.08] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="w-11 h-11 rounded-full flex items-center justify-center bg-[#FE6942] text-white font-halyard text-[15px] font-semibold shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-halyard font-medium text-[#181412] text-[21px] md:text-[23px] leading-[1.1]">
                    {pilar.titulo}
                  </h3>
                </div>
              </div>

              <p className="font-halyard font-light text-black text-[17px] md:text-[19px] leading-[1.55] mb-4">
                {pilar.descricao}
              </p>

              <div className="mt-auto divide-y divide-black/[0.08]">
                {pilar.itens.map((item) => (
                  <div key={item.titulo} className="py-3.5 first:pt-0 last:pb-0">
                    <h4 className="font-halyard font-medium text-[#181412] text-[17px] md:text-[18px] leading-[1.25] mb-2">
                      {item.titulo}
                    </h4>
                    <p className="font-halyard font-light text-black text-[17px] md:text-[18px] leading-[1.52]">
                      {item.descricao}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── SEÇÃO: CASA DA MARCA ──────────────────────────────────────────────────────
function FoundationHouse() {
  return (
    <section className="bg-white h-full flex items-center justify-center px-2 md:px-6 lg:px-10 py-6">
      <svg
        viewBox="0 0 1440 810"
        fill="none"
        className="w-full max-w-[1380px]"
        role="img"
        aria-label="Arquitetura de marca TheOne Foundation"
      >
        <defs>
          <linearGradient id="wokingRoof" x1="720" y1="54" x2="720" y2="382" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#DADDE0" />
            <stop offset="1" stopColor="#ECEEEF" />
          </linearGradient>
          <linearGradient id="wokingWall" x1="720" y1="388" x2="720" y2="655" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FBFBFB" />
            <stop offset="1" stopColor="#F2F3F3" />
          </linearGradient>
          <linearGradient id="wokingBase" x1="370" y1="655" x2="1070" y2="765" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1D1F20" />
            <stop offset="1" stopColor="#0A0A0A" />
          </linearGradient>
          <filter id="wokingShadow" x="300" y="635" width="840" height="170" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#181412" floodOpacity="0.18" />
          </filter>
        </defs>

        <ellipse cx="720" cy="777" rx="355" ry="24" fill="#181412" opacity="0.08" />

        <polygon points="720,54 354,382 1086,382" fill="url(#wokingRoof)" />
        <rect x="372" y="388" width="696" height="267" fill="url(#wokingWall)" />
        <rect x="372" y="388" width="46" height="267" fill="#DDE0E2" />
        <rect x="1022" y="388" width="46" height="267" fill="#DDE0E2" />
        <rect x="372" y="382" width="696" height="8" fill="white" opacity="0.92" />

        <rect x="370" y="635" width="700" height="130" rx="5" fill="url(#wokingBase)" filter="url(#wokingShadow)" />

        <path d="M694 176C694 168.82 699.82 163 707 163H733C740.18 163 746 168.82 746 176V195C746 202.18 740.18 208 733 208H718L700 222V208H707C699.82 208 694 202.18 694 195V176Z" stroke="#FE6942" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="710" cy="186" r="3" fill="#FE6942" />
        <circle cx="720" cy="186" r="3" fill="#FE6942" />
        <circle cx="730" cy="186" r="3" fill="#FE6942" />

        <text x="720" y="270" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="22" fontWeight="700" fill="#181412">PONTOS DE CONTATO</text>
        <text x="720" y="304" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="18" fontWeight="400" fill="#181412" fillOpacity="0.68">(INSTAGRAM, WHATSAPP,</text>
        <text x="720" y="332" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="18" fontWeight="400" fill="#181412" fillOpacity="0.68">IFOOD, SALÃO, ETC)</text>

        <path d="M720 462C699 462 682 481 682 481C682 481 699 500 720 500C741 500 758 481 758 481C758 481 741 462 720 462Z" stroke="#FE6942" strokeWidth="3.5" strokeLinejoin="round" />
        <circle cx="720" cy="481" r="10" stroke="#FE6942" strokeWidth="3.5" />

        <text x="720" y="548" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="22" fontWeight="700" fill="#181412">NARRATIVA, POSICIONAMENTO</text>
        <text x="720" y="580" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="22" fontWeight="700" fill="#181412">E COMUNICAÇÃO</text>

        <text x="720" y="696" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="30" fontWeight="700" fill="white">THEONE FOUNDATION</text>
        <text x="720" y="735" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="21" fontWeight="400" fill="white" fillOpacity="0.7">Estratégia de posicionamento e marca</text>

        <path d="M916 210H1080" stroke="#181412" strokeWidth="1.3" />
        <path d="M916 210L902 230" stroke="#181412" strokeWidth="1.3" />
        <circle cx="1080" cy="210" r="3.5" fill="#181412" />
        <text x="1105" y="221" fontFamily="'Halyard Display',sans-serif" fontSize="38" fontWeight="700" fill="#FE6942">100%</text>
        <text x="1105" y="260" fontFamily="'Halyard Display',sans-serif" fontSize="20" fontWeight="400" fill="#181412" fillOpacity="0.62">do mercado</text>
        <text x="1105" y="288" fontFamily="'Halyard Display',sans-serif" fontSize="20" fontWeight="400" fill="#181412" fillOpacity="0.62">olha pra cá</text>

        <text x="210" y="515" textAnchor="end" fontFamily="'Halyard Display',sans-serif" fontSize="38" fontWeight="700" fill="#FE6942">40%</text>
        <text x="210" y="552" textAnchor="end" fontFamily="'Halyard Display',sans-serif" fontSize="20" fontWeight="400" fill="#181412" fillOpacity="0.62">do mercado</text>
        <text x="210" y="580" textAnchor="end" fontFamily="'Halyard Display',sans-serif" fontSize="20" fontWeight="400" fill="#181412" fillOpacity="0.62">olha pra cá</text>
        <path d="M246 530H362" stroke="#181412" strokeWidth="1.3" />
        <circle cx="246" cy="530" r="3.5" fill="#181412" />

        <path d="M1082 710H1192" stroke="#181412" strokeWidth="1.3" />
        <circle cx="1192" cy="710" r="3.5" fill="#181412" />
        <text x="1222" y="716" fontFamily="'Halyard Display',sans-serif" fontSize="38" fontWeight="700" fill="#FE6942">5%</text>
        <text x="1222" y="755" fontFamily="'Halyard Display',sans-serif" fontSize="20" fontWeight="400" fill="#181412" fillOpacity="0.62">do mercado</text>
        <text x="1222" y="783" fontFamily="'Halyard Display',sans-serif" fontSize="20" fontWeight="400" fill="#181412" fillOpacity="0.62">olha pra cá</text>
      </svg>
    </section>
  );
}

// ── SEÇÃO: ENTREGÁVEIS ────────────────────────────────────────────────────────
function ArrowItem({ children }) {
  return (
    <li className="flex items-center gap-3 font-halyard font-medium text-[#181412] text-[15px] md:text-[17px] leading-[1.25]">
      <svg className="w-5 h-5 text-[#FE6942] shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </li>
  );
}

function Entregaveis() {
  const sectionRef = useRef(null);
  const cardClass = 'entregavel-block relative overflow-hidden bg-[#F4F4F5] rounded-[30px] md:rounded-[34px]';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.entregavel-block', {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white min-h-full px-5 md:px-10 lg:px-14 pt-14 md:pt-20 pb-24 md:pb-28">
      <div className="max-w-[1120px] mx-auto">
        <div className="entregavel-block text-center mb-12 md:mb-16">
          <span className="font-halyard text-[13px] md:text-[14px] tracking-[0.24em] uppercase text-[#FE6942] font-semibold block mb-4">
            Entregáveis
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.7rem,4.3vw,4.9rem)] leading-[0.98] tracking-tight">
            O que você recebe
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-7">

          <div className={`${cardClass} flex flex-col md:flex-row min-h-[480px] md:min-h-[560px]`}>
            <div className="flex-1 px-8 md:px-14 pt-12 md:pt-16 pb-8 md:pb-16 flex flex-col justify-between">
              <h3 className="font-halyard font-medium text-[#050505] text-[32px] md:text-[40px] leading-[1.08]">
                Guia de Estratégia de<br />
                Posicionamento e<br />
                Marca
              </h3>
              <div>
                <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[19px] leading-[1.35] max-w-[360px] mb-6">
                  Um documento com mais de 80 slides com a fundação estratégica e caminho para sua marca se tornar TheOne
                </p>
                <p className="font-halyard font-normal text-[#181412] text-[15px] md:text-[16px] mb-2.5">Também inclui:</p>
                <ul className="space-y-1.5">
                  <ArrowItem>Estratégia de Canais</ArrowItem>
                  <ArrowItem>Estratégia de Conteúdo</ArrowItem>
                </ul>
              </div>
            </div>
            <div className="hidden md:flex shrink-0 self-center items-center justify-center px-8 md:px-12">
              <img
                src="/images/guia-de-estrategia.png"
                alt="Guia de Estratégia de Posicionamento e Marca"
                className="w-[280px] md:w-[380px] lg:w-[460px] object-contain"
              />
            </div>
          </div>

          <div className={`${cardClass} min-h-[460px] md:min-h-[500px] flex flex-col md:block`}>
            <div className="relative z-10 px-8 md:px-16 pt-10 md:pt-14 pb-8 md:pb-14 max-w-[445px]">
              <span className="font-halyard font-semibold text-[#FE6942] text-[13px] tracking-[0.24em] uppercase mb-3 block">Bônus:</span>
              <h3 className="font-halyard font-medium text-[#050505] text-[31px] md:text-[38px] leading-[1.08] mb-24 md:mb-28">
                TheWoking Agent
              </h3>
              <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[19px] leading-[1.35] max-w-[370px]">
                {PROPOSTA_DATA.escopo.bonus.descricao}
              </p>
            </div>
            <div className="relative md:absolute md:right-8 lg:right-10 md:top-20 lg:top-[72px] z-0 px-6 md:px-0 pb-8 md:pb-0">
              <div className="relative w-full md:w-[540px] lg:w-[585px] rounded-[26px] border border-black/10 bg-[#F8F8F8] shadow-[0_18px_45px_rgba(0,0,0,0.08)] overflow-hidden aspect-[1.72]">
                <div className="h-8 px-4 flex items-center justify-between border-b border-black/10 bg-white/65 font-halyard text-[9px] text-[#181412]/50">
                  <span>Gemini</span>
                  <span>Woking | Estratégia de marca</span>
                  <span className="rounded-full bg-[#BDE8FF] px-1.5 py-0.5 text-[#181412]/60">Fazer upgrade</span>
                </div>
                <div className="absolute inset-x-0 top-12 bottom-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-10 h-10 rounded-full bg-[#C978F3]/80 text-white flex items-center justify-center font-halyard font-medium text-[15px] mb-4">
                    W
                  </div>
                  <p className="font-halyard font-medium text-[#181412] text-[14px] mb-4">
                    Woking | Estrategista de marca
                  </p>
                  <div className="space-y-1.5 text-left font-halyard text-[10px] text-[#181412]/50">
                    <p>Recentes</p>
                    <p><span className="text-[#C978F3]">■</span> Roteiro de vídeos para Instagram</p>
                    <p><span className="text-[#C978F3]">■</span> Estratégia de conteúdo para o WhatsApp</p>
                  </div>
                </div>
                <div className="absolute left-1/2 bottom-5 -translate-x-1/2 w-[58%] rounded-xl border border-black/10 bg-white px-3 py-2 font-halyard text-[10px] text-[#181412]/50">
                  Peça ao Gemini
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ── SEÇÃO: RESULTADOS ─────────────────────────────────────────────────────────
function Resultados() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.resultado-item', {
        opacity: 0, y: 16, stagger: 0.42, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-24 pb-28 md:py-36 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-20">
          <span className="font-halyard text-[15px] md:text-[17px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
            Objetivos do projeto
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
            O que queremos atingir com esse projeto
          </h2>
        </div>
        <ul className="space-y-6 md:space-y-8">
          {PROPOSTA_DATA.resultados.map((r, i) => (
            <li key={i} className="resultado-item flex items-start gap-5 md:gap-7">
              <span className="text-[#FE6942] text-[1.4rem] md:text-[1.6rem] leading-none mt-1 shrink-0 select-none">→</span>
              <p className="font-halyard font-normal text-[#181412]/70 text-[20px] md:text-[26px] leading-[1.5]">{r}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── SEÇÃO: CRONOGRAMA ─────────────────────────────────────────────────────────
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
      gsap.from('.crono-step', {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-24 pb-28 md:py-36 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-32 md:mb-40 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.55fr)] gap-8 lg:gap-16 items-end">
          <div>
            <span className="font-halyard text-[15px] md:text-[17px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
              Linha do Tempo
            </span>
            <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
              Cronograma do projeto
            </h2>
          </div>
          <p className="font-halyard font-light text-black text-[20px] md:text-[24px] leading-[1.45] max-w-[36ch] lg:justify-self-end lg:text-right">
            Prazo estimado geral de 6 a 8 semanas para a entrega completa do projeto.
          </p>
        </div>

        <div className="hidden md:block relative">
          <div className="absolute top-[36px] left-0 right-0 h-px bg-black/10" />
          <div ref={lineRef} className="absolute top-[36px] left-0 right-0 h-px bg-[#FE6942] origin-left" />
          <div className="grid" style={{ gridTemplateColumns: `repeat(${PROPOSTA_DATA.cronograma.length}, 1fr)` }}>
            {PROPOSTA_DATA.cronograma.map((step, i) => (
              <div key={i} className="crono-step flex flex-col items-center text-center px-4">
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
            {PROPOSTA_DATA.cronograma.map((step, i) => (
              <div key={i} className="crono-step relative">
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

// ── SEÇÃO: INVESTIMENTO ───────────────────────────────────────────────────────
function Investimento() {
  const sectionRef = useRef(null);
  const consultoriaOptions = [
    {
      label: 'Consultoria 3 meses',
      mensal: 'R$ 2.500/mês',
    },
    {
      label: 'Consultoria 6 meses',
      mensal: 'R$ 2.000/mês',
    },
  ];

  const scopeOptions = [
    {
      number: '01',
      eyebrow: 'Escopo 1',
      title: 'TheOne Foundation',
      price: 'R$ 12.000',
      cash: 'R$ 10.800',
      intro: 'Diagnóstico, pesquisa de mercado, posicionamento, narrativa, personalidade, estratégia de canais e conteúdo. Entrega do Guia completo.',
      included: [
        'De 8h a 10h de imersões e workshops online com os fundadores do Woking, com metodologia de facilitação e design thinking para mapear os pilares de Negócio, Público e Mercado.',
        'Entrevistas online com pessoas-chave na operação do negócio.',
        'Pesquisa quantitativa online com a base de clientes para entender por que as pessoas escolhem o Woking, o que mais valorizam na marca e o que influencia recompra, frequência e indicação.',
        'Identificação dos clientes da base que mais compram para uma entrevista online de 20 minutos para aprofundar percepção sobre a marca, a experiência presencial e os concorrentes em troca de um benefício ou presente.',
        'Pesquisa quantitativa com formulário enviado para a base de clientes, também em troca de algum benefício, para validar padrões de comportamento, preferências, frequência de compra, pontos fortes e oportunidades.',
      ],
      simulations: [
        ['Foundation e acompanhamento de 3 meses', 'R$ 19.500', 'R$ 17.550'],
        ['Foundation e acompanhamento de 6 meses', 'R$ 24.000', 'R$ 21.600'],
      ],
    },
    {
      number: '02',
      eyebrow: 'Escopo 2',
      title: 'TheOne Foundation +',
      price: 'R$ 15.000',
      cash: 'R$ 13.500',
      intro: 'Estratégia de marca e posicionamento com uma imersão presencial mais profunda na operação, nas lojas, no time interno e nos parceiros estratégicos.',
      featured: true,
      included: [
        'Tudo que já está previsto no Foundation base.',
        'Visita presencial em três lojas do Woking para observar a experiência no salão, o fluxo de atendimento, o comportamento dos clientes, entender e conversar com o público sobre a marca.',
        'Possibilidade de workshops presenciais com os sócios, aproveitando os três dias no RS para fazer as imersões com mais profundidade.',
        'Entrevistas presenciais com pessoas-chave durante as visitas para entender melhor operação, atendimento, experiência, diferenciais, dificuldades do dia a dia e oportunidades para fortalecer a marca.',
        'Entrevistas com o time de franquias para entender como o Woking é apresentado a potenciais franqueados, quais dúvidas aparecem, quais argumentos funcionam e como a marca pode apoiar melhor a expansão.',
        'Entrevistas com parceiros indicados pelo Woking para trazer uma visão de fora sobre a marca e o negócio.',
        'Pesquisa quantitativa com clientes por link, enviada para a base com algum bônus ou benefício, para aumentar o volume de respostas e trazer uma leitura mais quantitativa sobre os clientes.',
        'Cruzamento das visitas, entrevistas presenciais, conversas com franquias, parceiros, clientes e pesquisa quantitativa para validar melhor o que diferencia o Woking e o que precisa ser fortalecido na comunicação.',
      ],
      simulations: [
        ['Foundation+ e acompanhamento de 3 meses', 'R$ 22.500', 'R$ 20.250'],
        ['Foundation+ e acompanhamento de 6 meses', 'R$ 27.000', 'R$ 24.300'],
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.inv-block', {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-16 pb-28 md:pt-20 md:pb-28 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-10 md:mb-12 inv-block">
          <h2 className="font-halyard font-medium text-[#181412] text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] tracking-tight">
            Investimento
          </h2>
        </div>

        {scopeOptions.map((scope) => (
          <div
            key={scope.eyebrow}
            className={`inv-block bg-[#F8F8F8] rounded-[24px] px-6 md:px-12 py-10 border ${scope.featured ? 'border-[#FE6942]' : 'border-black/[0.08]'} mb-5 transition-shadow duration-500 hover:shadow-lg`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-14 mb-9">
              <span className="font-editorial font-normal text-[#FE6942]/25 text-[4rem] md:text-[5rem] leading-none shrink-0 select-none">{scope.number}</span>
              <div className="flex-1 min-w-0">
                <div className={`font-halyard text-[12px] tracking-[0.22em] uppercase mb-3 ${scope.featured ? 'text-[#FE6942]' : 'text-[#181412]/40'}`}>
                  {scope.eyebrow}
                </div>
                <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-5 mb-7">
                  <div>
                    <h3 className="font-halyard font-medium text-[#181412] text-[1.75rem] md:text-[2.25rem] leading-[1.1] mb-3">
                      {scope.title === 'TheOne Foundation +' ? (
                        <>TheOne Foundation <span className="text-[#FE6942]">+</span></>
                      ) : scope.title}
                    </h3>
                    <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[20px] leading-[1.45] max-w-[64ch]">
                      {scope.intro}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div className="font-halyard font-medium text-gradient text-[2.35rem] md:text-[2.8rem] leading-[1] mb-2">
                      {scope.price}
                    </div>
                    <div className="font-halyard font-light text-[16px] text-[#181412]/65">
                      À vista com 10%: <span className="font-medium text-[#181412]">{scope.cash}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl px-7 md:px-10 py-9 md:py-10 border border-black/[0.08] mb-4">
                  <h4 className="font-halyard font-medium text-[#FE6942] text-[17px] tracking-[0.12em] uppercase mb-5">
                    Como será a etapa de imersão
                  </h4>
                  <ul className="space-y-4">
                    {scope.included.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-halyard font-normal text-[18px] md:text-[20px] leading-[1.45] text-[#000000]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white rounded-2xl px-7 md:px-10 py-9 md:py-10 border border-black/[0.08]">
                    <h4 className="font-halyard font-medium text-[#FE6942] text-[17px] tracking-[0.12em] uppercase mb-3">
                      Consultoria de acompanhamento
                    </h4>
                    <p className="font-halyard font-normal text-[18px] md:text-[20px] leading-[1.45] text-[#000000] mb-5">
                      Suporte estratégico após a entrega do projeto, com encontros regulares para orientar execução, conteúdo, comunicação e próximos passos.
                    </p>
                    <ul className="space-y-2.5 mb-5">
                      {['2 encontros mensais', 'Suporte via WhatsApp', 'Direcionamento de conteúdo'].map((f) => (
                        <li key={f} className="flex items-center gap-3 font-halyard font-normal text-[18px] md:text-[20px] leading-[1.45] text-[#000000]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {consultoriaOptions.map((option) => (
                        <div key={option.label} className="rounded-xl px-6 md:px-7 py-6 border border-black/[0.08]">
                          <div className="font-halyard text-[12px] tracking-[0.18em] uppercase mb-3 text-[#000000]">
                            {option.label}
                          </div>
                          <div className="font-halyard font-medium text-[#000000] text-[1.7rem] md:text-[2rem] leading-[1] mb-2">
                            {option.mensal}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl px-7 md:px-10 py-9 md:py-10 border border-black/[0.08]">
                    <h4 className="font-halyard font-medium text-[#FE6942] text-[17px] tracking-[0.12em] uppercase mb-5">
                      Simulação do total
                    </h4>
                    <p className="font-halyard font-normal text-[18px] md:text-[20px] leading-[1.45] text-[#000000] mb-5">
                      Valores considerando projeto + acompanhamento. Pagamento à vista recebe condição especial de 10% sobre o valor total.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {scope.simulations.map(([name, total, cash]) => (
                        <div key={name} className="rounded-xl px-6 md:px-7 py-6 border border-black/[0.08]">
                          <div className="font-halyard font-medium text-[#181412] text-[18px] md:text-[19px] leading-[1.15] mb-4 max-w-[28ch]">
                            {name.startsWith('Foundation+') ? (
                              <>
                                Foundation<span className="text-[#FE6942]">+</span>{name.replace('Foundation+', '')}
                              </>
                            ) : name}
                          </div>
                          <div className="font-halyard text-[12px] tracking-[0.18em] uppercase text-[#181412]/40 mb-1">Total</div>
                          <div className="font-halyard font-medium text-[#181412] text-[25px] leading-[1] mb-4">{total}</div>
                          <div className="font-halyard text-[12px] tracking-[0.18em] uppercase text-[#FE6942] mb-1">À vista com 10%</div>
                          <div className="font-halyard font-medium text-gradient text-[27px] leading-[1]">{cash}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Info de disponibilidade */}
        <div className="inv-block bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-7 border border-black/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-5">
            {[
              ['Validade da proposta', '5 dias corridos'],
              ['Disponibilidade de início', '20/05'],
              ['Vagas disponíveis para maio', '1'],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="font-halyard text-[12px] tracking-[0.18em] uppercase text-[#FE6942] mb-1.5">{label}</div>
                <div className="font-halyard font-medium text-[20px] md:text-[22px] leading-[1.15] text-[#181412]">{value}</div>
              </div>
            ))}
          </div>
          <p className="font-halyard font-normal text-[18px] md:text-[20px] leading-[1.45] text-[#000000]">
            Para garantir qualidade na entrega, trabalhamos com um número limitado de projetos como esse de forma simultânea. A confirmação nesta reunião já permite reservarmos a agenda e iniciarmos o planejamento do projeto.
          </p>
        </div>

        {/* Formas e meios de pagamento */}
        <div className="inv-block mt-5 bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-8 border border-black/[0.08] flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex-1">
            <h4 className="font-halyard font-medium text-[#181412] text-[15px] tracking-[0.12em] uppercase mb-5">Formas de pagamento</h4>
            <ul className="space-y-3.5">
              {['Pagamento 50% no início e 50% após 30 dias', 'Pagamento à vista com condição especial de 10%'].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                  <span className="font-halyard font-normal text-[18px] md:text-[20px] text-[#000000]">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h4 className="font-halyard font-medium text-[#181412] text-[15px] tracking-[0.12em] uppercase mb-5">Meios de pagamento</h4>
            <ul className="space-y-3.5">
              {['Pix', 'Boleto', 'Cartão de crédito em até 12x com taxa da operadora'].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                  <span className="font-halyard font-normal text-[18px] md:text-[20px] text-[#000000]">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── SLIDESHOW ─────────────────────────────────────────────────────────────────
// 0: Capa  |  1: Contexto Atual  |  2: Contexto A→B  |  3: Escopo
// 4: FoundationHouse  |  5: Entregáveis  |  6: Resultados
// 7: Cronograma  |  8: Investimento
const SLIDE_TOTAL = 9;

function PropostaSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState('next');
  const [escopoVisiblePillars, setEscopoVisiblePillars] = useState(1);
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
  }, [current, escopoVisiblePillars, checkScroll]);

  const navigate = useCallback((dir) => {
    if (isTransitioning.current) return;
    if (current === 3 && dir > 0 && escopoVisiblePillars < PROPOSTA_DATA.escopo.pilares.length) {
      isTransitioning.current = true;
      setEscopoVisiblePillars((c) => Math.min(c + 1, PROPOSTA_DATA.escopo.pilares.length));
      setTimeout(() => { isTransitioning.current = false; }, 350);
      return;
    }
    if (current === 3 && dir < 0 && escopoVisiblePillars > 1) {
      isTransitioning.current = true;
      setEscopoVisiblePillars((c) => Math.max(c - 1, 1));
      setTimeout(() => { isTransitioning.current = false; }, 350);
      return;
    }
    const next = current + dir;
    if (next < 0 || next >= SLIDE_TOTAL) return;
    isTransitioning.current = true;
    setAnimDir(dir > 0 ? 'next' : 'prev');
    if (next === 3) setEscopoVisiblePillars(dir > 0 ? 1 : PROPOSTA_DATA.escopo.pilares.length);
    setCurrent(next);
    setTimeout(() => { isTransitioning.current = false; }, 800);
  }, [current, escopoVisiblePillars]);

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
      style={{ height: '100svh', background: current === 0 ? '#0a0a0a' : '#fff' }}
    >

      <div
        key={current}
        ref={slideScrollRef}
        data-lenis-prevent
        onScroll={checkScroll}
        className={`absolute inset-0 overflow-y-auto ${current === 0 ? 'pb-0' : 'pb-20 md:pb-16'} ${animDir === 'next' ? 'slide-from-right' : 'slide-from-left'}`}
      >
        {current === 0 && <Capa />}
        {current === 1 && <Contexto showDesejado={false} />}
        {current === 2 && <Contexto showDesejado={true} />}
        {current === 3 && <Escopo visiblePillars={escopoVisiblePillars} />}
        {current === 4 && <FoundationHouse />}
        {current === 5 && <Entregaveis />}
        {current === 6 && <Resultados />}
        {current === 7 && <Cronograma />}
        {current === 8 && <Investimento />}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10 transition-opacity duration-300"
        style={{ opacity: hasMoreBelow ? 1 : 0, background: `linear-gradient(to top, ${current === 0 ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)'} 0%, transparent 100%)` }}
        aria-hidden="true"
      />

      <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <button
          onClick={() => navigate(-1)}
          disabled={current === 0}
          aria-label="Slide anterior"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-150 disabled:opacity-25 active:scale-[0.97]"
          style={{
            border: `1px solid ${current === 0 ? 'rgba(255,255,255,.2)' : 'rgba(0,0,0,.15)'}`,
            background: current === 0 ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.9)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke={current === 0 ? 'white' : '#181412'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                backgroundColor: i === current ? '#FE6942' : (current === 0 ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,0.14)'),
              }}
            />
          ))}
        </div>

        <button
          onClick={() => navigate(1)}
          aria-label="Próximo slide"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-150 active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #FED1C5 0%, #FF5224 100%)' }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M6 12l4-4-4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── PÁGINA ────────────────────────────────────────────────────────────────────
export default function PropostaWokingThaiFinal() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
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
      <PropostaSlideshow />
    </div>
  );
}
