import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Compact adaptation of Awesome GitHub Profile's Swiss Grid SVG.
// The original template and its license are preserved under vendor/.
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const original = await readFile(join(root, 'vendor/awesome-github-profile/swiss-grid.original.svg'), 'utf8');
let header = original
  .replace('viewBox="0 0 1200 420" width="1200" height="420"', 'viewBox="0 0 1200 240" width="1200" height="240"')
  .replace('aria-label="Swiss Grid — a twelve-column grid, left it visible, with one red accent"', 'aria-label="Kim Woonki — Applied AI"')
  .replace('<title>Swiss Grid</title>', '<title>Kim Woonki — Applied AI</title>')
  .replace(/<desc>[\s\S]*?<\/desc>/, '<desc>Multi-agent systems and language model privacy. Compact Swiss Grid header.</desc>');
const start = header.indexOf('  <g font-family=');
header = header.slice(0, start) + `
  <g font-family="Helvetica Neue,Helvetica,Arial,system-ui,sans-serif">
    <g font-family="ui-monospace,Menlo,Consolas,monospace" font-size="15" fill="#6d6a63" letter-spacing="2">
      <text x="72" y="76">ARTIFICIAL INTELLIGENCE</text>
      <text x="1128" y="76" text-anchor="end">RESEARCH / ENGINEERING</text>
    </g>
    <text x="68" y="165" font-size="88" font-weight="700" fill="#0f0f0f" letter-spacing="-4">Kim</text>
    <text x="246" y="165" font-size="88" font-weight="700" fill="#d0021b" letter-spacing="-4">Woonki</text>
    <text x="816" y="125" font-size="26" font-weight="500" fill="#0f0f0f">Multi-agent systems</text>
    <text x="816" y="162" font-size="26" font-weight="500" fill="#0f0f0f">Language model privacy</text>
    <path d="M72 200H1128" stroke="#0f0f0f" stroke-width="1.5"/>
  </g>
</svg>`;
const mobile = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="180" viewBox="0 0 400 180" role="img" aria-label="Kim Woonki — Applied AI">
  <title>Kim Woonki — Applied AI</title>
  <defs><pattern id="grid" width="44" height="180" patternUnits="userSpaceOnUse"><rect width="38" height="180" fill="#0f0f0f" opacity="0.04"/></pattern></defs>
  <rect width="400" height="180" fill="#f2f0eb"/><rect x="24" width="352" height="180" fill="url(#grid)"/>
  <path d="M24 20H376" stroke="#0f0f0f" stroke-width="3"/>
  <g font-family="Helvetica Neue,Helvetica,Arial,system-ui,sans-serif">
    <text x="24" y="47" font-family="ui-monospace,monospace" font-size="11" fill="#6d6a63" letter-spacing="1.5">ARTIFICIAL INTELLIGENCE</text>
    <text x="22" y="108" font-size="46" font-weight="700" fill="#0f0f0f" letter-spacing="-2">Kim</text>
    <text x="115" y="108" font-size="46" font-weight="700" fill="#d0021b" letter-spacing="-2">Woonki</text>
    <text x="24" y="144" font-size="15" fill="#0f0f0f">Multi-agent systems · Language model privacy</text>
    <path d="M24 162H376" stroke="#0f0f0f" stroke-width="1"/>
  </g>
</svg>`;
await writeFile(join(root, 'assets/editorial-header.svg'), header);
await writeFile(join(root, 'assets/editorial-header-mobile.svg'), mobile);
console.log('Generated compact desktop and mobile Swiss Grid headers.');
