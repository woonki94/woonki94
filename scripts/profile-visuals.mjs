import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const xml = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const date = d => d.toISOString().slice(0, 10);
const ago = (today, n) => date(new Date(new Date(`${today}T00:00:00Z`).getTime() - n * 86400000));
const mono = 'ui-monospace,Menlo,Consolas,monospace';

export async function neuralAssets() {
  let svg = await readFile(join(root, 'vendor/awesome-github-profile/neural-pulse-lattice.original.svg'), 'utf8');
  svg = svg.replace('Jane Doe', 'Kim Woonki').replace('font-size="34"', 'font-size="44"')
    .replace('FRONTEND · INTERFACE · MOTION', 'MULTI-AGENT · RETRIEVAL · AI')
    .replace('v.2026.05 · ONLINE', 'APPLIED AI / ENGINEERING')
    .replace('jane.dev   @janedoe', 'github.com/woonki94')
    .replace('→ TRANSMIT', '→ EXPLORE THE WORK')
    .replace('SYSTEM NOMINAL · 9 SIGNALS IN FLIGHT · 15 EDGES', 'DECORATIVE NETWORK · 10 NODES · 15 EDGES');
  const from = svg.indexOf('    <g transform="translate(840,214)"');
  const end = svg.indexOf('    <line x1="840" y1="320"', from);
  const rows = [['orchestration', 'LangGraph'], ['retrieval', 'RAG'], ['matching', 'Cross-Encoder'], ['training', 'PyTorch'], ['privacy', 'DP-SGD']];
  svg = svg.slice(0, from) + `<g transform="translate(840,214)" font-size="13" fill="#b5c4db">${rows.map(([a, b], i) => `<text x="0" y="${i * 20}">${a}</text><text x="150" y="${i * 20}" fill="#f3f6fc">${b}</text>`).join('')}</g>\n` + svg.slice(end);
  svg = svg.replaceAll('#050810', '#101a2e').replaceAll('#fef3c7', '#e2eaff');
  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const mobile = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280" role="img" aria-label="Kim Woonki — Neural Pulse Lattice"><rect width="400" height="280" fill="#101a2e"/><g font-family="system-ui,sans-serif"><text x="24" y="39" fill="#f3f6fc" font-size="30" font-weight="700">Kim Woonki</text><text x="24" y="63" fill="#72aaff" font-size="13">MULTI-AGENT SYSTEMS · APPLIED AI</text></g><g transform="translate(0 70) scale(0.5)">${inner}</g></svg>`;
  return { 'neural-pulse-lattice.svg': svg, 'neural-pulse-lattice-mobile.svg': mobile };
}

export function summarize(raw, now = new Date()) {
  if (raw.errors?.length) throw new Error(raw.errors.map(e => e.message).join('; '));
  const today = date(now);
  const calendar = raw.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar?.weeks || !Number.isInteger(raw.data?.search?.issueCount)) throw new Error('Incomplete GitHub contribution or PR data.');
  const days = calendar.weeks.flatMap(w => w.contributionDays).filter(d => d.date <= today).sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length || days.some(d => !Number.isInteger(d.contributionCount) || d.contributionCount < 0)) throw new Error('Invalid contribution calendar.');
  const window = (lo, hi = today) => days.filter(d => d.date >= lo && d.date <= hi);
  const last30 = window(ago(today, 29));
  const prev30 = window(ago(today, 59), ago(today, 30));
  const last7 = window(ago(today, 6));
  const last90 = window(ago(today, 89));
  const total = xs => xs.reduce((sum, d) => sum + d.contributionCount, 0);
  let longest = 0, run = 0;
  for (const d of days) { run = d.contributionCount ? run + 1 : 0; longest = Math.max(longest, run); }
  let i = days.length - 1;
  if (days[i].date === today && !days[i].contributionCount) i--;
  let streak = 0;
  while (i >= 0 && days[i].contributionCount > 0) { streak++; i--; }
  const prev = total(prev30), current = total(last30);
  const change = prev ? `${current >= prev ? '+' : ''}${Math.round((current - prev) / prev * 100)}% vs previous 30d` : `previous 30d: ${prev}`;
  return { today, updated: now.toISOString(), days, last7, last30, last90, contributions30: current, change, streak, longest, merged30: raw.data.search.issueCount, active7: last7.filter(d => d.contributionCount > 0).length };
}

