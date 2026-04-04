import React from 'react';
import { motion } from 'framer-motion';

function GradientStrokeDefs() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none">
      <defs>
        <linearGradient id="productsIconGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FED1C5" />
          <stop offset="1" stopColor="#FF5224" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ProductIcon({ name, size = 54 }) {
  const icons = {
    // Mira: representa posicionamento — você mira em um lugar no mercado
    estrategia: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#productsIconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="12" y1="2" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="22" />
        <line x1="2" y1="12" x2="8" y2="12" />
        <line x1="16" y1="12" x2="22" y2="12" />
      </svg>
    ),
    // Olho: identidade visual — como sua marca é vista e percebida
    identidade: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#productsIconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    // Monitor com linhas de conteúdo: site como experiência de marca
    site: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#productsIconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M6 8h4M6 11h7" />
      </svg>
    ),
    // Foguete (Lucide completo): entrada no mercado de forma impactante
    launch: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#productsIconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    // Bússola: inteligência estratégica, dá o norte
    consultoria: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#productsIconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
    // Camadas: conteúdo sistematizado em layers
    conteudo: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#productsIconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
      </svg>
    ),
    // Trending up: branding + marketing + growth em crescimento contínuo
    growth: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#productsIconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    // Gráfico de barras: arquitetura de receita — estrutura que gera faturamento
    receita: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#productsIconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18 17V9" />
        <path d="M13 17V5" />
        <path d="M8 17v-3" />
      </svg>
    ),
    // Megafone: o fundador como canal de voz, broadcast e aquisição
    founder: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#productsIconGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </svg>
    ),
  };
  return icons[name] || null;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.985, filter: "blur(10px)" },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1], delay },
  }),
  hover: { opacity: 1, y: 0 },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.08 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.14 },
  },
};

const textVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 0.7,
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: 0.2 },
  },
  hover: { y: -3, opacity: 1 },
};

const FeatureCard = React.memo(({ icon, title, text, style, index = 0 }) => {
  return (
    <motion.div
      variants={cardVariants}
      custom={index * 0.18}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35, margin: "-8% 0px -8% 0px" }}
      whileHover="hover"
      className="flex gap-10 items-start group relative p-6 -mx-6 -my-6 rounded-3xl hover:bg-[#ffffff05] border border-transparent hover:border-[#ffffff10] transition-colors duration-500 ease-out will-change-transform cursor-default"
    >
      <motion.div
        variants={iconVariants}
        className="w-[60px] h-[60px] shrink-0 flex items-center justify-center relative"
      >
        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <ProductIcon name={icon} />
      </motion.div>
      <motion.div variants={contentVariants}>
        <h4 className="text-white font-normal mb-3 font-halyard transition-colors duration-500 group-hover:text-accent drop-shadow-md" style={{ fontSize: style.titulosBox }}>{title}</h4>
        <motion.p
          variants={textVariants}
          className="text-[#C7C7C7] font-light leading-[1.3] font-halyard"
          style={{ fontSize: style.textoBox }}
        >
          {text}
        </motion.p>
      </motion.div>
    </motion.div>
  );
});

