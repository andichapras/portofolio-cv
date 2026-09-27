export const locales = ['en', 'id'] as const;
export type Locale = (typeof locales)[number];

export function getLocale(pathname: string): Locale {
  return pathname === '/id' || pathname.startsWith('/id/') ? 'id' : 'en';
}

// Keep English URLs unchanged and remove only a complete locale segment.
export function localizedPath(path: string, locale: Locale): string {
  const relative = path.replace(/^\/id(?=\/|#|\?|$)/, '') || '/';
  const normalized = relative.startsWith('/') ? relative : `/${relative}`;
  return locale === 'id' ? `/id${normalized}` : normalized;
}

export function translate(locale: Locale) {
  return (english: string, indonesian: string): string => (locale === 'id' ? indonesian : english);
}
