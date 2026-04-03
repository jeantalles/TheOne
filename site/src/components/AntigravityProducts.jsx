import React from 'react';
import { motion } from 'framer-motion';

function ProductIcon({ name, size = 54 }) {
  const icons = {
    estrategia: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF4D00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    identidade: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF4D00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    site: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF4D00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    launch: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF4D00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15 9 3-3-9-9-3 3 9z" />
      </svg>
    ),
    consultoria: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF4D00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22v-5M9 7l3 3 3-3M9 12l3 3 3-3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    conteudo: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF4D00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h6" />
      </svg>
    ),
    receita: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF4D00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    ),
    founder: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF4D00" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  };
  return icons[name] || null;
}

const FeatureCard = React.memo(({ icon, title, text, style }) => {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      className="flex gap-10 items-start group relative p-6 -mx-6 -my-6 rounded-3xl hover:bg-[#ffffff05] border border-transparent hover:border-[#ffffff10] transition-colors duration-500 ease-out will-change-transform cursor-default"
    >
      <div className="w-[60px] h-[60px] shrink-0 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <ProductIcon name={icon} />
      </div>
      <div>
        <h4 className="text-white font-normal mb-3 font-halyard transition-colors duration-500 group-hover:text-accent drop-shadow-md" style={{ fontSize: style.titulosBox }}>{title}</h4>
        <motion.p
          variants={{
            rest: { y: 0, opacity: 0.7 },
            hover: { y: -3, opacity: 1 }
          }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="text-[#C7C7C7] font-light leading-[1.3] font-halyard"
          style={{ fontSize: style.textoBox }}
        >
          {text}
        </motion.p>
      </div>
    </motion.div>
  );
});

