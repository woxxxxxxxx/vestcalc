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

// ── STEP 2: CSS check (should already be OK) ─────────────────────────────────
let cssFixed = 0;
{
  // Extract CSS from loan-calculator.html as template
  const ref  = fs.readFileSync(path.join(DIR,'loan-calculator.html'),'utf8');
  const sIdx = ref.indexOf('<style>');
  const eIdx = ref.indexOf('</style>') + 8;
  const STYLE = ref.slice(sIdx, eIdx);

  tools.forEach(f => {
    let h = fs.readFileSync(path.join(DIR,f),'utf8');
    if (!h.includes('<style>') && !h.includes('<style ')) {
      h = h.replace('</head>', STYLE + '\n</head>');
      fs.writeFileSync(path.join(DIR,f), h, 'utf8');
      cssFixed++;
    }
  });
  console.log('STEP 2: CSS restored on ' + cssFixed + ' pages (0 = already OK)');
}

// ── STEP 3: Move breadcrumb into page-hero + fix /#calculators links ──────────
let bcMoved = 0, bcLinkFixed = 0;
{
  tools.forEach(f => {
    let h = fs.readFileSync(path.join(DIR,f),'utf8');

    // Extract real category URL from BreadcrumbList JSON-LD position=2
    let catUrl = null;
    const ldMatch = h.match(/"BreadcrumbList"[\s\S]*?"itemListElement"[\s\S]*?\[([^\]]+)\]/);
    if (ldMatch) {
      // Find position 2 item
      const pos2 = ldMatch[1].match(/"position"\s*:\s*2[\s\S]*?"item"\s*:\s*"([^"]+)"/);
      if (pos2) {
        // Convert absolute URL to relative path
        catUrl = pos2[1].replace('https://vestcalc.com', '');
      }
    }

    // Fix /#calculators → real category URL in breadcrumb nav
    if (catUrl && h.includes('/#calculators')) {
      h = h.replace(/href="\/#calculators"/g, `href="${catUrl}"`);
      bcLinkFixed++;
    }

    // Move breadcrumb-nav from <main> into <div class="page-hero">
    // Pattern: <div class="page-hero">...<h1> — need to insert breadcrumb before h1
    // Current: <div class="page-hero"><h1>...</h1>...  and breadcrumb is in <main>
    const bcNavMatch = h.match(/(<nav class="breadcrumb-nav"[^>]*>[\s\S]*?<\/nav>)/);
    if (bcNavMatch) {
      const bcNav = bcNavMatch[1];
      // Check if breadcrumb is OUTSIDE page-hero (i.e., in main)
      const heroEnd   = h.indexOf('</div>', h.indexOf('class="page-hero"'));
      const bcNavIdx  = h.indexOf(bcNav);
      if (bcNavIdx > heroEnd) {
        // Remove from current location (in main)
        h = h.replace(bcNav, '');
        // Also remove any leading whitespace/newline left behind
        h = h.replace(/(<main>\s*)\n\s*\n/, '$1\n');
        // Insert inside page-hero, before <h1
        h = h.replace(
          /(<div class="page-hero">)\s*(<h1)/,
          `$1\n  ${bcNav}\n  $2`
        );
        bcMoved++;
      }
    }

    fs.writeFileSync(path.join(DIR,f), h, 'utf8');
  });
  console.log('STEP 3: Breadcrumb moved into page-hero: ' + bcMoved + ' pages');
  console.log('STEP 3: /#calculators links fixed: ' + bcLinkFixed + ' pages');
}

