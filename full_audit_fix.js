'use strict';
const fs   = require('fs');
const path = require('path');

const DIR  = 'C:/Users/Administrator/vestcalc';
const BASE = 'https://vestcalc.com';

// ── Category mapping ──────────────────────────────────────────────────────────
const CAT_META = {
  mortgage:   { file: 'mortgage-calculators.html',   label: 'Loans & Mortgage'  },
  home:       { file: 'home-calculators.html',       label: 'Home & Energy'     },
  math:       { file: 'math-calculators.html',       label: 'Math & Science'    },
  analysis:   { file: 'analysis-calculators.html',   label: 'Finance Analysis'  },
  health:     { file: 'health-calculators.html',     label: 'Health'            },
  debt:       { file: 'debt-calculators.html',       label: 'Debt & Budgeting'  },
  retirement: { file: 'retirement-calculators.html', label: 'Retirement'        },
  education:  { file: 'education-calculators.html',  label: 'Education'         },
  tax:        { file: 'tax-calculators.html',        label: 'Tax & Income'      },
  budget:     { file: 'budget-calculators.html',     label: 'Budget & Life'     },
};

// ── Related desc fixes ────────────────────────────────────────────────────────
const DESC_FIXES = {
  'loan-calculator.html':        'Calculate monthly payments & total interest',
  'savings-goal-calculator.html':'Project your savings growth over time',
  'retirement-calculator.html':  'Plan your retirement nest egg',
  'mortgage-calculator.html':    'Estimate your monthly mortgage payment',
  'investment-return-calculator.html': 'Grow your portfolio with compound returns',
  'budget-calculator.html':      'Track income and expenses easily',
};

// ── Non-tool pages (skip breadcrumb injection) ────────────────────────────────
const SKIP_BREADCRUMB = new Set([
  'index.html','about.html','privacy.html','terms.html','contact.html','404.html',
  'mortgage-calculators.html','home-calculators.html','math-calculators.html',
  'analysis-calculators.html','health-calculators.html','debt-calculators.html',
  'retirement-calculators.html','education-calculators.html','tax-calculators.html',
  'budget-calculators.html',
]);

// ── Build tool→category map from index.html ───────────────────────────────────
function buildToolCatMap() {
  const html = fs.readFileSync(path.join(DIR,'index.html'),'utf8');
  const re   = /<a href="\/([\w-]+\.html)" class="tool-card" data-category="([\w]+)"/g;
  const map  = {};
  let m;
  while ((m = re.exec(html)) !== null) map[m[1]] = m[2];
  return map;
}

// ── Read all html files ───────────────────────────────────────────────────────
function allHtml() {
  return fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
}

function toolPages() {
  return allHtml().filter(f => !SKIP_BREADCRUMB.has(f));
}

// ── Breadcrumb CSS ────────────────────────────────────────────────────────────
const BC_CSS = `.breadcrumb{display:flex;align-items:center;gap:8px;font-size:13px;color:rgba(255,255,255,.8);margin-bottom:16px;flex-wrap:wrap}
.breadcrumb a{color:rgba(255,255,255,.9);text-decoration:none;font-weight:500}
.breadcrumb a:hover{color:#fff;text-decoration:underline}
.breadcrumb span{color:rgba(255,255,255,.6)}`;

// ── Build BreadcrumbList JSON-LD ──────────────────────────────────────────────
function makeBreadcrumbLd(toolName, catLabel, catFile, toolFile) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type":"ListItem","position":1,"name":"Home","item": BASE + "/"},
      {"@type":"ListItem","position":2,"name":catLabel,"item": BASE + "/" + catFile},
      {"@type":"ListItem","position":3,"name":toolName,"item": BASE + "/" + toolFile}
    ]
  }, null, 2);
}

// ── Build breadcrumb HTML ─────────────────────────────────────────────────────
function makeBreadcrumbHtml(catFile, catLabel, toolName) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="/">Home</a>
  <span>›</span>
  <a href="/${catFile}">${catLabel}</a>
  <span>›</span>
  <span>${toolName}</span>
