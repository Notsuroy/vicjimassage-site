#!/usr/bin/env node
// Ping IndexNow with the full URL list from sitemap.xml.
// Pings Bing's endpoint (which forwards to Yandex + others).
// Run: node scripts/indexnow-ping.mjs

const KEY = '0pes2e9k392slitbw9vkpvjiv21f4y0m';
const HOST = 'vicjimassage.com.br';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Static URL list (mirrors sitemap.xml).
// When the blog grows, add new slugs here OR build dynamically by fetching sitemap.xml.
const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/sobre`,
  `https://${HOST}/servicos`,
  `https://${HOST}/blog`,
  `https://${HOST}/agendar`,
  `https://${HOST}/contato`,
  `https://${HOST}/blog/o-que-e-massagem-tailandesa`,
  `https://${HOST}/blog/massagem-tailandesa-para-dor-lombar`,
  `https://${HOST}/blog/antes-da-primeira-sessao`,
  `https://${HOST}/en/`,
  `https://${HOST}/en/about`,
  `https://${HOST}/en/services`,
  `https://${HOST}/en/blog`,
  `https://${HOST}/en/book`,
  `https://${HOST}/en/contact`,
];

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URLS,
};

const res = await fetch('https://www.bing.com/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

console.log(`IndexNow ping status: ${res.status}`);
console.log(`URLs submitted: ${URLS.length}`);
if (!res.ok) {
  const text = await res.text().catch(() => '');
  console.error('Response body:', text);
  process.exit(1);
}
console.log('Bing accepted the submission. Yandex/others forwarded automatically.');
