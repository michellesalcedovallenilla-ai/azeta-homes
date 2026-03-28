const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}

/**
 * Fetch from a public API endpoint with timeout.
 * Returns null on failure (for graceful degradation).
 */
export async function fetchPublic<T>(path: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${API_BASE}${path}`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) return null;

    const json: ApiResponse<T> = await response.json();
    return json.ok ? (json.data ?? null) : null;
  } catch {
    return null;
  }
}

/**
 * Track an analytics event. Fire-and-forget (never blocks UI).
 */
export function trackEvent(eventType: string, eventData?: string) {
  const sessionId = getSessionId();
  try {
    fetch(`${API_BASE}/api/analytics/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_type: eventType,
        event_data: eventData,
        page_url: window.location.pathname,
        referrer: document.referrer || undefined,
        session_id: sessionId,
        language: document.documentElement.lang || undefined,
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Silently fail
  }
}

let _sessionId: string | null = null;
function getSessionId(): string {
  if (!_sessionId) {
    _sessionId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2);
  }
  return _sessionId;
}
