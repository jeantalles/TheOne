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
    <section id="para-quem" ref={containerRef} className="py-32 px-6 md:px-12 lg:px-24 bg-[#212121] border-b border-white/5 relative overflow-hidden font-halyard">
      <div className="max-w-7xl mx-auto mb-24 text-center">
        <h2 className="font-editorial text-4xl md:text-6xl text-white leading-[1.1]">
          Para quem é a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] italic">TheOne?</span> <br />
          <span className="text-[#C7C7C7] text-[19px] font-light max-w-2xl mx-auto block mt-6 font-halyard uppercase tracking-widest">Para os inconformados e visionários.</span>
        </h2>
      </div>
      <div className="max-w-[1500px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-16">
        <div className="aud-card-left border border-[#5B5B5B] rounded-[32.7px] p-8 md:p-12 hover:bg-[#ffffff05] transition-colors duration-500 origin-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#FF5224]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h3 className="font-editorial text-white text-[36px] md:text-[44px] leading-tight tracking-tight mb-10 relative z-10">Empresários<br />Visionários</h3>
          <div className="space-y-6 relative z-10">
            {viList.map((item, i) => (
              <div key={i} className="flex gap-4 items-start aud-item">
                <Check size={24} strokeWidth={2} className="shrink-0 mt-0.5 md:mt-1 text-[#FE6942]" />
                <p className="font-light text-[#C7C7C7] text-[19px] md:text-[21px] leading-[1.3]">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="aud-card-right border border-[#5B5B5B] rounded-[32.7px] bg-transparent p-8 md:p-12 hover:bg-[#ffffff05] transition-colors duration-500 origin-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#FF5224]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h3 className="font-editorial text-white text-[36px] md:text-[44px] leading-tight tracking-tight mb-10 relative z-10">Gestores de<br /><span className="text-[#FE6942] italic">Growth & Marketing</span></h3>
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
    </section>
  );
}
