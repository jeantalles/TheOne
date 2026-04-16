# PersonaSelector — Referência Visual e de Integração

Salvo antes do `git reset` para o commit `b86e7b4`.
Commit de criação original: `b97dee6`

---

## Arquivo do Componente: `3b-PersonaSelector.jsx`

O backup completo está em: `.saved-components/3b-PersonaSelector.jsx.bak`

### Visual / Design
- Background: `#F5EFEB` (creme quente), `position: fixed`, cobre a tela toda (`inset: 0`)
- `zIndex: 70`
- Cor accent: `#FE6942` (laranja)
- Cor texto: `#151311` (quase preto)
- Fonte headline: `font-editorial` (serif light)
- Fonte label: `font-halyard` -> tracking-widest + uppercase + cor laranja

### Copy
- Label acima: **"Antes de continuar"** (laranja, uppercase, 23px)
- Headline: **"Essa história tem dois caminhos. Qual é o seu?"** (editorial, clamp 2.2rem–3.6rem)
- Opção 1: **"Empresário"** (value: `empresario`)
- Opção 2: **"Gestor de Marketing & Growth"** (value: `gestor`)

### Animação de entrada (GSAP)
```js
gsap.fromTo(
  elements, // todos com classe .ps-animate
  { opacity: 0, y: 20 },
  { opacity: 1, y: 0, ease: 'power2.out', duration: 0.55, stagger: 0.13 }
)
```

### Animação de clique (seleção de card)
- Card selecionado: `border: 1.5px solid #FE6942`, `backgroundColor: rgba(254,105,66,0.07)`
- Card não selecionado: `opacity: 0.3` (dimmed)
- Label some (`opacity: 0`) e aparece um `<CheckMark />`

### CheckMark (animação GSAP)
```js
gsap.fromTo(
  ref.current,
  { scale: 0, opacity: 0 },
  { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.8)' }
)
// SVG: círculo + checkmark, ambos cor #FE6942
```

### Hover dos cards
```js
onMouseEnter: backgroundColor = 'rgba(21, 19, 17, 0.04)'
onMouseLeave: backgroundColor = 'transparent'
```

---

## Integração no App.jsx (trechos-chave)

```jsx
// State
const [persona, setPersona] = useState(null);
const [showPersonaModal, setShowPersonaModal] = useState(false);
const personaPlaceholderRef = useRef(null);

// IntersectionObserver — dispara o modal quando o placeholder entra na tela
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !persona) {
    setShowPersonaModal(true);
  }
}, { threshold: 0 });
observer.observe(personaPlaceholderRef.current);

// Lock de scroll
document.body.style.overflow = showPersonaModal ? 'hidden' : '';

// Ao selecionar
const handlePersonaSelect = (value) => {
  setPersona(value);
  setShowPersonaModal(false);
  requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
};

// No JSX — placeholder antes do GradientTransition
<div ref={personaPlaceholderRef} style={{ height: '1px' }} />

// Storytelling só renderiza com persona definida
{persona && <Storytelling persona={persona} />}

// Modal ao final do JSX (fora do fluxo, fixo)
{showPersonaModal && (
  <PersonaSelector
    isVisible={showPersonaModal}
    onSelect={handlePersonaSelect}
    persona={persona}
  />
)}
```

---

## Integração no 3-Storytelling.jsx

```jsx
export default function Storytelling({ persona }) {
  const stories = persona ? STORIES[persona] : null;
  // ...
}
```
O componente recebe `persona` como prop e usa `STORIES[persona]` para definir
qual história exibir. `STORIES` é um objeto com chaves `empresario` e `gestor`.
