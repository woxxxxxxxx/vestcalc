'use strict';
const fs   = require('fs');
const path = require('path');
const DIR  = 'C:/Users/Administrator/vestcalc';

const SKIP = new Set([
  'index.html','about.html','privacy.html','terms.html','contact.html','404.html',
  'mortgage-calculators.html','home-calculators.html','math-calculators.html',
  'analysis-calculators.html','health-calculators.html','debt-calculators.html',
  'retirement-calculators.html','education-calculators.html','tax-calculators.html',
  'budget-calculators.html',
]);
const tools = fs.readdirSync(DIR).filter(f => f.endsWith('.html') && !SKIP.has(f));

// Classes to audit
const AUDIT_CLASSES = [
  'breakdown','breakdown-item',
  'bar-wrap','bar-seg',
  'bar-legend','legend-item','legend-dot',
  'chart-wrap','chart-bar','chart-label',
  'info-box',
  'amort-table','table-wrap',
  'tag','badge',
  'toggle','slider',
];

// ── STEP 1: Audit ─────────────────────────────────────────────────────────────
const auditLines = ['FILE | MISSING CLASSES'];
const classMissCount = {};
let pagesWithIssues = 0;

tools.forEach(f => {
  const h = fs.readFileSync(path.join(DIR, f), 'utf8');
  const styleEnd = h.indexOf('</style>');
  const css  = styleEnd > 0 ? h.slice(0, styleEnd) : '';
  const body = h.slice(h.indexOf('<body') > 0 ? h.indexOf('<body') : 0);

  const missing = AUDIT_CLASSES.filter(cls => {
    const usedInBody = body.includes(`class="${cls}"`) || body.includes(`class="${cls} `) ||
                       body.includes(` ${cls}"`) || body.includes(` ${cls} `);
    const definedInCss = css.includes(`.${cls}{`) || css.includes(`.${cls} {`) ||
                         css.includes(`.${cls}:`) || css.includes(`, .${cls}`);
    return usedInBody && !definedInCss;
  });

  if (missing.length) {
    auditLines.push(`${f} | ${missing.join(', ')}`);
    pagesWithIssues++;
    missing.forEach(c => { classMissCount[c] = (classMissCount[c] || 0) + 1; });
  }
});

auditLines.push('');
auditLines.push(`Pages with missing component CSS: ${pagesWithIssues} / ${tools.length}`);
auditLines.push('Missing class counts:');
Object.entries(classMissCount).sort((a,b)=>b[1]-a[1]).forEach(([c,n])=>auditLines.push(`  .${c}: ${n} pages`));
fs.writeFileSync(path.join(DIR,'component-audit.txt'), auditLines.join('\n'), 'utf8');
console.log('STEP 1 – Audit complete. Pages with issues:', pagesWithIssues);
console.log('Top missing classes:');
Object.entries(classMissCount).sort((a,b)=>b[1]-a[1]).slice(0,8).forEach(([c,n])=>console.log(`  .${c}: ${n}`));

// ── STEP 2: Inject component CSS ─────────────────────────────────────────────
const COMPONENT_CSS = `
/* breakdown */
.breakdown{background:var(--bg);border:1px solid var(--border);border-radius:var(--radius-sm);padding:20px 24px;margin-top:20px}
.breakdown h3{font-size:14px;font-weight:700;color:var(--text);margin-bottom:14px}
.breakdown-item{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-size:14px;color:var(--text2)}
.breakdown-item:last-of-type{border-bottom:none}
.breakdown-item span:last-child{font-weight:700;color:var(--text)}
/* bar chart */
.bar-wrap{display:flex;height:12px;border-radius:99px;overflow:hidden;margin:16px 0 10px;background:var(--border)}
.bar-seg{height:100%;transition:width .4s}
.bar-legend{display:flex;gap:16px;flex-wrap:wrap}
.legend-item{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text2)}
.legend-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0}
/* info box */
.info-box{background:var(--primary-dim);border:1px solid var(--primary-light);border-radius:var(--radius-sm);padding:14px 18px;margin-top:16px;font-size:14px;color:var(--primary-dark);line-height:1.6}
/* amort / data table */
.amort-table{width:100%;border-collapse:collapse;font-size:13px;margin-top:16px}
.amort-table th{background:var(--bg);padding:10px 12px;text-align:right;font-weight:600;color:var(--text2);border-bottom:2px solid var(--border)}
.amort-table th:first-child{text-align:left}
.amort-table td{padding:8px 12px;text-align:right;border-bottom:1px solid var(--border);color:var(--text)}
.amort-table td:first-child{text-align:left;font-weight:600}
.amort-table tr:hover td{background:var(--primary-dim)}
.table-wrap{max-height:400px;overflow-y:auto;border:1px solid var(--border);border-radius:var(--radius-sm)}
/* chart bars */
.chart-wrap{display:flex;align-items:flex-end;gap:8px;height:120px;margin:20px 0 8px;padding:0 4px}
.chart-bar{flex:1;background:var(--primary);border-radius:4px 4px 0 0;min-width:20px;transition:height .3s}
.chart-label{font-size:11px;color:var(--text3);text-align:center;margin-top:4px}
/* tag / badge */
.tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:600;background:var(--primary-dim);color:var(--primary)}
.badge{display:inline-flex;align-items:center;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;background:var(--primary);color:#fff}`.trim();

// Sentinel to detect if already injected
const SENTINEL = '.breakdown{background:var(--bg)';

let injected = 0, skipped = 0;
tools.forEach(f => {
  let h = fs.readFileSync(path.join(DIR, f), 'utf8');
  if (h.includes(SENTINEL)) { skipped++; return; }
  h = h.replace('</style>', COMPONENT_CSS + '\n</style>');
  fs.writeFileSync(path.join(DIR, f), h, 'utf8');
  injected++;
});
console.log(`\nSTEP 2 – CSS injected: ${injected} pages | Already had it: ${skipped}`);

// ── STEP 3: Verify ────────────────────────────────────────────────────────────
console.log('\nSTEP 3 – Verification:');
['mortgage-calculator.html','compound-interest-calculator.html','amortization-calculator.html'].forEach(f => {
  const h = fs.readFileSync(path.join(DIR, f), 'utf8');
  const hasBreakdown = h.includes('.breakdown{');
  const hasBarWrap   = h.includes('.bar-wrap{');
  const hasAmort     = h.includes('.amort-table{');
  console.log(`  ${f}: breakdown=${hasBreakdown?'✓':'✗'} bar-wrap=${hasBarWrap?'✓':'✗'} amort-table=${hasAmort?'✓':'✗'}`);
});
