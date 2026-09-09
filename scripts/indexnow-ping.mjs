#!/usr/bin/env node
// Ping IndexNow with the full URL list, read from the LIVE sitemap.xml.
// Pings Bing's endpoint (which forwards to Yandex + others).
// Run: node scripts/indexnow-ping.mjs
//
// This used to carry a hardcoded URL list, which silently drifted: it was
// missing the 4th PT blog post, all 3 EN posts, and every service detail page.
// Reading the sitemap means new pages are submitted automatically, so long as
// the deploy carrying them is already live (the sitemap is fetched over the
// network, not built locally).

const KEY = '0pes2e9k392slitbw9vkpvjiv21f4y0m';
const HOST = 'vicjimassage.com.br';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;

const sitemapRes = await fetch(SITEMAP, {
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; vicji-indexnow/1.0)' },
});
if (!sitemapRes.ok) {
  console.error(`Could not fetch ${SITEMAP}: HTTP ${sitemapRes.status}`);
  process.exit(1);
}
const xml = await sitemapRes.text();
const URLS = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (URLS.length === 0) {
  console.error('Sitemap parsed to zero URLs. Refusing to submit an empty list.');
  process.exit(1);
}

const offHost = URLS.filter((u) => !u.startsWith(`https://${HOST}/`) && u !== `https://${HOST}`);
if (offHost.length > 0) {
  console.error(`Sitemap contains URLs off ${HOST}, refusing to submit:`, offHost);
  process.exit(1);
}

const res = await fetch('https://www.bing.com/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS,
  }),
});

console.log(`IndexNow ping status: ${res.status}`);
console.log(`URLs submitted: ${URLS.length} (from ${SITEMAP})`);
if (!res.ok) {
  const text = await res.text().catch(() => '');
  console.error('Response body:', text);
  process.exit(1);
}
console.log('Bing accepted the submission. Yandex/others forwarded automatically.');
