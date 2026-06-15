import glob, re

# ① index.html: 删4个冗余分类链接，修 hover var
f = 'C:/Users/Administrator/vestcalc/index.html'
txt = open(f, encoding='utf-8').read()
txt = txt.replace('<a href="/mortgage-calculators.html">Loans</a>', '')
txt = txt.replace('<a href="/retirement-calculators.html">Retirement</a>', '')
txt = txt.replace('<a href="/tax-calculators.html">Tax</a>', '')
txt = txt.replace('<a href="/health-calculators.html">Health</a>', '')
txt = txt.replace('background: var(--primary-dark) !important;', 'background:#0a7c6e !important;')
txt = txt.replace('background:var(--primary-dark) !important;', 'background:#0a7c6e !important;')
open(f, 'w', encoding='utf-8').write(txt)
print('index.html done')

# ② 分类页: 删 "All Tools" 裸链接，修 hover var
for f in glob.glob('C:/Users/Administrator/vestcalc/*-calculators.html'):
    txt = open(f, encoding='utf-8').read()
    txt = re.sub(r'<a href="/"[^>]*>\s*All Tools\s*</a>', '', txt)
    txt = re.sub(r'<a href="/index\.html"[^>]*>\s*All Tools\s*</a>', '', txt)
    txt = txt.replace('background: var(--primary-dark) !important;', 'background:#0a7c6e !important;')
    txt = txt.replace('background:var(--primary-dark) !important;', 'background:#0a7c6e !important;')
    open(f, 'w', encoding='utf-8').write(txt)
    print(f'category done: {f.split(chr(92))[-1]}')

# ③ 工具页（根目录，无 calculators/ 子目录）: 修 hover var
fixed = 0
for f in glob.glob('C:/Users/Administrator/vestcalc/*.html'):
    txt = open(f, encoding='utf-8').read()
    orig = txt
    txt = txt.replace('background: var(--primary-dark) !important;', 'background:#0a7c6e !important;')
    txt = txt.replace('background:var(--primary-dark) !important;', 'background:#0a7c6e !important;')
    if txt != orig:
        open(f, 'w', encoding='utf-8').write(txt)
        fixed += 1
print(f'tool pages hover fixed: {fixed}')
print('all done')
