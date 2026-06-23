import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import foundationImg from '../assets/products/foundation.jpeg';
import myBrandingImg from '../assets/products/mybranding.jpeg';
import siteBrandExpImg from '../assets/products/site-brand-experience.jpeg';
import CasePageTemplate from './cases/CasePageTemplate';
import { caseStudies } from '../content/cases';
import HeroSection from './1-Hero';
import StorytellingSection from './3-Storytelling';
import NomeClienteSlide from './NomeClienteSlide';
import ContextoEditavel from './ContextoEditavel';
import { useProposalState } from '../hooks/useProposalState';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { id: 'estrategia', label: 'Estratégia de Marca',   price: 4000, prazo: '3 semanas' },
  { id: 'entrevistas', label: 'Entrevistas com Clientes', price: 2000, prazo: '1 semana' },
  { id: 'naming',     label: 'Naming',                 price: 2000, prazo: '2 semanas' },
  { id: 'identidade', label: 'Identidade de Marca',   price: 4000, prazo: '4 semanas' },
  { id: 'mybranding', label: 'myBranding',            price: 4000, prazo: '4 semanas' },
  { id: 'sitebrand',  label: 'Site BrandExperience',  price: 5000, prazo: '6 semanas' },
];

// 0: Capa | 1: NomeCliente | 2: Contexto A | 3: Contexto B | 4: Dores | 5: SobreTheOne | 6: Jean | 7: Zenic | 8: Thunders | 9: Camilla | 10: TheOne Foundation | 11: Casa da Marca | 12: Estratégia | 13: Naming | 14: Identidade | 15: myBranding | 16: SiteBrandExperience | 17: TheOne Agent | 18: Cronograma | 19: Calculadora | 20: Consultoria
const SLIDE_TOTAL = 21;

const DARK_SLIDES = [0, 1, 6, 7, 8, 9, 10, 17];

const formatBRL = (v) => `R$ ${v.toLocaleString('pt-BR')}`;



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

      <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: '-100px' }}>
        <h1
          className="font-editorial"
          style={{ fontWeight: 400, fontSize: 'clamp(2rem,4.5vw,5rem)', lineHeight: 1.05, letterSpacing: '-.03em', color: '#fff', marginBottom: '32px' }}
        >
          Bem-vindo à TheOne
        </h1>

        <div style={{ width: '48px', height: '2px', background: 'linear-gradient(90deg,#FE6942,#FF5224)', borderRadius: '2px', margin: '0 auto 28px' }} />

        <p
          className="font-halyard"
          style={{ fontWeight: 300, fontSize: 'clamp(1.1rem,1.8vw,1.45rem)', color: 'rgba(255,255,255,.45)', letterSpacing: '.08em', textTransform: 'uppercase' }}
        >
          Construindo um posicionamento inevitável
        </p>
      </div>
    </section>
  );
}

