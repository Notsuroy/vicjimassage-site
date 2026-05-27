import type { APIRoute } from 'astro';

const pages = [
  { loc: '/', priority: '1.0' },
  { loc: '/sobre', priority: '0.8' },
  { loc: '/servicos', priority: '0.9' },
  { loc: '/agendar', priority: '0.9' },
  { loc: '/contato', priority: '0.7' },
  { loc: '/en/', priority: '1.0' },
  { loc: '/en/about', priority: '0.8' },
  { loc: '/en/services', priority: '0.9' },
  { loc: '/en/book', priority: '0.9' },
  { loc: '/en/contact', priority: '0.7' },
];

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString().replace(/\/$/, '') ?? 'https://vicjimassage.com.br';
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${base}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
