import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

export default function Audience() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 1,
        }
      });
      tl.fromTo('.aud-card-left', { rotate: 0, x: 50 }, { rotate: -3, x: 0, duration: 1 }, 0);
      tl.fromTo('.aud-card-right', { rotate: 0, x: -50, backgroundColor: '#111' }, { rotate: 3, x: 0, backgroundColor: '#111', duration: 1 }, 0);
      tl.from('.aud-item', { opacity: 0.3, x: -15, stagger: 0.05, duration: 0.5 }, 0.2);

      gsap.fromTo(
        '.aud-fade-shell',
        { y: 0, opacity: 1, filter: 'blur(0px)' },
        {
          y: -90,
          opacity: 0.18,
          filter: 'blur(10px)',
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'bottom 56%',
            end: 'bottom top',
            scrub: 1.1,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const viList = [
    "Busca expansão e escala do negócio, quer se tornar uma referência ou líder.",
    "Deseja gerar um impacto transformador na sociedade.",
    "Possui visão de futuro e recusa a estagnação do mercado.",
    "Sente que tem um produto/serviço valioso, mas não consegue fazer o mercado perceber isso."
  ];

  const gmList = [
    "Atua em empresas com visão clara de liderança e escala.",
    "Vê que tem desalinhamento interno na comunicação, na cultura e no posicionamento.",
    "Sente que a marca não cresce organicamente de forma sustentável.",
    "Sente que a marca depende de mídia paga e não cresce organicamente como o necessário."
  ];

  return (
    <section id="para-quem" ref={containerRef} className="pt-44 pb-32 px-6 md:px-12 lg:px-24 bg-[#212121] relative overflow-hidden font-halyard">
      <div className="aud-fade-shell">
        <div className="max-w-7xl mx-auto mb-24 text-center">
          <h2 className="font-editorial text-[46px] md:text-6xl text-white leading-[1.1]">
            Quem nós servimos
            <span className="text-[#C7C7C7] text-[29px] font-light max-w-2xl mx-auto block mt-6 font-halyard tracking-normal">Os inconformados que tem visão.</span>
          </h2>
        </div>
        <div className="max-w-[1500px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-16">
          <div className="aud-card-left border border-[#5B5B5B] rounded-[32.7px] p-8 md:pt-12 md:pb-12 md:pl-12 md:pr-16 hover:bg-[#ffffff05] transition-colors duration-500 origin-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#FF5224]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="font-editorial text-white text-[30px] md:text-[38px] leading-tight tracking-tight mb-10 relative z-10 whitespace-nowrap">Empresários <span className="text-[#FE6942]">Visionários</span></h3>
            <div className="space-y-6 relative z-10">
              {viList.map((item, i) => (
                <div key={i} className="flex gap-4 items-start aud-item">
                  <Check size={24} strokeWidth={2} className="shrink-0 mt-0.5 md:mt-1 text-[#FE6942]" />
                  <p className="font-light text-[#C7C7C7] text-[19px] md:text-[21px] leading-[1.3]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="aud-card-right border border-[#5B5B5B] rounded-[32.7px] bg-transparent p-8 md:pt-12 md:pb-12 md:pl-12 md:pr-16 hover:bg-[#ffffff05] transition-colors duration-500 origin-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#FF5224]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h3 className="font-editorial text-white text-[30px] md:text-[38px] leading-tight tracking-tight mb-10 relative z-10">Gestores de<br /><span className="text-[#FE6942]">Growth & Marketing</span></h3>
            <div className="space-y-6 relative z-10">
              {gmList.map((item, i) => (
                <div key={i} className="flex gap-4 items-start aud-item">
                  <Check size={24} strokeWidth={2} className="shrink-0 mt-0.5 md:mt-1 text-[#FE6942]" />
                  <p className="font-light text-[#C7C7C7] text-[19px] md:text-[21px] leading-[1.3]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
