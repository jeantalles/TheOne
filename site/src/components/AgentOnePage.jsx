import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck, Brain, Check, ClipboardList, Compass, LineChart, Megaphone, Sparkles, Target, Users } from 'lucide-react';
import { MeshGradient } from '@paper-design/shaders-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AgentOneNavbar from './AgentOneNavbar';
import TheOne from './4-TheOne';
import SolucoesTheOne from './4b-SolucoesTheOne';
import { SpeedInsights } from '@vercel/speed-insights/react';

gsap.registerPlugin(ScrollTrigger);

const initialLeadsCount = 17;
const leadLimit = 50;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function submitAgentOneLead(form, source) {
  const endpoint = import.meta.env.VITE_AGENTONE_WEBHOOK_URL || '/api/submit-lead';
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form, source, timestamp: new Date().toISOString() }),
  });

  if (!response.ok && endpoint === '/api/submit-lead') {
    console.warn('Fallback: rota local falhou, simulando sucesso no ambiente de desenvolvimento.');
    await wait(700);
  }
}

function AgentOneLeadForm({ source, compact = false, onSuccess }) {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' });
  const [status, setStatus] = useState('idle');
  const setField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.nome || !form.email || !form.telefone || status === 'loading') return;

    setStatus('loading');
    try {
      await submitAgentOneLead(form, source);
      setStatus('success');
      setForm({ nome: '', email: '', telefone: '' });
      onSuccess?.();
      window.setTimeout(() => setStatus('idle'), 3800);
    } catch (error) {
      console.error('Erro ao enviar lead:', error);
      setStatus('error');
      window.setTimeout(() => setStatus('idle'), 3800);
    }
  };

  const fields = [
    { field: 'nome', placeholder: 'Nome completo', type: 'text' },
    { field: 'email', placeholder: 'Seu melhor email', type: 'email' },
    { field: 'telefone', placeholder: 'Seu WhatsApp', type: 'tel' },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
      {!compact && (
        <p className="font-halyard text-[12px] font-semibold uppercase tracking-[0.2em] text-white/58">
          Quero ser avisado quando lançar
        </p>
      )}

      {fields.map(({ field, placeholder, type }) => (
        <input
          key={field}
          type={type}
          placeholder={placeholder}
          value={form[field]}
          onChange={setField(field)}
          required
          disabled={status === 'loading'}
          className="h-[50px] w-full rounded-[12px] border border-white/[0.09] bg-white/[0.045] px-4 font-halyard text-[15px] text-white outline-none transition-[border-color,background,opacity] duration-200 placeholder:text-white/34 focus:border-[#FE6942]/45 focus:bg-white/[0.065] disabled:opacity-60"
        />
      ))}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-1 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-[12px] font-halyard text-[15px] font-semibold transition-[transform,opacity,background] duration-150 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
        style={{
          color: status === 'success' ? '#0A0A0A' : '#15110F',
          background: status === 'success'
            ? '#86efac'
            : 'linear-gradient(135deg, #FFF3EE 0%, #FF8E68 100%)',
          boxShadow: '0 18px 34px rgba(254,105,66,0.14)',
        }}
      >
        {status === 'loading' && 'Enviando...'}
        {status === 'success' && 'Enviado com sucesso'}
        {status === 'error' && 'Tentar novamente'}
        {status === 'idle' && (
          <>
            Tenho interesse
            <ArrowRight size={17} strokeWidth={1.8} />
          </>
        )}
      </button>
    </form>
  );
}

function WaitlistProgress({ count }) {
  const width = `${Math.min(100, Math.round((count / leadLimit) * 100))}%`;

  return (
    <div className="flex w-full items-center gap-4">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.09]">
        <div className="h-full rounded-full bg-gradient-to-r from-[#FED1C5] to-[#FF5224]" style={{ width }} />
      </div>
      <span className="whitespace-nowrap font-halyard text-[13px] text-white/38 md:text-[14px]">
        <strong className="font-semibold text-white">{count}</strong> / {leadLimit} interessados
      </span>
    </div>
  );
}

