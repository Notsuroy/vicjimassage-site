import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const staticPages = [
  { loc: '/', priority: '1.0' },
  { loc: '/sobre', priority: '0.8' },
  { loc: '/servicos', priority: '0.9' },
  { loc: '/blog', priority: '0.8' },
  { loc: '/agendar', priority: '0.9' },
  { loc: '/contato', priority: '0.7' },
  { loc: '/en/', priority: '1.0' },
  { loc: '/en/about', priority: '0.8' },
  { loc: '/en/services', priority: '0.9' },
  { loc: '/en/blog', priority: '0.8' },
  { loc: '/en/book', priority: '0.9' },
  { loc: '/en/contact', priority: '0.7' },
];

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? 'https://vicjimassage.com.br';
  const today = new Date().toISOString().split('T')[0];

  const ptPosts = await getCollection('blog', ({ data }) => data.lang === 'pt' && !data.draft);
  const enPosts = await getCollection('blog', ({ data }) => data.lang === 'en' && !data.draft);

  const blogEntries = [
    ...ptPosts.map(p => ({
      loc: `/blog/${p.slug.replace(/^pt\//, '')}`,
      priority: '0.7',
      lastmod: (p.data.updatedDate ?? p.data.publishDate).toISOString().split('T')[0],
    })),
    ...enPosts.map(p => ({
      loc: `/en/blog/${p.slug.replace(/^en\//, '')}`,
      priority: '0.7',
      lastmod: (p.data.updatedDate ?? p.data.publishDate).toISOString().split('T')[0],
    })),
  ];

  const allPages = [
    ...staticPages.map(p => ({ ...p, lastmod: today })),
    ...blogEntries,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${base}${p.loc}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
