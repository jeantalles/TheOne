import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import ProjetoAgencia from './components/ProjetoAgencia'
import './index.css' // Carrega os estilos globais (Tailwind, etc)

// Removemos a navegação global (lenis) ou wrappers pesados 
// que pudessem quebrar em ambiente de arquivo único.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense fallback={<div style={{background:'#0a0a0a', height:'100vh'}} />}>
      <ProjetoAgencia />
    </Suspense>
  </React.StrictMode>
)
