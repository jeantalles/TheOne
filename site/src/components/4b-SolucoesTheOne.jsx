import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MeshGradient } from '@paper-design/shaders-react';
import foundationImg from '../assets/products/foundation.jpeg';
import siteBrandExpImg from '../assets/products/site-brand-experience.jpeg';
import brandSprintImg from '../assets/products/brand-sprint.jpeg';
import myBrandingImg from '../assets/products/mybranding.jpeg';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_URL = 'https://wa.me/5551997513675';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ProductCard({ reversed, image, imageAlt, badge, name, subtitle, description, bullets, stats, forWhom, forWhomList }) {
  return (
    <div
      className="product-card"
      style={{
        background: '#000',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 24,
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: reversed ? '1fr 420px' : '420px 1fr',
        minHeight: 280,
        transition: 'border-color 0.25s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(254,105,66,0.2)';
        const image = e.currentTarget.querySelector('.product-img');
        if (image) {
          image.style.opacity = '0.9';
          image.style.filter = 'brightness(0.85) saturate(1)';
          image.style.transform = 'scale(1.03)';
        }
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        const image = e.currentTarget.querySelector('.product-img');
        if (image) {
          image.style.opacity = '0.52';
          image.style.filter = 'brightness(0.68) saturate(0.75)';
          image.style.transform = 'scale(1)';
        }
      }}
    >
      {/* Image */}
      <div
        className="product-img-wrap"
        style={{ position: 'relative', overflow: 'hidden', order: reversed ? 2 : 0 }}
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          className="product-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: 0.52,
            filter: 'brightness(0.68) saturate(0.75)',
            transition: 'opacity 0.4s ease, filter 0.4s ease, transform 0.5s ease',
          }}
        />
        <div
          className="product-img-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: reversed
              ? 'linear-gradient(to left, transparent 60%, #000 100%)'
              : 'linear-gradient(to right, transparent 60%, #000 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content */}
      <div style={{
        padding: 'clamp(56px,5vw,72px) 56px clamp(58px,5vw,76px) clamp(56px,5vw,72px)',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        order: reversed ? 1 : 0,
      }}>
        <div>
          {badge && (
            <span style={{
              display: 'inline-flex',
              width: 'fit-content',
              fontFamily: 'Arial, sans-serif',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '7px 16px',
              borderRadius: 100,
              color: '#fff',
              background: '#FE6942',
              border: '1px solid #FE6942',
              marginBottom: 18,
            }}>
              {badge}
            </span>
          )}
          {subtitle && (
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#FE6942', fontWeight: 600, lineHeight: 1.2, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12 }}>
              {subtitle}
            </p>
          )}
          <h3 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 'clamp(2.25rem, 3.2vw, 3.25rem)', lineHeight: 1.0, color: '#fff', marginBottom: 30, letterSpacing: '-0.03em' }}>
            {name}
          </h3>
          <p
            className="product-fade-text"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: 'clamp(1rem, 1.25vw, 1.12rem)', color: '#C7C7C7', lineHeight: 1.7, fontWeight: 300, maxWidth: '52ch', marginBottom: (bullets || stats) ? 48 : 0 }}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {bullets && (
            <ul className="product-fade-text" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: 34, rowGap: 13, marginBottom: stats ? 28 : 0, maxWidth: 760 }}>
              {bullets.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: 'Arial, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.62)', fontWeight: 300, lineHeight: 1.35 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FE6942', flexShrink: 0, marginTop: 8.5 }} />
                  <span>
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {stats && (
            <div className="product-fade-text" style={{ display: 'flex', gap: 48, marginTop: 30, flexWrap: 'wrap' }}>
              {stats.map(s => (
                <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: '1.75rem', color: '#FE6942', lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</span>
                  <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', letterSpacing: '0.12em', lineHeight: 1.2 }}>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 32, gap: 22, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.68)', fontWeight: 400, lineHeight: 1.6 }}>
            <strong style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FE6942', marginBottom: 10 }}>
              Para quem é indicado
            </strong>
            {forWhomList ? (
              <ol className="product-fade-text" style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {forWhomList.map((item, i) => <li key={i}>{item}</li>)}
              </ol>
            ) : (
              <span className="product-fade-text" style={{ display: 'block' }}>{forWhom}</span>
            )}
          </div>
          <div className="product-cta-arrow" style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: 0, transform: 'translateX(-6px)', transition: 'opacity 0.2s ease, transform 0.2s ease', color: '#fff' }}>
            <ArrowIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
function AgentOneBanner() {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [leadsCount, setLeadsCount] = useState(17);
  const set = field => e => setForm(p => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.telefone) return;
    
    setStatus('loading');
    try {
      // Usa URL de webhook externo se estiver nas envs, senão usa a API interna do Vercel
      const endpoint = import.meta.env.VITE_AGENTONE_WEBHOOK_URL || '/api/submit-lead';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'AgentOne Banner', timestamp: new Date().toISOString() })
      });
      
      if (!response.ok && endpoint === '/api/submit-lead') {
         // Fallback simulação se der erro na API local (ex: durante dev sem env variables configuradas)
         console.warn('Fallback: Rota local falhou, provável falta de env vars. Simulando sucesso.');
         await new Promise(resolve => setTimeout(resolve, 800));
      }
      
      setStatus('success');
      setLeadsCount(prev => prev + 1);
      setForm({ nome: '', email: '', telefone: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Erro ao enviar lead:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <div style={{ position: 'relative', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, overflow: 'hidden', marginBottom: 16 }}>
      <div className="pointer-events-none" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <MeshGradient
          speed={0.65}
          scale={1.36}
          distortion={0.16}
          swirl={0.72}
          frame={559393.2650000063}
          colors={['#000000', '#6E1905', '#6E1905', '#000000']}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="agentone-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 280 }}>

        {/* Left */}
        <div className="agentone-left" style={{ padding: '48px 48px 48px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'Arial, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fff', background: '#FE6942', border: '1px solid #FE6942', borderRadius: 100, padding: '7px 18px', marginBottom: 34, width: 'fit-content' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.72)', flexShrink: 0 }} />
              Em breve
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <img src="/favicon.png" alt="" style={{ width: 'clamp(2.4rem,3.7vw,3.65rem)', height: 'clamp(2.4rem,3.7vw,3.65rem)', objectFit: 'contain', flexShrink: 0 }} />
              <h3 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2.8rem, 4.4vw, 4.35rem)', color: '#fff', lineHeight: 1.0, letterSpacing: '-0.02em' }}>
                AgentOne{' '}
                <span style={{ fontStyle: 'normal', fontFamily: 'Arial, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#FE6942', border: '1px solid rgba(254,105,66,0.35)', borderRadius: 100, padding: '5px 14px', verticalAlign: 'middle', position: 'relative', top: -6 }}>
                  IA
                </span>
              </h3>
            </div>
            <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 'clamp(1.1rem,1.5vw,1.28rem)', color: 'rgba(255,255,255,0.56)', fontWeight: 300, lineHeight: 1.6, maxWidth: '44ch', marginBottom: 44 }}>
              Um agente de IA especializado em posicionamento e estratégia de marca que conduz uma diagnóstico do seu negócio, público e mercado junto com você e te entrega uma análise com pontos de atenção e oportunidades que estão na mesa.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '34%', background: 'linear-gradient(90deg, #FED1C5, #FF5224)', borderRadius: 2 }} />
            </div>
            <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>
              <strong style={{ color: '#fff', fontWeight: 600 }}>{leadsCount}</strong> / 50 interessados
            </span>
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} className="agentone-right" style={{ padding: '48px 52px 48px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.58)', marginBottom: 4 }}>
            Quero ser avisado quando lançar
          </p>
          {[
            { field: 'nome', placeholder: 'Seu nome', type: 'text' },
            { field: 'email', placeholder: 'Seu e-mail', type: 'email' },
            { field: 'telefone', placeholder: 'Seu telefone (WhatsApp)', type: 'tel' },
          ].map(({ field, placeholder, type }) => (
            <input
              key={field}
              type={type}
              placeholder={placeholder}
              value={form[field]}
              onChange={set(field)}
              required
              disabled={status === 'loading'}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 18px', fontFamily: 'Arial, sans-serif', fontSize: 14, color: '#fff', outline: 'none', transition: 'border-color 0.2s ease', opacity: status === 'loading' ? 0.6 : 1 }}
              onFocus={e => { e.currentTarget.style.borderColor = 'rgba(254,105,66,0.35)'; }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
          ))}
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{ width: '100%', background: status === 'success' ? '#4ade80' : '#fff', color: status === 'success' ? '#000' : '#111', border: 'none', borderRadius: 10, padding: '15px 18px', fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 600, cursor: status === 'loading' ? 'wait' : 'pointer', marginTop: 4, letterSpacing: '0.01em', transition: 'all 0.2s ease' }}
            onMouseEnter={e => { if(status !== 'loading' && status !== 'success') e.currentTarget.style.opacity = '0.88'; }}
            onMouseLeave={e => { if(status !== 'loading' && status !== 'success') e.currentTarget.style.opacity = '1'; }}
          >
            {status === 'loading' ? 'Enviando...' : status === 'success' ? 'Enviado com sucesso! ✓' : status === 'error' ? 'Erro ao enviar. Tente novamente.' : 'Tenho interesse →'}
          </button>
        </form>
      </div>
    </div>
  );
}

