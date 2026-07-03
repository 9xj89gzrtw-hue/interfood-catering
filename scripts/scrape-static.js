#!/usr/bin/env node
/**
 * Scrape all pages from localhost:3000 and save as static HTML
 * Rewrites internal links to work as local file links
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = '/home/z/my-project/download/scraped-site';

const PAGES = [
  { path: '/', file: 'index.html' },
  { path: '/services', file: 'services.html' },
  { path: '/menu', file: 'menu.html' },
  { path: '/about', file: 'about.html' },
  { path: '/contacts', file: 'contacts.html' },
  { path: '/wedding', file: 'wedding.html' },
  { path: '/corporate', file: 'corporate.html' },
  { path: '/faq', file: 'faq.html' },
  { path: '/reviews', file: 'reviews.html' },
  { path: '/gallery', file: 'gallery.html' },
  { path: '/calculator', file: 'calculator.html' },
  { path: '/team', file: 'team.html' },
  { path: '/blog', file: 'blog.html' },
  { path: '/quiz', file: 'quiz.html' },
  { path: '/venues', file: 'venues.html' },
  { path: '/privacy', file: 'privacy.html' },
  { path: '/terms', file: 'terms.html' },
];

function fetchPage(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(BASE_URL + urlPath, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        const loc = new URL(res.headers.location, BASE_URL);
        fetchPage(loc.pathname).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function rewriteLinks(html) {
  // Rewrite Next.js _next paths to be relative
  html = html.replace(/href="\//g, 'href="./');
  html = html.replace(/src="\//g, 'src="./');
  
  // Rewrite internal page links to local .html files
  const pageMap = {
    '"/services"': '"./services.html"',
    '"/menu"': '"./menu.html"',
    '"/about"': '"./about.html"',
    '"/contacts"': '"./contacts.html"',
    '"/wedding"': '"./wedding.html"',
    '"/corporate"': '"./corporate.html"',
    '"/faq"': '"./faq.html"',
    '"/reviews"': '"./reviews.html"',
    '"/gallery"': '"./gallery.html"',
    '"/calculator"': '"./calculator.html"',
    '"/team"': '"./team.html"',
    '"/blog"': '"./blog.html"',
    '"/quiz"': '"./quiz.html"',
    '"/venues"': '"./venues.html"',
    '"/privacy"': '"./privacy.html"',
    '"/terms"': '"./terms.html"',
    '"/"': '"./index.html"',
  };

  // Rewrite href="./services" → href="./services.html" etc
  for (const [from, to] of Object.entries(pageMap)) {
    // Match href="./pagename" (already rewritten from / to ./)
    const fromRel = from.replace('"/', '"./');
    html = html.replace(new RegExp(fromRel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), to);
  }
  
  return html;
}

async function fetchStaticAssets(baseUrl, outputPath) {
  // Fetch _next/static assets
  const assets = [
    // We'll get these from the HTML itself
  ];
  // For now, we'll just save the HTML and note that _next assets are in the static export
  console.log('  Note: Static JS/CSS assets need the _next/ directory from the static export');
}

async function main() {
  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Scraping ${PAGES.length} pages from ${BASE_URL}...\n`);

  let success = 0;
  let failed = 0;

  for (const page of PAGES) {
    try {
      process.stdout.write(`  Fetching ${page.path}... `);
      const html = await fetchPage(page.path);
      const rewritten = rewriteLinks(html);
      const outPath = path.join(OUTPUT_DIR, page.file);
      fs.writeFileSync(outPath, rewritten);
      const sizeKB = (Buffer.byteLength(rewritten) / 1024).toFixed(1);
      console.log(`✓ ${sizeKB} KB`);
      success++;
    } catch (err) {
      console.log(`✗ ${err.message}`);
      failed++;
    }
  }

  // Copy the _next directory from the static export (out/) if available
  const staticNextDir = '/home/z/my-project/out/_next';
  const outNextDir = path.join(OUTPUT_DIR, '_next');
  if (fs.existsSync(staticNextDir)) {
    console.log('\n  Copying _next static assets from static export...');
    fs.cpSync(staticNextDir, outNextDir, { recursive: true });
    console.log('  ✓ _next assets copied');
  }

  // Copy public assets (images, icons, etc.)
  const publicDir = '/home/z/my-project/public';
  const assetsToCopy = ['images', 'icons', 'logo.svg', 'manifest.json'];
  for (const asset of assetsToCopy) {
    const src = path.join(publicDir, asset);
    const dst = path.join(OUTPUT_DIR, asset);
    if (fs.existsSync(src)) {
      fs.cpSync(src, dst, { recursive: true });
      console.log(`  ✓ Copied ${asset}`);
    }
  }

  console.log(`\nDone! ${success} pages saved, ${failed} failed.`);
  console.log(`Output: ${OUTPUT_DIR}`);
  
  // Total size
  const { execSync } = require('child_process');
  const totalSize = execSync(`du -sh ${OUTPUT_DIR}`).toString().trim();
  console.log(`Total size: ${totalSize.split('\t')[0]}`);
}

main().catch(console.error);
