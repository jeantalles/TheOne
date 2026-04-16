import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const founders = [
  {
    number: '01',
    badge: 'Fundador',
    name: 'Jean Talles',
    role: 'Estrategista de Marca e Comunicação',
    bullets: [
      'Especialista em branding, comunicação e marketing com 08 anos de mercado.',
      'Liderou e estruturou o setor de comunicação para key accounts B2B e B2C na maior assessoria de marketing do país.',
      'Fundador e idealizador da TheOne, consultoria que empodera empresários visionários no Brasil.',
    ],
    img: '/images/Jean.jpeg',
    width: 1530,
    height: 2012,
  },
  {
    number: '02',
    badge: 'Co-Fundador',
    name: 'Pedro Xavier',
    role: 'Estrategista de Marketing e Funil',
    bullets: [
      '7 anos de experiência em marketing, com atuação em copy, estratégia, liderança e growth.',
      'Copy Sênior, Especialista e Head de Marketing na maior assessoria de marketing e vendas do país.',
      'Hoje conduz diagnósticos e direcionamentos estratégicos para o crescimento de empresas.',
    ],
    img: '/images/Pedro.jpeg',
    width: 1490,
    height: 2042,
  },
];

export default function Founders() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.founder-card', {
        opacity: 0,
        y: 60,
        stagger: 0.18,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="fundadores"
      ref={sectionRef}
      className="py-20 md:py-32 px-6 md:px-12 lg:px-16 bg-[#212121] font-halyard overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <div className="mb-12 md:mb-20">
          <h2 className="font-editorial text-4xl md:text-5xl lg:text-[56px] text-white leading-[1.1]">
            Quem está por trás da{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224]">
              TheOne.
            </span>
          </h2>
        </div>

        {/* Founder Cards */}
        <div className="space-y-6">
          {founders.map((f, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div
                key={i}
                className="founder-card group border border-[#5B5B5B] rounded-[32.7px] overflow-hidden hover:border-[#FE6942]/30 transition-colors duration-500"
              >
                <div className="flex flex-col md:flex-row">

                  {/* Photo */}
                  <div
                    className={`relative overflow-hidden w-full md:w-[40%] aspect-[3/4] md:aspect-auto md:min-h-[750px] flex-shrink-0 ${
                      isReversed ? 'md:order-2' : ''
                    }`}
                    style={{ background: '#1a1a1a' }}
                  >
                    <img
                      src={f.img}
                      alt={f.name}
                      width={f.width}
                      height={f.height}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                      sizes="(min-width: 768px) 40vw, 100vw"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                    />
                    {/* Large decorative number */}
                    <span className="absolute bottom-5 right-7 font-editorial text-[100px] leading-none text-white/[0.06] select-none pointer-events-none">
                      {f.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`relative z-10 flex flex-col justify-center bg-[#212121] px-6 md:px-14 lg:px-16 py-10 md:py-16 flex-1 ${
                      isReversed ? 'md:order-1' : ''
                    }`}
                  >
                    {/* Badge */}
                    <span className="inline-flex items-center text-[#FE6942] text-[11px] tracking-[0.25em] uppercase border border-[#FE6942]/30 px-4 py-1.5 rounded-full w-fit mb-8">
                      {f.badge}
                    </span>

                    {/* Name */}
                    <h3 className="font-editorial text-white text-[32px] md:text-[56px] leading-[1.05] mb-3">
                      {f.name}
                    </h3>

                    {/* Role */}
                    <p className="text-[#FE6942] text-[15px] uppercase tracking-[0.18em] mb-10">
                      {f.role}
                    </p>

                    {/* Divider */}
                    <div className="w-10 h-[1px] bg-white/10 mb-10" />

                    {/* Bullets */}
                    <ul className="space-y-6">
                      {f.bullets.map((b, j) => (
                        <li key={j} className="flex gap-4 items-start">
                          <span className="text-[#FE6942] text-base mt-0.5 shrink-0">→</span>
                          <p className="text-[#C7C7C7] font-light text-[17px] md:text-[21px] leading-[1.55]">
                            {b}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
