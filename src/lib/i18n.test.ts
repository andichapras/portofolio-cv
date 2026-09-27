import { describe, expect, it } from 'vitest';
import { getLocale, localizedPath, translate } from './i18n';

describe('locale routing', () => {
  it('defaults to English and recognizes complete Indonesian segments only', () => {
    expect(getLocale('/')).toBe('en');
    expect(getLocale('/playground/')).toBe('en');
    expect(getLocale('/id')).toBe('id');
    expect(getLocale('/id/playground/')).toBe('id');
    expect(getLocale('/ideas/')).toBe('en');
  });

  it('switches equivalent routes without accumulating locale prefixes', () => {
    for (const path of ['/', '/playground/', '/playground/access-control/']) {
      const indonesian = localizedPath(path, 'id');
      expect(localizedPath(indonesian, 'en')).toBe(path);
      expect(localizedPath(indonesian, 'id')).toBe(indonesian);
    }
    expect(localizedPath('/id', 'en')).toBe('/');
    expect(localizedPath('/ideas/', 'id')).toBe('/id/ideas/');
  });

  it('preserves anchors and query strings in localized links', () => {
    expect(localizedPath('/id/#contact', 'en')).toBe('/#contact');
    expect(localizedPath('/playground/?source=home', 'id')).toBe('/id/playground/?source=home');
  });

  it('selects the requested copy', () => {
    expect(translate('en')('Work', 'Proyek')).toBe('Work');
    expect(translate('id')('Work', 'Proyek')).toBe('Proyek');
  });
});
