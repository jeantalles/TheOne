import React from 'react';

export default function NomeClienteSlide({ clientName, setClientName, onGenerateLink }) {
  return (
    <section
      className="relative overflow-hidden flex flex-col justify-center items-center"
      style={{ height: '100svh', background: '#0a0a0a', padding: '48px 56px' }}
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

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '600px' }}>
        
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Nome do projeto"
          className="w-full bg-transparent border-b border-white/20 text-center font-editorial text-white placeholder:text-white/20 focus:outline-none focus:border-[#FE6942] transition-colors"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', paddingBottom: '12px', marginBottom: '60px' }}
        />

        <button
          onClick={onGenerateLink}
          className="bg-white/10 hover:bg-[#FE6942] text-white px-8 py-4 rounded-full font-halyard font-medium tracking-wide transition-colors text-[16px]"
        >
          Avançar
        </button>
      </div>
    </section>
  );
}
