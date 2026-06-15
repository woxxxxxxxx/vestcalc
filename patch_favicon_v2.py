import glob
count = 0
for f in glob.glob('C:/Users/Administrator/vestcalc/**/*.html', recursive=True):
    txt = open(f, encoding='utf-8').read()
    new = txt.replace('href="/favicon.svg"', 'href="/favicon.svg?v=2"')
    if new != txt:
        open(f, 'w', encoding='utf-8').write(new)
        count += 1
print(f'updated: {count} files')
