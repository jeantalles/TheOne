import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Cases() {
  const cases = [
    { 
      title: 'TechNova', 
      subtitle: 'Reposicionamento e Escala', 
      result: '+300% de percepção de valor',
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop',
      id: 1
    },
    { 
      title: 'Studio Alpha', 
      subtitle: 'Construção de Marca Zero', 
      result: 'Liderança regional garantida',
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2940&auto=format&fit=crop',
      id: 2
    },
    { 
      title: 'Nexus Data', 
      subtitle: 'Rebranding Internacional', 
      result: 'Aquisição Série A de $10M',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop',
      id: 3
    }
  ];

  return (
    <section id="cases" className="bg-[#212121] py-32 px-6 md:px-12 lg:px-16 border-b border-white/5 font-halyard relative">
      <div className="max-w-[1700px] mx-auto">
        <div className="flex flex-col items-center text-center mb-24 lg:mb-32">
          <h2 className="text-white text-[46px] md:text-[60px] font-light leading-[1.1] mb-6">
            Marcas construídas <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] font-normal">para liderar</span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-24 md:gap-32 w-full">
          {cases.map((c, i) => (
            <motion.div 
              key={c.id} 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="w-full md:w-[90%] lg:w-[80%] h-[50vh] md:h-[65vh] relative rounded-3xl overflow-hidden group cursor-pointer"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center origin-center transition-transform duration-[1.2s] ease-[0.23,1,0.32,1] group-hover:scale-[1.03]"
                style={{ backgroundImage: `url(${c.image})` }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
              
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between transition-colors duration-500 group-hover:bg-black/50 group-hover:border-white/20">
                  <div className="mb-4 md:mb-0">
                    <p className="text-accent text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase font-mono mb-2 md:mb-3">{c.subtitle}</p>
                    <h3 className="text-white text-3xl md:text-5xl font-editorial font-normal leading-none mb-2 md:mb-3">{c.title}</h3>
                    <p className="text-[#C7C7C7] text-lg md:text-xl font-light leading-snug">{c.result}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-white text-[13px] tracking-[0.1em] uppercase font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[0.23,1,0.32,1]">Explorar</span>
                    <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white/10 border border-white/20 backdrop-blur-md group-hover:bg-white group-hover:text-[#212121] transition-all duration-500 text-white">
                      <ArrowUpRight size={22} className="transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
