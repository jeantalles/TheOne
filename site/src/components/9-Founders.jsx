import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const CLIENT_LOGOS = [
  { src: '/images/founders-logos/o-boticario.png', alt: 'O Boticario' },
  { src: '/images/founders-logos/max-titanium.png', alt: 'Max Titanium' },
  { src: '/images/founders-logos/stihl.png', alt: 'Stihl' },
  { src: '/images/founders-logos/jacuzzi.png', alt: 'Jacuzzi' },
  { src: '/images/founders-logos/arezzo.png', alt: 'Arezzo' },
  { src: '/images/founders-logos/cyrela.png', alt: 'Cyrela' },
];

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
      className="pt-20 pb-28 md:py-32 px-6 md:px-12 lg:px-16 bg-[#212121] font-halyard overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto">

        {/* Header */}
        <div className="mb-12 md:mb-20">
          <h2 className="font-editorial text-[2.9rem] md:text-5xl lg:text-[56px] text-white leading-[1.16] md:leading-[1.1]">
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
                    className={`relative overflow-hidden w-full md:w-[40%] aspect-[4/5] md:aspect-auto md:min-h-[620px] lg:min-h-[660px] flex-shrink-0 ${
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
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:scale-[1.04]"
                    />
                    {/* Large decorative number */}
                    <span className="absolute bottom-5 right-7 hidden md:block font-editorial text-[100px] leading-none text-white/[0.06] select-none pointer-events-none">
                      {f.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`relative z-10 flex flex-col justify-center bg-[#212121] px-6 md:px-14 lg:px-16 pt-10 pb-14 md:py-16 flex-1 ${
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
                    <p className="text-[#FE6942] text-[15px] md:text-[17px] uppercase tracking-[0.18em] mb-10">
                      {f.role}
                    </p>

                    {/* Divider */}
                    <div className="w-16 h-[1px] bg-white/10 mb-10" />

                    {/* Bullets */}
                    <ul className="space-y-7 md:space-y-8">
                      {f.bullets.map((b, j) => (
                        <li key={j} className="flex gap-4 items-start">
                          <span className="text-[#FE6942] text-[1.2rem] md:text-[1.45rem] leading-none mt-1 shrink-0">→</span>
                          <p className="text-[#E1E1E1] font-light text-[20px] md:text-[26px] leading-[1.52] max-w-[34ch]">
                            {b}
                          </p>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-14 md:mt-14">
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-6 md:gap-x-5 md:gap-y-6 px-1 md:px-0">
                        {CLIENT_LOGOS.map((logo) => (
                          <div
                            key={logo.alt}
                            className="flex h-[24px] items-center justify-start md:h-[26px]"
                          >
                            <img
                              src={logo.src}
                              alt={logo.alt}
                              loading="lazy"
                              decoding="async"
                              className="max-h-full w-auto max-w-[68px] object-contain opacity-68 md:max-w-[96px]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
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
