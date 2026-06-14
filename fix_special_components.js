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

// ── 1. .full — 19页批量注入 ──────────────────────────────────────────────────
const FULL_CSS = '.form-group.full{grid-column:1/-1}';
let fullFixed = 0;
tools.forEach(f => {
  let h = fs.readFileSync(path.join(DIR, f), 'utf8');
  if (h.includes('form-group full') && !h.includes('.form-group.full')) {
    h = h.replace('</style>', FULL_CSS + '\n</style>');
    fs.writeFileSync(path.join(DIR, f), h, 'utf8');
    fullFixed++;
  }
});
console.log('1. .full 修复：' + fullFixed + ' 页');

// ── 2. compound-interest-calculator.html — .year-table ───────────────────────
const YEAR_TABLE_CSS =
  '.year-table{width:100%;border-collapse:collapse;font-size:13px;margin-top:16px}' +
  '.year-table th{background:var(--primary);color:#fff;padding:10px 12px;text-align:right;font-weight:600}' +
  '.year-table th:first-child{text-align:left}' +
  '.year-table td{padding:8px 12px;text-align:right;border-bottom:1px solid var(--border);color:var(--text)}' +
  '.year-table td:first-child{text-align:left;font-weight:600;color:var(--primary)}' +
  '.year-table tr:hover td{background:var(--primary-dim)}' +
  '.year-table-wrap{max-height:400px;overflow-y:auto;border:1px solid var(--border);border-radius:var(--radius-sm)}';
{
  const f = path.join(DIR, 'compound-interest-calculator.html');
  let h = fs.readFileSync(f, 'utf8');
  if (!h.includes('.year-table{')) {
    h = h.replace('</style>', YEAR_TABLE_CSS + '\n</style>');
    fs.writeFileSync(f, h, 'utf8');
    console.log('2. compound-interest-calculator.html — .year-table 已追加');
  } else {
    console.log('2. compound-interest-calculator.html — .year-table 已存在，跳过');
  }
}

// ── 3. tax-calculator.html — .bracket-table ──────────────────────────────────
const BRACKET_TABLE_CSS =
  '.bracket-table{width:100%;border-collapse:collapse;font-size:13px;margin-top:16px}' +
  '.bracket-table th{background:var(--primary);color:#fff;padding:10px 12px;text-align:right;font-weight:600}' +
  '.bracket-table th:first-child{text-align:left}' +
  '.bracket-table td{padding:8px 12px;text-align:right;border-bottom:1px solid var(--border);color:var(--text)}' +
  '.bracket-table td:first-child{text-align:left;font-weight:500}' +
  '.bracket-table tr:hover td{background:var(--primary-dim)}' +
  '.bracket-table tr.active-bracket td{background:var(--primary-dim);font-weight:700;color:var(--primary)}';
{
  const f = path.join(DIR, 'tax-calculator.html');
  let h = fs.readFileSync(f, 'utf8');
  if (!h.includes('.bracket-table{')) {
    h = h.replace('</style>', BRACKET_TABLE_CSS + '\n</style>');
    fs.writeFileSync(f, h, 'utf8');
    console.log('3. tax-calculator.html — .bracket-table 已追加');
  } else {
    console.log('3. tax-calculator.html — .bracket-table 已存在，跳过');
  }
}

// ── 4. retirement-calculator.html — .status-banner ───────────────────────────
const STATUS_BANNER_CSS =
  '.status-banner{border-radius:var(--radius-sm);padding:14px 18px;margin-top:16px;font-size:14px;font-weight:600;text-align:center}' +
  '.status-banner.good{background:#dcfce7;border:1px solid #86efac;color:#16a34a}' +
  '.status-banner.warn{background:#fef9c3;border:1px solid #fde047;color:#854d0e}' +
  '.status-banner.bad{background:#fee2e2;border:1px solid #fca5a5;color:#dc2626}';
{
  const f = path.join(DIR, 'retirement-calculator.html');
  let h = fs.readFileSync(f, 'utf8');
  if (!h.includes('.status-banner{')) {
    h = h.replace('</style>', STATUS_BANNER_CSS + '\n</style>');
    fs.writeFileSync(f, h, 'utf8');
    console.log('4. retirement-calculator.html — .status-banner 已追加');
  } else {
    console.log('4. retirement-calculator.html — .status-banner 已存在，跳过');
  }
}

