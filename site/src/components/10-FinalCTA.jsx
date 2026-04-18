import { MeshGradient } from '@paper-design/shaders-react';
import PrimaryCTAButton from './PrimaryCTAButton';

export default function FinalCTA() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-8 md:px-8 md:py-10"
      style={{
        background: '#212121',
        minHeight: '100dvh',
      }}
    >
      <div
        className="relative z-10 flex w-[90%] max-w-[1720px] items-center justify-center overflow-hidden rounded-[36px] px-6 py-12 text-center md:px-12"
        style={{
          minHeight: 'clamp(560px, 72vh, 700px)',
          background: '#F85324',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16), 0 28px 80px rgba(0,0,0,0.24)',
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <MeshGradient
            speed={0.65}
            scale={0.78}
            distortion={0.16}
            swirl={0.72}
            frame={555678.3200000016}
            colors={['#F85324', '#FF6A39', '#C43500', '#F85324']}
            style={{ width: '100%', height: '100%' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 34%, rgba(0,0,0,0.05) 100%)',
            }}
          />
        </div>

        <div className="flex max-w-[980px] flex-col items-center justify-center">
          <h1
            className="font-editorial tracking-[-0.03em] text-[#181412]"
            style={{
              fontSize: 'clamp(3.9rem, 7.8vw, 6.9rem)',
              lineHeight: 0.92,
              opacity: 0.94,
              fontWeight: 400,
              marginBottom: '42px',
            }}
          >
            <span className="block">Torne-se a escolha</span>
            <span className="block">número um.</span>
          </h1>

          <div className="flex items-center justify-center">
            <PrimaryCTAButton
              href="https://wa.me/5551997513675?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20TheOne%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es"
              background="#181412"
              boxShadow="0 12px 30px rgba(24,20,18,0.18)"
              hoverBoxShadow="0 18px 40px rgba(24,20,18,0.28)"
              textColor="#f5eee8"
              style={{
                fontSize: 'clamp(1rem, 4.2vw, 1.1875rem)',
                height: 'clamp(60px, 14vw, 72px)',
                padding: '0 clamp(1.95rem, 8.2vw, 4.75rem)',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
            >
              Quero ser TheOne
            </PrimaryCTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