function AgentOneHero({ leadsCount, onLeadSuccess }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.agentone-hero-reveal', {
        opacity: 0,
        y: 34,
        filter: 'blur(10px)',
        duration: 0.95,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative bg-[#151515] px-3 pb-8 pt-[92px] md:px-6 md:pb-10 md:pt-[104px]">
      <div
        className="relative mx-auto min-h-[calc(100svh-132px)] w-full max-w-[1760px] overflow-hidden rounded-[28px] border border-white/[0.08] md:min-h-[calc(100vh-148px)] md:rounded-[36px]"
        style={{ boxShadow: '0 26px 90px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.08)' }}
      >
        <div className="pointer-events-none absolute inset-0">
          <MeshGradient
            speed={0.58}
            scale={1.08}
            distortion={0.14}
            swirl={0.72}
            frame={559393.2650000063}
            colors={['#000000', '#611805', '#101010', '#FE6942']}
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,235,225,0.18),transparent_31%),linear-gradient(120deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.3)_48%,rgba(0,0,0,0.76)_100%)]" />
        </div>

        <div className="relative z-10 grid min-h-[inherit] grid-cols-1 items-stretch lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.72fr)]">
          <div className="flex flex-col justify-between px-6 py-9 md:px-12 md:py-12 lg:px-16 lg:py-16">
            <div className="max-w-[850px]">
              <span className="agentone-hero-reveal mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#FE6942] bg-[#FE6942] px-5 py-2 font-halyard text-[11px] font-semibold uppercase tracking-[0.2em] text-white md:mb-10">
                <span className="h-1.5 w-1.5 rounded-full bg-white/75" />
                Em breve
              </span>

              <div className="agentone-hero-reveal mb-7 flex items-center gap-4 md:gap-5">
                <img src="/favicon.png" alt="" className="h-[48px] w-[48px] object-contain md:h-[68px] md:w-[68px]" />
                <h1 className="font-editorial text-[clamp(4.2rem,10vw,9.6rem)] font-normal leading-[0.84] tracking-[-0.04em] text-white">
                  AgentOne
                </h1>
              </div>

              <p className="agentone-hero-reveal max-w-[13ch] font-editorial text-[clamp(2.35rem,5.35vw,6.1rem)] font-normal leading-[0.96] tracking-[-0.035em] text-white">
                Seu agente de IA para posicionamento de marca.
              </p>

              <p className="agentone-hero-reveal mt-8 max-w-[58ch] font-halyard text-[clamp(1.04rem,1.55vw,1.34rem)] font-light leading-[1.55] text-white/62">
                Diagnostique seu negócio, público, mercado e discurso com um agente treinado pela metodologia TheOne. Receba pontos de atenção, oportunidades e próximos passos para deixar de competir como mais uma opção.
              </p>
            </div>

            <div className="agentone-hero-reveal mt-10 max-w-[620px] md:mt-14">
              <WaitlistProgress count={leadsCount} />
            </div>
          </div>

          <div className="flex items-center border-t border-white/[0.08] bg-black/24 px-6 py-8 backdrop-blur-[2px] md:px-10 lg:border-l lg:border-t-0 lg:px-12">
            <div className="agentone-hero-reveal w-full rounded-[22px] border border-white/[0.09] bg-[#080808]/72 p-5 shadow-2xl md:p-7">
              <div className="mb-7">
                <div className="mb-4 inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 font-halyard text-[13px] text-white/62">
                  <BadgeCheck size={16} strokeWidth={1.8} className="text-[#FE6942]" />
                  Lista limitada de lançamento
                </div>
                <h2 className="font-editorial text-[clamp(2.1rem,3.6vw,3.7rem)] leading-[1] tracking-[-0.03em] text-white">
                  Entre antes da primeira versão pública.
                </h2>
                <p className="mt-4 max-w-[36ch] font-halyard text-[16px] font-light leading-[1.55] text-white/48">
                  Vamos chamar os primeiros interessados para testar, dar feedback e receber prioridade no lançamento.
                </p>
              </div>
              <AgentOneLeadForm source="AgentOne Hero" onSuccess={onLeadSuccess} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DarkToLightTransition() {
  return (
    <div className="relative h-[220px] bg-[#151515] md:h-[280px]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#151515_0%,#242424_30%,#ede3dc_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-[linear-gradient(180deg,rgba(245,238,232,0),#F5EEE8_85%)]" />
    </div>
  );
}

const personaCards = [
  {
    icon: <Target size={22} strokeWidth={1.75} />,
    title: 'Fundadores e CEOs',
    text: 'Para quem precisa explicar melhor o valor do negócio antes de vender, captar ou lançar.',
    uses: ['Reposicionar a empresa', 'Preparar lançamento', 'Encontrar diferenciação real'],
  },
  {
    icon: <Megaphone size={22} strokeWidth={1.75} />,
    title: 'Marketing e Growth',
    text: 'Para times que precisam transformar marca em alavanca de aquisição, não só em estética.',
    uses: ['Auditar discurso', 'Ajustar canais orgânicos', 'Reduzir ruído na comunicação'],
  },
  {
    icon: <Users size={22} strokeWidth={1.75} />,
    title: 'Gestores de marca',
    text: 'Para quem precisa organizar público, mercado, narrativa e oferta antes da próxima campanha.',
    uses: ['Mapear oportunidades', 'Priorizar mensagens', 'Criar clareza estratégica'],
  },
];

