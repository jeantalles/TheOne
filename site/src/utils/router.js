import { useSyncExternalStore } from 'react';

const NAVIGATION_EVENT = 'theone:navigation';

function getPathname() {
  if (typeof window === 'undefined') {
    return '/';
  }

  return window.location.pathname || '/';
}

function subscribe(callback) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener('popstate', callback);
  window.addEventListener(NAVIGATION_EVENT, callback);

  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener(NAVIGATION_EVENT, callback);
  };
}

export function usePathname() {
  return useSyncExternalStore(subscribe, getPathname, () => '/');
}

export function getHistoryState() {
  if (typeof window === 'undefined') {
    return {};
  }

  return window.history.state ?? {};
}

export function replaceCurrentHistoryState(nextState) {
  if (typeof window === 'undefined') {
    return;
  }

  const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.history.replaceState(nextState, '', currentPath);
}

export function navigateToPath(path, { replace = false, state = {}, resetScroll = true } = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const nextPath = path || '/';
  const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const nextState = state ?? {};

  if (currentPath === nextPath) {
    if (replace || Object.keys(nextState).length > 0) {
      window.history.replaceState(nextState, '', nextPath);
    }
    window.dispatchEvent(new Event(NAVIGATION_EVENT));
    return;
  }

  const method = replace ? 'replaceState' : 'pushState';
  window.history[method](nextState, '', nextPath);
  if (resetScroll) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
  window.dispatchEvent(new Event(NAVIGATION_EVENT));
}