export default function AntigravityProducts() {
  // MODIFIQUE OS TAMANHOS DE FONTE AQUI:
  const style = {
    titulosGrandes: "48px",    // TheBrand, Consultoria, Assessoria
    titulosBox: "26px",       // Estratégia, Identidade, Sistema de Conteúdo, etc.
    textoGrande: "19px",      // Parágrafos principais (Ex: "Para negócios visionários...")
    textoBox: "19px",         // Descrições técnicas dentro dos boxes cinzas
  };

  return (
    <section
      id="solucoes"
      className="bg-[#212121] py-32 px-6 md:px-12 lg:px-16 border-b border-white/5 relative overflow-hidden font-halyard"
    >
      <div className="max-w-[1700px] mx-auto">
        {/* 01 / PROJETO */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-start">
          <div className="lg:w-[20%] lg:sticky lg:top-32">
            <h2 className="text-white text-[42px] font-light leading-[1.2] mb-2 font-halyard">
              A Base para uma marca <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] font-normal">TheOne™</span>
            </h2>
          </div>

          <div className="flex-1">
            <div className="text-stone-500 text-[40px] font-light mb-16 tracking-[0.05em] font-halyard">01 / PROJETO</div>

            <div className="grid md:grid-cols-2 gap-16 relative mb-16">
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/10 -translate-x-1/2" />

              <div className="flex flex-col">
                <div className="text-[#FE6942] text-[16.59px] font-normal tracking-normal mb-8 uppercase font-halyard">CONSTRUÇÃO DE MARCA</div>
                <h3 className="text-white font-normal font-editorial mb-8 leading-tight" style={{ fontSize: style.titulosGrandes }}>TheBrand</h3>
                <p className="text-[#C7C7C7] font-extralight leading-[1.4] font-halyard" style={{ fontSize: style.textoGrande }}>
                  Para negócios visionários que estão nascendo, novas empresas, produtos ou marcas pessoais que <span className="text-white font-normal">precisam de um posicionamento inevitável desde o dia zero.</span> Construimos sua marca TheOne™ para nascer como referência e com impacto imediato no mercado.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="text-[#FE6942] text-[16.59px] font-normal tracking-normal mb-8 uppercase font-halyard">REPOSICIONAMENTO DE MARCA</div>
                <h3 className="text-white font-normal font-editorial mb-8 leading-tight" style={{ fontSize: style.titulosGrandes }}>TheRebrand</h3>
                <p className="text-[#C7C7C7] font-extralight leading-[1.4] font-halyard" style={{ fontSize: style.textoGrande }}>
                  Para negócios visionários que <span className="text-white font-normal">mudaram seu portfólio ou modelo de negócio, que não são mais percebidos à altura do que entregam</span> ou buscam atingir um novo público. Ajustamos a rota para elevar seu valor de mercado.
                </p>
              </div>
            </div>

            <div className="bg-transparent border border-[#5B5B5B] rounded-[32.7px] py-16 px-12 md:px-16">
              <div className="grid md:grid-cols-2 gap-y-20 gap-x-16">
                <FeatureCard
                  icon="estrategia"
                  title="Estratégia de marca"
                  text="Construção da fundação da sua marca. Através de pesquisas e workshops construimos seu posicionamento inevitável."
                  style={style}
                />
                <FeatureCard
                  icon="identidade"
                  title="Identidade"
                  text="Traduzimos a estratégia em identidade. Criação de nome, identidade visual e comunicação verbal, garantindo que sua marca tenha uma personalidade própria e diferenciadora."
                  style={style}
                />
                <FeatureCard
                  icon="site"
                  title="Site Brand Experience"
                  text="Um site que vai muito além do institucional. Desenvolvemos uma experiência imersiva que serve como extensão do seu posicionamento, focada em gerar engajamento, conexão com os clientes e conversão."
                  style={style}
                />
                <FeatureCard
                  icon="launch"
                  title="Launch"
                  text="Conduzimos estrategicamente todo o processo de entrada no mercado, garantindo que o nascimento da sua marca ou rebranding aconteça de forma impactante."
                  style={style}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 02 / OPERAÇÃO */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-start">
          <div className="lg:w-[20%] lg:sticky lg:top-32">
            <h2 className="text-white text-[42px] font-light leading-[1.2] mb-2 font-halyard">
              A Efetivação <br />
              de uma marca <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] font-normal">TheOne™</span>
            </h2>
          </div>

          <div className="flex-1">
            <div className="text-stone-500 text-[40px] font-light mb-16 tracking-[0.05em] font-halyard">02 / OPERAÇÃO</div>

            <div className="grid md:grid-cols-2 gap-16 relative mb-16">
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/10 -translate-x-1/2" />

              <div className="flex flex-col">
                <div className="text-[#FE6942] text-[16.59px] font-normal tracking-normal mb-8 uppercase font-halyard">Inteligência Estratégica</div>
                <h3 className="text-white font-normal font-editorial mb-8 leading-tight" style={{ fontSize: style.titulosGrandes }}>Consultoria <br /> TheOne</h3>
                <p className="text-[#C7C7C7] font-extralight leading-[1.4] font-halyard" style={{ fontSize: style.textoGrande }}>
                  <span className="text-white font-normal">Para negócios visionários que já possuem equipe de marketing interna, nós atuamos como a inteligência estratégica.</span> Damos o norte, o diagnóstico e as diretrizes do que precisa ser feito para você crescer rumo a Top #01 no mercado.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="text-[#FE6942] text-[16.59px] font-normal tracking-normal mb-8 uppercase font-halyard">Aliado Operacional</div>
                <h3 className="text-white font-normal font-editorial mb-8 leading-tight" style={{ fontSize: style.titulosGrandes }}>Assessoria <br /> TheOne</h3>
                <p className="text-[#C7C7C7] font-extralight leading-[1.4] font-halyard" style={{ fontSize: style.textoGrande }}>
                  Para negócios visionários que não possuem time interno de marketing. <span className="text-white font-normal">Além da inteligência estratégica, nós seremos os aliados na linha de frente.</span> Atuamos lado a lado assumindo a operação estratégica e a gestión do marketing, garantindo que cada ponto de contato esteja alinhado para sua marca se tornar inevitável.
                </p>
              </div>
            </div>

            <div className="bg-transparent border border-[#5B5B5B] rounded-[32.7px] py-16 px-12 md:px-16">
              <div className="grid md:grid-cols-2 gap-y-20 gap-x-16">
                <FeatureCard
                  icon="conteudo"
                  title="Sistema de Conteúdo"
                  text="Seu posicionamento acontecendo no digital. Sistematizamos sua produção de conteúdo para fazer com que sua marca seja vista, lembrada e comprada."
                  style={style}
                />
                <FeatureCard
                  icon="receita"
                  title="Branding / Marketing / Growth"
                  text="A união dos três pilares para gerar receita. Fugimos das campanhas aleatórias para construir uma estrutura de marketing personalizada, onde o crescimento da empresa e o fortalecimento da sua marca caminham juntos."
                  style={{ ...style, titulosBox: "26px" }}
                />
                <FeatureCard
                  icon="founder"
                  title="Fundador Posicionado"
                  text="Transformamos o fundador em um poderoso canal de aquisição. Ao humanizar a marca e construir uma autoridade inabalável, ampliamos o potencial de conexão com o público e abrimos novas portas de crescimento através da influência do founder."
                  style={{ ...style, titulosBox: "29.3px", textoBox: "18.41px" }}
                />
                <FeatureCard
                  icon="receita"
                  title="Arquitetura de Receita"
                  text="Revelamos o dinheiro que sua marca está deixando na mesa. Analisamos seu portfólio e sua escada de valor de acordo com seu posicionamento, definindo novas ofertas e a precificação ideal para maximizar o faturamento e a lucratividade do negócio."
                  style={{ ...style, titulosBox: "29.3px", textoBox: "18.41px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
