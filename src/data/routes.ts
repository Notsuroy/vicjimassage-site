// Single source of truth for the PT <-> EN route slug map.
// Route slugs differ by language for SEO, so the language switcher and the
// hreflang alternates both need this mapping. It used to be duplicated in
// Header.astro and BaseLayout.astro, which drifted as soon as pages were added.
// Import from here instead.
//
// Paths are written WITHOUT a trailing slash (except the '/en/' home), matching
// the `path` prop pages pass to BaseLayout.

import services from './services.json';

const staticRoutes: Record<string, string> = {
  '/': '/en/',
  '/sobre': '/en/about',
  '/servicos': '/en/services',
  '/blog': '/en/blog',
  '/agendar': '/en/book',
  '/contato': '/en/contact',
};

const serviceRoutes: Record<string, string> = Object.fromEntries(
  services.services.map((s) => [
    `/servicos/${s.slug.pt}`,
    `/en/services/${s.slug.en}`,
  ])
);

export const ptToEn: Record<string, string> = { ...staticRoutes, ...serviceRoutes };

export const enToPt: Record<string, string> = Object.fromEntries(
  Object.entries(ptToEn).map(([pt, en]) => [en, pt])
);

/** Given the current path and its language, return the equivalent path in the other language. */
export function altLangPath(path: string, lang: 'pt' | 'en'): string {
  return lang === 'pt' ? (ptToEn[path] ?? '/en/') : (enToPt[path] ?? '/');
}