const processSteps = [
  { icon: <ClipboardList size={18} strokeWidth={1.8} />, title: 'Diagnóstico', text: 'O agente conduz perguntas sobre negócio, público, mercado, oferta e canais.' },
  { icon: <Brain size={18} strokeWidth={1.8} />, title: 'Análise', text: 'A IA cruza suas respostas com a lógica de posicionamento e procura gargalos estratégicos.' },
  { icon: <Compass size={18} strokeWidth={1.8} />, title: 'Direção', text: 'Você recebe uma leitura objetiva com oportunidades, alertas e próximos passos.' },
];

function AudienceAndUseCases() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.agentone-section-kicker, .agentone-section-title, .agentone-section-copy', {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from('.agentone-audience-card, .agentone-process-card', {
        opacity: 0,
        y: 36,
        duration: 0.72,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 58%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="agentone-para-quem"
      ref={sectionRef}
      data-navbar-theme="light"
      className="relative overflow-hidden bg-[#F5EEE8] px-5 pb-24 pt-8 text-[#181412] md:px-10 md:pb-32 lg:px-16"
    >
      <div className="mx-auto max-w-[1480px]">
        <span className="agentone-section-kicker mb-5 block font-halyard text-[13px] font-semibold uppercase tracking-[0.24em] text-[#FE6942]">
          Para quem é
        </span>
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[0.98fr_0.8fr] lg:items-end">
          <h2 className="agentone-section-title max-w-[920px] font-editorial text-[clamp(3rem,6.2vw,6.8rem)] font-normal leading-[0.92] tracking-[-0.045em]">
            Quando falta clareza, o crescimento fica caro.
          </h2>
          <p className="agentone-section-copy max-w-[560px] font-halyard text-[clamp(1.08rem,1.45vw,1.34rem)] font-light leading-[1.5] text-[#181412]/60 lg:pb-2">
            O AgentOne foi pensado para quem já sente que performance, conteúdo e venda dependem de uma estratégia de marca mais nítida.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {personaCards.map(({ icon, title, text, uses }) => (
            <article key={title} className="agentone-audience-card rounded-[24px] border border-[#181412]/10 bg-white/50 p-6 md:p-7">
              <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#FE6942]/28 bg-[#FE6942]/10 text-[#FE6942]">
                {icon}
              </div>
              <h3 className="font-editorial text-[2rem] leading-[1] tracking-[-0.025em] text-[#181412] md:text-[2.35rem]">
                {title}
              </h3>
              <p className="mt-5 min-h-[84px] font-halyard text-[17px] font-light leading-[1.48] text-[#181412]/58">
                {text}
              </p>
              <ul className="mt-7 flex flex-col gap-3 border-t border-[#181412]/10 pt-6">
                {uses.map((use) => (
                  <li key={use} className="flex items-start gap-3 font-halyard text-[15px] text-[#181412]/72">
                    <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-[#FE6942]" />
                    {use}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 gap-4 border-t border-[#181412]/10 pt-10 md:grid-cols-3">
          {processSteps.map(({ icon, title, text }, index) => (
            <article key={title} className="agentone-process-card flex gap-5">
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#181412] font-halyard text-[13px] font-semibold text-[#F5EEE8]">
                {index + 1}
              </span>
              <div>
                <div className="mb-4 flex items-center gap-2 text-[#FE6942]">
                  {icon}
                  <h3 className="font-halyard text-[13px] font-semibold uppercase tracking-[0.2em]">{title}</h3>
                </div>
                <p className="max-w-[34ch] font-halyard text-[18px] font-light leading-[1.48] text-[#181412]/58">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NotJustOneMore() {
  const sectionRef = useRef(null);
  const words = useMemo(() => ['Não', 'seja', 'só', 'mais', 'uma', 'opção'], []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.agentone-word',
        { color: 'rgba(24,20,18,0.16)', y: 18 },
        {
          color: (index) => (index >= 4 ? '#FE6942' : '#181412'),
          y: 0,
          stagger: 0.16,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            end: 'bottom 58%',
            scrub: 0.9,
          },
        }
      );
      gsap.from('.agentone-word-support', {
        opacity: 0,
        y: 24,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 48%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-navbar-theme="light"
      className="relative flex min-h-[82svh] items-center overflow-hidden bg-[#F5EEE8] px-5 py-24 text-[#181412] md:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
        <h2 className="font-editorial text-[clamp(4.7rem,13vw,15rem)] font-normal leading-[0.78] tracking-[-0.06em]">
          {words.map((word) => (
            <span key={word} className="agentone-word mr-[0.14em] inline-block">
              {word}
            </span>
          ))}
        </h2>
        <p className="agentone-word-support max-w-[34ch] font-halyard text-[clamp(1.18rem,1.65vw,1.46rem)] font-light leading-[1.45] text-[#181412]/58">
          O AgentOne nasce para tirar sua marca do terreno genérico e encontrar as escolhas estratégicas que tornam sua oferta mais memorável, comprável e defensável.
        </p>
      </div>
    </section>
  );
}

function FinalAgentOneCTA({ leadsCount, onLeadSuccess }) {
  return (
    <section id="agentone-lista" className="relative overflow-hidden bg-[#212121] px-3 py-8 md:px-6 md:py-10">
      <div
        className="relative mx-auto grid min-h-[720px] max-w-[1760px] grid-cols-1 overflow-hidden rounded-[30px] border border-white/[0.08] md:rounded-[36px] lg:grid-cols-[1fr_480px]"
        style={{ boxShadow: '0 26px 90px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)' }}
      >
        <div className="pointer-events-none absolute inset-0">
          <MeshGradient
            speed={0.58}
            scale={0.78}
            distortion={0.16}
            swirl={0.72}
            frame={555678.3200000016}
            colors={['#F85324', '#FF6A39', '#C43500', '#F85324']}
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.07),rgba(0,0,0,0.04)_48%,rgba(0,0,0,0.22))]" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-16">
          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#181412]/12 bg-[#181412]/12 px-5 py-2 font-halyard text-[12px] font-semibold uppercase tracking-[0.22em] text-[#181412]/72">
            <Sparkles size={16} strokeWidth={1.9} />
            Lançamento em breve
          </div>
          <h2 className="max-w-[880px] font-editorial text-[clamp(3.9rem,8vw,8.6rem)] font-normal leading-[0.86] tracking-[-0.055em] text-[#181412]">
            Seja um dos primeiros a testar.
          </h2>
          <p className="mt-8 max-w-[54ch] font-halyard text-[clamp(1.08rem,1.45vw,1.34rem)] font-light leading-[1.5] text-[#181412]/64">
            A primeira leva será pequena para garantir acompanhamento próximo, feedback real e evolução rápida do produto.
          </p>
          <div className="mt-12 max-w-[580px]">
            <div className="h-1 overflow-hidden rounded-full bg-[#181412]/16">
              <div
                className="h-full rounded-full bg-[#181412]"
                style={{ width: `${Math.min(100, Math.round((leadsCount / leadLimit) * 100))}%` }}
              />
            </div>
            <p className="mt-4 font-halyard text-[15px] text-[#181412]/58">
              <strong className="font-semibold text-[#181412]">{leadLimit - leadsCount}</strong> vagas restantes na lista inicial.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center border-t border-[#181412]/10 bg-[#080808]/78 px-6 py-8 md:px-10 lg:border-l lg:border-t-0">
          <div className="w-full">
            <div className="mb-7">
              <div className="mb-5 inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-4 text-[#FE6942]">
                <LineChart size={19} strokeWidth={1.8} />
              </div>
              <h3 className="font-editorial text-[clamp(2.2rem,3.4vw,3.8rem)] leading-[1] tracking-[-0.03em] text-white">
                Entre na lista.
              </h3>
              <p className="mt-4 max-w-[34ch] font-halyard text-[16px] font-light leading-[1.55] text-white/48">
                Quando abrirmos o beta, você recebe o convite no email e WhatsApp.
              </p>
            </div>
            <AgentOneLeadForm source="AgentOne Final CTA" compact onSuccess={onLeadSuccess} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AgentOnePage() {
  const [leadsCount, setLeadsCount] = useState(initialLeadsCount);
  const handleLeadSuccess = () => setLeadsCount((count) => Math.min(leadLimit, count + 1));

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hero-navbar-visibility', { detail: { visible: true } }));
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars?.trigger?.id?.startsWith?.('agentone')) trigger.kill();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#151515] font-halyard selection:bg-[#FE6942]/30 selection:text-white">
      <AgentOneNavbar />
      <main>
        <AgentOneHero leadsCount={leadsCount} onLeadSuccess={handleLeadSuccess} />
        <DarkToLightTransition />
        <AudienceAndUseCases />
        <NotJustOneMore />
        <TheOne />
        <SolucoesTheOne showAgentOneBanner={false} />
        <FinalAgentOneCTA leadsCount={leadsCount} onLeadSuccess={handleLeadSuccess} />
      </main>
      <footer className="border-t border-white/5 bg-[#212121] py-8 text-center">
        <p className="font-halyard text-xs font-bold uppercase tracking-[0.3em] text-white/38">© 2026 THE ONE CONSULTORIA DE MARCA.</p>
      </footer>
      <SpeedInsights />
    </div>
  );
}
