import glob, re

# ① 分类页：cat-nav 背景 #f8fafc→#f0fdfa，active态改为实色teal
cat_pages = glob.glob('C:/Users/Administrator/vestcalc/*-calculators.html')

for f in cat_pages:
    txt = open(f, encoding='utf-8').read()
    txt = txt.replace('background:#f8fafc', 'background:#f0fdfa')
    txt = txt.replace('background: #f8fafc', 'background:#f0fdfa')
    txt = re.sub(
        r'\.cat-nav-bar a:hover,\.cat-nav-bar a\.active\s*\{[^}]+\}',
        '.cat-nav-bar a:hover,.cat-nav-bar a.active{color:#fff;background:#0d9488;border-radius:999px}',
        txt
    )
    txt = re.sub(
        r'(\.cat-nav-bar a\s*\{[^}]*?)color:[^;]+;?',
        r'\1color:#0f766e;',
        txt
    )
    open(f, 'w', encoding='utf-8').write(txt)
    print(f'cat-nav fixed: {f.split("/")[-1]}')

# ② 所有页面：nav-cta 统一样式（替换含 var(--primary) 的旧定义）
all_html = glob.glob('C:/Users/Administrator/vestcalc/**/*.html', recursive=True)
cta_css_new = '.nav-cta{background:#0d9488;color:#fff;padding:8px 18px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none;transition:background .15s}'

cta_count = 0
for f in all_html:
    txt = open(f, encoding='utf-8').read()
    if '.nav-cta' in txt and 'var(--primary)' in txt:
        new_txt = re.sub(r'\.nav-cta\s*\{[^}]+\}', cta_css_new, txt)
        if new_txt != txt:
            open(f, 'w', encoding='utf-8').write(new_txt)
            cta_count += 1
            print(f'nav-cta fixed: {f.split("/")[-1]}')

print(f'\ncat-nav pages: {len(cat_pages)}')
print(f'nav-cta pages: {cta_count}')
print('done')