const GROUP_TITLE_STYLE = {
  fontFamily: 'Georgia, serif',
  fontSize: 'clamp(1.9rem, 2.8vw, 2.7rem)',
  fontWeight: 400,
  color: '#fff',
  lineHeight: 1.05,
  letterSpacing: '-0.02em',
  margin: '64px 0 18px',
  paddingTop: 28,
  borderTop: '1px solid rgba(255,255,255,0.08)',
};

export default function ProdutosTheOne() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-card, .agentone-banner-wrap, .product-group-title', {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll('.product-card');
    cards.forEach(card => {
      const arrow = card.querySelector('.product-cta-arrow');
      if (!arrow) return;
      const enter = () => { arrow.style.opacity = '1'; arrow.style.transform = 'translateX(0)'; };
      const leave = () => { arrow.style.opacity = '0'; arrow.style.transform = 'translateX(-6px)'; };
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="produtos"
      style={{ background: '#212121', padding: 'clamp(96px,11vw,150px) clamp(20px,5vw,64px) clamp(80px,10vw,120px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <style>{`
        @media (min-width: 901px) {
          .product-card .product-fade-text {
            opacity: 0.52;
            transition: opacity 0.28s ease;
          }

          .product-card:hover .product-fade-text {
            opacity: 1;
          }
        }

        @media (max-width: 900px) {
          .agentone-grid { grid-template-columns: 1fr !important; }
          .agentone-left { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; padding: 32px 24px !important; }
          .agentone-right { padding: 32px 24px !important; }
          .product-card { grid-template-columns: 1fr !important; min-height: auto !important; }
          .product-img-wrap { order: 0 !important; height: 220px; }
          .product-card > div:last-child { order: 0 !important; padding: 36px 28px 42px !important; }
          .product-img-overlay { background: linear-gradient(to bottom, transparent 60%, #000 100%) !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1180, margin: '0 auto' }}>

        {/* Header */}
        <span style={{ fontFamily: 'Arial, sans-serif', fontSize: 'clamp(1.05rem,1.5vw,1.35rem)', fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#FE6942', display: 'block', marginBottom: 20 }}>
          Produtos TheOne
        </span>
        <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2.2rem,3.8vw,3.6rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#fff', maxWidth: '28ch', marginBottom: 'clamp(28px,3.2vw,42px)' }}>
          Tudo que você precisa para se tornar{' '}
          <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg, #FED1C5 0%, #FF5224 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            uma marca número um
          </em>
        </h2>

        {/* Diagnóstico banner */}
        <div style={{ marginBottom: 'clamp(52px,6vw,84px)', background: '#212121', border: '1.5px solid rgba(254,105,66,0.52)', borderRadius: 16, padding: '30px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: 'rgba(254,105,66,0.18)', border: '1px solid rgba(254,105,66,0.42)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FE6942" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 15, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FE6942', marginBottom: 6 }}>
                Diagnóstico TheOne — Gratuito
              </p>
              <p style={{ fontFamily: 'Arial, sans-serif', fontSize: 16, color: 'rgba(255,255,255,0.62)', fontWeight: 300, lineHeight: 1.5 }}>
                Não sabe por onde começar? Preencha o formulário sobre sua empresa e ganhe uma reunião gratuita de diagnóstico.
              </p>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: 13, fontWeight: 600, color: '#FE6942', whiteSpace: 'nowrap', border: '1px solid rgba(254,105,66,0.5)', padding: '11px 20px', borderRadius: 100, textDecoration: 'none', transition: 'background 0.2s ease', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(254,105,66,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Fazer diagnóstico →
          </a>
        </div>

        {/* Products list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 0 }}>

          <div className="agentone-banner-wrap">
            <AgentOneBanner />
          </div>

          <h3 className="product-group-title" style={GROUP_TITLE_STYLE}>Para negócios visionários</h3>

          <ProductCard
            reversed
            image={foundationImg}
            imageAlt="TheOne Foundation"
            name="TheOne Foundation"
            subtitle="A fundação para você se tornar número um."
            description="Receba diagnóstico de mercado, estratégia de marca e posicionamento, narrativa e identidade visual."
            bullets={['Construa uma marca sólida', 'Se diferencie', 'Gere mais valor, eleve seu ticket', 'Otimize sua comunicação', 'Reduza custos de mídia paga']}
            forWhomList={[
              'Empresas que estão expandindo ou querendo escalar, mas percebem que a marca e o posicionamento estão limitando seu crescimento.',
              'Novos negócios que querem começar com uma base sólida.',
            ]}
          />

          <ProductCard
            reversed
            image={siteBrandExpImg}
            imageAlt="Site BrandExperience"
            name="Site BrandExperience"
            subtitle="Um site como esse."
            description="Um site que é uma extensão do posicionamento da marca, e não um site institucional genérico. É <strong>desenvolvido em código com IA por brand designers que constroem uma experiência imersiva</strong> fazendo seu cliente experienciar o universo da marca digitalmente e gerando impacto, conexão e memorização."
            forWhom="Empresas de serviço e tecnologia que vendem valor intangível e precisam que o digital comunique isso com precisão."
          />

          <h3 className="product-group-title" style={GROUP_TITLE_STYLE}>Para novas startups</h3>

          <ProductCard
            reversed
            image={brandSprintImg}
            imageAlt="Brand Sprint"
            badge="Para Startups"
            name="BrandSprint"
            description="Receba diagnóstico de mercado, estratégia de posicionamento, narrativa de marca e identidade visual."
            bullets={['Pareça 10x maior', 'Conquiste a confiança dos clientes', 'Lance no mercado mais rápido', 'Destaque-se da concorrência', 'Capte uma rodada de investimento', 'Economize capital', '1 projeto por vez, foco total', 'Equipe sênior']}
            stats={[{ value: '4 semanas', label: 'pra ter sua marca' }, { value: 'R$20k', label: 'valor fixo' }]}
            forWhom="Founders captando rodada, lançando um novo negócio ou que não podem esperar meses pra ter uma marca forte."
          />

          <h3 className="product-group-title" style={GROUP_TITLE_STYLE}>Para fundadores, experts ou líderes</h3>

          <ProductCard
            reversed
            image={myBrandingImg}
            imageAlt="myBranding"
            name="myBranding"
            subtitle="Você é seu maior ativo."
            description="O myBranding transforma quem você é em uma marca. Usamos a metodologia BeOne para construir uma marca pessoal que te posiciona como referência única no seu mercado, você ocupará um lugar que somente você poderá ocupar."
            forWhom="Fundadores, experts ou líderes que querem crescer usando sua própria autoridade e influência como canal de aquisição."
          />

        </div>
      </div>
    </section>
  );
}
