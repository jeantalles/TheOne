import { useState, useRef, useEffect, useCallback } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';
import { navigateToPath } from '../utils/router';

const STEPS = [
  { label: 'Vamos começar.', title: 'Quem é você?' },
  { label: 'Seu negócio.', title: 'Fala da sua empresa.' },
  { label: 'O contexto.', title: 'Qual é o momento atual?' },
];

const PAPEL_OPTIONS = ['Empresário / fundador', 'Gestor de receita / vendas', 'Sócio', 'Outro'];
const DESAFIO_OPTIONS = ['Previsibilidade de receita', 'Time comercial', 'CAC alto', 'Posicionamento de marca'];

const labelStyle = {
  fontSize: 16,
  letterSpacing: '0.06em',
  color: 'rgba(255,255,255,0.45)',
  fontFamily: 'inherit',
  fontWeight: 400,
};

// ── Primitives ──────────────────────────────────────────────────────────────

function QInput({ label, showLabel = false, labelFontSize = 16, value, onChange, onKeyDown, type = 'text', inputMode, pattern, placeholder, autoFocus }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: showLabel ? 8 : 0 }}>
      {showLabel && label && (
        <span style={{
          fontSize: labelFontSize,
          letterSpacing: '0.06em',
          color: focused ? '#FF4D00' : 'rgba(255,255,255,0.45)',
          fontFamily: 'inherit',
          fontWeight: 400,
          transition: 'color 160ms',
        }}>
          {label}
        </span>
      )}
      <input
        type={type}
        inputMode={inputMode}
        pattern={pattern}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder || label}
        autoFocus={autoFocus}
        autoComplete="off"
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: `1.5px solid ${focused ? '#FF4D00' : 'rgba(255,255,255,0.13)'}`,
          color: '#ffffff',
          fontSize: 18,
          fontFamily: 'inherit',
          padding: '12px 0',
          outline: 'none',
          transition: 'border-color 160ms',
          caretColor: '#FF4D00',
        }}
      />
    </div>
  );
}

function QTextarea({ label, showLabel = false, labelFontSize = 16, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: showLabel ? 8 : 0 }}>
      {showLabel && label && (
        <span style={{
          fontSize: labelFontSize,
          letterSpacing: '0.06em',
          color: focused ? '#FF4D00' : 'rgba(255,255,255,0.45)',
          fontFamily: 'inherit',
          fontWeight: 400,
          transition: 'color 160ms',
        }}>
          {label}
        </span>
      )}
      <textarea
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder || label}
        rows={4}
        style={{
          width: '100%',
          minHeight: 116,
          resize: 'vertical',
          background: 'transparent',
          border: 'none',
          borderBottom: `1.5px solid ${focused ? '#FF4D00' : 'rgba(255,255,255,0.13)'}`,
          color: '#ffffff',
          fontSize: 18,
          lineHeight: 1.45,
          fontFamily: 'inherit',
          padding: '12px 0',
          outline: 'none',
          transition: 'border-color 160ms',
          caretColor: '#FF4D00',
        }}
      />
    </div>
  );
}

