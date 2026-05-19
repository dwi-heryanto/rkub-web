export function trackEvent(eventName: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", eventName, params);

  const clarity = (window as Window & { clarity?: (...args: unknown[]) => void }).clarity;
  clarity?.("event", eventName);
}
