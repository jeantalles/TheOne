import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react';
import { navigateToPath } from '../../utils/router';

const mediaLayoutClasses = {
  feature: 'md:col-span-12',
  landscape: 'md:col-span-7',
  portrait: 'md:col-span-5',
  square: 'md:col-span-6',
};

function FeedbackAvatar({ name, avatar, accentSoft }) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="h-16 w-16 rounded-full object-cover"
      />
    );
  }

  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-full text-sm font-medium uppercase tracking-[0.28em]"
      style={{
        background: `linear-gradient(145deg, ${accentSoft}, rgba(255,255,255,0.92))`,
        color: '#151311',
      }}
    >
      {initials}
    </div>
  );
}

function CaseMediaBlock({ block, palette }) {
  const isVideo = block.type === 'video';
  const isImage = block.type === 'image';
  const isPlaceholder = block.type === 'placeholder';
  const wrapperClassName = mediaLayoutClasses[block.layout] ?? mediaLayoutClasses.square;
  const baseCardClassName =
    'group relative overflow-hidden rounded-[28px] border p-5 md:p-7 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]';

  if (isImage) {
    return (
      <article
        className={wrapperClassName}
        style={{ aspectRatio: block.aspectRatio }}
      >
        <div
          className={baseCardClassName}
          style={{
            height: '100%',
            borderColor: palette.border,
            backgroundColor: 'rgba(255,255,255,0.44)',
          }}
        >
          <img
            src={block.src}
            alt={block.alt ?? block.title}
            className="h-full w-full rounded-[22px] object-cover"
          />
        </div>
      </article>
    );
  }

  if (isVideo) {
    return (
      <article
        className={wrapperClassName}
        style={{ aspectRatio: block.aspectRatio }}
      >
        <div
          className={baseCardClassName}
          style={{
            height: '100%',
            borderColor: palette.border,
            backgroundColor: 'rgba(255,255,255,0.44)',
          }}
        >
          <video
            className="h-full w-full rounded-[22px] object-cover"
            controls
            playsInline
            muted={block.muted ?? false}
            poster={block.poster}
          >
            <source src={block.src} type={block.mimeType ?? 'video/mp4'} />
          </video>
        </div>
      </article>
    );
  }

  return (
    <article
      className={wrapperClassName}
      style={{ aspectRatio: block.aspectRatio }}
    >
      <div
        className={baseCardClassName}
        style={{
          height: '100%',
          borderColor: palette.border,
          background: `linear-gradient(145deg, rgba(255,255,255,0.8) 0%, ${palette.placeholder} 100%)`,
          boxShadow: '0 30px 90px rgba(21, 19, 17, 0.08)',
        }}
      >
        <div
          className="absolute inset-0 opacity-95"
          style={{
            background: `
              radial-gradient(circle at top left, rgba(255,255,255,0.9) 0%, transparent 34%),
              linear-gradient(135deg, rgba(143,168,177,0.26) 0%, rgba(255,255,255,0.08) 44%, rgba(199,242,43,0.18) 100%)
            `,
          }}
        />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p
                className="font-halyard text-[0.72rem] font-semibold uppercase tracking-[0.24em]"
                style={{ color: palette.muted }}
              >
                {block.label}
              </p>
            </div>
            {block.layout === 'feature' ? (
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full border"
                style={{
                  borderColor: 'rgba(21, 19, 17, 0.08)',
                  backgroundColor: 'rgba(255,255,255,0.55)',
                }}
              >
                <Play size={18} strokeWidth={1.85} color={palette.ink} />
              </div>
            ) : (
              <ArrowUpRight size={20} strokeWidth={1.7} color={palette.ink} className="shrink-0" />
            )}
          </div>

          <div className={block.layout === 'feature' ? 'mx-auto max-w-2xl text-center' : ''}>
            <h3
              className={`font-halyard leading-[1.04] tracking-[-0.03em] text-[#151311] ${
                block.layout === 'feature'
                  ? 'text-[clamp(2rem,4vw,3.6rem)] font-medium'
                  : 'text-[clamp(1.4rem,2.4vw,2rem)] font-medium'
              }`}
            >
              {block.title}
            </h3>
            {block.description ? (
              <p
                className={`mt-4 font-halyard text-[0.98rem] leading-[1.55] ${
                  block.layout === 'feature'
                    ? 'mx-auto max-w-xl text-[#5F5752]'
                    : 'max-w-sm text-[#5F5752]'
                }`}
              >
                {block.description}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CasePageTemplate({ caseStudy, isFallback = false }) {
  const palette = caseStudy.palette ?? {
    canvas: '#F3EEE8',
    surface: '#F7F2ED',
    border: 'rgba(21, 19, 17, 0.09)',
    ink: '#151311',
    muted: '#5F5752',
    accent: '#FE6942',
    accentSoft: '#8FA8B1',
    placeholder: '#D9DCDD',
  };

  return (
    <div
      className="min-h-screen font-halyard"
      style={{ backgroundColor: palette.canvas, color: palette.ink }}
    >
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-xl"
        style={{
          borderColor: palette.border,
          backgroundColor: 'rgba(243, 238, 232, 0.82)',
        }}
      >
        <div className="mx-auto flex max-w-[1520px] items-center justify-between gap-4 px-5 py-4 md:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => navigateToPath('/')}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
            style={{ color: palette.ink, backgroundColor: 'rgba(255,255,255,0.46)' }}
          >
            <ArrowLeft size={16} strokeWidth={1.9} />
            Voltar para a home
          </button>

          <button
            type="button"
            aria-label="Ir para a home"
            onClick={() => navigateToPath('/')}
            className="shrink-0"
          >
            <img
              src="/logo-navbar-black.svg"
              alt="The One"
              className="h-10 w-auto md:h-11"
            />
          </button>
        </div>
      </header>

      <main className="px-5 pb-20 pt-6 md:px-8 md:pb-24 md:pt-10 lg:px-12">
        <div className="mx-auto max-w-[1520px]">
          <section className="mb-10 md:mb-14">
            <div
              className="rounded-[32px] border p-3 md:rounded-[42px] md:p-5"
              style={{
                borderColor: palette.border,
                backgroundColor: 'rgba(255,255,255,0.42)',
                boxShadow: '0 30px 90px rgba(21, 19, 17, 0.08)',
              }}
            >
              <div
                className="overflow-hidden rounded-[26px] md:rounded-[34px]"
                style={{
                  background: `linear-gradient(135deg, rgba(195,223,229,0.95) 0%, ${palette.accentSoft} 100%)`,
                }}
              >
                <div
                  className="p-3 md:p-5 lg:p-7"
                  style={{ aspectRatio: '1507 / 678' }}
                >
                  <img
                    src={caseStudy.coverImage}
                    alt={caseStudy.title}
                    className="h-full w-full rounded-[22px] object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.72fr)]">
            <div className="max-w-4xl">
              <div className="mb-10 md:mb-12">
                <p
                  className="mb-4 text-[0.74rem] font-semibold uppercase tracking-[0.26em]"
                  style={{ color: palette.muted }}
                >
                  {isFallback ? 'Case detail' : caseStudy.category}
                </p>
                <h1 className="font-halyard text-[clamp(2.5rem,5vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.05em]">
                  {caseStudy.title}
                </h1>
                {caseStudy.intro ? (
                  <p
                    className="mt-5 max-w-3xl text-[1.05rem] leading-[1.65] md:text-[1.16rem]"
                    style={{ color: palette.muted }}
                  >
                    {caseStudy.intro}
                  </p>
                ) : null}
              </div>

              {caseStudy.descriptionSections.length > 0 ? (
                <div className="space-y-10 md:space-y-12">
                  {caseStudy.descriptionSections.map((section) => (
                    <article key={section.title}>
                      <h2 className="text-[1.55rem] font-semibold leading-none tracking-[-0.03em]">
                        {section.title}
                      </h2>
                      <div
                        className="mt-4 space-y-4 text-[1rem] leading-[1.75] md:text-[1.06rem]"
                        style={{ color: palette.muted }}
                      >
                        {section.text.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div
                  className="rounded-[28px] border px-6 py-7"
                  style={{
                    borderColor: palette.border,
                    backgroundColor: 'rgba(255,255,255,0.4)',
                  }}
                >
                  <p className="text-[1rem] leading-[1.7]" style={{ color: palette.muted }}>
                    Este case ainda está em estruturação. O template já está pronto para receber conteúdo, feedbacks e mídia final sem precisar refazer a página.
                  </p>
                </div>
              )}
            </div>

            <aside className="space-y-8 lg:pt-20">
              <section
                className="rounded-[28px] border px-6 py-7"
                style={{
                  borderColor: palette.border,
                  backgroundColor: 'rgba(255,255,255,0.44)',
                }}
              >
                <p
                  className="text-[0.74rem] font-semibold uppercase tracking-[0.24em]"
                  style={{ color: palette.muted }}
                >
                  Soluções
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {caseStudy.solutions.length > 0 ? (
                    caseStudy.solutions.map((solution) => (
                      <span
                        key={solution}
                        className="inline-flex rounded-full px-4 py-2 text-[0.98rem] leading-none"
                        style={{
                          backgroundColor: 'rgba(255,255,255,0.84)',
                          border: `1px solid ${palette.border}`,
                          color: palette.ink,
                        }}
                      >
                        {solution}
                      </span>
                    ))
                  ) : (
                    <span
                      className="inline-flex rounded-full px-4 py-2 text-[0.98rem] leading-none"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.84)',
                        border: `1px solid ${palette.border}`,
                        color: palette.muted,
                      }}
                    >
                      Soluções serão adicionadas em breve
                    </span>
                  )}
                </div>
              </section>

              <section
                className="rounded-[28px] border px-6 py-7"
                style={{
                  borderColor: palette.border,
                  backgroundColor: 'rgba(255,255,255,0.44)',
                }}
              >
                <p
                  className="text-[0.74rem] font-semibold uppercase tracking-[0.24em]"
                  style={{ color: palette.muted }}
                >
                  Feedback do cliente
                </p>

                {caseStudy.clientFeedback?.quote ? (
                  <div className="mt-6">
                    <div className="flex items-center gap-4">
                      <FeedbackAvatar
                        name={caseStudy.clientFeedback.name}
                        avatar={caseStudy.clientFeedback.avatar}
                        accentSoft={palette.accentSoft}
                      />
                      <div>
                        <p className="text-[1.28rem] font-semibold leading-none tracking-[-0.03em]">
                          {caseStudy.clientFeedback.name}
                        </p>
                        {caseStudy.clientFeedback.role ? (
                          <p className="mt-2 text-sm leading-none" style={{ color: palette.muted }}>
                            {caseStudy.clientFeedback.role}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <p
                      className="mt-6 text-[1.05rem] leading-[1.75]"
                      style={{ color: palette.muted }}
                    >
                      “{caseStudy.clientFeedback.quote}”
                    </p>
                  </div>
                ) : (
                  <p className="mt-5 text-[1rem] leading-[1.7]" style={{ color: palette.muted }}>
                    Espaço reservado para depoimento, avatar e cargo do cliente.
                  </p>
                )}
              </section>
            </aside>
          </section>

          <section className="mt-16 md:mt-24">
            <div className="mb-8 md:mb-10">
              <p
                className="text-[0.74rem] font-semibold uppercase tracking-[0.26em]"
                style={{ color: palette.muted }}
              >
                Mídia do projeto
              </p>
              <h2 className="mt-3 font-editorial text-[clamp(2.1rem,4vw,4rem)] leading-[0.98] tracking-[-0.03em] text-[#151311]">
                Estrutura pronta para imagens e vídeos do case
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5">
              {caseStudy.mediaBlocks.length > 0 ? (
                caseStudy.mediaBlocks.map((block) => (
                  <CaseMediaBlock key={block.id} block={block} palette={palette} />
                ))
              ) : (
                <article className="md:col-span-12">
                  <div
                    className="flex min-h-[340px] items-center justify-center rounded-[28px] border px-8 py-10 text-center"
                    style={{
                      borderColor: palette.border,
                      background: `linear-gradient(145deg, rgba(255,255,255,0.8) 0%, ${palette.placeholder} 100%)`,
                    }}
                  >
                    <div className="max-w-2xl">
                      <p
                        className="text-[0.74rem] font-semibold uppercase tracking-[0.24em]"
                        style={{ color: palette.muted }}
                      >
                        Em breve
                      </p>
                      <h3 className="mt-4 text-[clamp(1.8rem,3vw,3rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                        A galeria deste case ainda será publicada
                      </h3>
                    </div>
                  </div>
                </article>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
