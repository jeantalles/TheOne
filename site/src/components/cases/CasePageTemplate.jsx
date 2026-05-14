import { useEffect, useState } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { getHistoryState, navigateToPath } from '../../utils/router';

function FeedbackAvatar({ name, avatar }) {
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
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-sm font-medium uppercase tracking-widest text-white">
      {initials}
    </div>
  );
}

function CaseMediaBlock({ block }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const aspectRatio = block.aspectRatio ?? '16 / 9';

  if (block.type === 'image') {
    return (
      <>
        <div 
          className="w-full relative cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <img
            src={block.src}
            alt={block.alt ?? block.title}
            className="block h-auto w-full object-cover"
          />
        </div>

        {isZoomed && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-zoom-out p-4 md:p-8 transition-opacity duration-300"
            onClick={() => setIsZoomed(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-black/20 rounded-full p-2"
              onClick={() => setIsZoomed(false)}
            >
              <X size={24} />
            </button>
            <img
              src={block.src}
              alt={block.alt ?? block.title}
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </>
    );
  }

  if (block.type === 'video') {
    return (
      <div className="w-full">
        <video
          className="block h-auto w-full"
          autoPlay
          controls
          loop
          muted={block.muted ?? true}
          playsInline
          poster={block.poster}
        >
          <source src={block.src} type={block.mimeType ?? 'video/mp4'} />
        </video>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="w-full bg-[#1A1A1A]"
        style={{ aspectRatio }}
      />
    </div>
  );
}

function CaseBeforeBlock({ block }) {
  if (!block?.image) {
    return null;
  }

  return (
    <section className="mx-auto w-[90%] max-w-[1680px] pb-14 pt-10 md:pb-20 md:pt-16">
      <div className="mb-14 h-px w-full bg-white/10 md:mb-20" />

      <div className="mb-7 grid gap-7 md:mb-9 md:grid-cols-[minmax(0,0.7fr)_minmax(22rem,0.55fr)] md:items-end md:gap-14">
        <div>
          <h2 className="font-editorial text-[clamp(3rem,7vw,7rem)] font-normal leading-none tracking-normal text-white">
            {block.title ?? 'Antes'}
          </h2>
        </div>

        {Array.isArray(block.points) && block.points.length > 0 ? (
          <ul className="grid gap-3 md:justify-self-end">
            {block.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-4 font-sans text-[clamp(1rem,1.18vw,1.28rem)] font-light leading-[1.35] text-white/62"
              >
                <span className="mt-[0.58em] h-2 w-2 shrink-0 rounded-full bg-[#FE6942]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="overflow-hidden rounded-[22px] md:rounded-[28px]">
        <img
          src={block.image}
          alt={block.alt ?? block.title ?? 'Antes'}
          className="block h-auto w-full object-cover"
        />
      </div>
    </section>
  );
}

export default function CasePageTemplate({ caseStudy, isFallback = false }) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const hasDescriptionSections = caseStudy.descriptionSections.length > 0;
  const hasSolutions = caseStudy.solutions.length > 0;
  const feedbackEntries = Array.isArray(caseStudy.clientFeedbacks) && caseStudy.clientFeedbacks.length > 0
    ? caseStudy.clientFeedbacks
    : (caseStudy.clientFeedback?.quote ? [caseStudy.clientFeedback] : []);
  const hasFeedback = feedbackEntries.length > 0;

  const handleBackNavigation = () => {
    const returnTo = getHistoryState().returnTo;

    if (returnTo?.path) {
      navigateToPath(returnTo.path, {
        replace: true,
        resetScroll: false,
        state: {
          restoreScrollY: returnTo.scrollY ?? 0,
          restoreCasesOpen: Boolean(returnTo.casesOpen),
        },
      });
      return;
    }

    navigateToPath('/');
  };

  return (
    <div className="min-h-screen bg-[#212121] font-halyard text-white">
      <header className="px-6 pt-6 md:px-10 md:pt-8 lg:px-14">
        <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between">
          <button
            type="button"
            onClick={handleBackNavigation}
            className="inline-flex items-center gap-3 font-sans text-[clamp(1.1rem,1.3vw,1.35rem)] tracking-[-0.01em] text-white/72 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft size={24} strokeWidth={1.7} />
            Voltar
          </button>
          <button
            type="button"
            aria-label="Ir para a home"
            onClick={() => navigateToPath('/')}
          >
            <img src="/logo-navbar.svg" alt="The One" className="h-8 w-auto md:h-9" />
          </button>
        </div>
      </header>

      <main className="pb-16 md:pb-24">
        <section className="mx-auto w-[90%] max-w-[1680px] pt-8 md:pt-10 lg:pt-14">
          <div className="overflow-hidden rounded-[22px] md:rounded-[28px]">
            <img
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              className="block h-auto w-full object-cover"
            />
          </div>
        </section>

        <section className="mx-auto w-[90%] max-w-[1680px] pb-20 pt-12 md:pb-28 md:pt-[4.5rem]">
          <h1 className="max-w-5xl font-sans text-[clamp(2.3rem,4.6vw,4.8rem)] font-light leading-[0.94] tracking-normal text-white">
            {caseStudy.title}
          </h1>

          <div className="pt-14 md:grid md:grid-cols-[minmax(0,1fr)_minmax(18rem,30rem)] md:items-start md:gap-x-12 md:pt-20 lg:gap-x-16">
            <div className="max-w-4xl space-y-12 md:max-w-none md:space-y-14 md:pr-6 lg:max-w-[52rem] lg:pr-10">
              {hasDescriptionSections ? (
                caseStudy.descriptionSections.map((section) => (
                  <section key={section.title}>
                    <h2 className="mb-4 font-sans text-[clamp(1.35rem,1.6vw,1.8rem)] font-normal tracking-normal text-white">
                      {section.title}
                    </h2>
                    <div className="space-y-5">
                      {section.text.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="font-sans text-[clamp(1.12rem,1.62vw,1.38rem)] font-light leading-[1.58] text-white/88"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))
              ) : caseStudy.intro ? (
                <p className="font-sans text-[clamp(1.12rem,1.62vw,1.38rem)] font-light leading-[1.58] text-white/88">
                  {caseStudy.intro}
                </p>
              ) : (
                <p className="text-[clamp(1rem,1.35vw,1.18rem)] leading-[1.6] text-white/36">
                  {isFallback ? 'Este case ainda está em construção.' : 'Conteúdo em atualização.'}
                </p>
              )}
            </div>

            <aside className="mt-14 space-y-12 md:mt-0 md:w-full md:max-w-[30rem] md:justify-self-end md:space-y-16">
              {hasSolutions ? (
                <section>
                  <h2 className="mb-6 font-sans text-[clamp(1.35rem,1.6vw,1.8rem)] font-normal tracking-normal text-white">
                    Soluções
                  </h2>
                  <ul className="flex list-none flex-col gap-3">
                    {caseStudy.solutions.map((solution) => (
                      <li
                        key={solution}
                        className="inline-flex w-fit max-w-full items-center self-start rounded-[999px] border border-white/[0.05] bg-[rgba(255,255,255,0.16)] px-6 py-4 font-sans text-[clamp(1.08rem,1.45vw,1.38rem)] font-normal leading-[1.15] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]"
                      >
                        {solution}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {hasFeedback ? (
                <section>
                  <h2 className="mb-6 font-sans text-[clamp(1.35rem,1.6vw,1.8rem)] font-normal tracking-normal text-white">
                    {feedbackEntries.length > 1 ? 'Feedback dos clientes' : 'Feedback do cliente'}
                  </h2>
                  <div className="space-y-12">
                    {feedbackEntries.map((feedback) => (
                      <article key={`${feedback.name}-${feedback.role}-${feedback.quote}`}>
                        {feedback.name ? (
                          <div className="flex items-center gap-4">
                            <FeedbackAvatar
                              name={feedback.name}
                              avatar={feedback.avatar}
                            />
                            <div>
                              <p className="font-sans text-[clamp(1.25rem,1.7vw,1.72rem)] font-medium leading-none text-white">
                                {feedback.name}
                              </p>
                              {feedback.role ? (
                                <p className="mt-2 text-[clamp(1rem,1.25vw,1.18rem)] font-normal text-white/58">
                                  {feedback.role}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        ) : null}
                        <p className="mt-8 max-w-[24rem] font-sans text-[clamp(1.12rem,1.62vw,1.38rem)] font-light leading-[1.58] text-white/88">
                          "{feedback.quote}"
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}
            </aside>
          </div>
        </section>

        <CaseBeforeBlock block={caseStudy.beforeBlock} />

        {caseStudy.mediaBlocks.length > 0 ? (
          <section className="overflow-hidden">
            {caseStudy.mediaBlocks.map((block) => (
              <CaseMediaBlock key={block.id} block={block} />
            ))}
          </section>
        ) : null}
      </main>
    </div>
  );
}