// ── SLIDE 1: DORES ────────────────────────────────────────────────────────────
function Dores() {
  const sectionRef = useRef(null);

  const dores = [
    {
      titulo: 'Dependência de tráfego pago',
      descricao: 'Quando o anúncio para, as vendas param. Você paga para aparecer, mas não consegue ser escolhido de forma consistente.',
    },
    {
      titulo: 'Comparação por preço',
      descricao: 'Sem diferenciação clara, o cliente compara só pelo preço, e você é forçado a competir com quem cobra menos, mesmo sendo melhor.',
    },
    {
      titulo: 'Ticket médio baixo',
      descricao: 'O mercado não enxerga o real valor do que você entrega. A percepção de valor baixa força descontos que corroem sua margem.',
    },
    {
      titulo: 'Marca que não gera desejo',
      descricao: 'Sua empresa existe, mas não é lembrada. Sem identidade forte, você vive na invisibilidade enquanto concorrentes se destacam.',
    },
    {
      titulo: 'Marca comoditizada',
      descricao: 'Quando você se posiciona pelo produto ou serviço que vende, igual a todos os concorrentes, não constrói diferenciação real e não cria conexão com o público.',
    },
    {
      titulo: 'Crescimento sem base sólida',
      descricao: 'Escalar sem posicionamento claro é construir em areia movediça. Quanto mais cresce, mais difícil é manter consistência e atrair os clientes certos.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dore-item', {
        opacity: 0, y: 32, stagger: 0.09, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-12 md:mb-14">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold block mb-4">
            Diagnóstico
          </span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.5rem,4vw,3.75rem)] leading-[1.02] tracking-tight">
            O que impede marcas como a sua de crescerem
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {dores.map((dore, i) => (
            <div key={i} className="dore-item bg-[#F8F8F8] rounded-2xl px-8 py-7 border border-black/[0.07] flex items-center gap-8">
              <div className="w-12 h-12 shrink-0 rounded-full bg-[#FE6942]/10 flex items-center justify-center">
                <span className="font-halyard font-semibold text-[#FE6942] text-[16px]">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="min-w-0">
                <h3 className="font-halyard font-semibold text-[#181412] text-[22px] md:text-[24px] leading-[1.2]">
                  {dore.titulo}
                </h3>
                <p className="font-halyard font-light text-[#181412] text-[18px] md:text-[20px] leading-[1.5] mt-1.5">
                  {dore.descricao}
                </p>
              </div>
            </div>
          ))}

          <div className="dore-item bg-[#0a0a0a] rounded-2xl px-10 py-10 flex flex-col">
            <p className="font-editorial font-normal text-white text-[28px] md:text-[32px] leading-[1.2] tracking-tight mb-4">
              A raiz de tudo isso é uma marca sem fundação estratégica.
            </p>
            <p className="font-halyard font-light text-white/65 text-[19px] md:text-[20px] leading-[1.5]">
              Não é sobre logo ou cores. É sobre o que você representa no mercado, e por que alguém deveria te escolher.
            </p>
          </div>
        </div>
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
    <section ref={sectionRef} className="bg-white pt-16 md:pt-20 pb-28 md:pb-36 px-6 md:px-12 lg:px-16">
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

// ── SLIDE: THEONE FOUNDATION ──────────────────────────────────────────────────
function TheOneFoundation() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tf-item', {
        opacity: 0, y: 28, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const bullets = [
    'Construa uma marca sólida',
    'Se diferencie',
    'Gere mais valor, eleve seu ticket',
    'Otimize sua comunicação',
    'Reduza custos de mídia paga',
    'Mais alcance e engajamento na produção de conteúdo',
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#212121] px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center" style={{ minHeight: '100svh' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '-100px', right: '-80px',
          width: '700px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(254,105,66,.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div className="max-w-[1400px] mx-auto w-full relative z-10">

        <div className="tf-item mb-6">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold">Produto Principal</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_560px] xl:grid-cols-[1fr_600px] gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="tf-item font-editorial font-normal text-white text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-tight mb-6">
              TheOne<br />Foundation
            </h2>
            <p className="tf-item font-halyard font-light text-white/60 text-[22px] md:text-[25px] leading-[1.45] max-w-[52ch] mb-8">
              Receba diagnóstico de mercado, estratégia de marca e posicionamento, narrativa, identidade visual e um agente de IA especializado no posicionamento, comunicação e produção de conteúdo da sua marca.
            </p>

            {/* Bullets em 2 colunas logo abaixo da descrição */}
            <div className="tf-item">
              <p className="font-halyard font-semibold text-[#FE6942] text-[13px] tracking-[0.22em] uppercase mb-6">O que você conquista</p>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-5">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-3.5">
                    <span className="w-2 h-2 rounded-full bg-[#FE6942] shrink-0" />
                    <span className="font-halyard font-light text-white/70 text-[20px] md:text-[22px] leading-[1.4]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Imagem */}
          <div className="tf-item relative rounded-[28px] overflow-hidden border border-white/[0.07] bg-[#141414] shadow-2xl" style={{ minHeight: '320px' }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,105,66,0.1)_0%,transparent_60%)] mix-blend-screen z-10" />
            <img
              src={foundationImg}
              alt="TheOne Foundation"
              className="w-full h-full object-cover opacity-80"
              style={{ minHeight: '320px' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

// ── SLIDE 4: ESTRATÉGIA DE MARCA ──────────────────────────────────────────────
function EstrategiaDeMarca() {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState({});
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
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto">

        <div className="est-item mb-6">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold">Pilar 01 · TheOne Foundation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start mb-10 md:mb-12">
          <div>
            <h2 className="est-item font-editorial font-normal text-[#181412] text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-tight mb-3">
              Estratégia<br />de Marca
            </h2>
            <div className="est-item font-halyard font-medium text-[#FE6942] text-[1.5rem] md:text-[1.75rem] leading-[1] mb-10">
              R$ 4.000
            </div>
            <p className="est-item font-halyard font-light text-[#181412] text-[22px] md:text-[25px] leading-[1.45] max-w-[38ch]">
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
                <span className="w-12 h-12 rounded-full flex items-center justify-center bg-[#FE6942] text-white font-halyard text-[16px] font-semibold shrink-0">
                  {pilar.num}
                </span>
                <h3 className="font-halyard font-medium text-[#181412] text-[21px] md:text-[23px] leading-[1.1] flex-1">{pilar.titulo}</h3>
                <svg
                  className="shrink-0 transition-transform duration-300"
                  style={{ transform: expanded[pilar.num] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  width="20" height="20" viewBox="0 0 20 20" fill="none"
                >
                  <path d="M5 7.5l5 5 5-5" stroke="#181412" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <p className="font-halyard font-normal text-[#181412] text-[17px] md:text-[18px] leading-[1.6] mb-4">{pilar.descricao}</p>
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
                        <h4 className="font-halyard font-semibold text-[#181412] text-[16px] md:text-[17px] leading-[1.25] mb-2">{item.titulo}</h4>
                        <p className="font-halyard font-normal text-[#181412] text-[15px] md:text-[16px] leading-[1.55]">{item.descricao}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="est-item bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]">
            <h3 className="font-halyard font-semibold text-[#181412] text-[16px] tracking-[0.12em] uppercase mb-6">O que resolve</h3>
            <ul className="space-y-5">
              {[
                'Marca sem posicionamento que compete só por preço',
                'Comunicação genérica que não conecta com o público',
                'Dependência de tráfego pago para gerar vendas',
                'Dificuldade de cobrar mais pelo que entrega',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#FE6942] text-[20px] leading-[1.5] shrink-0">→</span>
                  <span className="font-halyard font-light text-[#181412] text-[19px] md:text-[20px] leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="est-item bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]">
            <h3 className="font-halyard font-semibold text-[#181412] text-[16px] tracking-[0.12em] uppercase mb-6">O que você recebe</h3>
            <ul className="space-y-4">
              {[
                'Imersão estratégica com os fundadores do negócio',
                'Pesquisa de mercado e análise competitiva',
                'Mapeamento de público e personas',
                'Posicionamento e proposta única de valor',
                'Personalidade, propósito e arquétipos de marca',
                'Narrativa central e conceito de comunicação',
                'Estratégia de Canais',
                'Estratégia de Conteúdo',
                'Guia de Estratégia de Posicionamento e Marca',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                  <span className="font-halyard font-light text-[#181412] text-[19px] md:text-[20px] leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── SLIDE 3: NAMING ───────────────────────────────────────────────────────────
function Naming() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nam-item', {
        opacity: 0, y: 24, stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto">

        <div className="nam-item mb-6">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold">Pilar 02 · TheOne Foundation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start mb-10 md:mb-12">
          <div>
            <h2 className="nam-item font-editorial font-normal text-[#181412] text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-tight mb-3">
              Naming
            </h2>
            <div className="nam-item font-halyard font-medium text-[#FE6942] text-[1.5rem] md:text-[1.75rem] leading-[1] mb-10">
              R$ 2.000
            </div>
            <p className="nam-item font-halyard font-light text-[#181412] text-[22px] md:text-[25px] leading-[1.45] max-w-[38ch]">
              Criamos o nome que sua marca merece: estratégico, memorável e protegível. Um nome que carrega posicionamento, gera desejo e abre portas antes do primeiro contato.
            </p>
          </div>
          <div className="nam-item hidden lg:flex items-center justify-center bg-[#EFEFEF] rounded-[20px] p-6">
            <img
              src="/images/eike-naming.png"
              alt="Apresentação de Naming"
              className="w-full object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="nam-item bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]">
            <h3 className="font-halyard font-semibold text-[#181412] text-[16px] tracking-[0.12em] uppercase mb-6">O que resolve</h3>
            <ul className="space-y-4">
              {[
                'Nome genérico que não diferencia nem é lembrado',
                'Marca que confunde com concorrentes ou soa amadora',
                'Nome difícil de pesquisar, lembrar ou indicar',
                'Falta de alinhamento entre nome, posicionamento e público',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#FE6942] text-[20px] leading-[1.5] shrink-0">→</span>
                  <span className="font-halyard font-light text-[#181412] text-[19px] md:text-[20px] leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="nam-item bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]">
            <h3 className="font-halyard font-semibold text-[#181412] text-[16px] tracking-[0.12em] uppercase mb-6">O que você recebe</h3>
            <ul className="space-y-3">
              {[
                'Pesquisa de mercado e análise semântica',
                'Geração criativa de opções de nome',
                'Análise de disponibilidade e proteção (INPI)',
                'Avaliação estratégica de cada opção',
                'Apresentação das alternativas com racional',
                'Refinamento e entrega do nome escolhido',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                  <span className="font-halyard font-light text-[#181412] text-[19px] md:text-[20px] leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── SLIDE 4: IDENTIDADE VISUAL ────────────────────────────────────────────────
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
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto">

        <div className="id-item mb-6">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold">Pilar 03 · TheOne Foundation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start mb-10 md:mb-12">
          <div>
            <h2 className="id-item font-editorial font-normal text-[#181412] text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-tight mb-3">
              Identidade<br />de Marca
            </h2>
            <div className="id-item font-halyard font-medium text-[#FE6942] text-[1.5rem] md:text-[1.75rem] leading-[1] mb-10">
              R$ 4.000
            </div>
            <p className="id-item font-halyard font-light text-[#181412] text-[22px] md:text-[25px] leading-[1.45] max-w-[38ch]">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="id-item bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]">
            <h3 className="font-halyard font-semibold text-[#181412] text-[16px] tracking-[0.12em] uppercase mb-6">O que resolve</h3>
            <ul className="space-y-4">
              {[
                'Visual genérico que parece igual a todo mundo no mercado',
                'Marca que não transmite o valor real do negócio',
                'Identidade inconsistente que confunde o público',
                'Logo feito na pressa que não representa quem você é',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#FE6942] text-[20px] leading-[1.5] shrink-0">→</span>
                  <span className="font-halyard font-light text-[#181412] text-[19px] md:text-[20px] leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="id-item bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]">
            <h3 className="font-halyard font-semibold text-[#181412] text-[16px] tracking-[0.12em] uppercase mb-6">O que você recebe</h3>
            <ul className="space-y-4">
              {[
                'Logo e sistema de marca completo',
                'Paleta de cores e tipografia estratégica',
                'Padrões e elementos gráficos exclusivos',
                'Aplicações em redes sociais e materiais',
                'Manual de identidade visual',
                'Arquivos finais em todos os formatos',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                  <span className="font-halyard font-light text-[#181412] text-[19px] md:text-[20px] leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── SLIDE 5: MYBRANDING ───────────────────────────────────────────────────────
function MyBranding() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mb-item', {
        opacity: 0, y: 24, stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-item mb-6">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold">Produto · myBranding</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start mb-10 md:mb-12">
          <div>
            <h2 className="mb-item font-editorial font-normal text-[#181412] text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-tight mb-3">
              myBranding
            </h2>
            <div className="mb-item font-halyard font-medium text-[#FE6942] text-[1.5rem] md:text-[1.75rem] leading-[1] mb-10">
              R$ 4.000
            </div>
            <p className="mb-item font-halyard font-light text-[#181412] text-[22px] md:text-[25px] leading-[1.45] max-w-[38ch]">
              Você é seu maior ativo. O myBranding transforma quem você é em uma marca usando a metodologia BeOne para posicioná-lo como referência única no seu mercado.
            </p>
          </div>
          <div className="mb-item hidden lg:block rounded-[24px] overflow-hidden" style={{ height: '400px' }}>
            <img
              src={myBrandingImg}
              alt="myBranding"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="mb-item bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]">
            <h3 className="font-halyard font-semibold text-[#181412] text-[16px] tracking-[0.12em] uppercase mb-5">Para quem é</h3>
            <p className="font-halyard font-normal text-[#181412] text-[19px] md:text-[21px] leading-[1.5] mb-5">
              Fundadores, experts ou líderes que querem crescer usando sua própria autoridade e influência como canal de aquisição.
            </p>
            <ul className="space-y-4">
              {[
                'Reconhecido no mercado, mas sem monetizar isso',
                'Quer atrair clientes sem depender só do negócio',
                'Sua história e visão são diferenciais competitivos reais',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#FE6942] text-[20px] leading-[1.5] shrink-0">→</span>
                  <span className="font-halyard font-light text-[#181412] text-[19px] md:text-[20px] leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-item bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]">
            <h3 className="font-halyard font-semibold text-[#181412] text-[16px] tracking-[0.12em] uppercase mb-6">O que você recebe</h3>
            <ul className="space-y-4">
              {[
                'Diagnóstico e imersão pessoal (metodologia BeOne)',
                'Posicionamento de marca pessoal',
                'Narrativa de origem e visão de mundo',
                'Arquétipo e personalidade pública',
                'Estratégia de conteúdo e canais',
                'Guia de Marca Pessoal completo',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                  <span className="font-halyard font-light text-[#181412] text-[19px] md:text-[20px] leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── SLIDE 6: SITE BRAND EXPERIENCE ────────────────────────────────────────────
function SiteBrandExperience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sbe-item', {
        opacity: 0, y: 24, stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24">
      <div className="max-w-[1400px] mx-auto">

        <div className="sbe-item mb-6">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold">Produto · Site BrandExperience</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start mb-10 md:mb-12">
          <div>
            <h2 className="sbe-item font-editorial font-normal text-[#181412] text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-tight mb-3">
              Site BrandExperience
            </h2>
            <div className="sbe-item font-halyard font-medium text-[#FE6942] text-[1.5rem] md:text-[1.75rem] leading-[1] mb-10">
              R$ 5.000
            </div>
            <p className="sbe-item font-halyard font-light text-[#181412] text-[22px] md:text-[25px] leading-[1.45] max-w-[38ch]">
              Um site que é uma extensão do posicionamento da marca, e não um site institucional genérico. Desenvolvido em código com IA por brand designers que constroem uma experiência imersiva — fazendo seu cliente experienciar o universo da marca digitalmente e gerando impacto, conexão e memorização.
            </p>
          </div>
          <div className="sbe-item hidden lg:block rounded-[24px] overflow-hidden" style={{ height: '400px' }}>
            <img src={siteBrandExpImg} alt="Site BrandExperience" className="w-full h-full object-cover object-center" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="sbe-item bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]">
            <h3 className="font-halyard font-semibold text-[#181412] text-[16px] tracking-[0.12em] uppercase mb-5">Para quem é</h3>
            <p className="font-halyard font-normal text-[#181412] text-[19px] md:text-[21px] leading-[1.5]">
              Empresas de serviço e tecnologia que vendem valor intangível e precisam que o digital comunique isso com precisão.
            </p>
          </div>

          <div className="sbe-item bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]">
            <h3 className="font-halyard font-semibold text-[#181412] text-[16px] tracking-[0.12em] uppercase mb-6">O que você recebe</h3>
            <ul className="space-y-4">
              {[
                'Estratégia e arquitetura de informação',
                'Copy estratégico alinhado à marca',
                'Design de alta fidelidade com identidade visual',
                'Desenvolvimento responsivo em código',
                'Experiência imersiva com universo da marca',
                'Entrega com treinamento de gestão do site',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0" />
                  <span className="font-halyard font-light text-[#181412] text-[19px] md:text-[20px] leading-[1.55]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── SLIDE 8: THEONE AGENT ─────────────────────────────────────────────────────
function TheOneAgent() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.agent-item', {
        opacity: 0, y: 24, stagger: 0.09, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { titulo: 'Estrategista sempre disponível', descricao: 'Responde dúvidas sobre posicionamento, comunicação e estratégia com base no seu guia de marca.' },
    { titulo: 'Ideias de conteúdo no tom certo', descricao: 'Gera pautas, roteiros e ideias de conteúdo alinhadas com o seu público e arquétipo de marca.' },
    { titulo: 'Análise de pitchs e propostas', descricao: 'Avalia apresentações comerciais e sugere melhorias para aumentar conversão.' },
    { titulo: 'Treinado com sua marca', descricao: 'Alimentado com toda a sua estratégia de marca entregue pela TheOne, não é um agente genérico.' },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0a] px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24" style={{ minHeight: '100svh' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '-80px', right: '-60px',
          width: '600px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(254,105,66,.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      <div className="max-w-[1400px] mx-auto relative z-10">

        <div className="agent-item mb-6">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold">Bônus incluso</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-10 lg:gap-14 items-start">
          {/* Esquerda */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="agent-item font-editorial font-normal text-white text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-tight mb-4">
                TheOne Agent
              </h2>
              <div className="agent-item font-halyard font-medium text-white text-[1.5rem] md:text-[1.75rem] leading-[1]">
                Brinde
              </div>
            </div>
            <p className="agent-item font-halyard font-light text-white/60 text-[20px] md:text-[22px] leading-[1.45] max-w-[44ch]">
              Um agente de IA treinado com toda a sua estratégia de marca, exclusivo do seu negócio, disponível para usar a qualquer momento.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="agent-item bg-white/[0.05] border border-white/[0.08] rounded-2xl px-7 py-7">
                  <h3 className="font-halyard font-semibold text-white text-[19px] md:text-[21px] leading-[1.2] mb-3">{f.titulo}</h3>
                  <p className="font-halyard font-light text-white/55 text-[17px] md:text-[18px] leading-[1.55]">{f.descricao}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Direita: mockup Gemini */}
          <div className="agent-item hidden lg:flex flex-col justify-start pt-2">
            <div className="w-full rounded-[24px] border border-black/10 bg-[#F0F0F0] shadow-[0_18px_45px_rgba(0,0,0,0.12)] overflow-hidden">
              <div className="h-9 px-4 flex items-center justify-between border-b border-black/[0.08] bg-white/70 font-halyard text-[11px] text-[#181412]/50">
                <span>Gemini</span>
                <span>TheOne | Estrategista de marca</span>
                <span className="rounded-full bg-[#BDE8FF] px-2 py-0.5 text-[#181412]/60">Fazer upgrade</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center px-8 py-14">
                <div className="w-14 h-14 rounded-full bg-[#C978F3]/80 text-white flex items-center justify-center font-halyard font-medium text-[18px] mb-5">T</div>
                <p className="font-halyard font-medium text-[#181412] text-[16px] mb-6">TheOne | Estrategista de marca</p>
                <div className="space-y-2 text-left font-halyard text-[13px] text-[#181412]/50 w-full max-w-[300px]">
                  <p className="font-semibold text-[#181412]/40 mb-1">Recentes</p>
                  <p><span className="text-[#C978F3] mr-1.5">■</span> Roteiro de vídeo de pré-lançamento TheOne</p>
                  <p><span className="text-[#C978F3] mr-1.5">■</span> Estratégia de conteúdo pré-lançamento TheOne</p>
                  <p><span className="text-[#C978F3] mr-1.5">■</span> Análise de pitch — reunião com prospect</p>
                </div>
              </div>
              <div className="px-8 pb-8">
                <div className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-halyard text-[13px] text-[#181412]/40">
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

function ArrowItem({ children }) {
  return (
    <li className="flex items-center gap-3 font-halyard font-medium text-[#181412] text-[17px] md:text-[19px] leading-[1.25]">
      <svg className="w-5 h-5 text-[#FE6942] shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </li>
  );
}

const cardClass = 'relative overflow-hidden bg-[#F4F4F5] rounded-[28px] md:rounded-[32px]';

function CardEstrategia() {
  return (
    <div className={`${cardClass} flex flex-col md:flex-row min-h-[420px] md:min-h-[480px]`}>
      <div className="flex-1 px-8 md:px-14 pt-12 md:pt-16 pb-8 md:pb-16 flex flex-col justify-between">
        <h3 className="font-halyard font-medium text-[#050505] text-[28px] md:text-[36px] leading-[1.08]">
          Estratégia de<br />Posicionamento e<br />Marca + Guia
        </h3>
        <div>
          <p className="font-halyard font-light text-[#181412] text-[19px] md:text-[21px] leading-[1.45] max-w-[340px] mb-6">
            Um documento com mais de 80 slides com a fundação estratégica e caminho para sua marca se tornar TheOne
          </p>
          <p className="font-halyard font-light text-[#181412] text-[17px] mb-3">Também inclui:</p>
          <ul className="space-y-1.5">
            <ArrowItem>Estratégia de Canais</ArrowItem>
            <ArrowItem>Estratégia de Produção de Conteúdo</ArrowItem>
          </ul>
        </div>
      </div>
      <div className="hidden md:flex shrink-0 self-end items-end justify-end pr-10 pb-8">
        <img
          src="/images/guia-de-estrategia.png"
          alt="Guia de Estratégia de Posicionamento e Marca"
          className="w-[300px] md:w-[380px] lg:w-[460px] object-contain object-bottom"
        />
      </div>
    </div>
  );
}

function CardNaming() {
  return (
    <div className={`${cardClass} flex flex-col md:flex-row min-h-[380px] md:min-h-[420px]`}>
      <div className="flex-1 px-8 md:px-14 pt-12 md:pt-16 pb-8 md:pb-16 flex flex-col justify-between">
        <h3 className="font-halyard font-medium text-[#050505] text-[28px] md:text-[36px] leading-[1.08]">
          Naming
        </h3>
        <p className="font-halyard font-light text-[#181412] text-[17px] md:text-[18px] leading-[1.4] max-w-[320px]">
          Exploramos diferentes territórios de nomes, sonoridade e escrita até chegar a uma opção que traduza com clareza a estratégia da marca, se diferencie dos concorrentes e se conecte com o público.
        </p>
      </div>
      <div className="hidden md:flex shrink-0 items-center justify-center px-6 md:px-8 pb-10 md:pb-0 overflow-hidden">
        <img
          src="/images/eike-naming.png"
          alt="Apresentação de Naming"
          className="w-[300px] md:w-[440px] lg:w-[520px] object-contain"
        />
      </div>
    </div>
  );
}

function CardIdentidade() {
  return (
    <div
      className={`${cardClass} min-h-[380px] md:min-h-[420px] bg-cover bg-[54%_center] md:bg-center`}
      style={{ backgroundImage: 'url(/images/eike-identidade-bg.jpg)' }}
    >
      <div className="relative z-10 px-8 md:px-14 pt-12 md:pt-16 pb-10 md:pb-14 max-w-[380px]">
        <h3 className="font-halyard font-medium text-[#050505] text-[28px] md:text-[36px] leading-[1.08] mb-20 md:mb-24">
          Identidade<br />de Marca +<br />Guia
        </h3>
        <p className="font-halyard font-light text-[#181412] text-[17px] md:text-[18px] leading-[1.4] max-w-[300px]">
          A partir do conceito central, desenvolvemos uma identidade que comunica a essência da marca e garante reconhecimento, coerência e diferenciação em todos os pontos de contato.
        </p>
      </div>
    </div>
  );
}

function CardMyBranding() {
  return (
    <div className={`${cardClass} min-h-[380px] md:min-h-[420px] flex flex-col md:flex-row overflow-hidden`}>
      <div className="flex-1 px-8 md:px-14 pt-12 md:pt-16 pb-8 md:pb-16 flex flex-col justify-between">
        <h3 className="font-halyard font-medium text-[#050505] text-[28px] md:text-[36px] leading-[1.08]">
          myBranding
        </h3>
        <div>
          <p className="font-halyard font-light text-[#181412] text-[17px] md:text-[18px] leading-[1.4] max-w-[380px] mb-6">
            Você é seu maior ativo. O myBranding transforma quem você é em uma marca usando a metodologia BeOne para posicioná-lo como referência única no seu mercado.
          </p>
          <ul className="space-y-1.5">
            <ArrowItem>Posicionamento de marca pessoal</ArrowItem>
            <ArrowItem>Narrativa de origem e visão de mundo</ArrowItem>
            <ArrowItem>Guia de Marca Pessoal completo</ArrowItem>
          </ul>
        </div>
      </div>
      <div className="hidden md:block shrink-0 w-[360px] lg:w-[420px] overflow-hidden">
        <img
          src={myBrandingImg}
          alt="myBranding"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

function CardSiteBrand() {
  return (
    <div className={`${cardClass} min-h-[380px] md:min-h-[420px] flex flex-col md:flex-row overflow-hidden`}>
      <div className="flex-1 px-8 md:px-14 pt-12 md:pt-16 pb-8 md:pb-16 flex flex-col justify-between">
        <h3 className="font-halyard font-medium text-[#050505] text-[28px] md:text-[36px] leading-[1.08]">
          Site BrandExperience
        </h3>
        <div>
          <p className="font-halyard font-light text-[#181412] text-[17px] md:text-[18px] leading-[1.4] max-w-[340px] mb-6">
            Um site que é uma extensão do posicionamento da marca. Desenvolvido em código com IA por brand designers que constroem uma experiência imersiva, fazendo seu cliente experienciar o universo da marca digitalmente.
          </p>
          <ul className="space-y-1.5">
            <ArrowItem>Copy estratégico alinhado à marca</ArrowItem>
            <ArrowItem>Design de alta fidelidade com identidade visual</ArrowItem>
            <ArrowItem>Desenvolvimento responsivo em código</ArrowItem>
          </ul>
        </div>
      </div>
      <div className="hidden md:block shrink-0 w-[360px] lg:w-[420px] overflow-hidden">
        <img
          src={siteBrandExpImg}
          alt="Site BrandExperience"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

function CardTheOneAgent() {
  return (
    <div className={`${cardClass} min-h-[400px] md:min-h-[440px] flex flex-col md:block`}>
      <div className="relative z-10 px-8 md:px-14 pt-10 md:pt-14 pb-8 md:pb-14 max-w-[420px]">
        <span className="font-halyard font-semibold text-[#FE6942] text-[13px] tracking-[0.24em] uppercase mb-3 block">Bônus:</span>
        <h3 className="font-halyard font-medium text-[#050505] text-[28px] md:text-[36px] leading-[1.08] mb-16 md:mb-20">
          TheOne Agent
        </h3>
        <p className="font-halyard font-light text-[#181412] text-[17px] md:text-[18px] leading-[1.4] max-w-[340px]">
          Agente de IA especialista no seu negócio, treinado com toda sua estratégia de marca e posicionamento para otimizar apresentações, gerar ideias de conteúdo focadas no seu público, analisar pitchs de vendas no dia a dia e muito mais.
        </p>
      </div>
      <div className="relative md:absolute md:right-8 lg:right-10 md:top-16 lg:top-[60px] z-0 px-6 md:px-0 pb-8 md:pb-0">
        <div className="relative w-full md:w-[480px] lg:w-[530px] rounded-[24px] border border-black/10 bg-[#F8F8F8] shadow-[0_18px_45px_rgba(0,0,0,0.08)] overflow-hidden aspect-[1.72]">
          <div className="h-8 px-4 flex items-center justify-between border-b border-black/[0.08] bg-white/65 font-halyard text-[9px] text-[#181412]/50">
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
  );
}

// ── SLIDE 8: CALCULADORA ──────────────────────────────────────────────────────
function Calculadora({ clientName }) {
  const [selected, setSelected] = useState({
    estrategia: true,
    entrevistas: false,
    naming:     false,
    identidade: true,
    sitebrand:  false,
  });
  const [myBrandingQty, setMyBrandingQty] = useState(0);

  const total = SERVICES.reduce((sum, s) => {
    if (s.id === 'mybranding') return sum + (myBrandingQty * s.price);
    return selected[s.id] ? sum + s.price : sum;
  }, 0);
  const discountPct = total > 10000 ? 0.10 : 0.05;
  const discountLabel = total > 10000 ? '10%' : '5%';
  const totalDesconto = Math.round(total * (1 - discountPct));
  const metade = Math.round(total / 2);

  return (
    <section className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24">
      <div className="max-w-[1100px] mx-auto">

        <div className="mb-3">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold">Investimento</span>
        </div>

        <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.5rem,4vw,3.75rem)] leading-[1.02] tracking-tight mb-10 md:mb-12">
          Defina o seu projeto{clientName ? ` · ${clientName}` : ''}
        </h2>

        {/* Checklist de serviços */}
        <div className="space-y-6 mb-10 md:mb-14">

          {/* Grupo TheOne Foundation */}
          <div>
            <div className="flex items-center gap-3 mb-3 px-1">
              <span className="font-halyard font-semibold text-[14px] tracking-[0.20em] uppercase text-[#FE6942]">TheOne Foundation</span>
              <div className="flex-1 h-px bg-[#FE6942]/20" />
            </div>
            <div className="space-y-3">
              {SERVICES.filter(s => s.id !== 'mybranding' && s.id !== 'sitebrand').map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelected((prev) => ({ ...prev, [service.id]: !prev[service.id] }))}
                  className={`cursor-pointer rounded-2xl px-7 py-6 border transition-all duration-200 flex items-center justify-between gap-4 ${
                    selected[service.id]
                      ? 'border-[#FE6942] bg-[#FE6942]/[0.04]'
                      : 'border-black/[0.09] bg-[#F8F8F8] hover:border-black/20'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all duration-150"
                      style={{
                        borderColor: selected[service.id] ? '#FE6942' : 'rgba(0,0,0,0.2)',
                        background: selected[service.id] ? '#FE6942' : 'transparent',
                      }}
                    >
                      {selected[service.id] && (
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className={`font-halyard font-medium text-[18px] md:text-[20px] transition-colors duration-150 ${selected[service.id] ? 'text-[#181412]' : 'text-[#181412]/50'}`}>
                      {service.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-8 shrink-0">
                    <span className={`font-halyard font-medium text-[16px] md:text-[17px] transition-colors duration-150 ${selected[service.id] ? 'text-[#FE6942]' : 'text-[#181412]/30'}`}>
                      {service.prazo}
                    </span>
                    <span className={`font-halyard font-medium text-[18px] md:text-[20px] transition-colors duration-150 ${selected[service.id] ? 'text-[#181412]' : 'text-[#181412]/30'}`}>
                      {formatBRL(service.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grupo myBranding */}
          <div>
            <div className="flex items-center gap-3 mb-3 px-1">
              <span className="font-halyard font-semibold text-[12px] tracking-[0.22em] uppercase text-[#181412]/40">myBranding</span>
              <div className="flex-1 h-px bg-black/10" />
            </div>
            <div className="space-y-3">
              {SERVICES.filter(s => s.id === 'mybranding').map((service) => (
                <div
                  key={service.id}
                  className={`rounded-2xl px-7 py-6 border transition-all duration-200 flex items-center justify-between gap-4 ${
                    myBrandingQty > 0
                      ? 'border-[#FE6942] bg-[#FE6942]/[0.04]'
                      : 'border-black/[0.09] bg-[#F8F8F8] hover:border-black/20'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    {/* Contador de pessoas */}
                    <div className="flex items-center gap-0 bg-[#F0F0F0] border border-black/12 rounded-xl overflow-hidden">
                      <button
                        onClick={(e) => { e.stopPropagation(); setMyBrandingQty(prev => Math.max(0, prev - 1)); }}
                        className="w-10 h-10 flex items-center justify-center font-halyard font-semibold text-[20px] text-[#181412] hover:bg-black/10 transition-colors select-none"
                        aria-label="Diminuir quantidade"
                      >
                        −
                      </button>
                      <span className="font-halyard font-bold text-[17px] w-8 text-center text-[#181412] tabular-nums">
                        {myBrandingQty}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setMyBrandingQty(prev => prev + 1); }}
                        className="w-10 h-10 flex items-center justify-center font-halyard font-semibold text-[20px] text-[#181412] hover:bg-black/10 transition-colors select-none"
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                    <span className={`font-halyard font-medium text-[18px] md:text-[20px] transition-colors duration-150 ${myBrandingQty > 0 ? 'text-[#181412]' : 'text-[#181412]/50'}`}>
                      {service.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-8 shrink-0">
                    <span className={`font-halyard font-medium text-[16px] md:text-[17px] transition-colors duration-150 ${myBrandingQty > 0 ? 'text-[#FE6942]' : 'text-[#181412]/30'}`}>
                      {service.prazo}
                    </span>
                    <span className={`font-halyard font-medium text-[18px] md:text-[20px] transition-colors duration-150 ${myBrandingQty > 0 ? 'text-[#181412]' : 'text-[#181412]/30'}`}>
                      {myBrandingQty > 0 ? formatBRL(service.price * myBrandingQty) : formatBRL(service.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grupo Site BrandExperience */}
          <div>
            <div className="flex items-center gap-3 mb-3 px-1">
              <span className="font-halyard font-semibold text-[12px] tracking-[0.22em] uppercase text-[#181412]/40">Site BrandExperience</span>
              <div className="flex-1 h-px bg-black/10" />
            </div>
            <div className="space-y-3">
              {SERVICES.filter(s => s.id === 'sitebrand').map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelected((prev) => ({ ...prev, [service.id]: !prev[service.id] }))}
                  className={`cursor-pointer rounded-2xl px-7 py-6 border transition-all duration-200 flex items-center justify-between gap-4 ${
                    selected[service.id]
                      ? 'border-[#FE6942] bg-[#FE6942]/[0.04]'
                      : 'border-black/[0.09] bg-[#F8F8F8] hover:border-black/20'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div
                      className="w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-all duration-150"
                      style={{
                        borderColor: selected[service.id] ? '#FE6942' : 'rgba(0,0,0,0.2)',
                        background: selected[service.id] ? '#FE6942' : 'transparent',
                      }}
                    >
                      {selected[service.id] && (
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className={`font-halyard font-medium text-[18px] md:text-[20px] transition-colors duration-150 ${selected[service.id] ? 'text-[#181412]' : 'text-[#181412]/50'}`}>
                      {service.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-8 shrink-0">
                    <span className={`font-halyard font-medium text-[16px] md:text-[17px] transition-colors duration-150 ${selected[service.id] ? 'text-[#FE6942]' : 'text-[#181412]/30'}`}>
                      {service.prazo}
                    </span>
                    <span className={`font-halyard font-medium text-[18px] md:text-[20px] transition-colors duration-150 ${selected[service.id] ? 'text-[#181412]' : 'text-[#181412]/30'}`}>
                      {formatBRL(service.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>

        {/* Cards de entregáveis — aparecem abaixo dos checkboxes quando selecionados */}
        {(SERVICES.some(s => s.id !== 'mybranding' && selected[s.id]) || myBrandingQty > 0) && (
          <div className="flex flex-col gap-5 mb-10 md:mb-14">
            {selected.estrategia && <CardEstrategia />}
            {selected.entrevistas && (
              <div className="bg-[#F4F4F5] rounded-[28px] md:rounded-[32px] px-8 md:px-14 pt-12 md:pt-16 pb-10 md:pb-14">
                <h3 className="font-halyard font-medium text-[#050505] text-[28px] md:text-[36px] leading-[1.08] mb-6">
                  Entrevistas com Clientes
                </h3>
                <p className="font-halyard font-light text-[#181412] text-[17px] md:text-[18px] leading-[1.4] max-w-[380px]">
                  Pesquisa em profundidade diretamente com os clientes da marca para mapear dores, desejos e diferenciais percebidos.
                </p>
              </div>
            )}
            {selected.naming     && <CardNaming />}
            {selected.identidade && <CardIdentidade />}
            {myBrandingQty > 0   && <CardMyBranding />}
            {selected.sitebrand  && <CardSiteBrand />}
            <CardTheOneAgent />
          </div>
        )}

        {/* Painel de total + pagamento */}
        <div className="space-y-4">

          <div className={`grid gap-4 ${total > 0 ? 'grid-cols-2' : 'grid-cols-1'}`}>
            <div className="bg-[#F8F8F8] rounded-2xl px-7 py-7 border border-black/[0.07]">
              <div className="font-halyard font-medium text-[12px] tracking-[0.18em] uppercase text-[#181412]/80 mb-2">Total do projeto</div>
              <div className="font-halyard font-medium text-[#181412] text-[2.75rem] md:text-[3.25rem] leading-[1] mb-1 transition-all duration-300">
                {total === 0 ? 'R$ 0' : formatBRL(total)}
              </div>
              {total === 0 && (
                <div className="font-halyard font-light text-[#181412]/30 text-[14px]">Selecione os serviços acima</div>
              )}
            </div>

            {total > 0 && (
              <div className="bg-[#F8F8F8] rounded-2xl px-7 py-7 border border-black/[0.07]">
                <div className="font-halyard font-medium text-[12px] tracking-[0.18em] uppercase text-[#FE6942] mb-2">
                  À vista com {discountLabel} de desconto
                </div>
                <div className="font-halyard font-medium text-[#FE6942] text-[2.75rem] md:text-[3.25rem] leading-[1] mb-1 transition-all duration-300">
                  {formatBRL(totalDesconto)}
                </div>
                {total > 10000 && (
                  <div className="font-halyard font-light text-[12px] text-[#181412]/40 mt-1">
                    Desconto especial para projetos acima de R$ 10.000
                  </div>
                )}
              </div>
            )}
          </div>

          {total > 0 && (
            <div className="bg-[#F8F8F8] rounded-2xl px-7 py-6 border border-black/[0.07]">
              <div className="font-halyard font-semibold text-[#181412] text-[13px] tracking-[0.14em] uppercase mb-4">
                Condições de pagamento
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0 mt-2.5" />
                  <span className="font-halyard font-light text-[#181412] text-[18px] leading-[1.5]">
                    <span className="font-medium">50/50:</span> {formatBRL(metade)} no início + {formatBRL(total - metade)} após 30 dias
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0 mt-2.5" />
                  <span className="font-halyard font-light text-[#181412] text-[18px] leading-[1.5]">
                    <span className="font-medium">À vista:</span> {discountLabel} de desconto: {formatBRL(totalDesconto)}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FE6942] shrink-0 mt-2.5" />
                  <span className="font-halyard font-light text-[#181412] text-[18px] leading-[1.5]">
                    <span className="font-medium">Cartão:</span> em até 12x com taxa da operadora
                  </span>
                </li>
              </ul>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

// ── SLIDE 6: CASA DA MARCA ────────────────────────────────────────────────────
function CasaDaMarca() {
  return (
    <section className="bg-white h-full flex items-center justify-center px-2 md:px-6 lg:px-10 py-6">
      <svg
        viewBox="0 0 1440 810"
        fill="none"
        className="w-full max-w-[1380px]"
        role="img"
        aria-label="Arquitetura de marca TheOne"
      >
        <defs>
          <linearGradient id="padraoRoof" x1="720" y1="54" x2="720" y2="382" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#DADDE0" />
            <stop offset="1" stopColor="#ECEEEF" />
          </linearGradient>
          <linearGradient id="padraoWall" x1="720" y1="388" x2="720" y2="655" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FBFBFB" />
            <stop offset="1" stopColor="#F2F3F3" />
          </linearGradient>
          <linearGradient id="padraoBase" x1="370" y1="655" x2="1070" y2="765" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1D1F20" />
            <stop offset="1" stopColor="#0A0A0A" />
          </linearGradient>
          <filter id="padraoShadow" x="300" y="635" width="840" height="170" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#181412" floodOpacity="0.18" />
          </filter>
        </defs>

        <ellipse cx="720" cy="777" rx="355" ry="24" fill="#181412" opacity="0.08" />

        <polygon points="720,54 354,382 1086,382" fill="url(#padraoRoof)" />
        <rect x="372" y="388" width="696" height="267" fill="url(#padraoWall)" />
        <rect x="372" y="388" width="46" height="267" fill="#DDE0E2" />
        <rect x="1022" y="388" width="46" height="267" fill="#DDE0E2" />
        <rect x="372" y="382" width="696" height="8" fill="white" opacity="0.92" />

        <rect x="370" y="635" width="700" height="130" rx="5" fill="url(#padraoBase)" filter="url(#padraoShadow)" />

        <path d="M694 176C694 168.82 699.82 163 707 163H733C740.18 163 746 168.82 746 176V195C746 202.18 740.18 208 733 208H718L700 222V208H707C699.82 208 694 202.18 694 195V176Z" stroke="#FE6942" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="710" cy="186" r="3" fill="#FE6942" />
        <circle cx="720" cy="186" r="3" fill="#FE6942" />
        <circle cx="730" cy="186" r="3" fill="#FE6942" />

        <text x="720" y="270" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="22" fontWeight="700" fill="#181412">PONTOS DE CONTATO</text>
        <text x="720" y="304" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="18" fontWeight="400" fill="#181412" fillOpacity="0.68">Anúncio, Instagram, Vendas, PDV, Evento</text>

        <path d="M720 462C699 462 682 481 682 481C682 481 699 500 720 500C741 500 758 481 758 481C758 481 741 462 720 462Z" stroke="#FE6942" strokeWidth="3.5" strokeLinejoin="round" />
        <circle cx="720" cy="481" r="10" stroke="#FE6942" strokeWidth="3.5" />

        <text x="720" y="548" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="18" fontWeight="400" fill="#181412" fillOpacity="0.68">Narrativa, identidade visual,</text>
        <text x="720" y="576" textAnchor="middle" fontFamily="'Halyard Display',sans-serif" fontSize="18" fontWeight="400" fill="#181412" fillOpacity="0.68">identidade sensorial, arquitetura</text>

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

// ── SLIDE 7: CRONOGRAMA ───────────────────────────────────────────────────────
const CRONOGRAMA_STEPS = [
  { etapa: '01', nome: 'Imersão', descricao: 'Diagnóstico completo do negócio, mercado e público' },
  { etapa: '02', nome: 'Pesquisa', descricao: 'Análise de concorrência e oportunidades de posicionamento' },
  { etapa: '03', nome: 'Estratégia', descricao: 'Posicionamento, narrativa e identidade da marca' },
  { etapa: '04', nome: 'Criação', descricao: 'Desenvolvimento dos entregáveis do projeto' },
  { etapa: '05', nome: 'Entrega', descricao: 'Apresentação final, arquivos e orientação para implementação' },
  { etapa: '06', nome: 'Acompanhamento', descricao: 'Suporte contínuo para garantir a implementação da estratégia e evolução da marca' },
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
    <section ref={sectionRef} className="bg-white pt-24 pb-28 md:py-36 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        <div className="mb-32 md:mb-40 grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.55fr)] gap-8 lg:gap-16 items-end">
          <div>
            <span className="font-halyard text-[15px] md:text-[17px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
              Linha do Tempo
            </span>
            <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.2rem,3.5vw,3rem)] leading-[1.05] tracking-tight">
              Como trabalhamos
            </h2>
          </div>
          <p className="font-halyard font-light text-black text-[20px] md:text-[24px] leading-[1.45] max-w-[36ch] lg:justify-self-end lg:text-right">
            Prazo médio de 4 a 12 semanas, de acordo com os serviços contratados.
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

// ── SLIDE 9: CONSULTORIA ──────────────────────────────────────────────────────
function Consultoria() {
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

  const plans = [
    {
      label: 'Essencial',
      preco: '1.000',
      bullets: ['2 encontros mensais', 'Suporte via WhatsApp'],
      destaque: false,
    },
    {
      label: 'Premium',
      preco: '2.000',
      bullets: ['4 encontros mensais', 'Suporte via WhatsApp'],
      destaque: true,
    },
  ];

  return (
    <section ref={sectionRef} className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24 flex flex-col justify-center min-h-[100svh]">
      <div className="max-w-[900px] mx-auto w-full">

        <h2 className="cons-item font-halyard font-semibold text-[#181412] text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.1] mb-4">
          Consultoria de Acompanhamento Mensal
        </h2>
        <p className="cons-item font-halyard font-light text-[#181412] text-[20px] md:text-[22px] leading-[1.5] mb-12 max-w-[58ch]">
          Suporte estratégico para colocar o posicionamento em prática, com encontros regulares e suporte direto no WhatsApp. Mínimo 3 meses.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.label}
              className={`cons-item rounded-2xl px-8 py-9 border-2 ${
                plan.destaque
                  ? 'border-[#FE6942] bg-[#FFF8F6]'
                  : 'border-black/[0.08] bg-[#F8F8F8]'
              }`}
            >
              <div className={`font-halyard text-[12px] tracking-[0.22em] uppercase font-semibold mb-5 ${plan.destaque ? 'text-[#FE6942]' : 'text-[#181412]/40'}`}>
                {plan.label}
              </div>
              <div className="font-halyard font-semibold text-[#FE6942] leading-[1] mb-6" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)' }}>
                R${plan.preco}<span className="text-[1.4rem] font-normal">/mês</span>
              </div>
              <ul className="space-y-3">
                {plan.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#FE6942] shrink-0" />
                    <span className="font-halyard font-light text-[#181412] text-[18px] md:text-[20px] leading-[1.4]">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ── SLIDE 9: SOBRE A THEONE (Hero + Storytelling + seção "Existimos") ─────────
function SobreTheOne({ scrollerRef }) {
  const aboutRef = useRef(null);
  // Força re-render após mount para capturar o DOM node do scroller
  const [scroller, setScroller] = useState(null);

  // useEffect (não useLayoutEffect) é necessário aqui porque o ref do div pai
  // (slideScrollRef) só fica disponível APÓS o commitLayoutEffects processar os
  // pais — ou seja, depois que os useLayoutEffects dos filhos já rodaram.
  // Com useEffect o DOM está completamente commitado e todos os refs estão set.
  useEffect(() => {
    if (scrollerRef?.current) {
      setScroller(scrollerRef.current);
    }
  }, [scrollerRef]);

  // Após o scroller estar disponível e a animação de entrada do slide terminar
  // (~800ms), força o ScrollTrigger a recalcular todas as posições.
  useEffect(() => {
    if (!scroller) return;
    const id = setTimeout(() => ScrollTrigger.refresh(), 860);
    return () => clearTimeout(id);
  }, [scroller]);

  useEffect(() => {
    if (!scroller || !aboutRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.theone-about-left > *',
        { opacity: 0, x: -30, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, stagger: 0.14,
          scrollTrigger: { trigger: aboutRef.current, start: 'top 75%', scroller } }
      );
      gsap.fromTo('.theone-about-right',
        { opacity: 0, x: 40, scale: 0.96 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, delay: 0.2, ease: 'power4.out',
          scrollTrigger: { trigger: aboutRef.current, start: 'top 75%', scroller } }
      );
    }, aboutRef);
    return () => ctx.revert();
  }, [scroller]);

  const bullets = [
    { title: '+8 Anos', text: 'Construindo marcas que lideram, com especialistas formados nas maiores operações de marketing e comunicação do Brasil.' },
    { title: 'Projetos Personalizados', text: 'Nenhum negócio com ambição cabe numa solução industrializada.' },
    { title: 'Projetos Selecionados', text: 'Não atuamos com centenas, nem dezenas de clientes. Selecionamos empresas que têm visão de crescimento e propósito de gerar transformação.' },
  ];

  return (
    <div>
      {/* Hero e Storytelling só montam após scroller estar disponível —
          evita dupla inicialização e flicker de reset de animações GSAP */}
      {scroller && <HeroSection disableNavEvents showTopLogo scroller={scroller} />}
      {scroller && <StorytellingSection persona="empresario" scroller={scroller} />}

      {/* Seção "Existimos para construir marcas TheOne" */}
      <section ref={aboutRef} className="bg-[#212121] text-white min-h-[100svh] px-6 md:px-12 lg:px-16 py-12 md:py-16 flex flex-col justify-center">
        <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-10 md:gap-12">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-16 items-start">
            <div className="theone-about-left flex flex-col gap-7">
              <h2 className="font-editorial font-normal text-white text-[clamp(2.2rem,3.8vw,3.8rem)] leading-[1.06] tracking-tight">
                Existimos para construir marcas TheOne,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224]">a escolha número um.</span>
              </h2>
              <p className="font-halyard font-light text-[#C7C7C7] text-[20px] md:text-[22px] leading-[1.45] max-w-[680px]">
                Vimos o que acontece quando marketing vira linha de produção e nos recusamos a ser mais um desse modelo.
              </p>
              <p className="font-halyard font-light text-[#C7C7C7] text-[20px] md:text-[22px] leading-[1.45] max-w-[680px]">
                Estruturamos como você se posiciona nos principais canais para se tornar a opção inevitável no seu mercado. Seremos seus aliados na efetivação da estratégia para consolidar o seu negócio como o número um.
              </p>
              <p className="font-halyard font-light text-white text-[20px] md:text-[22px] leading-[1.45] max-w-[680px]">
                Não entregamos um PDF e sumimos. Nosso trabalho é orientado para construir uma fundação sólida de estratégia de marca com foco em expansão e geração de receita.
              </p>
            </div>
            <div className="theone-about-right hidden lg:block">
              <div className="relative rounded-[24px] overflow-hidden border border-[#5B5B5B]" style={{ height: 'clamp(320px, 40vh, 520px)' }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,105,66,0.12)_0%,transparent_60%)] z-10" />
                <img src="/theone-hand.jpg" alt="TheOne" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {bullets.map(item => (
              <li key={item.title}>
                <strong className="block font-halyard font-medium text-[#FE6942] text-[1.5rem] md:text-[1.75rem] leading-none mb-4">{item.title}</strong>
                <span className="block font-halyard font-light text-[#A8A8A8] text-[18px] md:text-[19px] leading-[1.5]">{item.text}</span>
              </li>
            ))}
          </ul>

        </div>
      </section>
    </div>
  );
}

// ── SLIDE 10: SOBRE O JEAN ────────────────────────────────────────────────────
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
    <section ref={sectionRef} className="bg-[#212121] font-halyard min-h-[100svh] px-6 md:px-12 lg:px-16 pt-10 md:pt-12 pb-16 md:pb-20 flex items-center">
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="border border-[#5B5B5B] rounded-[28px] overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Foto */}
            <div className="relative overflow-hidden w-full md:w-[38%] aspect-[4/5] md:aspect-auto md:min-h-[560px] shrink-0 bg-[#1a1a1a]">
              <img
                src="/images/Jean.jpeg"
                alt="Jean Talles"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <span className="absolute bottom-5 right-7 hidden md:block font-editorial text-[100px] leading-none text-white/[0.06] select-none pointer-events-none">01</span>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 flex flex-col justify-center bg-[#212121] px-8 md:px-14 lg:px-16 pt-10 pb-12 md:py-14">
              <span className="jean-item inline-flex items-center bg-[#FE6942] text-white text-[13px] font-semibold tracking-[0.24em] uppercase px-6 py-2.5 rounded-full w-fit mb-8">
                Fundador
              </span>
              <h3 className="jean-item font-editorial text-white text-[32px] md:text-[52px] leading-[1.05] mb-3">Jean Talles</h3>
              <p className="jean-item text-[#FE6942] text-[14px] md:text-[15px] uppercase tracking-[0.18em] mb-8">Estrategista de Marca e Comunicação</p>
              <div className="jean-item w-16 h-px bg-white/10 mb-8" />
              <ul className="space-y-5 mb-10">
                {[
                  'Especialista em branding, comunicação e marketing com 08 anos de mercado.',
                  'Liderou e estruturou o setor de comunicação para key accounts B2B e B2C na maior assessoria de marketing do país.',
                  'Fundador e idealizador da TheOne, consultoria que empodera empresários visionários no Brasil.',
                ].map((b, i) => (
                  <li key={i} className="jean-item flex gap-4 items-start">
                    <span className="text-[#FE6942] text-[1.1rem] leading-none mt-1.5 shrink-0">→</span>
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

// ── SLIDES 4-6: CASES (página real do site) ──────────────────────────────────
function CaseSlide({ slug }) {
  const caseData = caseStudies.find(c => c.slug === slug);
  if (!caseData) return null;
  return (
    // [&_header]:hidden oculta o botão Voltar/logo de navegação
    <div className="[&_header]:hidden">
      <CasePageTemplate caseStudy={caseData} />
    </div>
  );
}

// ── SLIDESHOW ─────────────────────────────────────────────────────────────────
function PropostaSlideshow() {
  const [proposalState, setProposalState, generateLink] = useProposalState({
    clientName: '',
    cenarioAtual: '',
    cenarioDesejado: ''
  });
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
        {current === 0  && <Capa />}
        {current === 1  && (
          <NomeClienteSlide 
            clientName={proposalState.clientName} 
            setClientName={(v) => setProposalState({ clientName: v })} 
            onGenerateLink={generateLink} 
          />
        )}
        {current === 2  && (
          <ContextoEditavel 
            showDesejado={false}
            cenarioAtual={proposalState.cenarioAtual}
            setCenarioAtual={(v) => setProposalState({ cenarioAtual: v })}
            cenarioDesejado={proposalState.cenarioDesejado}
            setCenarioDesejado={(v) => setProposalState({ cenarioDesejado: v })}
          />
        )}
        {current === 3  && (
          <ContextoEditavel 
            showDesejado={true}
            cenarioAtual={proposalState.cenarioAtual}
            setCenarioAtual={(v) => setProposalState({ cenarioAtual: v })}
            cenarioDesejado={proposalState.cenarioDesejado}
            setCenarioDesejado={(v) => setProposalState({ cenarioDesejado: v })}
          />
        )}
        {current === 4  && <Dores />}
        {current === 5  && <SobreTheOne scrollerRef={slideScrollRef} />}
        {current === 6  && <SobreJean />}
        {current === 7  && <CaseSlide slug="zenic" />}
        {current === 8  && <CaseSlide slug="thunders" />}
        {current === 9  && <CaseSlide slug="camilla-toscano" />}
        {current === 10 && <TheOneFoundation />}
        {current === 11 && <CasaDaMarca />}
        {current === 12 && <EstrategiaDeMarca />}
        {current === 13 && <Naming />}
        {current === 14 && <IdentidadeVisual />}
        {current === 15 && <MyBranding />}
        {current === 16 && <SiteBrandExperience />}
        {current === 17 && <TheOneAgent />}
        {current === 18 && <Cronograma />}
        {current === 19 && <Calculadora clientName={proposalState.clientName} />}
        {current === 20 && <Consultoria />}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          opacity: hasMoreBelow ? 1 : 0,
          background: `linear-gradient(to top, ${current === 5 ? 'rgba(128,128,128,0.15)' : (DARK_SLIDES.includes(current) ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)')} 0%, transparent 100%)`,
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
                  ? '#FE6942'
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
export default function PropostaBaseP() {
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
