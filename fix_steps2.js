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

const HREF_TO_LABEL = {
  '/mortgage-calculators.html':   'Loans &amp; Mortgage',
  '/home-calculators.html':       'Home &amp; Energy',
  '/math-calculators.html':       'Math &amp; Science',
  '/analysis-calculators.html':   'Finance Analysis',
  '/health-calculators.html':     'Health',
  '/debt-calculators.html':       'Debt &amp; Budgeting',
  '/retirement-calculators.html': 'Retirement',
  '/education-calculators.html':  'Education',
  '/tax-calculators.html':        'Tax &amp; Income',
  '/budget-calculators.html':     'Budget &amp; Life',
};

// ── New CSS blocks ────────────────────────────────────────────────────────────
const NEW_BC_CSS =
  '.breadcrumb-nav{font-size:13px;color:rgba(255,255,255,.8);padding:0;margin-bottom:16px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center}' +
  '.breadcrumb-nav a{color:rgba(255,255,255,.95);text-decoration:none;font-weight:500}' +
  '.breadcrumb-nav a:hover{color:#fff;text-decoration:underline}' +
  '.breadcrumb-nav span{color:rgba(255,255,255,.5)}';

const BTN_CSS =
  '.btn{width:100%;padding:13px;background:var(--primary);color:#fff;border:none;border-radius:var(--radius-sm);font-size:15px;font-weight:700;cursor:pointer;transition:background .15s;margin-top:8px}' +
  '.btn:hover{background:var(--primary-dark)}';

const RESULT_LABEL_CSS =
  '.result-box .result-label,.result-label{font-size:12px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}' +
  '.result-box .result-value,.result-value{font-size:1.5rem;font-weight:800;color:var(--primary)}' +
  '.result-box.primary .result-label,.result-box.primary .result-value{color:#fff}' +
  '.result-box.primary{background:var(--primary);border-color:var(--primary)}';

// ── Counters ──────────────────────────────────────────────────────────────────
let s1=0, s2=0, s3=0, s4=0, s5=0;

tools.forEach(f => {
  let h = fs.readFileSync(path.join(DIR,f),'utf8');
  let changed = false;

  // ── STEP 1: Replace old breadcrumb CSS ──────────────────────────────────────
  const OLD_BC_CSS_RE = /\.breadcrumb-nav\{font-size:13px;color:var\(--text3\)[^}]+\}[\s\S]*?\.breadcrumb-nav span\{[^}]+\}/;
  if (OLD_BC_CSS_RE.test(h)) {
    h = h.replace(OLD_BC_CSS_RE, NEW_BC_CSS);
    s1++; changed = true;
  } else if (h.includes('.breadcrumb-nav{') && h.includes('color:var(--text3)')) {
    // Try simpler line-by-line replacement
    h = h
      .replace(/\.breadcrumb-nav\{[^}]*color:var\(--text3\)[^}]*\}/, '')
      .replace(/\.breadcrumb-nav a\{color:var\(--primary\)[^}]*\}/, '')
      .replace(/\.breadcrumb-nav a:hover\{[^}]*\}/, '')
      .replace(/\.breadcrumb-nav span\{[^}]*color:var\(--text3\)[^}]*\}/, '');
    h = h.replace('</style>', NEW_BC_CSS + '\n</style>');
    s1++; changed = true;
  }

  // ── STEP 2: Add .btn style if missing ────────────────────────────────────────
  if (!h.includes('.btn{') && !h.includes('.btn {')) {
    h = h.replace('</style>', BTN_CSS + '\n</style>');
    s2++; changed = true;
  }

  // ── STEP 3: Add result-label/result-value CSS if missing ─────────────────────
  if (!h.includes('.result-label{') && !h.includes('.result-box .result-label')) {
    h = h.replace('</style>', RESULT_LABEL_CSS + '\n</style>');
    s3++; changed = true;
  }

  // ── STEP 4: Fix breadcrumb category label to match href ──────────────────────
  // Pattern: Home > [cat link] > [tool name]
  // The second <a> in breadcrumb-nav is the category link
  h = h.replace(
    /(<nav class="breadcrumb-nav"[^>]*>[\s\S]*?<span[^>]*>›<\/span>\s*)(<a href="([^"]+)"[^>]*>)([^<]+)(<\/a>\s*<span)/,
    (full, before, aOpen, href, label, after) => {
      const expected = HREF_TO_LABEL[href];
      if (expected && expected !== label.trim()) {
        s4++; changed = true;
        return before + aOpen + expected + after;
      }
      return full;
    }
  );

  // ── STEP 5: Fix nav to use /#calculators ─────────────────────────────────────
  // Current: <nav><a href="/">Home</a><a href="/xxx-calculators.html">Calculators</a><a href="/" class="nav-cta">All Tools</a></nav>
  // Target:  <nav><a href="/">Home</a><a href="/#calculators">Calculators</a><a href="/#calculators" class="nav-cta">All Tools</a></nav>
  const newNav = '<nav><a href="/">Home</a><a href="/#calculators">Calculators</a><a href="/#calculators" class="nav-cta">All Tools</a></nav>';
  const navRe  = /<nav><a href="\/">Home<\/a><a href="[^"]*">Calculators<\/a><a href="[^"]*" class="nav-cta">All Tools<\/a><\/nav>/;
  if (navRe.test(h)) {
    const before = h;
    h = h.replace(navRe, newNav);
    if (h !== before) { s5++; changed = true; }
  }

  if (changed) fs.writeFileSync(path.join(DIR,f), h, 'utf8');
});

console.log('STEP 1 – Breadcrumb CSS updated:      ' + s1 + ' / 100');
console.log('STEP 2 – .btn style added:             ' + s2 + ' / 100');
console.log('STEP 3 – result-label style added:     ' + s3 + ' / 100');
console.log('STEP 4 – Breadcrumb label fixed:       ' + s4 + ' pages');
console.log('STEP 5 – Nav /#calculators fixed:      ' + s5 + ' pages');

// ── STEP 6: Verification ──────────────────────────────────────────────────────
console.log('\n── STEP 6: Verification ──');
const CHECK = ['inflation-calculator.html','home-renovation-calculator.html','compound-interest-calculator.html'];
CHECK.forEach(f => {
  const h = fs.readFileSync(path.join(DIR,f),'utf8');
  const hasNewBc = h.includes('rgba(255,255,255,.8)') && h.includes('breadcrumb-nav');
  const hasBtn   = h.includes('.btn{') || h.includes('.btn {');
  const hasResLbl= h.includes('.result-label{') || h.includes('.result-box .result-label');
  // Get breadcrumb cat href and label
  const bodyH = h.slice(h.indexOf('<body'));
  const bcM   = bodyH.match(/<span[^>]*>›<\/span>\s*<a href="([^"]+)"[^>]*>([^<]+)<\/a>/);
  const catHref = bcM ? bcM[1] : '?';
  const catLabel= bcM ? bcM[2] : '?';
  const expected= HREF_TO_LABEL[catHref] || '?';
  const catOk   = catLabel === expected;
  // Nav
  const navOk   = h.includes('href="/#calculators" class="nav-cta"');
  console.log(f + ':');
  console.log('  bc-color=' + (hasNewBc?'✓':'✗')
    + ' btn='    + (hasBtn?'✓':'✗')
    + ' res-lbl='+ (hasResLbl?'✓':'✗')
    + ' cat-ok=' + (catOk?'✓':'✗ ('+catLabel+' vs '+expected+')')
    + ' nav-cta='+ (navOk?'✓':'✗'));
});
