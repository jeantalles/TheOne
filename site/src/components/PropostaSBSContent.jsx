import { useState } from 'react';
import { SBS_PHASES, SBS_SERVICES, SBS_MATERIALS, SBS_COMPLETE_DISCOUNT } from '../content/propostaSBS';

const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0, maximumFractionDigits: 2 });
const panel = 'bg-[#F8F8F8] rounded-2xl px-7 py-8 border border-black/[0.07]';

function Heading({ eyebrow, title, children }) {
  return <div className="mb-10 md:mb-12">
    <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold block mb-5">{eyebrow}</span>
    <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.5rem,4vw,3.75rem)] leading-[1.02] tracking-tight">{title}</h2>
    {children && <p className="font-halyard font-light text-[#181412] text-[20px] md:text-[23px] leading-[1.45] max-w-[56ch] mt-7">{children}</p>}
  </div>;
}

function Frame({ children }) {
  return <section className="bg-white px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24"><div className="max-w-[1100px] mx-auto">{children}</div></section>;
}

export function IdentidadeSBS() {
  const groups = [
    ['Identidade verbal', [
      'Eixo narrativo',
      'Texto de narrativa da marca (storytelling)',
      'Manifesto',
      'Expressões da marca – Frases e mensagens chave da marca',
      'Aplicações – Bio do Instagram, Bio do LinkedIn, etc',
      'Tom e Voz da marca',
      'Linguagem proprietária – Território de palavras, termos próprios, expressões características',
      'Slogan',
      'Regras de comunicação: DOs and DONTs',
    ]],
    ['Otimização da identidade visual', ['Preservação do logotipo atual', 'Revisão da paleta, tipografia e hierarquia visual', 'Direção de imagem e elementos gráficos', 'Orientações de uso e exemplos de aplicação']],
    ['Novo brandbook', ['Consolidação das diretrizes verbais e visuais', 'Regras para manter a consistência da marca', 'Documento de referência para a SBS e seus parceiros']],
  ];
  return <Frame>
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-start mb-10 md:mb-12">
      <Heading eyebrow="Fase 1 · TheOne Foundation" title="Identidade de Marca">Identidade verbal, otimização da identidade visual e novo brandbook. O posicionamento orienta como a SBS se apresenta, escreve e aplica sua marca.</Heading>
      <div className="hidden lg:block rounded-[24px] overflow-hidden" style={{ height: '400px' }}>
        <img src="/images/eike-identidade-bg.jpg" alt="Identidade de Marca" className="w-full h-full object-cover object-center" />
      </div>
    </div>
    <div className="grid md:grid-cols-3 gap-5">{groups.map(([title, items]) => <div key={title} className={panel}>
      <h3 className="font-halyard font-semibold text-[#FE6942] text-[17px] mb-6">{title}</h3>
      <ul className="space-y-4">{items.map(item => <li key={item} className="flex items-start gap-3 font-halyard font-light text-[#181412] text-[18px] leading-[1.45]"><span className="text-[#FE6942] shrink-0" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }} aria-hidden="true">→</span>{item}</li>)}</ul>
    </div>)}</div>
  </Frame>;
}

export function MateriaisSBS() {
  return <Frame>
    <Heading eyebrow="Fase 2 · Desdobramentos" title="Materiais e Pontos de Contato">Aplicação da identidade nos materiais que a SBS precisa para apresentar a empresa, se comunicar e atender seus clientes.</Heading>
    <div className="grid md:grid-cols-2 gap-5">{SBS_MATERIALS.map(item => <div key={item.label} className={panel}>
      <h3 className="font-halyard font-medium text-[#181412] text-[22px] mb-3">{item.label}</h3>
      <p className="font-halyard font-light text-[#181412]/70 text-[18px] leading-[1.5]">{item.description}</p>
    </div>)}</div>
    <p className="font-halyard font-light text-[#181412]/60 text-[16px] leading-[1.5] mt-7">Inclui criação e arquivos finais. Impressão e fabricação ficam com os fornecedores da SBS. O site contempla o ambiente institucional; portais e áreas restritas ficam fora do escopo.</p>
  </Frame>;
}

