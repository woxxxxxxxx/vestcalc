import glob, re

# 工具页已有 nav a{...}，只需补 nav a:hover（若无）
cat_names = set(f.split('\\')[-1] for f in glob.glob('C:/Users/Administrator/vestcalc/*-calculators.html'))
cat_names.add('index.html')

HOVER = 'nav a:hover{color:#0d9488;background:#f0fdfa}'
fixed = 0
for f in glob.glob('C:/Users/Administrator/vestcalc/*.html'):
    name = f.split('\\')[-1]
    if name in cat_names:
        continue
    txt = open(f, encoding='utf-8').read()
    # 已有 nav a{ 但无 nav a:hover，就在 .nav-cta{ 前插入 hover 规则
    if 'nav a{' in txt and 'nav a:hover{' not in txt and '.nav-cta{' in txt:
        new = txt.replace('.nav-cta{', HOVER + '.nav-cta{', 1)
        open(f, 'w', encoding='utf-8').write(new)
        fixed += 1

print(f'nav a:hover added: {fixed} tool pages')
print('done')
