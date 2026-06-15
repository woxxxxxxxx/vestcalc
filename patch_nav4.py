import glob, re

# 1. index.html: nav 加 justify-content:flex-end
f = 'C:/Users/Administrator/vestcalc/index.html'
txt = open(f, encoding='utf-8').read()
new = txt.replace(
    'nav { display: flex; align-items: center; gap: 4px; flex: 1; }',
    'nav { display: flex; align-items: center; gap: 4px; flex: 1; justify-content: flex-end; }'
)
if new != txt:
    open(f, 'w', encoding='utf-8').write(new)
    print('index.html nav fixed')
else:
    print('index.html: pattern not found, no change')

# 2. 分类页：清理孤立 .logo-icon CSS
for f in glob.glob('C:/Users/Administrator/vestcalc/*-calculators.html'):
    txt = open(f, encoding='utf-8').read()
    new = re.sub(r'\.logo-icon\s*\{[^}]+\}', '', txt)
    if new != txt:
        open(f, 'w', encoding='utf-8').write(new)
        print(f'logo-icon cleaned: {f.split(chr(92))[-1]}')
    else:
        print(f'no logo-icon found: {f.split(chr(92))[-1]}')