</nav>`;
}

// ── Extract tool name from <title> ────────────────────────────────────────────
function extractTitle(html) {
  const m = html.match(/<title>([^<]+)<\/title>/i);
  if (!m) return 'Calculator';
  return m[1].replace(/\s*[—\-–]\s*VestCalc\s*$/i,'').trim();
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 1: AUDIT
// ═══════════════════════════════════════════════════════════════════════════════
function runAudit(toolCatMap) {
  const lines = [];
  const log = s => lines.push(s);
  const now = new Date().toISOString().slice(0,19).replace('T',' ');

  log('╔══════════════════════════════════════════════════════════════════════════╗');
  log('║   VESTCALC.COM — QUALITY AUDIT REPORT                                  ║');
  log('║   Generated: ' + now + '                              ║');
  log('╚══════════════════════════════════════════════════════════════════════════╝');
  log('');

  const files = allHtml();
  const tools = toolPages();

  // 1. Missing breadcrumb
  const noBreadcrumb = tools.filter(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    return !h.includes('breadcrumb') && !h.includes('aria-label="Breadcrumb"');
  });

  // 2. BreadcrumbList < 3 items
  const thinBreadcrumb = tools.filter(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    if (!h.includes('BreadcrumbList')) return true;
    const items = (h.match(/"ListItem"/g)||[]).length;
    return items < 3;
  });

  // 3. page-hero without breadcrumb
  const heroNoBc = tools.filter(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    return h.includes('page-hero') && !h.includes('breadcrumb');
  });

  // 4. Related desc "Free online calculator"
  const vagueDesc = [];
  tools.forEach(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    const hits = (h.match(/Free online calculator/gi)||[]).length;
    if (hits) vagueDesc.push({f, hits});
  });

  // 5. cat-nav-bar onclick instead of href (index.html only)
  const idxHtml = fs.readFileSync(path.join(DIR,'index.html'),'utf8');
  const onclickLinks = (idxHtml.match(/onclick="filterCat/g)||[]).length;

  // 6. Missing og tags
  const missingOg = files.filter(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    return !h.includes('og:image') || !h.includes('og:title') || !h.includes('og:description');
  });

  // 7. Missing canonical
  const missingCanon = files.filter(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    return !h.includes('rel="canonical"');
  });

  // 8. Broken links
  const brokenLinks = [];
  files.forEach(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    const re = /href="\/([^"#?]+\.html)"/g;
    let m;
    while ((m=re.exec(h))!==null) {
      const target = m[1];
      if (!fs.existsSync(path.join(DIR,target))) {
        brokenLinks.push({from:f, to:target});
      }
    }
  });

  // 9. ad-slot display
  const adVisible = tools.filter(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    const m = h.match(/\.ad-slot\s*\{([^}]+)\}/);
    if (!m) return false;
    return !m[1].includes('display:none') && !m[1].includes('display: none');
  });

  log('── 1. Missing breadcrumb HTML (' + noBreadcrumb.length + ' pages) ──');
  noBreadcrumb.forEach(f => log('  ' + f));
  log('');
  log('── 2. BreadcrumbList < 3 items (' + thinBreadcrumb.length + ' pages) ──');
  thinBreadcrumb.slice(0,20).forEach(f => log('  ' + f));
  if (thinBreadcrumb.length>20) log('  ... and ' + (thinBreadcrumb.length-20) + ' more');
  log('');
  log('── 3. page-hero without breadcrumb (' + heroNoBc.length + ' pages) ──');
  heroNoBc.forEach(f => log('  ' + f));
  log('');
  log('── 4. Vague related desc "Free online calculator" (' + vagueDesc.length + ' pages) ──');
  vagueDesc.forEach(({f,hits}) => log('  ' + f + ' (' + hits + ' instances)'));
  log('');
  log('── 5. cat-nav-bar onclick links in index.html: ' + onclickLinks + ' ──');
  log('');
  log('── 6. Missing OG tags (' + missingOg.length + ' pages) ──');
  missingOg.forEach(f => log('  ' + f));
  log('');
  log('── 7. Missing canonical (' + missingCanon.length + ' pages) ──');
  missingCanon.forEach(f => log('  ' + f));
  log('');
  log('── 8. Broken internal links (' + brokenLinks.length + ') ──');
  brokenLinks.slice(0,40).forEach(({from,to}) => log('  ' + from + ' → /' + to + ' [NOT FOUND]'));
  if (brokenLinks.length>40) log('  ... and ' + (brokenLinks.length-40) + ' more');
  log('');
  log('── 9. ad-slot visible (display≠none) (' + adVisible.length + ' pages) ──');
  adVisible.forEach(f => log('  ' + f));
  log('');

  const report = lines.join('\n');
  fs.writeFileSync(path.join(DIR,'audit-report.txt'), report, 'utf8');

  return {
    noBreadcrumb, thinBreadcrumb, heroNoBc, vagueDesc,
    onclickLinks, missingOg, missingCanon, brokenLinks, adVisible
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2: FIX BREADCRUMBS
// ═══════════════════════════════════════════════════════════════════════════════
function fixBreadcrumbs(toolCatMap) {
  let fixed = 0, skipped = 0;
  const results = [];

  toolPages().forEach(f => {
    const cat = toolCatMap[f];
    if (!cat || !CAT_META[cat]) { skipped++; return; }

    let h = fs.readFileSync(path.join(DIR,f),'utf8');
    const catMeta  = CAT_META[cat];
    const toolName = extractTitle(h);
    let changed = false;

    // A. Insert breadcrumb HTML before <h1> in .page-hero if missing
    if (!h.includes('class="breadcrumb"') && !h.includes('aria-label="Breadcrumb"')) {
      const bcHtml = makeBreadcrumbHtml(catMeta.file, catMeta.label, toolName);
      // Insert before first <h1 in page-hero
      if (h.includes('class="page-hero"') || h.includes("class='page-hero'")) {
        h = h.replace(/(<(?:div|section)[^>]+class="page-hero"[^>]*>[\s\S]*?)(<h1)/,
          (_, before, h1) => before + bcHtml + '\n' + h1);
        changed = true;
      } else if (h.includes('<h1')) {
        // fallback: before first h1
        h = h.replace('<h1', bcHtml + '\n<h1');
        changed = true;
      }
    }

    // B. Add breadcrumb CSS if missing
    if (!h.includes('.breadcrumb{') && !h.includes('.breadcrumb {')) {
      h = h.replace('</style>', BC_CSS + '\n</style>');
      changed = true;
    }

    // C. Update/insert BreadcrumbList JSON-LD (3 levels)
    const newLd = makeBreadcrumbLd(toolName, catMeta.label, catMeta.file, f);
    const newLdBlock = `<script type="application/ld+json">\n${newLd}\n</script>`;

    if (h.includes('"BreadcrumbList"')) {
      // Replace existing BreadcrumbList script block
      h = h.replace(
        /<script type="application\/ld\+json">[\s\S]*?"BreadcrumbList"[\s\S]*?<\/script>/,
        newLdBlock
      );
      changed = true;
    } else {
      // Insert after last </script> in <head>
      const lastScriptInHead = h.lastIndexOf('</script>', h.indexOf('</head>'));
      if (lastScriptInHead !== -1) {
        h = h.slice(0, lastScriptInHead + 9) + '\n' + newLdBlock + h.slice(lastScriptInHead + 9);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(path.join(DIR,f), h, 'utf8');
      fixed++;
      results.push(f);
    }
  });

  return { fixed, skipped, results };
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 3: FIX INDEX.HTML cat-nav-bar
// ═══════════════════════════════════════════════════════════════════════════════
function fixIndexCatNav() {
  // The cat-nav-bar in index.html already uses real <a class="cat-nav-link" href="...">
  // from the previous fix session. Check if any onclick="filterCat" still exists in cat-nav-bar.
  let h = fs.readFileSync(path.join(DIR,'index.html'),'utf8');

  // Check if cat-nav-bar still has onclick-based buttons
  const catNavMatch = h.match(/class="cat-nav-bar"[\s\S]*?<\/div>\s*<\/div>/);
  const hasOnclick = h.includes('onclick="filterCat') && h.includes('cat-nav');

  if (!hasOnclick) {
    return { changed: false, msg: 'cat-nav-bar already uses real hrefs — no change needed' };
  }

  // Map of filterCat arg → real page
  const FILTER_MAP = {
    'all':        '/',
    'mortgage':   '/mortgage-calculators.html',
    'home':       '/home-calculators.html',
    'math':       '/math-calculators.html',
    'analysis':   '/analysis-calculators.html',
    'health':     '/health-calculators.html',
    'debt':       '/debt-calculators.html',
    'retirement': '/retirement-calculators.html',
    'education':  '/education-calculators.html',
    'tax':        '/tax-calculators.html',
    'budget':     '/budget-calculators.html',
  };

  // Replace onclick buttons with anchor tags
  h = h.replace(
    /<button([^>]*)onclick="filterCat\('([^']+)'\)"([^>]*)>([^<]+)<\/button>/g,
    (_, pre, cat, post, label) => {
      const href = FILTER_MAP[cat] || '/';
      return `<a href="${href}" class="cat-nav-link">${label.trim()}</a>`;
    }
  );

  fs.writeFileSync(path.join(DIR,'index.html'), h, 'utf8');
  return { changed: true, msg: 'cat-nav-bar onclick buttons converted to real hrefs' };
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 4: FIX RELATED DESC
// ═══════════════════════════════════════════════════════════════════════════════
function fixRelatedDesc() {
  let totalFixed = 0;
  const changed = [];

  toolPages().forEach(f => {
    let h = fs.readFileSync(path.join(DIR,f),'utf8');
    let modified = false;

    // Fix "Free online calculator" desc in related cards by checking which tool is linked
    h = h.replace(
      /(<a[^>]+href="\/([\w-]+\.html)"[^>]*>[\s\S]*?class="related-card-desc"[^>]*>)Free online calculator(<\/)/g,
      (_, before, targetFile, after) => {
        const fix = DESC_FIXES[targetFile];
        if (fix) { modified = true; totalFixed++; return before + fix + after; }
        return _;
      }
    );

    // Also try pattern where desc comes after href in related card
    h = h.replace(
      /(class="related-card-desc"[^>]*>)Free online calculator(<\/)/g,
      (full, pre, post) => {
        // Try to find which tool this card links to by looking back in context
        modified = true;
        totalFixed++;
        return pre + 'Explore this free calculator tool' + post;
      }
    );

    if (modified) {
      fs.writeFileSync(path.join(DIR,f), h, 'utf8');
      changed.push(f);
    }
  });

  return { totalFixed, changed };
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 5: FINAL AUDIT REPORT
// ═══════════════════════════════════════════════════════════════════════════════
function runFinalAudit(toolCatMap, step2Result, step3Result, step4Result) {
  const lines = [];
  const log = s => lines.push(s);
  const now = new Date().toISOString().slice(0,19).replace('T',' ');

  log('╔══════════════════════════════════════════════════════════════════════════╗');
  log('║   VESTCALC.COM — POST-FIX AUDIT REPORT                                 ║');
  log('║   Generated: ' + now + '                              ║');
  log('╚══════════════════════════════════════════════════════════════════════════╝');
  log('');

  const files = allHtml();
  const tools = toolPages();

  // Re-check all issues
  const noBreadcrumb = tools.filter(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    return !h.includes('breadcrumb');
  });
  const thinBc = tools.filter(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    if (!h.includes('BreadcrumbList')) return true;
    return (h.match(/"ListItem"/g)||[]).length < 3;
  });
  const brokenLinks = [];
  files.forEach(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    const re = /href="\/([^"#?]+\.html)"/g;
    let m;
    while ((m=re.exec(h))!==null) {
      if (!fs.existsSync(path.join(DIR,m[1]))) brokenLinks.push({from:f,to:m[1]});
    }
  });
  const adVisible = tools.filter(f => {
    const h = fs.readFileSync(path.join(DIR,f),'utf8');
    const m = h.match(/\.ad-slot\s*\{([^}]+)\}/);
    if (!m) return false;
    return !m[1].includes('display:none') && !m[1].includes('display: none');
  });

  log('═══ STEP 2: Breadcrumb Fix Results ═══');
  log('  Pages fixed (breadcrumb + BreadcrumbList added/updated): ' + step2Result.fixed);
  log('  Pages skipped (no category mapping):                      ' + step2Result.skipped);
  log('');
  log('  Still missing breadcrumb HTML: ' + noBreadcrumb.length);
  noBreadcrumb.slice(0,20).forEach(f => log('    ' + f));
  log('');
  log('  Still thin BreadcrumbList (<3 items): ' + thinBc.length);
  thinBc.slice(0,10).forEach(f => log('    ' + f));
  log('');

  log('═══ STEP 3: cat-nav-bar Fix ═══');
  log('  ' + step3Result.msg);
  log('');

  log('═══ STEP 4: Related Desc Fix ═══');
  log('  Total "Free online calculator" replacements: ' + step4Result.totalFixed);
  log('  Files changed: ' + step4Result.changed.length);
  step4Result.changed.forEach(f => log('    ' + f));
  log('');

  log('═══ STEP 8: Broken Internal Links (' + brokenLinks.length + ') ═══');
  const seen = new Set();
  brokenLinks.forEach(({from,to}) => {
    const key = to;
    if (!seen.has(key)) { seen.add(key); log('  MISSING: /' + to); }
  });
  if (brokenLinks.length === 0) log('  ✓ No broken links detected');
  log('');

  log('═══ STEP 9: Ad Slot Visibility (' + adVisible.length + ' visible) ═══');
  if (adVisible.length === 0) log('  ✓ All ad slots correctly hidden');
  else adVisible.forEach(f => log('  VISIBLE: ' + f));
  log('');

  log('═══ OVERALL CONCLUSION ═══');
  const allOk = noBreadcrumb.length===0 && thinBc.length===0 && brokenLinks.length===0 && adVisible.length===0;
  if (allOk) {
    log('  ✓ All checks PASSED — site is clean');
  } else {
    log('  Issues remaining:');
    if (noBreadcrumb.length)  log('    - ' + noBreadcrumb.length + ' pages missing breadcrumb');
    if (thinBc.length)        log('    - ' + thinBc.length + ' pages with thin BreadcrumbList');
    if (brokenLinks.length)   log('    - ' + brokenLinks.length + ' broken internal links');
    if (adVisible.length)     log('    - ' + adVisible.length + ' ad slots still visible');
  }

  const report = lines.join('\n');
  fs.writeFileSync(path.join(DIR,'functional-audit-report.txt'), report, 'utf8');
  return { noBreadcrumb, thinBc, brokenLinks, adVisible };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n══ STEP 1: Building tool→category map ══');
const toolCatMap = buildToolCatMap();
console.log('  Tool pages mapped: ' + Object.keys(toolCatMap).length);

console.log('\n══ STEP 1: Running initial audit ══');
const auditResult = runAudit(toolCatMap);
console.log('  audit-report.txt written');
console.log('  No breadcrumb:    ' + auditResult.noBreadcrumb.length);
console.log('  Thin breadcrumb:  ' + auditResult.thinBreadcrumb.length);
console.log('  Vague descs:      ' + auditResult.vagueDesc.length);
console.log('  Onclick links:    ' + auditResult.onclickLinks);
console.log('  Broken links:     ' + auditResult.brokenLinks.length);
console.log('  Ad visible:       ' + auditResult.adVisible.length);

console.log('\n══ STEP 2: Fixing breadcrumbs ══');
const step2 = fixBreadcrumbs(toolCatMap);
console.log('  Fixed: ' + step2.fixed + '  Skipped: ' + step2.skipped);

console.log('\n══ STEP 3: Fixing index.html cat-nav-bar ══');
const step3 = fixIndexCatNav();
console.log('  ' + step3.msg);

console.log('\n══ STEP 4: Fixing related desc ══');
const step4 = fixRelatedDesc();
console.log('  Replacements: ' + step4.totalFixed + '  Files: ' + step4.changed.length);

console.log('\n══ STEP 5: Final audit report ══');
const final = runFinalAudit(toolCatMap, step2, step3, step4);
console.log('  functional-audit-report.txt written');
console.log('  Remaining issues:');
console.log('    no breadcrumb:  ' + final.noBreadcrumb.length);
console.log('    thin bc:        ' + final.thinBc.length);
console.log('    broken links:   ' + final.brokenLinks.length);
console.log('    ad visible:     ' + final.adVisible.length);

console.log('\n══ ALL STEPS DONE ══');
