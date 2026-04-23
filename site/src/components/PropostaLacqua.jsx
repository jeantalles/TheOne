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

// ── DADOS DA PROPOSTA — LACQUA ────────────────────────────────────────────────
const PROPOSTA_DATA = {
  cliente: 'Vitor',
  empresa: "L'acqua Purificadores",
  data: 'Abril 2026',

  contextoA: {
    pontos: [
      'Dependência forte do Google Ads — faturamento cai quando o tráfego para',
      'Dificuldade de comunicar diferenciais reais: qualidade, atendimento e reputação',
      'Posicionamento difuso por atender públicos muito diferentes, do básico ao premium',
      'Sensação de rodar sem sair do lugar, mesmo com alto esforço operacional',
    ],
  },

  contextoB: {
    pontos: [
      'Marca como ativo de longo prazo que continua gerando resultado',
      'Principal referência da região no segmento de purificadores de água',
      'Demanda orgânica consistente além de indicação e mídia paga',
      'Posicionamento claro que atrai clientes mais qualificados e menos sensíveis a preço',
    ],
  },

  escopo: {
    entrega: 'Estratégia de Posicionamento e Marca',
    pilares: [
      {
        label: 'Pilar 1',
        titulo: 'A Fundação: Diagnóstico e Pesquisa',
        descricao: 'É aqui que nos aprofundamos e entendemos de forma completa seu negócio, mercado e público.',
        itens: [
          {
            titulo: 'Imersão Estratégica',
            descricao: "Mapeamento completo do contexto do negócio, objetivos, impulsionadores, detratores e desafios que afetam a percepção da L'acqua no mercado.",
          },
          {
            titulo: 'Pesquisa de Mercado',
            descricao: "Como os concorrentes se posicionam, onde estão os padrões repetidos e quais brechas estratégicas existem para a L'acqua ocupar.",
          },
          {
            titulo: 'Mapeamento Profundo de Público',
            descricao: 'Definição de público baseada não só em dados demográficos, mas nas necessidades, dores e desejos de quem compra purificadores na sua região.',
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
            descricao: "Definição da proposta única de valor, diferenciais estratégicos e do território de marca que a L'acqua vai ocupar.",
          },
          {
            titulo: 'Personalidade da Marca',
            descricao: "Propósito, valores, crenças e arquétipos que sustentam a conexão da L'acqua com seu público e justificam a escolha.",
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
            descricao: "Como a L'acqua deve se portar em cada ponto de contato — Instagram, WhatsApp, Google, site e indicação — para ser vista, lembrada e escolhida.",
          },
          {
            titulo: 'Estratégia de Conteúdo',
            descricao: 'Principais formatos, tópicos e linhas de comunicação para que a marca construa autoridade local e gere demanda orgânica.',
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
    'Criação de um ativo de longo prazo, uma marca que continua gerando resultado mesmo sem anúncios',
    'Redução gradual da dependência de tráfego pago como principal fonte de vendas',
    'Aumento da demanda orgânica: indicação, busca direta e redes sociais',
    "Crescimento da lembrança de marca na região, a L'acqua como opção número um em purificadores",
    'Maior percepção de valor e menor sensibilidade a preço por parte dos clientes',
    'Fortalecimento da autoridade local como referência no segmento',
    'Melhora na qualidade dos leads, clientes mais alinhados com o posicionamento',
  ],

  cronograma: [
    { etapa: '01', nome: 'Imersão', descricao: 'Diagnóstico completo do negócio, mercado e público' },
    { etapa: '02', nome: 'Pesquisa', descricao: 'Análise de concorrência e oportunidades de posicionamento' },
    { etapa: '03', nome: 'Estratégia', descricao: 'Posicionamento, marca e diferenciação' },
    { etapa: '04', nome: 'Efetivação', descricao: 'Estratégia de canais e conteúdo para colocar a marca para funcionar' },
    { etapa: '05', nome: 'Entrega', descricao: 'Guia de Estratégia de Posicionamento e Marca' },
  ],
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
            O projeto da{' '}
            <span className="text-[#FE6942]">{PROPOSTA_DATA.empresa}</span>
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
              Estratégia de
              <br />
              <span className="whitespace-nowrap">Posicionamento e Marca</span>
            </h2>
          </div>
          <div className="lg:justify-self-end lg:pt-9">
            <p className="font-halyard font-light text-[#181412] text-[18px] md:text-[22px] leading-[1.55] max-w-[620px] lg:text-right">
              Um sistema estratégico organizado por etapas: primeiro entendemos o terreno, depois definimos o posicionamento e, por fim, desenhamos como a L'acqua se efetiva nos canais certos.
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
                    <h4 className="font-halyard font-medium text-[#181412] text-[16px] md:text-[17px] leading-[1.25] mb-1.5">
                      {item.titulo}
                    </h4>
                    <p className="font-halyard font-light text-[#181412] text-[15px] md:text-[16px] leading-[1.45]">
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

// ── SEÇÃO: ENTREGÁVEIS ────────────────────────────────────────────────────────
function Entregaveis() {
  const sectionRef = useRef(null);
  const agentName = `The${PROPOSTA_DATA.empresa.split(' ')[0]} ${PROPOSTA_DATA.escopo.bonus.titulo}`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.entregavel-block', {
        opacity: 0, y: 24, stagger: 0.08, duration: 0.72, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white min-h-full px-6 md:px-12 lg:px-16 pt-14 md:pt-16 lg:pt-20 pb-24">
      <div className="max-w-[1440px] mx-auto">
        <div className="entregavel-block text-center mb-5 md:mb-6">
          <span className="font-halyard text-[11px] tracking-[0.24em] uppercase text-[#FE6942] font-semibold block mb-3">
            Entregáveis
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.6rem,4.2vw,4.4rem)] leading-[0.98] tracking-tight">
            O que você recebe
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div className="entregavel-block">
            <div className="lg:h-[340px] flex items-end">
              <img
                src="/images/guia-de-estrategia.png"
                alt="Guia de Estratégia de Posicionamento e Marca"
                className="w-full max-w-[310px] lg:max-w-[360px] mx-auto lg:mx-0"
              />
            </div>

            <div className="mt-5 max-w-[520px]">
              <h3 className="font-halyard font-medium text-[#181412] text-[24px] md:text-[29px] leading-[1.12]">
                Guia de Estratégia de
                <br />
                Posicionamento e Marca
              </h3>
              <p className="mt-4 font-halyard font-light text-[#181412] text-[17px] md:text-[20px] leading-[1.3] max-w-[500px]">
                Um documento com mais de 80 slides com a fundação estratégica e caminho para sua marca se tornar TheOne
              </p>

              <div className="mt-5">
                <p className="font-halyard font-light text-[#181412] text-[17px] md:text-[19px] leading-[1.3] mb-2">
                  Também inclui:
                </p>
                <ul className="space-y-1.5">
                  {['Estratégia de Canais', 'Estratégia de Conteúdo'].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-halyard font-medium text-[#181412] text-[17px] md:text-[20px] leading-[1.25]">
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 text-[#FE6942] shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="entregavel-block">
            <div className="lg:h-[340px] flex items-end">
              <div className="relative mx-auto lg:mx-0 w-full max-w-[380px] rounded-[28px] border border-black/15 bg-[#F7F7F7] shadow-[0_20px_58px_rgba(0,0,0,0.08)] overflow-hidden aspect-[1.78]">
                <div className="h-8 px-4 flex items-center justify-between border-b border-black/10 bg-white/70 font-halyard text-[10px] text-[#181412]/55">
                  <span>Gemini</span>
                  <span>L'acqua | Estratégia de marca</span>
                  <span className="rounded-full bg-[#BDE8FF] px-2 py-1 text-[#181412]/70">Fazer upgrade</span>
                </div>
                <div className="absolute inset-x-0 top-12 bottom-0 flex flex-col items-center justify-center text-center px-8">
                  <div className="w-9 h-9 rounded-full bg-[#C978F3]/80 text-white flex items-center justify-center font-halyard font-medium text-[15px] mb-4">
                    L
                  </div>
                  <p className="font-halyard font-medium text-[#181412] text-[16px] mb-5">
                    L'acqua | Estrategista de marca
                  </p>
                  <div className="space-y-2 text-left font-halyard text-[12px] text-[#181412]/55">
                    <p>Recentes</p>
                    <p><span className="text-[#C978F3]">■</span> Roteiro de vídeos para Instagram</p>
                    <p><span className="text-[#C978F3]">■</span> Estratégia de conteúdo para o WhatsApp</p>
                  </div>
                </div>
                <div className="absolute left-1/2 bottom-5 -translate-x-1/2 w-[56%] rounded-2xl border border-black/10 bg-white px-4 py-3 font-halyard text-[11px] text-[#181412]/55">
                  Peça ao Gemini
                </div>
              </div>
            </div>

            <div className="mt-5 max-w-[540px]">
              <h3 className="font-halyard font-medium text-[#181412] text-[24px] md:text-[29px] leading-[1.12] flex flex-wrap items-baseline gap-x-6 gap-y-2">
                {agentName}
                <span className="font-halyard text-[13px] tracking-[0.24em] uppercase text-[#FE6942] font-semibold">
                  Bônus
                </span>
              </h3>
              <p className="mt-4 font-halyard font-light text-[#181412] text-[17px] md:text-[20px] leading-[1.3] max-w-[540px]">
                {PROPOSTA_DATA.escopo.bonus.descricao}
              </p>
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
          <span className="font-halyard text-[13px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
            Objetivos do projeto
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
            O que queremos atingir com esse projeto para o seu negócio
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

        <div className="mb-16 md:mb-20">
          <span className="font-halyard text-[13px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
            Linha do Tempo
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
            Cronograma do projeto
          </h2>
          <p className="font-halyard font-light text-[#181412]/65 text-[18px] md:text-[20px] leading-[1.5] mt-5 max-w-[32ch]">
            Prazo estimado geral de até 30 dias para a entrega completa do projeto.
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:block relative">
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
                <div className="w-[72px] h-[72px] rounded-full border-2 border-[#FE6942] bg-white flex items-center justify-center mb-6 relative z-10">
                  <span className="font-halyard font-medium text-[#FE6942] text-[1.55rem]">{step.etapa}</span>
                </div>
                <span className="font-halyard font-medium text-[#181412] text-[21px] mb-2">{step.nome}</span>
                <p className="font-halyard font-light text-[#181412]/70 text-[17px] leading-[1.45]">{step.descricao}</p>
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
                  <span className="font-halyard font-medium text-[#FE6942] text-[1rem]">{step.etapa}</span>
                </div>
                <span className="font-halyard font-medium text-[#181412] text-[21px] block mb-1">{step.nome}</span>
                <p className="font-halyard font-light text-[#181412]/70 text-[17px] leading-[1.45]">{step.descricao}</p>
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
            lenis.scrollTo(section, { duration: 0.8, onComplete: doLock });
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

      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ opacity: answered ? 0 : 1, pointerEvents: answered ? 'none' : 'auto' }}
      >
        <span className="font-halyard text-[13px] tracking-[0.28em] uppercase text-[#FE6942]/60 font-medium mb-8">
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

// ── SEÇÃO: INVESTIMENTO — LACQUA (com duas opções de consultoria) ──────────────
function Investimento() {
  const sectionRef = useRef(null);

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

        {/* Card 1: Estratégia */}
        <div className="inv-block bg-[#F8F8F8] rounded-[24px] px-8 md:px-12 py-10 border border-black/[0.08] flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mb-5 transition-shadow duration-500 hover:shadow-lg">
          <span className="font-editorial font-normal text-[#FE6942]/25 text-[4rem] md:text-[5rem] leading-none shrink-0 select-none">
            01
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-halyard font-medium text-[#181412] text-[1.75rem] md:text-[2.25rem] leading-[1.1] mb-3">
              Estratégia de Posicionamento e Marca
            </h3>
            <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[20px] leading-[1.45] max-w-[52ch]">
              Diagnóstico, pesquisa de mercado, posicionamento, narrativa, personalidade, estratégia de canais e conteúdo. Entrega do Guia completo.
            </p>
          </div>
          <div className="shrink-0 md:text-right">
            <div className="font-halyard font-medium text-gradient text-[2.5rem] md:text-[3.25rem] leading-[1]">
              R$5.000
            </div>
          </div>
        </div>

        {/* Card 2: Consultoria — duas opções */}
        <div className="inv-block bg-[#F8F8F8] rounded-[24px] px-8 md:px-12 py-10 border border-black/[0.08] mb-5">
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
            <span className="font-editorial font-normal text-[#FE6942]/25 text-[4rem] md:text-[5rem] leading-none shrink-0 select-none">
              02
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-halyard font-medium text-[#181412] text-[1.75rem] md:text-[2.25rem] leading-[1.1] mb-3">
                Consultoria de Acompanhamento Mensal
              </h3>
              <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[20px] leading-[1.45] max-w-[52ch] mb-8">
                Suporte estratégico para colocar o posicionamento em prática, com encontros regulares e suporte direto no WhatsApp. Mínimo 3 meses.
              </p>

              {/* Duas opções */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl px-6 py-6 border border-black/[0.08]">
                  <div className="font-halyard text-[12px] tracking-[0.2em] uppercase text-[#181412]/40 mb-3">Essencial</div>
                  <div className="font-halyard font-medium text-gradient text-[2rem] md:text-[2.5rem] leading-[1] mb-2">
                    R$1.000<span className="text-[1rem] text-[#181412]/40 font-normal">/mês</span>
                  </div>
                  <ul className="space-y-1.5 mt-4">
                    {['2 encontros mensais', 'Suporte via WhatsApp'].map((f) => (
                      <li key={f} className="flex items-center gap-2.5 font-halyard font-light text-[16px] text-[#181412]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl px-6 py-6 border-2 border-[#FE6942]">
                  <div className="font-halyard text-[12px] tracking-[0.2em] uppercase text-[#FE6942] mb-3">Premium</div>
                  <div className="font-halyard font-medium text-gradient text-[2rem] md:text-[2.5rem] leading-[1] mb-2">
                    R$2.000<span className="text-[1rem] text-[#181412]/40 font-normal">/mês</span>
                  </div>
                  <ul className="space-y-1.5 mt-4">
                    {['4 encontros mensais', 'Suporte via WhatsApp'].map((f) => (
                      <li key={f} className="flex items-center gap-2.5 font-halyard font-light text-[16px] text-[#181412]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formas e meios de pagamento */}
        <div className="inv-block bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-8 border border-black/[0.08] flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex-1">
            <h4 className="font-halyard font-medium text-[#181412] text-[15px] tracking-[0.12em] uppercase mb-5">
              Formas de pagamento
            </h4>
            <ul className="space-y-3.5">
              {['Pagamento 50% no início e 50% na entrega', 'Pagamento à vista com desconto especial'].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                  <span className="font-halyard font-light text-[18px] md:text-[19px] text-[#181412]">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h4 className="font-halyard font-medium text-[#181412] text-[15px] tracking-[0.12em] uppercase mb-5">
              Meios de pagamento
            </h4>
            <ul className="space-y-3.5">
              {['Pix', 'Boleto', 'Cartão de crédito em até 12x com taxa da operadora'].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                  <span className="font-halyard font-light text-[18px] md:text-[19px] text-[#181412]">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="inv-block mt-5 bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-6 border border-black/[0.08]">
          <p className="font-halyard font-light text-[18px] md:text-[19px] text-[#181412]">
            Validade da proposta: <strong>5 dias corridos</strong>.
          </p>
        </div>

      </div>
    </section>
  );
}

// ── SLIDESHOW DAS SEÇÕES DA PROPOSTA ─────────────────────────────────────────
const SLIDE_TOTAL = 8;
const QUESTION_IDX = 6;

function PropostaSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState('next');
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [escopoVisiblePillars, setEscopoVisiblePillars] = useState(1);
  const [hasMoreBelow, setHasMoreBelow] = useState(false);
  const wrapperRef = useRef(null);
  const slideScrollRef = useRef(null);
  const isTransitioning = useRef(false);

  const checkScroll = useCallback(() => {
    const el = slideScrollRef.current;
    if (!el) return;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    setHasMoreBelow(!atBottom && el.scrollHeight > el.clientHeight);
  }, []);

  useEffect(() => {
    setHasMoreBelow(false);
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(checkScroll);
    });
    return () => cancelAnimationFrame(id);
  }, [current, escopoVisiblePillars, checkScroll]);

  const navigate = useCallback((dir) => {
    if (isTransitioning.current) return;
    if (current === 2 && dir > 0 && escopoVisiblePillars < PROPOSTA_DATA.escopo.pilares.length) {
      isTransitioning.current = true;
      setEscopoVisiblePillars((count) => Math.min(count + 1, PROPOSTA_DATA.escopo.pilares.length));
      setTimeout(() => { isTransitioning.current = false; }, 350);
      return;
    }
    if (current === 2 && dir < 0 && escopoVisiblePillars > 1) {
      isTransitioning.current = true;
      setEscopoVisiblePillars((count) => Math.max(count - 1, 1));
      setTimeout(() => { isTransitioning.current = false; }, 350);
      return;
    }
    if (dir > 0 && current === QUESTION_IDX && !questionAnswered) return;
    const next = current + dir;
    if (next < 0 || next >= SLIDE_TOTAL) return;
    isTransitioning.current = true;
    setAnimDir(dir > 0 ? 'next' : 'prev');
    if (next === 2) {
      setEscopoVisiblePillars(dir > 0 ? 1 : PROPOSTA_DATA.escopo.pilares.length);
    }
    setCurrent(next);
    setTimeout(() => { isTransitioning.current = false; }, 800);
  }, [current, escopoVisiblePillars, questionAnswered]);

  const isNextBlocked = current === QUESTION_IDX && !questionAnswered;

  return (
    <div ref={wrapperRef} className="relative overflow-hidden bg-white" style={{ height: '100svh' }}>

      {/* Slide content */}
      <div
        key={current}
        ref={slideScrollRef}
        data-lenis-prevent
        onScroll={checkScroll}
        className={`absolute inset-0 overflow-y-auto pb-20 md:pb-16 ${animDir === 'next' ? 'slide-from-right' : 'slide-from-left'}`}
      >
        {current === 0 && <Contexto showDesejado={false} />}
        {current === 1 && <Contexto showDesejado={true} />}
        {current === 2 && <Escopo visiblePillars={escopoVisiblePillars} />}
        {current === 3 && <Entregaveis />}
        {current === 4 && <Resultados />}
        {current === 5 && <Cronograma />}
        {current === 6 && (
          <PropostaQuestion
            noLock
            onAnswer={() => setQuestionAnswered(true)}
          />
        )}
        {current === 7 && <Investimento />}
      </div>

      {/* Scroll gradient hint */}
      <div
        className="absolute bottom-14 md:bottom-16 left-0 right-0 h-16 pointer-events-none z-10 transition-opacity duration-300"
        style={{ opacity: hasMoreBelow ? 1 : 0, background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* Navigation: arrows + dots */}
      <div className="absolute bottom-2 md:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <button
          onClick={() => navigate(-1)}
          disabled={current === 0}
          aria-label="Slide anterior"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-black/15 bg-white/85 backdrop-blur-sm flex items-center justify-center transition-all duration-150 disabled:opacity-25 hover:border-black/30 active:scale-[0.97]"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="#181412" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: SLIDE_TOTAL }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '16px' : '5px',
                height: '5px',
                backgroundColor: i === current ? '#FE6942' : 'rgba(0,0,0,0.14)',
              }}
            />
          ))}
        </div>

        <button
          onClick={() => navigate(1)}
          disabled={isNextBlocked}
          aria-label="Próximo slide"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-150 disabled:opacity-25 active:scale-[0.97]"
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

// ── PÁGINA PRINCIPAL ──────────────────────────────────────────────────────────
export default function PropostaLacqua() {
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

      <PropostaSlideshow />
    </div>
  );
}
