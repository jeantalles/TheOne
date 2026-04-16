import CasePageTemplate from './CasePageTemplate';
import { getCaseStudyBySlug } from '../../content/cases';

export default function CaseDetailPage({ slug }) {
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy || !caseStudy.isPublished) {
    return (
      <CasePageTemplate
        isFallback
        caseStudy={{
          title: 'Case em construção',
          category: 'Case detail',
          coverImage: '/images/cases/zenic.jpg',
          intro:
            'A estrutura da página já existe, mas este case ainda não foi publicado. Quando o conteúdo estiver pronto, ele entra aqui sem precisar mudar a arquitetura.',
          descriptionSections: [],
          solutions: [],
          clientFeedback: {
            name: '',
            role: '',
            quote: '',
            avatar: null,
          },
          mediaBlocks: [],
          palette: caseStudy?.palette,
        }}
      />
    );
  }

  return <CasePageTemplate caseStudy={caseStudy} />;
}
