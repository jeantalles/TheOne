import { ArrowRight } from 'lucide-react';
import { navigateToPath } from '../utils/router';

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-[#212121] p-12 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-6xl font-bold mb-2">Design System</h1>
        <p className="text-white/50 mb-12">Componentes e variações para a TheOne</p>

        {/* BOTÕES SECUNDÁRIOS */}
        <section className="mb-16 p-8 bg-[#1a1a1a] rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Botões Secundários</h2>
          <div className="flex flex-wrap gap-6">
            <a
              href="#"
              className="group flex items-center gap-3 text-white/50 hover:text-white font-bold tracking-widest text-[10px] transition-all"
            >
              O QUE É A THEONE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <button className="group flex items-center gap-3 text-white/50 hover:text-white font-bold tracking-widest text-[10px] transition-all">
              PRÓXIMA SEÇÃO
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* BOTÕES FOOTER */}
        <section className="mb-16 p-8 bg-[#1a1a1a] rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Botões Footer</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="/formulario"
              onClick={(e) => {
                e.preventDefault();
                navigateToPath('/formulario');
              }}
              className="inline-block bg-[#050505] text-white font-black font-sans uppercase tracking-[0.2em] text-xs px-12 py-6 hover:bg-white hover:text-[#050505] transition-colors duration-300"
            >
              → Falar no WhatsApp
            </a>
            <a
              href="/formulario"
              onClick={(e) => {
                e.preventDefault();
                navigateToPath('/formulario');
              }}
              className="inline-block border border-[#050505] text-[#050505] font-black font-sans uppercase tracking-[0.2em] text-xs px-12 py-6 bg-white hover:bg-[#050505] hover:text-white transition-colors duration-300"
            >
              → Agendar um diagnóstico
            </a>
          </div>
        </section>

        {/* CORES */}
        <section className="mb-16 p-8 bg-[#1a1a1a] rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Paleta de Cores</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#FED1C5] rounded"></div>
              <p className="text-xs font-mono">#FED1C5</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#FF5224] rounded"></div>
              <p className="text-xs font-mono">#FF5224</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#FE6942] rounded"></div>
              <p className="text-xs font-mono">#FE6942</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 bg-[#212121] rounded border border-white/10"></div>
              <p className="text-xs font-mono">#212121</p>
            </div>
          </div>
        </section>

        {/* TIPOGRAFIA */}
        <section className="mb-16 p-8 bg-[#1a1a1a] rounded-lg border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Tipografia</h2>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-white/50 mb-2">H1 - Sans Bold 64px</p>
              <h1 className="font-sans font-bold text-4xl">Construímos marcas TheOne</h1>
            </div>
            <div>
              <p className="text-xs text-white/50 mb-2">H2 - Serifa Italic 42px</p>
              <h2 className="font-editorial italic text-3xl">A única escolha na mente do seu cliente.</h2>
            </div>
            <div>
              <p className="text-xs text-white/50 mb-2">Body - Halyard 16px</p>
              <p className="font-halyard text-base">Para negócios visionários que não querem ser mais uma opção e buscam se tornar Top 1 no seu mercado.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
