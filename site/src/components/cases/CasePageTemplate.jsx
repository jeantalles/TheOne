import { ArrowLeft } from 'lucide-react';
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
  const aspectRatio = block.aspectRatio ?? '16 / 9';

  if (block.type === 'image') {
    return (
      <div className="w-full">
        <img
          src={block.src}
          alt={block.alt ?? block.title}
          className="block h-auto w-full object-cover"
        />
      </div>
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

export default function CasePageTemplate({ caseStudy, isFallback = false }) {
  const hasDescriptionSections = caseStudy.descriptionSections.length > 0;
  const hasFeedback = Boolean(caseStudy.clientFeedback?.quote);
  const hasSolutions = caseStudy.solutions.length > 0;

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
                    Feedback do cliente
                  </h2>
                  {caseStudy.clientFeedback.name ? (
                    <div className="flex items-center gap-4">
                      <FeedbackAvatar
                        name={caseStudy.clientFeedback.name}
                        avatar={caseStudy.clientFeedback.avatar}
                      />
                      <div>
                        <p className="font-sans text-[clamp(1.25rem,1.7vw,1.72rem)] font-medium leading-none text-white">
                          {caseStudy.clientFeedback.name}
                        </p>
                        {caseStudy.clientFeedback.role ? (
                          <p className="mt-2 text-[clamp(1rem,1.25vw,1.18rem)] font-normal text-white/58">
                            {caseStudy.clientFeedback.role}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                  <p className="mt-8 max-w-[24rem] font-sans text-[clamp(1.12rem,1.62vw,1.38rem)] font-light leading-[1.58] text-white/88">
                    "{caseStudy.clientFeedback.quote}"
                  </p>
                </section>
              ) : null}
            </aside>
          </div>
        </section>

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
