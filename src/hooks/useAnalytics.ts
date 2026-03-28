import { useEffect, useRef } from 'react';
import { trackEvent } from '../lib/api';

/**
 * Analytics hook. Tracks page view on mount and provides trackEvent function.
 */
export function useAnalytics() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    // Track page view
    trackEvent('page_view');

    // Track time on page via visibility change
    const startTime = Date.now();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const seconds = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', String(seconds));
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { trackEvent };
}
