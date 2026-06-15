import glob, re

cat_names = set(f.split('\\')[-1] for f in glob.glob('C:/Users/Administrator/vestcalc/*-calculators.html'))
cat_names.add('index.html')

fixed = 0
for f in glob.glob('C:/Users/Administrator/vestcalc/*.html'):
    if f.split('\\')[-1] in cat_names:
        continue
    txt = open(f, encoding='utf-8').read()
    new = re.sub(r'<a href="/">Home</a>', '', txt)
    new = re.sub(r'<a href="/#calculators">Calculators</a>', '', new)
    if new != txt:
        open(f, 'w', encoding='utf-8').write(new)
        fixed += 1

print(f'fixed: {fixed} tool pages')
print('done')
