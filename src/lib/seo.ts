import { siteConfig } from '../config/site';
import { localizedPath, type Locale } from './i18n';

export interface Breadcrumb {
  name: string;
  path: string;
}

interface StructuredDataOptions {
  site: URL;
  pathname: string;
  language: Locale;
  title: string;
  description: string;
  pageType: 'WebPage' | 'ProfilePage' | 'CollectionPage';
  breadcrumbs: Breadcrumb[];
  projects: Breadcrumb[];
}

// Canonicals omit tracking parameters and match the hosted trailing-slash policy.
export function canonicalUrl(path: string, site: URL): string {
  const url = new URL(path, site);
  url.search = '';
  url.hash = '';
  url.pathname = `${url.pathname.replace(/\/+$/, '')}/`;
  return url.href;
}

export function languageAlternates(path: string, site: URL) {
  return {
    en: canonicalUrl(localizedPath(path, 'en'), site),
    id: canonicalUrl(localizedPath(path, 'id'), site),
    'x-default': canonicalUrl(localizedPath(path, 'en'), site),
  };
}

export function createStructuredData(options: StructuredDataOptions) {
  const { site, pathname, language, title, description, pageType, breadcrumbs, projects } = options;
  const home = new URL('/', site).href;
  const canonical = canonicalUrl(pathname, site);
  const personId = `${home}#person`;
  const websiteId = `${home}#website`;
  const pageId = `${canonical}#webpage`;
  const breadcrumbId = `${canonical}#breadcrumbs`;
  const projectList = {
    '@type': 'ItemList',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.name,
      url: canonicalUrl(project.path, site),
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: siteConfig.name,
        alternateName: 'andichapras',
        url: home,
        jobTitle: siteConfig.role,
        sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: home,
        name: siteConfig.name,
        alternateName: 'andichapras',
        inLanguage: ['en', 'id'],
        publisher: { '@id': personId },
      },
      {
        '@type': pageType,
        '@id': pageId,
        url: canonical,
        name: title,
        description,
        inLanguage: language,
        isPartOf: { '@id': websiteId },
        author: { '@id': personId },
        about: { '@id': personId },
        ...(pageType === 'ProfilePage' && { mainEntity: { '@id': personId } }),
        ...(pageType === 'CollectionPage' && { mainEntity: projectList }),
        ...(breadcrumbs.length > 0 && { breadcrumb: { '@id': breadcrumbId } }),
      },
      ...(breadcrumbs.length > 0
        ? [
            {
              '@type': 'BreadcrumbList',
              '@id': breadcrumbId,
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: breadcrumb.name,
                item: canonicalUrl(breadcrumb.path, site),
              })),
            },
          ]
        : []),
    ],
  };
}

export function serializeStructuredData(data: ReturnType<typeof createStructuredData>): string {
  // Prevent content from closing the inline JSON-LD script element.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
