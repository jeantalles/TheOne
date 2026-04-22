import { useEffect, useRef, useState, useCallback, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { usePrefersReducedMotion, useConstrainedMotion } from '../hooks/useMediaQuery';
import Hero from './1-Hero';
import GradientTransition from './2-GradientTransition';
import StorytellingIntro from './3a-StorytellingIntro';
import PersonaTrigger from './3b-PersonaTrigger';
import Storytelling from './3-Storytelling';
import TheOne from './4-TheOne';
import SolucoesTheOne from './4b-SolucoesTheOne';
import Methodology from './5-Methodology';

const Founders = lazy(() => import('./9-Founders'));

gsap.registerPlugin(ScrollTrigger);

// ── CUSTOMIZE PER CLIENT ──────────────────────────────────────────────────────
const PROPOSTA_DATA = {
  cliente: 'Nome do Cliente',
  data: 'Abril 2026',

  contextoA: {
    pontos: [
      'Marca sem posicionamento claro no mercado',
      'Comunicação inconsistente entre canais',
      'Dependência de tráfego pago sem construção de marca',
      'Concorrência em preço por falta de diferenciação',
    ],
  },

  contextoB: {
    pontos: [
      'Marca reconhecida como referência no segmento',
      'Narrativa e identidade visual alinhadas e impactantes',
      'Presença orgânica que gera autoridade e desejo',
      'Precificação premium sustentada pelo posicionamento',
    ],
  },

  escopo: {
    entrega: 'Guia de Estratégia de Posicionamento e Marca',
    pilares: [
      {
        label: 'Pilar 1',
        titulo: 'A Fundação: Diagnóstico e Pesquisa',
        descricao: 'É aqui que nos aprofundamos e entendemos de forma completa seu negócio, mercado e público.',
        itens: [
          {
            titulo: 'Raio-X do Negócio',
            descricao: 'Mapeamento de contexto, objetivos de negócio, impulsionadores, detratores e desafios que impactam a percepção e o crescimento da marca.',
          },
          {
            titulo: 'Análise de Concorrentes',
            descricao: 'Como os players do setor se posicionam, onde estão os padrões repetidos e quais brechas estratégicas existem para sua marca ocupar.',
          },
          {
            titulo: 'Mapeamento Profundo de Público',
            descricao: 'Definição de público baseada não só em dados demográficos, mas nas necessidades, dores e desejos de quem compra.',
          },
        ],
      },
      {
        label: 'Pilar 2',
        titulo: 'A Estratégia de Posicionamento e Marca',
        descricao: 'Baseado no que observamos do contexto do seu negócio, mercado e público, construímos uma estratégia para se tornar uma das principais referências, se diferenciar da concorrência e gerar desejo no público.',
        itens: [
          {
            titulo: 'Posicionamento e Diferenciação',
            descricao: 'Definição da proposta única de valor, diferenciais estratégicos, território da marca e do posicionamento inevitável.',
          },
          {
            titulo: 'Identidade da Marca',
            descricao: 'Construímos o porquê vão se conectar conosco, definição de propósito, valores, crenças, personalidade e arquétipos.',
          },
          {
            titulo: 'Conceito e Narrativa',
            descricao: 'Criação do conceito central, declaração de posicionamento, transformação da marca e narrativa que sustenta sua comunicação.',
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
            descricao: 'Como a marca deve se portar em cada ponto de contato com seu cliente para ser vista, lembrada, desejada e comprada. Instagram, LinkedIn, WhatsApp, site, eventos e outros canais.',
          },
          {
            titulo: 'Estratégia de Conteúdo',
            descricao: 'Principais formatos, tópicos e comunicação para que a marca se conecte com seu público e se torne a alternativa inevitável.',
          },
          {
            titulo: 'Estratégia de Collabs',
            descricao: 'Direcionamento de marcas e parceiros aos quais a marca deve se associar para potencializar crescimento, relevância e reputação no mercado.',
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
    'Posicionamento de marca claro e diferenciado no mercado',
    'Narrativa que gera identificação e desejo no público certo',
    'Identidade visual que eleva a percepção de valor do produto',
    'Redução da dependência de tráfego pago com geração de demanda orgânica',
    'Base sólida para escalabilidade sem perder a essência da marca',
  ],

  cronograma: [
    { etapa: '01', nome: 'Imersão', duracao: '2 semanas', descricao: 'Diagnóstico, pesquisa e análise completa' },
    { etapa: '02', nome: 'Estratégia', duracao: '3 semanas', descricao: 'Posicionamento, narrativa e plataforma de marca' },
    { etapa: '03', nome: 'Identidade', duracao: '4 semanas', descricao: 'Identidade visual e verbal' },
    { etapa: '04', nome: 'Implementação', duracao: '6 semanas', descricao: 'Aplicação em todos os pontos de contato' },
    { etapa: '05', nome: 'Acompanhamento', duracao: 'Ongoing', descricao: 'Suporte estratégico mensal contínuo' },
  ],

  investimento: {
    nota: 'Investimento único no Diagnóstico Estratégico, seguido de mensalidades para a fase de implementação.',
    formasDePagamento: [
      'Pix ou transferência bancária',
      'Cartão de crédito em até 12x',
      'Boleto bancário (à vista)',
    ],
    itens: [
      {
        etapa: '01',
        nome: 'Diagnóstico Estratégico',
        descricao: 'Análise completa de marca, mercado e público. Entrega do mapa de posicionamento da sua marca.',
        valor: 'R$ 0.000',
        periodo: 'Pagamento único',
      },
      {
        etapa: '02',
        nome: 'Implementação de Marca',
        descricao: 'Desenvolvimento da plataforma de marca, narrativa, identidade visual e presença digital.',
        valor: 'R$ 0.000/mês',
        periodo: 'Mínimo 6 meses',
      },
    ],
  },
};
// ─────────────────────────────────────────────────────────────────────────────


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
            O projeto de{' '}
            <span className="text-[#FE6942]">{PROPOSTA_DATA.cliente}</span>
          </h2>
        </div>

        <div className="grid items-start gap-6 md:gap-0 grid-cols-1 md:grid-cols-[1fr_72px_1fr]">

          {/* Card A */}
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

          {/* Seta central + Card B — só aparecem no slide 2 */}
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
function Escopo() {
  const sectionRef = useRef(null);
  const scope = PROPOSTA_DATA.escopo;
  const agentName = `The${PROPOSTA_DATA.cliente.replace(/\s+/g, '')} ${scope.bonus.titulo}`;

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
    <section ref={sectionRef} className="bg-white min-h-full px-6 md:px-12 lg:px-16 py-10 md:py-14 pb-28">
      <div className="max-w-[1440px] mx-auto">

        <div className="escopo-block grid grid-cols-1 lg:grid-cols-[0.74fr_1.26fr] gap-8 lg:gap-14 border-t border-black/10 pt-10 md:pt-12 mb-8 md:mb-10">
          <div>
            <span className="font-halyard text-[11px] tracking-[0.24em] uppercase text-[#FE6942] font-semibold block mb-4">
              Título da entrega
            </span>
            <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.25rem,4vw,3.7rem)] leading-[1.02] tracking-tight max-w-[12ch]">
              {scope.entrega}
            </h2>
          </div>
          <p className="font-halyard font-light text-[#181412] text-[18px] md:text-[22px] leading-[1.55] max-w-[760px] lg:pt-8">
            Um sistema estratégico organizado por etapas: primeiro entendemos o terreno, depois definimos o posicionamento e, por fim, desenhamos como a marca se efetiva nos canais certos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {scope.pilares.map((pilar, i) => (
            <article key={pilar.label} className="escopo-block bg-[#F8F8F8] rounded-lg px-5 md:px-6 py-6 border border-black/[0.08] flex flex-col">
              <div className="flex items-start gap-4 mb-5">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#181412] text-white font-halyard text-[13px] font-semibold shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className="font-halyard text-[10px] tracking-[0.2em] uppercase text-[#FE6942] font-semibold block mb-2">
                    {pilar.label}
                  </span>
                  <h3 className="font-halyard font-semibold text-[#181412] text-[19px] md:text-[21px] leading-[1.1] uppercase">
                    {pilar.titulo}
                  </h3>
                </div>
              </div>

              <p className="font-halyard font-light text-[#181412] text-[15px] md:text-[16px] leading-[1.55] mb-4">
                {pilar.descricao}
              </p>

              <div className="mt-auto divide-y divide-black/[0.08]">
                {pilar.itens.map((item) => (
                  <div key={item.titulo} className="py-3.5 first:pt-0 last:pb-0">
                    <h4 className="font-halyard font-semibold text-[#181412] text-[15px] leading-[1.25] mb-1.5">
                      {item.titulo}
                    </h4>
                    <p className="font-halyard font-light text-[#181412] text-[14px] leading-[1.45]">
                      {item.descricao}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="escopo-block mt-3 rounded-lg border border-[#FE6942]/35 bg-[#FE6942]/[0.06] px-5 md:px-7 py-5 md:py-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-8 items-start">
          <div>
            <span className="font-halyard text-[10px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold block mb-2">
              Bônus
            </span>
            <h3 className="font-editorial font-normal text-[#181412] text-[clamp(1.7rem,2.5vw,2.35rem)] leading-[1.02] tracking-tight">
              {agentName}
            </h3>
          </div>
          <p className="font-halyard font-light text-[#181412] text-[16px] md:text-[18px] leading-[1.55]">
            {scope.bonus.descricao}
          </p>
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
        opacity: 0, y: 40, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-24 pb-28 md:py-36 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-16 md:mb-20">
          <span className="font-halyard text-[11px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
            O que vamos alcançar
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
            O que queremos atingir com esse projeto para o seu negócio
          </h2>
        </div>

        <ul className="space-y-6 md:space-y-8">
          {PROPOSTA_DATA.resultados.map((r, i) => (
            <li key={i} className="resultado-item flex items-start gap-5 md:gap-7">
              <span className="text-[#FE6942] text-[1.4rem] md:text-[1.6rem] leading-none mt-1 shrink-0 select-none">→</span>
              <p className="font-halyard font-light text-[#181412]/70 text-[20px] md:text-[26px] leading-[1.5]">{r}</p>
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
      // Linha horizontal anima de esq → dir
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

        <div className="mb-16 md:mb-20">
          <span className="font-halyard text-[11px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
            Linha do Tempo
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
            Cronograma do projeto
          </h2>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:block relative">
          {/* Trilho */}
          <div className="absolute top-[36px] left-0 right-0 h-px bg-black/10" />
          <div
            ref={lineRef}
            className="absolute top-[36px] left-0 right-0 h-px bg-[#FE6942] origin-left"
          />

          <div className="grid"
            style={{ gridTemplateColumns: `repeat(${PROPOSTA_DATA.cronograma.length}, 1fr)` }}
          >
            {PROPOSTA_DATA.cronograma.map((step, i) => (
              <div key={i} className="crono-step flex flex-col items-center text-center px-4">
                {/* Nó */}
                <div className="w-[72px] h-[72px] rounded-full border-2 border-[#FE6942] bg-white flex items-center justify-center mb-6 relative z-10">
                  <span className="font-editorial font-normal text-[#FE6942] text-[1.3rem]">{step.etapa}</span>
                </div>
                <span className="font-halyard font-medium text-[#181412] text-[17px] mb-2">{step.nome}</span>
                <span className="font-halyard font-light text-[#FE6942] text-[13px] tracking-[0.1em] uppercase mb-3">{step.duracao}</span>
                <p className="font-halyard font-light text-[#181412]/60 text-[15px] leading-[1.5]">{step.descricao}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden relative pl-10">
          <div className="absolute left-[18px] top-0 bottom-0 w-px bg-black/10" />
          <div className="space-y-10">
            {PROPOSTA_DATA.cronograma.map((step, i) => (
              <div key={i} className="crono-step relative">
                <div className="absolute -left-[28px] top-0 w-9 h-9 rounded-full border-2 border-[#FE6942] bg-white flex items-center justify-center">
                  <span className="font-editorial font-normal text-[#FE6942] text-[0.85rem]">{step.etapa}</span>
                </div>
                <span className="font-halyard font-medium text-[#181412] text-[18px] block mb-1">{step.nome}</span>
                <span className="font-halyard text-[#FE6942] text-[12px] tracking-[0.1em] uppercase block mb-2">{step.duracao}</span>
                <p className="font-halyard font-light text-[#181412]/60 text-[16px] leading-[1.5]">{step.descricao}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── SEÇÃO: PERGUNTA INTERATIVA ────────────────────────────────────────────────
function PropostaQuestion({ onAnswer, noLock = false }) {
  const [answered, setAnswered] = useState(false);
  const [choice, setChoice] = useState(null);
  const sectionRef = useRef(null);
  const hasLockedRef = useRef(false);
  const contentRef = useRef(null);
  const responseRef = useRef(null);

  useEffect(() => {
    if (noLock) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasLockedRef.current && !answered) {
          hasLockedRef.current = true;
          const lenis = window.__theOneLenis;

          const doLock = () => {
            lenis?.stop();
            document.body.style.overflow = 'hidden';
          };

          if (lenis) {
            lenis.scrollTo(section, {
              duration: 0.8,
              onComplete: doLock,
            });
          } else {
            section.scrollIntoView({ behavior: 'smooth' });
            setTimeout(doLock, 600);
          }
        }
      },
      { threshold: 0.7 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [answered, noLock]);

  const handleAnswer = (ans) => {
    setChoice(ans);
    setAnswered(true);

    if (contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0, y: -24, filter: 'blur(8px)', duration: 0.45, ease: 'power2.in',
        onComplete: () => {
          if (responseRef.current) {
            gsap.fromTo(
              responseRef.current,
              { opacity: 0, y: 24, filter: 'blur(8px)' },
              {
                opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out',
                onComplete: () => {
                  setTimeout(() => {
                    if (!noLock) {
                      window.__theOneLenis?.start();
                      document.body.style.overflow = '';
                    }
                    onAnswer?.(ans);
                  }, 1400);
                },
              }
            );
          }
        },
      });
    }
  };

  const ease = 'cubic-bezier(0.23, 1, 0.32, 1)';

  return (
    <section
      ref={sectionRef}
      className="h-full bg-white flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 55%, rgba(254,105,66,0.05) 0%, transparent 65%)' }}
      />

      {/* Pergunta */}
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: answered ? 0 : 1, pointerEvents: answered ? 'none' : 'auto' }}
      >
        <span className="font-halyard text-[11px] tracking-[0.28em] uppercase text-[#FE6942]/60 font-medium mb-8">
          Antes de continuar
        </span>
        <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] tracking-tight max-w-[820px] mb-16">
          Este projeto resolve<br />o seu cenário atual?
        </h2>
        <div className="flex gap-5 flex-wrap justify-center">
          <button
            onClick={() => handleAnswer('sim')}
            className="font-halyard font-medium text-white text-[16px] tracking-[0.08em] uppercase px-12 py-4 rounded-full active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, #FED1C5 0%, #FF5224 100%)',
              transition: `transform 160ms ${ease}, box-shadow 300ms ${ease}`,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(254,105,66,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            Sim, resolve
          </button>
          <button
            onClick={() => handleAnswer('nao')}
            className="font-halyard font-medium text-[#181412]/60 text-[16px] tracking-[0.08em] uppercase px-12 py-4 rounded-full border border-black/15 hover:border-black/30 transition-colors duration-300"
          >
            Tenho dúvidas
          </button>
        </div>
      </div>

      {/* Resposta */}
      <div
        ref={responseRef}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
        style={{ opacity: 0 }}
      >
        {choice === 'sim' ? (
          <>
            <div className="text-[3rem] mb-6 text-[#FE6942]">→</div>
            <h3 className="font-editorial font-normal text-[#181412] text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] max-w-[680px] mb-4">
              Ótimo. Vamos avançar<br />para o investimento.
            </h3>
            <p className="font-halyard font-light text-[#181412]/55 text-[18px]">
              Use a seta para continuar.
            </p>
          </>
        ) : (
          <>
            <h3 className="font-editorial font-normal text-[#181412] text-[clamp(1.8rem,4vw,3rem)] leading-[1.15] max-w-[680px] mb-4">
              Tudo bem ter dúvidas.
            </h3>
            <p className="font-halyard font-light text-[#181412]/55 text-[18px] max-w-[480px] leading-[1.6]">
              Vamos conversar para entender melhor como podemos adaptar essa proposta ao seu momento.
            </p>
          </>
        )}
      </div>
    </section>
  );
}


// ── SLIDESHOW DAS SEÇÕES DA PROPOSTA ─────────────────────────────────────────
const SLIDE_TOTAL = 7;
const QUESTION_IDX = 5;

function PropostaSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState('next');
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const wrapperRef = useRef(null);
  const isLockedRef = useRef(false);
  const isTransitioning = useRef(false);

  // Lock scroll when slideshow enters viewport
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLockedRef.current) {
          isLockedRef.current = true;
          const lenis = window.__theOneLenis;
          if (lenis) {
            lenis.scrollTo(el, {
              duration: 0.6,
              onComplete: () => {
                lenis.stop();
                document.body.style.overflow = 'hidden';
              },
            });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { document.body.style.overflow = 'hidden'; }, 600);
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const navigate = useCallback((dir) => {
    if (isTransitioning.current) return;
    if (dir > 0 && current === QUESTION_IDX && !questionAnswered) return;
    const next = current + dir;
    if (next < 0 || next >= SLIDE_TOTAL) return;
    isTransitioning.current = true;
    setAnimDir(dir > 0 ? 'next' : 'prev');
    setCurrent(next);
    setTimeout(() => { isTransitioning.current = false; }, 500);
  }, [current, questionAnswered]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') navigate(1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  const isNextBlocked = current === QUESTION_IDX && !questionAnswered;

  return (
    <div ref={wrapperRef} className="relative overflow-hidden bg-white" style={{ height: '100svh' }}>

      {/* Slide content */}
      <div
        key={current}
        className={`absolute inset-0 overflow-y-auto ${animDir === 'next' ? 'slide-from-right' : 'slide-from-left'}`}
      >
        {current === 0 && <Contexto showDesejado={false} />}
        {current === 1 && <Contexto showDesejado={true} />}
        {current === 2 && <Escopo />}
        {current === 3 && <Resultados />}
        {current === 4 && <Cronograma />}
        {current === 5 && (
          <PropostaQuestion
            noLock
            onAnswer={() => setQuestionAnswered(true)}
          />
        )}
        {current === 6 && <Investimento />}
      </div>

      {/* Navigation: arrows + dots centered at bottom */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={() => navigate(-1)}
          disabled={current === 0}
          aria-label="Slide anterior"
          className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center transition-all duration-150 disabled:opacity-25 hover:border-black/30 active:scale-[0.97]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#181412" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: SLIDE_TOTAL }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '18px' : '6px',
                height: '6px',
                backgroundColor: i === current ? '#FE6942' : 'rgba(0,0,0,0.14)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => navigate(1)}
          disabled={isNextBlocked}
          aria-label="Próximo slide"
          className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-150 disabled:opacity-25 active:scale-[0.97]"
          style={{ background: 'linear-gradient(135deg, #FED1C5 0%, #FF5224 100%)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12l4-4-4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── SEÇÃO: INVESTIMENTO ───────────────────────────────────────────────────────
function Investimento() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.inv-card', {
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
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] tracking-tight">
            Investimento
          </h2>
        </div>

        <div className="space-y-5 mb-16">
          {PROPOSTA_DATA.investimento.itens.map((item, i) => (
            <div
              key={i}
              className="inv-card bg-[#F8F8F8] rounded-[24px] px-8 md:px-12 py-10 border border-black/[0.08] flex flex-col md:flex-row md:items-center gap-8 md:gap-16 transition-shadow duration-500 hover:shadow-lg"
            >
              <span className="font-editorial font-normal text-[#FE6942]/25 text-[4rem] md:text-[5rem] leading-none shrink-0 select-none">
                {item.etapa}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-editorial font-normal text-[#181412] text-[1.75rem] md:text-[2.25rem] leading-[1.1] mb-3">
                  {item.nome}
                </h3>
                <p className="font-halyard font-light text-[#181412]/60 text-[17px] leading-[1.55] max-w-[52ch]">
                  {item.descricao}
                </p>
              </div>
              <div className="shrink-0 md:text-right">
                <div className="font-editorial font-normal text-gradient text-[2.5rem] md:text-[3.25rem] leading-[1] mb-1">
                  {item.valor}
                </div>
                <div className="font-halyard text-[12px] tracking-[0.15em] uppercase text-[#181412]/40">
                  {item.periodo}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Formas de pagamento + nota */}
        <div className="bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-8 border border-black/[0.08] flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex-1">
            <h4 className="font-halyard font-medium text-[#181412] text-[15px] tracking-[0.12em] uppercase mb-5">
              Formas de pagamento
            </h4>
            <ul className="space-y-3">
              {PROPOSTA_DATA.investimento.formasDePagamento.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                  <span className="font-halyard font-light text-[17px] text-[#181412]">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:max-w-[420px]">
            <h4 className="font-halyard font-medium text-[#181412] text-[15px] tracking-[0.12em] uppercase mb-5">
              Observação
            </h4>
            <p className="font-halyard font-light text-[#181412]/60 text-[17px] leading-[1.6]">
              {PROPOSTA_DATA.investimento.nota}
            </p>
          </div>
        </div>

        {/* CTA WhatsApp */}
        <div className="mt-14 text-center">
          <a
            href="https://wa.me/5511999999999"
            className="inline-flex items-center gap-3 text-white font-halyard font-medium text-[15px] tracking-[0.06em] uppercase px-10 py-4 rounded-full transition-all duration-200 active:scale-[0.97]"
            style={{ background: 'linear-gradient(135deg, #FED1C5 0%, #FF5224 100%)' }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(254,105,66,0.35)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
          >
            Vamos fechar →
          </a>
        </div>

      </div>
    </section>
  );
}

// ── PÁGINA PRINCIPAL ──────────────────────────────────────────────────────────
export default function PropostaPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const prefersConstrainedMotion = useConstrainedMotion();
  const shouldUseLenis = !prefersReducedMotion && !prefersConstrainedMotion;

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (!shouldUseLenis) return undefined;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    window.__theOneLenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    // Refresh ScrollTrigger after Lenis is running so all pinned sections
    // and scrub triggers recalculate positions with smooth scroll active.
    let refreshId = requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(refreshId);
      if (window.__theOneLenis === lenis) {
        delete window.__theOneLenis;
      }
      lenis.destroy();
    };
  }, [shouldUseLenis]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans">
      <div className="noise-overlay" aria-hidden="true" />

      {/* Intro do site — hero + storytelling + theone */}
      <div style={{ backgroundColor: '#F5EEE9' }}>
        <Hero
          showLogo={true}
          introPhrases={[
            <>Olá, <span style={{ color: '#FE6942' }}>{PROPOSTA_DATA.cliente}</span></>,
            <>Seja bem-vindo à <span style={{ color: '#FE6942' }}>TheOne</span></>,
          ]}
        />
        <StorytellingIntro />
        <PersonaTrigger onTrigger={() => {}} triggered />
        <GradientTransition />
      </div>

      <Storytelling persona="empresario" />
      <TheOne />
      <SolucoesTheOne />
      <Methodology />

      <Suspense fallback={null}>
        <Founders />
      </Suspense>

      {/* Slideshow da proposta */}
      <PropostaSlideshow />

    </div>
  );
}
