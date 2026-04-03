export default function FooterCTA() {
  return (
    <section id="contact" className="py-40 px-6 text-center bg-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 blend-overlay pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center">
        <h2 className="font-sans font-black uppercase tracking-tighter text-[12vw] md:text-8xl text-[#050505] mb-2 leading-none">
          NÃO SEJA MAIS UM.
        </h2>
        <h2 className="font-serif italic font-medium text-[10vw] md:text-7xl text-[#050505] mb-8 leading-none">
          Seja TheOne.
        </h2>
        <p className="max-w-2xl mx-auto text-[#050505]/70 text-lg font-halyard font-light leading-relaxed mb-16">
          O topo do mercado não é sorte, é construção. Se você tem visão, ambição e busca transformar sua empresa na escolha inevitável do seu cliente — estamos prontos para construir isso com você.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/5511999999999"
            className="inline-block bg-[#050505] text-white font-black font-sans uppercase tracking-[0.2em] text-xs px-12 py-6 hover:bg-white hover:text-[#050505] transition-colors duration-300"
          >
            → Falar no WhatsApp
          </a>
          <a
            href="mailto:contato@theone.com"
            className="inline-block border border-[#050505] text-[#050505] font-black font-sans uppercase tracking-[0.2em] text-xs px-12 py-6 hover:bg-[#050505] hover:text-white transition-colors duration-300"
          >
            → Agendar uma conversa
          </a>
        </div>
      </div>
    </section>
  );
}
