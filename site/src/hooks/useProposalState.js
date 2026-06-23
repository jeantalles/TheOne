import { useState } from 'react';

function encodeState(stateObj) {
  try {
    const json = JSON.stringify(stateObj);
    return btoa(unescape(encodeURIComponent(json)));
  } catch (e) {
    console.error('Error encoding state:', e);
    return '';
  }
}

function decodeState(base64Str) {
  if (!base64Str) return null;
  try {
    const json = decodeURIComponent(escape(atob(base64Str)));
    return JSON.parse(json);
  } catch (e) {
    console.error('Error decoding state:', e);
    return null;
  }
}

export function useProposalState(initialState) {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return initialState;
    const searchParams = new URLSearchParams(window.location.search);
    const dataParam = searchParams.get('d');
    if (dataParam) {
      const decoded = decodeState(dataParam);
      if (decoded) {
        return { ...initialState, ...decoded };
      }
    }
    return initialState;
  });

  const generateLink = () => {
    if (typeof window === 'undefined') return;
    const encoded = encodeState(state);
    const newUrl = `${window.location.pathname}?d=${encoded}${window.location.hash}`;
    window.history.replaceState({}, '', newUrl);
    
    // Tenta copiar para o clipboard
    navigator.clipboard.writeText(window.location.origin + newUrl)
      .then(() => alert('Link gerado e copiado para a área de transferência!'))
      .catch(err => console.error('Falha ao copiar', err));
  };

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return [state, updateState, generateLink];
}
