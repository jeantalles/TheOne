import re

with open('site/src/components/PropostaAnderson.jsx', 'r') as f:
    content = f.read()

start_idx = content.find('function Calculadora({ clientName }) {')
end_idx = content.find('function Consultoria() {', start_idx)

new_calc = """function Calculadora({ clientName }) {
  return (
    <section className="bg-white min-h-[100svh] flex flex-col justify-center pt-16 md:pt-20 pb-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="mb-12 md:mb-20 text-center">
          <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold block mb-5">Investimento</span>
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.5rem,4vw,3.75rem)] leading-[1.02] tracking-tight">O que está incluso no projeto</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          <div className="flex-1 flex flex-col justify-between gap-4">
            <div className="bg-[#F8F8F8] border border-black/[0.04] rounded-2xl p-6 md:p-8 flex items-center gap-6 h-full transition-colors hover:bg-black/[0.03]">
              <div className="w-14 h-14 rounded-full bg-[#FE6942]/10 flex items-center justify-center text-[#FE6942] shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <div>
                <h3 className="font-halyard font-semibold text-[20px] md:text-[22px] text-[#181412] mb-1">Site de Advocacia</h3>
                <p className="font-halyard font-light text-black/60 text-[16px] md:text-[18px]">Design premium e implementação completa.</p>
              </div>
            </div>

            <div className="bg-[#F8F8F8] border border-black/[0.04] rounded-2xl p-6 md:p-8 flex items-center gap-6 h-full transition-colors hover:bg-black/[0.03]">
              <div className="w-14 h-14 rounded-full bg-[#FE6942]/10 flex items-center justify-center text-[#FE6942] shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
              </div>
              <div>
                <h3 className="font-halyard font-semibold text-[20px] md:text-[22px] text-[#181412] mb-1">Hospedagem The One</h3>
                <p className="font-halyard font-light text-black/60 text-[16px] md:text-[18px]">Infraestrutura de ponta com custo ZERO.</p>
              </div>
            </div>

            <div className="bg-[#F8F8F8] border border-black/[0.04] rounded-2xl p-6 md:p-8 flex items-center gap-6 h-full transition-colors hover:bg-black/[0.03]">
              <div className="w-14 h-14 rounded-full bg-[#FE6942]/10 flex items-center justify-center text-[#FE6942] shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <div>
                <h3 className="font-halyard font-semibold text-[20px] md:text-[22px] text-[#181412] mb-1">Transferência Total</h3>
                <p className="font-halyard font-light text-black/60 text-[16px] md:text-[18px]">Você é dono 100% do domínio e do código.</p>
              </div>
            </div>
          </div>

          
          <div className="flex-[0.8] bg-[#0a0a0a] rounded-2xl p-10 md:p-14 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FE6942] rounded-full blur-[140px] opacity-[0.25] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="font-halyard text-white/50 uppercase tracking-[0.2em] text-[13px] md:text-[14px] font-medium block mb-3">Investimento Único</span>
              <div className="flex items-start gap-2 mb-8 md:mb-10">
                <span className="font-halyard text-[20px] md:text-[24px] text-white/70 mt-2">R$</span>
                <span className="font-editorial text-[clamp(4.5rem,7vw,6.5rem)] leading-none text-white tracking-tight">2.500</span>
              </div>
              
              <div className="h-px w-full bg-white/[0.08] mb-8 md:mb-10" />
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#FE6942] mt-2 shrink-0" />
                  <p className="font-halyard text-[17px] md:text-[19px] text-white/70 leading-[1.4]">
                    <strong className="text-white font-medium block md:inline mb-1 md:mb-0 md:mr-2">50/50:</strong> 50% de entrada + 50% na entrega.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#FE6942] mt-2 shrink-0" />
                  <p className="font-halyard text-[17px] md:text-[19px] text-white/70 leading-[1.4]">
                    <strong className="text-white font-medium block md:inline mb-1 md:mb-0 md:mr-2">À vista:</strong> 5% de desconto.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#FE6942] mt-2 shrink-0" />
                  <p className="font-halyard text-[17px] md:text-[19px] text-white/70 leading-[1.4]">
                    <strong className="text-white font-medium block md:inline mb-1 md:mb-0 md:mr-2">Cartão:</strong> Parcelamento disponível <span className="text-white/40 text-sm whitespace-nowrap">(taxas da operadora)</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"""

content = content[:start_idx] + new_calc + content[end_idx:]

with open('site/src/components/PropostaAnderson.jsx', 'w') as f:
    f.write(content)
