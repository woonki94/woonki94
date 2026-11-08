import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { stripTypeScriptTypes } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

// RyMe.md Sleek renderers are vendored under their original MIT license.
// Only layout height/title and the exported SVG decoration are customized.
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const tmp = await mkdtemp(join(tmpdir(), 'profile-render-'));
const theme = { bg: '#101a2e', fg: '#f3f6fc', accent: '#72aaff', muted: '#b5c4db' };
const xml = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const info = {
  name: 'Kim Woonki', role: 'M.S. in AI', org: 'Oregon State University', location: '',
  tagline: 'Applied AI · Language Model Privacy · Machine Learning Optimization',
  bio: 'I build multi-agent retrieval and recommendation systems and study how language models memorize training data. My projects span grant discovery, privacy-preserving training, numerical optimization, and computer vision.',
  skills: [], socials: [], githubUsername: 'woonki94', githubStats: null,
};
try {
  const utils = await readFile(join(root, 'vendor/ryme/text-utils.ts'), 'utf8');
  await writeFile(join(tmp, 'text-utils.mjs'), stripTypeScriptTypes(utils));
  const render = async (name, adapt = s => s) => {
    let source = adapt(await readFile(join(root, `vendor/ryme/templates/${name}.ts`), 'utf8'));
    source = stripTypeScriptTypes(source).replace('"../text-utils"', '"./text-utils.mjs"');
    const filename = join(tmp, `${name}.mjs`);
    await writeFile(filename, source);
    return (await import(pathToFileURL(filename).href)).default;
  };
  const hero = await render('sleek-header');
  let header = hero.renderSvg(info, theme, 8, { loopText: false });
  const ornament = `
    <g fill="none" stroke="${theme.accent}" stroke-opacity="0.08">
      <circle cx="770" cy="280" r="150"/><circle cx="770" cy="280" r="110"/>
      <circle cx="30" cy="40" r="130"/>
    </g>
    <text x="400" y="57" text-anchor="middle" fill="${theme.accent}" font-family="ui-monospace,monospace" font-size="10" letter-spacing="3">APPLIED AI / RESEARCH PORTFOLIO</text>
    <g font-family="ui-monospace,monospace" font-size="11" text-anchor="middle">
      ${['MULTI-AGENT', 'MODEL PRIVACY', 'OPTIMIZATION'].map((label, i) => `<rect x="${150 + i * 170}" y="232" width="160" height="27" rx="13.5" fill="${theme.accent}" fill-opacity="0.09" stroke="${theme.accent}" stroke-opacity="0.25"/><text x="${230 + i * 170}" y="250" fill="${theme.muted}">${label}</text>`).join('')}
    </g>`;
  header = header.replace('<!-- Corner decorations:', `${ornament}\n<!-- Corner decorations:`);
  const about = await render('about-card', s => s.replace('const H = 320;', 'const H = 230;').replace('info.name ? `Hi, I\'m ${info.name}.` : "About me."', '"Research & engineering."'));
  const bio = about.renderSvg({ ...info, role: '', org: '', location: '' }, theme, 8, { loopText: false });
  const tag = (text, x, y, w, color) => `<rect x="${x}" y="${y}" width="${w}" height="24" rx="6" fill="${color}" fill-opacity="0.1" stroke="${color}" stroke-opacity="0.25"/><text x="${x + 10}" y="${y + 16}" font-size="11" fill="${color}" font-family="ui-monospace,monospace">${xml(text)}</text>`;
  const project = ({ number, title, subtitle, color, tags, illustration }) => `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="174" viewBox="0 0 800 174" role="img">
    <title>${xml(title)} — ${xml(subtitle)}</title>
    <defs><linearGradient id="surface" x2="1" y2="1"><stop stop-color="#14243c"/><stop offset="1" stop-color="#101a2e"/></linearGradient></defs>
    <rect x="0.5" y="0.5" width="799" height="173" rx="14" fill="url(#surface)" stroke="#2b3b55"/>
    <rect x="0" y="26" width="3" height="122" rx="1.5" fill="${color}"/>
    <g font-family="system-ui,-apple-system,Segoe UI,sans-serif">
      <text x="30" y="30" fill="${color}" font-family="ui-monospace,monospace" font-size="10" letter-spacing="2">${number} / SELECTED WORK</text>
      <text x="30" y="72" fill="#f3f6fc" font-size="28" font-weight="700" letter-spacing="-0.6">${xml(title)}</text>
      <text x="30" y="101" fill="#b5c4db" font-size="14">${xml(subtitle)}</text>
      ${tags.map((t, i) => tag(t[0], 30 + tags.slice(0, i).reduce((a, x) => a + x[1] + 8, 0), 124, t[1], color)).join('')}
    </g>
    <g transform="translate(630 38)" fill="none" stroke="${color}" stroke-width="1.5">${illustration}</g>
  </svg>`;
  const grant = project({ number: '01', title: 'GrantMatchMaking Agent', subtitle: 'Multi-agent research funding discovery with LangGraph', color: '#72aaff', tags: [['MULTI-AGENT', 108], ['LANGGRAPH', 91], ['RAG', 50]], illustration: '<path d="M20 36H110M20 36L65 90M110 36L65 90" stroke-opacity="0.45"/><rect x="4" y="20" width="32" height="32" rx="8" fill="#182e4b"/><rect x="94" y="20" width="32" height="32" rx="8" fill="#182e4b"/><rect x="49" y="74" width="32" height="32" rx="8" fill="#182e4b"/><path d="M14 32h12m-12 8h8m80-8h12m-12 8h8m-57 46h12m-12 8h8"/>' });
  const privacy = project({ number: '02', title: 'Language Model Privacy', subtitle: 'Memorization, extraction attacks, and differential privacy', color: '#b7a1ff', tags: [['GPT-2 / LoRA', 111], ['DP-SGD', 74], ['EVALUATION', 99]], illustration: '<path d="M65 6L105 23V55C105 82 84 100 65 112C46 100 25 82 25 55V23Z" fill="#241f40" stroke-opacity="0.7"/><rect x="48" y="52" width="34" height="30" rx="6"/><path d="M54 52V42a11 11 0 0122 0v10"/><circle cx="65" cy="65" r="3" fill="#b7a1ff"/>' });
  const footer = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="64" viewBox="0 0 800 64"><rect width="800" height="64" rx="12" fill="#101a2e"/><path d="M28 32h64" stroke="#72aaff"/><text x="112" y="38" fill="#b5c4db" font-family="ui-monospace,monospace" font-size="14">Research. Implement. Evaluate.</text><text x="770" y="38" text-anchor="end" fill="#72aaff" font-family="ui-monospace,monospace" font-size="12">github.com/woonki94</text></svg>`;
  await mkdir(join(root, 'assets'), { recursive: true });
  const wrap = (text, max) => {
    const lines = []; let line = '';
    for (const word of text.split(' ')) { if ((line + ' ' + word).trim().length > max) { lines.push(line); line = word; } else line = (line + ' ' + word).trim(); }
    if (line) lines.push(line); return lines;
  };
  const mobileBase = (height, content) => `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="${height}" viewBox="0 0 400 ${height}"><rect x="0.5" y="0.5" width="399" height="${height - 1}" rx="14" fill="#101a2e" stroke="#2b3b55"/><g font-family="system-ui,-apple-system,Segoe UI,sans-serif">${content}</g></svg>`;
  const mobileHeader = mobileBase(254, `<text x="200" y="34" text-anchor="middle" fill="#72aaff" font-family="ui-monospace,monospace" font-size="10" letter-spacing="1.4">APPLIED AI / RESEARCH PORTFOLIO</text><text x="200" y="95" text-anchor="middle" fill="#f3f6fc" font-size="42" font-weight="700" letter-spacing="-1.5">Kim Woonki</text><path d="M64 118H336" stroke="#72aaff" stroke-width="2"/><g text-anchor="middle" fill="#b5c4db" font-size="16"><text x="200" y="153">M.S. in AI</text><text x="200" y="179">Oregon State University</text></g>${['MULTI-AGENT', 'MODEL PRIVACY', 'OPTIMIZATION'].map((t, i) => `<rect x="${23 + i * 120}" y="207" width="114" height="24" rx="12" fill="#72aaff" fill-opacity="0.1" stroke="#72aaff" stroke-opacity="0.25"/><text x="${80 + i * 120}" y="223" text-anchor="middle" fill="#b5c4db" font-family="ui-monospace,monospace" font-size="9.5">${t}</text>`).join('')}`);
  const bioLines = wrap(info.bio, 36);
  const mobileAbout = mobileBase(116 + bioLines.length * 25, `<path d="M16 28V${86 + bioLines.length * 25}" stroke="#72aaff" stroke-width="3"/><text x="30" y="51" fill="#f3f6fc" font-size="25" font-weight="700" letter-spacing="-0.5">Research &amp; engineering.</text><g fill="#b5c4db" font-size="18">${bioLines.map((t, i) => `<text x="30" y="${94 + i * 25}">${xml(t)}</text>`).join('')}</g>`);
  const mobileProject = (number, title, lines, tags, color) => mobileBase(178, `<text x="24" y="28" fill="${color}" font-family="ui-monospace,monospace" font-size="10" letter-spacing="1.5">${number} / SELECTED WORK</text><text x="24" y="67" fill="#f3f6fc" font-size="${title.length > 20 ? 25 : 30}" font-weight="700" letter-spacing="-0.7">${xml(title)}</text><g fill="#b5c4db" font-size="16">${lines.map((t, i) => `<text x="24" y="${96 + i * 22}">${xml(t)}</text>`).join('')}</g><text x="24" y="151" fill="${color}" font-family="ui-monospace,monospace" font-size="11">${xml(tags)}</text>`);
  const mobileGrant = mobileProject('01', 'GrantMatchMaking Agent', ['Multi-agent research funding discovery', 'with LangGraph orchestration'], 'MULTI-AGENT / LANGGRAPH / RAG', '#72aaff');
  const mobilePrivacy = mobileProject('02', 'Language Model Privacy', ['Memorization, extraction attacks,', 'and differential privacy'], 'GPT-2 / LoRA / DP-SGD / EVALUATION', '#b7a1ff');
  const mobileFooter = mobileBase(86, '<path d="M24 25H80" stroke="#72aaff"/><text x="24" y="54" fill="#b5c4db" font-family="ui-monospace,monospace" font-size="16">Research. Implement. Evaluate.</text>');
  for (const [name, svg] of Object.entries({ header, about: bio, 'project-grant': grant, 'project-privacy': privacy, footer, 'header-mobile': mobileHeader, 'about-mobile': mobileAbout, 'project-grant-mobile': mobileGrant, 'project-privacy-mobile': mobilePrivacy, 'footer-mobile': mobileFooter })) {
    await writeFile(join(root, `assets/${name}.svg`), svg);
  }
  console.log('Generated 10 desktop/mobile profile SVGs from RyMe Sleek + project card layouts.');
} finally { await rm(tmp, { recursive: true, force: true }); }