// ── STEP 4: Fix vague related card descriptions ───────────────────────────────
const DESC_MAP = {
  'Loan Calculator':       'Calculate monthly payments & total interest',
  'Savings Calculator':    'Project your savings growth over time',
  'Budget Calculator':     'Track income and expenses easily',
  'Mortgage Calculator':   'Estimate your monthly mortgage payment',
  'Retirement Calculator': 'Plan your retirement nest egg',
  'Investment Return':     'Grow your portfolio with compound returns',
  'Compound Interest':     'See how compound growth builds wealth',
  '401(k) Calculator':     'Maximize your 401(k) retirement savings',
  'Roth IRA Calculator':   'Compare Roth IRA vs traditional IRA growth',
  'Tax Calculator':        'Estimate your federal & state tax liability',
  'BMI Calculator':        'Check your body mass index instantly',
  'Calorie Calculator':    'Find your daily calorie needs by activity',
  'Body Fat Calculator':   'Estimate body fat percentage accurately',
  'Salary Calculator':     'Convert salary to hourly, monthly or annual',
  'Tip Calculator':        'Split bills and calculate tips easily',
  'Emergency Fund':        'Find out how much emergency savings you need',
  'Inflation Calculator':  'See how inflation erodes purchasing power',
  'Dividend Calculator':   'Estimate dividend income from your holdings',
  'Amortisation Schedule': 'View full loan amortization breakdown',
  'Capital Gains':         'Calculate capital gains tax on investments',
  'RMD Calculator':        'Compute required minimum distributions',
};

let descFixed = 0;
{
  tools.forEach(f => {
    let h = fs.readFileSync(path.join(DIR,f),'utf8');
    let changed = false;

    // Match: <div class="related-card-title">TITLE</div><div class="related-card-desc">VAGUE</div>
    h = h.replace(
      /(<div class="related-card-title">)([^<]+)(<\/div>\s*<div class="related-card-desc">)(Explore this free calculator tool|Free online calculator)(<\/div>)/g,
      (full, pre, title, mid, _vague, post) => {
        const fix = DESC_MAP[title.trim()];
        if (fix) { changed = true; descFixed++; return pre + title + mid + fix + post; }
        // Generic fallback based on title words
        const fallback = title.trim().replace(' Calculator','').replace(' Calculator','') + ' calculator tool';
        changed = true; descFixed++;
        return pre + title + mid + 'Free ' + fallback.charAt(0).toLowerCase() + fallback.slice(1) + post;
      }
    );

    if (changed) fs.writeFileSync(path.join(DIR,f), h, 'utf8');
  });
  console.log('STEP 4: Vague related descs fixed: ' + descFixed);
}

// ── STEP 5: Fix index.html nav-cta href ─────────────────────────────────────
{
  let h = fs.readFileSync(path.join(DIR,'index.html'),'utf8');
  const before = h;
  h = h.replace(
    '<a href="/" class="nav-cta">All 101 Calculators</a>',
    '<a href="#calculators" class="nav-cta">All 101 Calculators</a>'
  );
  if (h !== before) {
    fs.writeFileSync(path.join(DIR,'index.html'), h, 'utf8');
    console.log('STEP 5: index.html nav-cta href updated to #calculators');
  } else {
    console.log('STEP 5: nav-cta already correct or pattern not found');
  }
}

// ── STEP 6: Verification ─────────────────────────────────────────────────────
console.log('\n── STEP 6: Verification ──');
const checks = ['fuel-cost-calculator.html','bmi-calculator.html','retirement-calculator.html',
                 'loan-calculator.html','tax-calculator.html'];
checks.forEach(f => {
  const h = fs.readFileSync(path.join(DIR,f),'utf8');
  const hasStyle   = h.includes('<style>');
  // Breadcrumb inside page-hero
  const heroMatch  = h.match(/<div class="page-hero">([\s\S]*?)<\/div>/);
  const bcInHero   = heroMatch ? heroMatch[1].includes('breadcrumb-nav') : false;
  // No /#calculators in breadcrumb
  const noHashCalc = !h.includes('href="/#calculators"');
  // Extract cat link used
  const catLinkM  = h.match(/class="breadcrumb-nav"[^>]*>[\s\S]*?<a href="([^"]+)"[^>]*>[^<]+<\/a><span/);
  const catLink   = catLinkM ? catLinkM[1] : '?';
  console.log(f + ':');
  console.log('  CSS: ' + (hasStyle?'✓':'✗') +
              ' | breadcrumb-in-hero: ' + (bcInHero?'✓':'✗') +
              ' | no-hash-link: ' + (noHashCalc?'✓':'✗') +
              ' | catLink: ' + catLink);
});

// Check index.html nav-cta
const idx = fs.readFileSync(path.join(DIR,'index.html'),'utf8');
const navCtaOk = idx.includes('href="#calculators" class="nav-cta"');
console.log('\nindex.html nav-cta href="#calculators": ' + (navCtaOk?'✓':'✗'));

console.log('\n── ALL STEPS DONE ──');
