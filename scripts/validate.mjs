import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
export async function validate(directory = 'public') {
  const base = resolve(root, directory);
  const reference = JSON.parse(await readFile(join(root, 'source-integrity.json'), 'utf8'));
  async function walk(dir, prefix = '') {
    const paths = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const relative = prefix + entry.name;
      assert(!entry.isSymbolicLink(), 'No symlinks in web assets');
      if (entry.isDirectory()) paths.push(...await walk(join(dir, entry.name), relative + '/'));
      else paths.push(relative);
    }
    return paths.sort();
  }
  assert.deepEqual(await walk(base), Object.keys(reference.files).sort(), 'Exact original asset inventory');
  for (const [name, expected] of Object.entries(reference.files)) {
    const bytes = await readFile(join(base, name));
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected, `Original bytes: ${name}`);
    if (name.endsWith('.jpeg')) assert.equal(bytes.subarray(0, 3).toString('hex'), 'ffd8ff');
  }
  const html = await readFile(join(base, 'index.html'), 'utf8');
  const expected = JSON.parse(await readFile(join(root, 'catalog.snapshot.json'), 'utf8'));
  const blocks = [...html.matchAll(/<article class="product reveal">(.*?)<\/article>/gs)].map(m => m[1]);
  assert.equal(blocks.length, 6);
  const products = blocks.map((block, i) => ({
    id: expected[i].id,
    name: block.match(/<h3>(.*?)<\/h3>/s)[1],
    description: block.match(/<p class="detail">(.*?)<\/p>/s)[1],
    price_clp: Number(block.match(/class="price">\$([\d.]+)/)[1].replaceAll('.', '')),
    unit: block.includes('class="per"') ? 'c/u' : '',
    image: block.match(/<img src="(.*?)"/)[1],
    alt: block.match(/alt="(.*?)"/)[1],
    whatsapp_url: block.match(/href="(.*?)"/)[1]
  }));
  assert.deepEqual(products, expected, 'Product names, descriptions, prices, images and contact links');
  assert.equal(new Set(expected.map(p => p.id)).size, 6, 'Unique stable reference IDs');
  const links = [...html.matchAll(/href="(.*?)"/g)].map(m => m[1]);
  assert.equal(links.filter(h => h.startsWith('https://wa.me/')).length, 9);
  for (const href of links) {
    if (href.startsWith('#')) assert(html.includes(`id="${href.slice(1)}"`), `Anchor ${href}`);
    else {
      const url = new URL(href);
      assert.equal(url.origin, 'https://wa.me');
      assert.equal(url.pathname, '/56983658040');
      assert(url.searchParams.get('text')?.startsWith('Hola,'));
    }
  }
  for (const p of products.slice(0, 5)) {
    const amount = '$' + String(p.price_clp).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    assert(new URL(p.whatsapp_url).searchParams.get('text').includes(amount));
  }
  assert(!/<(?:dialog|form)\b/.test(html), 'No added modals or forms');
  console.log(`${directory}: 7 original files, 6 products, 9 WhatsApp links, anchors and SHA-256 parity OK`);
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await validate();