export function CalculadoraSBS() {
  const [selected, setSelected] = useState(() => Object.fromEntries(SBS_SERVICES.map(service => [service.id, service.selected])));
  const [myBrandingQty, setMyBrandingQty] = useState({ marca: 0, conteudo: 0 });
  const [optionalOpen, setOptionalOpen] = useState(false);
  const myBrandingServices = [
    { id: 'marca', label: 'Estratégia de Marca Pessoal', price: selected.estrategia ? 6000 : 9700 },
    { id: 'conteudo', label: 'Estratégia de Conteúdo', price: 2000 },
  ];
  const myBrandingTotal = myBrandingServices.reduce((sum, service) => sum + myBrandingQty[service.id] * service.price, 0);
  const completeMyBrandingTotal = myBrandingQty.marca * 6000 + myBrandingQty.conteudo * 2000;
  const projectServices = SBS_SERVICES.filter(service => !service.monthly);
  const total = projectServices.reduce((sum, service) => sum + (selected[service.id] ? service.price : 0), 0) + myBrandingTotal;
  const completePhaseTotal = projectServices.reduce((sum, service) => sum + service.price, 0);
  const completeTotal = completePhaseTotal + completeMyBrandingTotal;
  const completeCash = completePhaseTotal * (1 - SBS_COMPLETE_DISCOUNT) + completeMyBrandingTotal;

  return <Frame>
    <Heading eyebrow="Investimento" title="Defina o seu projeto · SBS" />
    <div className="space-y-9 mb-10">{SBS_PHASES.map((phase, index) => <div key={phase.id}>
      <div className="flex items-center gap-4 mb-4 px-1">
        <span className="shrink-0 font-editorial font-normal text-[42px] md:text-[48px] leading-none text-[#FE6942]" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <div className="min-w-0">
          <h3 className="font-editorial font-normal text-[26px] md:text-[30px] text-[#181412] leading-[1.15]">{phase.label}</h3>
        </div>
        <div className="flex-1 h-px bg-[#FE6942]/20 min-w-4" />
      </div>
      <div className="space-y-3">{SBS_SERVICES.filter(service => service.phase === phase.id).map(service => <label key={service.id} className={`cursor-pointer rounded-2xl px-5 md:px-7 py-5 border transition-all duration-200 flex items-start md:items-center justify-between gap-4 ${selected[service.id] ? 'border-[#FE6942] bg-[#FE6942]/[0.04]' : 'border-black/[0.09] bg-[#F8F8F8] hover:border-black/20'}`}>
        <div className="flex items-start md:items-center gap-4 md:gap-5 min-w-0">
          <input type="checkbox" checked={selected[service.id]} onChange={() => setSelected(previous => ({ ...previous, [service.id]: !previous[service.id] }))} className="peer sr-only" />
          <span className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-1 md:mt-0 peer-focus-visible:ring-2 peer-focus-visible:ring-[#FE6942] peer-focus-visible:ring-offset-4 ${selected[service.id] ? 'border-[#FE6942] bg-[#FE6942]' : 'border-black/20'}`} aria-hidden="true">{selected[service.id] && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}</span>
          <span className="min-w-0">
            <span className={`block font-halyard font-medium text-[18px] md:text-[20px] ${selected[service.id] ? 'text-[#181412]' : 'text-[#181412]/50'}`}>{service.label}</span>
            <span className="block font-halyard font-light text-[15px] md:text-[16px] text-[#181412]/60 leading-[1.4] mt-2 max-w-[56ch]">{service.description}</span>
          </span>
        </div>
        <span className={`font-halyard font-medium text-[17px] md:text-[20px] shrink-0 whitespace-nowrap ${selected[service.id] ? 'text-[#181412]' : 'text-[#181412]/40'}`}>{money(service.price)}{service.monthly && <span className="text-[13px]">/mês</span>}</span>
      </label>)}</div>
    </div>)}</div>

    <div className="mb-10">
      <button type="button" onClick={() => setOptionalOpen(previous => !previous)} aria-expanded={optionalOpen} aria-controls="sbs-mybranding-options" className="w-full flex items-center justify-between gap-6 border-y border-black/15 py-7 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FE6942]">
        <span className="font-editorial font-normal text-[#181412] text-[30px] md:text-[36px] leading-[1.15]">Opcional</span>
        <span className="font-halyard text-[#FE6942] text-[30px] leading-none shrink-0" aria-hidden="true">{optionalOpen ? '−' : '+'}</span>
      </button>
      <div id="sbs-mybranding-options" hidden={!optionalOpen} className="pt-6 pb-7">
      <div className="flex items-center gap-3 mb-3 px-1">
        <span className="font-halyard font-semibold text-[14px] tracking-[0.20em] uppercase text-[#FE6942]">myBranding</span>
        <div className="flex-1 h-px bg-[#FE6942]/20" />
      </div>
      <div className="space-y-3">{myBrandingServices.map(service => <div key={service.id} className={`rounded-2xl px-5 md:px-7 py-5 border transition-all duration-200 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 ${myBrandingQty[service.id] > 0 ? 'border-[#FE6942] bg-[#FFF5F1]' : 'border-black/[0.09] bg-[#F8F8F8] hover:border-black/20'}`}>
        <div className="flex flex-wrap md:flex-nowrap items-center gap-5">
          <div className="flex items-center bg-[#F0F0F0] border border-black/10 rounded-xl overflow-hidden shrink-0">
            <button type="button" onClick={() => setMyBrandingQty(previous => ({ ...previous, [service.id]: Math.max(0, previous[service.id] - 1) }))} aria-label={`Diminuir quantidade de ${service.label}`} className="w-10 h-10 flex items-center justify-center font-halyard font-semibold text-[20px] text-[#181412] hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FE6942]">−</button>
            <span className="font-halyard font-bold text-[17px] w-8 text-center text-[#181412] tabular-nums" aria-live="polite">{myBrandingQty[service.id]}</span>
            <button type="button" onClick={() => setMyBrandingQty(previous => ({ ...previous, [service.id]: previous[service.id] + 1 }))} aria-label={`Aumentar quantidade de ${service.label}`} className="w-10 h-10 flex items-center justify-center font-halyard font-semibold text-[20px] text-[#181412] hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FE6942]">+</button>
          </div>
          <span className={`font-halyard font-medium text-[18px] md:text-[20px] ${myBrandingQty[service.id] > 0 ? 'text-[#181412]' : 'text-[#181412]/50'}`}>{service.label}</span>
        </div>
        <span className={`font-halyard font-medium text-[18px] md:text-[20px] shrink-0 whitespace-nowrap ${myBrandingQty[service.id] > 0 ? 'text-[#181412]' : 'text-[#181412]/40'}`}>{money(service.price * (myBrandingQty[service.id] || 1))}</span>
      </div>)}</div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-5">
      <div className={panel}>
        <h3 className="font-editorial text-[#FE6942] text-[32px] mb-6">Projeto modular</h3>
        <div className="border-t border-black/10 pt-6">
        <p className="font-halyard text-[#181412] text-[38px] tracking-tight" aria-live="polite">{money(total)}</p>
        <div className="border-t border-black/10 mt-6 pt-5">
          <p className="font-halyard font-medium text-[#181412] text-[18px] mb-3">Formas de pagamento</p>
          <ul className="list-disc pl-5 font-halyard font-light text-[#181412]/70 text-[17px] leading-[1.45] space-y-3">
            <li>{total > 30000 ? <>3x no PIX de {(total / 3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}.</> : <>2x no PIX: 50% para iniciar e 50% após 30 dias — {money(total / 2)} por parcela.</>}</li>
            <li>Até 12x no cartão, com juros da máquina.</li>
          </ul>
        </div>
        {selected.advisory && <p className="font-halyard font-light text-[#181412]/70 text-[16px] mt-5" aria-live="polite">Advisory de Branding: {money(3000)}/mês, cobrado separadamente.</p>}
        </div>
      </div>
      <div className="rounded-[28px] bg-[#211F1E] text-white p-7 md:p-8 border border-[#FE6942]/30">
        <h3 className="font-editorial text-[32px] mb-5">Projeto completo com as 3 fases</h3>
        <p className="font-halyard text-white/45 line-through text-[21px]">{money(completeTotal)}</p>
        <p className="font-halyard text-[#FE6942] text-[42px] tracking-tight mt-2" aria-live="polite">{money(completeCash)}</p>
        <p className="font-halyard font-semibold text-[13px] tracking-[.18em] uppercase text-[#FE6942] mt-3">{SBS_COMPLETE_DISCOUNT * 100}% de desconto à vista</p>
        <ul className="list-disc pl-5 border-t border-white/15 mt-6 pt-5 font-halyard font-light text-white/75 text-[17px] leading-[1.45] space-y-3">
          <li>Pagamento à vista, com {SBS_COMPLETE_DISCOUNT * 100}% de desconto sobre as fases 1 e 2 completas.</li>
          <li>Economia de {money(completeTotal - completeCash)}.</li>
          <li>Acompanhamento por 3 meses: {money(3000)}/mês, cobrado separadamente deste total.</li>
        </ul>
      </div>
    </div>
  </Frame>;
}

export function AdvisorySBS() {
  return <Frame>
    <Heading eyebrow="Fase 3 · Acompanhamento" title="Advisory de Branding">Acompanhamento e direcionamento para aplicar o posicionamento e manter a consistência da comunicação após a entrega do projeto.</Heading>
    <div className="grid md:grid-cols-2 gap-5">
      <div className={panel}><h3 className="font-halyard font-medium text-[#181412] text-[24px] mb-5">Direcionamento pós-projeto</h3><ul className="font-halyard font-light text-[#181412]/75 text-[19px] space-y-4 leading-[1.5]"><li>Reuniões quinzenais de acompanhamento.</li><li>Suporte via WhatsApp.</li><li>Revisão da aplicação da estratégia e da identidade.</li><li>Orientação para a SBS e seus parceiros de comunicação.</li><li>Direcionamento de ajustes na implementação da marca.</li></ul></div>
      <div className="rounded-[28px] p-8 bg-[#211F1E] text-white flex flex-col justify-center"><span className="font-halyard uppercase tracking-[.18em] text-[13px] text-white/50 mb-5">Investimento mensal</span><p className="font-halyard text-[#FE6942] text-[48px] leading-none">R$ 3.000<span className="text-[19px] text-white/60">/mês</span></p><p className="font-halyard font-light text-white/65 text-[17px] leading-[1.5] mt-6">Mensalidade cobrada separadamente do investimento das fases 1 e 2. Reuniões quinzenais e suporte via WhatsApp. Acompanhamento por 3 meses.</p></div>
    </div>
  </Frame>;
}
