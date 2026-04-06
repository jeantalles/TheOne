import { useSyncExternalStore } from 'react';

function getMatches(query, fallback = false) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return fallback;
  }

  return window.matchMedia(query).matches;
}

export function useMediaQuery(query, fallback = false) {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
        return () => {};
      }

      const mediaQuery = window.matchMedia(query);

      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', onStoreChange);
        return () => mediaQuery.removeEventListener('change', onStoreChange);
      }

      mediaQuery.addListener(onStoreChange);
      return () => mediaQuery.removeListener(onStoreChange);
    },
    () => getMatches(query, fallback),
    () => fallback
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

function getConstrainedMotion(fallback = false) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const nav = window.navigator;
  const saveData = Boolean(nav.connection?.saveData);
  const coarsePointer = typeof window.matchMedia === 'function'
    ? window.matchMedia('(pointer: coarse)').matches
    : false;
  const compactViewport = window.innerWidth < 1024;
  const lowCpu = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4;
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4;

  return saveData || (coarsePointer && compactViewport) || (lowCpu && lowMemory);
}

export function useConstrainedMotion() {
  return useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') {
        return () => {};
      }

      const handleChange = () => onStoreChange();
      const coarseQuery = typeof window.matchMedia === 'function'
        ? window.matchMedia('(pointer: coarse)')
        : null;
      const connection = window.navigator?.connection;

      window.addEventListener('resize', handleChange, { passive: true });
      window.addEventListener('orientationchange', handleChange);

      if (coarseQuery) {
        if (typeof coarseQuery.addEventListener === 'function') {
          coarseQuery.addEventListener('change', handleChange);
        } else {
          coarseQuery.addListener(handleChange);
        }
      }

      if (connection?.addEventListener) {
        connection.addEventListener('change', handleChange);
      }

      return () => {
        window.removeEventListener('resize', handleChange);
        window.removeEventListener('orientationchange', handleChange);

        if (coarseQuery) {
          if (typeof coarseQuery.removeEventListener === 'function') {
            coarseQuery.removeEventListener('change', handleChange);
          } else {
            coarseQuery.removeListener(handleChange);
          }
        }

        if (connection?.removeEventListener) {
          connection.removeEventListener('change', handleChange);
        }
      };
    },
    () => getConstrainedMotion(false),
    () => false
  );
}
