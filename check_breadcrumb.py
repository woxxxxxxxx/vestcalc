import glob

cat_names = set(f.split('\\')[-1] for f in glob.glob('C:/Users/Administrator/vestcalc/*-calculators.html'))
cat_names.add('index.html')

missing = []
for f in glob.glob('C:/Users/Administrator/vestcalc/*.html'):
    if f.split('\\')[-1] in cat_names:
        continue
    txt = open(f, encoding='utf-8').read()
    if 'breadcrumb' in txt and 'href="/">Home' not in txt:
        missing.append(f.split('\\')[-1])

print(f'breadcrumb missing Home: {len(missing)}')
for m in missing[:10]:
    print(' ', m)
