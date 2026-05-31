"""Add optimized ad placements to all VestCalc HTML files."""
import os, re

DIR = r'C:/Users/Administrator/vestcalc'

SIDEBAR_CSS = """.sidebar-sticky{position:fixed;right:20px;top:50%;transform:translateY(-50%);width:300px;z-index:50;display:none}
.sidebar-ad{width:300px;height:600px;background:var(--bg2);border:1px dashed var(--border);border-radius:var(--radius);display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--text3);font-size:13px;gap:4px;box-shadow:var(--shadow)}
@media(min-width:1400px){.sidebar-sticky{display:block}}"""

SIDEBAR_HTML = """<div class="sidebar-sticky">
  <div class="sidebar-ad">Advertisement<br><small style="font-size:11px;opacity:.5">300&#215;600</small></div>
</div>"""

INLINE_AD = '    <div class="ad-slot" style="margin:20px 0;min-height:100px">Advertisement</div>'

# ── Calculator pages ──────────────────────────────────────────────────────────
calc_files = [f for f in os.listdir(DIR) if f.endswith('.html') and f != 'index.html']

for fname in sorted(calc_files):
    fpath = os.path.join(DIR, fname)
    with open(fpath, 'r', encoding='utf-8') as fh:
        c = fh.read()

    orig = c

    # 1. Sidebar CSS — insert before first @media(max-width:640px)
    if 'sidebar-sticky' not in c:
        c = c.replace('@media(max-width:640px)', SIDEBAR_CSS + '\n@media(max-width:640px)', 1)

    # 2. Sidebar HTML — insert before </body>
    if '<div class="sidebar-sticky">' not in c:
        c = c.replace('</body>', SIDEBAR_HTML + '\n</body>')

    # 3. In-form ad — file-specific insertion point
    if INLINE_AD not in c:
        if fname == 'currency-converter.html':
            marker = '    <h3 style="font-size:14px;font-weight:700;color:var(--text2);margin-top:24px;margin-bottom:12px">1 USD equals</h3>'
            c = c.replace(marker, INLINE_AD + '\n\n' + marker)

        elif fname == 'percentage-calculator.html':
            marker = '  <!-- Percentage change -->'
            c = c.replace(marker, INLINE_AD + '\n\n' + marker)

        elif fname == 'budget-calculator.html':
            marker = '    <div class="row-list" id="expense-rows"></div>\n\n    <div class="result-grid">'
            c = c.replace(marker, '    <div class="row-list" id="expense-rows"></div>\n\n' + INLINE_AD + '\n\n    <div class="result-grid">')

        else:
            # Standard: form-grid → result-grid
            for sep in ['\r\n', '\n']:
                old = '    </div>' + sep + sep + '    <div class="result-grid">'
                new = '    </div>' + sep + sep + INLINE_AD + sep + sep + '    <div class="result-grid">'
                if old in c:
                    c = c.replace(old, new, 1)
                    break

    if c != orig:
        with open(fpath, 'w', encoding='utf-8') as fh:
            fh.write(c)
        print(f'  updated: {fname}')
    else:
        print(f'  unchanged: {fname}')

# ── index.html — split tool-grid 4+4+2 with ad banners ───────────────────────
index_path = os.path.join(DIR, 'index.html')
with open(index_path, 'r', encoding='utf-8') as fh:
    idx = fh.read()

if 'tool-grid-ad' not in idx:
    AD_SPLIT = '</div>\n\n      <div class="ad-slot tool-grid-ad">Advertisement</div>\n\n      <div class="tool-grid-inner">'

    # Mark where card 4 ends (after Tax Calculator card closing </a>)
    # and where card 8 ends (after Budget Calculator card closing </a>)
    # Strategy: count </a> closing tags within tool-grid and insert after 4th and 8th

    # Find the tool-grid block
    tg_start = idx.index('<div class="tool-grid">')
    tg_end   = idx.index('</div>\n  </section>', tg_start)
    tg_block = idx[tg_start:tg_end]

    # Split by card: each card starts with \n\n      <a href=
    cards = re.split(r'(?=\n\n      <a href=)', tg_block)
    # cards[0] is the opening <div class="tool-grid"> tag, cards[1..10] are the cards

    AD_BANNER = '\n\n      <div class="ad-slot" style="grid-column:1/-1;margin:4px 0">Advertisement</div>'

    new_block = cards[0]  # opening tag
    for i, card in enumerate(cards[1:], 1):  # i = 1..10
        new_block += card
        if i == 4 or i == 8:
            new_block += AD_BANNER

    idx = idx[:tg_start] + new_block + idx[tg_end:]

    # Also add .ad-slot grid-column span style to existing CSS
    idx = idx.replace(
        '  .tool-grid { grid-template-columns: 1fr 1fr; gap: 12px; }',
        '  .tool-grid { grid-template-columns: 1fr 1fr; gap: 12px; }'
    )

    with open(index_path, 'w', encoding='utf-8') as fh:
        fh.write(idx)
    print('  updated: index.html')
else:
    print('  unchanged: index.html')

print('\nAll done.')
