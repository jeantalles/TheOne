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

// ── DADOS DA PROPOSTA — EIKE / CARLOS / GABRIEL ───────────────────────────────
const PROPOSTA_DATA = {
  cliente: 'Eike',
  empresa: 'TheOne',
  data: 'Maio 2026',

  contextoA: {
    pontos: [
      'Produto real e robusto: dashboard de insights de trading, indicador TradingView e análise via IA. Sem nome, sem marca e sem identidade.',
      'Visual inexistente: qualquer lançamento agora coloca o produto na mesma prateleira dos grupos de Telegram e salas de sinais genéricas',
      'Público com alta desconfiança do que é novo no mercado financeiro. A percepção de risco precisa ser eliminada antes do clique.',
      'Mercado-alvo internacional (USD), onde a barra de credibilidade e legitimidade é ainda mais alta do que no Brasil',
      '6 meses de desenvolvimento sem capitalização. O produto existe, mas ainda não existe para o mercado.',
    ],
  },

  contextoB: {
    pontos: [
      'Nome registrável em inglês que soa como plataforma séria, não como mais um sinal de Telegram',
      'Posicionamento que ocupa um território único: solução completa de inteligência de mercado, acima dos indicadores avulsos e abaixo do advisory financeiro premium',
      'Identidade visual que transmite credibilidade tecnológica e precisão, diferente de tudo que existe no nicho hoje',
      'Comunicação calibrada para cada perfil de trader, eliminando objeções antes do free trial',
      'Base de marca pronta para o time executar o site e a plataforma com diferenciação e consistência',
    ],
  },

  escopo: {
    entrega: 'BrandSprint Internacional',
    pilares: [
      {
        label: 'Pilar 1',
        titulo: 'A Fundação: Diagnóstico e Pesquisa',
        descricao: 'Antes de nomear ou desenhar qualquer coisa, a gente entende o produto, o mercado e quem vai comprar.',
        itens: [
          {
            titulo: 'Imersão Estratégica',
            descricao: 'Mapeamento do produto, roadmap, diferenciais técnicos, visão dos founders e objetivos de lançamento no mercado USD.',
          },
          {
            titulo: 'Pesquisa de Mercado Internacional',
            descricao: 'Como os competidores se posicionam no mercado de dashboards, indicadores pagos e salas de sinais, e quais brechas de posicionamento existem para ocupar.',
          },
          {
            titulo: 'Mapeamento Profundo de Público',
            descricao: 'Perfis de trader (iniciante, intermediário e avançado) com dores, motivações, objeções e linguagem de cada um. Base para toda comunicação.',
          },
        ],
      },
      {
        label: 'Pilar 2',
        titulo: 'Estratégia de Posicionamento e Marca',
        descricao: 'Com o diagnóstico em mãos, construímos o território único que a marca vai ocupar no mercado internacional.',
        itens: [
          {
            titulo: 'Posicionamento e Diferenciação',
            descricao: 'Definição da proposta única de valor e do território que a marca vai ocupar: acima dos grupos de sinais, abaixo do advisory financeiro premium.',
          },
          {
            titulo: 'Personalidade e Narrativa',
            descricao: 'Propósito, valores, crenças, arquétipos e o conceito central que vai sustentar toda a comunicação e construir confiança no mercado.',
          },
          {
            titulo: 'Estratégia de Canais',
            descricao: 'Como a marca deve se portar no Twitter/X, Instagram, landing page e criativos de ads para o mercado USD. Inclui postura em relação a disclaimers e credibilidade.',
          },
        ],
      },
      {
        label: 'Pilar 3',
        titulo: 'Naming',
        descricao: 'O nome é a base de tudo: impacta a identidade visual, o logo, a comunicação e a percepção de valor. Não saímos daqui sem um nome sólido.',
        itens: [
          {
            titulo: 'Arquitetura de Marca',
            descricao: 'Definição de como a marca, a plataforma e os produtos se relacionam: empresa, dashboard e indicador com nomes que funcionam juntos.',
          },
          {
            titulo: 'Criação de Nome da Marca',
            descricao: 'Nome registrável, funcional em inglês e com potencial de se tornar referência no mercado. Não apenas descritivo, mas proprietário.',
          },
          {
            titulo: 'Naming dos Produtos',
            descricao: 'Nomes para o dashboard e o indicador que reforçam o posicionamento e diferenciam o produto da concorrência genérica.',
          },
        ],
      },
      {
        label: 'Pilar 4',
        titulo: 'Identidade Visual e Verbal',
        descricao: 'Como a marca fala e como ela é visualmente. A base que o time vai usar para construir o site e rodar os criativos.',
        itens: [
          {
            titulo: 'Identidade Verbal',
            descricao: 'Tom de voz, linguagem por perfil de trader e diretrizes de comunicação. Inclui como tratar disclaimers de forma que construa credibilidade em vez de afastar.',
          },
          {
            titulo: 'Identidade Visual',
            descricao: 'Logo, paleta de cores, tipografia e sistema visual base. Tudo que a equipe precisa para executar o site e os criativos com consistência.',
          },
          {
            titulo: 'Briefing de Execução',
            descricao: 'Documento de briefing da marca para o time executar o site: o que comunicar, como se posicionar em cada seção, linguagem e direcionamento visual.',
          },
        ],
      },
    ],
    bonus: {
      titulo: 'Agent',
      descricao: 'Agente de IA especialista no produto e na marca, treinado com toda a estratégia de posicionamento para gerar copy de criativos, roteiros de conteúdo para Twitter/X e Instagram, e apoiar decisões de comunicação no dia a dia.',
    },
  },

  resultados: [
    'Uma marca e uma percepção de valor que a concorrência não tem porque nunca parou para construir isso.',
    'Posicionamento que sai da prateleira dos produtos mal desenvolvidos e ocupa um território único no mercado nacional e internacional',
    'Lançar os produtos no mercado com alta percepção de solidez e qualidade, além de não parecer mais um produto de IA de vibecoding',
    'Nome forte e internacional, registrável, que soa como plataforma séria. Nada de produto genérico de trading.',
    'Identidade visual que transmite credibilidade, segurança e elimina a percepção de risco do produto',
    'Comunicação alinhada com os diferentes perfis de trader, com linguagem que converte em cada segmento',
    'Base de marca pronta para o time executar o site e a plataforma com diferenciação e consistência',
  ],

  cronograma: [
    { etapa: '01', nome: 'Diagnóstico', descricao: 'Diagnóstico do produto, pesquisa de mercado e mapeamento de público' },
    { etapa: '02', nome: 'Estratégia', descricao: 'Posicionamento, narrativa e personalidade da marca' },
    { etapa: '03', nome: 'Naming', descricao: 'Arquitetura de marca e criação dos nomes' },
    { etapa: '04', nome: 'Identidade', descricao: 'Identidade visual, verbal e briefing de execução do site' },
    { etapa: '05', nome: 'Entrega', descricao: 'Guia completo de marca e briefing para o time' },
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
            O projeto de Eike, Carlos e Gabriel
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
function Escopo({ visiblePillars = 4 }) {
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
              BrandSprint
            </h2>
            <p className="font-halyard font-light text-[#181412]/60 text-[clamp(1.15rem,1.65vw,1.45rem)] leading-[1.3] mt-2">
              Estratégia · Naming · Identidade Visual e Verbal
            </p>
          </div>
          <div className="lg:justify-self-end lg:pt-9">
            <p className="font-halyard font-light text-[#181412] text-[18px] md:text-[22px] leading-[1.55] max-w-[620px] lg:text-right">
              Quatro pilares construídos em sequência: primeiro entendemos o terreno, depois definimos o posicionamento, criamos o nome e entregamos a identidade completa para o time executar.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
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
                  <h3 className="font-halyard font-medium text-[#181412] text-[19px] md:text-[21px] leading-[1.1]">
                    {pilar.titulo}
                  </h3>
                </div>
              </div>

              <p className="font-halyard font-light text-[#181412] text-[17px] md:text-[18px] leading-[1.55] mb-4">
                {pilar.descricao}
              </p>

              <div className="mt-auto divide-y divide-black/[0.08]">
                {pilar.itens.map((item) => (
                  <div key={item.titulo} className="py-3.5 first:pt-0 last:pb-0">
                    <h4 className="font-halyard font-medium text-[#181412] text-[17px] md:text-[18px] leading-[1.25] mb-1.5">
                      {item.titulo}
                    </h4>
                    <p className="font-halyard font-light text-[#181412] text-[16px] md:text-[17px] leading-[1.45]">
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

// ── SEÇÃO: CASA DA MARCA ─────────────────────────────────────────────────────
function FoundationHouse() {
  return (
    <section className="bg-white h-full flex items-center justify-center px-2 md:px-6 lg:px-10 py-6">
      <svg
        viewBox="0 0 1440 810"
        fill="none"
        className="w-full max-w-[1380px]"
        role="img"
        aria-label="Arquitetura de marca BrandSprint Internacional"
      >
        <defs>
          <linearGradient id="foundationRoof" x1="720" y1="54" x2="720" y2="382" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#DADDE0" />
            <stop offset="1" stopColor="#ECEEEF" />
          </linearGradient>
          <linearGradient id="foundationWall" x1="720" y1="388" x2="720" y2="655" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FBFBFB" />
            <stop offset="1" stopColor="#F2F3F3" />
          </linearGradient>
          <linearGradient id="foundationBase" x1="370" y1="655" x2="1070" y2="765" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1D1F20" />
            <stop offset="1" stopColor="#0A0A0A" />
          </linearGradient>
          <filter id="foundationShadow" x="300" y="635" width="840" height="170" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#181412" floodOpacity="0.18" />
          </filter>
        </defs>

        <ellipse cx="720" cy="777" rx="355" ry="24" fill="#181412" opacity="0.08" />

        <polygon points="720,54 354,382 1086,382" fill="url(#foundationRoof)" />
        <rect x="372" y="388" width="696" height="267" fill="url(#foundationWall)" />
        <rect x="372" y="388" width="46" height="267" fill="#DDE0E2" />
        <rect x="1022" y="388" width="46" height="267" fill="#DDE0E2" />
        <rect x="372" y="382" width="696" height="8" fill="white" opacity="0.92" />

        <rect x="370" y="635" width="700" height="130" rx="5" fill="url(#foundationBase)" filter="url(#foundationShadow)" />

        <path d="M694 176C694 168.82 699.82 163 707 163H733C740.18 163 746 168.82 746 176V195C746 202.18 740.18 208 733 208H718L700 222V208H707C699.82 208 694 202.18 694 195V176Z" stroke="#FE6942" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="710" cy="186" r="3" fill="#FE6942" />
        <circle cx="720" cy="186" r="3" fill="#FE6942" />
        <circle cx="730" cy="186" r="3" fill="#FE6942" />

        <text x="720" y="270" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="22" fontWeight="700" fill="#181412">
          PONTOS DE CONTATO
        </text>
        <text x="720" y="304" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="18" fontWeight="400" fill="#181412" fillOpacity="0.68">
          (TWITTER/X, INSTAGRAM,
        </text>
        <text x="720" y="332" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="18" fontWeight="400" fill="#181412" fillOpacity="0.68">
          LANDING PAGE, ADS)
        </text>

        <path d="M720 462C699 462 682 481 682 481C682 481 699 500 720 500C741 500 758 481 758 481C758 481 741 462 720 462Z" stroke="#FE6942" strokeWidth="3.5" strokeLinejoin="round" />
        <circle cx="720" cy="481" r="10" stroke="#FE6942" strokeWidth="3.5" />

        <text x="720" y="548" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="22" fontWeight="700" fill="#181412">
          IDENTIDADE VISUAL,
        </text>
        <text x="720" y="580" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="22" fontWeight="700" fill="#181412">
          NARRATIVA E COMUNICAÇÃO
        </text>

        <text x="720" y="715" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="26" fontWeight="400" fill="white" fillOpacity="0.9">
          Estratégia de posicionamento e marca
        </text>

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
  const agentName = `TheOne ${PROPOSTA_DATA.escopo.bonus.titulo}`;
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

        {/* Heading */}
        <div className="entregavel-block text-center mb-12 md:mb-16">
          <span className="font-halyard text-[13px] md:text-[14px] tracking-[0.24em] uppercase text-[#FE6942] font-semibold block mb-4">
            Entregáveis
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.7rem,4.3vw,4.9rem)] leading-[0.98] tracking-tight">
            O que você recebe
          </h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-7">

          {/* Card 1 — Estratégia */}
          <div className={`${cardClass} flex flex-col md:flex-row min-h-[480px] md:min-h-[560px]`}>
            <div className="flex-1 px-8 md:px-14 pt-12 md:pt-16 pb-8 md:pb-16 flex flex-col justify-between">
              <h3 className="font-halyard font-medium text-[#050505] text-[32px] md:text-[40px] leading-[1.08]">
                Estratégia de<br />
                Posicionamento e<br />
                Marca + Guia
              </h3>
              <div>
                <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[19px] leading-[1.35] max-w-[360px] mb-6">
                  Um documento com mais de 80 slides com a fundação estratégica e caminho para sua marca se tornar TheOne
                </p>
                <p className="font-halyard font-normal text-[#181412] text-[15px] md:text-[16px] mb-2.5">Também inclui:</p>
                <ul className="space-y-1.5">
                  <ArrowItem>Estratégia de Canais</ArrowItem>
                  <ArrowItem>Estratégia de Produção de Conteúdo</ArrowItem>
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

          {/* Card 2 — Naming */}
          <div className={`${cardClass} flex flex-col md:flex-row min-h-[460px] md:min-h-[500px]`}>
            <div className="flex-1 px-8 md:px-14 pt-12 md:pt-16 pb-8 md:pb-16 flex flex-col justify-between">
              <h3 className="font-halyard font-medium text-[#050505] text-[32px] md:text-[40px] leading-[1.08]">
                Naming
              </h3>
              <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[19px] leading-[1.35] max-w-[340px]">
                Exploramos diferentes territórios de nomes, sonoridade e escrita até chegar a uma opção que traduza com clareza a estratégia da marca, se diferencie dos concorrentes e se conecte com o público.
              </p>
            </div>
            <div className="hidden md:flex shrink-0 items-center justify-center px-8 md:px-10 pb-10 md:pb-0 overflow-hidden">
              <img
                src="/images/eike-naming.png"
                alt="Apresentação de Naming"
                className="w-[360px] md:w-[520px] lg:w-[620px] object-contain"
              />
            </div>
          </div>

          {/* Card 3 — Identidade Visual (bg image) */}
          <div
            className="entregavel-block rounded-[30px] md:rounded-[34px] overflow-hidden relative min-h-[460px] md:min-h-[500px] bg-[#F4F4F5] bg-cover bg-[54%_center] md:bg-center"
            style={{ backgroundImage: 'url(/images/eike-identidade-bg.jpg)' }}
          >
            <div className="relative z-10 px-8 md:px-16 pt-12 md:pt-20 pb-10 md:pb-16 max-w-[390px]">
              <h3 className="font-halyard font-medium text-[#050505] text-[31px] md:text-[38px] leading-[1.08] mb-24 md:mb-28">
                Identidade<br />
                de Marca +<br />
                Guia
              </h3>
              <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[19px] leading-[1.35] max-w-[330px]">
                A partir do conceito central, desenvolvemos uma identidade que comunica a essência da marca e garante reconhecimento, coerência e diferenciação em todos os pontos de contato.
              </p>
            </div>
          </div>

          {/* Card 4 — Bônus TheOne Agent */}
          <div className={`${cardClass} min-h-[460px] md:min-h-[500px] flex flex-col md:block`}>
            <div className="relative z-10 px-8 md:px-16 pt-10 md:pt-14 pb-8 md:pb-14 max-w-[445px]">
              <span className="font-halyard font-semibold text-[#FE6942] text-[13px] tracking-[0.24em] uppercase mb-3 block">Bônus:</span>
              <h3 className="font-halyard font-medium text-[#050505] text-[31px] md:text-[38px] leading-[1.08] mb-24 md:mb-28">
                {agentName}
              </h3>
              <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[19px] leading-[1.35] max-w-[370px]">
                Agente de IA especialista no seu negócio, treinado com toda sua estratégia de marca e posicionamento para otimizar apresentações, gerar ideias de conteúdo focadas no seu público, analisar pitchs de vendas no dia a dia e muito mais.
              </p>
            </div>
            <div className="relative md:absolute md:right-8 lg:right-10 md:top-20 lg:top-[72px] z-0 px-6 md:px-0 pb-8 md:pb-0">
              <div className="relative w-full md:w-[540px] lg:w-[585px] rounded-[26px] border border-black/10 bg-[#F8F8F8] shadow-[0_18px_45px_rgba(0,0,0,0.08)] overflow-hidden aspect-[1.72]">
                <div className="h-8 px-4 flex items-center justify-between border-b border-black/08 bg-white/65 font-halyard text-[9px] text-[#181412]/50">
                  <span>Gemini</span>
                  <span>TheOne | Estrategista de marca</span>
                  <span className="rounded-full bg-[#BDE8FF] px-1.5 py-0.5 text-[#181412]/60">Fazer upgrade</span>
                </div>
                <div className="absolute inset-x-0 top-12 bottom-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-10 h-10 rounded-full bg-[#C978F3]/80 text-white flex items-center justify-center font-halyard font-medium text-[15px] mb-4">T</div>
                  <p className="font-halyard font-medium text-[#181412] text-[14px] mb-4">TheOne | Estrategista de marca</p>
                  <div className="space-y-1.5 text-left font-halyard text-[10px] text-[#181412]/50">
                    <p>Recentes</p>
                    <p><span className="text-[#C978F3]">■</span> Roteiro de vídeo de pré-lançamento TheOne</p>
                    <p><span className="text-[#C978F3]">■</span> Estratégia de conteúdo pré-lançamento TheOne</p>
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
            Prazo estimado de 4 semanas para a entrega completa do projeto.
          </p>
        </div>

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
                <p className="font-halyard font-light text-black text-[18px] leading-[1.5]">{step.descricao}</p>
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

// ── SEÇÃO: PERGUNTA INTERATIVA ────────────────────────────────────────────────
function PropostaQuestion() {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="h-full bg-white flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 55%, rgba(254,105,66,0.05) 0%, transparent 65%)' }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="font-halyard text-[15px] md:text-[17px] tracking-[0.28em] uppercase text-[#FE6942]/70 font-medium mb-8">
          Antes de continuar
        </span>
        <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] tracking-tight max-w-[820px] mb-16">
          Esta solução resolve<br />o que precisa ser resolvido<br />para vocês lançarem?
        </h2>
      </div>
    </section>
  );
}

// ── SEÇÃO: INVESTIMENTO ───────────────────────────────────────────────────────
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

        <div className="inv-block bg-[#F8F8F8] rounded-[24px] px-8 md:px-12 py-10 border border-black/[0.08] flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mb-5 transition-shadow duration-500 hover:shadow-lg">
          <span className="font-editorial font-normal text-[#FE6942]/25 text-[4rem] md:text-[5rem] leading-none shrink-0 select-none">
            01
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-halyard font-medium text-[#181412] text-[1.75rem] md:text-[2.25rem] leading-[1.1] mb-3">
              Estratégia de Posicionamento e Marca
            </h3>
            <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[20px] leading-[1.45] max-w-[52ch]">
              Diagnóstico, pesquisa de mercado internacional, mapeamento de público, posicionamento, narrativa e personalidade da marca.
            </p>
          </div>
          <div className="shrink-0 md:text-right">
            <div className="font-halyard font-medium text-gradient text-[1.75rem] md:text-[2.25rem] leading-[1]">
              R$5.000
            </div>
          </div>
        </div>

        <div className="inv-block bg-[#F8F8F8] rounded-[24px] px-8 md:px-12 py-10 border border-black/[0.08] flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mb-5 transition-shadow duration-500 hover:shadow-lg">
          <span className="font-editorial font-normal text-[#FE6942]/25 text-[4rem] md:text-[5rem] leading-none shrink-0 select-none">
            02
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-halyard font-medium text-[#181412] text-[1.75rem] md:text-[2.25rem] leading-[1.1] mb-3">
              Naming
            </h3>
            <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[20px] leading-[1.45] max-w-[52ch]">
              Arquitetura de marca, criação do nome da empresa e dos produtos, validação de registro.
            </p>
          </div>
          <div className="shrink-0 md:text-right">
            <div className="font-halyard font-medium text-gradient text-[1.75rem] md:text-[2.25rem] leading-[1]">
              R$2.500
            </div>
          </div>
        </div>

        <div className="inv-block bg-[#F8F8F8] rounded-[24px] px-8 md:px-12 py-10 border border-black/[0.08] flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mb-5 transition-shadow duration-500 hover:shadow-lg">
          <span className="font-editorial font-normal text-[#FE6942]/25 text-[4rem] md:text-[5rem] leading-none shrink-0 select-none">
            03
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-halyard font-medium text-[#181412] text-[1.75rem] md:text-[2.25rem] leading-[1.1] mb-3">
              Identidade Visual e Verbal
            </h3>
            <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[20px] leading-[1.45] max-w-[52ch]">
              Criação de um sistema visual sólido e diferente (logo, paleta, tipografia, elementos), identidade verbal e direcionamento visual do site e da plataforma.
            </p>
          </div>
          <div className="shrink-0 md:text-right">
            <div className="font-halyard font-medium text-gradient text-[1.75rem] md:text-[2.25rem] leading-[1]">
              R$4.000
            </div>
          </div>
        </div>

        <div className="inv-block rounded-[24px] px-8 md:px-12 py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-16 mb-5" style={{ background: 'linear-gradient(135deg, #FED1C5 0%, #FF5224 100%)' }}>
          <span className="font-halyard font-semibold text-white text-[16px] tracking-[0.15em] uppercase shrink-0">
            Total do projeto
          </span>
          <div className="flex-1" />
          <div className="font-halyard font-medium text-white text-[1.75rem] md:text-[2.5rem] leading-[1]">
            R$11.500
          </div>
        </div>

        <div className="inv-block bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-12 border border-black/[0.08] mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-5">
            {[
              ['Validade da proposta', '5 dias corridos'],
              ['Disponibilidade de início', 'Semana de 12/05'],
              ['Vagas disponíveis para maio', '1'],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="font-halyard text-[12px] tracking-[0.18em] uppercase text-[#FE6942] mb-1.5">
                  {label}
                </div>
                <div className="font-halyard font-medium text-[20px] md:text-[22px] leading-[1.15] text-[#181412]">
                  {value}
                </div>
              </div>
            ))}
          </div>
          <p className="font-halyard font-light text-[18px] md:text-[19px] leading-[1.45] text-[#181412]/80">
            Para garantir qualidade e foco total na entrega, trabalhamos com um número limitado de projetos simultâneos. A confirmação nesta reunião já garante a vaga e permite iniciarmos o planejamento imediatamente.
          </p>
        </div>

        <div className="inv-block mt-5 bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-12 border border-black/[0.08] flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex-1">
            <h4 className="font-halyard font-medium text-[#181412] text-[15px] tracking-[0.12em] uppercase mb-5">
              Formas de pagamento
            </h4>
            <ul className="space-y-3.5">
              {['Pagamento 50% no início e 50% na entrega', 'Pagamento à vista com condição especial de 10%'].map((f) => (
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

      </div>
    </section>
  );
}

// ── SLIDESHOW DAS SEÇÕES DA PROPOSTA ─────────────────────────────────────────
const SLIDE_TOTAL = 9;

function PropostaSlideshow() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState('next');
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
    const next = current + dir;
    if (next < 0 || next >= SLIDE_TOTAL) return;
    isTransitioning.current = true;
    setAnimDir(dir > 0 ? 'next' : 'prev');
    if (next === 2) {
      setEscopoVisiblePillars(dir > 0 ? 1 : PROPOSTA_DATA.escopo.pilares.length);
    }
    setCurrent(next);
    setTimeout(() => { isTransitioning.current = false; }, 800);
  }, [current, escopoVisiblePillars]);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden bg-white" style={{ height: '100svh' }}>

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
        {current === 3 && <FoundationHouse />}
        {current === 4 && <Resultados />}
        {current === 5 && <Entregaveis />}
        {current === 6 && <Cronograma />}
        {current === 7 && <PropostaQuestion />}
        {current === 8 && <Investimento />}
      </div>

      <div
        className="absolute bottom-14 md:bottom-16 left-0 right-0 h-16 pointer-events-none z-10 transition-opacity duration-300"
        style={{ opacity: hasMoreBelow ? 1 : 0, background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)' }}
        aria-hidden="true"
      />

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

// ── PÁGINA PRINCIPAL ──────────────────────────────────────────────────────────
export default function PropostaEike() {
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
            <>Olá, Eike, Carlos e Gabriel</>,
            <>Sejam bem-vindos à <span style={{ color: '#FE6942' }}>TheOne</span></>,
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
