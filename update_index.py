import re, os

BASE = r'C:\Users\Administrator\vestcalc'

# ── Category mapping (slug → category key) ──────────────────────────────────
CATS = {
    'loan-calculator':            'loans',
    'car-loan-calculator':        'loans',
    'personal-loan-calculator':   'loans',
    'student-loan-calculator':    'loans',
    'debt-payoff-calculator':     'loans',
    'credit-card-payoff-calculator': 'loans',
    'interest-rate-calculator':   'loans',
    'balloon-payment-calculator': 'loans',

    'mortgage-calculator':        'mortgage',
    'home-equity-calculator':     'mortgage',
    'refinance-calculator':       'mortgage',
    'amortization-calculator':    'mortgage',
    'down-payment-calculator':    'mortgage',
    'rent-vs-buy-calculator':     'mortgage',
    'home-affordability-calculator': 'mortgage',
    'escrow-calculator':          'mortgage',

    'retirement-calculator':      'retirement',
    '401k-calculator':            'retirement',
    'roth-ira-calculator':        'retirement',
    'compound-interest-calculator': 'retirement',
    'investment-return-calculator': 'retirement',
    'savings-goal-calculator':    'retirement',
    'dividend-calculator':        'retirement',
    'stock-return-calculator':    'retirement',
    'rule-of-72-calculator':      'retirement',

    'budget-calculator':          'personal',
    'emergency-fund-calculator':  'personal',
    'net-worth-calculator':       'personal',
    'currency-converter':         'personal',
    'inflation-calculator':       'personal',
    'cash-flow-calculator':       'personal',
    'cost-of-living-calculator':  'personal',
    'percentage-calculator':      'personal',
    'tip-calculator':             'personal',

    'tax-calculator':             'tax',
    'paycheck-calculator':        'tax',
    'overtime-calculator':        'tax',
    'salary-calculator':          'tax',
    'sales-tax-calculator':       'tax',
    'vat-calculator':             'tax',

    'roi-calculator':             'analysis',
    'cagr-calculator':            'analysis',
    'present-value-calculator':   'analysis',
    'future-value-calculator':    'analysis',
    'npv-calculator':             'analysis',
    'irr-calculator':             'analysis',
    'apr-calculator':             'analysis',
    'simple-interest-calculator': 'analysis',
    'break-even-calculator':      'analysis',
    'lease-calculator':           'analysis',
}

# ── Read index.html ──────────────────────────────────────────────────────────
path = os.path.join(BASE, 'index.html')
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

# ── 1. Add data-category to every tool-card anchor ───────────────────────────
def add_cat(m):
    href = m.group(1)
    slug = href.strip('/').replace('.html', '')
    cat = CATS.get(slug, 'personal')
    return '<a href="' + href + '" class="tool-card" data-category="' + cat + '">'

# Only touch cards that don't already have data-category
html = re.sub(r'<a href="(/[^"]+\.html)" class="tool-card"(?! data-category)', add_cat, html)
print('data-category attributes added')

# ── 2. Inject category-tab CSS inside the <style> block ─────────────────────
TAB_CSS = (
'  /* ── CATEGORY TABS ── */\n'
'  .cat-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}\n'
'  .cat-tab{padding:7px 18px;border-radius:99px;font-size:13px;font-weight:600;border:1.5px solid var(--border);background:var(--bg2);color:var(--text2);cursor:pointer;transition:all .15s;white-space:nowrap;line-height:1}\n'
'  .cat-tab:hover{border-color:var(--primary);color:var(--primary);background:var(--primary-dim)}\n'
'  .cat-tab.active{background:var(--primary);color:#fff;border-color:var(--primary)}\n'
)
SEARCH_CSS_MARKER = '  /* ── SEARCH ── */'
if TAB_CSS.strip() not in html:
    html = html.replace(SEARCH_CSS_MARKER, TAB_CSS + SEARCH_CSS_MARKER)
    print('Tab CSS injected')
else:
    print('Tab CSS already present')