function points(days, x, y, width, height) {
  const max = Math.max(1, ...days.map(d => d.contributionCount));
  return days.map((d, i) => `${(x + i / Math.max(1, days.length - 1) * width).toFixed(1)},${(y + height - d.contributionCount / max * height).toFixed(1)}`).join(' ');
}

function tile({ x, y, width, label, value, note, color, chart = '', mobile = false }) {
  return `<g transform="translate(${x},${y})"><rect width="${width}" height="128" rx="12" fill="url(#ag-card)" stroke="#2a3652" stroke-width="0.8"/><g font-family="${mono}"><text x="16" y="28" fill="#b5c4db" font-size="${mobile ? 11 : 12}" letter-spacing="1">${xml(label)}</text><text x="16" y="70" fill="#f3f6fc" font-family="system-ui,sans-serif" font-size="36" font-weight="700">${xml(value)}</text><text x="16" y="91" fill="${color}" font-size="${mobile ? 10 : 11}">${xml(note)}</text></g>${chart}</g>`;
}

export async function analyticsAssets(m) {
  const original = await readFile(join(root, 'vendor/awesome-github-profile/analytics-grid.original.svg'), 'utf8');
  const defs = original.match(/<defs>[\s\S]*?<\/defs>/)[0];
  const pulse = '<animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite"/>';
  const spark = `<polyline points="${points(m.last30, 16, 105, 222, 16)}" fill="none" stroke="#72aaff" stroke-width="1.5"/>`;
  const bars = m.days.slice(-14).map((d, i) => `<rect x="${16 + i * 15}" y="${d.contributionCount ? 104 : 117}" width="8" height="${d.contributionCount ? 18 : 5}" rx="2" fill="${d.contributionCount ? '#a78bfa' : '#334155'}"/>`).join('');
  const cadence = m.last7.map((d, i) => `<circle cx="${25 + i * 29}" cy="109" r="4" fill="${d.contributionCount ? '#67e8f9' : '#334155'}"/><text x="${25 + i * 29}" y="124" text-anchor="middle" fill="#b5c4db" font-family="${mono}" font-size="9">${'SMTWTFS'[new Date(d.date + 'T00:00:00Z').getUTCDay()]}</text>`).join('');
  const cards = [
    { x: 60, y: 148, width: 262, label: 'CONTRIBUTIONS · 30D', value: m.contributions30.toLocaleString('en-US'), note: m.change, color: '#72aaff', chart: spark },
    { x: 338, y: 148, width: 262, label: 'ACTIVE STREAK', value: `${m.streak}d`, note: `longest in calendar: ${m.longest}d`, color: '#a78bfa', chart: bars },
    { x: 616, y: 148, width: 262, label: 'MERGED PRs · 30D', value: m.merged30, note: 'public authored pull requests', color: '#b7caff' },
    { x: 894, y: 148, width: 246, label: 'ACTIVE DAYS · 7D', value: `${m.active7} / 7`, note: 'contribution calendar', color: '#67e8f9', chart: cadence },
  ];
  const trend = (x, y, width, height, labelSize = 12) => {
    const p = points(m.last90, 18, 32, width - 36, height - 56);
    const [cx, cy] = p.split(' ').at(-1).split(',');
    const peak = Math.max(0, ...m.last90.map(d => d.contributionCount));
    return `<g transform="translate(${x},${y})"><rect width="${width}" height="${height}" rx="12" fill="url(#ag-card)" stroke="#2a3652"/><text x="18" y="23" fill="#b5c4db" font-family="${mono}" font-size="${labelSize}" letter-spacing="1">DAILY CONTRIBUTIONS · 90D</text><polyline points="18,${height - 24} ${p} ${width - 18},${height - 24}" fill="url(#ag-spark2)"/><polyline points="${p}" fill="none" stroke="#a78bfa" stroke-width="1.8"/><circle cx="${cx}" cy="${cy}" r="3.5" fill="#dbeafe">${pulse}</circle><text x="${width - 18}" y="${height - 7}" text-anchor="end" fill="#b5c4db" font-family="${mono}" font-size="10">${xml(m.last90[0].date)} to ${m.today} · peak ${peak}</text></g>`;
  };
  const title = `<g font-family="${mono}" font-size="12" letter-spacing="2"><text x="60" y="48" fill="#72aaff">UPDATED ${m.today} UTC</text><text x="1140" y="48" fill="#b5c4db" text-anchor="end">GITHUB / PUBLIC ACTIVITY</text></g><text x="60" y="98" fill="#f3f6fc" font-family="system-ui,sans-serif" font-size="32" font-weight="700">GitHub activity.</text><text x="60" y="123" fill="#b5c4db" font-family="${mono}" font-size="13">KIM WOONKI · CONTRIBUTIONS / STREAK / MERGES / CADENCE</text>`;
  const desktop = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="430" viewBox="0 0 1200 430" role="img" aria-label="GitHub Analytics Grid">${defs}<rect width="1200" height="430" rx="14" fill="#101a2e"/>${title}${cards.map(tile).join('')}${trend(60, 296, 1080, 102)}<text x="60" y="421" fill="#94a3b8" font-family="${mono}" font-size="11">GitHub contribution calendar + public PR search · daily snapshot</text></svg>`;
  const mobileCards = cards.map((c, i) => ({ ...c, x: 16 + (i % 2) * 188, y: 82 + Math.floor(i / 2) * 140, width: 172, mobile: true, chart: '', label: ['CONTRIB. · 30D', 'ACTIVE STREAK', 'MERGED PRs · 30D', 'ACTIVE DAYS · 7D'][i], note: [m.today, `longest: ${m.longest}d`, 'public authored PRs', 'calendar days'][i] }));
  const mobile = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="488" viewBox="0 0 400 488" role="img" aria-label="GitHub Analytics Grid">${defs}<rect width="400" height="488" rx="14" fill="#101a2e"/><text x="20" y="33" fill="#f3f6fc" font-family="system-ui,sans-serif" font-size="26" font-weight="700">GitHub activity.</text><text x="20" y="57" fill="#b5c4db" font-family="${mono}" font-size="11">UPDATED ${m.today} UTC · DAILY SNAPSHOT</text>${mobileCards.map(tile).join('')}${trend(16, 370, 360, 102, 11)}</svg>`;
  return { 'analytics-grid.svg': desktop, 'analytics-grid-mobile.svg': mobile };
}

