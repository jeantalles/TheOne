import { FolderOpen, FolderClosed, ArrowUpRight } from 'lucide-react';

export default function Cases() {
  const cases = [
    { title: 'TechNova', subtitle: 'Reposicionamento e Escala', result: '+300% de percepção de valor' },
    { title: 'Studio Alpha', subtitle: 'Construção de Marca Zero', result: 'Liderança regional garantida' }
  ];

  return (
    <section id="cases" className="py-32 px-6 md:px-12 lg:px-24 bg-[#212121] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-accent text-[10px] font-mono font-bold tracking-[0.2em] uppercase block mb-4">Provas</span>
          <h2 className="font-sans font-black uppercase tracking-tighter text-4xl md:text-6xl text-white">CASES: A MARCA ACONTECENDO.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {cases.map((c, i) => (
            <div key={i} className="group relative bg-[#0a0a0a] border border-white/10 p-10 hover:border-accent/50 transition-colors duration-300 cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-16">
                  <FolderClosed size={48} strokeWidth={1} className="text-white/40 group-hover:hidden" />
                  <FolderOpen size={48} strokeWidth={1} className="text-accent hidden group-hover:block" />
                  <ArrowUpRight size={24} className="text-white/20 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-3xl font-black font-sans uppercase tracking-tight text-white mb-2">{c.title}</h3>
                  <p className="text-white/50 text-sm font-bold uppercase tracking-widest font-mono mb-6">{c.subtitle}</p>
                  <p className="text-accent font-serif italic text-xl">{c.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-center mt-12 font-mono text-xs uppercase tracking-[0.2em]">* Estudo de casos detalhados disponíveis sob reunião estratégica.</p>
      </div>
    </section>
  );
}