function QChips({ options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              background: selected ? 'rgba(255,77,0,0.09)' : 'transparent',
              border: `1.5px solid ${selected ? '#FF4D00' : 'rgba(255,255,255,0.13)'}`,
              borderRadius: 999,
              color: selected ? '#FF4D00' : 'rgba(255,255,255,0.7)',
              fontSize: 14,
              fontFamily: 'inherit',
              padding: '9px 20px',
              cursor: 'pointer',
              transition: 'border-color 160ms, color 160ms, background 160ms',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function NextButton({ onClick, disabled }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: disabled
          ? 'rgba(255,255,255,0.07)'
          : hovered ? '#FF5A10' : '#FF4D00',
        border: 'none',
        borderRadius: 999,
        color: disabled ? 'rgba(255,255,255,0.25)' : '#fff',
        fontSize: 16,
        fontFamily: 'inherit',
        padding: '0 40px',
        height: 52,
        cursor: disabled ? 'default' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        transition: 'background 160ms, transform 120ms',
        transform: hovered && !disabled ? 'scale(1.02)' : 'scale(1)',
        letterSpacing: '0.01em',
        fontWeight: 500,
        justifyContent: 'center',
      }}
    >
      Avançar
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

function SubmitButton({ onClick, disabled, loading }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: disabled || loading
          ? 'rgba(255,255,255,0.07)'
          : hovered ? '#FF5A10' : '#FF4D00',
        border: 'none',
        borderRadius: 999,
        color: disabled || loading ? 'rgba(255,255,255,0.25)' : '#fff',
        fontSize: 16,
        fontFamily: 'inherit',
        padding: '0 40px',
        height: 52,
        cursor: disabled || loading ? 'default' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        transition: 'background 160ms, transform 120ms',
        transform: hovered && !disabled && !loading ? 'scale(1.02)' : 'scale(1)',
        letterSpacing: '0.01em',
        fontWeight: 500,
        minWidth: 160,
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="28" strokeDashoffset="10" strokeLinecap="round"/>
          </svg>
          Enviando...
        </>
      ) : (
        <>
          Enviar
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </>
      )}
    </button>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function QualificacaoPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [phase, setPhase] = useState('idle');
  const timerRef = useRef(null);

  const [form, setForm] = useState({
    nome: '', whatsapp: '', email: '',
    empresa: '', papel: '', papelOutro: '', contexto: '',
    desafio: '', faturamento: '', meta: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const changeStep = useCallback((next) => {
    const dir = next > step ? 1 : -1;
    setDirection(dir);

    if (prefersReducedMotion) {
      setStep(next);
      return;
    }

    setPhase('leaving');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setStep(next);
      setPhase('entering');
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase('idle')));
    }, 220);
  }, [step, prefersReducedMotion]);

  const handleNext = useCallback(() => { if (step < 2) changeStep(step + 1); }, [step, changeStep]);
  const handleBack = useCallback(() => {
    if (step > 0) changeStep(step - 1);
    else navigateToPath('/');
  }, [step, changeStep]);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const setDigits = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value.replace(/\D/g, '') }));

  const setCurrency = (field) => (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    if (!digits) { setForm(f => ({ ...f, [field]: '' })); return; }
    const formatted = 'R$ ' + parseInt(digits, 10).toLocaleString('pt-BR');
    setForm(f => ({ ...f, [field]: formatted }));
  };
  const setChoice = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const onEnterAdvance = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleNext(); }
  };
  const onEnterSubmit = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); if (step3Valid) handleSubmit(); }
  };

  const step1Valid = form.nome.trim() && form.whatsapp.trim();
  const effectivePapel = form.papel === 'Outro' ? form.papelOutro.trim() : form.papel;
  const step2Valid = form.empresa.trim() && effectivePapel;
  const step3Valid = form.desafio;
  const canAdvance = [step1Valid, step2Valid, step3Valid][step];

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/submit-qualificacao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, papel: effectivePapel }),
      });
      if (!res.ok) {
        console.warn('Falha no envio para API, checar variáveis de ambiente. Continuando para o WhatsApp.');
      }

      const parts = [
        `Olá, vim pelo site da TheOne e já preenchi o formulário.`,
        ``,
        `*Nome:* ${form.nome}`,
        form.whatsapp ? `*WhatsApp:* ${form.whatsapp}` : null,
        form.email ? `*E-mail:* ${form.email}` : null,
        ``,
        `*Empresa:* ${form.empresa}${form.contexto ? ` — ${form.contexto}` : ''}`,
        `*Papel:* ${effectivePapel}`,
        ``,
        `*Desafio:* ${form.desafio}`,
        form.faturamento ? `*Faturamento atual:* ${form.faturamento}` : null,
        form.meta ? `*Meta:* ${form.meta}` : null,
      ].filter(Boolean).join('\n');

      window.location.href = `https://wa.me/5551997513675?text=${encodeURIComponent(parts)}`;
    } catch {
      setError('Algo deu errado. Tente novamente.');
      setLoading(false);
    }
  };

  const progress = ((step + 1) / 3) * 100;

  const slideStyle = () => {
    if (prefersReducedMotion) return {};
    if (phase === 'leaving') return { transform: direction > 0 ? 'translateX(-28px)' : 'translateX(28px)', opacity: 0 };
    if (phase === 'entering') return { transform: direction > 0 ? 'translateX(28px)' : 'translateX(-28px)', opacity: 0 };
    return { transform: 'translateX(0)', opacity: 1 };
  };

  return (
    <div style={{ position: 'relative', minHeight: '100dvh', background: '#070707', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <MeshGradient
          speed={0.4}
          scale={1.4}
          distortion={0.12}
          swirl={0.6}
          colors={['#000000', '#6E1905', '#6E1905', '#000000']}
          style={{ width: '100%', height: '100%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />
      </div>

      {/* Header */}
      <header style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px 0' }}>
        <button
          onClick={handleBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.72)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontFamily: 'inherit', padding: '8px 0', transition: 'color 160ms' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.95)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.72)'}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {step > 0 ? 'Voltar' : 'Início'}
        </button>

        <img
          src="/logo-navbar.svg"
          alt="The One"
          style={{ height: 52, opacity: 1 }}
        />

        <span style={{ width: 36 }} aria-hidden="true" />
      </header>

      {/* Progress bar */}
      <div style={{ position: 'relative', zIndex: 10, margin: '34px 32px 0', height: 2, background: 'rgba(255,255,255,0.16)', borderRadius: 999 }}>
        <div style={{ height: '100%', width: `${progress}%`, background: '#FF4D00', borderRadius: 999, transition: 'width 380ms cubic-bezier(0.23, 1, 0.32, 1)' }} />
        {[1, 2, 3].map((marker, index) => {
          const active = step >= index;
          return (
            <span
              key={marker}
              style={{
                position: 'absolute',
                left: `${index * 50}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 24,
                height: 24,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: active ? '#FF4D00' : '#21100a',
                border: `1.5px solid ${active ? '#FF4D00' : 'rgba(255,255,255,0.24)'}`,
                color: active ? '#1b0700' : 'rgba(255,255,255,0.72)',
                fontFamily: 'inherit',
                fontSize: 12,
                fontWeight: 600,
                lineHeight: 1,
                transition: 'background 220ms, border-color 220ms, color 220ms',
              }}
            >
              {marker}
            </span>
          );
        })}
      </div>

      {/* Content */}
      <main style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(32px, 6vw, 64px) 24px 48px' }}>
        <div
          style={{
            width: '100%',
            maxWidth: 540,
            transition: prefersReducedMotion ? 'opacity 160ms ease' : 'transform 240ms cubic-bezier(0.23, 1, 0.32, 1), opacity 240ms ease',
            ...slideStyle(),
          }}
        >
          {/* Step heading */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FF4D00', fontFamily: 'inherit', marginBottom: 12, fontWeight: 500 }}>
              {STEPS[step].label}
            </p>
            <h1 className="font-editorial" style={{ fontSize: 'clamp(2rem, 5.5vw, 3rem)', fontWeight: 400, color: '#ffffff', lineHeight: 1.1, letterSpacing: '-0.025em', margin: 0 }}>
              {STEPS[step].title}
            </h1>
          </div>

          {/* Step 1: identidade */}
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <QInput label="Nome" value={form.nome} onChange={set('nome')} onKeyDown={onEnterAdvance} placeholder="Seu nome completo" autoFocus />
              <QInput label="WhatsApp" value={form.whatsapp} onChange={setDigits('whatsapp')} onKeyDown={onEnterAdvance} type="tel" inputMode="numeric" pattern="[0-9]*" placeholder="51999990000" />
              <QInput label="E-mail" value={form.email} onChange={set('email')} onKeyDown={onEnterAdvance} type="email" placeholder="seu@email.com" />
            </div>
          )}

          {/* Step 2: empresa */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <QInput label="Nome da empresa" value={form.empresa} onChange={set('empresa')} onKeyDown={onEnterAdvance} placeholder="Nome da empresa" autoFocus />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={labelStyle}>Qual é o seu papel?</span>
                <QChips options={PAPEL_OPTIONS} value={form.papel} onChange={(v) => setChoice('papel', v)} />
                {form.papel === 'Outro' && (
                  <QInput label="Outro papel" value={form.papelOutro} onChange={set('papelOutro')} onKeyDown={onEnterAdvance} placeholder="Digite seu papel" />
                )}
              </div>
              <QTextarea label="O que sua empresa faz" showLabel labelFontSize={16} value={form.contexto} onChange={set('contexto')} placeholder="Uma frase é o suficiente" />
            </div>
          )}

          {/* Step 3: momento */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <QTextarea label="Qual é o maior desafio do seu negócio hoje" value={form.desafio} onChange={set('desafio')} placeholder="Qual é o maior desafio do seu negócio hoje" />
              <QInput label="Faturamento atual" showLabel value={form.faturamento} onChange={setCurrency('faturamento')} onKeyDown={onEnterSubmit} placeholder="Ex: R$100K/mês" />
              <QInput label="Meta de faturamento" showLabel value={form.meta} onChange={setCurrency('meta')} onKeyDown={onEnterSubmit} placeholder="Ex: R$300K/mês" />
            </div>
          )}

          {/* Actions */}
          <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {step < 2 && (
              <NextButton onClick={handleNext} disabled={!canAdvance} />
            )}
            {step === 2 && (
              <SubmitButton onClick={handleSubmit} disabled={!canAdvance} loading={loading} />
            )}
            {error && (
              <p style={{ fontSize: 13, color: '#FF6B6B', fontFamily: 'inherit', margin: 0 }}>
                {error}
              </p>
            )}
            {step < 2 && (
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', fontFamily: 'inherit', margin: 0, letterSpacing: '0.02em' }}>
                Pressione Enter ↵ para avançar
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