// ── 5. percentage-calculator.html — .pct-row/.pct-result ─────────────────────
const PCT_CSS =
  '.pct-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px}' +
  '.pct-row input{width:120px;padding:8px 12px;border:1px solid var(--border);border-radius:var(--radius-sm);font-size:15px;color:var(--text);background:var(--bg);outline:none;transition:border .15s}' +
  '.pct-row input:focus{border-color:var(--primary)}' +
  '.pct-row span{font-size:15px;color:var(--text2);white-space:nowrap}' +
  '.pct-result{font-size:1.4rem;font-weight:800;color:var(--primary);margin-top:6px;padding:4px 0}';
{
  const f = path.join(DIR, 'percentage-calculator.html');
  let h = fs.readFileSync(f, 'utf8');
  if (!h.includes('.pct-row{')) {
    h = h.replace('</style>', PCT_CSS + '\n</style>');
    fs.writeFileSync(f, h, 'utf8');
    console.log('5. percentage-calculator.html — .pct-row/.pct-result 已追加');
  } else {
    console.log('5. percentage-calculator.html — .pct-row 已存在，跳过');
  }
}

// ── 6. savings-goal-calculator.html — .progress-wrap/.progress-label ─────────
const PROGRESS_WRAP_CSS =
  '.progress-wrap{margin:12px 0 6px}' +
  '.progress-label{display:flex;justify-content:space-between;font-size:12px;color:var(--text3);margin-bottom:4px}';
{
  const f = path.join(DIR, 'savings-goal-calculator.html');
  let h = fs.readFileSync(f, 'utf8');
  if (!h.includes('.progress-wrap{')) {
    h = h.replace('</style>', PROGRESS_WRAP_CSS + '\n</style>');
    fs.writeFileSync(f, h, 'utf8');
    console.log('6. savings-goal-calculator.html — .progress-wrap/.progress-label 已追加');
  } else {
    console.log('6. savings-goal-calculator.html — .progress-wrap 已存在，跳过');
  }
}

// ── 7. budget-calculator.html — .section-header/.row-list/.divider ───────────
const BUDGET_EXTRA_CSS =
  '.section-header{display:flex;align-items:center;justify-content:space-between;margin:16px 0 10px;padding-bottom:6px;border-bottom:2px solid var(--primary-light)}' +
  '.section-header h3{font-size:15px;font-weight:700;color:var(--text);margin:0}' +
  '.row-list{display:flex;flex-direction:column;gap:8px;margin-bottom:12px}' +
  '.divider{height:1px;background:var(--border);border:none;margin:16px 0}';
{
  const f = path.join(DIR, 'budget-calculator.html');
  let h = fs.readFileSync(f, 'utf8');
  let changed = false;
  if (!h.includes('.section-header{')) {
    h = h.replace('</style>', BUDGET_EXTRA_CSS + '\n</style>');
    changed = true;
    console.log('7a. budget-calculator.html — .section-header/.row-list/.divider 已追加');
  } else {
    console.log('7a. budget-calculator.html — .section-header 已存在，跳过');
  }
  // Add btn class if still btn-add (already fixed in previous commit, but double-check)
  if (h.includes('class="btn-add"')) {
    h = h.replace(/class="btn-add"/g, 'class="add-btn"');
    changed = true;
    console.log('7b. budget-calculator.html — btn-add → add-btn 已修正');
  } else {
    console.log('7b. budget-calculator.html — add-btn 已正确，跳过');
  }
  if (changed) fs.writeFileSync(f, h, 'utf8');
}

// ── Verify ────────────────────────────────────────────────────────────────────
console.log('\n── 验证 ──');
const checks = [
  ['bmi-calculator.html',               '.form-group.full'],
  ['calorie-calculator.html',           '.form-group.full'],
  ['compound-interest-calculator.html', '.year-table{'],
  ['tax-calculator.html',               '.bracket-table{'],
  ['retirement-calculator.html',        '.status-banner{'],
  ['percentage-calculator.html',        '.pct-row{'],
  ['savings-goal-calculator.html',      '.progress-wrap{'],
  ['budget-calculator.html',            '.section-header{'],
];
checks.forEach(([f, sentinel]) => {
  const h = fs.readFileSync(path.join(DIR, f), 'utf8');
  console.log('  ' + f + ' [' + sentinel + '] ' + (h.includes(sentinel) ? '✓' : '✗'));
});
