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

// ── DADOS DA PROPOSTA — EIKE ──────────────────────────────────────────────────
const PROPOSTA_DATA = {
  cliente: 'Eike',
  empresa: 'Cantos do Mundo',
  data: 'Maio 2026',

  contextoA: {
    pontos: [
      'Produto técnico sofisticado — dashboard, indicador TradingView e análise com IA — sem nome, sem marca, sem identidade',
      'Mercado de trading lotado de grupos no Telegram com aparência de golpe: um produto sério sendo confundido com mais uma plataforma duvidosa',
      'Entrada nos mercados americano e europeu sem posicionamento diferenciado e sem a identidade visual que esse público exige',
      'Comunidade crescendo no Twitter/X sem narrativa de marca para sustentar o crescimento orgânico e a retenção',
      'Interface do produto sendo construída sem uma identidade de marca definida — decisões visuais tomadas sem base estratégica',
      'Nome provisório, sem arquitetura de marca: o produto, a empresa e os módulos precisam de uma linguagem única e coesa',
    ],
  },

  contextoB: {
    pontos: [
      'Marca com nome, identidade visual e verbal que inspire credibilidade imediata no mercado de trading internacional',
      'Posicionamento que distancia o produto da percepção de plataformas duvidosas e o eleva a ferramenta profissional para traders sérios',
      'Identidade coesa aplicada ao dashboard, ao site e à comunicação — produto que parece tão bom quanto é',
      'Narrativa de marca clara para alimentar a comunidade no Twitter/X, atrair assinantes e sustentar o crescimento orgânico',
      'Naming e arquitetura de marca — empresa, produto e módulos — com uma lógica única que facilita a expansão e o reconhecimento',
      'Base estratégica sólida para a captação de investimento e a escala da operação nos EUA e Europa',
    ],
  },

  escopo: {
    entrega: 'BrandSprint',
    pilares: [
      {
        label: 'Pilar 1',
        titulo: 'A Fundação: Diagnóstico e Pesquisa',
        descricao: 'Entendemos o jogo antes de ir a campo. Mergulhamos no produto, no mercado de trading internacional e no público que vai assinar.',
        itens: [
          {
            titulo: 'Imersão Estratégica',
            descricao: 'Mapeamento completo do produto, modelo de negócio, diferenciais técnicos e ambições de crescimento nos mercados americano e europeu.',
          },
          {
            titulo: 'Pesquisa de Mercado Internacional',
            descricao: 'Como as principais ferramentas de trading se posicionam, onde estão os padrões repetidos e quais brechas existem para uma marca credível ocupar.',
          },
          {
            titulo: 'Mapeamento de Público',
            descricao: 'Definição de quem é o trader que vai assinar: necessidades, dores, nível de sofisticação e o que faz ele confiar ou desconfiar de uma ferramenta.',
          },
        ],
      },
      {
        label: 'Pilar 2',
        titulo: 'Estratégia de Posicionamento e Marca',
        descricao: 'Construímos o lugar único que essa marca vai ocupar — diferente das plataformas duvidosas, reconhecida como referência por traders profissionais.',
        itens: [
          {
            titulo: 'Posicionamento e Diferenciação',
            descricao: 'Proposta única de valor, diferenciais estratégicos e o território de marca que a empresa vai ocupar no mercado internacional de trading.',
          },
          {
            titulo: 'Personalidade da Marca',
            descricao: 'Propósito, valores, crenças e arquétipos que sustentam a conexão com traders sérios e justificam a escolha por essa plataforma.',
          },
          {
            titulo: 'Conceito e Narrativa',
            descricao: 'Criação do conceito central e da narrativa que unifica toda a comunicação da marca — do Twitter/X ao produto, da landing page ao pitch de investimento.',
          },
        ],
      },
      {
        label: 'Pilar 3',
        titulo: 'A Efetivação',
        descricao: 'O plano prático para efetivar a estratégia da marca nos canais onde os traders internacionais vivem.',
        itens: [
          {
            titulo: 'Estratégia de Canais',
            descricao: 'Como a marca deve se portar no Twitter/X, no produto, no site e em outros pontos de contato para ser vista, lembrada e assinada.',
          },
          {
            titulo: 'Estratégia de Conteúdo',
            descricao: 'Principais formatos, tópicos e linhas de comunicação para construir autoridade no nicho e crescer a base de assinantes organicamente.',
          },
          {
            titulo: 'Guia de Estratégia de Posicionamento',
            descricao: 'Documento completo com toda a fundação estratégica — o mapa que orienta cada decisão de comunicação, produto e crescimento.',
          },
        ],
      },
    ],
  },

  identidade: {
    intro: 'Com a estratégia definida, construímos a identidade completa da marca — o nome, o visual e a linguagem que vão fazer esse produto ser reconhecido como referência.',
    pilares: [
      {
        numero: '01',
        titulo: 'Arquitetura de Naming',
        descricao: 'Nome para a marca e para os produtos. O nome é a base de tudo: impacta o logo, a identidade visual, a comunicação e o que o mercado vai lembrar.',
        itens: [
          'Nome da marca e verificação de disponibilidade internacional',
          'Nomes dos produtos e módulos da plataforma',
          'Lógica e arquitetura de nomenclatura para escala',
        ],
      },
      {
        numero: '02',
        titulo: 'Identidade Visual',
        descricao: 'Uma identidade visual que transmite credibilidade e sofisticação para o mercado de trading internacional — e que orienta como o produto deve se parecer.',
        itens: [
          'Logo e sistema de marca',
          'Paleta de cores, tipografia e elementos visuais',
          'Direcionamento de identidade para a interface do produto',
        ],
      },
      {
        numero: '03',
        titulo: 'Identidade Verbal',
        descricao: 'Tom de voz, linguagem e mensagens-chave em português e inglês para que a marca comunique com precisão nos mercados americano e europeu.',
        itens: [
          'Tom de voz e personalidade verbal da marca',
          'Mensagens-chave para comunicação no Twitter/X e no produto',
          'Diretrizes de comunicação em inglês',
        ],
      },
    ],
  },

  resultados: [
    'Marca com nome e identidade visual que inspire credibilidade imediata em traders americanos e europeus',
    'Posicionamento que diferencia o produto da percepção de plataformas duvidosas de trading',
    'Narrativa de marca clara para sustentar a comunidade no Twitter/X e atrair assinantes',
    'Dashboard e interface com identidade coesa que eleva a percepção de valor do produto',
    'Arquitetura de naming — empresa, produto e módulos — com lógica única para escala',
    'Base estratégica e de identidade para captação de investimento e expansão nos EUA e Europa',
    'Time alinhado com um guia estratégico e de identidade que orienta cada decisão de comunicação e produto',
  ],

  cronograma: [
    { etapa: '01', nome: 'Imersão', duracao: 'Semana 1', descricao: 'Diagnóstico do produto, negócio, público e mercado de trading internacional' },
    { etapa: '02', nome: 'Pesquisa', duracao: 'Semana 1', descricao: 'Análise de concorrentes internacionais e mapeamento de oportunidades de posicionamento' },
    { etapa: '03', nome: 'Estratégia', duracao: 'Semana 2', descricao: 'Posicionamento, conceito e narrativa de marca' },
    { etapa: '04', nome: 'Identidade', duracao: 'Semanas 3–4', descricao: 'Naming, identidade visual e identidade verbal' },
    { etapa: '05', nome: 'Entrega', duracao: '—', descricao: 'Guia completo de estratégia e identidade' },
  ],

  investimento: {
    itens: [
      {
        numero: '01',
        nome: 'Estratégia de Posicionamento e Marca',
        descricao: 'Diagnóstico, pesquisa de mercado internacional, posicionamento, conceito, narrativa, personalidade, estratégia de canais e conteúdo. Entrega do Guia completo.',
        valor: 'R$5.000',
      },
      {
        numero: '02',
        nome: 'Arquitetura de Naming',
        descricao: 'Nome da marca, nomes dos produtos e módulos, verificação de disponibilidade internacional e lógica de nomenclatura para escala.',
        valor: 'R$1.500',
      },
      {
        numero: '03',
        nome: 'Identidade de Marca',
        descricao: 'Logo e sistema visual, paleta, tipografia, direcionamento de interface, tom de voz, mensagens-chave e diretrizes de comunicação em inglês.',
        valor: 'R$3.500',
      },
    ],
    total: 'R$10.000',
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
            O projeto da{' '}
            <span className="text-[#FE6942]">{PROPOSTA_DATA.empresa}</span>
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
              Estratégia de Posicionamento e Marca
            </h2>
          </div>
          <div className="lg:justify-self-end lg:pt-9">
            <p className="font-halyard font-light text-[#181412] text-[18px] md:text-[22px] leading-[1.55] max-w-[620px] lg:text-right">
              Primeiro entendemos o mercado de trading internacional e o público. Depois construímos um posicionamento inevitável. Por fim, desenhamos como a marca se efetiva nos canais certos.
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

// ── SEÇÃO: IDENTIDADE DE MARCA ────────────────────────────────────────────────
function IdentidadeSlide() {
  const sectionRef = useRef(null);
  const id = PROPOSTA_DATA.identidade;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.identidade-block', {
        opacity: 0, y: 22, stagger: 0.07, duration: 0.72, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 py-10 md:py-12 lg:py-14 min-h-full flex flex-col justify-center">
      <div className="max-w-[1440px] mx-auto w-full">

        <div className="identidade-block grid grid-cols-1 lg:grid-cols-[minmax(620px,0.95fr)_1fr] gap-8 lg:gap-14 mb-8 md:mb-10 items-start">
          <div>
            <span className="font-halyard text-[13px] tracking-[0.24em] uppercase text-[#FE6942] font-semibold block mb-4">
              Identidade de Marca
            </span>
            <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.5rem,3.5vw,3.35rem)] leading-[1.02] tracking-tight max-w-none">
              Nome, Visual e Verbal
            </h2>
          </div>
          <div className="lg:justify-self-end lg:pt-9">
            <p className="font-halyard font-light text-[#181412] text-[18px] md:text-[22px] leading-[1.55] max-w-[620px] lg:text-right">
              {id.intro}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {id.pilares.map((pilar) => (
            <article
              key={pilar.numero}
              className="identidade-block bg-[#F8F8F8] rounded-lg px-5 md:px-6 py-6 border border-black/[0.08] flex flex-col"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="w-11 h-11 rounded-full flex items-center justify-center bg-[#FE6942] text-white font-halyard text-[15px] font-semibold shrink-0">
                  {pilar.numero}
                </span>
                <h3 className="font-halyard font-medium text-[#181412] text-[21px] md:text-[23px] leading-[1.1]">
                  {pilar.titulo}
                </h3>
              </div>

              <p className="font-halyard font-light text-black text-[17px] md:text-[19px] leading-[1.55] mb-4">
                {pilar.descricao}
              </p>

              <div className="mt-auto space-y-3 pt-4 border-t border-black/[0.08]">
                {pilar.itens.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-[#FE6942] text-[18px] leading-[1.55] shrink-0 select-none mt-px">→</span>
                    <span className="font-halyard font-light text-black text-[17px] md:text-[18px] leading-[1.52]">{item}</span>
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
      <div className="max-w-[1240px] mx-auto">
        <div className="entregavel-block text-center mb-12 md:mb-16">
          <span className="font-halyard text-[15px] md:text-[17px] tracking-[0.24em] uppercase text-[#FE6942] font-semibold block mb-4">
            Entregáveis
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.6rem,4.2vw,4.4rem)] leading-[0.98] tracking-tight">
            O que você recebe
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start justify-items-center">
          {/* Guia de Estratégia */}
          <div className="entregavel-block w-full max-w-[520px]">
            <div className="lg:h-[320px] flex items-end justify-center">
              <img
                src="/images/guia-de-estrategia.png"
                alt="Guia de Estratégia de Posicionamento e Marca"
                className="w-full max-w-[310px] lg:max-w-[350px] mx-auto"
              />
            </div>

            <div className="mt-5 max-w-[520px]">
              <h3 className="font-halyard font-medium text-[#181412] text-[24px] md:text-[29px] leading-[1.12]">
                Guia de Estratégia de
                <br />
                Posicionamento e Marca
              </h3>
              <p className="mt-4 font-halyard font-light text-[#181412] text-[17px] md:text-[20px] leading-[1.3] max-w-[500px]">
                Documento completo com a fundação estratégica e o caminho para se tornar referência no mercado de trading internacional
              </p>

              <div className="mt-5">
                <p className="font-halyard font-light text-[#181412] text-[17px] md:text-[19px] leading-[1.3] mb-2">
                  Também inclui:
                </p>
                <ul className="space-y-1.5">
                  {['Estratégia de Canais', 'Estratégia de Conteúdo'].map((item) => (
                    <li key={item} className="flex items-center gap-3 font-halyard font-medium text-[#181412] text-[17px] md:text-[20px] leading-[1.25]">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-[#FE6942] shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Identidade de Marca */}
          <div className="entregavel-block w-full max-w-[520px]">
            <div className="lg:h-[320px] flex items-end justify-center">
              <div className="w-full max-w-[360px] mx-auto space-y-3">
                {[
                  { label: 'Naming', desc: 'Nome da marca + arquitetura de produtos', icon: 'Aa' },
                  { label: 'Identidade Visual', desc: 'Logo, sistema visual, direcionamento de UI', icon: '◈' },
                  { label: 'Identidade Verbal', desc: 'Tom de voz, mensagens-chave, inglês', icon: '≡' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 bg-[#F8F8F8] rounded-2xl px-5 py-4 border border-black/[0.08]">
                    <div className="w-11 h-11 rounded-xl bg-[#FE6942]/10 flex items-center justify-center shrink-0">
                      <span className="font-halyard font-semibold text-[#FE6942] text-[17px]">{item.icon}</span>
                    </div>
                    <div>
                      <div className="font-halyard font-medium text-[#181412] text-[17px] leading-[1.2]">{item.label}</div>
                      <div className="font-halyard font-light text-[#181412]/55 text-[14px] leading-[1.4]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 max-w-[520px]">
              <h3 className="font-halyard font-medium text-[#181412] text-[24px] md:text-[29px] leading-[1.12]">
                Identidade de Marca
                <br />
                Completa
              </h3>
              <p className="mt-4 font-halyard font-light text-[#181412] text-[17px] md:text-[20px] leading-[1.3] max-w-[520px]">
                Naming com arquitetura completa, identidade visual aplicável ao produto e ao site, e identidade verbal em português e inglês
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
          <span className="font-halyard text-[15px] md:text-[17px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
            Objetivos do projeto
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
            O que queremos atingir com esse projeto para a {PROPOSTA_DATA.empresa}
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
            Prazo de 4 semanas para entrega completa da estratégia e identidade de marca.
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden md:block relative">
          <div className="absolute top-[36px] left-0 right-0 h-px bg-black/10" />
          <div ref={lineRef} className="absolute top-[36px] left-0 right-0 h-px bg-[#FE6942] origin-left" />

          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${PROPOSTA_DATA.cronograma.length}, 1fr)` }}
          >
            {PROPOSTA_DATA.cronograma.map((step, i) => (
              <div key={i} className="crono-step flex flex-col items-center text-center px-4">
                <div className="w-[72px] h-[72px] rounded-full border-2 border-[#FE6942] bg-white flex items-center justify-center mb-6 relative z-10">
                  <span className="font-halyard font-medium text-[#FE6942] text-[1.55rem]">{step.etapa}</span>
                </div>
                <span className="font-halyard font-medium text-[#181412] text-[21px] mb-1">{step.nome}</span>
                {step.duracao && step.duracao !== '—' && (
                  <span className="font-halyard font-light text-[#FE6942] text-[14px] tracking-[0.12em] uppercase mb-2">{step.duracao}</span>
                )}
                <p className="font-halyard font-light text-black text-[18px] leading-[1.5]">{step.descricao}</p>
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
                <span className="font-halyard font-medium text-[#181412] text-[21px] block mb-0.5">{step.nome}</span>
                {step.duracao && step.duracao !== '—' && (
                  <span className="font-halyard font-light text-[#FE6942] text-[13px] tracking-[0.1em] uppercase block mb-1">{step.duracao}</span>
                )}
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
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 55%, rgba(254,105,66,0.05) 0%, transparent 65%)' }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="font-halyard text-[15px] md:text-[17px] tracking-[0.28em] uppercase text-[#FE6942]/70 font-medium mb-8">
          Antes de continuar
        </span>
        <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] tracking-tight max-w-[820px] mb-16">
          Essa estratégia e identidade resolve o cenário atual e coloca a {PROPOSTA_DATA.empresa} no mapa internacional?
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

  const inv = PROPOSTA_DATA.investimento;

  return (
    <section ref={sectionRef} className="bg-white pt-16 pb-28 md:pt-20 md:pb-28 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-10 md:mb-12 inv-block">
          <h2 className="font-halyard font-medium text-[#181412] text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.05] tracking-tight">
            Investimento
          </h2>
        </div>

        {inv.itens.map((item) => (
          <div
            key={item.numero}
            className="inv-block bg-[#F8F8F8] rounded-[24px] px-8 md:px-12 py-10 border border-black/[0.08] flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mb-5 transition-shadow duration-500 hover:shadow-lg"
          >
            <span className="font-editorial font-normal text-[#FE6942]/25 text-[4rem] md:text-[5rem] leading-none shrink-0 select-none">
              {item.numero}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-halyard font-medium text-[#181412] text-[1.75rem] md:text-[2.25rem] leading-[1.1] mb-3">
                {item.nome}
              </h3>
              <p className="font-halyard font-normal text-[#181412] text-[18px] md:text-[20px] leading-[1.45] max-w-[52ch]">
                {item.descricao}
              </p>
            </div>
            <div className="shrink-0 md:text-right">
              <div className="font-halyard font-medium text-gradient text-[2.5rem] md:text-[3.25rem] leading-[1]">
                {item.valor}
              </div>
            </div>
          </div>
        ))}

        {/* Total */}
        <div className="inv-block bg-[#181412] rounded-[24px] px-8 md:px-12 py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-16 mb-5">
          <div className="flex-1">
            <span className="font-halyard font-medium text-white/50 text-[15px] tracking-[0.18em] uppercase block mb-1">
              Total do projeto
            </span>
            <span className="font-halyard font-light text-white/70 text-[18px] leading-[1.4]">
              Estratégia de marca + Naming + Identidade visual e verbal
            </span>
          </div>
          <div className="shrink-0 md:text-right">
            <div className="font-halyard font-medium text-gradient text-[2.5rem] md:text-[3.75rem] leading-[1]">
              {inv.total}
            </div>
          </div>
        </div>

        <div className="inv-block bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-7 border border-black/[0.08]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-5">
            {[
              ['Validade da proposta', '5 dias corridos'],
              ['Disponibilidade de início', 'Imediata'],
              ['Prazo de entrega', '4 semanas'],
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
            Para garantir qualidade na entrega, trabalhamos com um número limitado de projetos simultâneos. A confirmação nesta reunião já permite reservarmos a agenda e iniciarmos o planejamento.
          </p>
        </div>

        <div className="inv-block mt-5 bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-8 border border-black/[0.08] flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="flex-1">
            <h4 className="font-halyard font-medium text-[#181412] text-[15px] tracking-[0.12em] uppercase mb-5">
              Formas de pagamento
            </h4>
            <ul className="space-y-3.5">
              {['Pagamento 50% no início e 50% após 30 dias', 'Pagamento à vista com condição especial de 10%'].map((f) => (
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
// 0: Contexto A | 1: Contexto A→B | 2: Escopo (progressive) | 3: Identidade
// 4: Entregáveis | 5: Resultados | 6: Cronograma | 7: PropostaQuestion | 8: Investimento

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
        {current === 3 && <IdentidadeSlide />}
        {current === 4 && <Entregaveis />}
        {current === 5 && <Resultados />}
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
          disabled={current === SLIDE_TOTAL - 1}
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