async function main() {
  const args = process.argv.slice(2);
  const outputFlag = args.indexOf('--output');
  const output = resolve(root, outputFlag >= 0 ? args[outputFlag + 1] : '.generated');
  await mkdir(output, { recursive: true });
  const assets = await neuralAssets();
  if (!args.includes('--neural-only')) {
    if (!process.env.GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is required for real activity data.');
    const now = new Date(), today = date(now), start30 = ago(today, 29);
    const query = `query($login:String!,$from:DateTime!,$to:DateTime!,$search:String!){user(login:$login){contributionsCollection(from:$from,to:$to){contributionCalendar{weeks{contributionDays{date contributionCount}}}}}search(query:$search,type:ISSUE,first:1){issueCount}}`;
    const response = await fetch('https://api.github.com/graphql', { method: 'POST', headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, 'Content-Type': 'application/json', 'User-Agent': 'woonki94-profile-visuals' }, body: JSON.stringify({ query, variables: { login: 'woonki94', from: `${ago(today, 364)}T00:00:00Z`, to: now.toISOString(), search: `author:woonki94 is:pr is:merged merged:${start30}..${today} is:public` } }) });
    if (!response.ok) throw new Error(`GitHub GraphQL request failed (${response.status}).`);
    const metrics = summarize(await response.json(), now);
    Object.assign(assets, await analyticsAssets(metrics));
    await writeFile(join(output, 'activity-summary.json'), JSON.stringify({ updatedAt: metrics.updated, window: 'UTC', contributions30: metrics.contributions30, activeStreak: metrics.streak, mergedPublicPRs30: metrics.merged30, activeDays7: metrics.active7 }, null, 2));
  }
  for (const [name, svg] of Object.entries(assets)) await writeFile(join(output, name), svg);
  console.log(`Generated ${Object.keys(assets).length} SVG assets.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
