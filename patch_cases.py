import re

with open('site/src/components/PropostaAnderson.jsx', 'r') as f:
    content = f.read()

# 1. Update SLIDE_TOTAL
content = re.sub(r'const SLIDE_TOTAL = 8;', 'const SLIDE_TOTAL = 9;', content)

# 2. Update DARK_SLIDES
content = re.sub(r'const DARK_SLIDES = \[0, 5, 7\];', 'const DARK_SLIDES = [0, 2, 6, 8];', content)

# 3. Add SubcapaCases function right before function CaseSlide
subcapa_func = """function SubcapaCases() {
  return (
    <section className="relative overflow-hidden flex flex-col justify-center items-center min-h-[100svh] bg-[#0a0a0a] text-center px-6">
      <span className="font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold block mb-4">
        Nosso Trabalho
      </span>
      <h2 className="font-editorial font-normal text-white text-[clamp(3rem,5vw,4.5rem)] leading-[1.05] tracking-tight">
        Marcas que confiam<br/>no nosso modelo
      </h2>
    </section>
  );
}

// ── SLIDES 4-6: CASES (página real do site) ──────────────────────────────────
function CaseSlide({ slug }) {"""
content = content.replace('// ── SLIDES 4-6: CASES (página real do site) ──────────────────────────────────\nfunction CaseSlide({ slug }) {', subcapa_func)

# 4. Update the slides render
slides_render_start = content.find('{current === 0  && <Capa />}')
slides_render_end = content.find('</div>', slides_render_start)

new_slides_render = """{current === 0  && <Capa />}
        {current === 1  && <Dores />}
        {current === 2  && <SubcapaCases />}
        {current === 3  && <CaseSlide slug="zenic" />}
        {current === 4  && <CaseSlide slug="thunders" />}
        {current === 5  && <CaseSlide slug="camilla-toscano" />}
        {current === 6  && <SobreJean scrollerRef={slideScrollRef} />}
        {current === 7  && <Cronograma />}
        {current === 8  && <Calculadora />}
"""
content = content[:slides_render_start] + new_slides_render + content[slides_render_end:]

with open('site/src/components/PropostaAnderson.jsx', 'w') as f:
    f.write(content)