export default function AntigravityProducts() {
  // MODIFIQUE OS TAMANHOS DE FONTE AQUI:
  const style = {
    titulosGrandes: "55px",    // TheBrand, Consultoria, Assessoria
    titulosBox: "26px",       // Estratégia, Identidade, Sistema de Conteúdo, etc.
    textoGrande: "21px",      // Parágrafos principais (Ex: "Para negócios visionários...")
    textoBox: "19px",         // Descrições técnicas dentro dos boxes cinzas
  };

  return (
    <section
      id="solucoes"
      className="bg-[#212121] py-32 px-6 md:px-12 lg:px-16 border-b border-white/5 relative font-halyard"
    >
      <GradientStrokeDefs />
      <div className="max-w-[1700px] mx-auto">
        <motion.div
          initial={{ opacity: 0.2, y: 28, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.92, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.95, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center justify-center text-center pt-8 md:pt-10 pb-[100px] mb-24 lg:mb-32"
        >
          <h1 className="text-white text-[36px] md:text-[54px] lg:text-[62px] font-normal leading-[1.08] tracking-[-0.02em] font-editorial whitespace-nowrap">
            Como sua marca se torna <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] font-normal">TheOne</span><span className="font-halyard text-[0.5em] align-top text-[#FF9E84] ml-1 inline-block">™</span>
          </h1>
          <p className="mt-6 text-[#C7C7C7] text-[29px] font-light font-halyard">
            Seu projeto será desenhado de forma personalizada.
          </p>
        </motion.div>

        {/* 01 / PROJETO */}
        <motion.div
          initial={{ opacity: 0, y: 64 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.34, margin: "0px 0px -14% 0px" }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col lg:flex-row gap-16 lg:gap-12 mb-24 lg:mb-48 items-start"
        >
          <div className="lg:w-[20%]">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-white text-[42px] font-light leading-[1.2] mb-2 font-halyard">
                Construindo a fundação <br />
                para se tornar <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] font-normal">inevitável</span>
              </h2>
              <div className="text-stone-500 text-[31px] font-light mt-10 tracking-[0.05em] font-halyard">01 / PROJETO</div>
            </div>
            <div className="hidden lg:block h-[360px] pointer-events-none" aria-hidden="true" />
          </div>

          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-16 relative mb-16">
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/10 -translate-x-1/2" />

              <div className="flex flex-col">
                <div className="text-[#FE6942] text-[16.59px] font-normal tracking-normal mb-5 uppercase font-halyard">CONSTRUÇÃO DE MARCA</div>
                <h3 className="text-white font-normal font-editorial mb-6 leading-tight" style={{ fontSize: style.titulosGrandes }}>TheBrand</h3>
                <p className="text-[#C7C7C7] font-extralight leading-[1.4] font-halyard" style={{ fontSize: style.textoGrande }}>
                  <span className="text-white font-normal">Para negócios visionários que estão nascendo, novos produtos ou marcas pessoais que buscam ser inevitáveis.</span> Construimos sua marca para ser TheOne na mente do seu cliente, se tornar referência e impactar o mercado.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="text-[#FE6942] text-[16.59px] font-normal tracking-normal mb-5 uppercase font-halyard">REPOSICIONAMENTO DE MARCA</div>
                <h3 className="text-white font-normal font-editorial mb-6 leading-tight" style={{ fontSize: style.titulosGrandes }}>TheRebrand</h3>
                <p className="text-[#C7C7C7] font-extralight leading-[1.4] font-halyard" style={{ fontSize: style.textoGrande }}>
                  Para negócios visionários que mudaram seu portfólio ou modelo de negócio, não são percebidos à altura do que entregam ou buscam atingir um novo público. Reposicionamos sua marca para elevar seu valor de mercado.
                </p>
              </div>
            </div>

            <div className="bg-transparent border border-[#5B5B5B] rounded-[32.7px] pt-12 pb-16 px-12 md:px-16">
              <div className="mb-12 flex justify-start">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] tracking-[0.14em] uppercase text-[#C7C7C7] font-halyard">
                  Solucoes modulares
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-y-20 gap-x-16">
                <FeatureCard index={0}
                  icon="estrategia"
                  title="Estratégia de marca"
                  text="Construção da fundação da sua marca. Através de pesquisas e workshops construimos seu posicionamento inevitável."
                  style={style}
                />
                <FeatureCard index={1}
                  icon="identidade"
                  title="Identidade"
                  text="Traduzimos a estratégia em identidade. Criação de nome, identidade visual e comunicação verbal, garantindo que sua marca tenha uma personalidade própria e diferenciadora."
                  style={style}
                />
                <FeatureCard index={2}
                  icon="site"
                  title="Site Brand Experience"
                  text="Um site que vai muito além do institucional. Desenvolvemos uma experiência imersiva que serve como extensão do seu posicionamento, focada em gerar engajamento, conexão com os clientes e conversão."
                  style={style}
                />
                <FeatureCard index={3}
                  icon="launch"
                  title="Launch"
                  text="Conduzimos estrategicamente todo o processo de entrada no mercado, garantindo que o nascimento da sua marca ou rebranding aconteça de forma impactante."
                  style={style}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 02 / OPERAÇÃO */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-start">
          <div className="lg:w-[20%]">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-white text-[42px] font-light leading-[1.2] mb-2 font-halyard">
                Efetivando seu <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] font-normal">posicionamento</span>
              </h2>
              <div className="text-stone-500 text-[31px] font-light mt-10 tracking-[0.05em] font-halyard">02 / OPERAÇÃO</div>
            </div>
            <div className="hidden lg:block h-[360px] pointer-events-none" aria-hidden="true" />
          </div>

          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-16 relative mb-16">
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-white/10 -translate-x-1/2" />

              <div className="flex flex-col">
                <div className="text-[#FE6942] text-[16.59px] font-normal tracking-normal mb-5 uppercase font-halyard">Inteligência Estratégica</div>
                <h3 className="text-white font-normal font-editorial mb-6 leading-tight" style={{ fontSize: style.titulosGrandes }}>Consultoria <br /> TheOne</h3>
                <p className="text-[#C7C7C7] font-extralight leading-[1.4] font-halyard" style={{ fontSize: style.textoGrande }}>
                  <span className="text-white font-normal">Para negócios visionários que já possuem equipe de marketing interna, nós atuamos como a inteligência estratégica.</span> Damos o norte, o diagnóstico e as diretrizes do que precisa ser feito para você crescer rumo a Top #01 no mercado.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="text-[#FE6942] text-[16.59px] font-normal tracking-normal mb-5 uppercase font-halyard">Aliado Operacional</div>
                <h3 className="text-white font-normal font-editorial mb-6 leading-tight" style={{ fontSize: style.titulosGrandes }}>Assessoria <br /> TheOne</h3>
                <p className="text-[#C7C7C7] font-extralight leading-[1.4] font-halyard" style={{ fontSize: style.textoGrande }}>
                  Para negócios visionários que não possuem time interno de marketing. <span className="text-white font-normal">Além da inteligência estratégica, nós seremos os aliados na linha de frente.</span> Atuamos lado a lado assumindo a operação estratégica e a gestión do marketing, garantindo que cada ponto de contato esteja alinhado para sua marca se tornar inevitável.
                </p>
              </div>
            </div>

            <div className="bg-transparent border border-[#5B5B5B] rounded-[32.7px] py-16 px-12 md:px-16">
              <div className="mb-12 flex justify-start">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[13px] tracking-[0.14em] uppercase text-[#C7C7C7] font-halyard">
                  Solucoes modulares
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-y-20 gap-x-16">
                <FeatureCard index={0}
                  icon="conteudo"
                  title="Sistema de Conteúdo"
                  text="Seu posicionamento acontecendo no digital. Sistematizamos sua produção de conteúdo para fazer com que sua marca seja vista, lembrada e comprada."
                  style={style}
                />
                <FeatureCard index={1}
                  icon="growth"
                  title="Branding / Marketing / Growth"
                  text="A união dos três pilares para gerar receita. Fugimos das campanhas aleatórias para construir uma estrutura de marketing personalizada, onde o crescimento da empresa e o fortalecimento da sua marca caminham juntos."
                  style={{ ...style, titulosBox: "26px" }}
                />
                <FeatureCard index={2}
                  icon="founder"
                  title="Fundador Posicionado"
                  text="Transformamos o fundador em um poderoso canal de aquisição. Ao humanizar a marca e construir uma autoridade inabalável, ampliamos o potencial de conexão com o público e abrimos novas portas de crescimento através da influência do founder."
                  style={{ ...style, titulosBox: "29.3px", textoBox: "18.41px" }}
                />
                <FeatureCard index={3}
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
