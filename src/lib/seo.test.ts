import { describe, expect, it } from 'vitest';
import {
  canonicalUrl,
  createStructuredData,
  languageAlternates,
  serializeStructuredData,
} from './seo';

const site = new URL('https://www.andichapras.com');
const profile = {
  site,
  pathname: '/',
  language: 'en' as const,
  title: 'Andicha Eka Prastya',
  description: 'Software Engineer',
  pageType: 'ProfilePage' as const,
  breadcrumbs: [],
  projects: [],
};

describe('canonical and translated URLs', () => {
  it('removes tracking and anchors without changing the page language', () => {
    expect(canonicalUrl('/id/projects/aroa?utm_source=cv#stack', site)).toBe(
      'https://www.andichapras.com/id/projects/aroa/',
    );
    expect(canonicalUrl('/?source=profile', site)).toBe('https://www.andichapras.com/');
  });

  it('produces reciprocal alternates and an English default', () => {
    const english = languageAlternates('/projects/aroa/', site);
    const indonesian = languageAlternates('/id/projects/aroa/', site);
    expect(english).toEqual(indonesian);
    expect(english.en).toBe('https://www.andichapras.com/projects/aroa/');
    expect(english.id).toBe('https://www.andichapras.com/id/projects/aroa/');
    expect(english['x-default']).toBe(english.en);
    expect(languageAlternates('/id', site).en).toBe('https://www.andichapras.com/');
  });
});

describe('structured data', () => {
  it('connects both profile languages to the same real person', () => {
    for (const language of ['en', 'id'] as const) {
      const data = createStructuredData({
        ...profile,
        language,
        pathname: language === 'en' ? '/' : '/id/',
      });
      expect(data['@graph']).toContainEqual(
        expect.objectContaining({
          '@type': 'ProfilePage',
          inLanguage: language,
          mainEntity: { '@id': 'https://www.andichapras.com/#person' },
        }),
      );
    }
  });

  it('uses the supplied public projects and preserves their localized order', () => {
    const data = createStructuredData({
      ...profile,
      pageType: 'CollectionPage',
      pathname: '/id/projects/',
      language: 'id',
      projects: [{ name: 'AROA', path: '/id/projects/aroa/' }],
    });
    expect(data['@graph']).toContainEqual(
      expect.objectContaining({
        '@type': 'CollectionPage',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: 1,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'AROA',
              url: 'https://www.andichapras.com/id/projects/aroa/',
            },
          ],
        },
      }),
    );
  });

  it('escapes script-closing content without changing the JSON value', () => {
    const data = createStructuredData({ ...profile, title: '</script><script>alert(1)</script>' });
    const serialized = serializeStructuredData(data);
    expect(serialized).not.toContain('<');
    expect(JSON.parse(serialized)).toEqual(data);
  });
});
