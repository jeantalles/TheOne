// Escopo e valores específicos da SBS. O acompanhamento é mensal e separado.
export const SBS_PHASES = [
  { id: 'foundation', label: 'TheOne Foundation', phase: 'Fase 1', duration: '45 dias' },
  { id: 'desdobramentos', label: 'Desdobramentos', phase: 'Fase 2', duration: '20 dias' },
  { id: 'acompanhamento', label: 'Acompanhamento', phase: 'Fase 3', duration: 'Pós-projeto' },
];

export const SBS_SERVICES = [
  { id: 'estrategia', phase: 'foundation', label: 'Estratégia de Marca e Posicionamento', description: 'Consolidação do posicionamento, proposta de valor e narrativa da SBS, a partir dos materiais existentes, das imersões com as lideranças e da pesquisa de mercado.', price: 15000, selected: true },
  { id: 'identidade', phase: 'foundation', label: 'Identidade de Marca', description: 'Identidade verbal, otimização da identidade visual e novo brandbook.', price: 9000, selected: true },
  { id: 'conteudo', phase: 'foundation', label: 'Estratégia de Conteúdo e Canais', description: 'Direcionamento dos canais, temas e formatos de conteúdo para colocar o posicionamento em prática.', price: 5000, selected: false },
  { id: 'site', phase: 'desdobramentos', label: 'Site BrandExperience', description: 'Site institucional com narrativa, design e desenvolvimento alinhados à marca.', price: 8000, selected: false },
  { id: 'materiais', phase: 'desdobramentos', label: 'Materiais e Pontos de Contato', description: 'Desdobramento da identidade nos materiais institucionais, digitais e físicos previstos no escopo.', price: 11500, selected: false },
  { id: 'advisory', phase: 'acompanhamento', label: 'Advisory de Branding', description: 'Acompanhamento por 3 meses e direcionamento estratégico da implementação após a conclusão do projeto, com reuniões quinzenais e suporte via WhatsApp.', price: 3000, monthly: true, selected: false },
];

export const SBS_MATERIALS = [
  { label: 'Apresentação institucional', description: 'Aproximadamente 15 slides.', price: 2000 },
  { label: 'Templates de documentos', description: 'PowerPoint com 8 slides-base e modelo de documento PDF.', price: 1000 },
  { label: 'Press kit digital', description: 'Material institucional para apresentação à imprensa.', price: 1000 },
  { label: 'Perfis e materiais digitais', description: 'Instagram: foto, bio, destaques, capas e 6 templates. LinkedIn: foto e capa. YouTube: capa, avatar e thumbnails. TikTok: perfil e capas. WhatsApp: foto. Assinatura de e-mail.', price: 1500 },
  { label: 'Papelaria corporativa', description: 'Cartão de visita, papel timbrado, envelope, pasta de apresentação, bloco, caderno, caneta, carimbo e modelo de certificado.', price: 2000 },
  { label: 'Aplicações da marca', description: 'Camisa, crachá, cordão, modelo de placa, ecobag, garrafa, chaveiro e Moleskine. Caneta já contemplada na papelaria.', price: 1500 },
  { label: 'Manual do proprietário', description: 'Documento A4 em PDF, com aproximadamente 32 páginas. Conteúdo técnico fornecido e validado pela SBS.', price: 2500 },
];

export const SBS_COMPLETE_DISCOUNT = 0.20;
export const SBS_BASE_TOTAL = SBS_SERVICES.filter(s => !s.monthly && s.selected).reduce((total, s) => total + s.price, 0);
export const SBS_COMPLETE_TOTAL = SBS_SERVICES.filter(s => !s.monthly).reduce((total, s) => total + s.price, 0);