# ── 3. Inject tab HTML before .search-wrap ───────────────────────────────────
TABS_HTML = (
'    <div class="cat-tabs">\n'
'      <button class="cat-tab active" data-cat="all" onclick="filterCat(this)">All</button>\n'
'      <button class="cat-tab" data-cat="loans" onclick="filterCat(this)">Loans</button>\n'
'      <button class="cat-tab" data-cat="mortgage" onclick="filterCat(this)">Mortgage &amp; Home</button>\n'
'      <button class="cat-tab" data-cat="retirement" onclick="filterCat(this)">Retirement &amp; Investing</button>\n'
'      <button class="cat-tab" data-cat="personal" onclick="filterCat(this)">Personal Finance</button>\n'
'      <button class="cat-tab" data-cat="tax" onclick="filterCat(this)">Tax &amp; Payroll</button>\n'
'      <button class="cat-tab" data-cat="analysis" onclick="filterCat(this)">Investment Analysis</button>\n'
'    </div>\n'
)
SEARCH_WRAP = '    <div class="search-wrap">'
if 'cat-tabs' not in html:
    html = html.replace(SEARCH_WRAP, TABS_HTML + SEARCH_WRAP)
    print('Tab HTML injected')
else:
    print('Tab HTML already present')

# ── 4. Replace the JS block with updated version ─────────────────────────────
OLD_JS = re.search(r'<script>\nfunction filterCards\(q\).*?</script>', html, re.DOTALL)
NEW_JS = (
'<script>\n'
'var _cat=\'all\';\n'
'function filterCat(btn){\n'
'  _cat=btn.dataset.cat;\n'
'  document.querySelectorAll(\'.cat-tab\').forEach(function(t){t.classList.toggle(\'active\',t.dataset.cat===_cat);});\n'
'  applyFilters();\n'
'}\n'
'function filterCards(q){applyFilters();}\n'
'function applyFilters(){\n'
'  var q=document.getElementById(\'calc-search\').value.toLowerCase().trim();\n'
'  var cards=document.querySelectorAll(\'.tool-card\');\n'
'  var visible=0;\n'
'  cards.forEach(function(c){\n'
'    var catOk=_cat===\'all\'||c.dataset.category===_cat;\n'
'    var txt=(c.querySelector(\'.tool-name\').textContent+\' \'+c.querySelector(\'.tool-desc\').textContent).toLowerCase();\n'
'    var txtOk=!q||txt.includes(q);\n'
'    var show=catOk&&txtOk;\n'
'    c.style.display=show?\'\':\' none\';\n'
'    if(show)visible++;\n'
'  });\n'
'  var filtering=q||_cat!==\'all\';\n'
'  document.querySelectorAll(\'.tool-grid .ad-slot\').forEach(function(a){a.style.display=filtering?\'none\':\'\'});\n'
'  document.getElementById(\'no-results\').style.display=(visible===0)?\'block\':\'none\';\n'
'}\n'
'</script>\n'
)

if OLD_JS:
    html = html[:OLD_JS.start()] + NEW_JS + html[OLD_JS.end():]
    print('JS block replaced')
else:
    print('WARNING: old JS block not found, skipping')

# ── Write back ───────────────────────────────────────────────────────────────
with open(path, 'w', encoding='utf-8') as f:
    f.write(html)
print('index.html updated successfully')


# ── 5. Generate sitemap.xml ──────────────────────────────────────────────────
CALC_PAGES = [f for f in os.listdir(BASE) if f.endswith('.html')
              and f not in ('about.html','privacy.html','terms.html','contact.html','index.html')]
CALC_PAGES.sort()

STATIC = [
    ('', '1.0', 'weekly'),
    ('about.html', '0.5', 'monthly'),
    ('contact.html', '0.4', 'monthly'),
    ('privacy.html', '0.3', 'monthly'),
    ('terms.html', '0.3', 'monthly'),
]

lines = ['<?xml version="1.0" encoding="UTF-8"?>']
lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for slug, pri, freq in STATIC:
    url = 'https://vestcalc.com/' + slug
    lines.append('  <url>')
    lines.append('    <loc>' + url + '</loc>')
    lines.append('    <lastmod>2026-06-01</lastmod>')
    lines.append('    <changefreq>' + freq + '</changefreq>')
    lines.append('    <priority>' + pri + '</priority>')
    lines.append('  </url>')

for page in CALC_PAGES:
    url = 'https://vestcalc.com/' + page
    lines.append('  <url>')
    lines.append('    <loc>' + url + '</loc>')
    lines.append('    <lastmod>2026-06-01</lastmod>')
    lines.append('    <changefreq>monthly</changefreq>')
    lines.append('    <priority>0.8</priority>')
    lines.append('  </url>')

lines.append('</urlset>')

sitemap_path = os.path.join(BASE, 'sitemap.xml')
with open(sitemap_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines) + '\n')

print(f'sitemap.xml generated with {len(CALC_PAGES) + len(STATIC)} URLs')
